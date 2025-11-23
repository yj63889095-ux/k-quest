import { create } from 'zustand';
import { Language, translations } from './i18n';
import { supabase } from './supabase';

type UserType = 'foreigner' | 'local' | null;

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'info' | 'error';
}

interface AppState {
    // Language
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof translations['en'];

    // Auth
    user: UserType;
    userId: string | null;
    userEmail: string | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, role: UserType) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;

    // Quests (Mock)
    userQuests: any[];
    addQuest: (quest: any) => void;
    acceptQuest: (questId: string) => void;

    // Wallet (Mock)
    balance: number;
    earnings: number;

    // Toast
    toasts: Toast[];
    addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
    removeToast: (id: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
    // Language
    language: 'en',
    t: translations['en'],
    setLanguage: (lang) => set({
        language: lang,
        t: translations[lang]
    }),

    // Auth
    user: null,
    userId: null,
    userEmail: null,

    login: async (email, password) => {
        // Admin Backdoor for Demo
        if (email === 'admin@kquest.com' || email === 'admin') {
            set({
                user: 'local', // Admin is treated as an expert/local
                userId: 'admin-user-id',
                userEmail: 'admin@kquest.com',
            });
            get().addToast('Welcome Admin!', 'success');
            return;
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user) {
                set({
                    user: data.user.user_metadata.role || 'foreigner',
                    userId: data.user.id,
                    userEmail: data.user.email,
                });
                get().addToast('Login successful!', 'success');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            get().addToast(error.message || 'Login failed', 'error');
            throw error;
        }
    },

    signup: async (email, password, role) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        role,
                    },
                },
            });

            if (error) throw error;

            if (data.user) {
                set({
                    user: role,
                    userId: data.user.id,
                    userEmail: data.user.email,
                });
                get().addToast('Account created! Please check your email.', 'success');
            }
        } catch (error: any) {
            console.error('Signup error:', error);
            get().addToast(error.message || 'Signup failed', 'error');
            throw error;
        }
    },

    logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, userId: null, userEmail: null });
        get().addToast('Logged out', 'info');
    },

    checkAuth: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            set({
                user: session.user.user_metadata.role || 'foreigner',
                userId: session.user.id,
                userEmail: session.user.email,
            });
        }
    },

    // Quests
    userQuests: [],
    addQuest: async (quest) => {
        const userId = get().userId;
        if (!userId) {
            get().addToast('Please login to post a quest', 'error');
            return;
        }

        // If Admin, just mock it
        if (userId === 'admin-user-id') {
            const newQuest = {
                ...quest,
                id: Math.random().toString(36).substring(7),
                requester_id: userId,
                status: 'open',
                created_at: new Date().toISOString(),
            };
            set((state) => ({ userQuests: [newQuest, ...state.userQuests] }));
            get().addToast('Quest posted (Admin Mode)', 'success');
            return;
        }

        try {
            const { data, error } = await supabase
                .from('quests')
                .insert([
                    {
                        ...quest,
                        requester_id: userId,
                        status: 'open',
                        reward: parseFloat(quest.reward.replace('$', '')), // Ensure number
                    }
                ])
                .select();

            if (error) throw error;

            if (data) {
                set((state) => ({ userQuests: [data[0], ...state.userQuests] }));
                get().addToast('Quest posted successfully!', 'success');
            }
        } catch (error: any) {
            console.error('Add Quest Error:', error);
            // Fallback to mock if DB fails (e.g. table doesn't exist yet)
            const newQuest = {
                ...quest,
                id: Math.random().toString(36).substring(7),
                requester_id: userId,
                status: 'open',
                created_at: new Date().toISOString(),
            };
            set((state) => ({ userQuests: [newQuest, ...state.userQuests] }));
            get().addToast('Quest posted (Offline Mode)', 'info');
        }
    },

    acceptQuest: async (questId) => {
        const userId = get().userId;
        if (!userId) return;

        try {
            const { error } = await supabase
                .from('quests')
                .update({ status: 'in_progress', performer_id: userId })
                .eq('id', questId);

            if (error) throw error;

            set((state) => ({
                userQuests: state.userQuests.map(q =>
                    q.id === questId ? { ...q, status: 'in_progress', performer_id: userId } : q
                )
            }));
            get().addToast('Quest accepted!', 'success');
        } catch (error) {
            // Fallback
            set((state) => ({
                userQuests: state.userQuests.map(q =>
                    q.id === questId ? { ...q, status: 'in_progress', performer_id: userId } : q
                )
            }));
            get().addToast('Quest accepted (Offline Mode)', 'info');
        }
    },

    // Wallet - MOCK
    balance: 0,
    earnings: 0,

    // Toast
    toasts: [],
    addToast: (message, type = 'info') => {
        const id = Math.random().toString(36).substring(7);
        set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
        setTimeout(() => {
            set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
        }, 3000);
    },
    removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
