import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment.jsx';
import Checkout from "./Checkout.jsx";


 const CheckoutHome = () => {

     const stripePromise = loadStripe('pk_test_51RhdyVQNUBqNulPTRgAGcLgdBJZZQPNfRkXoXwnQUGhZxPN8CFIz5PI2gGzKr3vLDa2GZVpyVDEMYuolsSKIeNU200wT5VRLe0');

     return (
         <Elements stripe={stripePromise}>
             <Checkout  />
         </Elements>
     );
 }
 export default CheckoutHome;