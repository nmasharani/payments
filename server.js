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
const fs = require('fs')
const logger = fs.createWriteStream('log.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})

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
  let event;

  try {
    event = request.body;
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      logger.write('PaymentIntent was successful!\n');
      logger.write(`Event id: ${event.id}\n`);
      logger.write(`Payment Intent id: ${paymentIntent.id}\n`);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      logger.write('PaymentMethod was attached to a Customer!\n');
      logger.write(`Event id: ${event.id}\n`);
      logger.write(`Payment Method id: ${paymentMethod.id}\n`);
      break;
    case 'charge.succeeded':
      const charge = event.data.object;
      logger.write('Charge was successful!\n');
      logger.write(`Event id: ${event.id}\n`);
      logger.write(`charge id: ${charge.id}\n`);
      break;
    case 'payment_intent.created':
      const newIntent = event.data.object;
      logger.write('Payment intent was created!\n');
      logger.write(`Event id: ${event.id}\n`);
      logger.write(`Payment Intent id: ${newIntent.id}\n`);
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
