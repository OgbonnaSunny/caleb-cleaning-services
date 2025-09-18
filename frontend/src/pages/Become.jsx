import React, { useState, useRef } from 'react';
import Cleaner from '../images/rug.png'
import SignUp from '../images/signup.png'
import Interview from '../images/interview.png'
import UniformBranded from '../images/uniformBranded.png'
import Upload from '../images/upload.png'
import Training from '../images/training.png'
import {FaArrowLeft, FaArrowRight, FaEye, FaEyeSlash} from 'react-icons/fa';
import Meeting from "../images/meeting.png";
import { Link, useNavigate } from 'react-router-dom'
import postcode, {isValidUKPostcodeFormat, checkPostcodeExists} from "./Postcode.jsx";
import api from "./api.js";

const Become = () => {
    const navigate = useNavigate();

    const services = ['Regular cleaning, one-off cleaning']
    const serviceNames = JSON.stringify(services)

    const cleanerData = {
        firstName: '', lastName:'', postcode:'', email:'',
        password:'', roles:'cleaner', phone:'', address:'', termsAccepted: false,
        photo: null, identity: null, ni: null, addressProof: null,
        isActive: false, isOnLeave: false, payRate: 0,
        NIN: null, bio: 'A professional cleaner with attention to details', emergency: null,
        workExperience: null, available: null, notification: null, receivedCode: ''
    }

    const [formData, setFormData] = useState(cleanerData);

    const inputRef = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();
    const inputRef4 = useRef();
    const containerRef = useRef(null);

    const [errors, setErrors] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [imageId, setImageId] = useState('');
    const [stageId, setStageId] = useState('');
    const [before, setBefore] = useState(true);
    const [after, setAfter] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [IDPreview, setIDPreview] = useState(null);
    const [NIPreview, setNIPreview] = useState(false);
    const [addressProofPreview, setAddressProofPreview] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [countDown, setCountDown] = useState(0);
    const [messageForCode, setMessageForCode] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [time, setTime] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const handleImage = (e) => {
        const newErrors = {}
        setErrors(newErrors)
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        if (imageId === 'photo') {
            setFormData({...formData, photo: file});
            if (!isValidFileSize(file)) {
                newErrors.photo = 'file is too large';
            }
            else if (!isValidFileType(file)) {
                newErrors.photo = 'file is invalid';
            }
            else if (!isValidFileType(file) && !isValidFileSize(file)) {
                newErrors.photo = 'file is invalid';
            }
            reader.onload = (e) => {
                setPhotoPreview(e.target.result);
            }
        }
        if (imageId === 'orderId') {
            setFormData({...formData, identity: file});
            if (!isValidFileSize(file)) {
                newErrors.identity = 'file is too large';
            }
            else if (!isValidFileType(file)) {
                newErrors.identity = 'file is invalid';
            }
            else if (!isValidFileType(file) && !isValidFileSize(file)) {
                newErrors.identity = 'file is invalid';
            }
            reader.onload = (e) => {
                setIDPreview(e.target.result);
            }
        }
        if (imageId === 'addressProof') {
            setFormData({...formData, addressProof: file});
            if (!isValidFileSize(file)) {
                newErrors.addressProof = 'file is too large';
            }
            else if (!isValidFileType(file)) {
                newErrors.addressProof = 'file is invalid';
            }
            else if (!isValidFileType(file) && !isValidFileSize(file)) {
                newErrors.addressProof = 'file is invalid';
            }
            reader.onload = (e) => {
                setAddressProofPreview(e.target.result);
            }
        }
        if (imageId === 'ni') {
            setFormData({...formData, ni: file});
            if (!isValidFileSize(file)) {
                newErrors.ni = 'file is too large';
            }
            else if (!isValidFileType(file)) {
                newErrors.ni = 'file is invalid';
            }
            else if (!isValidFileType(file) && !isValidFileSize(file)) {
                newErrors.ni = 'file is invalid';
            }
            reader.onload = (e) => {
                setNIPreview(e.target.result);
            }
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        }

    }

    const handleChange = (e) => {
        const { name, value, type, checked, file } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    const validateStep1 = () => {
        const newErrors = {};
        const valid = isValidUKPostcodeFormat(formData.postcode);
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';

        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

        if (!formData.postcode.trim()) newErrors.postcode = 'Postcode is required';

        if (!valid) {
            newErrors.postcode = "postcode not valid";
        }

        if (!formData.address.trim()) newErrors.address = 'Address is required';

        checkPostcodeExists(formData.postcode).then(exists => {
            if (!exists) {
                newErrors.postcode = "Postcode does not exist";
            }
        });

        if (!formData.NIN.trim()) newErrors.NIN = 'NI is required';

        if (!isValidNINumber(formData.NIN)) newErrors.NIN = 'NI is invalid';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }
        return true;
    };

    function isValidNINumber(niNumber) {
        // Remove all whitespace and convert to uppercase
        const cleaned = niNumber.replace(/\s/g, '').toUpperCase();

        // Basic format check
        if (!/^[A-Z]{2}\d{6}[A-Z]$/.test(cleaned)) {
            return false;
        }

        // Check for invalid prefixes
        const invalidPrefixes = ['BG', 'GB', 'NK', 'KN', 'TN', 'NT', 'ZZ'];
        const prefix = cleaned.substring(0, 2);
        if (invalidPrefixes.includes(prefix)) {
            return false;
        }

        // Check first letter isn't D, F, I, Q, U or V
        const firstLetter = cleaned.charAt(0);
        if (['D', 'F', 'I', 'Q', 'U', 'V'].includes(firstLetter)) {
            return false;
        }

        // Check second letter isn't O
        const secondLetter = cleaned.charAt(1);
        if (secondLetter === 'O') {
            return false;
        }

        // Additional checks for temporary ni numbers
        const suffix = cleaned.charAt(8);
        if (['T', 'F'].includes(suffix)) {
            // Temporary numbers have additional rules
            if (prefix === 'TN' || prefix === 'ZZ') {
                return false;
            }
        }

        return true;
    }

    const validateStep2 = () => {
        const newErrors = {};
        const hasCapitalLetter = (str) => /[A-Z]/.test(str);
        const hasNumber = (str) => /\d/.test(str);

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!hasCapitalLetter(formData.password)) {
            newErrors.password = 'Password must contain at least one capital letter';
        }

        if (!hasNumber(formData.password)) {
            newErrors.password = 'Password must contain at least one number';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.termsAccepted) {
            newErrors.termsAccepted = 'You must accept the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidFileSize = (file) => {
        return  file.size <= 5 * 1024 * 1024;
    }

    const  isValidFileType = (file) => {
        return ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type);
    }

    const validateStep3 = () => {
        const newErrors = {};
        if (!formData.photo) newErrors.photo = 'File is required';
        if (formData.photo) {
            if (!isValidFileSize(formData.photo)) newErrors.photo = 'Photo is too large';
            if (!isValidFileType(formData.photo)) newErrors.photo = 'Photo is invalid';
        }

        if (!formData.identity) newErrors.Identity = 'ID is required';
        if (formData.identity) {
            if (!isValidFileSize(formData.identity)) newErrors.Identity = 'ID is too large';
            if (!isValidFileType(formData.identity)) newErrors.Identity = 'ID is invalid';
        }

        if (!formData.addressProof) newErrors.addressProof = 'proof of address is required';
        if (formData.addressProof) {
            if (!isValidFileSize(formData.addressProof)) newErrors.addressProof = 'proof of address is too large';
            if (!isValidFileType(formData.addressProof)) newErrors.addressProof = 'proof of address is invalid';
        }

        if (!formData.ni) newErrors.NI = 'NI is required';
        if (formData.ni) {
            if (!isValidFileSize(formData.ni)) newErrors.NI = 'NI is too large';
            if (!isValidFileType(formData.ni)) newErrors.NI = 'NI  is invalid';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }
        return true;
    }

    const handleNext = () => {
        if (validateStep1()) {
            setCurrentStep(currentStep+1);
        }
    };

    const handleNext2 = () => {
        if (validateStep2()) {
            setCurrentStep(currentStep+1);
        }
    }

    const validateProofs = () => {
        const newErrors = {};
        if (!formData.identity) newErrors.identity = 'ID is required';
        if (!formData.photo) newErrors.photo = 'Photo is required';
        if (!formData.ni) newErrors.ni = 'NI is required';
        if(!formData.addressProof) newErrors.addressProof = 'Proof of address is required';
        if(Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }
        return true;
    }

    const handleNext3 = () => {
      if (validateStep3() && validateProofs()) {
          sendEmail()
      }
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

    function getSecureRandomNumbers(count) {
        const array = new Uint32Array(count);
        window.crypto.getRandomValues(array);
        return Array.from(array, num => num % 10);
    }

    const sendEmail = (resend = false) => {
        if (countDown > 0) return;
        setLoading(true);
        setError(null)
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
                        setCurrentStep(currentStep+1);
                    }
                    setTime(new Date())
                    setMessageForCode(`Verification number has beent sent to ${formData.email}. Please enter the number to continue`);
                }
                else {
                    setError(message);
                }
            })
            .catch((error) => {
                setError('Error occurred while sending email');
            })
            .finally(() => {
                setLoading(false);
            })
    }

    function checkTime() {
        const now = new Date(Date.now());
        const diffInMs = Math.abs(time - now);

        return Math.floor(diffInMs / (1000 * 60));
    }

    const isCodeValidated = () => {
        const time = checkTime()
        if (time > 3) {
            setError('Code has expired')
            return false;
        }
        if (formData.receivedCode !== code.replace(/\s+/g, '')) {
            setError('Code is invalid');
            return false;
        }
        return true;
    }

    const cleanerBenefits = [
        {
            orderId: 1,
            benefit: "Great pay",
            detail: "Make £10+/hour as a cleaner by just picking up orders online"
        },
        {
            orderId: 2,
            benefit: "Flexible schedule",
            detail: "You decide when and how many hours you want to work"
        },
        {
            orderId: 3,
            benefit: "Training",
            detail: "We provide mandatory training for all cleaners to guarantee high quality of service to customers"
        },
        {
            orderId: 4,
            benefit: "Easy payments",
            detail: "We deposit your earnings directly into your bank account once a week"
        },
        {
            orderId: 5,
            benefit: "Safety",
            detail: "Your safety at work is our priority"
        }
    ];

    const show = {display:''}
    const hide = {display:'none'};

    const becomeAcleaner = [
        {orderId: 'stage 1',
            src: SignUp,
            action: 'Sign up on the website',
            naration: 'Sign up by filling the forms bellow step by step'
        },
        {orderId: 'stage 2',
            src: Upload,
            action: 'Upload required documents',
            naration: 'Before you can start working at Fly cleaner, please, share with us the documents listed below. You can add a photo or scan each document to your profile and bring originals with you when you are invited for an interview.' +
                '\n\n' +
                'Photo,' + '\n' +
                'ID,' + '\n' +
                'NI,' + '\n' +
                'and proof of the address.' + '\n' +
                'We do a criminal check for each potential cleaner before hiring anyone',
        },
        {orderId: 'stage 3',
            src: Interview,
            action: 'Have an interview',
            naration: 'After screening of your documents, we will interview you.',
        },
        {orderId: 'stage 4',
            src: Training,
           action: 'Receive a full-day training',
           naration: 'Go through a full day of training and find out Fly cleaner service standards and T&C, how to clean, etc. When you complete the training, you will be authorized to activate your account on our website',
        },
        {orderId: 'stage 5',
            src: UniformBranded,
            action: 'Receive branded uniform and materials',
            naration: 'We will provide you with branded uniform (T-shirt, an apron, and a backpack) and cleaning supplies.\n' +
            '*Please, note, that we give a branded uniform for free, but you will have to pay for cleaning materials themselves. We will withdraw fee for the cleaning stuff from your account after your first earning.'
        }
    ]

    const links = [
        {orderId: 1,
            item: 'Terms and Conditions',
            path: '/terms',
        },
        {orderId: 2,
            item: 'Booking Policy',
            path: '/booking',
        },
        {orderId: 3,
            item: 'Cancellation Policy',
            path: '/cancellation',
        },
        {orderId: 4,
            item: 'Cookies Policy',
            path: '/cookies',
        },
        {orderId: 5,
            item: 'Privacy Policy',
            path: '/privacy',
        },
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null)
        if (!isCodeValidated()) {
            return;
        }
        setLoading(true);
        const data = new FormData();

        // Append text fields
        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('postcode', formData.postcode);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('roles', formData.roles);
        data.append('phone', formData.phone);
        data.append('address', formData.address);
        data.append('termsAccepted', formData.termsAccepted);
        data.append('isActive', formData.isActive);
        data.append('isOnLeave', formData.isOnLeave);
        data.append('payRate', formData.payRate);
        data.append('NIN', formData.NIN);
        data.append('bio', formData.bio);
        data.append('emergency', formData.emergency);
        data.append('workExperience', formData.workExperience);
        data.append('available', formData.available);
        data.append('notification', formData.notification);

        // Append file fields
        const newErrors = {};
        if (formData.photo) data.append('photo', formData.photo);
        else {newErrors.photo = 'photo is required';}

        if (formData.identity) data.append('identity', formData.identity);
        else {newErrors.identity = 'ID is required';}

        if (formData.ni) data.append('ni', formData.ni);
        else {newErrors.ni = 'NI is required';}

        if (formData.addressProof) data.append('addressProof', formData.addressProof);
        else {newErrors.addressProof = 'Address proof is required';}

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        };

        api.post('/api/users', data)
            .then((res) => {
                setCurrentStep(currentStep+1)
                navigate('/login')
            })
            .catch((err) => {
                console.log(err);
                setMessage('Registration failed');
            })
            .finally(() => {
                setLoading(false);
            })
    };

    const handleScroll = () => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const updateProfilePicture = () => {
        axios.post('/upload', file, {
            onUploadProgress: progressEvent => {
                const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`${percent}% uploaded`);
            }
        });
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures it takes at least full viewport height
        }}>
            {loading && <div className="raise-progress-bar-container">
                <div className="progress-bar-container">
                    <div className="spinner"></div>
                    <p style={{textAlign:'center'}}>processing credentials...</p>
                </div>
            </div>}
            <section className={'become-banner'}>
                <div className={'container'} >
                    <h1 className={'help-text'} style={{textAlign:'start'}}>Become a cleaner</h1>
                    <p style={{color:'black', textAlign:'start', width:'100%', padding:'10px'}}>
                        Part time flexible cleaning role with £15/h average monthly rate or full time role with £1800+/month
                    </p>

                    <div style={{display: 'block', textAlign:'start', marginTop:'30px'}}>
                        <h1 className={'help-text'}>What is Fly cleaner?</h1>
                        <h4 style={{maxWidth: '1200px', color:'brown', padding:'10px'}}>Fly cleaner is a service aggregator that connects households and cleaners, whom we call Fly cleaners.
                            Fly cleaner acts as a powerful platform arranging fast and high-quality service for the clients</h4>
                        <p style={{ marginTop:'30px', color:'black', padding:'10px', maxWidth:'1200px'}}>Our platform facilitates
                            and provides part-time and full-time work for people in the cleaning industry through
                            live training for Fly cleaaners to guarantee the highest level of quality. We ensure safety for both: Fly cleaners and customers,
                            and solve issues that can arise between them</p>
                    </div>

                    <button onClick={ handleScroll } style={{ maxWidth:'300px', background:'navy', borderRadius:'12px'}}>Join now</button>

                </div>
            </section>

            <section className={['container', 'main-banner']}>
                <div className={'container'}>

                </div>
            </section>

            <section className={'main-banner'}>
                <div className={'container'}>
                    <h2 className={'experience-text'} style={{textAlign:'center', marginBottom:'30px', color:'navy', marginTop:'20px'}}>Benefits of joining Fly Cleaner</h2>
                    <div className={'grid-container'}>
                        {cleanerBenefits.map((benefit) => (
                            <div className={'price-container'} key={benefit.orderId}>
                                <h3 style={{textAlign:'center'}}>{benefit.benefit}</h3>
                                <p>{benefit.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={'main-banner'}>
                <div className={'container'}>
                    <h2 className={'experience-text'} style={{textAlign:'center', color:'navy', marginTop:'20px'}}>To get you started</h2>
                    <p style={{textAlign:'center'}}>To work with Fly cleaner you need to</p>
                    <div className={'grid-container'}>
                        {becomeAcleaner.map((cleaner) => (
                            <div className={'price-container'} key={cleaner.orderId}>
                                <h3 style={{textAlign:'center'}}>{cleaner.orderId}</h3>
                                <img src={cleaner.src} alt="" className={'cart-image5'}/>
                                <div style={{display:'flex', justifyContent:'center'}}>
                                    < FaArrowLeft style={{color:'black', width:'30px', marginTop:'24px', marginBottom:'30px'}}
                                                  className={cleaner.orderId === stageId ? 'rotate-down': 'rotate-up'}
                                                  onClick={() => { stageId !== cleaner.orderId ? setStageId(cleaner.orderId) : setStageId('') }}/>
                                    <div style={{display:'block', paddingLeft:'10px', paddingRight:'10px', marginTop:'20px'}}>
                                        <h4 style={{textAlign:'start'}}>{cleaner.action}</h4>
                                        <p style={cleaner.orderId === stageId ? show: hide}>{cleaner.naration}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'container'}>
                    <div className={'idea-container'}>
                        <img src={Meeting} alt={"cleaners"} className={'cart-image2'}/>
                        <div className="price-container">
                            <h2 className={'experience-text'} style={{textAlign:'center'}}>Requirements</h2>
                            <p>To work with Fly Cleaner you need to</p>
                            <ul className={'dot-list'}>
                                <li>Be 18+ years old</li>
                                <li>Be legally allowed to work in the UK</li>
                                <li>Have a smartphone</li>
                                <li>
                                    Provide us with copy of your:
                                    <ul className={'dot-list'}>
                                        <li>- Photo</li>
                                        <li>- Identity</li>
                                        <li>- ni</li>
                                        <li>- Proof of the address</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className={['main-banner', 'container'].join(' ')}>
                <h1 className={'experience-text'} style={{textAlign:'center', color:'navy', marginTop:'20px'}}>Your safety at work is our priority</h1>
                <div style={{marginBottom:'30px'}}>
                    <label className="custom-checkbox">
                        <input
                            type="checkbox"
                            checked={before}
                            onChange={() => {setAfter(false); setBefore(!before)}}
                            className="hidden-checkbox"
                        />
                        <span className="checkbox-custom"></span>
                        Before cleaning
                    </label>
                    <label className="custom-checkbox">
                        <input
                            type="checkbox"
                            checked={after}
                            onChange={() => {setBefore(false); setAfter(!after);}}
                            className="hidden-checkbox"
                        />
                        <span className="checkbox-custom"></span>
                        After cleaning
                    </label>
                </div>
                <div className={'grid-container'} style={before ? show : hide}>
                    <div className={'price-container'}>
                        <h3 style={{color:'navy', textAlign:'center'}}>No anonymous customers</h3>
                        <p>All customers must create an account and provide their name, email address, and phone number before they can request a cleaner.
                            That is why, when you accept the job you will know who made the request and so will we. Moreover, customers will have rating and
                            feedback from other cleaners (provided that they are not completely new to our service).
                        </p>
                    </div>
                    <div className={'price-container'}>
                        <h3 style={{color:'navy', textAlign:'center'}}>24/7 support</h3>
                        <p>
                            Our support team is always ready to respond to any questions you may have about your cleaning experience
                        </p>
                    </div>
                </div>

                <div className={'grid-container'} style={after ? show : hide}>
                    <div className={'price-container'}>
                        <h3 style={{color:'navy', textAlign:'center'}}>Payment</h3>
                        <p>
                            Customer’s account is automatically charged for any fares. You will avoid using cash and any potential issues associated with non-payment.
                        </p>
                    </div>
                    <div className={'price-container'}>
                        <h3 style={{color:'navy', textAlign:'center'}}>Cleaners feedback</h3>
                        <p>
                            You rate your customer after each job. We review those ratings on a regular basis to ensure that everyone you worked for is as respectful
                            as you are. Customers reported to violate our terms of service may be prevented from using Fly cleaner.
                        </p>
                    </div>
                    <div className={'price-container'}>
                        <h3 style={{color:'navy', textAlign:'center'}}>24/7 support</h3>
                        <p>
                            Our support team is always ready to respond to any questions you may have about your cleaning experience
                        </p>
                    </div>
                </div>
            </section>

            <section className={['container', 'main-banner'].join(' ')}>
                <div className="cleaner-registration">
                    <div className="registration-header" ref={containerRef}>
                        <h1 className={'experience-text'} style={{textAlign:'center', color:'navy'}}>Register as a Cleaner</h1>
                        <p style={{textAlign:'center'}}>Join our platform and start earning today</p>
                    </div>

                    <div className="registration-steps" >
                        <div className={`step ${currentStep === 1 || currentStep > 1 ? 'active' : ''}`} >
                            <span>1</span>
                            <p>Identity</p>
                        </div>

                        <div className={`step ${currentStep === 2 || currentStep > 2 ? 'active' : ''}`}>
                            <span>2</span>
                            <p>Data</p>
                        </div>

                        <div className={`step ${currentStep === 3 || currentStep > 3 ? 'active' : ''}`} >
                            <span>3</span>
                            <p>Documents</p>
                        </div>

                        <div className={`step ${currentStep === 4 ? 'passive' : currentStep === 5 ? 'active' : ''}`} >
                            <span>4</span>
                            <p>Finish</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <h3 style={{marginTop:'30px', marginBottom:'30px'}}>{message}</h3>
                        {currentStep === 1 && (<div className="form-step">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name*</label>
                                    <input
                                        type="text"
                                        orderId="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={errors.firstName ? 'error' : 'button-bg'}
                                    />
                                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name*</label>
                                    <input
                                        type="text"
                                        orderId="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={errors.lastName ? 'error' : 'button-bg'}
                                    />
                                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                                </div>

                                <div className="form-group" >
                                    <label htmlFor="email">Email*</label>
                                    <input
                                        type="email"
                                        orderId="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={errors.email ? 'error' : 'button-bg'}
                                    />
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>

                                <div className="form-group" >
                                    <label htmlFor="phone">Phone Number*</label>
                                    <input
                                        type="tel"
                                        orderId="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={errors.phone ? 'error' : 'button-bg'}
                                    />
                                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="postcode">Postcode*</label>
                                    <input
                                        type="text"
                                        orderId="postcode"
                                        name="postcode"
                                        value={formData.postcode}
                                        onChange={handleChange}
                                        className={errors.postcode ? 'error' : 'button-bg'}
                                    />
                                    {errors.postcode && <span className="error-message">{errors.postcode}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="NI">NI*</label>
                                    <input
                                        type="text"
                                        orderId="NIN"
                                        name="NIN"
                                        value={formData.NIN}
                                        onChange={handleChange}
                                        className={errors.NIN ? 'error' : 'button-bg'}
                                    />
                                    {errors.NIN && <span className="error-message">{errors.NIN}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="Address">Address*</label>
                                    <textarea
                                        orderId="address"
                                        name="address"
                                        value={formData.address}
                                        rows={5}
                                        onChange={handleChange}
                                        className={errors.address ? 'error' : 'button-bg'}
                                    />
                                    {errors.address && <span className="error-message">{errors.address}</span>}
                                </div>

                                <button type="button" className="next-button" onClick={handleNext}>
                                    Next
                                </button>
                            </div>)}

                        {currentStep === 2 && (<div className="form-step">
                                <h3 style={{textAlign:'center', marginBottom:'20px'}}>Create login creadentials</h3>
                                <div className="form-group">
                                    <label htmlFor="password">Password*</label>
                                    <div className="password-container">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            orderId="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={'password-input'}
                                        />
                                        <label
                                            className={'toggle-button'}
                                            onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <FaEyeSlash style={{color:'blue'}} /> : <FaEye style={{color:'blue'}} />}
                                        </label>
                                    </div>
                                    {errors.password && <span className="error-message">{errors.password}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password*</label>
                                    <div className="password-container">
                                        <input
                                            type={showPasswordConfirm ? 'text' : 'password'}
                                            orderId="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className={'password-input'}
                                        />
                                        <label
                                            className={'toggle-button'}
                                            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>
                                            {showPasswordConfirm ? <FaEyeSlash style={{color:'blue'}} /> : <FaEye style={{color:'blue'}} />}
                                        </label>
                                    </div>
                                    {errors.confirmPassword && (
                                        <span className="error-message">{errors.confirmPassword}</span>
                                    )}
                                </div>

                                <div className="form-group checkbox-group">
                                    <div style={{marginLeft:'20px', display:'flex', justifyContent:'center', alignItems: 'center'}}>
                                        <input
                                            type="checkbox"
                                            orderId="termsAccepted"
                                            name="termsAccepted"
                                            checked={formData.termsAccepted}
                                            onChange={handleChange}
                                            className={errors.termsAccepted ? 'error' : ''}
                                        />
                                        <p>I accept the <Link to={'/terms'} style={{color:'blue'}} >terms and conditions</Link> and <Link to={'/privacy'} style={{color:'blue'}}>privacy</Link> policies</p>
                                    </div>
                                    {errors.termsAccepted && (<spam className="error-message">{errors.termsAccepted}</spam>)}
                                </div>

                                <div className="form-actions">
                                    <button type="button" className="back-button" onClick={() => setCurrentStep(currentStep -1)}>
                                        Back
                                    </button>
                                    <button type="button" className="next-button" onClick={handleNext2}>
                                        Next
                                    </button>
                                </div>
                            </div>)}

                        {currentStep === 3 && (<div className="form-step">
                                <div className="form-group">
                                    <h3 style={{textAlign:'center', marginBottom:'30px'}}>Upload documents</h3>
                                    <div className="grid-container">
                                        <div className="form-group">
                                            <spam style={{fontSize:'medium'}}>Upload photo</spam>
                                            <input
                                                type="file"
                                                accept="application/pdf, image/*"
                                                orderId="photo"
                                                ref={inputRef}
                                                name="photo"
                                                onClick={() => setImageId('photo')}
                                                onChange={handleImage}
                                                style={{background:'olive', color:'white', borderRadius:'13px', border:'brown'}}
                                                className={errors.photo ? 'error' : ''}
                                            />
                                            {photoPreview && <img src={photoPreview} className={'preview'}/>}
                                            {errors.photo && <span className="error-message">{errors.photo}</span>}
                                        </div>

                                        <div className="form-group">
                                            <spam style={{fontSize:'medium'}}>Upload ID Card</spam>
                                            <input
                                                type="file"
                                                accept="application/pdf, image/*"
                                                orderId="orderId"
                                                name="ID"
                                                ref={inputRef2}
                                                onClick={() => setImageId('orderId')}
                                                onChange={handleImage}
                                                className={errors.identity ? 'error' : ''}
                                                style={{background:'olive', color:'white', borderRadius:'13px', border:'brown'}}
                                            />
                                            {IDPreview && <img src={IDPreview} className={'preview'}/>}
                                            {errors.identity && <span className="error-message">{errors.identity}</span>}
                                        </div>

                                        <div className="form-group">
                                            <spam style={{fontSize:'medium'}}>Upload NI proof</spam>
                                            <input
                                                type="file"
                                                accept="application/pdf, image/*"
                                                orderId="ni"
                                                name="ni"
                                                ref={inputRef4}
                                                onClick={() => setImageId('ni')}
                                                onChange={handleImage}
                                                className={errors.identity ? 'error' : ''}
                                                style={{background:'olive', color:'white', borderRadius:'13px', border:'brown'}}
                                            />
                                            {NIPreview && <img src={NIPreview} className={'preview'}/>}
                                            {errors.ni && <span className="error-message">{errors.ni}</span>}
                                        </div>

                                        <div className="form-group">
                                            <spam style={{fontSize:'medium'}}>Upload proof of address</spam>
                                            <input
                                                type="file"
                                                accept="application/pdf, image/*"
                                                orderId="addressProof"
                                                ref={inputRef4}
                                                name="addressProof"
                                                onClick={() => setImageId('addressProof')}
                                                onChange={handleImage}
                                                style={{background:'olive', color:'white', borderRadius:'13px', border:'red'}}
                                                className={errors.addressProof ? 'error' : ''}
                                            />
                                            {addressProofPreview && <img src={addressProofPreview} className={'preview'}/>}
                                            {errors.addressProof && <span className="error-message">{errors.addressProof}</span>}
                                        </div>
                                    </div>
                                </div>
                                {loading && <p style={{margin:'10px'}}>Loading...</p>}
                                {error && <span style={{margin:'10px'}} className="error-message">{error}</span>}
                                <div className="form-actions">
                                    <button type="button" className="back-button" onClick={() => setCurrentStep(currentStep -1)}>
                                        Back
                                    </button>
                                    <button type="button" className="next-button" onClick={handleNext3}>
                                        Next
                                    </button>
                                </div>
                            </div>)}

                        {currentStep === 4 && (
                            <div className="form-step">
                                <div className="form-group">
                                    <p style={{marginBottom:'12px'}}>{messageForCode}</p>
                                    <input
                                        type="text"
                                        id="receivedCode"
                                        name="receivedCode"
                                        placeholder="Enter code sent to your email"
                                        onChange={handleChange}
                                        value={formData.receivedCode}
                                        className={'button-bg'}
                                        required
                                    />
                                    {error && <span className="error-message">{error}</span>}
                                    <p style={{marginTop:'15px'}}>Didn't get a code? <span onClick={handleResend} style={{color:'blue'}}>resend</span></p>
                                </div>
                                <div style={{display:'flex', justifyContent:'space-evenly', gap:'10px'}} className="form-actions">
                                    <button
                                        disabled={loading} type="button"
                                        className="back-button"
                                        onClick={() => setCurrentStep(currentStep -1)}>
                                        Back
                                    </button>
                                    <button
                                        disabled={(formData.receivedCode.length < 6 && loading)} type="submit"
                                        className={(formData.receivedCode.length < 6 || loading) ? "back-button" : "submit-button"}>
                                        Register
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </section>

            <section className={["footer-banner"].join(" ")}>
                <div className="container">
                    <div className="grid-container">
                        {links.map((link, index) => (
                            <div key={index.orderId}>
                                <Link to={link.path} target="_blank" rel="noopener noreferrer">{link.item}</Link>
                            </div>
                        ))}
                    </div>
                    <p style={{marginTop:'20px', color:"brown"}} >{new Date().getFullYear()} Flymax. All rights reserved.</p>
                </div>
            </section>
        </div>
    );
};

export default Become;