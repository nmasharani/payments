Name: Nisha Masharani
Project: Stripe PM take-home assignment (see details at
  https://docs.google.com/document/d/16SgZH2lFcmh1U0ABcdMlkfvupGe2MgxUMDy31qhCVY0/edit)

# Cloning the project

Thank you for testing out my test project! To run this project, you'll first
need to open your terminal and clone it from Github:

>> $ git clone https://github.com/nmasharani/payments.git

If you're not familiar with Github, follow the instructions here to clone:
https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository#cloning-a-repository-using-the-command-line

If necessary, cd into the new cloned directory:

>> $ cd payments/

# Setting up test keys

## Setting up test secret key

In your favorite text editor, open the file server.js. When you do, look at line
9. You should see something that looks like this:

>> const TEST_SECRET_KEY = "sk_test_51HHLuNIFqPLbJe7iZICK0Q1WRdLQvzMBryxJaQPNlAZmsZD4TE7FZPyCG12vpCxcNGZXF7tnanjisqhNNkK2Rf8600zDlPg1Ss";

Go to the stripe test dashboard at https://dashboard.stripe.com/test/dashboard.
There, you should see something that says "Get your test API keys". Click on the
chevron to the left to expand, and click on the eye icon next to "Secret key".

Click to copy the secret key (should start with "sk_test_"), and replace the
text in the quotation marks on line 9 of server.js with your test secret key.

Make sure to save server.js when you're done!

## Setting up test public key

Next, move to the client/src directory:

>> cd client/Search

And open the App.js file in your favorite text editor. When you do, look at line
14. You should see something that looks like this:

>> const TEST_PUBLIC_KEY = 'pk_test_51HHLuNIFqPLbJe7inVZiu7wKrwdpGMAYytePSQY4sTD0oqzIZP2XpZknqihkNXUMhPquTpXDwh6I0eUC2oN5OgjK00Zmo9jy7N';

Go to the stripe test dashboard at https://dashboard.stripe.com/test/dashboard.
There, you should see something that says "Get your test API keys". Click on the
chevron to the left to expand.

Click to copy the public key (should start with "pk_test_"), and replace the
text in the quotation marks on line 14 of App.js with your test public key.

Make sure to save App.js when you're done!

# Running the server

To run the node.js server, you simply have to run "npm start" from the payments/
directory

>> $ npm start

When you do, you should see something like:

> payments@1.0.0 start /path/to/payments
> node server.js
>
> Node server listening on port 4242!

When you see that, you know you've succeeded!

# Running the client

In a separate terminal tab / window, from the payments directory, cd to client
directory, then start the client the same way:

>> $ cd client
>> $ npm start

When you do, you should see something like:

> Starting the development server...

Then something like:

> Compiled with warnings.

> ./src/App.js
>   Line 2:8:  'ReactDOM' is defined but never used     no-unused-vars
>   Line 5:3:  'CardElement' is defined but never used  no-unused-vars
>   Line 7:3:  'useStripe' is defined but never used    no-unused-vars
>   Line 8:3:  'useElements' is defined but never used  no-unused-vars

> Search for the keywords to learn more about each warning.
> To ignore, add // eslint-disable-next-line to the line before.

You should also be switched over to a browser tab automatically with URL
http://localhost:3000/. If not, open a new tab in your brower (e.g., Chrome,
  Safari) and go to the URL http://localhost:3000/.

When you do, you should see a white page which says "card details" at the top
and has a field for card number, date (MM/YY), and CVC, with a button below for
"confirm order".

# Testing using the web test integration checker

To run the web test integration tests, follow the instructions above to run both
the server and the client. Then, open
https://stripe.com/docs/payments/accept-a-payment#web-test-integration. At the
bottom, under step 5, you should see a list of test scenarios.

Click the clipboard icon next to a test credit card number to copy that number, then go
to the client (http://localhost:3000) and paste the test credit card number in.
Enter any expiration date (after the current date), zip code, and CVC. Then,
click the "confirm order" button to run the test case.

You can confirm the test payment worked by going to
https://stripe.com/docs/payments/accept-a-payment#web-test-integration and
clicking the "check payments" button at the bottom.

# Testing using the webhook and Stripe CLI

Follow the instructions here to install the Stripe CLI:
https://stripe.com/docs/payments/handling-payment-events#install-cli

Then, follow the instructions here to test the webhook using the Stripe CLI:
https://stripe.com/docs/payments/handling-payment-events#use-cli

You should see the event id and additional data for successful payments written
to the log.txt file. To check, open the log.txt file. 
