import React, { useState, useRef } from 'react';
import Cleaner from '../images/rug.png'
import SignUp from '../images/signup.png'
import Interview from '../images/interview.png'
import UniformBranded from '../images/uniformBranded.png'
import Upload from '../images/upload.png'
import Training from '../images/training.png'
import { FaArrowLeft, FaArrowRight  } from 'react-icons/fa';
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
        photo: null, Identity: null, NI: null, addressProof: null,
        isActive: false, isOnLeave: false, payRate: 0,
        NIN: null, bio: null, emergency: null,
        workExperience: null, available: null, notification: null
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

    const handleImage = (e) => {
        const newErrors = {}
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        if (imageId === 'photo') {
            formData.photo = file;
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
        if (imageId === 'id') {
            formData.Identity = file;
            if (!isValidFileSize(file)) {
                newErrors.Identity = 'file is too large';
            }
            else if (!isValidFileType(file)) {
                newErrors.Identity = 'file is invalid';
            }
            else if (!isValidFileType(file) && !isValidFileSize(file)) {
                newErrors.Identity = 'file is invalid';
            }
            reader.onload = (e) => {
                setIDPreview(e.target.result);
            }
        }
        if (imageId === 'addressProof') {
            formData.addressProof = file;
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
        if (imageId === 'NI') {
            formData.NI = file;
            if (!isValidFileSize(file)) {
                newErrors.NI = 'file is too large';
            }
            else if (!isValidFileType(file)) {
                newErrors.NI = 'file is invalid';
            }
            else if (!isValidFileType(file) && !isValidFileSize(file)) {
                newErrors.NI = 'file is invalid';
            }
            reader.onload = (e) => {
                setNIPreview(e.target.result);
            }
        }

        setErrors(newErrors);

    };

    const handleChange = (e) => {
        const { name, value, type, checked, file } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

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
        checkPostcodeExists(formData.postcode).then(exists => {
            if (!exists) {
                newErrors.postcode = "Postcode does not exist";
            }
        });

        if (!formData.NI.trim()) newErrors.NI = 'NI is required';

        if (!isValidNINumber(formData.NI)) newErrors.NI = 'NI is invalid';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        }
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

        // Additional checks for temporary NI numbers
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
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
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

        if (!formData.Identity) newErrors.Identity = 'ID is required';
        if (formData.Identity) {
            if (!isValidFileSize(formData.Identity)) newErrors.Identity = 'ID is too large';
            if (!isValidFileType(formData.Identity)) newErrors.Identity = 'ID is invalid';
        }

        if (!formData.addressProof) newErrors.addressProof = 'proof of address is required';
        if (formData.addressProof) {
            if (!isValidFileSize(formData.addressProof)) newErrors.addressProof = 'proof of address is too large';
            if (!isValidFileType(formData.addressProof)) newErrors.addressProof = 'proof of address is invalid';
        }

        if (!formData.NI) newErrors.NI = 'NI is required';
        if (formData.NI) {
            if (!isValidFileSize(formData.NI)) newErrors.NI = 'NI is too large';
            if (!isValidFileType(formData.NI)) newErrors.NI = 'NI  is invalid';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        }
    }

    const handleNext = () => {
        if (validateStep1()) {
            setCurrentStep(2);
        }
    };

    const handleNext2 = () => {
        if (validateStep2()) {
            setCurrentStep(3);
        }
    }

    const handleNext3 = () => {
      if (validateStep3()) {
          setCurrentStep(4);
      }
    }

    const cleanerBenefits = [
        {
            id: 1,
            benefit: "Great pay",
            detail: "Make £10+/hour as a cleaner by just picking up orders online"
        },
        {
            id: 2,
            benefit: "Flexible schedule",
            detail: "You decide when and how many hours you want to work"
        },
        {
            id: 3,
            benefit: "Training",
            detail: "We provide mandatory training for all cleaners to guarantee high quality of service to customers"
        },
        {
            id: 4,
            benefit: "Easy payments",
            detail: "We deposit your earnings directly into your bank account once a week"
        },
        {
            id: 5,
            benefit: "Safety",
            detail: "Your safety at work is our priority"
        }
    ];

    const show = {display:''}
    const hide = {display:'none'};

    const becomeAcleaner = [
        {id: 'stage 1',
            src: SignUp,
            action: 'Sign up on the website',
            naration: 'Sign up by filling the forms bellow step by step'
        },
        {id: 'stage 2',
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
        {id: 'stage 3',
            src: Interview,
            action: 'Have an interview',
            naration: 'After screening of your documents, we will interview you.',
        },
        {id: 'stage 4',
            src: Training,
           action: 'Receive a full-day training',
           naration: 'Go through a full day of training and find out Fly cleaner service standards and T&C, how to clean, etc. When you complete the training, you will be authorized to activate your account on our website',
        },
        {id: 'stage 5',
            src: UniformBranded,
            action: 'Receive branded uniform and materials',
            naration: 'We will provide you with branded uniform (T-shirt, an apron, and a backpack) and cleaning supplies.\n' +
            '*Please, note, that we give a branded uniform for free, but you will have to pay for cleaning materials themselves. We will withdraw fee for the cleaning stuff from your account after your first earning.'
        }
    ]

    const links = [
        {id: 1,
            item: 'Terms and Conditions',
            path: '/terms',
        },
        {id: 2,
            item: 'Booking Policy',
            path: '/booking',
        },
        {id: 3,
            item: 'Cancellation Policy',
            path: '/cancellation',
        },
        {id: 4,
            item: 'Cookies Policy',
            path: '/cookies',
        },
        {id: 5,
            item: 'Privacy Policy',
            path: '/privacy',
        },
    ]


    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/api/users', formData)
            .then((res) => {
                setMessage(`${formData.firstName} is successfully registered!`);
                setCurrentStep(5)
                navigate('/api/login')
            })
            .catch((err) => {
                console.log(err);
                setMessage('Registration failed');
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
                            <div className={'price-container'} key={benefit.id}>
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
                            <div className={'price-container'} key={cleaner.id}>
                                <h3 style={{textAlign:'center'}}>{cleaner.id}</h3>
                                <img src={cleaner.src} alt="" className={'cart-image5'}/>
                                <div style={{display:'flex', justifyContent:'center'}}>
                                    < FaArrowLeft style={{color:'black', width:'30px', marginTop:'24px', marginBottom:'30px'}}
                                                  className={cleaner.id === stageId ? 'rotate-down': 'rotate-up'}
                                                  onClick={() => { stageId !== cleaner.id ? setStageId(cleaner.id) : setStageId('') }}/>
                                    <div style={{display:'block', paddingLeft:'10px', paddingRight:'10px', marginTop:'20px'}}>
                                        <h4 style={{textAlign:'start'}}>{cleaner.action}</h4>
                                        <p style={cleaner.id === stageId ? show: hide}>{cleaner.naration}</p>
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
                                        <li>- NI</li>
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
                        {currentStep === 1 && (
                            <div className="form-step">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name*</label>
                                    <input
                                        type="text"
                                        id="firstName"
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
                                        id="lastName"
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
                                        id="email"
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
                                        id="phone"
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
                                        id="postcode"
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
                                        id="ni"
                                        name="NI"
                                        value={formData.NI}
                                        onChange={handleChange}
                                        className={errors.NI ? 'error' : 'button-bg'}
                                    />
                                    {errors.NI && <span className="error-message">{errors.NI}</span>}
                                </div>

                                <button type="button" className="next-button" onClick={handleNext}>
                                    Next
                                </button>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="form-step">
                                <h3 style={{textAlign:'center', marginBottom:'20px'}}>Create login creadentials</h3>
                                <div className="form-group">
                                    <label htmlFor="password">Password*</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={errors.password ? 'error' : 'button-bg'}
                                    />
                                    {errors.password && <span className="error-message">{errors.password}</span>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password*</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={errors.confirmPassword ? 'error' : 'button-bg'}
                                    />
                                    {errors.confirmPassword && (
                                        <span className="error-message">{errors.confirmPassword}</span>
                                    )}
                                </div>

                                <div className="form-group checkbox-group">
                                    <div className="idea-container" style={{marginLeft:'20px'}}>
                                        <input
                                            type="checkbox"
                                            id="termsAccepted"
                                            name="termsAccepted"
                                            checked={formData.termsAccepted}
                                            onChange={handleChange}
                                            className={errors.termsAccepted ? 'error' : ''}
                                            style={{height:'30px', width:'30px'}}
                                        />
                                        <p>I accept the <Link to={'/terms'} style={{color:'blue'}} >terms and conditions</Link> and <Link to={'/privacy'} style={{color:'blue'}}>privacy</Link> policies</p>
                                    </div>
                                    {errors.termsAccepted && (<spam className="error-message">{errors.termsAccepted}</spam>)}
                                </div>

                                <div className="form-actions">
                                    <button type="button" className="back-button" onClick={() => setCurrentStep(1)}>
                                        Back
                                    </button>
                                    <button type="button" className="next-button" onClick={handleNext2}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="form-step">
                                <div className="form-group">
                                    <h3 style={{textAlign:'center', marginBottom:'30px'}}>Upload documents</h3>
                                    <div className="grid-container">
                                        <div className="form-group">
                                            <spam style={{fontSize:'medium'}}>Upload photo</spam>
                                            <input
                                                type="file"
                                                accept="application/pdf, image/*"
                                                id="photo"
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
                                            <spam style={{fontSize:'medium'}}>Upload Identity</spam>
                                            <input
                                                type="file"
                                                accept="application/pdf, image/*"
                                                id="id"
                                                name="ID"
                                                ref={inputRef2}
                                                onClick={() => setImageId('id')}
                                                onChange={handleImage}
                                                className={errors.Identity ? 'error' : ''}
                                                style={{background:'olive', color:'white', borderRadius:'13px', border:'brown'}}
                                            />
                                            {IDPreview && <img src={IDPreview} className={'preview'}/>}
                                            {errors.Identity && <span className="error-message">{errors.Identity}</span>}
                                        </div>

                                        <div className="form-group">
                                            <spam style={{fontSize:'medium'}}>Upload NI</spam>
                                            <input
                                                type="file"
                                                accept="application/pdf, image/*"
                                                id="NI"
                                                name="NI"
                                                ref={inputRef4}
                                                onClick={() => setImageId('NI')}
                                                onChange={handleImage}
                                                className={errors.Identity ? 'error' : ''}
                                                style={{background:'olive', color:'white', borderRadius:'13px', border:'brown'}}
                                            />
                                            {NIPreview && <img src={NIPreview} className={'preview'}/>}
                                            {errors.NI && <span className="error-message">{errors.NI}</span>}
                                        </div>

                                        <div className="form-group">
                                            <spam style={{fontSize:'medium'}}>Upload proof of address</spam>
                                            <input
                                                type="file"
                                                accept="application/pdf, image/*"
                                                id="addressProof"
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

                                <div className="form-actions">
                                    <button type="button" className="back-button" onClick={() => setCurrentStep(2)}>
                                        Back
                                    </button>
                                    <button type="button" className="next-button" onClick={handleNext3}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="form-step">
                                <div className="form-actions">
                                    <button type="button" className="back-button" onClick={() => setCurrentStep(3)}>
                                        Back
                                    </button>
                                    <button type="submit" className="submit-button">
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
                            <div key={index.id}>
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