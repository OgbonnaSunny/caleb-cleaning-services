// PaymentScreen.jsx
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import api from './api.js';

export default function PaymentScreen() {
    const stripe = useStripe();
    const elements = useElements();
    const [customerId, setCustomerId] = useState('');
    const [email, setEmail] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null);
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

    // Create or fetch customer
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Create customer - note we send {email} as object
                const createResponse = await api.post('/create-customer', {
                    email: email // or just {email} if variable name matches
                });

                const { customerId } = createResponse.data;
                setCustomerId(customerId);

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

        fetchData();
    }, []); // Only email as dependency

    // Handle one-time payment
    const handlePayment = async (useSavedPaymentMethod = null) => {
        if (!stripe || !elements) return;

        setIsSubmitting(true);
        setMessage(null);

        try {
            if (useSavedPaymentMethod) {
                // Charge saved payment method directly
                const response = await fetch('/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: 1999, // $19.99
                        customerId,
                    }),
                });
                const { clientSecret } = await response.json();

                const { error } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: useSavedPaymentMethod,
                });

                if (error) throw error;
                setMessage('Payment successful!');
            } else {
                // New payment method
                const { error } = await stripe.confirmPayment({
                    elements,
                    confirmParams: {
                        return_url: window.location.origin + '/success',
                    },
                });

                if (error) throw error;
            }
        } catch (err) {
            setMessage(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle subscription
    const handleSubscribe = async (priceId = 'price_XXX') => {
        if (!stripe || !elements || !customerId) return;

        setIsSubmitting(true);
        setMessage(null);

        try {
            const response = await fetch('/create-subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerId,
                    priceId,
                }),
            });
            const { clientSecret } = await response.json();

            const { error } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: window.location.origin + '/success',
                },
            });

            if (error) throw error;
        } catch (err) {
            setMessage(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

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

            {customerId && (
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
                            disabled={isSubmitting || !email}
                            className="pay-button"
                        >
                            {isSubmitting ? 'Processing...' : 'Pay $19.99'}
                        </button>

                        <button
                            onClick={() => handleSubscribe()}
                            disabled={isSubmitting || !email}
                            className="subscribe-button"
                        >
                            {isSubmitting ? 'Processing...' : 'Subscribe ($9.99/month)'}
                        </button>
                    </div>

                    {message && <div className="message">{message}</div>}
                </div>
            )}
        </div>
    );
}