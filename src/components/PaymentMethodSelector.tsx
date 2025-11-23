import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';
import { StripePaymentForm } from './StripePaymentForm';
import { PaymentButton } from './PaymentButton'; // PayPal button
import { Button } from './ui/Button';
import { CreditCard } from 'lucide-react';

interface PaymentMethodSelectorProps {
    amount: number;
    questId: string;
    onSuccess: () => void;
}

export function PaymentMethodSelector({ amount, questId, onSuccess }: PaymentMethodSelectorProps) {
    const [method, setMethod] = useState<'paypal' | 'stripe'>('stripe');
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        if (method === 'stripe') {
            // Create PaymentIntent as soon as Stripe is selected
            fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, [method, amount]);

    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <button
                    onClick={() => setMethod('stripe')}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all flex items-center justify-center gap-2 ${method === 'stripe'
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                        : 'border-[#333] bg-[#262626] text-gray-400 hover:border-gray-500'
                        }`}
                >
                    <CreditCard className="w-5 h-5" />
                    Credit Card
                </button>
                <button
                    onClick={() => setMethod('paypal')}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all flex items-center justify-center gap-2 ${method === 'paypal'
                        ? 'border-[#0070BA] bg-[#0070BA]/10 text-[#0070BA]'
                        : 'border-[#333] bg-[#262626] text-gray-400 hover:border-gray-500'
                        }`}
                >
                    <span className="font-bold italic">PayPal</span>
                </button>
            </div>

            <div className="mt-6">
                {method === 'stripe' && clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night' } }}>
                        <StripePaymentForm amount={amount} onSuccess={onSuccess} />
                    </Elements>
                )}

                {method === 'paypal' && (
                    <div className="p-4 bg-[#262626] rounded-lg border border-[#333]">
                        <PaymentButton
                            amount={amount}
                            questId={questId}
                            onSuccess={onSuccess}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
