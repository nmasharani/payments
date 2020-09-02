const http = require('http');
const express = require("express");
const app = express();
const { resolve } = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

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

app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  console.log("#######################################################@@@@@");
  console.log("testing webhook");
  //console.log("request: ");
  //console.log(request);
  let event;

  try {
    console.log("OK WE'RE IN THE TRY STATEMENT NOW");
    console.log("body: ");
    console.log(request.body);
    event = JSON.parse(request.body);
  } catch (err) {
    console.log("OK WE'RE IN THE CATCH STATEMENT NOW");
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("event: ");
  console.log(event);

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!');
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    // ... handle other event types TODO
    default:
      // Unexpected event type
      return response.status(400).end();
  }

  // Return a 200 response to acknowledge receipt of the event
  response.json({received: true});
});

app.listen(4242, () => console.log('Node server listening on port 4242!'));
