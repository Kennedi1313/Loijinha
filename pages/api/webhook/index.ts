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
                rawBody,
                signature,
                'whsec_b2e49013f2411641b625cd25c5b3e79137aff9da9db696cd7ebd833b0a7061a4'
                //process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET as string
            )
        } catch (err: any) {
            res.status(400).send(err.message);
            console.log(err)
            return;
        }

        // Successfully constructed event.
        console.log(`✅ Success: ${event.id}`);

        // Cast event data to Stripe object.
        if (event.type === "payment_intent.created") {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            //console.log(`💰 PaymentIntent status: ${paymentIntent.status}`);
            //console.log('-----------------------------------------------------');
        } else if (event.type === "payment_intent.payment_failed") {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            //console.log(`❌ Payment failed: ${paymentIntent.last_payment_error?.message}`);
            //console.log('-----------------------------------------------------');
        } else if (event.type === "customer.created") {
            const customer = event.data.object as Stripe.Customer;
            //console.log(`Customer created: ${customer.id}`);
            //console.log('-----------------------------------------------------');
        } else if(event.type === 'payment_intent.requires_action') {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            //console.log(`❌ Payment requires action: ${paymentIntent.id}`);
        } else if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            //console.log(`💰 Payment succeeded: ${paymentIntent.id}`);
            //console.log('-----------------------------------------------------');
        } else if (event.type === "charge.succeeded") {
            const charge = event.data.object as Stripe.Charge;
            //console.log(`💵 Charge id: ${charge.id}`);
            //console.log('-----------------------------------------------------');
        } else if (event.type === "checkout.session.completed") {
            let checkout_session = event.data.object as Stripe.Checkout.Session;
            checkout_session = await stripe.checkout.sessions.retrieve(
                checkout_session.id, {
                expand: ['line_items']
            });
            console.log(`💳 Session id: ${checkout_session.id}`);
            console.log(`Customer email: ${checkout_session?.customer_details?.email}`);
            console.log(`Order products: `);
            console.log(checkout_session.line_items?.data);
            //console.log('-----------------------------------------------------');
        } else {
            console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
            //console.log('-----------------------------------------------------');
        }
            

        res.json({ received: true })
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed.')
    }
}