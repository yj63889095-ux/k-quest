'use client'

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useState } from 'react'
import { useStore } from '@/lib/store'

interface PaymentButtonProps {
    questId: string
    amount: number
    onSuccess: () => void
}

export function PaymentButton({ questId, amount, onSuccess }: PaymentButtonProps) {
    const [loading, setLoading] = useState(false)
    const { addToast } = useStore()

    const createOrder = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/create-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questId, amount }),
            })
            const data = await res.json()
            return data.orderId
        } catch (error) {
            addToast('Payment creation failed', 'error')
            throw error
        } finally {
            setLoading(false)
        }
    }

    const onApprove = async (data: any) => {
        setLoading(true)
        try {
            const res = await fetch('/api/capture-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: data.orderID,
                    questId,
                }),
            })
            const result = await res.json()

            if (result.success) {
                addToast('Payment successful!', 'success')
                onSuccess()
            } else {
                addToast('Payment failed', 'error')
            }
        } catch (error) {
            addToast('Payment failed', 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <PayPalScriptProvider
            options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                currency: 'USD',
            }}
        >
            <div className="relative">
                {loading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded">
                        <div className="text-white">Processing...</div>
                    </div>
                )}
                <PayPalButtons
                    style={{
                        layout: 'vertical',
                        color: 'gold',
                        shape: 'rect',
                        label: 'pay',
                    }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={() => {
                        addToast('Payment error occurred', 'error')
                        setLoading(false)
                    }}
                />
            </div>
        </PayPalScriptProvider>
    )
}
