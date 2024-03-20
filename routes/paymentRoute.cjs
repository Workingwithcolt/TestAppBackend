const express = require("express");
const router = express.Router(); // Create a router using the function from the express module
const stripe = require("stripe")(process.env.StripeSecretKey);

router.get('/',(req,res)=>{
  res.send({message:"success"})
})
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
console.log(res);
  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: process.env.pubKeyStripe
  });
})

module.exports =  router;

