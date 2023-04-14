import { loadStripe } from "@stripe/stripe-js";

let stripePromisse = null;

const getStripe = () => {
    if(!stripePromisse) {
        stripePromisse = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHBLE_KEY)
    }
    return stripePromisse;
}

export default getStripe;