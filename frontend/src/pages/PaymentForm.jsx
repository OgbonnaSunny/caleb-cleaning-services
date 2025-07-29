import React, { useState, useEffect } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import api from "./api.js";

// Load CheckoutHome outside the component
const stripePromise = loadStripe('your_publishable_key');

const PaymentForm = () => {
    const [email, setEmail] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const fetchData = async () => {
        try {
            // 1. Create customer - note we send {email} as object
            const createResponse = await api.post('/api/create-customer', {
                email: email // or just {email} if variable name matches
            });

            const { customerId } = createResponse.data;
            setCustomerId(customerId);

            const paymentIntentRes = await api.post('/api/create-payment-intent', {
                amount: 1000, // 10.00 pounds
                currency: 'gbp',
                customerId: customerId
            });
            setClientSecret(paymentIntentRes.data.clientSecret);

            // 2. Then fetch payment methods - wait until we have customerId
            const paymentResponse = await api.get(`/api/payment-methods/${customerId}`);
            setPaymentMethods(paymentResponse.data);

        } catch (error) {
            console.error("API Error:", {
                status: error.response?.status,
                message: error.response?.data?.message || error.message,
                url: error.config?.url
            });
        }
    };

    const handlePayment = async (paymentMethodId) => {
        setIsSubmitting(true);
        setMessage('');
        try {
            const stripe = await stripePromise;

            if (paymentMethodId) {
                // Use saved payment method
                const { error } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethodId,
                });
                if (error) throw error;
            } else {
                // Use new payment method from Elements
                const { error } = await stripe.confirmPayment({
                    elements,
                    confirmParams: {
                        return_url: window.location.origin + '/success',
                    },
                });
                if (error) throw error;
            }
            setMessage('Payment successful!');
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubscribe = async () => {
        setIsSubmitting(true);
        setMessage('');
        try {
            // First create subscription on backend
            const response = await fetch('/create-subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customerId, priceId: 'your_price_id' }),
            });
            const { clientSecret: subscriptionClientSecret } = await response.json();

            // Then confirm the payment
            const stripe = await stripePromise;
            const { error } = await stripe.confirmPayment({
                elements,
                clientSecret: subscriptionClientSecret,
                confirmParams: {
                    return_url: window.location.origin + '/success',
                },
            });
            if (error) throw error;
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

   /* <PaymentFormContent
        customerId={customerId}
        paymentMethods={paymentMethods}
        isSubmitting={isSubmitting}
        message={message}
        handlePayment={handlePayment}
        handleSubscribe={handleSubscribe}
        email={email}
    />*/

    return (
        <div className="payment-container">
            <h2>Payment Information</h2>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
                <button onClick={fetchData}>Id Request</button>
            </div>

            {customerId && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                   <PaymentElement />
                </Elements>
            )}
        </div>
    );
};

// Separate component to use CheckoutHome hooks inside Elements provider
const PaymentFormContent = ({
                                customerId,
                                paymentMethods,
                                isSubmitting,
                                message,
                                handlePayment,
                                handleSubscribe,
                                email
                            }) => {
    const stripe = useStripe();
    const elements = useElements();

    return (
        <div>
            {/* Saved Payment Methods */}
            {paymentMethods.length > 0 && (
                <div className="saved-methods">
                    <h3>Saved Payment Methods</h3>
                    {paymentMethods.map((method) => (
                        <div key={method.id} className="payment-method">
                            <div className="card-details">
                                <span className="card-brand">{method.card.brand}</span>
                                <span>•••• •••• •••• {method.card.last4}</span>
                                <span>Exp: {method.card.exp_month}/{method.card.exp_year}</span>
                            </div>
                            <button
                                onClick={() => handlePayment(method.id)}
                                disabled={isSubmitting}
                            >
                                Pay with this card
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* New Payment Method */}
            <div className="payment-element-container">
                <h3>{paymentMethods.length ? 'Or add a new card' : 'Enter payment details'}</h3>
                <PaymentElement
                    options={{
                        layout: {
                            type: 'tabs',
                            defaultCollapsed: false,
                        },

                    }}
                />
            </div>

            {/* Action Buttons */}
            <div className="actions">
                <button
                    onClick={() => handlePayment()}
                    disabled={isSubmitting || !email || !stripe}
                    className="pay-button"
                >
                    {isSubmitting ? 'Processing...' : 'Pay $19.99'}
                </button>

                <button
                    onClick={handleSubscribe}
                    disabled={isSubmitting || !email || !stripe}
                    className="subscribe-button"
                >
                    {isSubmitting ? 'Processing...' : 'Subscribe ($9.99/month)'}
                </button>
            </div>

            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default PaymentForm;