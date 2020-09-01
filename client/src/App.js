import React from 'react';
import ReactDOM from 'react-dom';
import logo from './hotdog-dog.png';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51HHLuNIFqPLbJe7inVZiu7wKrwdpGMAYytePSQY4sTD0oqzIZP2XpZknqihkNXUMhPquTpXDwh6I0eUC2oN5OgjK00Zmo9jy7N');

const App = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default App;
