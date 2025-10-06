import React, { useState, useEffect, useRef} from 'react';
import {
    FaStar, FaRegStar, FaCheck, FaClock, FaMapMarkerAlt,
    FaBroom, FaShieldAlt, FaUserTie, FaCertificate,
    FaPoundSign, FaLifeRing, FaQuestionCircle,
    FaFilePdf, FaFile, FaFileAlt, FaHome, FaTimes, FaSearch,
    FaBars, FaPen, FaArrowRight, FaArrowCircleRight, FaArrowCircleLeft, FaCommentDots, FaPhone, FaUser
} from 'react-icons/fa';
import api from './api.js';
import {data, useNavigate} from 'react-router-dom'
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import {isToday, differenceInDays, differenceInHours, differenceInMinutes, differenceInCalendarDays} from 'date-fns';
import { Link } from 'react-router-dom';
import LOGO from "../images/logo4.png";
import { Helmet } from 'react-helmet';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import { useForm } from 'react-hook-form';
import ProfilePage from './CleanerProfilePage.jsx';
import { format } from 'date-fns';
import {all} from "axios";
import globals from "globals";
import {MdKeyboardArrowRight} from "react-icons/md";
import {hr} from "date-fns/locale";
import {number} from "yup";


ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const CleanerProfile = () => {
    const navigate = useNavigate();
    const ref = useRef(null);

    const companyEmail = import.meta.env.VITE_COMPANY_EMAIL;
    const companyName =  "Fly Cleaner";

    const bookData = {
        id: 0,
        orderId: '',
        pascode: '',
        address: '',
        estimatedAmount: 0,
        duration: '',
        plan: '',
        bookDate: '',
    };
    const orderData = []
    orderData.push(bookData);

    const myOrderData =  {
        id: 0,
        orderId: '',
        pascode: '',
        address: '',
        estimatedAmount: 0,
        duration: '',
        plan: '',
        bookDate: '',
        booking: [{room: '', count: 0}],
        nature: '',
    };

    const historyData = {
        id: 0,
        orderId: '',
        address: '',
        postcode: '',
        estimatedAmount: 0,
        customer: '',
        duration: '',
        cleanerWage: 0,
        completedDate: '',
    };

    const specialities = ["Eco-friendly cleaning", "Pet-friendly products", "Stain removal", "Vacuum cleaner"];

    // Navbar items
    const topNavItems = ['New', 'Jobs', 'History'];
    const bottomNavItems = [
        {id: 1, category: 'Setting'},
        {id: 2, category: 'Finance'},
        {id: 3, category: 'Docs'},
        {id: 4, category: 'Support'},
        {id: 5, category: 'Profile'},
    ];

    const cleanerData = {
        personal: {
            firstName: '',
            lastName: '',
            phone: '',
            password: '',
            newPassword: '',
            confirmPassword: '',
            oldPassword: '',
            nationalInsurance: '',
            address: '',
            bio: '',
            email:'',
            emergencyContact: {
                category: 'Martha Caleb',
                relationship: 'Spouse',
                phone: '073 6258 7018'
            }
        },
        work: {
            cleaningExperience: 'Less than 1 year',
            preferredAreas: ['Central London', 'East London'],
            services: ['Deep cleaning', 'Regular cleaning', 'End of tenancy'],
            specialities: ["Eco-friendly cleaning", "Pet-friendly products", "Stain removal"],
            hourlyRate: 10.50,
            travelRadius: 10, // miles
            equipmentProvided: false
        },
        availability: {
            monday: { morning: true, afternoon: false, evening: false },
            tuesday: { morning: true, afternoon: true, evening: false },
            wednesday: { morning: false, afternoon: true, evening: true },
            thursday: { morning: true, afternoon: true, evening: false },
            friday: { morning: false, afternoon: true, evening: true },
            saturday: { morning: true, afternoon: false, evening: false },
            sunday: { morning: false, afternoon: false, evening: false }
        },
        notifications: {
            emailNotifications: true,
            smsNotifications: true,
            jobAlerts: true,
            reminderAlerts: true,
            ratingNotifications: true
        },
        review: [
            {id: 1,
                category: 'Michael Brown',
                rating: 5,
                review: 'Sarah did an excellent job cleaning my flat. She was punctual, professional, and paid attention to all the details I requested. The place has never looked better!',
                time: '2 weeks ago'
            },
            {id: 2,
                category: 'Emma Wilson',
                rating: 4,
                review: 'Very thorough cleaning service. Sarah was friendly and efficient. Only reason for 4 stars instead of 5 is that she arrived 15 minutes late, but she made up for it by staying later to finish everything.',
                time: '1 month ago'
            },
            {id: 2,
                category: 'John Smith',
                rating: 5,
                review: 'Very thorough cleaning service. Sarah was Professional, detailed and friendly. Only reason for 4 stars instead of 5 is that she arrived 15 minutes late, but she made up for it by staying later to finish everything.',
                time: '2 months ago'
            },
            {id: 2,
                category: 'Dialo Becko',
                rating: 4,
                review: 'Smart and nice cleaning service. Sarah was Professional, detailed and friendly. Only reason for 4 stars instead of 5 is that she arrived 15 minutes late, but she made up for it by staying later to finish everything.',
                time: '4 months ago'
            },
        ],
        bank: {
            accountName: '',
            accountNumber: '',
            sortCode: ''
        }
    };

    const preferredAreas = [
        'Central London', 'East London',
        'West London', 'North London', 'South London',
        'Greater London', 'Surrey', 'Kent', 'Essex', 'Hertfordshire'
    ]

    const services = [
        'Regular cleaning', 'Deep cleaning', 'End of tenancy', 'Office cleaning',
        'Carpet cleaning', 'Window cleaning', 'Oven cleaning', 'After builders'];

    const experience = [
        {id: 1, exp: "Less than 1 year"},
        {id: 2, exp: "1-2 years"},
        {id: 3,  exp: "3-5 years"},
        {id: 4,  exp: "5+ years"}
    ]

    const days = [
        'monday', 'tuesday',
        'wednesday', 'thursday',
        'friday', 'saturday', 'sunday'
    ]

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadMyOrders, setIsLoadMyOrders] = useState(false);
    const [acceptingOrders, setAcceptingOrders] = useState(false);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [message, setMessage] = useState('No new orders yet.');
    const [email, setEmail] = useState(null);
    const [cleanerName, setCleanerName] = useState("");
    const [bio, setBio] = useState('Professional Cleaner');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [myOrders, setMyOrders] = useState([]);
    const [activeMenu, setActiveMenu] = useState(topNavItems[0]);
    const [newOrders, setNewOrders] = useState([]);
    const [myOderCount, setMyOderCount] = useState(0);
    const [jobHistory, setJobHistory] = useState([]);
    const [idForUpdate, setIdForUpdate] = useState('');
    const { register, setValue, getValues, handleSubmit, formState, watch, reset, formState: { errors }, trigger }
        = useForm({defaultValues: cleanerData, mode: 'onChange'});
    const [successMessage, setSuccessMessage] = useState('');
    const [bgColor, setBgColor] = useState('red');
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [activeTab2, setActiveTab2] = useState('about');
    const [reviews, setReviews] = useState([])
    const [activeTab3, setActiveTab3] = useState('personal');
    const [loadingMore, setLoadingMore] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [myPageCount, setMyPageCount] = useState(0);
    const [historyPageCount, setHistoryPageCount] = useState(0);
    const [acceptedJobIds, setAcceptedJobIds] = useState([]);
    const [myMesage, setMyMesage] = useState('');
    const [page, setPage] = useState(10);
    const [submitting, setSubmitting] = useState(false);
    const [order, setorder] = useState({});
    const [color, setColor] = useState('green');
    const [historyMessage, setHistoryMessage] = useState('');
    const [dateToggle, setDateToggle] = useState(false);
    const[historyIds, setHistoryIds] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [customer, setCustomer] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [income, setIncome] = useState({pendingIncome: 0, recents: []});
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [lastMonthIncome, setLastMonthIncome] = useState(0);
    const [yearlyIncome, setYearlyIncome] = useState(0);
    const [expenses, setExpenses] = useState(0.00);
    const [ytdIncome, setYtdIncome] = useState([]);
    const [allIncome, setAllIncome] = useState([]);
    const [financePageCount, setFinancePageCount] = useState(0);
    const [showDateTime, setShowDateTime] = useState(false);
    const [quarter, setQuarter] = useState([]);
    const [isActive, setIsActive] = useState(null);
    const [messageCount, setMessageCount] = useState(0);
    const [name, setName] = useState('');
    const [orderEnded, setOrderEnded] = useState(false);
    const [detailsId, setDetailsId] = useState(null);
    const [timeInSeconds, setTimeInSeconds] = useState(0);
    const [timers, setTimers] = useState({});
    const [emailMessage, setEmailMessage] = useState(null);
    const [loadingEmail, setLoadingEmail] = useState(false);
    const [jobInProgress, setJobInProgress] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const [requestMessage, setRequestMessage] = useState(null);
    const [personel, setPersonel] = useState(1);

    const [loadingRequest, setLoadingRequest] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const fetchData = async () => {
            try {
                var data = {receiver: user?.email};
                const response = await api.post('/api/messages/users', data)
                const count = response.data.messages;
                setMessageCount(prev => prev + count);

            }catch (error) {
                console.log(error);
            }
        }
        if (user) {
            if (user?.firstName?.toString()?.length > 0) {
                setName(user.firstName?.charAt(0)?.toUpperCase() + user?.firstName?.slice(1));
            }
            setEmail(user?.email);
            fetchData()
        }
    }, []);

    const renderMenuIcon = (id) => {
        if (id === null || id === undefined) return;
        if (id === 1) {
            return <FaCertificate className={'bottom-icon'} />;
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

    const formatDate = (time) => {
        if (time = null || time === undefined) return;
        const date = new Date(time); // parses ISO string into local time

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}`;

    }

    const getTime = (date) => {
        const parsed = new Date(date);

        if (isNaN(parsed.getTime())) {
            return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        }

        if (isToday(parsed)) {
            return "Today " + " " + parsed.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        }

        const diff = differenceInCalendarDays(parsed, new Date());

        if (diff === 1) {
            return "Tomorrow " + " " + parsed.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        }

        if (diff === 2) {
            return "In 2 days" + " " + parsed.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        }

        return format(parsed, "EEE do MMM, yyyy h:mm a");
    }

    const formatDuration = (time) => {
        if (time === null || time === undefined || time.toString().length <= 0) {return }
        const times = time.split(':');
        if (times.length > 1) {
            return `${times[0]} ${times[1]}`;
        }
        return time;
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setPage(20)
                setShowDateTime(true);
                return;
            }
            setPage(10);
            setShowDateTime(false)
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, []);

    const renderName = (customer) => {
        if (customer === null || customer === '' || customer === undefined) {
            return customer;
        }
        const names = customer.split(' ');
        if (names.length <= 1) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        }
        let fullName = "";
        for (let i = 0; i < names.length; i++) {
            fullName += names[i].charAt(0).toUpperCase() + names[i].slice(1)+ " ";
        }
        return fullName;
    }

    function startCountdown(durationInSeconds, order) {
        let remaining = durationInSeconds;

        const interval = setInterval(() => {
            if (remaining <= 0) {
                clearInterval(interval);
                return;
            }

            remaining--;
            setJobInProgress(true);
            setorder(order);
            setActiveId(order.orderId);

            const hours = Math.floor(remaining / 3600);
            const minutes = Math.floor((remaining % 3600) / 60);
            const seconds = remaining % 60;

            // Format to HH:MM:SS
            const formatted =
                String(hours).padStart(2, "0") + ":" +
                String(minutes).padStart(2, "0") + ":" +
                String(seconds).padStart(2, "0");

            setTimers(prev => ({
                ...prev,
                [order.orderId]: formatted,
            }));

        }, 1000);
    }

    useEffect(() => {
        function startNewOrderCountdown(update = true) {

            const interval = setInterval(() => {
                if (!update) {
                    clearInterval(interval);
                    return;
                }

                setPageCount(prev => prev + 1);

            }, 10000);
        }
        startNewOrderCountdown();
    }, []);

    const initiateCountdown = (order) => {
        const jobHour = Number(order?.startHour);
        const jobMinute = Number(order?.startMinute);
        let jobTime = (jobHour * 60 * 60) + (jobMinute * 60);
        const personel = order?.personel;
        const email1 = order?.cleanerEmail;
        const email2 = order?.cleanerEmail2;
        if (personel > 1) {
            if (email1 !== email2) {
                jobTime = Math.round(jobTime / 2);
            }
        }
        startCountdown(jobTime, order);

    }

    const getPostcode = (postcode) => {
        if (!postcode) {return;}
        const cleanedPostcode = postcode?.replace(/\s/g, "").toUpperCase();
        const normalPostcode =  cleanedPostcode?.slice(0, -3) + " " + cleanedPostcode?.slice(-3);
        return normalPostcode;
    }

    const acceptOrder = async (orderId, personel = 1) => {
        if (acceptingOrders) {
            return
        }
        setAcceptingOrders(true);
        const cleanerData =  { cleanerName: cleanerName, cleanerEmail: email, cleanerPhone: phoneNumber, orderId: orderId, personel: personel };
        try {
            const acceptResponse = await api.post('/api/booking/accept-order', cleanerData)
            const { success } =  acceptResponse.data;
            if (success) {
                const prevIds = acceptedJobIds;
                prevIds.push(orderId);
                setAcceptedJobIds(prevIds);
                const prevOrder = newOrders.filter(order => order.orderId !== orderId);
                setNewOrders(prevOrder);
            }

        }
        catch (error) {
            setMessage('Something went wrong!');
            console.log(error);
        }
        finally {
            setAcceptingOrders(false);
            setPersonel(1);
        }
    }

    useEffect(() => {
        if (!isActive) return;
        const fetchOrders = async () => {
            if (isLoading) return;

            if (pageCount === 0) {
                setIsLoading(true)
            }
            try {
                const newOrderResponse = await api.get('api/booking/new');
                const orders = await newOrderResponse.data;
                if (orders?.booking?.length <= 0) {
                    setMessage('No new orders yet.');
                    return;
                }
                setNewOrders(orders?.booking);
            } catch (error) {
                console.log(error);
                setMessage('Error fetching new orders.')
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchOrders();
    }, [pageCount, isActive]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                if (!loadingMore && !orderEnded) {
                    if (activeMenu === 'New') {
                        setPageCount(prev => prev + 1)
                    }
                    if (activeMenu === 'Jobs') {
                        setMyPageCount(prev => prev + 1)
                    }
                    if (activeMenu === 'History') {
                        setHistoryPageCount(prev => prev + 1)
                    }
                    if (activeMenu === 'Finance') {
                        setFinancePageCount(prev => prev + 1)
                    }
                }
            }

        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loadingMore]);

    function CallButton({ phoneNumber }) {
        return (
            <div style={{width:'20px', alignSelf:'end', display:'flex', alignItems:'center', marginRight:'12px'}}>
                <p>
                    <a href={`tel:${phoneNumber}`} style={{ color: "blue" }}>
                        <label style={{color:'blue', fontSize:'medium'}}>Call</label>
                    </a>
                </p>
            </div>
        );
    }

    const NewOrders = ({ active }) => {
        const [detailsId, setDetailsId] = useState(null);

        return (
            <div className={'support-page'}>
                {isLoading ?
                    <div className="progress-bar-container">
                        <div className="spinner"></div>
                        <p style={{textAlign:'center'}}>Loading data...</p>
                    </div>
                    : (newOrders.length <= 0 || newOrders === null) ?
                        <div style={{
                            display:'flex',
                            minHeight:'100vh',
                            justifyContent:'center'
                        }}>
                            <p style={{textAlign:'center'}}>{message}</p>
                        </div> : active === true ?
                            <div className="grid-container">
                                {newOrders.map(order => (
                                    <div key={order.orderId}  className={'stat-card'}>
                                        <p style={{textAlign:'center'}}>{order.orderId}</p>

                                        <p style={{textAlign:'start', marginLeft:'10px'}}>{getTime(order.startTime)}</p>

                                        <div className={'new-order-container'}>
                                            <FaUser  className={'icon-small'} />
                                            <p style={{fontWeight:'bold', marginLeft:'2px', fontSize:'medium'}}>{renderName(order.customer)}</p>
                                            <FaHome size={20} style={{width:'30px', alignSelf:'end', marginBottom:'7px'}}  onClick={() => navigate('/sitemap', {state: {address: order.address}})}/>
                                        </div>

                                        <div className={'new-order-container'}>
                                            <FaPhone  className={'icon-small'} />
                                            <p style={{fontSize:'medium'}}>{order.phone}</p>
                                            <CallButton phoneNumber={order.phone} />
                                        </div>

                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                            <FaMapMarkerAlt className={'icon-small'}  />
                                            <p><span style={{fontWeight:'bold'}} >{getPostcode(order.postcode)}</span> {order.address}</p>
                                        </div>

                                        <div className={'new-order-container'}>
                                            <p style={{textAlign:'start', maxWidth:'20%', fontSize:'medium'}}>Tarif</p>
                                            <p style={{textAlign:'end',fontWeight:'900', fontSize:'medium'}}>{order.plan}</p>
                                        </div>


                                        <div className={'new-order-container'}>
                                            <p style={{ fontSize:'medium'}}>Estimated duration</p>
                                            <h4 style={{textAlign:'end', fontSize:'medium'}}>{formatDuration(order.duration)}</h4>
                                        </div>

                                        <div className={'new-order-container'}>
                                            <p style={{flex:'1', fontSize:'medium'}}>Estimated Amount</p>
                                            <h4 style={{textAlign:'end', flex:'1', fontSize:'medium'}}>£{Number(order.estimatedAmount).toFixed(2)}</h4>
                                        </div>

                                        <div style={{display:'flex', alignItems:'center', marginBottom:'5px', marginTop:'10px'}}>
                                            <h3 style={{textAlign:'start'}}>Details</h3>
                                            <MdKeyboardArrowRight
                                                size={40}
                                                style={{width:'40px', alignSelf:'end'}}
                                                onClick={() => {
                                                    if (detailsId?.length > 0 && order.orderId !== detailsId) return;
                                                    if (detailsId === null || detailsId === undefined) {
                                                        setDetailsId(order.orderId);
                                                        return;
                                                    }
                                                    setDetailsId(null);
                                                }}
                                                className={detailsId === order.orderId ? 'rotate-down' : 'rotate-up'}
                                            />
                                        </div>

                                        {detailsId === order.orderId && <div style={{marginBottom:'15px'}} className={'price-container'}>
                                                {order.booking.map((book, index) => (
                                                    <div key={index} className={'order-container'}>
                                                        <p style={{width:'60%', textAlign:'start'}}>{book.room}</p>
                                                        <p style={{textAlign:'end', width:'30%'}}>{book.count}</p>
                                                    </div>
                                                ))}
                                            </div>}

                                        {(acceptingOrders && acceptedJobIds.includes(order.orderId)) && <p>Load...</p>}

                                        {order?.personal > 1 && <div style={{
                                                display:'flex',
                                                alignItems:'center'
                                            }}>
                                                <FaUser size={20} style={{width:'40px'}} />
                                                <h3 style={{alignSelf:'end', width:'50px', textAlign:'end'}}>x2</h3>
                                            </div>}

                                        {(order?.personel > 1 && order?.cleanerEmail) && <div style={{
                                            display:'flex',
                                            alignItems:'center'
                                        }}>
                                               <FaUserTie size={20} style={{width:'40px'}} />
                                               <h3 style={{alignSelf:'end', width:'50px', textAlign:'end'}}>1</h3>
                                            </div>}

                                        {personel > 1 && <div style={{
                                            display:'flex',
                                            flexDirection:'column'
                                        }}>
                                            <div style={{display:'flex', alignItems:'center'}}>
                                                <p style={{margin:'15px'}}>
                                                    This job is for two employees. Can you do one or both parts?
                                                </p>
                                                <FaTimes size={20} style={{
                                                    width:'40px',
                                                    alignSelf:'end'
                                                }} onClick={() => {setPersonel(1)}} />
                                            </div>

                                            <div style={{gap:'10px'}} className={'form-actions'}>
                                                <button
                                                    style={{color:'white'}}
                                                    onClick={() => acceptOrder(order.orderId, 2)}
                                                    disabled={(acceptingOrders || acceptedJobIds.includes(order.orderId))}
                                                    className={(acceptingOrders || acceptedJobIds.includes(order.orderId)) ? 'back-button' : 'submit-button'}>
                                                    Both part
                                                </button>
                                                <button
                                                    style={{color:'white'}}
                                                    disabled={(acceptingOrders || acceptedJobIds.includes(order.orderId))}
                                                    onClick={() => acceptOrder(order.orderId, 1)}
                                                    className={(acceptingOrders || acceptedJobIds.includes(order.orderId)) ? 'back-button' : 'submit-button'}>
                                                    One part
                                                </button>
                                            </div>
                                        </div>}

                                        <button disabled={(acceptingOrders || acceptedJobIds.includes(order.orderId) || personel > 1)}
                                                onClick={() => {
                                                    if (order?.personel > 1 && !order?.cleanerEmail) {
                                                        setPersonel(2);
                                                        return;
                                                    }
                                                    acceptOrder(order.orderId, 1)
                                                }}
                                                style={{color:'white'}}
                                                className={(
                                                    acceptingOrders ||
                                                    acceptedJobIds.includes(order.orderId) ||
                                                    personel > 1) ? 'back-button' : 'next-button'}>
                                            {acceptedJobIds.includes(order.orderId) ?  "Accepted" : "Accept this job"}
                                        </button>
                                    </div>
                                ))}
                            </div> :
                            <p style={{textAlign:'start'}}>
                                You do not have the clearance to access booking at this moment.
                                If you believe this could be an error, contact help desk by email or through call <Link style={{color:'blue'}} to={'/contact'}>here </Link>
                                or via live chat
                            </p>
                }
                {loadingMore && <p>Loading...</p>}
            </div>
        );
    }

    useEffect(() => {
        window.scroll({top: 0, behavior: 'smooth'});
    }, [activeMenu])

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (!currentUser) return;
        api.post('/api/users/record', {email: currentUser?.email})
            .then((response) => {
            const { user } = response.data;
            if (user) {
                if (user?.firstName?.toString()?.length > 0 && user?.lastName?.toString()?.length > 0) {
                    setCleanerName(`${user?.firstName?.charAt(0)?.toUpperCase()+user?.firstName?.slice(1)} ${user?.lastName?.charAt(0)?.toUpperCase()+user?.lastName?.slice(1)}`);
                }
                const isActive = user.isActive;
                if (isActive === 1 || isActive === true || isActive === 'true') {
                    setIsActive(true);
                }
                else {
                    setIsActive(false);
                }
                if (user?.roles?.toString()?.length > 0) {
                    setBio(`Professional ${user?.roles?.charAt(0)?.toUpperCase()+user?.roles?.slice(1)}`);
                }
                setEmail(user.email);
                setPhoneNumber(user.phone);

            }

            })
            .catch((error) => {})

    }, [])

    useEffect(() => {
        if (email === null || email === undefined || email === '') {
            return;
        }

        api.post('/api/income-pending', {cleanerEmail: email})
            .then((response) => {
                if (response.data) {
                    setIncome(response.data);
                }

            })
            .catch((error) => {
                console.log(error);
            })

        api.post('/api/income-monthly', {cleanerEmail: email})
            .then((response) => {
                const {income, ytd} = response.data;
                if (income) {
                    setMonthlyIncome(income);
                }
                if (ytd) {
                    setYtdIncome(ytd);
                }

            })
            .catch((error) => {
                console.log(error);
            })

        api.post('/api/income-last-month', {cleanerEmail: email})
            .then((response) => {
                const {income } = response.data;
                if (income) {
                    setLastMonthIncome(income);
                }

            })
            .catch((error) => {
                console.log(error);
            })

        api.post('/api/income-yearly', {cleanerEmail: email})
            .then((response) => {
                const { income } = response.data;
                if (income) {
                    setYearlyIncome(income);
                }

            })
            .catch((error) => {
                console.log(error);
            })

        api.post('/api/income/quaterly', {cleanerEmail: email})
            .then((response) => {
                setQuarter(response.data.quarter);

            })
            .catch((error) => {
                console.log(error);
            })

    }, [email]);

    useEffect(() => {
        if (email === null || email === undefined || email === '' || orderEnded) return
        setLoadingMore(true)
        let  offset = 0;
        if (allIncome.length > 0) {
            offset = allIncome[allIncome.length - 1].id;
        }
        const data = {cleanerEmail: email, limit: 10, offset: offset};
        api.post('/api/income-all', data)
            .then((response) => {
                const { income } = response.data;
                if (income && income.length > 0) {
                    setAllIncome(prev => {
                        const map = new Map(prev.map(item => [item.id, item])); // old items
                        income.forEach(item => map.set(item.id, item));    // add/replace new
                        return Array.from(map.values()).sort((a, b) => a.id - b.id); // convert back to array
                    });
                }
                if (income?.length <= 0) {
                    setOrderEnded(true);
                }

            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoadingMore(false);
            })
    }, [email, financePageCount, orderEnded])

    const Finance = () => {

        useEffect(() => {
            const handleScroll = () => {
                const scrollTop = window.scrollY;
                const scrollHeight = document.documentElement.scrollHeight;
                const clientHeight = window.innerHeight;
                if (scrollTop + clientHeight >= scrollHeight - 100) {
                    if (!loadingMore) {
                        setFinancePageCount(prev => prev + 1)
                    }
                }
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }, [loadingMore]);

        const IncomeSummary = ({ monthly, yearly }) => {

            return (
                <div className="income-summary">
                    <h2>Income Summary</h2>
                    <div className="summary-cards">
                        <div className="summary-card">
                            <h3>This Month</h3>
                            <p>£{monthly}</p>
                            {lastMonthIncome > 0 && (
                                <small>
                                    {thisMonthIncome > lastMonthIncome ? '↑' : '↓'}
                                    {Math.abs(((thisMonthIncome - lastMonthIncome) / lastMonthIncome * 100).toFixed(1))}%
                                    from last month
                                </small>
                            )}
                        </div>

                        <div className="summary-card">
                            <h3>Total YTD</h3>
                            <p>£{yearly}</p>
                        </div>
                    </div>
                </div>
            );
        };
        
        const WorkHistory = ({incomes}) => {

            return (
                <div className="work-history">
                    <div className="recent-jobs">
                        <h3>Recent Jobs</h3>
                        <table>
                            <thead>
                            <tr>
                                <th style={{width:'30%'}}>Date</th>
                                <th style={{width:'45%'}}>Client</th>
                                <th style={{width:'25%'}}>Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {incomes
                                .map(item => (
                                    <tr key={item.id}>
                                        <td style={{width:'30%'}}>{formatDate(item.created_at)}</td>
                                        <td style={{width:'40%'}}>{item.client}</td>
                                        <td style={{width:'25%'}}>£{item.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {(!incomes || incomes.length <= 0 )&& <p>No recent income record was found</p>}
                    </div>
                </div>
            );
        };

        function getMonthlyIncomeTotals(year) {
            // First create a map of all months with 0 as default value
            const allMonths = Array.from({ length: 12 }, (_, i) => {
                const month = (i + 1).toString().padStart(2, '0');
                return `${year}-${month}`;
            });

            // Create initial object with all months set to 0
            const monthlyTotals = Object.fromEntries(
                allMonths.map(month => [month, 0])
            );

            // Process the daily incomes
            ytdIncome.forEach(income => {
                const monthKey = income.created_at.substring(0, 7);
                if (monthKey in monthlyTotals) {
                    monthlyTotals[monthKey] += Number(income.amount);
                }
            });

            // Convert to array of objects in chronological order
            return allMonths.map(month => ({
                month,
                total: monthlyTotals[month],
                year: parseInt(month.substring(0, 4)),
                monthNumber: (parseInt(month.substring(5, 7)))
            }));
        }

        const FinancialCharts = ({ income, quarterly }) => {
            // Prepare monthly income data
            const monthlyIncomeData = Array(12).fill(0);

            income.forEach(item => {
                const month = new Date(item.created_at).getMonth();
                monthlyIncomeData[month] += Number(item.amount);
            });

            // Prepare expense category data
            const quarterlyIncome = quarterly.reduce((acc, income) => {
                acc[income.category] = (acc[income.category] || 0) + Number(income.amount);
                return acc;
            }, {});

            const incomeChartData = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Monthly Income',
                        data: monthlyIncomeData,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }
                ]
            };

            const quarterChartData = {
                labels: Object.keys(quarterlyIncome),
                datasets: [
                    {
                        data: Object.values(quarterlyIncome),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)',
                            'rgba(54, 162, 235, 0.5)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            };

            return (
                <div className="financial-charts">
                    <div className="chart-container">
                        <h3>Monthly Income</h3>
                        <div className="chart-wrapper">
                            <Bar
                                data={incomeChartData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'top'
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="chart-container">
                        <h3>Income Quarterly</h3>
                        <div className="chart-wrapper">
                            <Pie
                                data={quarterChartData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'right'
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            );
        };


        const [error, setError] = useState('');

        function CustomDatePicker() {
            const [year, setYear] = useState(null);
            const [month, setMonth] = useState(null);
            const [day, setDay] = useState(null);
            const [thisMonth, setThisMonth] = useState(new Date().getMonth + 1);
            const [searching, setSearching] = useState(false);

            const [startDay, setStartDay] = useState(null);
            const [endDay, setEndDay] = useState(null);

            const years = Array.from({length: 100}, (_, i) => new Date().getFullYear() - i);
            const days = Array.from({length: 31}, (_, i) => i + 1);
            const months = Array.from({length: 12}, (_, i) => i + 1);

            function CustomDayRangePicker() {

                const handleStartChange = (e) => {
                    const newStart = Number(e.target.value);
                    if (newStart <= 0) {
                        setStartDay(null);
                        return;
                    }
                    setStartDay(newStart);
                    if (newStart > endDay && endDay > 0) {
                        setError('Start day cannot be after end day');
                    } else {
                        setError('');
                    }
                };

                const handleEndChange = (e) => {
                    const newEnd = Number(e.target.value);
                    if (newEnd <= 0) {
                        setEndDay(null)
                        return;
                    }
                    setEndDay(newEnd);
                    if (newEnd < startDay) {
                        setError('End day cannot be before start day');
                    } else {
                        setError('');
                    }
                };

                return (
                    <div style={{display: 'flex', flexDirection: 'row', flex:'2.5', gap:'5px', alignItems:'center'}}>
                        <label>From
                            <select value={startDay} onChange={handleStartChange}
                                    style={{padding:'10px',backgroundColor:'#f2f2f2', color:'darkred', flex:'1'}}>
                                <option value=""></option>
                                {days.map(day => (
                                    <option key={`start-${day}`} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>To
                            <select value={endDay} onChange={handleEndChange}
                                    style={{padding:'10px',backgroundColor:'#f2f2f2', color:'darkred', flex:'1'}}>
                                <option value=""></option>
                                {days.map(day => (
                                    <option key={`end-${day}`} value={day} disabled={day < startDay}>
                                        {day}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                );
            }

            const handleYearChange = (e) => {
                e.preventDefault();
                const year = Number(e.target.value);
                setYear(year);
            }

            const handleMonthChange = (e) => {
                e.preventDefault();
                setMonth(Number(e.target.value));
            }

            const search = () => {
                if (searching) {return;}
                let newMonth = month;
                let newYear = year;
                let newStartDay = startDay;
                let newEndDay = endDay;

                if (newStartDay === null || newStartDay === undefined) {
                    setError('Select day to search record for');
                    return;
                }

                if (newYear === null || newYear === undefined) {
                    newYear = new Date().getFullYear();
                }

                if (newEndDay === null || newEndDay === undefined) {
                    newEndDay = newStartDay;
                }

                if (newMonth === null || newMonth === undefined) {
                    newMonth = new Date().getMonth() + 1;
                }

                const searchData = {cleanerEmail: email, year: newYear, month: newMonth, startDay: newStartDay, endDay: newEndDay};

                api.post('/api/income/search', searchData)
                    .then((response) => {
                        const searchRecords = response.data.income.all;
                        if (searchRecords.length > 0) {
                            searchRecords.sort((a, b) => b.id - a.id);
                            setAllIncome(searchRecords);
                        }
                        else {
                            setError('No record matching your request was found')
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                        setError('Error occured while searching records');
                    })
                    .finally(() => {
                        setSearching(false);
                        setStartDay(null);
                    })

            }

            return (
                <div style={{display: 'flex', flexDirection:'row', margin:'10px', gap:'5px', zIndex:'100', alignItems:'center'}}>
                    <label style={{backgroundColor:'#f2f2f2', color:'darkred', flex:'1.3'}}>
                        Year
                        <select value={year} onChange={handleYearChange}
                                style={{padding:'10px',backgroundColor:'#f2f2f2', color:'darkred'}}>
                            <option value=""></option>
                            {years.map(y => <option style={{backgroundColor:'#f2f2f2'}} key={y} value={y}>{y}</option>)}
                        </select>
                    </label>
                    <label style={{backgroundColor:'#f2f2f2', color:'darkred', flex:'1.1'}}>
                        Month
                        <select value={month}
                                onChange={handleMonthChange}
                                style={{padding:'10px',backgroundColor:'#f2f2f2', color:'darkred'}}>
                            <option value=""></option>
                            {months.map(m =>
                                <option
                                    style={{backgroundColor:'#f2f2f2'}}
                                    key={m} value={m}>{m}
                                </option>
                            )}
                        </select>
                    </label>

                    <CustomDayRangePicker />
                    <FaSearch onClick={search}  style={{width:'20px', flex:'1', marginTop:'10px'}}/>
                </div>
            );
        }

        const formatDate = (date) => {
            const date1 = new Date(date);
            return  date1.toISOString().split('T')[0];
        }

        return (
            <div className="finance-dashboard">
                <header className="dashboard-header">
                    <div className="user-info">
                        <h1 className={'experience-text'}>{cleanerName}</h1>
                        <p>{bio}</p>
                    </div>
                    <div className="quick-stats">
                        <div className="stat-card">
                            <h3 style={{color:'green'}}>Earnings £{yearlyIncome}</h3>
                        </div>
                        <div className="stat-card">
                            <h3 style={{color:'darkred', textAlign:'end'}}>Pending £{income.pendingIncome}</h3>
                        </div>
                    </div>
                    <div className="stat-card">
                        {(activeTab === 'income' && allIncome.length > 0) && <CustomDatePicker /> }
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                    </div>
                </header>

                <nav className="dashboard-nav">
                    <button
                        className={activeTab === 'dashboard' ? 'active' : ''}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        Dashboard
                    </button>
                    <button
                        className={activeTab === 'income' ? 'active' : ''}
                        onClick={() => setActiveTab('income')}
                    >
                        Income
                    </button>

                </nav>

                <main className="dashboard-main">
                    {activeTab === 'dashboard' && (
                        <>
                            <IncomeSummary  monthly={monthlyIncome} yearly={yearlyIncome} />
                            <FinancialCharts income={ytdIncome} quarterly={quarter} />
                            <WorkHistory incomes={income.recents} />
                        </>
                    )}

                    {activeTab === 'income' && (
                        <div className="income-section">
                            <div className="income-list">
                                <div style={{display:'flex', gap:'6px', alignItems:'baseline'}}>
                                    <h3>Income Records</h3>
                                    <input checked={showDateTime}
                                           name={'showDateTime'}
                                           onChange={() => setShowDateTime(!showDateTime)}
                                           type={'checkbox'}
                                    />
                                </div>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Date</th>
                                        {showDateTime && <th>Client</th> }
                                        {showDateTime &&  <th>Time</th> }
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {allIncome.map(item => (
                                        <tr key={item.id}>
                                            <td>{formatDate(item.created_at)}</td>
                                            {showDateTime &&  <td>{item.client}</td> }
                                            {showDateTime &&   <td>{item.duration}</td> }
                                            <td>£{item.amount}</td>
                                            <td className={`status-${item.status}`}>{item.status}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            {!loadingMore && allIncome.length === 0 && <p>No income record found</p>}
                            {loadingMore && <p>Loading...</p>}
                        </div>
                    )}

                </main>

                <footer className="dashboard-footer">
                    <p>Last updated: {new Date().toLocaleString()}</p>
                </footer>
            </div>
        );
    }

    useEffect(() => {
        for (const order of myOrders) {
            let hour = Number(order.startHour);
            let minute = Number(order.startMinute);
            if (isNaN(hour) || isNaN(minute)) continue;
            if (hour?.toString()?.length <= 1) {
                hour = '0' + hour;
            }
            if (minute?.toString()?.length <= 1) {
                minute = '0' + minute;
            }

            const newTime = `${hour}:${minute}:00`;
            setTimers(prev => ({
                ...prev,
                [order.orderId]: newTime,
            }));
        }

    }, [myOrders]);

    useEffect(() => {
        const myOders = async () => {
            if (email === null || email === undefined || orderEnded) {
                return;
            }
            if (myOrders.length === 0) {
                setIsLoadMyOrders(true);
            }
            else {
                setLoadingMore(true);
            }
            try {
                let  offset = 0;
                if (myOrders.length > 0) {
                    offset = myOrders[myOrders.length - 1].id;
                }
                const userData = {email: email, limit: page, offset: offset};
                const acceptResponse = await api.post('/api/booking/my-orders', userData);
                const jobList = acceptResponse.data.booking;
                const time = acceptResponse.data?.time;

                if (jobList.length <= 0 && myOrders.length <= 0) {
                    setMessage('You do not have active job');
                }
                else {
                    setMyOrders(prev => {
                        const map = new Map(prev.map(item => [item.id, item])); // old items
                        jobList.forEach(item => map.set(item.id, item));    // add/replace new
                        return Array.from(map.values()).sort((a, b) => a.id - b.id); // convert back to array
                    });
                    if (time?.length > 0) {
                        const timeElapsed = Number(time[0]?.minutes_diff);
                        for (const order of jobList) {
                            if (order.orderId === time[0]?.orderId) {
                                const personel = order?.personel;
                                const email1 = order?.cleanerEmail;
                                const email2 = order?.cleanerEmail2;
                                let totalTime = ((Number(order?.startHour) * 60) + Number(order?.startMinute) - timeElapsed) * 60;
                                if (personel > 1) {
                                    if (email1 !== email2) {
                                        totalTime = Math.round(totalTime / 2);
                                    }
                                }
                                if (totalTime > 0) {
                                    startCountdown(totalTime, order);
                                }
                                else {
                                    startCountdown(1, order);
                                }
                                break;
                            }
                        }
                    }
                }
                if (jobList.length <= 0) {
                    setOrderEnded(true);
                }
            }
            catch (error) {
                setMessage('Error fetching active jobs');
                console.log(error);
            }
            finally {
                setIsLoadMyOrders(false);
                setLoadingMore(false);
            }
        }
        if (!loadingMore && !isLoadMyOrders && activeMenu === 'Jobs') {
            myOders()
        }
    }, [activeMenu, myPageCount, orderEnded]);

    const finishJob = async (e) => {
        e.preventDefault();
        let data = {email: order.cleanerEmail, orderId: order.orderId};
        setSubmitting(true);
        setColor('green');
        try {
            let response = await api.post('/api/booking/stop-cleaning', data);
            const { success, message, job } = response.data;
            if (!success) {
                setMyMesage(message);
                setColor('darkred')
            }
            else {
                const jobList = myOrders.filter(item => item.orderId !== order.orderId);

                data = {cleanerEmail: order.cleanerEmail, cleanerName: order.cleaner, client: order.customer, duration: order.duration, amount: order.estimatedAmount, orderId: order.orderId};
                response = await api.post('/api/income', data);
                const { success } = response.data;
                if (!success) {
                    setMyMesage('Income data still processing');
                    setColor('darkred')
                }
                else {
                    setMyMesage('Income record successfully created');
                    const ids = historyIds
                    ids.push(order.orderId);
                    setHistoryIds(ids)
                }

                setTimeout(() => setMyOrders(jobList), 4000)

                const formatted = '00:00:00';

                setTimers(prev => ({
                    ...prev,
                    [order.orderId]: formatted,
                }));

                setJobInProgress(false);
                setorder({});
                setActiveId(null);

            }

        } catch (error) {
            console.log(error);
            setMyMesage('Error occured. Please try again after page reload');
            setColor('darkred')
        } finally {
            setSubmitting(false);
            const resetMessage = () => {
                setMyMesage(null)
            }
            setTimeout(() => resetMessage(), 4000);
        }

    }

    const startJob = async (e) => {
        e.preventDefault();
        if (!order) return;
        let data = {email: order?.cleanerEmail, orderId: order?.orderId};
        setSubmitting(true);
        setColor('green');
        try {
            let response = await api.post('/api/booking/start-cleaning', data);
            const { success, message, job } = response.data;
            setMyMesage(message);
            if (!success) {
                setColor('darkred')
            }
            else {
                setMyOrders(prev => {
                    const map = new Map(prev.map(item => [item.id, item])); // old items
                    job.forEach(item => map.set(item.id, item));    // add/replace new
                    return Array.from(map.values()).sort((a, b) => a.id - b.id); // convert back to array
                });
                initiateCountdown(order);
            }

        } catch (error) {
            console.log(error);
            setMyMesage('Error occured. Please try again');
            setColor('darkred')
        } finally {
            setSubmitting(false);
            setorder(null);
            const resetMessage = () => {
                setMyMesage(null);
            }
            setTimeout(() => resetMessage(), 4000);
        }
    }

    const handleOrder = async (order) => {
        if (order?.stage === 'email') {
            setIdForUpdate(order.orderId);
            setorder(order);
            return;
        }
        var data = {
            to: order?.email,
            text: "A Fly Cleaner is on the way to your property. Please make your property accessible",
            subject: "Cleaning service"
        };
        setLoadingEmail(true);
        var succeeded = false;
        try {
            let response = await api.post('/api/booking/check-pending-order', {email: order?.cleanerEmail});
            const { jobs } = response.data;
            if (jobs?.length) {
                setEmailMessage('You have an on-going job. Please finish the job before notifying a client');
                return;
            }

            response = await api.post('/api/send-email-to-customer', data);

            const { message, success} =  response.data;
            setEmailMessage(message);
            succeeded = success;
            if (success) {
                data = {email: order.cleanerEmail, orderId: order.orderId};
                response = await api.post('/api/booking/update-stage', data);
                const { job, message, success } = response.data;
                setMyOrders(prev => {
                    const map = new Map(prev.map(item => [item.id, item])); // old items
                    job.forEach(item => map.set(item.id, item));    // add/replace new
                    return Array.from(map.values()).sort((a, b) => a.id - b.id); // convert back to array
                });
                if (!success) {
                    setEmailMessage(message);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingEmail(false);
            setTimeout(() => setEmailMessage(null), 4000)
        }

    }

    const MyOrders = () => {
        const [otId, setOtId] = useState(null);
        const [detailsId, setDetailsId] = useState(null);
        const [ot, setOt] = useState(null);


        useEffect(() => {
            setTimeout(() => setRequestMessage(null), 5000);

        }, [requestMessage]);

        const renderWithTime = (date) => {
            const diff = differenceInHours(new Date(date), new Date());
            if (diff <= 3) {
                return true;
            }
            return false;
        }

        const timeToNotify = (order) => {
            if (order?.rescheduled) return false;
            const now = new Date(order?.time);
            const startTime = new Date(order?.startTime);
            const hours = Math.abs(differenceInHours(now, startTime)) <= 2;
            return hours || order?.stage === 'email';
        }

        const showExtension = (order) => {
            const timeStarted = order?.beginTime;
            if (!timeStarted) return false;
            const hour = order?.startHour;
            const minute = order?.startMinute;
            const time = order?.time;
            const totalMinutes = (hour * 60) + minute;
            const diff = differenceInMinutes(new Date(time), new Date(timeStarted));

            return diff > totalMinutes;
        }

        const requestOT = async (order) => {
            if (loadingRequest) {return;}
            setLoadingRequest(true);
            try {
                const data = { email: order?.cleanerEmail, orderId: order?.orderId, ot: ot }
                const response = await api.post('/api/booking/ot-request', data)
                const { success, message, booking, time } =  response.data;
                setRequestMessage(message);
                if (success) {
                    setMyOrders(prev => {
                        const map = new Map(prev.map(item => [item.id, item])); // old items
                        booking.forEach(item => map.set(item.id, item));    // add/replace new
                        return Array.from(map.values()).sort((a, b) => a.id - b.id); // convert back to array
                    });
                    if (time?.length > 0) {
                        const timeElapsed = Number(time[0]?.minutes_diff);
                        for (const order of booking) {
                            if (order.orderId === order?.orderId) {
                                startCountdown(1, order);
                                break;
                            }
                        }
                    }
                }

            } catch (error) {
                console.log(error);
                setRequestMessage('Error occured while sending request');
            } finally {
                setLoadingRequest(false);
            }
        }

        return (
            <div className={'support-page'}>
                {isLoadMyOrders ?
                    <div className="progress-bar-container">
                        <div className="spinner"></div>
                        <p style={{textAlign:'center'}}>Loading data...</p>
                    </div>
                    : (myOrders.length <= 0 || myOrders === null) ?
                        <div style={{display:'flex', minHeight:'100vh', justifyContent:'center'}}>
                            <p style={{textAlign:'center'}}>{message}</p>
                        </div> :
                        <div className="grid-container">
                            {myOrders.map(order => (
                                <div key={order.orderId} style={{border:'dashed', padding:'10px', borderRadius:'10px'}} >
                                    <p style={{textAlign:'center'}}>{order.orderId}</p>
                                    <p style={{fontSize:'medium', textAlign:'center'}} >{getTime(order.startTime)}</p>
                                    {(order?.stage === 'email' && order.orderId !== idForUpdate) &&
                                        <h2
                                            style={activeId === order.orderId ?
                                                {textAlign:'center', color:'darkred'} :
                                                {textAlign:'center', color:'blue'} }>{timers[order.orderId]}
                                        </h2>
                                    }

                                    <div className={'new-order-container'}>
                                        <FaUser  className={'icon-small'} />
                                        <p style={{fontWeight:'bold', marginLeft:'2px', fontSize:'medium'}}>{renderName(order.customer)}</p>
                                        <FaHome size={20} style={{width:'30px', alignSelf:'end', marginBottom:'7px'}}  onClick={() => navigate('/sitemap', {state: {address: order.address}})}/>
                                    </div>

                                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginRight:'10px'}}>
                                        <FaPhone  className={'icon-small'} />
                                        <p>{order.phone}</p>
                                        <CallButton phoneNumber={order.phone} />
                                    </div>

                                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                        <FaMapMarkerAlt className={'icon-small'}  />
                                        <p><span style={{fontWeight:'bold'}} >{getPostcode(order.postcode)}</span> {order.address}</p>
                                    </div>

                                    <div style={{
                                        display:'flex',
                                        justifyContent:'center',
                                        alignItems:'center'}}>
                                        <p style={{width:'40%'}}>Dirt Level</p>
                                        <p style={{textAlign:'end'}}><span style={order.nature === 'Light'? {color:'Green', fontWeight:'bold'}:
                                            order.nature === "Medium" ? {color:'blue', fontWeight:'bold'} : {color:'red', fontWeight:'bold'}  }>
                                            {order.nature} </span>
                                        </p>
                                    </div>

                                    <div style={{display:'flex',
                                        justifyContent:'center',
                                        alignItems:'center'}}>
                                        <p style={{width:'20%'}}>Tarif</p>
                                        <p style={{textAlign:'end'}}>{order.plan}</p>
                                    </div>

                                    {loadingRequest && <p style={{margin:'10px'}}>Sending request...</p>}

                                    {requestMessage && <p style={{margin:'10px'}}>{requestMessage}</p>}

                                    {showExtension(order) &&  <div style={{display:'flex', flexDirection:'column'}}>
                                        <div style={{
                                            display:'flex',
                                            alignItems:'center',
                                            marginBottom:'5px',
                                            marginTop:'10px'}}>
                                            <h3 style={{textAlign:'start'}}>Time extension</h3>
                                            <MdKeyboardArrowRight
                                                size={40}
                                                style={{width:'40px', alignSelf:'end'}}
                                                onClick={() => {
                                                    if (otId?.length > 0 && order.orderId !== otId) return;
                                                    if (otId === null || otId === undefined) {
                                                        setOtId(order.orderId);
                                                        return;
                                                    }
                                                    setOtId(null);
                                                }}
                                                className={otId === order.orderId ? 'rotate-down' : 'rotate-up'}
                                            />
                                        </div>

                                        {order?.orderId === otId &&  <div style={{
                                            display:'flex',
                                            alignItems:'center',
                                            marginBottom:'5px',
                                            marginTop:'5px',
                                            gap:'10px'
                                        }}>
                                            <input
                                                className={'button-bg'}
                                                placeholder={'time in minutes'}
                                                type={'number'}
                                                value={ot}
                                                onChange={(e) => setOt(e.target.value)}
                                                style={{
                                                    padding:'10px',
                                                    textAlign:'center',
                                                }}
                                            />
                                            <button onClick={() => requestOT(order)}
                                                    disabled={!ot || ot < 20}
                                                    className={(ot >= 20 || order?.extra === null) ? 'submit-button' : 'back-button' }>
                                                Request
                                            </button>
                                        </div>
                                        }

                                    </div>}

                                    <div style={{display:'flex', alignItems:'center', marginBottom:'5px', marginTop:'10px'}}>
                                        <h3 style={{textAlign:'start'}}>Details</h3>
                                        <MdKeyboardArrowRight
                                            size={40}
                                            style={{width:'40px', alignSelf:'end'}}
                                            onClick={() => {
                                                if (detailsId?.length > 0 && order.orderId !== detailsId) return;
                                                if (detailsId === null || detailsId === undefined) {
                                                    setDetailsId(order.orderId);
                                                    return;
                                                }
                                                setDetailsId(null);
                                            }}
                                            className={detailsId === order.orderId ? 'rotate-down' : 'rotate-up'}
                                        />
                                    </div>

                                    {detailsId === order.orderId && <div style={{marginBottom:'15px'}} className={'price-container'}>
                                        {order.booking.map((book, index) => (
                                            <div key={index} className={'order-container'}>
                                                <p style={{width:'60%', textAlign:'start'}}>{book.room}</p>
                                                <p style={{textAlign:'end', width:'30%'}}>{book.count}</p>
                                            </div>
                                        ))}
                                    </div>}

                                    <div className={'order-container'}>
                                        <p style={{width:'70%'}}>Estimated time</p>
                                        <h3 style={{textAlign:'end'}}>{formatDuration(order.duration)}</h3>
                                    </div>

                                    <div className={'order-container'}>
                                        <p style={{flex:'1'}}>Estimated Amount</p>
                                        <h3 style={{textAlign:'end', flex:'1'}}>£{Number(order.estimatedAmount).toFixed(2)}</h3>
                                    </div>

                                    {order.orderId === idForUpdate && <div className="price-container">
                                        <div className={'new-order-container'}>
                                            <h3 style={{textAlign:'center'}}>Job update</h3>
                                            <FaTimes size={20} style={{width:'30px', marginLeft:'15px', color:'black', alignSelf:'end'}}
                                                     onClick={() => {setIdForUpdate(''); setorder({})}} />
                                        </div>

                                        <h2
                                            style={activeId === order.orderId ?
                                                {textAlign:'center', color:'darkred'} :
                                                {textAlign:'center', color:'blue'} }>{timers[order.orderId]}
                                        </h2>

                                        <p className={'order-container'} style={{ textAlign:'start'}}>
                                            It is very important that you only press START when you arrive at client's place or press FINISH only when the job is done.
                                        </p>

                                        {myMesage && <p style={{color: color, textAlign:'center', margin:'10px'}}>{myMesage}</p>}

                                        {submitting && <p>Loading...</p>}

                                        <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center', gap:'10px'}}>
                                            <button disabled={(submitting || order?.beginTime !== null || jobInProgress)}
                                                    onClick={startJob}
                                                    className={(submitting || order?.beginTime !== null || jobInProgress) ?
                                                        'back-button' : 'next-button'}>
                                                START
                                            </button>
                                            <button disabled={(submitting || order?.beginTime === null || activeId !== order.orderId || !jobInProgress || order?.completed)}
                                                    onClick={finishJob}
                                                    className={(submitting || order?.beginTime === null || activeId !== order.orderId || !jobInProgress) ?
                                                        'back-button' : 'next-button'}>
                                                FINISH
                                            </button>
                                        </div>
                                    </div>}

                                    {loadingEmail && <p style={{margin:'10px', textAlign:'center'}}>sending email...</p>}

                                    {emailMessage && <p style={{margin:'10px', textAlign:'center'}}>{emailMessage}</p>}

                                    {timeToNotify(order) && <div>
                                        {order.orderId !== idForUpdate &&
                                            <button
                                                className={(idForUpdate === order.orderId || idForUpdate !== '' || loadingEmail || (jobInProgress && activeId !== order.orderId)) ? 'back-button' : 'next-button'}
                                                disabled={(idForUpdate === order.orderId || idForUpdate !== '' || loadingEmail || (jobInProgress && activeId !== order.orderId))}
                                                onClick={() => handleOrder(order)}>
                                                {order?.stage !== 'email' ? "Notify Client" : order?.beginTime === null ? "Start this job" : "finsish this job"}
                                            </button>
                                        }
                                    </div>}

                                    {order?.rescheduled === 1 && <div className={'price-container'}>
                                        <p>
                                            This job has been rescheduled. You have to accept this job again.
                                            Please note that this job will become available for other employees
                                            after 1 hour if you do not accept it.
                                        </p>
                                        <button disabled={(acceptingOrders || acceptedJobIds.includes(order.orderId))}
                                                onClick={() => acceptOrder(order.orderId)}
                                                className={(acceptingOrders || acceptedJobIds.includes(order.orderId)) ? 'back-button' : 'next-button'}>
                                            {acceptedJobIds.includes(order.orderId) ?  "Accepted" : "Accept this job"}
                                        </button>
                                    </div>}
                                </div>
                            ))}
                        </div>
                }
                {loadingMore && <p>Loading...</p>}
            </div>
        );
    }

    useEffect(() => {
        const history = async () => {
            if (email === null || email === undefined || orderEnded) {
                return;
            }
            if (jobHistory.length > 0) {
                setLoadingMore(true);
            }
            else  {
                setLoadingHistory(true);
            }
            try {
                let offset = 0;
                if (jobHistory.length > 0) {
                    const jobs = jobHistory;
                    jobs.sort((a, b) => a.id - b.id);
                    offset = jobs[jobs.length - 1].id;
                }
                const data = {email: email, limit: page, offset: offset};
                const acceptResponse = await api.post('/api/booking/history', data);
                const jobList = acceptResponse.data.booking;
                if (jobList?.length <= 0 && jobHistory?.length <= 0) {
                    setHistoryMessage('You do not have active history');
                }
                else {
                    setJobHistory(prev => {
                        const map = new Map(prev.map(item => [item.id, item])); // old items
                        jobList.forEach(item => map.set(item.id, item));    // add/replace new
                        return Array.from(map.values()).sort((a, b) => a.id - b.id).reverse(); // convert back to array
                    });
                }
                if (jobList?.length <= 0) {
                    setOrderEnded(true)
                }
            }
            catch (error) {
                setHistoryMessage('Error fetching my history');
                setJobHistory([]);
                console.log(error);
            } finally {
                setLoadingHistory(false);
                setLoadingMore(false);
            }
        }
        if (!loadingMore && !loadingHistory && activeMenu === 'History') {
            history()
        }
    }, [historyPageCount, activeMenu]);

    function getDuration(start, end) {
        const startDate = new Date(start);
        const endDate = new Date(end);

        let diffMs = Math.abs(endDate - startDate);

        // Convert to hours and minutes
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        diffMs -= hours * 1000 * 60 * 60;

        const minutes = Math.floor(diffMs / (1000 * 60));

        return `${hours}h ${minutes}m`;
    }

    function timeAgo(endDate, currentDate) {
        const now = new Date(currentDate);
        const prevDate = new Date(endDate);
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

    const updateHistoryIds = (id) => {
        if (historyIds.includes(id)) {
            const filtered = historyIds.reduce((acc, num) => {
                if (num !== id) {  // keep if not the number we want to remove
                    acc.push(num);
                }
                return acc;
            }, [])
            setHistoryIds(filtered);
        }
        else {
            const prevIds = historyIds;
            prevIds.push(id)
            historyIds.push(prevIds);
        }
    }

    const goToClientProfile = (email, client) => {

        window.open(`/customer?client=${encodeURIComponent(client)}&email=${encodeURIComponent(email)}`, "_blank");
    }

    const History = () => {
        const [review, setReview] = useState('');
        const [message, setMessage] = useState('');
        const [rating, setRating] = useState(1);
        const [bgColor, setBgColor] = useState('red');
        const [bookingIdForReview, setBookingIdForReview] = useState(-1);
        const [detailsId, setDetailsId] = useState(null);

        const handleReviewChange = (e) => {
            e.preventDefault();
            setReview(e.target.value);
        }
        const writeReview = async (e) => {
            e.preventDefault();
            setLoading(true);
            const reviewData = { customer: customer, cleanerEmail: email, review: review , rating: rating };
            try {
                const response = await api.post('/api/reviews', reviewData)
                const { success } = response.data.success;
                if (success) {
                    setBgColor('green');
                    setMessage("Review sent successful");
                }
                else {
                    setBgColor('red');
                    setMessage("Review not sent ")
                }
            } catch (error) {
                  console.log(error);
                setBgColor('red');
                setMessage("Error occured while sending review");
            } finally {
                setLoading(false);
                setReview('')
                setBookingIdForReview(-1)
            }
        }

        return (
            <div className={'support-page'}>
                {loadingHistory ?
                    <div className="progress-bar-container">
                        <div className="spinner"></div>
                        <p style={{textAlign:'center'}}>Loading data...</p>
                    </div>
                    : (jobHistory.length <= 0 || jobHistory === null) ?
                        <p style={{textAlign:'center'}}>{historyMessage}</p> :
                        <div className="grid-container">
                            {jobHistory.map(order => (
                                <div key={order.id} className={'price-container'} >
                                    <p style={{textAlign:'center'}}>{order.orderId}</p>
                                    <div className={'order-container'}>
                                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                            <h3 style={{width:'70%'}}>{renderName(order.customer)}</h3>
                                            {bookingIdForReview !== order.id && <FaPen style={{width:'30px'}} onClick={bookingIdForReview === -1 ? () => {setBookingIdForReview(order.id); setClientEmail(order.clientEmail); setCustomer(order.customer)}: null} />}
                                            {bookingIdForReview === order.id && <FaTimes style={{width:'30px'}} onClick={() => {setBookingIdForReview(-1); setReview(''); setRating(1)}} />}
                                            <FaUserTie onClick={() => goToClientProfile(order.clientEmail, order.customer)} size={30} style={{width:'30px', color:'dodgerblue', marginRight: '3%'}} />
                                        </div>
                                    </div>

                                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                        <FaPhone  className={'icon-small'} />
                                        <p style={{fontSize:'medium'}} >{order.phone}</p>
                                        <CallButton phoneNumber={order.phone} />
                                    </div>

                                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                        <FaMapMarkerAlt className={'icon-small'}  />
                                        <p><span style={{fontWeight:'bold'}} >{getPostcode(order.postcode)}</span> {order.address}</p>
                                    </div>

                                    {message && <p style={{color:bgColor}}>{message}</p>}
                                    {order.id === bookingIdForReview && <div>
                                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                            <p>Rating: {rating}</p>
                                            <FaArrowCircleLeft size={20} style={{width:'30px', color:'blue', marginRight:'15px'}} onClick={rating > 1 ? () => setRating(rating - 1) : null}/>
                                            <FaArrowCircleRight size={20} style={{width:'30px', color:'blue'}} onClick={rating < 5 ? () => setRating(rating + 1) : null} />
                                        </div>
                                        <textarea ref={ref} placeholder={'write review for this client'}
                                                  style={{backgroundColor:'linen', color:'black', padding:'12px'}}
                                                  rows={5}
                                                  value={review}
                                                  onChange={handleReviewChange}
                                                  name={'review'}
                                        />
                                        <button onClick={writeReview}
                                                style={{borderRadius:'30px', marginTop:'6px'}}
                                                className={'submit-button'}
                                                disabled={(order.id !== bookingIdForReview || loading || review === '')}>
                                            Save review
                                        </button>
                                    </div>}

                                    <div className={'order-container'}>
                                        <h4 style={{width:'50%'}}>Amount</h4>
                                        <h3 style={{textAlign:'end'}}>£{order.estimatedAmount}</h3>
                                    </div>

                                    <div className={'order-container'}>
                                        <h4 style={{width:'50%'}}>Duration</h4>
                                        <h3 style={{textAlign:'end'}}>{order?.duration}</h3>
                                    </div>

                                    <div style={{display:'flex', alignItems:'center', marginBottom:'5px', marginTop:'10px'}}>
                                        <h3 style={{textAlign:'start'}}>Details</h3>
                                        <MdKeyboardArrowRight
                                            size={40}
                                            style={{width:'40px', alignSelf:'end'}}
                                            onClick={() => {
                                                if (detailsId?.length > 0 && order.orderId !== detailsId) return;
                                                if (detailsId === null || detailsId === undefined) {
                                                    setDetailsId(order.orderId);
                                                    return;
                                                }
                                                setDetailsId(null);
                                            }}
                                            className={detailsId === order.orderId ? 'rotate-down' : 'rotate-up'}
                                        />
                                    </div>

                                    {detailsId === order.orderId && <div style={{marginBottom:'15px'}} className={'price-container'}>
                                        {order.booking.map((book, index) => (
                                            <div key={index} className={'order-container'}>
                                                <p style={{width:'60%', textAlign:'start'}}>{book.room}</p>
                                                <p style={{textAlign:'end', width:'30%'}}>{book.count}</p>
                                            </div>
                                        ))}
                                    </div>}

                                    <div className={'order-container'}>
                                        <FaClock onClick={() => {setDateToggle(!dateToggle); updateHistoryIds(order.id)}} style={{width:'30px'}} size={20}/>
                                        {!historyIds.includes(order.id) && <h3 style={{textAlign:'end'}}>{timeAgo(order?.actualStopTime, order?.time)}</h3>}
                                        {historyIds.includes(order.id) && <h3 style={{textAlign:'end'}}>{getTime(order.actualStopTime)}</h3>}
                                    </div>
                                </div>
                            ))}
                        </div>
                }
                {loadingMore && <p>Loading...</p>}
            </div>
        );
    }

    const SupportPage = () => {
        const [activeTab, setActiveTab] = useState('faq');
        const [formData, setFormData] = useState({
            category: '',
            employeeId: '',
            email: '',
            issueType: 'general',
            message: '',
            urgency: 'normal'
        });
        const [submitted, setSubmitted] = useState(false);

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            setFormData({
                name: '',
                employeeId: '',
                email: '',
                issueType: 'general',
                message: '',
                urgency: 'normal'
            });
        };

        const faqs = [
            {
                question: "How do I report a problem with my timesheet?",
                answer: "Please use the 'Payroll Issues' option in the contact form below. Include your employee ID, the dates in question, and any supporting evidence like photos of your signed timesheet."
            },
            {
                question: "What should I do if a client cancels last minute?",
                answer: "1. Inform your supervisor immediately via phone or the company app. 2. Complete the cancellation report in your cleaning app. 3. You may be offered alternative work depending on company policy."
            },
            {
                question: "How do I request holiday pay?",
                answer: "Submit holiday requests at least 4 weeks in advance through the company portal. Remember you're entitled to 5.6 weeks paid holiday per year under UK law (pro rata if part-time)."
            },
            {
                question: "What PPE is my employer required to provide?",
                answer: "Your employer must provide all necessary PPE free of charge including gloves, aprons, and masks if required. Report any missing equipment immediately."
            },
            {
                question: "How do I handle hazardous waste?",
                answer: "Follow COSHH regulations. Never handle hazardous waste without proper training. Use the yellow hazardous waste bags provided and report any incidents immediately."
            }
        ];

        const resources = [
            {
                title: "UK Cleaning Industry Employment Guidelines",
                link: "#",
                type: "pdf"
            },
            {
                title: "COSHH Regulations for Cleaners",
                link: "#",
                type: "pdf"
            },
            {
                title: "How to Complete Your Timesheet (Video)",
                link: "#",
                type: "video"
            },
            {
                title: "Employee Handbook 2023",
                link: "#",
                type: "pdf"
            },
            {
                title: "Right to Work Checklist",
                link: "#",
                type: "pdf"
            }
        ];

        return (
            <div className="support-page">
                <Helmet>
                    <title>Support | Flycleaner Professional Portal</title>
                </Helmet>

                <header className="support-header">
                    <h1>Fly cleaner Professional Support</h1>
                    <p>Help and resources for our cleaning professionals across the UK</p>
                </header>

                <nav className="support-nav">
                    <button
                        className={activeTab === 'faq' ? 'active' : ''}
                        onClick={() => setActiveTab('faq')}
                    >
                        FAQs
                    </button>
                    <button
                        className={activeTab === 'contact' ? 'active' : ''}
                        onClick={() => setActiveTab('contact')}
                    >
                        Contact Support
                    </button>

                    <button
                        className={activeTab === 'emergency' ? 'active' : ''}
                        onClick={() => setActiveTab('emergency')}
                    >
                        Emergency Contacts
                    </button>

                </nav>

                <main className="support-main">
                    {activeTab === 'faq' && (
                        <section className="faq-section">
                            <h2>Frequently Asked Questions</h2>
                            <div className="faq-list">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="faq-item">
                                        <h3>{faq.question}</h3>
                                        <p>{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                            <p style={{margin:'15px'}}>For more FAQs, visit <Link style={{color:'blue'}} to={'/help'}>help</Link>.</p>
                        </section>
                    )}

                    {activeTab === 'contact' && (
                        <section className="contact-section">
                            <h2>Contact Support Team</h2>
                            {submitted ? (
                                <div className="success-message">
                                    <p>Thank you for your message! Our support team will respond within 24 hours.</p>
                                    <p>For urgent matters, please call our support line at <strong>0800 123 4567</strong>.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="support-form">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            required
                                            className={'button-bg'}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="employeeId">Employee ID</label>
                                        <input
                                            type="text"
                                            id="employeeId"
                                            name="employeeId"
                                            value={formData.employeeId}
                                            onChange={handleInputChange}
                                            required
                                            pattern="[A-Za-z0-9]{6}"
                                            title="6-character employee ID"
                                            className={'button-bg'}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className={'button-bg'}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="issueType">Issue Type</label>
                                        <select
                                            id="issueType"
                                            name="issueType"
                                            value={formData.issueType}
                                            onChange={handleInputChange}
                                            required
                                            className={'button-bg'}
                                        >
                                            <option value="general">General Inquiry</option>
                                            <option value="payroll">Payroll Issue</option>
                                            <option value="equipment">Equipment Request</option>
                                            <option value="client">Client Issue</option>
                                            <option value="safety">Health & Safety Concern</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="urgency">Urgency Level</label>
                                        <select
                                            id="urgency"
                                            name="urgency"
                                            value={formData.urgency}
                                            onChange={handleInputChange}
                                            required
                                            className={'button-bg'}
                                        >
                                            <option value="low">Low (response in 3-5 days)</option>
                                            <option value="normal">Normal (response in 1-2 days)</option>
                                            <option value="high">High (response within 24 hours)</option>
                                            <option value="critical">Critical (immediate attention needed)</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">Details</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows="5"
                                            placeholder="Please provide as much detail as possible about your issue..."
                                            className={'button-bg'}
                                        >

                                        </textarea>
                                    </div>

                                    <div className="form-group">
                                        <button className={'submit-button'} type="submit">Submit Request</button>
                                    </div>
                                </form>
                            )}
                        </section>
                    )}

                    {activeTab === 'emergency' && (
                        <section className="emergency-section">
                            <h2>Emergency Contacts</h2>

                            <div className="emergency-grid">
                                <div className="emergency-card critical">
                                    <h3>Immediate Danger</h3>
                                    <p>If you're in immediate danger at a client site:</p>
                                    <div className="contact-number">
                                        <span>Emergency Services</span>
                                        <strong>999</strong>
                                    </div>
                                    <p className="instructions">
                                        Leave the premises immediately if safe to do so, then call.
                                    </p>
                                </div>

                                <div className="emergency-card urgent">
                                    <h3>Health & Safety Emergency</h3>
                                    <p>For chemical exposure, injuries, or safety threats:</p>
                                    <div className="contact-number">
                                        <span>Company Safety Line</span>
                                        <strong>0736 258 7018</strong>
                                    </div>
                                    <div className="contact-number">
                                        <span>HSE Concerns</span>
                                        <strong>0736 258 7018</strong>
                                    </div>
                                </div>

                                <div className="emergency-card important">
                                    <h3>Urgent Work Issues</h3>
                                    <p>For last-minute cancellations, access issues:</p>
                                    <div className="contact-number">
                                        <span>Operations Manager</span>
                                        <strong>0736 258 7018</strong>
                                    </div>
                                    <div className="contact-number">
                                        <span>Out of Hours</span>
                                        <strong>0736 258 7018</strong>
                                    </div>
                                </div>

                                <div className="emergency-card support">
                                    <h3>Personal Support</h3>
                                    <p>Confidential help for personal issues:</p>
                                    <div className="contact-number">
                                        <span>Samaritans</span>
                                        <strong>0736 258 7018</strong>
                                    </div>
                                    <div className="contact-number">
                                        <span>Citizens Advice</span>
                                        <strong>0736 258 7018</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="emergency-procedures">
                                <h3>Emergency Procedures</h3>
                                <div className="procedure">
                                    <h4>Chemical Spill</h4>
                                    <ol>
                                        <li>Evacuate the area immediately</li>
                                        <li>Alert others in the vicinity</li>
                                        <li>Do not attempt cleanup unless trained</li>
                                        <li>Call company safety line</li>
                                        <li>Refer to COSHH sheet for specific chemical</li>
                                    </ol>
                                </div>

                                <div className="procedure">
                                    <h4>Injury at Work</h4>
                                    <ol>
                                        <li>Ensure your own safety first</li>
                                        <li>Administer first aid if trained</li>
                                        <li>Call 999 if serious</li>
                                        <li>Report to manager immediately</li>
                                        <li>Complete accident report form within 24 hours</li>
                                    </ol>
                                </div>
                            </div>
                        </section>
                    )}
                </main>

                <footer className="support-footer">
                    <p>© 2023 Flymax UK Ltd. All rights reserved.</p>
                    <p>Registered in England No. SC839400</p>
                </footer>
            </div>
        );
    };

    useEffect(() => {
        const fetchCleanerData = () => {
            if (email === null || email === undefined || email === '') {
                return;
            }
            setIsLoading(true);
            api.post('/api/users/record', {email: email})
                .then(response => {
                    const { user } = response.data;
                    if (user) {
                        localStorage.setItem('user', JSON.stringify(user));
                        setValue('personal', {
                            ...getValues().personal,
                            firstName: user?.firstName,
                            lastName: user?.lastName,
                            phone: user?.phone,
                            address: user?.address,
                            email: user?.email,
                            nationalInsurance: user.NIN,
                            bio: user?.bio,
                            emergencyContact: user?.emergency,
                        });
                        setValue('work', user?.workExperience);
                        setValue('availability', user?.available);
                        setValue('notifications', user?.notification);

                        setValue('bank', {
                            ...getValues().bank,
                            accountNumber: user?.accountNumber,
                            accountName: user?.accountName,
                            sortCode: user?.sortCode,
                        })

                        const active = user?.isActive;
                        if (active > 0) {
                            setIsActive(true);
                        }
                    }
                    else {
                        setSuccessMessage('Error updating user');
                        setBgColor('red');
                    }
                })
                .catch(error => {
                    console.log(error);
                    setSuccessMessage('Error fetching profile data')
                })
                .finally(() => {
                    setIsLoading(false);
                })
        };
        fetchCleanerData();
    }, [email]);

    useEffect(() => {
        setTimeout(() => setSuccessMessage(null), 5000);
    }, [successMessage])

    const [dataForUpdate, setDataForUpdate] = useState('');

    const [runCounter, setRunCounter] = useState(0);

    const SettingsPage = () => {
        const [bankMessage, setBankMessage] = useState('');
        const [loading, setLoading] = useState(false);

        const handlePreferredAreaChange = (area) => {
            const currentAreas = getValues().work.preferredAreas
            if (currentAreas.includes(area)) {
                for (let i = 0; i < currentAreas.length; i++) {
                    if (currentAreas[i] === area) {
                        currentAreas.splice(i, 1);
                        break;
                    }
                }
            }
            else {
                currentAreas.push(area);
            }
            setValue('work.preferredAreas', currentAreas);
        }

        const onSubmit = async (e) => {
            e.preventDefault();
            if (getValues().personal.email === null || getValues().personal.email === ''
                || getValues().personal.email === undefined) {
                setSuccessMessage('Error validating data')
                window.scroll({top: 0, behavior: 'smooth'});
                return
            }
            setIsLoading(true);
            let data = {};
            let field = '';
            setBgColor('red')
            switch (activeTab3) {
                case 'personal':
                    switch (dataForUpdate) {
                        case 'firstName':
                            field = getValues().personal.firstName;
                            data = {firstName: getValues().personal.firstName, email: getValues().personal.email};
                           break;
                        case 'lastName':
                            field = getValues().personal.lastName;
                            data = {lastName: getValues().personal.lastName, email: getValues().personal.email};
                            break;
                        case 'phone':
                            field = getValues().personal.phone;
                            data = {phone: getValues().personal.phone, email: getValues().personal.email};
                            break;
                        case 'password':
                            data = {password: getValues().personal?.newPassword, oldPassword: getValues.personal?.oldPassword, email: getValues().personal.email};
                            break;
                        case 'address':
                            field = getValues().personal.address;
                            data = {address: getValues().personal.address, email: getValues().personal.email};
                            break;
                        case  'bio':
                            field = getValues().personal.bio;
                            data = {bio: getValues().personal.bio, email: getValues().personal.email};
                            break;
                        case 'nin':
                            field = getValues().personal.NIN;
                            data = {NIN: getValues().personal.NIN, email: getValues().personal.email};
                            break;
                        case 'emergency contact':
                            data = {emergency: JSON.stringify(getValues().personal.emergencyContact), email: getValues().personal.email };
                            break;
                    }
                    break;

                case 'work':
                    data = {workExperience: JSON.stringify(getValues().work), email: getValues().personal.email};
                    break;

                case 'availability':
                    data = {available: JSON.stringify(getValues().availability), email: getValues().personal.email};
                    break;

                case 'notifications':
                    data = {notification: JSON.stringify(getValues().notifications), email: getValues().personal.email};
                    break;
            }
            if (activeTab3 === 'personal') {
                if ((data === null || data === undefined) && dataForUpdate !== 'password') {
                    setSuccessMessage("Please fill required field")
                    setIsLoading(false)
                    window.scroll({top: 0, behavior: 'smooth'});
                    return;
                }
                if ((field === null || field.length <= 0) && dataForUpdate !== 'password') {
                    setSuccessMessage("Please fill required field")
                    setIsLoading(false);
                    window.scroll({top: 0, behavior: 'smooth'});
                    return;
                }
                if (dataForUpdate === 'password') {
                    const hasCapitalLetter = (str) => /[A-Z]/.test(str);
                    const hasNumber = (str) => /\d/.test(str);
                    if (getValues().personal?.confirmPassword.length <= 0 || getValues().oldPassword?.length <= 0 || getValues().personal?.newPassword.length <= 0) {
                        setSuccessMessage("Please fill required field")
                        setIsLoading(false);
                        window.scroll({top: 0, behavior: 'smooth'});
                        return;
                    }
                    if (getValues().personal.newPassword.length <= 7) {
                        setSuccessMessage("Password must contain at least eight characters");
                        setIsLoading(false);
                        window.scroll({top: 0, behavior: 'smooth'});
                        return;
                    }
                    if (!hasCapitalLetter(getValues().personal.newPassword)) {
                        setSuccessMessage("Password must contain at least one capital letter");
                        setIsLoading(false);
                        window.scroll({top: 0, behavior: 'smooth'});
                        return;
                    }
                    if (!hasNumber(getValues().personal.newPassword)) {
                        setSuccessMessage("Password must contain at least one number");
                        setIsLoading(false);
                        window.scroll({top: 0, behavior: 'smooth'});
                        return;
                    }
                    if (getValues().personal.newPassword !== getValues().personal.confirmPassword) {
                        setSuccessMessage("Password and confirm password not a match");
                        setIsLoading(false);
                        window.scroll({top: 0, behavior: 'smooth'});
                        return;
                    }
                }
            }

            try {
                const response = await api.post('/api/users/update', data)
                const { success } = response.data;
                if (success) {
                    setSuccessMessage('Profile updated successfully');
                    setBgColor('green')
                }
                else {
                    setSuccessMessage('Something went wrong!');
                }
            } catch (error) {
                console.error(error.response.data);
                setSuccessMessage('Profile update failed');
            } finally {
                setIsLoading(false);
            }

        };

        useEffect(() => {
            setTimeout(() => setBankMessage(''), 5000);
        }, [bankMessage])

        const editBankDetails = async (e) => {
            e.preventDefault();
             if (!getValues().bank?.sortCode
                 || !getValues().bank?.accountNumber
                 || !getValues().bank?.accountName
                 || !getValues().personal?.password) {
                 setBankMessage('Fill all the required fields to proceed')
                 return;
             }
             setLoading(true);
             const data = {
                 email: getValues().personal?.email,
                 accountName: getValues().bank?.accountName ,
                 accountNumber: getValues().bank?.accountNumber,
                 sortCode: getValues().bank?.sortCode,
                 password: getValues().personal?.password
             }
             try {
                 const response = await api.post('/api/users/bank-details', data)
                 const {success, message} = response.data;
                 setBankMessage(message);
                 if (success) {

                 }
             } catch (error) {
                 console.log(error);
             }finally {
                 setLoading(false);
             }
        }

        const handleDataForUpdate = (data) => {
            setDataForUpdate(data);
            setSuccessMessage('')
        }

        const renderTabContent = () => {
            if (isLoading) return <div className="loading-spinner">Loading...</div>;

            switch (activeTab3) {
                case 'personal':
                    return (
                        <div className="tab-content">
                            <h2>Personal Information Update</h2>
                            <div className="form-group">
                                <label>First Name
                                    {dataForUpdate === '' ? <FaPen onClick={() => handleDataForUpdate('firstName')} style={{width:'20px'}} />
                                        : dataForUpdate === 'firstName' ?
                                            <FaTimes style={{width:'20px'}} onClick={() => handleDataForUpdate('')} /> : null }
                                </label>
                                {dataForUpdate === 'firstName' && <div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        {...register('personal.firstName')}
                                        className={'button-bg'}
                                     />
                                    {errors.personal?.firstName && <span className="error-message">{errors.personal.firstName.message}</span>}
                                </div>}
                            </div>

                            <div className="form-group">
                                <label>Last Name
                                    {dataForUpdate === '' ? <FaPen onClick={() => handleDataForUpdate('lastName')} style={{width:'20px'}} />
                                        : dataForUpdate === 'lastName' ?
                                            <FaTimes style={{width:'20px'}} onClick={() => handleDataForUpdate('')} /> : null }
                                </label>
                                {dataForUpdate === 'lastName' && <div>
                                    <input
                                        type="text"
                                        name="lastName"
                                        {...register('personal.lastName')}
                                        className={'button-bg'}
                                    />
                                    {errors.personal?.lastName && <span className="error-message">{errors.personal.lastName.message}</span>}
                                </div>}
                            </div>

                            <div className="form-group">
                                <label>Password
                                    {dataForUpdate === '' ? <FaPen onClick={() => handleDataForUpdate('password')} style={{width:'20px'}} />
                                        : dataForUpdate === 'password' ?
                                            <FaTimes style={{width:'20px'}} onClick={() => handleDataForUpdate('')} /> : null }
                                </label>
                                {dataForUpdate === 'password' && <div>
                                    <div className={'form-group'}>
                                        <input
                                            type="password"
                                            name={'newPassword'}
                                            {...register('personal.newPassword')}
                                            placeholder="New Password"
                                            className={'button-bg'}
                                        />
                                        {errors.personal?.password && <span className="error-message">{errors.personal.password.message}</span>}
                                    </div>
                                    <div className='form-group'>
                                        <input
                                            type="password"
                                            name={'confirmPassword'}
                                            {...register('personal.confirmPassword')}
                                            placeholder="Confirm New Password"
                                            className={'button-bg'}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <input
                                            type="password"
                                            {...register('personal.oldPassword')}
                                            placeholder="Old Password"
                                            className={'button-bg'}
                                        />
                                    </div>
                                </div>}

                            </div>

                            <div className="form-group">
                                <label>Phone Number
                                    {dataForUpdate === '' ? <FaPen onClick={() => handleDataForUpdate('phone')} style={{width:'20px'}} />
                                        : dataForUpdate === 'phone' ?
                                            <FaTimes style={{width:'20px'}} onClick={() => handleDataForUpdate('')} /> : null }
                                </label>
                                {dataForUpdate === 'phone' && <div>
                                    <input
                                        type="tel"
                                        name={'phone'}
                                        {...register("personal.phone", {
                                            pattern: {
                                                value: /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/,
                                                message: "Please enter a valid UK mobile number"
                                            }
                                        })}
                                        className={'button-bg'}
                                    />
                                    {errors.personal?.phone && <span className="error-message">{errors.personal.phone.message}</span>}
                                </div>}
                            </div>

                            <div className="form-group">
                                <label>National Insurance Number
                                    {dataForUpdate === '' ? <FaPen onClick={() => handleDataForUpdate('nin')} style={{width:'20px'}} />
                                        : dataForUpdate === 'nin' ?
                                            <FaTimes style={{width:'20px'}} onClick={() => handleDataForUpdate('')} /> : null }
                                </label>

                                {dataForUpdate === 'nin' && <div>
                                    <input
                                        type="text"
                                        {...register("personal.nationalInsurance", {
                                            pattern: {
                                                value: /^[A-Z]{2}[0-9]{6}[A-Z]$/,
                                                message: "Please enter a valid UK National Insurance number"
                                            }
                                        })}
                                        className={'button-bg'}
                                    />
                                    {errors.personal?.nationalInsurance && <span className="error-message">{errors.personal.nationalInsurance.message}</span>}
                                </div>}
                            </div>

                            <div className="form-group">
                                <label>Address
                                    {dataForUpdate === '' ? <FaPen onClick={() => handleDataForUpdate('address')} style={{width:'20px'}} />
                                        : dataForUpdate === 'address' ?
                                            <FaTimes style={{width:'20px'}} onClick={() => handleDataForUpdate('')} /> : null }
                                </label>
                                {dataForUpdate === 'address' && <div>
                                      <textarea
                                          {...register("personal.address")}
                                          className={'button-bg'}
                                      />
                                    {errors.personal?.address && <span className="error-message">{errors.personal.address.message}</span>}
                                </div>}

                            </div>

                            <div className="form-group">
                                <label>Bio
                                    {dataForUpdate === '' ? <FaPen onClick={() => handleDataForUpdate('bio')} style={{width:'20px'}} />
                                        : dataForUpdate === 'bio' ?
                                            <FaTimes style={{width:'20px'}} onClick={() => handleDataForUpdate('')} /> : null }
                                </label>
                                {dataForUpdate === 'bio' && <div>
                                      <textarea
                                          {...register("personal.bio")}
                                          className={'button-bg'}
                                      />
                                    {errors.personal?.bio && <span className="error-message">{errors.personal.bio.message}</span>}
                                </div>}

                            </div>

                            <h3>Emergency Contact
                                {dataForUpdate === '' ? <FaPen onClick={() => handleDataForUpdate('emergency contact')} style={{width:'20px'}} />
                                    : dataForUpdate === 'emergency contact' ?
                                        <FaTimes style={{width:'20px'}} onClick={() => handleDataForUpdate('')} /> : null }
                            </h3>
                            {dataForUpdate === 'emergency contact' && <div>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        {...register("personal.emergencyContact.name")}
                                        className={'button-bg'}
                                    />
                                    {errors.personal?.emergencyContact?.category && <span className="error-message">{errors.personal.emergencyContact.category.message}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Relationship</label>
                                    <input
                                        type="text"
                                        {...register("personal.emergencyContact.relationship")}
                                        className={'button-bg'}
                                    />
                                    {errors.personal?.emergencyContact?.relationship && <span className="error-message">{errors.personal.emergencyContact.relationship.message}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        {...register("personal.emergencyContact.phone", {
                                            pattern: {
                                                value: /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/,
                                                message: "Please enter a valid UK mobile number"
                                            }
                                        })}
                                        className={'button-bg'}
                                    />
                                    {errors.personal?.emergencyContact?.phone && <span className="error-message">{errors.personal.emergencyContact.phone.message}</span>}
                                </div>
                            </div>}
                        </div>
                    );

                case 'work':
                    return (
                        <div className="tab-content">
                            <h2>Work Preferences</h2>

                            <div className="form-group">
                                <label>Experience
                                    {dataForUpdate === '' ? <FaPen onClick={() => handleDataForUpdate('Cleaning Experience')} style={{width:'20px'}} />
                                        : dataForUpdate === 'Cleaning Experience' ?
                                            <FaTimes style={{width:'20px'}} onClick={() => handleDataForUpdate('')} /> : null }
                                </label>
                                {dataForUpdate === 'Cleaning Experience' &&
                                    <select {...register("work.cleaningExperience")}>
                                        {experience.map(exp => (
                                            <option key={exp.id}>{exp.exp}</option>
                                        ))}
                                    </select>
                                }
                            </div>

                            <div className={'grid-container'}>
                                <div className="form-group">
                                    <label>Preferred Cleaning Areas
                                        {dataForUpdate === '' ? <FaPen onClick={() => handleDataForUpdate('Preferred Cleaning Areas')} style={{width:'20px'}} />
                                            : dataForUpdate === 'Preferred Cleaning Areas' ?
                                                <FaTimes style={{width:'20px'}} onClick={() => handleDataForUpdate('')} /> : null }
                                    </label>
                                    {dataForUpdate === 'Preferred Cleaning Areas' && <div className="checkbox-group">
                                        {preferredAreas.map(area => (
                                            <div key={area} className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    value={area}
                                                    {...register("work.preferredAreas")}
                                                />
                                                <label style={{marginTop:'5px'}}>{area}</label>
                                            </div>
                                        ))}
                                    </div>}

                                </div>

                                <div className="form-group">
                                    <label>
                                        Services You Provide
                                        {dataForUpdate === '' ? <FaPen onClick={() => handleDataForUpdate('Services You Provide')} style={{width:'20px'}} />
                                            : dataForUpdate === 'Services You Provide' ?
                                                <FaTimes style={{width:'20px'}} onClick={() => handleDataForUpdate('')} /> : null }
                                    </label>
                                    {dataForUpdate === 'Services You Provide' && <div className="checkbox-group">
                                        {services.map(service => (
                                            <div key={service} className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    value={service}
                                                    {...register("work.services")}
                                                />
                                                <label style={{marginTop:'5px'}}>{service}</label>
                                            </div>
                                        ))}
                                    </div> }
                                </div>
                            </div>

                            <div className={'form-group'}>
                                <label>specialities
                                    {dataForUpdate === '' ? <FaPen onClick={() => handleDataForUpdate('Specialties')} style={{width:'20px'}} />
                                        : dataForUpdate === 'Specialties' ?
                                            <FaTimes style={{width:'20px'}} onClick={() => handleDataForUpdate('')} /> : null }
                                </label>
                                {dataForUpdate === 'Specialties' && <div className="checkbox-group">
                                    {specialities.map(speciality => (
                                        <div key={speciality} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                value={speciality}
                                                {...register("work.specialities")}
                                            />
                                            <label style={{marginTop:'5px'}}>{speciality}</label>
                                        </div>
                                    ))}
                                </div> }
                            </div>

                            <div className={'grid-container'}>
                                <div className="form-group">
                                    <label>Hourly Rate (£)
                                        {dataForUpdate === '' ? <FaPen onClick={() => handleDataForUpdate('Hourly Rate')} style={{width:'20px'}} />
                                            : dataForUpdate === 'Hourly Rate' ?
                                                <FaTimes style={{width:'20px'}} onClick={() => handleDataForUpdate('')} /> : null }
                                    </label>
                                    {dataForUpdate === 'Hourly Rate' &&
                                        <div className={'checkbox-group'}>
                                            <input
                                                type="number"
                                                step="0.50"
                                                min="10"
                                                max="30"
                                                {...register("work.hourlyRate", {
                                                    required: "Hourly rate is required",
                                                    min: {
                                                        value: 10,
                                                        message: "Minimum rate is £10"
                                                    },
                                                    max: {
                                                        value: 30,
                                                        message: "Maximum rate is £30"
                                                    }
                                                })}
                                                className={errors.work?.hourlyRate ? 'error' : ''}
                                            />
                                            {errors.work?.hourlyRate && <span className="error-message">{errors.work.hourlyRate.message}</span>}
                                        </div>}
                                </div>

                                <div className="form-group">
                                    <label>Maximum Travel Radius (miles)
                                        {dataForUpdate === '' ? <FaPen onClick={() => handleDataForUpdate('Maximum Travel Radius')} style={{width:'20px'}} />
                                            : dataForUpdate === 'Maximum Travel Radius' ?
                                                <FaTimes style={{width:'20px'}} onClick={() => handleDataForUpdate('')} /> : null }
                                    </label>
                                    {dataForUpdate === 'Maximum Travel Radius' &&
                                        <div>
                                            <input
                                                type="number"
                                                 min="1"
                                                 max="30"
                                                 {...register("work.travelRadius", {
                                                     required: "Travel radius is required",
                                                     min: {
                                                         value: 1,
                                                          message: "Minimum radius is 1 mile"
                                                     },
                                                     max: {
                                                          value: 30,
                                                          message: "Maximum radius is 30 miles"
                                                     }
                                                 })}
                                            className={errors.work?.travelRadius ? 'error' : ''}
                                        />
                                        {errors.work?.travelRadius && <span className="error-message">{errors.work.travelRadius.message}</span>}
                                    </div>}

                                </div>
                            </div>

                            <div className="form-group">
                                <label>Equipment
                                    {dataForUpdate === '' ? <FaPen onClick={() => handleDataForUpdate('Equipment')} style={{width:'20px'}} />
                                        : dataForUpdate === 'Equipment' ?
                                            <FaTimes style={{width:'20px'}} onClick={() => handleDataForUpdate('')} /> : null }
                                </label>
                                {dataForUpdate === 'Equipment' &&  <div className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        {...register("work.equipmentProvided")}
                                    />
                                    <label style={{marginTop:'5px'}}>I can provide my own cleaning equipment and supplies</label>
                                </div>}

                            </div>
                        </div>
                    );

                case 'availability':
                    return (
                        <div className="tab-content">
                            <h2>Availability
                                {dataForUpdate === '' ? <FaPen onClick={() => handleDataForUpdate('Availability')} style={{width:'20px'}} />
                                    : dataForUpdate === 'Availability' ?
                                        <FaTimes style={{width:'20px'}} onClick={() => handleDataForUpdate('')} /> : null }
                            </h2>
                            {dataForUpdate === 'Availability' && <div>
                                <p>Select the time slots when you're typically available for cleaning jobs.</p>
                                <div className="availability-grid">
                                    {days.map(day => (
                                        <div key={day} className="availability-day">
                                            <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
                                            <div className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    {...register(`availability.${day}.morning`)}
                                                />
                                                <label style={{marginTop:'5px'}}> Morning (8am-12pm)</label>
                                            </div>
                                            <div className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    {...register(`availability.${day}.afternoon`)}
                                                />
                                                <label style={{marginTop:'5px'}}>Afternoon (12pm-5pm)</label>
                                            </div>
                                            <div className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    {...register(`availability.${day}.evening`)}
                                                />
                                                <label style={{marginTop:'5px'}}>Evening (5pm-9pm)</label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>}
                        </div>
                    );

                case 'notifications':
                    return (
                        <div className="tab-content">
                            <h2>Notification Preferences
                                {dataForUpdate === '' ? <FaPen onClick={() => handleDataForUpdate('Notification Preferences')} style={{width:'20px'}} />
                                : dataForUpdate === 'Notification Preferences' ?
                                <FaTimes style={{width:'20px'}} onClick={() => handleDataForUpdate('')} /> : null }
                            </h2>
                            {dataForUpdate === 'Notification Preferences' && <div>
                                <div className="form-group">
                                    <div className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            {...register("notifications.emailNotifications")}
                                        />
                                        <label style={{marginTop:'5px'}}>Email Notifications</label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            {...register("notifications.smsNotifications")}
                                        />
                                        <label style={{marginTop:'5px'}}>SMS Notifications</label>

                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            {...register("notifications.jobAlerts")}
                                        />
                                        <label style={{marginTop:'5px'}}>New Job Alerts</label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            {...register("notifications.reminderAlerts")}
                                        />
                                        <label style={{marginTop:'5px'}}>Booking Reminders</label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            {...register("notifications.ratingNotifications")}
                                        />
                                        <label style={{marginTop:'5px'}}>Customer Rating Notifications</label>
                                    </div>
                                </div>
                            </div>}

                        </div>
                    );

                case 'Add or change bank details':
                    return (
                        <div className="tab-content">
                            <h3>Bank details
                                {dataForUpdate === '' ? <FaPen onClick={() => handleDataForUpdate('Add or change bank details')} style={{width:'20px', marginLeft:'2px'}} />
                                    : dataForUpdate === 'Add or change bank details' ?
                                        <FaTimes style={{width:'20px', marginLeft:'2px'}} onClick={() => handleDataForUpdate('')} /> : null }
                            </h3>
                            {dataForUpdate === 'Add or change bank details' &&  <div className='form-group'>
                                <div className={'form-group'}>
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        {...register('personal.password', {
                                            required: "Please enter your password",
                                        })}
                                        className={'button-bg'}
                                    />
                                    {errors.personal?.password && <span className="error-message">{errors?.personal?.password?.message}</span>}
                                </div>

                                <div style={{marginTop:'10px'}} className='form-group'>
                                    <label>Account holder name</label>
                                    <input
                                        type="text"
                                        {...register('bank.accountName', {
                                            required: "Account holder name is required",
                                        })}
                                        className={'button-bg'}
                                    />
                                    {errors.bank?.accountName && <span className="error-message">{errors?.bank?.accountName?.message}</span>}
                                </div>

                                <div style={{marginTop:'10px'}} className='form-group'>
                                    <label>Account number</label>
                                    <input
                                        type="number"
                                        {...register('bank.accountNumber', {
                                            required: "Account number is required",
                                            minLength: {
                                                value: 8,
                                                message: "Must be exactly 8 digits"
                                            },
                                            maxLength: {
                                                value: 8,
                                                message: "Must be exactly 8 digits"
                                            }
                                        })}
                                        className={'button-bg'}
                                    />
                                    {errors?.bank?.accountNumber && <span className="error-message">{errors?.bank?.accountNumber?.message}</span>}
                                </div>

                                <div style={{marginTop:'10px'}} className='form-group'>
                                    <label>Sort code</label>
                                    <input
                                        type="number"
                                        {...register('bank.sortCode', {
                                            required: "Sort code is required",
                                            minLength: {
                                                value: 6,
                                                message: "Must be a minimum of 6 digits"
                                            },
                                            maxLength: {
                                                value: 8,
                                                message: "Must be a maximum of  8 digits"
                                            }
                                        })}
                                        className={'button-bg'}
                                    />
                                    {errors?.bank?.sortCode && <span className="error-message">{errors?.bank?.sortCode?.message}</span>}
                                </div>

                                {loading && <p style={{margin:"10px"}}>Loading...</p>}

                                {bankMessage && <p style={{margin:'10px'}}>{bankMessage}</p>}

                            </div> }

                        </div>
                    )
                default:
                    return null;
            }
        };

        return (
            <div className="settings-container">
                {successMessage &&
                    <div className="success-message"
                         style={{background: bgColor}}>
                       {successMessage}
                    </div>
                }

                <div className="support-nav">
                    <button
                        className={activeTab3 === 'personal' ? 'active' : ''}
                        onClick={() => setActiveTab3('personal')}
                    >
                        Update Info
                    </button>

                    <button
                        className={activeTab3 === 'work' ? 'active' : ''}
                        onClick={() => setActiveTab3('work')}
                    >
                        Work Preferences
                    </button>

                    <button
                        className={activeTab3 === 'availability' ? 'active' : ''}
                        onClick={() => setActiveTab3('availability')}
                    >
                        Availability
                    </button>

                    <button
                        className={activeTab3 === 'notifications' ? 'active' : ''}
                        onClick={() => setActiveTab3('notifications')}
                    >
                        Notifications
                    </button>

                    <button
                        className={activeTab3 === 'Add or change bank details' ? 'active' : ''}
                        onClick={() => setActiveTab3('Add or change bank details')}
                    >
                        Add or change bank details
                    </button>

                </div>

                <form onSubmit={activeTab3 === 'Add or change bank details' ? editBankDetails : onSubmit}>
                    {renderTabContent()}
                    <div className="form-actions">
                        <button
                            type="submit"
                            className={(isLoading || dataForUpdate.length <= 0) ? 'back-button' : 'next-button'}
                            disabled={(isLoading || dataForUpdate.length <= 0)}>
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    const Docs = () => {
        const [activeTab, setActiveTab] = useState('Guildelines');

        const Guidelines = () => {
            return (
                <div className="documentation-page">

                    <h1>Employee Guidelines</h1>

                    <section>
                        <h2>1. Work Standards</h2>
                        <ul className={'dot-list'}>
                            <li>Arrive on time in uniform.</li>
                            <li>Follow the cleaning checklist for each site.</li>
                            <li>Report any issues to your supervisor.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>2. Client Interaction</h2>
                        <ul className={'dot-list'}>
                            <li>Be polite and professional.</li>
                            <li>Do not accept tips unless company policy allows.</li>
                            <li>Report client complaints immediately.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. UK Employment Rights</h2>
                        <p>
                            Under UK law, you are entitled to:
                        </p>
                        <ul className={'dot-list'}>
                            <li>National Minimum Wage (£10.42/hr for ages 23+)</li>
                            <li>5.6 weeks paid holiday per year</li>
                            <li>Rest breaks (20 mins for 6+ hours worked)</li>
                        </ul>
                    </section>
                </div>
            );
        };

        const Safety = () => {
            return (
                <div className="documentation-page">
                    <h1>Health & Safety</h1>

                    <section>
                        <h2>COSHH Regulations</h2>
                        <p>
                            Always follow Control of Substances Hazardous to Health (COSHH) guidelines:
                        </p>
                        <ul className={'dot-list'}>
                            <li>Use gloves and masks when handling chemicals.</li>
                            <li>Store cleaning products securely.</li>
                            <li>Never mix bleach and ammonia.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>PPE Requirements</h2>
                        <ul className={'dot-list'}>
                            <li><strong>Gloves:</strong> Provided for chemical handling.</li>
                            <li><strong>Masks:</strong> Required for dust-heavy environments.</li>
                            <li><strong>Safety Shoes:</strong> Mandatory for industrial sites.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Emergency Procedures</h2>
                        <p><strong>Chemical Spill:</strong> Evacuate and call 999 if hazardous.</p>
                        <p><strong>Injury:</strong> Report to supervisor and log in accident book.</p>
                    </section>
                </div>
            );
        };

        const Compensations = () => {

            return (
                <div className="documentation-page">
                    <h3 style={{margin:'15px', textDecoration:'underline'}}>Payment rates</h3>
                    <h3 style={{margin:'15px', textDecoration:'underline'}}>Compensations</h3>
                    <h3 style={{margin:'15px', textDecoration:'underline'}}>One-off-fees</h3>
                    <h3 style={{margin:'15px', textDecoration:'underline'}}>Penalty fees</h3>
                </div>
            )
        }

        const Videos = () => {

            return(
                <div className="documentation-page">
                    <label style={{margin:'15px'}}>No videos available</label>
                </div>
            )
        }

        return (
            <div className="documentation-page">
                <Helmet>
                    <title>Employee Guidelines And Safety</title>
                </Helmet>
                <nav className={'support-nav'}>
                    <button
                        className={activeTab === 'Guildelines' ? 'active' : ''}
                        onClick={() => setActiveTab('Guildelines')}>
                        Guildelines
                    </button>

                    <button
                        className={activeTab === 'Safety' ? 'active' : ''}
                        onClick={() => setActiveTab('Safety')}>
                        Safety
                    </button>

                    <button
                        className={activeTab === 'Fees and compensations' ? 'active' : ''}
                        onClick={() => setActiveTab('Fees and compensations')}>
                        Fees and compensations
                    </button>

                    <button
                        className={activeTab === 'Videos' ? 'active' : ''}
                        onClick={() => setActiveTab('Videos')}>
                        Videos
                    </button>

                    <button
                        className={activeTab === 'Service agreements' ? 'active' : ''}
                        onClick={() => setActiveTab('Service agreements')}>
                        Service agreements
                    </button>

                </nav>

                {activeTab ===  'Guildelines' && <Guidelines />}
                {activeTab === 'Safety' && <Safety />}
                {activeTab === 'Fees and compensations' && <Compensations />}
                {activeTab === 'Videos' && <Videos />}
            </div>
        )

    }

    return (
        <div className="sticky-nav-container">
            <nav  className='top-order-nav'>
                <div style={{display:'flex', flexDirection: 'column'}}>
                    <div style={{display:'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <img src={LOGO} style={{maxWidth:'12%'}}  className={'logo-icon2'}/>
                        <h1 style={{width:'20%', textAlign:'start'}} className={'page-title'}>My App</h1>
                        <button
                            style={{color:'blue', background:'none', width:'20px'}}
                            onClick={() => navigate('/help')}>
                            FAQs
                        </button>
                        <div style={{width:'10%', marginRight:'10px', display:'flex', justifyContent:'flex-start', color:'red', alignItems:'center'}}>
                            <FaCommentDots
                                size={25}
                                style={{color:'black'}}
                                onClick={() => navigate('/messages', {state: {receiver: companyEmail, receiverName: companyName, sender: email, senderName: name}})}
                            />
                            {messageCount > 0 && <p style={{ textAlign:'left'}}>{messageCount}</p>}
                        </div>
                    </div>
                    <div className="nav-order-content">
                        {topNavItems.map((item, index) => (
                            <div key={`top-${index}`} className="nav-order-item"
                                 onClick={() => {
                                     switch (item) {
                                         case 'New':
                                             setNewOrders([]);
                                             setPageCount(0);
                                             break;
                                         case  'Jobs':
                                             setMyOrders([]);
                                             setMyPageCount(0);
                                             break;
                                         case 'History':
                                             setJobHistory([]);
                                             setHistoryPageCount(0);
                                     }
                                     setOrderEnded(false);
                                     setActiveMenu(item);
                                 }}>
                                <h3 style={activeMenu === item ? {color:'goldenrod', textDecoration:'underline'}: {color:'', textDecoration:'none'} } >{item}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </nav>

            <main className={["main-content", "main-banner"].join(" ")}>
                {activeMenu === topNavItems[0] && <NewOrders active={isActive} /> }
                {activeMenu === topNavItems[1] && <MyOrders /> }
                {activeMenu === topNavItems[2] && <History /> }
                {activeMenu === bottomNavItems[3].category && <SupportPage /> }
                {(activeMenu === bottomNavItems[4].category && email) && <ProfilePage emailFromProile={email} /> }
                {activeMenu === bottomNavItems[1].category && <Finance /> }
                {activeMenu === bottomNavItems[2].category && <Docs /> }
                {activeMenu === bottomNavItems[0].category && <SettingsPage /> }

            </main>

            <nav  className='bottom-order-nav'>
                <div className="nav-order-content">
                    {bottomNavItems.map((item, index) => (
                        <div key={`bottom-${item.id}`} className="nav-order-item"
                             onClick={() => {
                                 setOrderEnded(false);
                                 setActiveMenu(item.category);
                             }}>
                            <div style={activeMenu === item.category ? {color:'blue', textDecoration:'underline'}: {color:'', textDecoration:'none'}}>
                                {renderMenuIcon(item.id)}
                                <h3 style={activeMenu === item.category ? {color:'blue', textDecoration:'underline'}: {color:'', textDecoration:'none'}}>{item.category}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default CleanerProfile;