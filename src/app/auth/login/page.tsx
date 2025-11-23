'use client'

import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
    const { login, addToast } = useStore()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            addToast('Please fill in all fields', 'error')
            return
        }

        setLoading(true)

        try {
            await login(email, password)
            addToast('Login successful!', 'success')
            setTimeout(() => {
                window.location.href = '/'
            }, 500)
        } catch (error) {
            addToast('Login failed', 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-[#1A1A1A] pt-32 px-6">
            <div className="max-w-md mx-auto">
                <div className="bg-[#262626] border border-[#333] p-8 md:p-12">
                    <h1 className="text-3xl font-serif text-white mb-2">Sign In</h1>
                    <p className="text-gray-400 mb-8">Welcome back to K-Quest</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Email</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ color: '#FFFFFF' }}
                                className="w-full bg-[#1A1A1A] border border-[#333] px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-colors"
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
                                className="w-full bg-[#1A1A1A] border border-[#333] px-4 py-3 focus:border-[#D4AF37] focus:outline-none transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <Button type="submit" className="w-full py-4 text-lg" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Don't have an account?{' '}
                            <Link href="/auth/signup" className="text-[#D4AF37] hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>

                    {/* 데모 계정 안내 */}
                    <div className="mt-8 p-4 bg-[#1A1A1A] border border-[#D4AF37] rounded">
                        <p className="text-[#D4AF37] text-sm font-semibold mb-2">💡 Demo Accounts</p>
                        <p className="text-gray-400 text-xs mb-1">Traveler: <span className="text-white">traveler@demo.com</span></p>
                        <p className="text-gray-400 text-xs mb-1">Local Expert: <span className="text-white">local@demo.com</span></p>
                        <p className="text-gray-400 text-xs">Admin: <span className="text-white">admin</span></p>
                        <p className="text-gray-500 text-xs mt-2 italic">Password not required for demo accounts</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
