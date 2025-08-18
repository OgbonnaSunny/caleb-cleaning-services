import React, {useState, useEffect, useRef} from 'react';
import {
    Elements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import api from './api.js'
import Checkout from "./Checkout.jsx";
//import { VisaIcon, MastercardIcon } from '@stripe/stripe-icons';

 export const fetchData = async (formData) => {
    setProcessing(true);
    try {
        // 1. Create customer or return customerId if already exists - note we send {email} as object
        const createResponse = await api.post('/api/create-customer', { email: formData.email} );

        const { customerId } = createResponse.data;

        // create payement intent
        const amount = Number(formData.totalAmount) * 100;
        const paymentIntent = await api.post('/api/create-payment-intent', {
            amount: amount, // note amount must be in pence. 10 pence = 1 pound
            currency: 'gbp',
            customerId: customerId
        });
        setClientSecret(paymentIntent.data.clientSecret);
        setAmount(amount);
        setCustomerName(customerName);
        setPaymentIntentId(paymentIntent.data.paymentIntentId);
        setOrderId(paymentIntent.data.orderId);

        // 2. Then fetch payment methods - wait until we have customerId
        const paymentResponse = await api.get(`/api/payment-methods/${customerId}`);
        setPaymentMethods(paymentResponse.data);

        setCurrentStep(currentStep+1);
        setProcessing(false);

    } catch (error) {
        console.error("API Error:", {
            status: error.response?.status,
            message: error.response?.data?.message || error.message,
            url: error.config?.url
        });
        setProcessing(false);
    }
};

 export const handleDelayedPaymentAuthorization = async (formData) => {
    // 1. Create customer or return customerId if already exists - note we send {email} as object
    const createResponse = await api.post('/api/create-customer', { email: formData.email } );

    const { customerId } = createResponse.data;

    // Create payment intent first (from your server)
    const response = await api.post('/api/create-deleyed-payment-intent', {
        method: 'POST'
    });
    const { clientSecret } = await response.json();
    setClientSecret(response.clientSecret);
    setAmount(amount);
    setCustomerName(customerName);
    setPaymentIntentId(response.paymentIntentId);
    setOrderId(response.orderId);

    // Confirm the payment (pre-authorization)
    const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
            return_url: 'https://your-site.com/order-confirmation',
        }
    });

    if (error) {
        console.error(error);
    } else if (paymentIntent.status === 'requires_capture') {
        setMessage("You will be charged when the job is done")
        console.log('Pre-authorization successful!');
    }
};


const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);
    const [customerName, setCustomerName] = useState('');
    const [paymetMethods, setPaymetMethods] = useState([]);
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState(null);
    const [paymentIntentId, setPaymentIntentId] = useState(null);
    const [orderId, setOrderId] = useState(null);


    const handlePayment = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        setError(null);
        setMessage(null)

        setProcessing(true);

        // Confirm Card Payment

        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    category: 'Customer Name' // Add dynamic name input if needed
                }
            }
        });

        if (stripeError) {
            setError(stripeError.message);
        }
        else  {
            setMessage('Payment is sucessfully!');
            let month;
            const day = new Date().getDate();
            switch (new Date().getMonth()) {
                case 0:
                    month = 'Jan';
                    break;
                case 1:
                    month = 'Feb';
                    break;
                case 2:
                    month = 'Mar';
                    break;
                case 3:
                    month = 'Apr';
                    break;
                case 4:
                    month = 'May';
                    break;
                case 5:
                    month = 'Jun';
                    break;
                case 6:
                    month = 'Jul';
                    break;
                case 7:
                    month = 'Aug';
                    break;
                case 8:
                    month = 'Sept';
                    break;
                case 9:
                    month = 'Oct';
                    break;
                case 10:
                    month = 'Nov';
                    break;
                case 11:
                    month = 'Dec';
            }
            const paymentData = {
                customer: customerName,
                dayName: day,
                monthName: month,
                yearName: new Date().getFullYear(),
                payment: amount,
                paymentIntentId: paymentIntentId,
                orderId: orderId,
                clientSecret: clientSecret,
            }
            api.post('/api/revenue', paymentData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        }

        setProcessing(false);
    };

    function getPaymentIntentIdFromClientSecret(clientSecret) {
        return clientSecret.split('_')[1];
    }

    const elementOptions = {
        disableLink: true,
        showIcon: true,
        iconStyle: 'solid',
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                letterSpacing: '0.025em',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',   //className="form-group"
            },
        },
    };

    useEffect(() => {
        const cardNumber = elements?.getElement('cardNumber');
        if (cardNumber) {
            // Simulate a "blank" card state showing all supported brands
            cardNumber.update({
                showIcon: true,
                paymentMethod: 'card', // Shows all card brands
                iconStyle: 'solid'
            });
        }
    }, [elements]);

    return (
        <div className="stripe-card-form">
            <div className="price-container">
                <h3 style={{color:'navy', marginBottom:'5px', textAlign:'end'}}>Powered by Stripe</h3>
                <div className="form-row" style={{display: 'block', justifyContent: 'space-between'}}>
                    <label>Card number</label>
                    <CardNumberElement
                        options={elementOptions}
                        className="stripe-card-element"
                    />
                </div>
                <div className="form-row" style={{ display: 'flex', width: '100%', flexDirection: 'row'}} >
                    <div   style={{ flex: '1 1 auto', minWidth: '60%' }}>
                        <label>Expiration date</label>
                        <CardExpiryElement
                            options={elementOptions}
                            className="stripe-card-element"
                        />
                    </div>

                    <div style={{ flex: '0 0 auto', maxWidth: '20%' }}>
                        <label>CVC</label>
                        <CardCvcElement
                            options={elementOptions}
                            className="stripe-card-element"
                        />
                    </div>

                </div>
                <button onClick={handlePayment} type="submit" disabled={!stripe || processing} className="pay-button">
                    {processing ? 'Processing...' : 'Pay'}
                </button>
                {message &&  <label style={{marginTop:'20px', fontSize:'small'}}>{message}</label>}
                {error && <label className="card-error">{error}</label>}
            </div>
        </div>
    );
};

export default Payment;