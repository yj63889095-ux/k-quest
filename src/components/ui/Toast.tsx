"use client";

import { useStore } from "@/lib/store";
import { X, CheckCircle, Info, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function ToastContainer() {
    const { toasts, removeToast } = useStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="pointer-events-auto min-w-[300px] bg-[#1A1A1A] border border-[#333] text-white p-4 rounded-sm shadow-2xl flex items-start gap-3 animate-fade-in"
                >
                    {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-[#28a745] mt-0.5" />}
                    {toast.type === 'info' && <Info className="w-5 h-5 text-[#D4AF37] mt-0.5" />}
                    {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-[#dc3545] mt-0.5" />}

                    <div className="flex-1">
                        <p className="text-sm font-medium">{toast.message}</p>
                    </div>

                    <button
                        onClick={() => removeToast(toast.id)}
                        className="text-gray-500 hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}
