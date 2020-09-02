import React from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import CheckoutForm from './CheckoutForm';

// REPLACE THIS TEST PUBLIC KEY WITH YOUR OWN SECRET KEY
const TEST_PUBLIC_KEY = 'pk_test_51HHLuNIFqPLbJe7inVZiu7wKrwdpGMAYytePSQY4sTD0oqzIZP2XpZknqihkNXUMhPquTpXDwh6I0eUC2oN5OgjK00Zmo9jy7N';
const stripePromise = loadStripe(TEST_PUBLIC_KEY);

const App = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default App;
