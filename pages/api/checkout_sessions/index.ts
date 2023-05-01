import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15'
});

export default async function handler(req: any, res: any) {
    if (req.method === "POST") {
        try {
          const sizes = req?.body?.sizes?.map((el: any) => {
            return el.price + ": " + el.size;
          });
          const session = await stripe.checkout.sessions.create({
              mode: 'payment',
              payment_method_types: ['card'],
              shipping_address_collection: {allowed_countries: ['BR']},
              shipping_options: [
                  {
                    shipping_rate_data: {
                      type: 'fixed_amount',
                      fixed_amount: {amount: req?.body?.shipping?.value.replace(',', ''), currency: 'brl'},
                      display_name: 'Frete',
                      delivery_estimate: {
                        minimum: { unit: 'business_day', value: req?.body?.shipping?.estimate as number },
                        maximum: {unit: 'business_day', value: Number(req?.body?.shipping?.estimate) + 5 },
                      },
                    },
                  },
              ],
              metadata: sizes,
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