import React, {useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import LOGO from "../images/logo4.png";
import { MdAdd, MdRemove,  MdArrowDownward, MdArrowUpward, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import {
    FaCertificate,
    FaFileAlt,
    FaHome,
    FaMapMarkerAlt,
    FaPoundSign,
    FaQuestionCircle, FaUserCircle,
    FaUserTie,
    FaEnvelope, FaCommentDots, FaPen, FaTimes, FaPhone, FaStar, FaRegStar, FaArrowCircleLeft, FaArrowCircleRight,
} from "react-icons/fa";
import api from "./api.js";
import { FaCalendarCheck} from 'react-icons/fa';
import Bookings from './Bookings.jsx';
import io from 'socket.io-client';
import Messages from './Messages.jsx';
import Upholstery from "../images/upholstery2.png";
import Regular from "../images/regular.png";
import EndOfTenancy from "../images/endOfTenancy.png";
import LivingRoom from "../images/livingRoom.png";
import Deep from "../images/deep.png";
import Office from "../images/office.png";
import Day from "../images/day.png";
import Domestic from "../images/domestic.png";
import Rug from "../images/rug.png";
import Bathroom from "../images/bathroom.png";
import Kitchen from "../images/kitchen.png";
import Oven from "../images/oven.png";
import {object} from "yup";
import { FiLogOut } from "react-icons/fi";
import { useSocket } from "../Socket.jsx";
import {subscribeUser} from "./notification.js";
import Reviews from "./Reviews.jsx";


const Customer = () => {
    const navigate = useNavigate();
    const socket = useSocket();

    const companyEmail = import.meta.env.VITE_COMPANY_EMAIL;
    const companyName =  "Fly Cleaner";

    const topNavItems = ['Active', 'History', 'New'];
    const [topItems, setTopItems] = useState(topNavItems);
    const [activeTopMenu, setActiveTopMenu] = useState(topItems[0]);

    const renderMenuIcon = (id) => {
        if (id === null || id === undefined) return;
        if (id === 1) {
            return <FaUserTie className={'bottom-icon'} />;
        }
        if (id === 2) {
            return <FaPoundSign className={'bottom-icon'} />;
        }
        if (id === 3) {
            return <FaFileAlt className={'bottom-icon'} />;
        }
        if (id === 4) {
            return <FaQuestionCircle className={'bottom-icon'} />;
        }
        if (id === 5) {
            return <FaUserTie className={'bottom-icon'} />;
        }
    }

    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [history, setHistory] = useState(false);
    const [newOrders, setNewOrders] = useState([]);
    const [newOrdersCopy, setNewOrdersCopy] = useState([]);
    const [newBookingLoading, setNewBookingLoading] = useState(false);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [activeBottomMenu, setActiveBottomMenu] = useState('Booking');
    const [email, setEmail] = useState(null);
    const [name, setName] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [user, setUser] = useState(null);
    const [chatting, setChatting] = useState(false);
    const [dataForUpdate, setDataForUpdate] = useState('');
    const [billing, setBilling] = useState(0);
    const [cancelledJobs, setCancelledJobs] = useState(0);
    const [messageCount, setMessageCount] = useState(0);
    const [commonEmail, setCommonEmail] = useState('');
    const [emailNotify, setEmailNotify] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [support, setSupport] = useState(true);
    const [enabled, setEnabled] = useState(JSON.parse(localStorage.getItem("notifications")) || false);
    const [reminder, setReminder] = useState(false);
    const [alert, setAlert] = useState(false);
    const [sms, setSms] = useState(false);
    const [review, setReview] = useState('Post');
    const [client, setClient] = useState(null);
    const [clientEmail, setClientEmail] = useState(null);
    const [rating, setRating] = useState(null);
    const [reviewCount, setReviewCount] = useState(null);
    const [five, setFive] = useState(0);
    const [four, setFour] = useState(0);
    const [three, setThree] = useState(0);
    const [two, setTwo] = useState(0);
    const [one, setOne] = useState(0);
    const [reviewList, setReviewList] = useState([]);
    const [reviewMessage, setReviewMessage] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [loadingReviews, setLoadingReviews] = useState(false);
    const [number, setNumber] = useState('+447362587018');

    const bottomNavItems = [
        {id: 1, category: 'Account', items: ['Profile', 'Billing', 'Review'], icon: <FaUserTie className="logo-icon2" style={activeBottomMenu === 'Account' ?
                {color:'blue', textDecoration:'underline'}: {color:'', textDecoration:'none'}}/>},
        {id: 2, category: 'Booking', items: ['Active', 'History', 'New'], icon: <FaCalendarCheck className="logo-icon2" style={activeBottomMenu === 'Booking' ?
                {color:'blue', textDecoration:'underline'}: {color:'', textDecoration:'none'}} />},
        {id: 4, category: 'Support', items: ['Contact us', 'Call', 'Chat'], icon: <FaQuestionCircle className="logo-icon2" style={activeBottomMenu === 'Support' ?
                {color:'blue', textDecoration:'underline'}: {color:'', textDecoration:'none'}} />},
    ];

    function CallButton({ phoneNumber}) {
        return (
            <div style={{width:'100px'}}>
                <p>
                    <a href={`tel:${phoneNumber}`} style={{ color: "blue" }}>
                        <label style={{width:'100%',fontSize:'medium' }}>Call</label>
                    </a>
                </p>
            </div>
        );
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;

            if (scrollTop + clientHeight >= scrollHeight - 100) {
                if (!loadingReviews && activeTopMenu === 'View') {
                    setPageCount(prev => prev + 1);
                }
            }

        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, loadingReviews]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setEmail(user?.email);
            if (user?.firstName?.toString()?.length > 0) {
                setName(user.firstName?.charAt(0)?.toUpperCase() + user?.firstName?.slice(1));
            }

        }

    }, []);

    useEffect(() => {
        if (window.innerWidth > 768) {
            setPageSize(20);
            return;
        }
        setPageSize(10);
    }, [])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        function replaceLastSegment(newSegment) {
            const path = window.location.pathname;
            const segments = path.split('/');
            segments[segments.length - 1] = newSegment;
            return segments.join('/');
        }
        if (user !== null && user !== undefined) {
            const path = window.location.pathname;
            const fullPath = `${path}/${user.firstName}`;
            window.history.replaceState(null, '', fullPath);
        }

    }, [])

    useEffect(() => {
        if (!("Notification" in window)) {
            setSupport(false);
        }
    }, []);

    useEffect(() => {
        const fetchCleanerData = async () => {
            setLoading(true);

            const registration = await navigator.serviceWorker.register("/service-worker.js", { scope: "/" });
            const existingSubscription = await registration.pushManager.getSubscription();

            if (existingSubscription && email) {
                api.post('/api/notify-record', {email: email})
                    .then(response => {
                        if (response.data) {
                            setReminder(response.data?.reminder);
                            setEnabled(response.data?.enabled);
                            setAlert(response.data?.jobAlert)
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        setLoading(false);
                    })
            }
            else {
                setLoading(false);
            }
        };
        fetchCleanerData();
    }, [email]);

    useEffect(() => {
        const clients = JSON.parse(localStorage.getItem('client'));
        const clientEmails = JSON.parse(localStorage.getItem('clientEmail'));
        setClient(clients);
        setClientEmail(clientEmails);
    }, []);

    useEffect(() => {
        if (clientEmail && clientEmail.length > 0 && client !== null) {
            setCommonEmail(clientEmail);
        }
        if (email && clientEmail === null && client === null) {
            setCommonEmail(email);
        }
    }, [clientEmail, email, client]);

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar size={20} style={{width:'20px'}} key={i} className="star filled" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FaStar size={20} style={{width:'20px'}} key={i} className="star half-filled" />);
            } else {
                stars.push(<FaRegStar size={20} style={{width:'20px'}} key={i} className="star" />);
            }
        }
        return stars;
    };

    const handleNewOrder = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let postcode = user?.postcode;
            if (!postcode?.toString()?.startsWith("EH")) {
                postcode = "EH12QA";
            }
            navigate('/checkout', { state: { postcode:  postcode } });
            return;
        }
        setMessage('User data not found');
    }

    useEffect(() => {
        setTimeout(() => setMessage(null), 4000);
    }, [message]);

    const handleTopItem = (item) => {
        setActiveTopMenu(item);
        setHistory(!history);
    }

    useEffect(() => {
        switch (activeTopMenu) {
            case 'New':
                handleNewOrder();
                break;
            case 'Chat':
                navigate('/messages', {state: {
                        receiver: companyEmail,
                        receiverName: companyName,
                        sender: email,
                        senderName: name}});
                break;
        }
    }, [activeTopMenu, email]);

    const handleBottomItem = (index) => {
        const item = bottomNavItems[index];
        setTopItems(item.items)
        setActiveBottomMenu(item.category)
        setActiveTopMenu(item.items[0])
    }

    const services = [
        { id: 'select', icon: 'fa-home', title: 'Select service', description: 'Upholstery cleaning for surfaces', src: Upholstery },
        { id: 'Upholstery ', icon: 'fa-home', title: 'Upholstery cleaning', description: 'Upholstery cleaning for surfaces', src: Upholstery },
        { id: 'Regulqr', icon: 'fa-home', title: 'Regular cleaning', description: 'Regular cleaning for your home', src: Regular },
        { id: 'End of tenancy', icon: 'fa-couch', title: 'End of tenancy', description: 'Thorough cleaning to get your deposit back', src: EndOfTenancy },
        { id: 'Carpet', icon: 'fa-rug', title: 'Carpet cleaning', description: 'Professional deep cleaning for carpets', src: LivingRoom },
        { id: 'Deep', icon: 'fa-broom', title: 'Deep cleaning', description: 'Intensive cleaning for neglected spaces', src: Deep },
        { id: 'Office', icon: 'fa-home', title: 'Office cleaning', description: 'Detailed cleaning for office space', src: Office },
        { id: 'Same day', icon: 'fa-home', title: 'Same day cleaning', description: 'Quickly get your home in order as quickly as possible', src: Day},
        { id: 'Move in', icon: 'fa-home', title: 'Move in  cleaning', description: 'We will get your new home ready for habitaion', src: Domestic},
        { id: 'Rug', icon: 'fa-home', title: 'Rug cleaning', description: 'Professional deep cleaning for rugs', src: Rug },
        { id: 'Bathroom', icon: 'fa-home', title: 'Bathroom cleaning', description: 'We provide deep cleaning for bathrooms', src: Bathroom },
        { id: 'Kitchen deep', icon: 'fa-home', title: 'Kitchen deep', description: 'Professional deep kitchen cleaning', src: Kitchen },
        { id: 'Oven', icon: 'fa-building', title: 'Oven', description: 'Oven cleaning services', src: Oven},
    ];

    const Contact = () => {

        const [name, setName] = useState('');
        const [contactEmail, setContactEmail] = useState('');
        const [phone, setPhone] = useState('');
        const [service, setService] = useState('');
        const [contactMessage, setContactMessage] = useState('');
        const [errors, setErrors] = useState({});
        const [response, setResponse] = useState('');
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            if (response !== null) {
                setTimeout(() => {setResponse(null)}, 4000)
            }
        }, [response]);

        const handleServiceChange = (e) => {
            const value = e.target.value;
            const newErrors = {};
            if (value === 'Select service') {
                newErrors.service = "select service";
                setService('');
                setErrors(newErrors);
                alert(value)
                return;

            }
            setService(value);

        }

        const sendMessage  = async (e) => {
            e.preventDefault();
            const newErrors = {}
            if (!contactEmail) newErrors.contactemail = 'Email address required';
            if (!phone) newErrors.phone = 'Phone number required';
            if (!name) newErrors.name = 'Name required';
            if (!service || service === 'Select service') newErrors.service = 'Select service required';
            if (!contactMessage) newErrors.contactMessage = 'Write a message';
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
            setLoading(true);

            const data = { email: contactEmail, customer: name, service: service, phone: phone, message: contactMessage}
            try {
                const response = await api.post('/api/send-email-to-fly-cleaner', data);
                const message = response.data.message;
                const success = response.data.success;
                setResponse(message);
                if (success) {
                    setContactEmail('');
                    setPhone('');
                    setService('');
                    setContactMessage('');
                    setName('');
                    setErrors(null);
                }
            } catch (error) {
                setErrors(errors);
                setResponse('Error occured');
            }finally {
                setLoading(false);
            }
        }

        return (
            <section className="main-banner">
                <div className="container">
                    <div className="burden-container">
                        <div className="contact-form">
                            <h3>Send Us a Message</h3>
                            <form onSubmit={sendMessage}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={name}
                                            className="button-bg"
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                        {name.errors && <label>{name.errors}</label>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="contactEmail"
                                            value={contactEmail}
                                            className="button-bg"
                                            onChange={(e) => setContactEmail(e.target.value)}
                                            required
                                        />
                                        {contactEmail.errors && <label className="error-message">{contactEmail.errors}</label>}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={phone}
                                            className="button-bg"
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="service">Service Needed</label>
                                        <select
                                            id="service"
                                            name="service"
                                            value={service}
                                            className="button-bg"
                                            onChange={handleServiceChange}>
                                            {services.map(plan => (
                                                <option key={plan.id} value={plan.title}>{plan.title}</option>
                                            ))}
                                        </select>
                                        {service.errors && <label>{service.errors}</label>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={contactMessage}
                                        className="button-bg"
                                        onChange={(e) => setContactMessage(e.target.value)}
                                    ></textarea>
                                    {contactMessage.errors && <label className="error-message">{contactMessage.errors}</label>}
                                </div>
                                {response && <p style={{margin:'10px'}}>{response}</p>}
                                {loading && <p style={{margin:'10px'}}>sending email...</p>}
                                <button type="submit" className="submit-button">Send Email</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    const Profile = () => {
        const [oldPassword, setOldPassword] = useState('');
        const [newPassword, setNewPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [errors, setErrors] = useState({});
        const [successMessage, setSuccessMessage] = useState(null);
        const [loading, setLoading] = useState(false);
        const [processing, setProcessing] = useState(false);
        const [notifyMessage, setNotifyMessage] = useState('');

        const changePassword = async (e) => {
            e.preventDefault();
            if (loading) return;
            setLoading(true);
            const newErrors = {};
            if (!password) newErrors.password = 'Password address required';
            if (!newPassword) newErrors.newPassword = 'Password required';
            if (!confirmPassword) newErrors.confirmPassword = 'Please confirm passwords required';
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors)
                return;
            };
            const data = {password: newPassword, oldPassword: oldPassword, email: email};

            try {
                const response = await api.post('/api/users/update', data)
                const { success } = response.data;
                if (success) {
                    setSuccessMessage('Password changed successfully');
                }
                else {
                    setSuccessMessage('Something went wrong!');
                }
            } catch (error) {
                console.error(error.response.data);
                setSuccessMessage('Profile update failed');
            } finally {
                setLoading(false);
                setTimeout(() => setSuccessMessage(null), 5000);
            }
        }

        const logout = () => {
            if (loading) return;
            setLoading(true);
            api.post('/api/logout')
                .then((response) => {
                    if (response.data) {
                        localStorage.removeItem('user');
                        navigate('/overview');
                        window.close();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    localStorage.removeItem('user');
                    navigate('/overview');
                })
                .finally(() => {
                    setLoading(false);
                })
        };

        const handleNotify = async (e) => {
            e.preventDefault();
            if (processing) return;
            setProcessing(true);
            let send = 1;
            const check = e.target.checked;

            try {
                const subscribe = await subscribeUser(email, check);
                localStorage.setItem("notifications", JSON.stringify(subscribe));
                setEnabled(subscribe);
                if (subscribe) {
                    setNotifyMessage('Notification permission is successfull');
                }
                else {
                    setNotifyMessage('Failed to get notification permission');
                }
            } catch (error) {
                console.error(error);
                setNotifyMessage('Error getting notification permission');
            } finally {
                setProcessing(false);
            }
        }

        const onSubmit = async (e) => {
            e.preventDefault();
            if (loading) return;
            setLoading(true);
            const data = {
                jobAlert: alert,
                reminder: reminder,
                rating: false,
                sms: false,
                email: email
            };

            try {
                const  response = await api.post('/api/notify-update', data);
                const { success } = response.data;
                if (success) {
                    setMessage('Profile updated successfully');
                }
                else {
                    setMessage('Profile update not successful');
                }
            } catch (error) {
                console.error(error.response.data);
                setMessage('Profile update failed');
            } finally {
                setIsLoading(false);
            }

        };

        return (
            <div className="support-page">
                <form onSubmit={changePassword} className="support-page">
                    <label>Change password
                        {dataForUpdate === '' ? <FaPen onClick={() => setDataForUpdate('password')} style={{width:'20px'}} />
                            : dataForUpdate === 'password' ?
                                <FaTimes style={{width:'20px'}} onClick={() => setDataForUpdate('')} /> : null }
                    </label>
                    {dataForUpdate === 'password' && <div>
                        <div className={'form-group'}>
                            <input
                                type="password"
                                name={'newPassword'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New Password"
                                className={'button-bg'}
                                required
                            />
                            {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
                        </div>
                        <div className='form-group'>
                            <input
                                type="password"
                                name={'confirmPassword'}
                                placeholder="Confirm New Password"
                                className={'button-bg'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                        </div>
                        <div className='form-group'>
                            <input
                                type="password"
                                name={'oldPassword'}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Old Password"
                                className={'button-bg'}
                                required
                            />
                            {errors.oldPassword && <span className="error-message">{errors.oldPassword}</span>}
                        </div>
                        {successMessage && (<p>{successMessage}</p>)}
                        <button type={'submit'} className="submit-button">Submit</button>
                    </div> }
                </form>

                <label
                    onClick={logout}
                    style={{
                    marginTop:'20px',
                    textAlign:'center',
                    display:'flex',
                    flexDirection:'column'
                }}>
                    <FiLogOut size={40} />
                    Sign Out
                </label>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h3 className={'page-title'}  style={{marginTop:'40px', textAlign:'center', textDecoration:'underline'}}>Notifications</h3>
                    <div className="form-group">
                        <label className="custom-checkbox" style={{color:'blue'}}>
                            <input
                                type="checkbox"
                                checked={true}
                                disabled={true}
                                onChange={() => setEmailNotify(true)}
                                className="hidden-checkbox"
                            />
                            <span className="checkbox-custom"></span>
                            Email Notifications
                        </label>
                    </div>

                    <div style={{maxWidth:'500px', margin:'auto'}} className="price-container">
                        <h3 className={'experience-text'} style={{margin:'15px', textAlign:'center'}}>Browser notifications</h3>

                        {!support && <label style={{margin:'10px'}}>This browser does not support notification</label>}
                        <div className="form-group">
                            <div  className="checkbox-label">
                                <label style={{
                                    marginTop: '5px',
                                    width:"100px",
                                    fontSize:'large',
                                    fontWeight:'bold'
                                }}>{enabled ? "Enabled" : "Disabled"}</label>
                                <label style={{alignSelf:'end'}} className="switch">
                                    <input
                                        type="checkbox"
                                        disabled={(disabled || !support)}
                                        checked={enabled}
                                        onChange={handleNotify}
                                    />
                                    <span className="slider"></span>
                                </label>

                            </div>
                        </div>

                        <div style={{display:'none'}} className="form-group">
                            <div className="checkbox-label">
                                <input
                                    type="checkbox"
                                    onChange={() => setSms(!sms)}
                                    checked={sms}
                                />
                                <label style={{marginTop:'5px'}}>SMS Notifications</label>

                            </div>
                        </div>

                        {processing && <p style={{margin:'16px'}}>Processing...</p>}

                        {notifyMessage && <p style={{margin:'16px'}}>{notifyMessage}</p>}

                        <div className="form-group">
                            <div className="checkbox-label">
                                <input
                                    type="checkbox"
                                    disabled={(!enabled || !support)}
                                    checked={alert}
                                    onChange={() => setAlert(!alert)}
                                />
                                <label style={{marginTop:'5px'}}>New Booking Alerts</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="checkbox-label">
                                <input
                                    type="checkbox"
                                    disabled={(!enabled || !support)}
                                    onChange={() => setReminder(!reminder)}
                                    checked={reminder}
                                />
                                <label style={{marginTop:'5px'}}>Booking Reminders</label>
                            </div>
                        </div>

                        {message && <p style={{margin:'10px'}}>{message}</p>}

                        <button
                            onClick={onSubmit}
                            style={{color:'white', padding:'12px'}}
                            className={(!enabled || !support) ? 'back-button' : 'next-button'} type="button">
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        const fetchData = async () => {

            try {
                let data = {email: email};
                let response = await api.post('/api/revenue/billing', data)
                setBilling(response.data.billing);
                setCancelledJobs(response.data.pending);

                data = {receiver: email};
                response = await api.post('/api/messages/users', data)
                const count = response.data.messages;
                setMessageCount(prev => prev + count);

            }catch (error) {
                console.log(error);
            }
        }
        if (email !== null && email !== undefined && email !== '') {
            fetchData()
        }
    }, [email])

    const Billing = ({ amount, cancelled }) => {

        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop:'50%'
            }}>
                <h2 style={{textAlign:'center'}}>Total billing: £{amount}</h2>

                <h2 style={{marginTop:'20px', textAlign:'center'}}>Cancelled jobs: £{cancelled}</h2>
            </div>
        );
    }

    useEffect(() => {
        if (!socket || !email) { return; }
        socket.on('receive_message', (data) => {
            if (data.receiver === email) {
                setMessageCount(prev => prev + 1);
            }
        });

        return () => {
            socket.off("receive_message");
        };

    }, [email]);

    const WriteReview = () => {
        const [rating, setRating] = useState(1);
        const [review, setReview] = useState('');
        const [loading, setLoading] = useState(false);
        const [message2, setMessage2] = useState('');

        const writeReview = async (e) => {
            e.preventDefault();
            setLoading(true);
            const reviewData = { customer: client, cleanerEmail: clientEmail, review: review , rating: rating };
            try {
                const response = await api.post('/api/reviews', reviewData)
                const { success} = response.data;
                if (success) {
                    setMessage("Review sent successful");
                    setReview('')
                    setReviewList([]);
                    setPageCount(prev => prev + 1);
                }
                else {
                    setMessage("Error occured while sending review");
                }
            } catch (error) {
                  console.log(error);
                setMessage("Error occured while sending review");
            } finally {
                setLoading(false);
            }
        }

        return (<div className={'support-page'} >
            <h3 style={{marginBottom:'20px'}}>Write review for {client}</h3>
            <div  style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom:'10px'
            }}>
                <h2>Rating: {rating}</h2>
                <FaArrowCircleLeft
                    size={50} style={{width:'50px', color:'blue', marginRight:'15px'}}
                    onClick={rating > 1 ? () => setRating(rating - 1) : null}
                />
                <FaArrowCircleRight
                    size={50}
                    style={{width:'50px', color:'blue'}}
                    onClick={rating < 5 ? () => setRating(rating + 1) : null} />
            </div>
            <textarea
                placeholder={'write review'}
                style={{
                    backgroundColor:'linen',
                    color:'black', padding:'12px',
                    marginTop:'20px',
                }}
                rows={20}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                name={'review'}
            />

            {message && <p style={{margin:'15px'}}>{message}</p>}

            <button onClick={writeReview}
                    style={{borderRadius:'30px', marginTop:'20px'}}
                    className={(!loading && review) ?  'submit-button' : 'back-button'}
                    disabled={(loading || !review)}>
                {loading ? 'Saving...' : 'Save review'}
            </button>
        </div>)
    }

    const reviewPercentage = (ratingCount, ratingTotalCount) => {
        const perc = (Number(ratingCount) / Number(ratingTotalCount)) * 100;
        return Math.round(perc)
    }

    function timeAgo(date) {
        const now = new Date();
        const prevDate = new Date(date);
        const seconds = Math.floor((now - prevDate) / 1000);

        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
            return interval === 1 ? '1 year ago' : `${interval} years ago`;
        }

        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            return interval === 1 ? '1 month ago' : `${interval} months ago`;
        }

        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
            return interval === 1 ? '1 day ago' : `${interval} days ago`;
        }

        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
        }

        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
        }

        return 'just now';
    }

    useEffect(() => {
        if (reviewList.length > 0) {
            const occurence = reviewList.reduce((acc, review) => {
                const rating = review.rating;
                acc[rating] = (acc[rating] || 0) + 1;
                return acc;
            }, {1: 0, 2: 0, 3: 0, 4: 0, 5: 0});

            setFive(reviewPercentage(occurence[5], reviewList.length));
            setFour(reviewPercentage(occurence[4], reviewList.length));
            setThree(reviewPercentage(occurence[3], reviewList.length));
            setTwo(reviewPercentage(occurence[2], reviewList.length));
            setOne(reviewPercentage(occurence[1], reviewList.length));
            setReviewCount(reviewList.length);
            let allReviews = 0;
            reviewList.forEach(review => allReviews += review.rating);
            setRating((allReviews / reviewList.length).toFixed(1));
        }

    }, [reviewList])

    useEffect(() => {
        const fetchCleanerData =  async () => {
            if (loadingReviews) return;
            setLoadingReviews(true);
            try {
                let offset = 0;
                if (reviewList?.length > 0) {
                    offset = reviewList[reviewList.length - 1].id;
                }
                const response = await api.post('/api/reviews/record', {cleanerEmail: commonEmail, limit: pageSize, offset: offset});
                const { reviews } = response.data;
                if (reviews) {
                    setRating(reviews?.value);
                    setReviewCount(reviews?.count);

                    setReviewList(prev => {
                        const map = new Map(prev.map(item => [item.id, item])); // old items
                        reviews?.reviews?.forEach(item => map.set(item.id, item));    // add/replace new
                        return Array.from(map.values()).sort((a, b) => a.id - b.id); // convert back to array
                    });
                }
                else {
                    if (reviewList?.length <= 0 && reviews?.reviews?.length <= 0) {
                        setReviewMessage('No review record was found');
                    }
                }
            } catch(error) {
                console.log(error);
                setReviewMessage('Error fetching some profile data')
            } finally {
                setLoadingReviews(false);
            }
        };
        if (commonEmail) {
            fetchCleanerData();
        }
    }, [commonEmail, pageCount]);

    const ViewReview = ({ reviews, message}) => {
        if (message) {
            return <p>{message}</p>
        }

        if (reviews.length <= 0) {
            return <p style={{margin:'20px'}}>No reviews found</p>
        }

        const [loading, setLoading] = useState(false);

        return ( <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection:'column'
        }}>
            <div className="reviews-section">
                <h2 style={{textAlign:'center'}}>Reviews</h2>
                <div className="review-summary">
                    <div style={{display:'flex', alignItems:'center'}}>
                        <p className="stars">{renderStars(rating)}</p>
                        <p style={{fontWeight:'bold'}}>{rating}</p>
                        <p style={{textAlign:'end', fontSize:'medium'}} className="review-count">{reviewCount} reviews</p>
                    </div>

                    <div className="rating-breakdown">
                        <div className="rating-bar">
                            <span>5 stars</span>
                            <div className="bar-container">
                                <div className="bar" style={{ width: `${five}%` }}></div>
                            </div>
                            <span>{five}%</span>
                        </div>
                        <div className="rating-bar">
                            <span>4 stars</span>
                            <div className="bar-container">
                                <div className="bar" style={{ width: `${four}%` }}></div>
                            </div>
                            <span>{four}%</span>
                        </div>
                        <div className="rating-bar">
                            <span>3 stars</span>
                            <div className="bar-container">
                                <div className="bar" style={{ width: `${three}%` }}></div>
                            </div>
                            <span>{three}%</span>
                        </div>
                        <div className="rating-bar">
                            <span>2 stars</span>
                            <div className="bar-container">
                                <div className="bar" style={{ width: `${two}%` }}></div>
                            </div>
                            <span>{two}%</span>
                        </div>
                        <div className="rating-bar">
                            <span>1 star</span>
                            <div className="bar-container">
                                <div className="bar" style={{ width: `${one}%` }}></div>
                            </div>
                            <span>{one}%</span>
                        </div>
                    </div>
                </div>
                <div className={'grid-container'}>
                    {reviewList.map((review, index) => (
                        <div key={review.id} className="review-card">
                            <div className="review-header">
                                <div className="reviewer-info">
                                    <h4  style={{marginBottom:'10px'}}  >{review.customer}</h4>
                                    <div className="review-rating">
                                        {renderStars(review.rating)}
                                        <span style={{marginLeft:'10px'}}>{timeAgo(review.time)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="review-content">
                                <p>{review.review}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {loading && <p>Loading...</p>}
        </div>)
    }

    return (
        <div className="sticky-nav-container">
            {(message && client === null) && <p style={{backgroundColor:'red', color:'white'}}>{message}</p>}
            <nav  className='top-order-nav'>
                {(client === null && clientEmail === null) &&  <div style={{display:'flex', flexDirection: 'column'}}>
                    <div style={{display:'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <img src={LOGO} style={{maxWidth:'12%'}}  className={'logo-icon2'}/>
                        <h1 style={{width:'20%', textAlign:'start'}} className={'page-title'}>My App</h1>
                        <button
                            style={{color:'blue', background:'none', width:'20px'}}
                            onClick={() => navigate('/help')}>
                            FAQs
                        </button>
                        <div style={{
                            width:'10%',
                            marginRight:'10px',
                            display:'flex',
                            justifyContent:'flex-start',
                            color:'red',
                            alignItems:'center'
                        }}>
                            <FaCommentDots
                                size={25}
                                style={{color:'black', width:'20px'}}
                                onClick={() => navigate('/messages', {state: {
                                        receiver: companyEmail,
                                        receiverName: companyName,
                                        sender: email,
                                        senderName: name}})
                                }
                            />
                            {messageCount > 0 && <p style={{ textAlign:'left'}}>{messageCount}</p>}
                        </div>
                    </div>

                    <div className="nav-order-content">
                        <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}}>
                            <div style={{display:'flex', justifyContent:'space-evenly', alignItems: 'center'}}>
                                {topItems.map((item, index) => (
                                    <div key={`top-${index}`} className="nav-order-item"
                                         onClick={() => handleTopItem(item)}>
                                        {item === 'Call' ? <CallButton phoneNumber={number} /> : <h3  style={activeTopMenu === item ?
                                            {
                                                color:'goldenrod',
                                                textDecoration:'underline'
                                            }: {color:'',
                                                textDecoration:'none'
                                            } } >
                                            {item}
                                        </h3>}
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>
                </div> }
                {(clientEmail !== null && client !== null) &&
                    <div style={{
                        display:'flex',
                        justifyContent:'flex-start',
                        alignItems: 'center',
                        gap:'10px'
                    }}>
                        <img src={LOGO} style={{maxWidth:'12%'}}  className={'logo-icon2'}/>
                        <h1 style={{textAlign:'start'}} className={'page-title'}>Reviews for {client}</h1>
                    </div>
                }
            </nav>

            <main className={["main-content", "main-banner"].join(" ")}>
                {(client === null && clientEmail === null) &&
                    <div style={{display:'flex', flexDirection: 'column'}}>
                        {activeBottomMenu === 'Support' && <Contact />}
                        {activeTopMenu === 'Profile' && <Profile />}
                        {activeTopMenu === 'Billing' && <Billing amount={billing} cancelled={cancelledJobs} />}
                        {activeTopMenu === 'Active' && <Bookings cancellable={true} user={'client'}/>}
                        {activeTopMenu === 'History' && <Bookings history={history}  user={'client'} />}
                        {activeTopMenu == "Review" && <ViewReview reviews={reviewList} message={reviewMessage} /> }
                    </div>}
                {(client !== null && clientEmail !== null) &&
                    <div style={{display:'flex', flexDirection: 'column'}}>
                        {review === "Post" && <WriteReview />}
                        {review === "View" && <ViewReview reviews={reviewList} message={reviewMessage} />}
                    </div>
                }
            </main>

            <nav  className='bottom-order-nav'>
                <div className="nav-order-content">
                    {(client === null && clientEmail === null) &&  <div style={{display:'flex'}}>{bottomNavItems.map((item, index) => (
                        <div key={`bottom-${item.id}`} className="nav-order-item"
                             onClick={() => handleBottomItem(index)}>
                            <div style={activeTopMenu === item.category ?
                                {color:'blue', textDecoration:'underline'}:
                                {color:'', textDecoration:'none'}}>
                                {item.icon}
                                <h3 style={activeBottomMenu === item.category ?
                                    {color:'blue', textDecoration:'underline'}: {color:'', textDecoration:'none'}}>
                                    {item.category}
                                </h3>
                            </div>
                        </div>
                    ))}</div> }
                    {(client !== null && clientEmail !== null) && <div style={{
                            display:'flex',
                            justifyContent:'space-evenly',
                            gap:'10px',
                            margin:'10px'
                        }}>
                            <button
                                onClick={() => setReview('Post')}
                                className={review === 'Post' ? 'next-button' : 'back-button'}>
                                Post
                            </button>
                            <button
                                onClick={() => setReview('View')}
                                className={review === 'View' ? 'next-button' : 'back-button'}>
                                View
                            </button>
                        </div>}
                </div>
            </nav>
        </div>
    );

}
export default Customer;