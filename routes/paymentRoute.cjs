const express = require("express");
const router = express.Router(); // Create a router using the function from the express module
const stripe = require("stripe")("sk_test_51KAWSCSFbFeDhq0VqIOXaQQtkTfDQJowOzj5PvI5f2BtX5ZEUuNaeR5E5Dd7c0RYRIyyrqob9xNCLeKYN622TN7o007z49AxkP");


router.post('/', async (req, res) => {
   // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2023-10-16'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'eur',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: 'pk_test_51KAWSCSFbFeDhq0Vk731Cp1hOPQSBIYGgLdddjjA1ODAW990K51MDZ267GPaE8a04ZQ2rfU5PF1HX3qaSQ2q96VI00qnwJ2bd8'
  });
})
module.exports =  router;

