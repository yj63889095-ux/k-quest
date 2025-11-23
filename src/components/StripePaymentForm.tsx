import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from './ui/Button';
import { useStore } from '@/lib/store';

interface StripePaymentFormProps {
    amount: number;
    onSuccess: () => void;
}

export function StripePaymentForm({ amount, onSuccess }: StripePaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const { addToast } = useStore();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);

        const { error: submitError } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment/success`,
            },
            redirect: 'if_required',
        });

        if (submitError) {
            setError(submitError.message || 'An unexpected error occurred.');
            addToast(submitError.message || 'Payment failed', 'error');
            setProcessing(false);
        } else {
            addToast('Payment successful!', 'success');
            onSuccess();
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 bg-[#262626] rounded-lg border border-[#333]">
                <PaymentElement
                    options={{
                        layout: 'tabs',
                    }}
                />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button
                type="submit"
                disabled={!stripe || processing}
                className="w-full bg-[#D4AF37] text-black hover:bg-[#B5952F]"
            >
                {processing ? 'Processing...' : `Pay $${amount}`}
            </Button>
        </form>
    );
}
