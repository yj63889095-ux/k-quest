import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

const PAYPAL_API_URL = process.env.PAYPAL_MODE === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com'

async function getPayPalAccessToken() {
    const auth = Buffer.from(
        `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    ).toString('base64')

    const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${auth}`,
        },
        body: 'grant_type=client_credentials',
    })

    const data = await response.json()
    return data.access_token
}

export async function POST(req: NextRequest) {
    try {
        const { orderId, questId } = await req.json()

        const accessToken = await getPayPalAccessToken()

        // PayPal Order 캡처 (실제 결제 완료)
        const captureResponse = await fetch(
            `${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        )

        const captureData = await captureResponse.json()

        if (captureData.status === 'COMPLETED') {
            const amount = parseFloat(captureData.purchase_units[0].amount.value)
            const platformFee = amount * 0.30
            const performerEarning = amount * 0.70

            // Supabase에 거래 기록 저장
            const { data: transaction, error } = await supabaseAdmin
                .from('transactions')
                .insert({
                    quest_id: questId,
                    amount,
                    platform_fee: platformFee,
                    performer_earning: performerEarning,
                    status: 'completed',
                    paypal_payment_id: orderId,
                })
                .select()
                .single()

            if (error) throw error

            // Quest 상태를 in_progress로 변경
            await supabaseAdmin
                .from('quests')
                .update({ status: 'in_progress' })
                .eq('id', questId)

            return NextResponse.json({
                success: true,
                transaction,
            })
        } else {
            return NextResponse.json(
                { error: 'Payment not completed' },
                { status: 400 }
            )
        }
    } catch (error) {
        console.error('Capture error:', error)
        return NextResponse.json(
            { error: 'Payment capture failed' },
            { status: 500 }
        )
    }
}
