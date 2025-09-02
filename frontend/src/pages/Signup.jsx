import Available from "../images/available.png";
import Best from "../images/best2.png";
import Payment from "../images/payAsGo.png";
import Time from "../images/time.png";
import Sweeping from "../images/sweeping.png";
import Arranged from "../images/arranged.png";
import Footer from "./Footer.jsx";
import React, {useState} from "react";
import api from "./api.js"
import * as events from "node:events";
import postcode, {isValidUKPostcodeFormat, checkPostcodeExists} from "./Postcode.jsx";
import axios from 'axios'
import {Link, useNavigate } from 'react-router-dom'
import LOGO from "../images/logo4.png";

const Signup = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState( {
        firstName: '',
        lastName: '',
        postcode: '',
        email: '',
        password: '',
        roles: '',
        phone: '',
        address: '',
        confirmPassword:'',
        receivedCode: ''
    });
    const [message, setMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [stage, setStage] = useState(1);
    const [code, setCode] = useState('');
    const [time, setTime] = useState('');
    const [messageForCode, setMessageForCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [countDown, setCountDown] = useState(0);
    const [count, setCount] = useState(0);

    const getAdminUser = () => {
        if (!formData.username) { return '' }
        const adminDomains = ['flyclean@gmail.com', 'ogbonnasunday@gmail.com'];
        const isAdmin = adminDomains.some(domain => formData.username.endsWith(domain));
        if (isAdmin) { return formData.username === "admin"; }
        return formData.username === "user";
    }


    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const sanitizedValue = value.replace(/<[^>]*>/g, ''); // Basic XSS prevention
        setFormData({...formData, [name]: sanitizedValue});
        setErrors({});
        setMessage("");
    };

   const  handleVerification1 = (e) => {
        e.preventDefault();
        const newErrors = {};
        const hasCapitalLetter = (str) => /[A-Z]/.test(str);
        const hasNumber = (str) => /\d/.test(str);
        const valid = isValidUKPostcodeFormat(formData.postcode);
        if (!formData.postcode.trim()) newErrors.postcode = 'Postcode is required';
        if (!valid) {
            newErrors.postcode = "postcode not valid";
        }
        checkPostcodeExists(formData.postcode).then(exists => {
            if (!exists) {
              newErrors.postcode = "Postcode does not exist";
            }
        });

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';

        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password.trim()) newErrors.password = 'Password is required';

       if (!formData.confirmPassword.trim()) newErrors.confirmPassword = 'Confrim password is required';

        if (formData.password.trim().length <= 7) newErrors.password = 'password must be at least 8 characters long';

        if (formData.password !== formData.confirmPassword) newErrors.password = 'Confirm password and password must match';

        if (!hasCapitalLetter(formData.password)) newErrors.password = 'Password must contain at least one capital letter';

        if (!hasNumber(formData.password)) newErrors.password = 'Password must contain at least one number';

        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

        if (!formData.postcode.trim()) newErrors.postcode = 'Postcode is required';

        if (!formData.address.trim()) newErrors.address = 'address is required';



        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        sendEmail()
    }
    
    const handleVerication2 = () => {
        const newErrors = {}
        const time = checkTime()
        if (time > 3) {
            newErrors.receivedCode = 'Code has expired';
        }
        if (formData.receivedCode !== code.replace(/\s+/g, '')) {
            newErrors.receivedCode = 'Code is invalid';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setStage(3)
    }
    
    const handleSubmit = (e) => {
       e.preventDefault();
       setLoading(true);
        api.post('/api/users', formData)
            .then((res) => {
                const { success, message } = res.data;
                if (success) {
                    navigate('/login');
                }
                else {
                    setMessage(message);
                }

            })
            .catch((error) => {
                const errorMessage = error.response?.data?.error
                    || error.response?.data?.message
                    || "Error occurred.";
                setMessage(errorMessage);
            })
            .finally(() => {
                setLoading(false);
            })

    }

    function checkTime() {
        const now = new Date(Date.now());
        const diffInMs = Math.abs(time - now);

        // Convert milliseconds to minutes (1 minute = 60,000 milliseconds)
        return Math.floor(diffInMs / (1000 * 60));
    }

    function getSecureRandomNumbers(count) {
        const array = new Uint32Array(count);
        window.crypto.getRandomValues(array);
        return Array.from(array, num => num % 10);
    }

    const sendEmail = (resend = false) => {
       if (countDown > 0) return;
       setLoading(true);
        const randomNumbers = getSecureRandomNumbers(6);

        let sixDigitNumber = '';
        for (let i = 0; i < randomNumbers.length; i++) {
            sixDigitNumber += `${(randomNumbers[i] % 10).toString()} `;
        }

        setCode(sixDigitNumber);

        const emailData = {to: formData.email, text: sixDigitNumber};

       api.post('/api/send-custom-email', emailData)
           .then((res) => {
               const { success, message } = res.data.result;
               if (success) {
                   if (!resend) {
                       setStage(stage + 1);
                   }
                   setTime(new Date())
                   setMessage(null)
                   setMessageForCode(`Verification code has beent sent to ${formData.email}. Please enter the code to continue`);
               }
               else {
                   setMessage(message);
               }
           })
           .catch((error) => {
               setMessage('Error occurred while sending email');
           })
           .finally(() => {
               setLoading(false);
               window.scroll({top: 0, behavior: 'smooth'});
           })
    }

    function startCountdown(seconds) {
        let counter = seconds;

        const interval = setInterval(() => {
            counter--;
            setCountDown(counter);
            if (counter <= 27) {
                setMessageForCode(`Count down at ${counter}`);
            }

            if (counter <= 0) {
                clearInterval(interval);
            }
        }, 1000);
    }

   const handleResend = () => {
       if (countDown > 0 || loading) {
           return;
       }
       if (count > 3) {
           setMessageForCode("Maximum resend count exceeded, wait for 30 seconds.");
           startCountdown(30);
           setCount(0)
           return;
       }
       setCount(count + 1);
       setMessageForCode('');
       sendEmail(true);
   }

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        marginTop:'50px'
    }}>
        {loading && <div className="raise-progress-bar-container">
            <div className="progress-bar-container">
                <div className="spinner"></div>
                <p style={{textAlign:'center'}}>processing data...</p>
            </div>
        </div>}
       <div className={['container', 'main-banner'].join(' ')}>
           <form onSubmit={handleSubmit}>
               <div className={['container', 'main-banner'].join(' ')}
                    style={{display:'flex', flexDirection: 'row',
                        marginTop:'20px', marginBottom:'30px', maxWidth:'1200px'}}>
                   <img src={LOGO} className={'logo-container'}/>
                   <h1 className={'help-text'} style={{textAlign:'start', color:'navy'}}>Sign up</h1>
               </div>
               <label className={'error-message'}>{message}</label>
               {stage === 1 && <div className="form-step">
                   <div className="form-group">
                       <label htmlFor="firstName">First Name*</label>
                       <input
                           type="text"
                           id="firstName"
                           name="firstName"
                           value={formData.firstName}
                           onChange={handleChange}
                           className={'button-bg'}
                           required
                       />
                       {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                   </div>

                   <div className="form-group">
                       <label htmlFor="lastName">Last Name*</label>
                       <input
                           type="text"
                           id="lastName"
                           name="lastName"
                           value={formData.lastName}
                           onChange={handleChange}
                           className={'button-bg'}
                           required
                       />
                       {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                   </div>

                   <div className="form-group" >
                       <label htmlFor="phone">Phone Number*</label>
                       <input
                           type="tel"
                           id="phone"
                           name="phone"
                           value={formData.phone}
                           onChange={handleChange}
                           className={'button-bg'}
                           required
                       />
                       {errors.phone && <span className="error-message">{errors.phone}</span>}
                   </div>

                   <div className="form-group">
                       <label htmlFor="postcode">Postcode*</label>
                       <input
                           type="text"
                           id="postcode"
                           name="postcode"
                           value={formData.postcode}
                           onChange={handleChange}
                           className={'button-bg'}
                           required
                       />
                       {errors.postcode && <span className="error-message">{errors.postcode}</span>}
                   </div>

                   <div className="form-group" >
                       <label htmlFor="email">Email*</label>
                       <input
                           type="email"
                           id="email"
                           name="email"
                           value={formData.email}
                           onChange={handleChange}
                           className={'button-bg'}
                           required
                       />
                       {errors.email && <span className="error-message">{errors.email}</span>}
                   </div>

                   <div className="form-group">
                       <label htmlFor="password">Password*</label>
                       <input
                           type="password"
                           id="password"
                           name="password"
                           value={formData.password}
                           onChange={handleChange}
                           className={'button-bg'}
                           required
                       />
                       {errors.password && <span className="error-message">{errors.password}</span>}
                   </div>

                   <div className="form-group">
                       <label htmlFor="postcode">Confrim password*</label>
                       <input
                           type="password"
                           id="confirmPassword"
                           name="confirmPassword"
                           value={formData.confirmPassword}
                           onChange={handleChange}
                           className={'button-bg'}
                           required
                       />
                       {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                   </div>

                   <div className="form-group">
                       <label htmlFor="Address">Address*</label>
                       <input
                           type="text"
                           id="address"
                           name="address"
                           onChange={handleChange}
                           value={formData.address}
                           className={'button-bg'}
                           required
                       />
                       {errors.address && <span className="error-message">{errors.address}</span>}
                   </div>

                   <button onClick={handleVerification1}
                           type="button" className={loading ? 'back-button' : "next-button"}
                           disabled={loading}
                   >
                       Next
                   </button>
                   
                   <p style={{marginTop:'20px'}}>Already have an account? <Link style={{color:'navy'}} to={'/login'} target="_blank" rel="noopener noreferrer">sign in</Link></p>
               </div>}

               {stage === 2 && <div className="steps">
                   <div className="form-group">
                       <p style={{marginBottom:'12px'}}>{messageForCode}</p>
                       <input
                           type="text"
                           id="code"
                           name="code"
                           placeholder="Enter code sent to your email"
                           onChange={(e) => setFormData({...formData, receivedCode: e.target.value})}
                           value={formData.receivedCode}
                           className={'button-bg'}
                           required
                       />
                       {errors.receivedCode && <span className="error-message">{errors.receivedCode}</span>}
                   </div>

                   <div className="form-actions">
                       <button type="button" disabled={(loading || countDown > 0)} className="back-button" onClick={() => setStage(stage -1)}>
                           Back
                       </button>
                       <button type="button" className={loading ? "back-button" : "next-button"}
                               disabled={(loading || countDown > 0)}
                               onClick={handleVerication2}>
                           Next
                       </button>
                   </div>

                   <p style={{marginTop:'20px'}}>Didn't get a code? <span onClick={handleResend} style={{color:'blue'}}>resend</span></p>
               </div>}

               {stage === 3 && <div className="steps">
                   <div className="form-actions">
                       <button type="button" className="back-button" onClick={() => setStage(stage -1)}>
                           Back
                       </button>
                       <button type="submit" className={loading ? 'back-button' : "submit-button"}
                               disabled={loading}>
                           Submit
                       </button>
                   </div>

               </div>}
           </form>
       </div>
    </div>;
 }
 export default Signup;