import Stripe from 'stripe';

const stripe = new Stripe("sk_test_placeholder", {
  apiVersion: "2025-02-24.acacia"
});

export { stripe as s };
