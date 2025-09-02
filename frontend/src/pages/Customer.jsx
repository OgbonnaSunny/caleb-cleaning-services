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
    FaEnvelope, FaCommentDots, FaPen, FaTimes,
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


const Customer = () => {
    const navigate = useNavigate();
    const socket = useSocket();

    const companyEmail = import.meta.env.VITE_COMPANY_EMAIL;
    const companyName =  "Fly Cleaner";

    const topNavItems = ['Active', 'History'];
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
    const [messageCount, setMessageCount] = useState(0);


    const bottomNavItems = [
        {id: 1, category: 'Account', items: ['Profile', 'Billing'], icon: <FaUserTie className="logo-icon2" style={activeBottomMenu === 'Account' ?
                {color:'blue', textDecoration:'underline'}: {color:'', textDecoration:'none'}}/>},
        {id: 2, category: 'Booking', items: ['Active', 'History'], icon: <FaCalendarCheck className="logo-icon2" style={activeBottomMenu === 'Booking' ?
                {color:'blue', textDecoration:'underline'}: {color:'', textDecoration:'none'}} />},
        {id: 4, category: 'Support', items: ['Contact us'], icon: <FaQuestionCircle className="logo-icon2" style={activeBottomMenu === 'Support' ?
                {color:'blue', textDecoration:'underline'}: {color:'', textDecoration:'none'}} />},
    ];

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setEmail(user.email);
            setName(user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1));
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

    const handleNewOrder = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            navigate('/checkout');
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

        return (
            <>
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
                <label style={{marginTop:'20%', textAlign:'center'}}  >
                    <FiLogOut onClick={logout} size={40} />
                    Sign Out
                </label>
            </>
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = {email: email};
            try {
                let response = await api.post('/api/revenue/billing', data)
                setBilling(response.data);

                response = await api.post('/api/messages/users', data)
                const count = response.data.messages;
                setMessageCount(prev => prev + count);

            }catch (error) {
                console.log(error);
            }
        }
        if (email !== null && email !== undefined) {
            fetchData()
        }
    }, [email])

    const Billing = () => {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <h2 style={{marginTop:'40%', textAlign:'center'}}>Total billing: £{billing}</h2>
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

    return (
        <div className="sticky-nav-container">
            {message && <p style={{backgroundColor:'red', color:'white'}}>{message}</p>}
            <nav  className='top-order-nav'>
                <div className="nav-order-content">
                    <div style={{display:'flex', flexDirection:'row', marginLeft:'20px', marginRight:'20px', alignItems:'center'}}>
                        <div style={{width:'80%', display:'flex', justifyContent:'center', alignItems: 'center'}}>
                            <img src={LOGO} className={'logo-icon'}/>
                            {topItems.map((item, index) => (
                                <div key={`top-${index}`} className="nav-order-item"
                                     onClick={() => handleTopItem(item)}>
                                    <h3  style={activeTopMenu === item ? {color:'goldenrod', textDecoration:'underline'}:
                                        {color:'', textDecoration:'none'} } >
                                        {item}
                                    </h3>
                                </div>
                            ))}
                            {activeBottomMenu === 'Support' &&
                                <div
                                    onClick={() => navigate('/messages', {state: {receiver: companyEmail, receiverName: companyName, sender: email, senderName: name}})}
                                    style={{width:'20%', marginRight:'10px', display:'flex', justifyContent:'flex-start', color:'red', alignItems:'center'}}>
                                    <FaCommentDots
                                        size={30}
                                        style={{width: '40px', color:'black'}}
                                    />
                                    {messageCount > 0 && <p style={{ textAlign:'left'}}>{messageCount}</p>}
                                </div>

                            }
                        </div>
                        <div style={{maxWidth:'20%'}} className={'book-icon'} onClick={handleNewOrder}>
                            <MdAdd  size={40} style={{width:'40%', marginRight:'10px'}}/>
                            <h3>New</h3>
                        </div>
                    </div>

                </div>
            </nav>

            <main className={["main-content", "main-banner"].join(" ")}>
                {activeBottomMenu === 'Support' && <Contact />}
                {activeTopMenu === 'Profile' && <Profile />}
                {activeTopMenu === 'Billing' && <Billing />}
                {activeTopMenu === 'Active' && <Bookings cancellable={true} user={'client'}/>}
                {activeTopMenu === 'History' && <Bookings history={history}  user={'client'} />}
            </main>

            <nav  className='bottom-order-nav'>
                <div className="nav-order-content">
                    {bottomNavItems.map((item, index) => (
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
                    ))}
                </div>
            </nav>
        </div>
    );

}
export default Customer;