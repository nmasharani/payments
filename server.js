const http = require('http');
const express = require("express");
const app = express();
const { resolve } = require("path");
const cors = require("cors");

const stripe = require('stripe')('sk_test_51HHLuNIFqPLbJe7iZICK0Q1WRdLQvzMBryxJaQPNlAZmsZD4TE7FZPyCG12vpCxcNGZXF7tnanjisqhNNkK2Rf8600zDlPg1Ss');

app.use(express.static("."));
app.use(express.json());
app.use(cors())

app.get('/secret', async (req, res) => {
  const intent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
  });
  res.json({client_secret: intent.client_secret});
});

app.listen(4242, () => console.log('Node server listening on port 4242!'));
