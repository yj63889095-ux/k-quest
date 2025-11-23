'use client'

import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import Link from 'next/link'

export default function SignupPage() {
    const { signup, addToast } = useStore()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<'foreigner' | 'local'>('foreigner')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            addToast('Please fill in all fields', 'error')
            return
        }

        if (password.length < 6) {
            addToast('Password must be at least 6 characters', 'error')
            return
        }

        setLoading(true)

        try {
            await signup(email, password, role)
            addToast('Account created successfully!', 'success')
            // Wait a bit for state to update
            await new Promise(resolve => setTimeout(resolve, 1000))
            window.location.href = '/'
        } catch (error) {
            addToast('Signup failed', 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-[#1A1A1A] pt-32 px-6">
            <div className="max-w-md mx-auto">
                <div className="bg-[#262626] border border-[#333] p-8 md:p-12">
                    <h1 className="text-3xl font-serif text-white mb-2">Create Account</h1>
                    <p className="text-gray-400 mb-8">Join K-Quest today</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Email</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ color: '#FFFFFF' }}
                                className="w-full bg-[#1A1A1A] border border-[#333] px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-colors placeholder:text-gray-500"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ color: '#FFFFFF' }}
                                className="w-full bg-[#1A1A1A] border border-[#333] px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-colors placeholder:text-gray-500"
                                placeholder="Minimum 6 characters"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-4">I am a...</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setRole('foreigner')}
                                    className={`p-4 border transition-colors ${role === 'foreigner'
                                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                                        : 'border-[#333] text-gray-400 hover:border-[#555]'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">🌍</div>
                                    <div className="text-sm font-medium">Traveler</div>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('local')}
                                    className={`p-4 border transition-colors ${role === 'local'
                                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                                        : 'border-[#333] text-gray-400 hover:border-[#555]'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">🇰🇷</div>
                                    <div className="text-sm font-medium">Local Expert</div>
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-4 text-lg"
                            disabled={loading}
                        >
                            {loading ? 'Creating account...' : 'Create Account'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Already have an account?{' '}
                            <Link href="/auth/login" className="text-[#D4AF37] hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
