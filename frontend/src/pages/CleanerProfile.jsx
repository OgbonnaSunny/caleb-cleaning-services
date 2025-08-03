import React, { useState, useEffect, useRef} from 'react';
import { FaStar, FaRegStar, FaCheck, FaClock, FaMapMarkerAlt,
    FaBroom, FaShieldAlt, FaUserTie, FaCertificate,
    FaPoundSign, FaLifeRing, FaQuestionCircle,
    FaFilePdf, FaFile, FaFileAlt, FaHome, FaTimes, FaBars, FaPen} from 'react-icons/fa';
import api from './api.js';
import { useNavigate } from 'react-router-dom'
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { isToday, differenceInDays } from 'date-fns';
import { Link } from 'react-router-dom';
import LOGO from "../images/logo3.png";
import { Helmet } from 'react-helmet';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import { useForm } from 'react-hook-form';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const CleanerProfile = () => {
    const navigate = useNavigate();

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
        {id: 1, name: 'Setting'},
        {id: 2, name: 'Finance'},
        {id: 3, name: 'Docs'},
        {id: 4, name: 'Support'},
        {id: 5, name: 'Profile'},
    ];

    const cleanerData = {
        personal: {
            firstName: 'Sarah',
            lastName: 'Jones',
            phone: '+44 770 1234 567',
            password: '',
            newPassword: '',
            confirmPassword: '',
            oldPassword: '',
            nationalInsurance: '',
            address: 'Buckingham Palace',
            bio: 'A good cleaner',
            email:'sarah@gmail.com',
            emergencyContact: {
                name: 'Martha Caleb',
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
                name: 'Michael Brown',
                rating: 5,
                review: 'Sarah did an excellent job cleaning my flat. She was punctual, professional, and paid attention to all the details I requested. The place has never looked better!',
                time: '2 weeks ago'
            },
            {id: 2,
                name: 'Emma Wilson',
                rating: 4,
                review: 'Very thorough cleaning service. Sarah was friendly and efficient. Only reason for 4 stars instead of 5 is that she arrived 15 minutes late, but she made up for it by staying later to finish everything.',
                time: '1 month ago'
            },
            {id: 2,
                name: 'John Smith',
                rating: 5,
                review: 'Very thorough cleaning service. Sarah was Professional, detailed and friendly. Only reason for 4 stars instead of 5 is that she arrived 15 minutes late, but she made up for it by staying later to finish everything.',
                time: '2 months ago'
            },
            {id: 2,
                name: 'Dialo Becko',
                rating: 4,
                review: 'Smart and nice cleaning service. Sarah was Professional, detailed and friendly. Only reason for 4 stars instead of 5 is that she arrived 15 minutes late, but she made up for it by staying later to finish everything.',
                time: '4 months ago'
            },
        ]
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
    const [email, setEmail] = useState('sarah@gmail.com');
    const [cleanerName, setCleanerName] = useState("Sarah Jones");
    const [phoneNumber, setPhoneNumber] = useState('+4477012376');
    const [myOrders, setMyOrders] = useState([myOrderData]);
    const [activeMenu, setActiveMenu] = useState(topNavItems[0]);
    const [newOrders, setNewOrders] = useState([bookData]);
    const [myOderCount, setMyOderCount] = useState(0);
    const [cleaner, setCleaner] = useState({
        name: cleanerName,
        profileImage: "https://randomuser.me/api/portraits/women/45.jpg",
        rating: 4.8,
        reviewCount: 127,
        yearsExperience: 'Less than 1 year',
        location: "London, UK",
        services: ["House Cleaning", "Office Cleaning", "Deep Cleaning", "Carpet Cleaning"],
        bio: "Professional cleaner with 5 years of experience providing top-quality cleaning services across London. I take pride in my attention to detail and commitment to customer satisfaction.",
        certifications: ["BICSc Certified", "COVID-19 Safety Certified"],
        availability: ["Monday-Friday: 8am-6pm", "Saturday: 9am-2pm"],
        languages: ["English"],
        hourlyRate: "£15-£25 (depending on service)",
        company: "Fly Cleaners Ltd",
        specialities: ["Eco-friendly cleaning", "Pet-friendly products", "Stain removal"],
        recentlyViewed: ["Bleach", "Microfiber cloths", "Vacuum cleaner"]
    });
    const [history, setHistory] = useState([historyData]);
    const [idForUpdate, setIdForUpdate] = useState(-1);
    const { register, setValue, getValues, handleSubmit, formState, watch, reset, formState: { errors }, trigger }
        = useForm({defaultValues: cleanerData, mode: 'onChange'});
    const [successMessage, setSuccessMessage] = useState('');
    const [bgColor, setBgColor] = useState('red');
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [activeTab2, setActiveTab2] = useState('about');
    const [reviews, setReviews] = useState([])
    const [activeTab3, setActiveTab3] = useState('personal');


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

    const formatDate = (date) => {
        if (date = null || date === undefined) return;
        const dateTime = new Date(date);
        const options = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23',
        }
        if (date.toString().length > 0) {
            return Intl.DateTimeFormat('en-US', options).format(dateTime).toString();
        }
        return date;
    }

    const formatTime = (time) => {
        if (time === null || time === undefined || time.toString().length <= 0) {return }
        const times = time.split(':');
        if (times.length > 1) {
            return `${times[0]} ${times[1]}`;
        }
        return time;
    }

    const acceptOrder = async (orderId) => {
        if (acceptingOrders) {
            return
        }
        setAcceptingOrders(true);
        const cleanerData =  { cleanerName: cleanerName, cleanerEmail: email, cleanerPhone: phoneNumber, id: orderId };
        try {
            const acceptResponse = await api.post('/api/booking/accept-order', cleanerData)

            const newOrderResponse = await api.get('api/booking/new');
            const orders = await newOrderResponse.data;
            setNewOrders(orders.booking);
        }
        catch (error) {
            setMessage('Something went wrong!');
            console.log(error);
        }
        finally {
            setAcceptingOrders(false);
        }
    }

    useEffect(() => {
        /*const fetchOrders = async () => {
            setIsLoading(true)
            try {
                const newOrderResponse = await api.get('api/booking/new');
                const orders = await newOrderResponse.data;
                setNewOrders(orders.booking);
                if (orders.booking.length <= 0) {
                    setMessage('No new orders yet.');
                }
            } catch (error) {
                console.log(error);
                setNewOrders([])
                setMessage('Error fetching new orders.')
            }
            finally {
                setIsLoading(false)
            }
        }
        if (activeMenu === topNavItems[0]) {
            fetchOrders();
        }*/
    }, [activeMenu])

    const NewOrders = () => {

        return (
            <div className={'support-page'}>
                {isLoading ?
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

    const ProfilePage = () => {
        const [isFavorite, setIsFavorite] = useState(false);

        const renderStars = (rating) => {
            const stars = [];
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;

            for (let i = 1; i <= 5; i++) {
                if (i <= fullStars) {
                    stars.push(<FaStar style={{width:'15px'}} key={i} className="star filled" />);
                } else if (i === fullStars + 1 && hasHalfStar) {
                    stars.push(<FaStar style={{width:'15px'}} key={i} className="star half-filled" />);
                } else {
                    stars.push(<FaRegStar style={{width:'15px'}} key={i} className="star" />);
                }
            }
            return stars;
        };


        return (
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-image-container">
                        <img src={cleaner.profileImage}  className="profile-image" />
                    </div>

                    <div className="profile-info">
                        <h3 className={'profile-name'}>{getValues().personal.firstName} {getValues().personal.lastName}</h3>
                        <p className="review-count">
                            <span className="rating-value">{cleaner.rating} </span> ({cleaner.reviewCount})
                            reviews
                        </p>

                        <div className="meta-info">
                            <p className="meta-item"><FaUserTie style={{width:'20px'}} /> {getValues().work.cleaningExperience} experience</p>
                            <p className="meta-item"><FaMapMarkerAlt style={{width:'20px'}} />  <span style={{textAlign:'start'}}>{getValues().personal.address}</span></p>
                            <p className="meta-item"> <FaBroom style={{width:'20px'}} /> <span style={{textAlign:'start'}}>Flymax Ltd</span></p>
                        </div>

                    </div>
                </div>

                <div className="profile-tabs">
                    <button
                        className={`tab-btn ${activeTab2 === 'about' ? 'active' : ''}`}
                        onClick={() => setActiveTab2('about')}>
                        About
                    </button>
                    <button
                        className={`tab-btn ${activeTab2 === 'services' ? 'active' : ''}`}
                        onClick={() => setActiveTab2('services')}>
                        Services
                    </button>
                    <button
                        className={`tab-btn ${activeTab2 === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveTab2('reviews')}>
                        Reviews
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab2 === 'about' && (
                        <div className="about-section">
                            <h2>About {getValues().personal.firstName} {getValues().personal.lastName}</h2>
                            <p>{getValues().personal.bio}</p>
                            <div className="details-section">
                                <h3><FaClock style={{width:'40px'}} /> Availability</h3>
                                <div className="availability-grid">
                                    {(getValues().availability.monday.morning ||
                                        getValues().availability.monday.afternoon ||
                                            getValues().availability.monday.evening) &&
                                        <div className="availability-day">
                                            <h3>Monday</h3>
                                            {getValues().availability.monday.morning && <label style={{marginTop:'5px'}}>Morning (8am-12pm)</label>}
                                            {getValues().availability.monday.afternoon && <label style={{marginTop:'5px'}}>Afternoon (12pm-5pm)</label>}
                                            {getValues().availability.monday.evening && <label style={{marginTop:'5px'}}>Evening (5pm-9pm)</label>}
                                        </div>
                                    }
                                    {(getValues().availability.tuesday.morning ||
                                        getValues().availability.tuesday.afternoon ||
                                        getValues().availability.tuesday.evening) &&
                                        <div className="availability-day">
                                            <h3>Tuesday</h3>
                                            {getValues().availability.tuesday.morning && <label style={{marginTop:'5px'}}>Morning (8am-12pm)</label>}
                                            {getValues().availability.tuesday.afternoon && <label style={{marginTop:'5px'}}>Afternoon (12pm-5pm)</label>}
                                            {getValues().availability.tuesday.evening && <label style={{marginTop:'5px'}}>Evening (5pm-9pm)</label>}
                                        </div>
                                    }
                                    {(getValues().availability.wednesday.morning ||
                                        getValues().availability.wednesday.afternoon ||
                                        getValues().availability.wednesday.evening) &&
                                        <div className="availability-day">
                                            <h3>Wednesday</h3>
                                            {getValues().availability.wednesday.morning && <label style={{marginTop:'5px'}}>Morning (8am-12pm)</label>}
                                            {getValues().availability.wednesday.afternoon && <label style={{marginTop:'5px'}}>Afternoon (12pm-5pm)</label>}
                                            {getValues().availability.wednesday.evening && <label style={{marginTop:'5px'}}>Evening (5pm-9pm)</label>}
                                        </div>
                                    }
                                    {(getValues().availability.thursday.morning ||
                                            getValues().availability.thursday.afternoon ||
                                            getValues().availability.thursday.evening) &&
                                        <div className="availability-day">
                                            <h3>Thursday</h3>
                                            {getValues().availability.thursday.morning && <label style={{marginTop:'5px'}}>Morning (8am-12pm)</label>}
                                            {getValues().availability.thursday.afternoon && <label style={{marginTop:'5px'}}>Afternoon (12pm-5pm)</label>}
                                            {getValues().availability.thursday.evening && <label style={{marginTop:'5px'}}>Evening (5pm-9pm)</label>}
                                        </div>
                                    }
                                    {(getValues().availability.friday.morning ||
                                        getValues().availability.friday.afternoon ||
                                        getValues().availability.friday.evening) &&
                                        <div className="availability-day">
                                            <h3>Friday</h3>
                                            {getValues().availability.friday.morning && <label style={{marginTop:'5px'}}>Morning (8am-12pm)</label>}
                                            {getValues().availability.friday.afternoon && <label style={{marginTop:'5px'}}>Afternoon (12pm-5pm)</label>}
                                            {getValues().availability.friday.evening && <label style={{marginTop:'5px'}}>Evening (5pm-9pm)</label>}
                                        </div>
                                    }
                                    {(getValues().availability.saturday.morning ||
                                        getValues().availability.saturday.afternoon ||
                                        getValues().availability.saturday.evening) &&
                                        <div className="availability-day">
                                            <h3>Saturday</h3>
                                            {getValues().availability.saturday.morning && <label style={{marginTop:'5px'}}>Morning (8am-12pm)</label>}
                                            {getValues().availability.saturday.afternoon && <label style={{marginTop:'5px'}}>Afternoon (12pm-5pm)</label>}
                                            {getValues().availability.saturday.evening && <label style={{marginTop:'5px'}}>Evening (5pm-9pm)</label>}
                                        </div>
                                    }
                                    {(getValues().availability.sunday.morning ||
                                        getValues().availability.sunday.afternoon ||
                                        getValues().availability.sunday.evening) &&
                                        <div className="availability-day">
                                            <h3>Sunday</h3>
                                            {getValues().availability.sunday.morning && <label style={{marginTop:'5px'}}>Morning (8am-12pm)</label>}
                                            {getValues().availability.sunday.afternoon && <label style={{marginTop:'5px'}}>Afternoon (12pm-5pm)</label>}
                                            {getValues().availability.sunday.evening && <label style={{marginTop:'5px'}}>Evening (5pm-9pm)</label>}
                                        </div>
                                    }

                                </div>

                                <h3>Languages Spoken</h3>
                                <div className="grid-container">
                                    {cleaner.languages.map((lang, index) => (
                                        <span key={index} className="language-badge">{lang}</span>
                                    ))}
                                </div>

                                <h3 style={{textAlign:'center'}}>Specialities</h3>
                                <div className="grid-container">
                                    {getValues().work.specialities.map((spec, index) => (
                                        <span style={{width:'100%'}} key={index} className="speciality-badge">
                                            <FaCheck style={{width:'40px'}} className="check-icon" />
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab2 === 'services' && (
                        <div className="services-section">
                            <h2>Services Offered</h2>
                            <div className="services-grid">
                                {getValues().work.services.map((service, index) => (
                                    <div key={index} className="stats-card">
                                        <h3 style={{textAlign:'center'}}>{service}</h3>
                                    </div>
                                ))}
                            </div>

                            <div className="pricing-section">
                                <h2>Pricing Information</h2>
                                <p><strong>Standard Rate:</strong>Company rate</p>
                                <p><strong>Discounts:</strong>Company authorized</p>
                                <p><strong>Travel Fee:</strong>According to company's policy</p>
                            </div>

                            <div className="materials-section">
                                <h2>Preferred Cleaning Materials</h2>
                                <p>Company primarily uses eco-friendly, non-toxic cleaning products that are safe for children and pets.</p>
                            </div>
                        </div>
                    )}

                    {activeTab2 === 'reviews' && (
                        <div>
                            {getValues().review.length > 0 &&
                                <div className="reviews-section">
                                    <h2>Customer Reviews</h2>
                                    <div className="review-summary">
                                        <div className="overall-rating">
                                        <p className="stars">{renderStars(cleaner.rating)}</p>
                                        <p className="big-rating">{cleaner.rating}</p>
                                        <p style={{textAlign:'end'}} className="review-count">{cleaner.reviewCount} reviews</p>
                                    </div>

                                        <div className="rating-breakdown">
                                            <div className="rating-bar">
                                                <span>5 stars</span>
                                                <div className="bar-container">
                                                    <div className="bar" style={{ width: '85%' }}></div>
                                                </div>
                                                <span>85%</span>
                                            </div>
                                            <div className="rating-bar">
                                            <span>4 stars</span>
                                            <div className="bar-container">
                                                <div className="bar" style={{ width: '10%' }}></div>
                                            </div>
                                            <span>10%</span>
                                        </div>
                                            <div className="rating-bar">
                                            <span>3 stars</span>
                                            <div className="bar-container">
                                                <div className="bar" style={{ width: '3%' }}></div>
                                            </div>
                                            <span>3%</span>
                                        </div>
                                            <div className="rating-bar">
                                            <span>2 stars</span>
                                            <div className="bar-container">
                                                <div className="bar" style={{ width: '1%' }}></div>
                                            </div>
                                            <span>1%</span>
                                        </div>
                                            <div className="rating-bar">
                                            <span>1 star</span>
                                            <div className="bar-container">
                                                <div className="bar" style={{ width: '1%' }}></div>
                                            </div>
                                            <span>1%</span>
                                        </div>
                                        </div>
                                    </div>
                                    {!showAllReviews &&
                                        <div className={'grid-container'}>
                                            {getValues().review.map((review, index) => (
                                                <div key={index}>
                                                    {index <= 2 && <div key={review.id} className="review-card">
                                                        <div className="review-header">
                                                            <div className="reviewer-info">
                                                                <h4>Michael Brown</h4>
                                                                <div className="review-rating">
                                                                    {renderStars(review.rating)}
                                                                    <span className="review-date">{review.time}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="review-content">
                                                            <p>{review.review}</p>
                                                        </div>
                                                    </div>  }
                                                </div>
                                            ))}
                                        </div>
                                    }
                                    {showAllReviews &&
                                        <div className={'grid-container'}>
                                            {getValues().review.map((review, index) => (
                                                <div key={review.id} className="review-card">
                                                    <div className="review-header">
                                                        <div className="reviewer-info">
                                                            <h4>Michael Brown</h4>
                                                            <div className="review-rating">
                                                                {renderStars(review.rating)}
                                                                <span className="review-date">{review.time}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="review-content">
                                                        <p>{review.review}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    }
                                    {getValues().review.length > 3 &&
                                        <button onClick={() => setShowAllReviews(!showAllReviews)}
                                                className="view-all-reviews">
                                            {showAllReviews ? 'View Less Reviews' : 'View All Reviews'}
                                        </button>
                                    }
                                </div>}
                            {getValues().review.length <= 0 && <p>No review for {getValues().personal.firstName} {getValues().personal.lastName} yet </p> }
                        </div>
                    )}
                </div>
            </div>
        );
    };

    useEffect(() => {
        window.scroll({top: 0, behavior: 'smooth'});
    }, [activeMenu])

    const Finance = () => {

        const [userData, setUserData] = useState({
            name: "Maria Sanchez",
            role: "Professional Cleaner",
            hourlyRate: 18.50,
            avgHoursPerWeek: 32,
            paymentMethod: "Direct Deposit",
            nextPayday: "2023-11-15"
        });
        const [activeTab, setActiveTab] = useState('dashboard');

        const IncomeSummary = ({ income, stats }) => {
            const thisMonthIncome = income
                .filter(item => item.status === 'paid' && new Date(item.date).getMonth() === new Date().getMonth())
                .reduce((sum, item) => sum + item.amount, 0);

            const lastMonthIncome = income
                .filter(item => {
                    const date = new Date(item.date);
                    const now = new Date();
                    return item.status === 'paid' &&
                        date.getMonth() === now.getMonth() - 1 &&
                        date.getFullYear() === now.getFullYear();
                })
                .reduce((sum, item) => sum + item.amount, 0);

            return (
                <div className="income-summary">
                    <h2>Income Summary</h2>
                    <div className="summary-cards">
                        <div className="summary-card">
                            <h3>This Month</h3>
                            <p>£{thisMonthIncome.toFixed(2)}</p>
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
                            <p>£{stats.totalIncome.toFixed(2)}</p>
                        </div>
                        <div className="summary-card">
                            <h3>Net Income</h3>
                            <p>£{stats.netIncome.toFixed(2)}</p>
                            <small>After £{stats.totalExpenses.toFixed(2)} expenses</small>
                        </div>
                    </div>
                </div>
            );
        };

        const ExpenseTracker = ({ expenses, addExpense }) => {
            const expenseCategories = [
                'Supplies', 'Transport', 'Equipment', 'Uniforms', 'Training', 'Other'
            ];

            return (
                <div className="expense-tracker">
                    <h2>Expense Tracking</h2>

                    <div className="expense-list">
                        <h3>Recent Expenses</h3>
                        <table>
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {expenses.map(expense => (
                                <tr key={expense.id}>
                                    <td>{expense.date}</td>
                                    <td>{expense.category}</td>
                                    <td>{expense.description}</td>
                                    <td>£{expense.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="expense-summary">
                        <h3>Expenses by Category</h3>
                        <div className="category-breakdown">
                            {expenseCategories.map(category => {
                                const total = expenses
                                    .filter(e => e.category === category)
                                    .reduce((sum, e) => sum + e.amount, 0);

                                if (total === 0) return null;

                                return (
                                    <div key={category} className="category-item">
                                        <div className="category-label">
                                            <span>{category}</span>
                                            <span>£{total.toFixed(2)}</span>
                                        </div>
                                        <div className="category-bar">
                                            <div
                                                className="bar-fill"
                                                style={{ width: `${(total / Math.max(1, expenses.reduce((sum, e) => sum + e.amount, 0)) * 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        };

        const WorkHistory = ({ income }) => {
            // Group by client
            const clients = income.reduce((acc, item) => {
                if (!acc[item.client]) {
                    acc[item.client] = {
                        totalHours: 0,
                        totalAmount: 0,
                        jobs: []
                    };
                }
                acc[item.client].totalHours += item.hours;
                acc[item.client].totalAmount += item.amount;
                acc[item.client].jobs.push(item);
                return acc;
            }, {});

            return (
                <div className="work-history">
                    <h2>Work History</h2>

                    <div className="client-summary">
                        <h3>Clients Summary</h3>
                        <div className="client-cards">
                            {Object.entries(clients).map(([client, data]) => (
                                <div key={client} className="client-card">
                                    <h4>{client}</h4>
                                    <p>Total Hours: {data.totalHours}</p>
                                    <p>Total Earned: £{data.totalAmount.toFixed(2)}</p>
                                    <p>Jobs Completed: {data.jobs.length}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="recent-jobs">
                        <h3>Recent Jobs</h3>
                        <table>
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Client</th>
                                <th>Hours</th>
                                <th>Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {income
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .slice(0, 5)
                                .map(item => (
                                    <tr key={item.id}>
                                        <td>{item.date}</td>
                                        <td>{item.client}</td>
                                        <td>{item.hours}</td>
                                        <td>£{item.amount.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        };

        const FinancialCharts = ({ income, expenses }) => {
            // Prepare monthly income data
            const monthlyIncomeData = Array(12).fill(0);
            income.forEach(item => {
                if (item.status === 'paid') {
                    const month = new Date(item.date).getMonth();
                    monthlyIncomeData[month] += item.amount;
                }
            });

            // Prepare expense category data
            const expenseCategories = expenses.reduce((acc, expense) => {
                acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
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

            const expenseChartData = {
                labels: Object.keys(expenseCategories),
                datasets: [
                    {
                        data: Object.values(expenseCategories),
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
                        <h3>Expenses by Category</h3>
                        <div className="chart-wrapper">
                            <Pie
                                data={expenseChartData}
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

        const TaxEstimator = ({ income, expenses }) => {
            const totalIncome = income
                .filter(item => item.status === 'paid')
                .reduce((sum, item) => sum + item.amount, 0);

            const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
            const netIncome = totalIncome - totalExpenses;

            // Simple tax estimation (US based)
            const calculateTax = () => {
                // These are simplified estimates - real tax calculations would be more complex
                const federalTax = netIncome * 0.12; // Approximate 12% federal tax
                const stateTax = netIncome * 0.05; // Approximate 5% state tax
                const ficaTax = netIncome * 0.0765; // Social Security + Medicare

                return {
                    federal: federalTax,
                    state: stateTax,
                    fica: ficaTax,
                    total: federalTax + stateTax + ficaTax
                };
            };

            const tax = calculateTax();
            const afterTaxIncome = netIncome - tax.total;

            return (
                <div className="tax-estimator">
                    <h2>Tax Center</h2>

                    <div className="tax-summary">
                        <h3>Annual Tax Estimate</h3>
                        <div className="tax-cards">
                            <div className="tax-card">
                                <h4>Gross Income</h4>
                                <p>£{totalIncome.toFixed(2)}</p>
                            </div>
                            <div className="tax-card">
                                <h4>Deductible Expenses</h4>
                                <p>£{totalExpenses.toFixed(2)}</p>
                            </div>
                            <div className="tax-card">
                                <h4>Net Income</h4>
                                <p>£{netIncome.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="tax-breakdown">
                            <h4>Estimated Taxes</h4>
                            <div className="tax-item">
                                <span>Federal Income Tax:</span>
                                <span>£{tax.federal.toFixed(2)}</span>
                            </div>
                            <div className="tax-item">
                                <span>State Income Tax:</span>
                                <span>£{tax.state.toFixed(2)}</span>
                            </div>
                            <div className="tax-item">
                                <span>FICA (SS + Medicare):</span>
                                <span>£{tax.fica.toFixed(2)}</span>
                            </div>
                            <div className="tax-item total">
                                <span>Total Estimated Tax:</span>
                                <span>£{tax.total.toFixed(2)}</span>
                            </div>
                            <div className="tax-item net">
                                <span>After-Tax Income:</span>
                                <span>£{afterTaxIncome.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="tax-tips">
                        <h3 style={{marginBottom:'10px'}}>Tax Tips for Cleaning Professionals</h3>
                        <ul className={'dot-list'}>
                            <li>Keep receipts for all cleaning supplies and equipment purchases</li>
                            <li>Uniform costs may be deductible if required by your employer</li>
                        </ul>
                        <p className="disclaimer">
                            Note: Please note that tax evaluation is constantly changing according to regulations.
                        </p>
                    </div>
                </div>
            );
        };

        // Sample data - in a real app, this would come from an API
        const [financialData, setFinancialData] = useState({
            income: [
                { id: 1, date: '2023-11-01', client: 'Office Building A', hours: 4, amount: 74.00, status: 'paid' },
                { id: 2, date: '2023-10-30', client: 'Residential - Johnson', hours: 3.5, amount: 64.75, status: 'paid' },
                { id: 3, date: '2023-10-28', client: 'Medical Clinic B', hours: 6, amount: 111.00, status: 'paid' },
                { id: 4, date: '2023-10-25', client: 'Office Building A', hours: 4, amount: 74.00, status: 'paid' },
                { id: 5, date: '2023-10-23', client: 'School District', hours: 8, amount: 148.00, status: 'pending' }
            ],
            expenses: [
                { id: 1, date: '2023-11-02', category: 'Supplies', description: 'Cleaning products', amount: 28.50 },
                { id: 2, date: '2023-10-28', category: 'Transport', description: 'Bus pass', amount: 45.00 },
                { id: 3, date: '2023-10-15', category: 'Equipment', description: 'New mop', amount: 32.99 }
            ]
        });

        // Calculate summary stats
        const calculateStats = () => {
            const totalIncome = financialData.income
                .filter(item => item.status === 'paid')
                .reduce((sum, item) => sum + item.amount, 0);

            const pendingIncome = financialData.income
                .filter(item => item.status === 'pending')
                .reduce((sum, item) => sum + item.amount, 0);

            const totalExpenses = financialData.expenses.reduce((sum, item) => sum + item.amount, 0);

            return {
                totalIncome,
                pendingIncome,
                totalExpenses: totalExpenses,
                netIncome: totalIncome - totalExpenses
            };
        };

        const stats = calculateStats();

        const addIncome = (newIncome) => {
            setFinancialData(prev => ({
                ...prev,
                income: [...prev.income, newIncome]
            }));
        };

        const addExpense = (newExpense) => {
            setFinancialData(prev => ({
                ...prev,
                expenses: [...prev.expenses, newExpense]
            }));
        };

        return (
            <div className="finance-dashboard">
                <header className="dashboard-header">
                    <div className="user-info">
                        <h1>{userData.name}</h1>
                        <p>{userData.role}</p>
                    </div>
                    <div className="quick-stats">
                        <div className="stat-card">
                            <h3>Earnings</h3>
                            <p>£{stats.netIncome.toFixed(2)}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Pending</h3>
                            <p>£{stats.pendingIncome.toFixed(2)}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Rate</h3>
                            <p>£{userData.hourlyRate}/hr</p>
                        </div>
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
                    <button
                        className={activeTab === 'expenses' ? 'active' : ''}
                        onClick={() => setActiveTab('expenses')}
                    >
                        Expenses
                    </button>
                    <button
                        className={activeTab === 'tax' ? 'active' : ''}
                        onClick={() => setActiveTab('tax')}
                    >
                        Tax
                    </button>
                </nav>

                <main className="dashboard-main">
                    {activeTab === 'dashboard' && (
                        <>
                            <IncomeSummary income={financialData.income} stats={stats} />
                            <FinancialCharts income={financialData.income} expenses={financialData.expenses} />
                            <WorkHistory income={financialData.income} />
                        </>
                    )}

                    {activeTab === 'income' && (
                        <div className="income-section">
                            <h2>Income Tracking</h2>

                            <div className="income-list">
                                <h3>Recent Income</h3>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Client</th>
                                        <th>Hours</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {financialData.income.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.date}</td>
                                            <td>{item.client}</td>
                                            <td>{item.hours}</td>
                                            <td>£{item.amount.toFixed(2)}</td>
                                            <td className={`status-${item.status}`}>{item.status}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'expenses' && (
                        <ExpenseTracker expenses={financialData.expenses} addExpense={addExpense} />
                    )}

                    {activeTab === 'tax' && (
                        <TaxEstimator income={financialData.income} expenses={financialData.expenses} />
                    )}
                </main>

                <footer className="dashboard-footer">
                    <p>Last updated: {new Date().toLocaleString()}</p>
                    <p>Need help? Contact your payroll department</p>
                </footer>
            </div>
        );
    }

    useEffect(() => {
       /* const myOders = async () => {
            setIsLoadMyOrders(true);
            const userData = {email: email}
            try {
                const acceptResponse = await api.post('/api/booking/my-orders', userData);
                const jobList = acceptResponse.data.booking;
                if (jobList.length > 0) {
                    setMyOrders(jobList);
                }
                else {
                    setMyOrders([])
                    setMessage('You do not have active order');
                }
                setIsLoadMyOrders(false);
                console.log(jobList.length);
            }
            catch (error) {
                setMessage('Error fetching my orders');
                setIsLoadMyOrders(false)
                setMyOrders([]);
                console.log(error);
            }
        }
        if (activeMenu === topNavItems[1]) {
            myOders()
        }*/
    }, [activeMenu]);

    const MyOrders = () => {

        const renderWithTime = (date) => {
            const date1 = new Date(date);
            const date2 = new Date();
            const diff = differenceInDays(date2, date1);
            if (diff <= 3) {
                return true;
            }
            return false;
        }

        const getPostcode = (postcode) => {
            if (postcode === '' || postcode === null || postcode === undefined) {
                return 'EH66JN';
            }
            return postcode.toString().toUpperCase();
        }

        const updateOrder = (orderId) => {

      //      setIdForUpdate(-1)
        }

        const [formData, setFormData] = useState( {
            extraTime: 0,
            amount: 0,
            wages: null,
            timeCompleted: new Date(),
            dateCompleted: '',
            extraCharge: 0,
            completed: true,
        });
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        };
        const handleDateChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        };

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
                                <div key={order.id} style={{border:'dashed', padding:'10px', borderRadius:'10px'}} >
                                    <p style={{textAlign:'center'}}>{order.orderId}</p>

                                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                        <p style={{fontSize:'smaller', width:'70%'}} >{formatDate(order.bookDate)}</p>
                                        <p style={{textAlign:'end'}}><span style={order.nature === 'Light'? {color:'Green', fontWeight:'bold'}:
                                            order.nature === "Medium" ? {color:'blue', fontWeight:'bold'} : {color:'red', fontWeight:'bold'}  }>{order.nature} </span>{order.plan}</p>
                                    </div>

                                    {renderWithTime(order.bookDate) && <p>
                                        <FaMapMarkerAlt style={{width:'15px'}} />
                                        <span style={{fontWeight:'bold', marginRight:'5px'}}>{getPostcode(order.postcode)}</span>
                                        {order.address}
                                        <FaHome onClick={() => navigate('/sitemap', {state: {address: order.address}})} style={{width:'30px'}} />
                                    </p>}

                                    {order.booking.map((book, index) => (
                                        <div key={index} className={'order-container'}>
                                            <p style={{width:'60%', textAlign:'start'}}>{book.room}</p>
                                            <p style={{textAlign:'end', width:'30%'}}>{book.count}</p>
                                        </div>
                                    ))}

                                    <div className={'order-container'}>
                                        <p style={{width:'70%'}}>Estimated time</p>
                                        <h3 style={{textAlign:'end'}}>{formatTime(order.duration)}</h3>
                                    </div>

                                    {order.id === idForUpdate &&
                                        <form
                                            onSubmit={() => updateOrder(order.id)} className={["support-form", "slide-in"].join(" ")}>
                                            <label className={'order-container'} style={{color:'blue', textAlign:'center'}}>Job completion form
                                            <FaTimes style={{width:'20px', marginLeft:'15px', color:'black'}} onClick={() => setIdForUpdate(-1)} />
                                            </label>
                                            <div className="form-group">
                                            <label htmlFor="name">Extra time(min)</label>
                                            <input
                                                type="number"
                                                id="extraTime"
                                                name="extraTime"
                                                value={formData.extraTime}
                                                onChange={handleInputChange}
                                                required
                                                className={'button-bg'}
                                            />
                                        </div>

                                            <div className="form-group">
                                            <label htmlFor="extraCharge">Extra charge</label>
                                            <input
                                                type="number"
                                                id="extraCharge"
                                                name="extraCharge"
                                                value={formData.extraCharge}
                                                onChange={handleInputChange}
                                                required
                                                className={'button-bg'}
                                            />
                                        </div>

                                            <div className="form-group">
                                            <label htmlFor="wages">Wages</label>
                                            <input
                                                type="number"
                                                id="wages"
                                                name="wages"
                                                value={formData.wages}
                                                onChange={handleInputChange}
                                                required
                                                className={'button-bg'}
                                            />
                                        </div>

                                            <div className={'resource-grid'}>
                                            <div className="form-group">
                                                <label htmlFor="Date">Job completed date</label>
                                                <input
                                                    id="dateCompleted"
                                                    name="dateCompleted"
                                                    type="date"
                                                    min={new Date().toISOString().split('T')[0]}
                                                    value={formData.dateCompleted}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="Date">Job completed time</label>
                                                <input
                                                    id="timeCompleted"
                                                    name="timeCompleted"
                                                    type="time"
                                                    value={formData.timeCompleted}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                           <div className="form-group">
                                            <button className={'submit-button'} type="submit">Submit Job</button>
                                        </div>
                                    </form>
                                    }
                                    {order.id !== idForUpdate &&
                                        <button className={(idForUpdate === order.id || idForUpdate >= 0) ? 'back-button' : 'next-button'}
                                                                  disabled={(idForUpdate === order.id || idForUpdate >= 0) ? true : false}
                                                                  onClick={() => setIdForUpdate(order.id)}>
                                        Register job
                                    </button> }

                                </div>
                            ))}
                        </div>
                }
            </div>
        );
    }

    useEffect(() => {
        /*const history = async () => {
            setLoadingHistory(true);
            try {
                const acceptResponse = await api.post('/api/booking/history', {email: email});
                const jobList = acceptResponse.data.booking;
                setHistory(jobList);
                if (jobList.length <= 0) {
                    setMessage('You do not have active history');
                }
            }
            catch (error) {
                setMessage('Error fetching my history');
                setHistory([]);
                console.log(error);
            } finally {
                setLoadingHistory(false);
            }
        }
        if (activeMenu === topNavItems[2]) {
            history()
        }*/
    }, [activeMenu]);

    const History = () => {
        return (
            <div className={'support-page'}>
                {loadingHistory ?
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

    const SupportPage = () => {
        const [activeTab, setActiveTab] = useState('faq');
        const [formData, setFormData] = useState({
            name: '',
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
                        className={activeTab === 'resources' ? 'active' : ''}
                        onClick={() => setActiveTab('resources')}
                    >
                        Resources
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
                                            value={formData.name}
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

                    {activeTab === 'resources' && (
                        <section className="resources-section">
                            <h2>Professional Resources</h2>
                            <div className="resource-grid">
                                {resources.map((resource, index) => (
                                    <div key={index} className="resource-card">
                                        <div className={`resource-icon ${resource.type}`}>
                                            {resource.type === 'pdf' ? '📄' : '🎬'}
                                        </div>
                                        <h3>{resource.title}</h3>
                                        <a href={resource.link} className="download-link">
                                            {resource.type === 'pdf' ? 'Download PDF' : 'Watch Video'}
                                        </a>
                                    </div>
                                ))}
                            </div>

                            <div className="uk-legal">
                                <h3>UK Legal Resources</h3>
                                <ul>
                                    <li><a href="https://www.gov.uk/employment-rights" target="_blank" rel="noopener noreferrer">GOV.UK Employment Rights</a></li>
                                    <li><a href="https://www.hse.gov.uk/cleaning/" target="_blank" rel="noopener noreferrer">HSE Cleaning Industry Guidelines</a></li>
                                    <li><a href="https://www.acas.org.uk" target="_blank" rel="noopener noreferrer">ACAS Workplace Advice</a></li>
                                    <li><a href="https://www.gov.uk/national-minimum-wage-rates" target="_blank" rel="noopener noreferrer">National Minimum Wage Rates</a></li>
                                </ul>
                            </div>
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
       /* const fetchCleanerData = () => {
            setIsLoading(true);
            const user1 = JSON.parse(localStorage.getItem('user'));
            api.post('/api/users/record', {email: user1.email})
                .then(response => {
                    const { user } = response.data;
                    if (user) {
                        localStorage.setItem('user', JSON.stringify(user));
                        setValue('personal', {
                            ...getValues().personal,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            phone: user.phone,
                            address: user.address,
                            email: user.email,
                            nationalInsurance: user.NIN,
                            bio: user.bio,
                            emergencyContact: user.emergency,
                        });
                        setValue('work', user.workExperience);
                        setValue('availability', user.available);
                        setValue('notifications', user.notification);
                    }
                    else {
                        setSuccessMessage('Error updating user');
                        setBgColor('red');
                    }
                })
                .catch(error => {
                    if (error.response.status === 401 && (user1.email === null || user1.email === undefined)) {
                        setSuccessMessage('User with the specified username not found');
                        return;
                    }
                    setSuccessMessage('Error fetching profile data')
                })
                .finally(() => {
                    setIsLoading(false);
                })
        };
        fetchCleanerData();*/
    }, []);

    const SettingsPage = () => {
        const [dataForUpdate, setDataForUpdate] = useState('');
        const [runCounter, setRunCounter] = useState(0);

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
            return;
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
                                    {errors.personal?.emergencyContact?.name && <span className="error-message">{errors.personal.emergencyContact.name.message}</span>}
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
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {renderTabContent()}

                    <div className="form-actions">
                        <button className={(isLoading || dataForUpdate.length <= 0) ? 'back-button' : 'next-button'}
                                type="button" disabled={(isLoading || dataForUpdate.length <= 0)}
                                onClick={onSubmit}
                        >
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
                </nav>

                {activeTab ===  'Guildelines' && <Guidelines />}
                {activeTab === 'Safety' && <Safety />}
            </div>
        )

    }

    return (
        <div className="sticky-nav-container">
            <nav  className='top-order-nav'>
                <div className="nav-order-content">
                    <img src={LOGO} className={'logo-icon2'}/>
                    {topNavItems.map((item, index) => (
                        <div key={`top-${index}`} className="nav-order-item"
                             onClick={() => setActiveMenu(item)}>
                            <h3 style={activeMenu === item ? {color:'goldenrod', textDecoration:'underline'}: {color:'', textDecoration:'none'} } >{item}</h3>
                        </div>
                    ))}
                </div>
            </nav>

            <main className={["main-content", "main-banner"].join(" ")}>
                {activeMenu === topNavItems[0] && <NewOrders /> }
                {activeMenu === topNavItems[1] && <MyOrders /> }
                {activeMenu === topNavItems[2] && <History /> }
                {activeMenu === bottomNavItems[3].name && <SupportPage /> }
                {activeMenu === bottomNavItems[4].name && <ProfilePage /> }
                {activeMenu === bottomNavItems[1].name && <Finance /> }
                {activeMenu === bottomNavItems[2].name && <Docs /> }
                {activeMenu === bottomNavItems[0].name && <SettingsPage /> }

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
};

export default CleanerProfile;