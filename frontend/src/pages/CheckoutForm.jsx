// CheckoutForm.js
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';

import api from './api.js'
import {useState} from "react";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [customerName, setCustomerName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        // Create payment intent on your server
        const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 1000 }), // amount in cents
        });

        const { clientSecret } = await response.json();

        // Confirm the payment
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Customer Name',
                },
            }
        });

        if (result.error) {
            console.error(result.error.message);
        } else if (result.paymentIntent.status === 'succeeded') {
            console.log('Payment succeeded!');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop:'50px' }}>
            <CardElement stripe={stripe} />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;