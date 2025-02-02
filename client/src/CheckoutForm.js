import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import CardSection from './CardSection';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    console.log("Card details");
    console.log(elements.getElement(CardElement));

    const fetch = require('node-fetch');

    console.log("Trying to fetch");

    fetch("http://localhost:4242/secret", {
      method: "get", mode: "cors"
    })
    .then(res => res.json())
    .then(async function(json){
      const result = await stripe.confirmCardPayment(json.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Jenny Rosen',
          },
        }
      });

      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log("No good, error:");
        console.log(result.error.message);
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
          console.log("Success! Result:");
          console.log(result);
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}
