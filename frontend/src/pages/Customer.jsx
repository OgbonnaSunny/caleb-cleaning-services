import React, {useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import LOGO from "../images/logo3.png";
import { MdAdd, MdRemove,  MdArrowDownward, MdArrowUpward, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import {
    FaCertificate,
    FaFileAlt,
    FaHome,
    FaMapMarkerAlt,
    FaPoundSign,
    FaQuestionCircle,
    FaUserTie
} from "react-icons/fa";
import api from "./api.js";


const Customer = () => {
    const navigate = useNavigate();

    const topNavItems = ['Active Booking', 'History'];
    const bottomNavItems = [
        {id: 1, name: 'Account'},
        {id: 2, name: 'Reward'},
        {id: 3, name: 'Docs'},
        {id: 4, name: 'Support'},
        {id: 5, name: 'Profile'},
    ];

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

    const [activeMenu, setActiveMenu] = useState(topNavItems[0]);
    const [booking, setBooking] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [history, setHistory] = useState([]);
    const [newOrders, setNewOrders] = useState([]);
    const [newBookingLoading, setNewBookingLoading] = useState(false);
    const [historyLoading, setHistoryLoading] = useState(false);

    const NewOrders = () => {

        return (
            <div className={'support-page'}>
                {newBookingLoading ?
                    <div className="progress-bar-container">
                        <div className="spinner"></div>
                        <p style={{textAlign:'center'}}>Loading data...</p>
                    </div>
                    : (newOrders.length <= 0 || newOrders === null) ?
                        <div style={{display:'flex', minHeight:'100vh', justifyContent:'center'}}>
                            <p style={{textAlign:'center'}}>{message}</p>
                        </div> :
                        <div className="grid-container">
                            {newOrders.map(order => (
                                <div key={order.id}  className={'stat-card'}>
                                    <p style={{textAlign:'center'}}>{order.orderId}</p>
                                    <div className={'new-order-container'}>
                                        <p style={{textAlign:'start'}}>{formatDate(order.bookDate)}</p>
                                        <p style={{textAlign:'end',fontWeight:'900' }}>{order.plan}</p>
                                    </div>
                                    <div className={'new-order-container'}>
                                        <FaMapMarkerAlt style={{width:'20px'}} />
                                        <p style={{textAlign:'start', width:'15%'}}>EH66JN</p>
                                        <p className={'truncate-text'}>{order.address}</p>
                                        <FaHome onClick={() => navigate('/sitemap', {state: {address: order.address}})} style={{width:'30%'}} />
                                    </div>
                                    <div className={'new-order-container'}>
                                        <p>Estimated duration</p>
                                        <h4 style={{textAlign:'end'}}>{formatTime(order.duration)}</h4>
                                    </div>
                                    <div className={'new-order-container'}>
                                        <p style={{flex:'1'}}>Estimated Amount</p>
                                        <h4 style={{textAlign:'end', flex:'1'}}>£{order.estimatedAmount}</h4>
                                    </div>
                                    <button disabled={acceptingOrders}
                                            onClick={() => acceptOrder(order.id)}
                                            className={acceptingOrders ? 'back-button' : 'next-button'}>
                                        Accept this job
                                    </button>
                                </div>
                            ))}
                        </div>
                }
            </div>
        );
    }

    /*useEffect(() => {
         const fetchCleanerData = () => {
             const user = JSON.parse(localStorage.getItem('user'));
             if (user === null || user === undefined) {
                 setMessage('User not signed in');
                 return;
             }
             setNewBookingLoading(true);
             api.post('/api/booking/new-booking', {email: user.email})
                 .then(response => {
                     const { booking } = response.data;
                     if (booking) {
                         setNewOrders(booking);
                     }
                     else {
                         setMessage('Error updating user');
                     }
                 })
                 .catch(error => {
                     setMessage('Error fetching new ordder')
                 })
                 .finally(() => {
                     setNewBookingLoading(false);
                 })
         };
         fetchCleanerData()
    }, []);

    useEffect(() => {
         const fetchCleanerData = () => {
             const user = JSON.parse(localStorage.getItem('user'));
             if (user === null || user === undefined) {
                 setMessage('User not signed in');
                 return;
             }
             setHistoryLoading(true);
             api.post('/api/booking/completed', {email: user.email})
                 .then(response => {
                     const { booking } = response.data;
                     if (booking) {
                         setHistory(booking);
                     }
                     else {
                         setMessage('Error updating user');
                     }
                 })
                 .catch(error => {
                     setMessage('Error fetching new ordder')
                 })
                 .finally(() => {
                     setHistoryLoading(false);
                 })
         };
         fetchCleanerData()
    }, []);*/


    const handleNewOrder = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            navigate('/checkout');
            return;
        }
        setMessage('User data not found');
    }

    const History = () => {
        return (
            <div className={'support-page'}>
                {historyLoading ?
                    <div className="progress-bar-container">
                        <div className="spinner"></div>
                        <p style={{textAlign:'center'}}>Loading data...</p>
                    </div>
                    : (history.length <= 0 || history === null) ?
                        <div style={{display:'flex', minHeight:'100vh', justifyContent:'center'}}>
                            <p style={{textAlign:'center'}}>{message}</p>
                        </div> :
                        <div className="grid-container">
                            {history.map(order => (
                                <div key={order.id} className={'price-container'} >
                                    <p style={{textAlign:'center'}}>{order.orderId}</p>
                                    <div className={'order-container'}>
                                        <h4 style={{width:'40%'}}>Customer</h4>
                                        <h3 style={{textAlign:'end'}}>{order.customer}</h3>
                                    </div>

                                    <div className={'order-container'}>
                                        <h4 style={{width:'50%'}}>Amount</h4>
                                        <h3 style={{textAlign:'end'}}>£{order.estimatedAmount}</h3>
                                    </div>

                                    <div className={'order-container'}>
                                        <h4 style={{width:'50%'}}>Duration</h4>
                                        <h3 style={{textAlign:'end'}}>{formatTime(order.duration)}</h3>
                                    </div>

                                    <div className={'order-container'}>
                                        <h4 style={{width:'50%'}}>Date</h4>
                                        <h3 style={{textAlign:'end'}}>{formatTime(order.completedDate)}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                }
            </div>
        );
    }

    useEffect(() => {
        setTimeout(() => setMessage(null), 4000);
    }, [message]);


    return (
        <div className="sticky-nav-container">
            {message && <p style={{backgroundColor:'red', color:'white'}}>{message}</p>}
            <nav  className='top-order-nav'>
                <div className="nav-order-content">
                    <img src={LOGO} className={'logo-icon'}/>
                    {topNavItems.map((item, index) => (
                        <div key={`top-${index}`} className="nav-order-item"
                             onClick={() => setActiveMenu(item)}>
                            <h3  style={activeMenu === item ? {color:'goldenrod', textDecoration:'underline'}: {color:'', textDecoration:'none'} } >{item}</h3>
                        </div>
                    ))}
                    <MdAdd onClick={handleNewOrder}  size={50} style={{width:'40px' , marginRight:'10px'}}/>
                </div>
            </nav>

            <main className={["main-content", "main-banner"].join(" ")}>

            </main>

            <nav  className='bottom-order-nav'>
                <div className="nav-order-content">
                    {bottomNavItems.map((item, index) => (
                        <div key={`bottom-${item.id}`} className="nav-order-item"
                             onClick={() => setActiveMenu(item.name)}>
                            <div style={activeMenu === item.name ? {color:'blue', textDecoration:'underline'}: {color:'', textDecoration:'none'}}>
                                {renderMenuIcon(item.id)}
                                <h3 style={activeMenu === item.name ? {color:'blue', textDecoration:'underline'}: {color:'', textDecoration:'none'}}>{item.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );

}
export default Customer;