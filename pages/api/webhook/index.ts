import Stripe from "stripe";
import { buffer } from "micro";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15'
});

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function handler (req: any, res: any) {
    if (req.method === 'POST') {
        let event;
        try {
            const rawBody = await buffer(req);
            const signature = req.headers['stripe-signature']
            event = stripe.webhooks.constructEvent(
                rawBody.toString(),
                signature,
                process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET as string
            )
        } catch (err: any) {
            res.status(400).send(err.message);
            return;
        }

        if (event.type === 'checkout.session.completed')
            console.log('Payment received')

        res.json({ received: true })
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed.')
    }
}