import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15'
});

export default async function handler(req: any, res: any) {
    if (req.method === "POST") {
        try {
            const session = await stripe.checkout.sessions.create({
                mode: 'payment',
                payment_method_types: ['card'],
                shipping_address_collection: {allowed_countries: ['BR']},
                shipping_options: [
                    {
                      shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {amount: 0, currency: 'brl'},
                        display_name: 'Frete Grátis',
                        delivery_estimate: {
                          minimum: {unit: 'business_day', value: 5},
                          maximum: {unit: 'business_day', value: 7},
                        },
                      },
                    },
                    {
                      shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {amount: 1500, currency: 'brl'},
                        display_name: 'Sedex',
                        delivery_estimate: {
                          minimum: {unit: 'business_day', value: 1},
                          maximum: {unit: 'business_day', value: 1},
                        },
                      },
                    },
                  ],
                line_items: req?.body?.items ?? [],
                success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/cart`
            });
            res.status(200).json(session)
        } catch (err: any) {
            res.status(500).json({ statusCode: 500, message: err.message })
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }

}