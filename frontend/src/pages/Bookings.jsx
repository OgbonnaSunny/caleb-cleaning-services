
import React, { useState, useEffect } from 'react';
import {
    FaHome,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaMapMarkerAlt,
    FaPen,
    FaTimes,
    FaArrowCircleRight,
    FaArrowCircleLeft,
    FaArrowAltCircleRight,
    FaArrowRight,
    FaArrowLeft,
    FaStar, FaRegStar, FaUserTie, FaUser
} from 'react-icons/fa';
import api from './api.js'
import {Link, useNavigate} from 'react-router-dom';
import {differenceInCalendarDays, differenceInDays, differenceInMinutes, format, isToday} from 'date-fns';
import DatePicker from "react-datepicker";
import {MdKeyboardArrowDown, MdKeyboardArrowRight, MdKeyboardArrowUp} from "react-icons/md";
import {loadStripe} from "@stripe/stripe-js";
import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    Elements,
    useElements,
    useStripe
} from "@stripe/react-stripe-js";


const Bookings = ( {cancellable =  false, user, history = false }) => {
    const STRIPE_KEY = import.meta.env.VITE_STRIPE_API_KEY;
    const stripePromise = loadStripe(STRIPE_KEY);

    const navigate = useNavigate();
    const bookings = [
        { id: 1, postcode: "G10AS", cleanerEmail:'ogbonnasundaycy@gmail.com', cleaner: 'Sunday Ogbonna', customer: "Sarah Johnson", address: "25 Park Lane, London", date: '3 months ago', time: "Today, 10:00 AM", nature: 'Light', plan: "One-off", status: "confirmed", duration: "2h 45m", estimatedAmount: 45.76 },
        { id: 2, postcode: "O10AS", cleanerEmail:'ogbonnasundaycy@gmail.com',  cleaner: 'Sunday Ogbonna', customer: "Michael Brown", address: "42 Kensington High St", date: '6 months ago', time: "Today, 12:30 PM", nature: 'Light', plan: "One-off", status: "confirmed", duration: "1h 20m", estimatedAmount: 16.99  },
        { id: 3, postcode: "W10AR", cleanerEmail:'ogbonnasundaycy@gmail.com', cleaner: 'Jane Dia',  customer: "Emma Wilson", address: "7 Chelsea Bridge Rd", date:'9 months ago', time: "Today, 2:00 PM", nature: 'Medium', plan: "Subscription", status: "pending", duration: "45m", estimatedAmount: 62.00  },
        { id: 4, postcode: "G10AS", cleanerEmail:'ogbonnasundaycy@gmail.com', cleaner: 'Samantha Bay',  customer: "David Smith", address: "33 Baker Street", date:'1 year ago', time: "Tomorrow, 9:00 AM", nature: 'Medium', plan: "One-off", status: "confirmed", duration: "3h 55m", estimatedAmount: 95.12  },
        { id: 5, postcode: "B10AS", cleanerEmail:'hjj@gmail.com', cleaner: 'June Far', customer: "Lisa Taylor", address: "18 Oxford Street", date:'3 weeks ago', time: "Tomorrow, 11:00 AM", nature: 'Heavy', plan: "One-off", status: "cancelled", duration: "4h 05m", estimatedAmount: 25.06  }
    ];

    const data = {
        dayName: '',
        monthName: '',
        yearName: new Date().getFullYear(),
        starter:'',
        plan: 'One-Off',
        planType:'',
        rate: 29,
        date: '',
        time: '09:00',
        hour: 9,
        hourText: '09',
        minuteText: '00',
        minute: 0,
        startTime: '',
        nature: 'Light',
        natureActive: [false, false, false],
        room: [],
        appliance: [],
        options: [],
        booking: [],
        totalAmount: 0,
        duration: '',
        addictions: [],
        errandTime:'0',
        erranTimeInMinutes: 0,
        cashBack:'Cashback up to £25',
        weekly1:'No',
        weekly2:'No',
        monthly: 3,
        check: false,
        key: false,
        pets: false,
        upholstery: false,
        chores: [],
        choresPrevPrice: 0,
        show: false,
        show2: false,
        questionIds: [],
        questionIds2: [],
        minimumEstimate: 87,
        showInfo1: false,
        showInfo2: false,
        showInfo3: false,
        showInfo4: false,
        bookingEmpty: false,
        addresses: ['Select addres', "1 Princes Street", "10 Royal Mile", "15 North Bridge", "20 St Giles Street", "25 High Street"],
        customer: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        email: '',
        postcode: '',
        authorization: false,
        policy: false,
        disableThisDay: false,
        standardOnly: true,
        onSubscription: false,
        durationQty: 0,
        urgent: false,
        sessionTime:'',
        showRugs: false,
        rugRooms: [],
        rugSizes: [],
        personel: 1,
        startHour: 0,
        startMinute: 0,

    }

    const [allBookingData, setAllBookingData] = useState([]);
    const [allBookingDataCopy, setAllBookingDataCopy] = useState([]);

    const [todayBooking, setTodayBooking] = useState([]);
    const [last7DaysBooking, setLast7DaysBooking] = useState([]);

    const [clientHistory, setClientHistory] = useState([]);
    const [clientHistoryCopy, setClientHistoryCopy] = useState([]);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [email, setEmail] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [currentBookings, setCurrentBookings] = useState(allBookingData.length);
    const [exhausted , setExhausted] = useState(false);
    const [exhaustedToday, setExhaustedToday] = useState(false);
    const [exhausted7Days, setExhausted7Days] = useState(false);
    const [customer, setCustomer] = useState('');
    const [cleanerEmail, setCleanerEmail] = useState('');
    const [bookingIdForReview, setBookingIdForReview] = useState(-1);
    const [rating, setRating] = useState(1);
    const [review, setReview] = useState('');
    const [bgColor, setBgColor] = useState('red');
    const [page, setPage] = useState(10);
    const [historyMessage, setHistoryMessage] = useState('');
    const [cancelledIds, setCancelledIds] = useState([]);
    const [cancelledMessage, setCancelledMessage] = useState(null);
    const [todayMessage, setTodayMessage] = useState(null);
    const [activeIdForCancellation, setActiveIdForCancellation] = useState(null);
    const [finishedActive, setFinishedActive] = useState(false);
    const [finishedHistory, setFinishedHistory] = useState(false);
    const [booking, setBooking] = useState(null);
    const [cancelId, setCancelId] = useState(null);
    const [detailsId, setDetailsId] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setEmail(user.email);
        }
    }, [])

    useEffect(() => {
        if (window.innerWidth > 768) {
            setPage(20);
            return;
        }
        setPage(10);
    }, []);

    useEffect(() => {
        if (email === null || email === undefined || loading || finishedActive) {
            return;
        }
        if (user === 'client') {
            setLoading(true);
            let offset = 0;
            if (allBookingData.length > 0) {
                offset = allBookingData[allBookingData.length - 1].id;
            }
            const data = {email: email, limit: page, offset: offset};
            api.post('/api/booking/customer-active-order', data)
                .then((response) => {
                    const { booking } = response.data;
                    if (booking?.length > 0) {
                        setAllBookingData(prev => {
                            const map = new Map(prev.map(item => [item.id, item])); // old items
                            booking.forEach(item => map.set(item.id, item));    // add/replace new
                            return Array.from(map.values()).sort((a, b) => a.id - b.id); // convert back to array
                        });
                    }
                    else {
                        if (allBookingData.length <= 0) {
                            setMessage("No active bookings found");
                        }
                        setFinishedActive(true);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setMessage("Error while fetching booking data.");
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [pageCount, email])

    useEffect(() => {
        const fetchHistory = async () => {
            if (email === null || email === undefined || loading || finishedHistory) return;
            setLoading(true);
            try {
                let offset = 0;
                if (clientHistory.length > 0) {
                    const jobs = clientHistory;
                    jobs.sort((a, b) => a.id - b.id);
                    offset = jobs[jobs.length - 1].id;
                }
                const data = {email: email, limit: page, offset: offset};
                const response = await api.post('/api/booking/client-history', data);
                const { booking } = response.data;
                if (booking?.length > 0) {
                    setClientHistory(prev => {
                        const map = new Map(prev.map(item => [item.id, item])); // old items
                        booking.forEach(item => map.set(item.id, item));    // add/replace new
                        return Array.from(map.values()).sort((a, b) => a.id - b.id).reverse(); // convert back to array
                    });

                }
                else {
                    if (clientHistory.length <= 0) {
                        setHistoryMessage("No history of  booking found");
                    }
                    setFinishedHistory(true);
                }
            } catch (error) {
                console.log(error);
                setHistoryMessage("Error while fetching history data.");
            } finally {
                setLoading(false);
            }
        }
        if (user === 'client' && history) {
            fetchHistory();
        }
    }, [pageCount, email])

    useEffect(() => {
        if (user === 'admin') {
            setLoading(true);
            const data = {limit: page, offset: 0};
            api.post('/api/booking/today', data)
                .then((res) => {
                    const { booking } = res.data;
                    if (booking.length > 0) {
                        setTodayBooking(prev => {
                            const map = new Map(prev.map(item => [item.id, item])); // old items
                            booking.forEach(item => map.set(item.id, item));    // add/replace new
                            return Array.from(map.values()).sort((a, b) => a.id - b.id); // convert back to array
                        });
                    }
                    else {
                        if (todayBooking.length <= 0) {
                            setTodayMessage("No booking found for today");
                        }

                    }
                })
                .catch((error) => {
                    console.log(error);
                    setTodayMessage("Error while fetching booking data.");
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [])

    useEffect(() => {
        if (user === 'admin') {
            setLoading(true);
            const data = {limit: page, offset: 0};
            api.post('/api/booking/last-seven-days', data)
                .then((res) => {
                    const { booking } = res.data;
                    if (booking.length > 0) {
                        setLast7DaysBooking(prev => {
                            const map = new Map(prev.map(item => [item.id, item])); // old items
                            booking.forEach(item => map.set(item.id, item));    // add/replace new
                            return Array.from(map.values()).sort((a, b) => a.id - b.id); // convert back to array
                        });
                    }
                    else {
                        if (last7DaysBooking.length <= 0) {
                            setMessage("No active bookings found for recent days");
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setMessage("Error while fetching booking data.");
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;

            if (scrollTop + clientHeight >= scrollHeight - 100) {
                if (!loading && !booking) {
                    setPageCount(prev => prev + 1);
                }
            }

        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, booking]);

    useEffect(() => {

        setFinishedHistory(false)

        setFinishedActive(false)

    }, [history]);

    useEffect(() => {
        const resetMessage = () => {
            setMessage(null);
            setBgColor('red')
        }
        if (user !== 'admin') {
            setTimeout(()=> resetMessage(), 5000);
        }

    }, [message]);

    const cancelBooking = async (id) => {
        if (!email) {
            return;
        }
        setLoading(true);
        setMessage(null);
        setActiveIdForCancellation(id)
        if (cancellable) {
            api.post('/api/booking/cancel', {email: email, orderId: id})
                .then((response) => {
                    const { success } = response.data;
                    if (success) {
                      //  cancelledIds.push(id);
                        setCancelledIds(prev => [...prev, id]);
                        setCancelledMessage("Booking successfully cancelled");
                    }
                    else {
                        setCancelledMessage("Booking cancellation not successfully");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setCancelledMessage("Error while cancelling booking");
                })
                .finally(() => {
                    setLoading(false);
                    setTimeout(() => setCancelledMessage(null), 5000);
                })
        }
    }

    const renderNunber = (id) => {
        if (id.toString().length === 1) {
            return `FC000${id}`
        }
        if (id.toString().length === 2) {
            return `FC00${id}`
        }
        if (id.toString().length === 3) {
            return `FC0${id}`
        }
        return `FC${id}`
    }

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

    const writeReview = async (e) => {
        e.preventDefault();
        setLoading(true);
        const reviewData = { customer: customer, cleanerEmail: cleanerEmail, review: review , rating: rating };
        console.log(reviewData);
        try {
            const response = await api.post('/api/reviews', reviewData)
            const { success} = response.data;
            if (success) {
                setBgColor('green');
                setMessage("Review sent successful");
            }
        } catch (error) {
          //  console.log(error);
            setMessage("Error occured while sending review");
        } finally {
            setLoading(false);
            setReview('')
        }
    }

    const goToCleanerProfile = (email, cleaner) => {

        window.open(`/cleanerprofilepage?cleaner=${encodeURIComponent(cleaner)}&email=${encodeURIComponent(email)}`, "_blank");
    }

    const renderName = (name) => {
        if (name === null || name === '' || name === undefined) {
            return name;
        }
        const names = name.split(' ');
        if (names.length <= 1) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        }
        let fullName = "";
        for (let i = 0; i < names.length; i++) {
            fullName += names[i].charAt(0).toUpperCase() + names[i].slice(1)+ " ";
        }
        return fullName;
    }

    function getFee(booking) {
        let fee = 50.00;
        const amount = Number(booking.estimatedAmount);
        if (amount <= 160) {
            fee = (amount * 0.3).toFixed(2);
        }
        return fee;
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


    const Reschedule = ({ booking }) => {
        if (!booking) { return; }
        const cleanerEmail = booking?.cleanerEmail;
        const amount = Math.round(getFee(booking) * 100);

        const [processing, setProcessing] = useState(false);
        const [paymentIntentId, setPaymentIntentId] = useState(null);
        const [clientSecret, setClientSecret] = useState(null);
        const [selectedDate, setSelectedDate] = useState(null);

        const [errors, setErrors] = useState({});
        const [adjustLower, setAdjustLower] = useState(true);
        const [minimumHour, setMinimumHour] = useState(0);
        const [minimumMinute, setMinimumMinute] = useState(0);
        const [formData, setFormData] = useState(data);
        const [count, setCount] = useState(0);
        const [time, setTime] = useState('');
        const [minDate, setMinDate] = useState(new Date().setHours(0, 0, 0, 0));
        const [message, setMessage] = useState('');

        useEffect(() => {
            const hours = new Date().getHours();
            let disable = false;
            if (hours > 16) {
                disable = true;
                setMinDate(new Date(Date.now() + 86400000))
            }
            setFormData({...formData, disableThisDay: disable});
        }, []);

        useEffect(() => {
            const time = new Date(selectedDate).setHours(formData.hour, formData.minute, 0, 0);
            const date = new Date(time).toLocaleTimeString([],{
                hour: '2-digit',
                minute: '2-digit'
            } );
            setTime(date);
        }, [formData.hour, formData.minute, selectedDate, formData.date, clientSecret])

        const isSameOrAfter = (date, baseDate = new Date()) => {
            const d1 = new Date(date.setHours(0, 0, 0, 0));
            const d2 = new Date(baseDate.setHours(0, 0, 0, 0));
            return d1 >= d2;
        };

        const filterDate = (date) => {
            // Enable only today and future dates
            return isSameOrAfter(date);
        };

        const addHour = () => {
            let hours = formData.hour;
            let minuteText = formData.minuteText;
            let time;
            if (hours >= 23) return;
            hours += 1;

            let hour;
            if (hours.toString().length <= 1) {
                hour =  `0${hours}`;
                time = `${hour}:${minuteText}`;
            }
            else {
                hour = hours.toString();
                time = `${hour}:${minuteText}`;
            }
            setFormData({...formData, hourText: hour, hour: hours, time: time });
        }

        const removeHour = () => {
            let hours = formData.hour - 1;
            if (!adjustLower) {
                if (hours < minimumHour) return;
            }
            const thisHour = new Date().getHours();
            let minimumHours = thisHour + 4;
            let minuteText = formData.minuteText;
            let time;

            const thisDay = isToday(formData.date)
            const daysDiff = differenceInDays(new Date(formData.date), new Date());

            if (thisDay) {
                if (hours < minimumHours) {
                    hours = minimumHours;
                }
                if (hours < 9) {
                    hours = 9;
                }
            }
            else {
                if (daysDiff <= 0) {
                    if (hours < 9) {
                        hours = 9;
                    }
                }
                else {
                    if (hours <= 0) {
                        hours = 1;
                    }
                }
            }

            let hour;
            if (hours.toString().length <= 1) {
                hour =  `0${hours}`;
                time = `${hour}:${minuteText}`;

            }
            else {
                hour = hours.toString();
                time = `${hour}:${minuteText}`;
            }

            setFormData({...formData, hourText: hour, hour: hours, time: time });

        }

        const addMinute = () => {
            let minutes = formData.minute;
            let hourText = formData.hourText;
            let hour;
            if (minutes === 30) {
                return
            }
            minutes =  formData.minute + 30;
            let minute = minutes.toString();
            let time = `${hourText}:${minute}`;

            setFormData({...formData, minuteText: minute, minute: minutes, time: time });
        }

        const removeMinute = () => {
            let minutes = formData.minute;
            let hourText = formData.hourText;
            let time;
            if (minutes === 0) {
                return
            }
            minutes =  formData.minute - 30;
            if (!adjustLower) {
                if (minutes < minimumMinute) return;
            }

            let minute = `0${minutes}`;
            time = `${hourText}:${minute}`;

            setFormData({...formData, minuteText: minute, minute: minutes, time: time });
        }

        const disableThisday = (date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize today to midnight
            return date > today; // Disables today and all past dates
        };

        const enableThisday = (date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize today to midnight
            return date >= today;
        }

        const handleDateChange = (selectedDate) => {
            const newErrors = errors;
            const now = isToday(selectedDate)
            let time;
            let hourText = '';
            const date =  format(selectedDate, 'yyyy-MM-dd');
            const session = format(new Date(), 'yyyy-MM-dd hh:mm:ss');
            if (now) {
                const hour = new Date().getHours();
                let newHour = hour + 4;

                let minutesToBeUse = 0;
                let minuteText = '';
                const minute = new Date().getMinutes();
                if (minute > 5) {
                    minutesToBeUse = 30;
                    minuteText = `${minutesToBeUse}`
                    if (minute > 30) {
                        newHour++;
                        minuteText = '00';
                        minutesToBeUse = 0;
                    }
                }
                else {
                    minuteText = '00';
                }

                if (newHour < 9) {
                    newHour = 9;
                }
                if (newHour.toString().length <= 1) {
                    time = `0${newHour}:${minuteText}`;
                    hourText = `0${newHour}`;
                }
                else {
                    time = `${newHour}:${minuteText}`;
                    hourText = newHour.toString();
                }
                setAdjustLower(false)
                setMinimumHour(newHour)
                setMinimumMinute(minutesToBeUse)

                setFormData({...formData,
                    hour: newHour,
                    hourText: hourText,
                    date: date,
                    time: time,
                    minute: minutesToBeUse,
                    minuteText: minuteText,
                });
                setSelectedDate(new Date(selectedDate).setHours(0, 0, 0, 0));
                newErrors['time'] = null;
            }
            else {
                setAdjustLower(true)
                const time = `${formData.hourText}:${formData.minuteText}`;
                setFormData({...formData, date: date, time: time});
                newErrors['time'] = null;
            }
            newErrors['date'] = null;
            setErrors(newErrors);
        }

        async function rescheduleBooking(e) {
            e?.preventDefault();
            if (processing) return;
            const newErrors = {};
            if (!formData.date.trim()) newErrors.date = 'Please select date';

            if (!formData.time.trim()) newErrors.time = 'Please select time';

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            setProcessing(true);

            const bookDate = `${format(formData.date, 'EEEE, d MMMM yyyy')} ${formData.time}`;

            let data = {orderId: booking?.orderId, time: bookDate, to: booking?.email};

            try {
                let response = await api.post('/api/booking/update-time', data);
                const { booking } = response.data;
                setAllBookingData(prev => {
                    const map = new Map(prev.map(item => [item.id, item])); // old items
                    booking.forEach(item => map.set(item.id, item));    // add/replace new
                    return Array.from(map.values()).sort((a, b) => a.id - b.id); // convert back to array
                });

                if (cleanerEmail) {
                    data = {
                        to: cleanerEmail,
                        text: `Your job with order id: ${booking?.orderId} has  been rescheduled to ${bookDate}. If this date is convenient for you, please re-accept the job and kindly note that this job will be made available to other employees if you do not accept it after 1 hour.`,
                    };
                    response = await api.post('/api/send-reschedule-email', data);
                }
                setMessage('Your job\'s  date is successfully updated')

            } catch (error) {
                console.log(error);
                setMessage('Error occured');
            } finally {
                setProcessing(false);
            }
        }

        useEffect(() => {
            if (selectedDate) {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth" // or "auto"
                });
            }
        }, [selectedDate, message]);

        const fetchData = async (e) => {
            e.preventDefault();
            if (processing || amount <= 0) return;
            setProcessing(true);
            try {
                // 1. Create customer or return customerId if already exists - note we send {email} as object
                const createResponse = await api.post('/api/create-customer', { email: booking?.email} );
                const { customerId } = createResponse.data;

                // create payement intent
                const paymentIntent = await api.post('/api/create-payment-intent', {
                    amount: amount, // note amount must be in pence. 100 pence = 1 pound
                    currency: 'gbp',
                    customerId: customerId
                });
                setClientSecret(paymentIntent.data.clientSecret);
                setPaymentIntentId(paymentIntent.data.paymentIntentId);

            } catch (error) {
                setMessage("Something went wrong!");
                console.log(error.message);
            }
            finally {
                setProcessing(false);

            }
        };

        function PaymentHome({ clientSecret, paymentIntentId }) {
            if (!clientSecret || !paymentIntentId) return;

            const [error, setError] = useState(null);
            const [mounted, setMounted] = useState({
                number: false,
                expiry: false,
                cvc: false,
            });
            const [pay, setPay] = useState(false);
            const [key, setKey] = useState(Date.now());
            const [processing, setProcessing] = useState(false);

            const stripe = useStripe();
            const elements = useElements();
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
            const cardNumber = elements?.getElement(CardNumberElement);
            cardNumber?.update({
                showIcon: true,
                iconStyle: 'solid'
            });
            const emailData = {
                to: booking?.email,
                text: "Your reschedule is successfull",
                subject: "Cleaning service"
            };

            const handlePayment = async (e) => {
                e.preventDefault();
                if (!stripe || !elements || processing) return;

                const allMounted = mounted.number && mounted.expiry && mounted.cvc;
                if (!allMounted) {
                    setError("Card element is not ready. Try again.");
                    return;
                }

                const cardElement = elements?.getElement(CardNumberElement);
                if (!cardElement) {
                    setError("Card element is not ready. Try again.");
                    return;
                }

                setProcessing(true);

                try {
                    const { error: stripeError, paymentIntent } =
                        await stripe?.confirmCardPayment(clientSecret, {
                            payment_method: { card: elements?.getElement(CardNumberElement),
                                billing_details: { name: booking?.customer } },
                        });

                    if (stripeError) {
                        setError(stripeError.message);
                    }
                    else if (paymentIntent) {
                        if (paymentIntent.status === "succeeded") {
                            rescheduleBooking()
                        }
                    }

                } catch (error) {
                    setError("Payment failed!. Please try Again!");
                } finally {
                    setProcessing(false);
                }


            };

            useEffect(() => {
                /* const cardNumber = elements?.getElement(CardNumberElement);
                 if (cardNumber) {
                     cardNumber.update({
                         showIcon: true,
                         iconStyle: 'solid'
                     });
                 }*/

            }, [elements]);

            return (
                <form style={{marginTop:'15px', marginBottom:'20px'}} onSubmit={handlePayment}>
                    <div style={{maxWidth:"1000px"}}>
                        <h2 style={{color:'blue', paddingLeft:'10px'}}>Payment details</h2>
                        <p style={{paddingLeft:'15px', paddingRight:'5px'}}>
                            Please note that your payement details are securely
                            stored and managed by  <Link style={{color:'blue'}} to={'https://stripe.com'}>stripe</Link>.
                        </p>
                        <div className="stripe-card-form">
                            <div className="price-container">
                                <h3 style={{color:'navy', marginBottom:'5px', textAlign:'end'}}>Powered by Stripe</h3>
                                <div className="form-row" style={{display: 'block', justifyContent: 'space-between'}}>
                                    <label>Card number</label>
                                    <CardNumberElement
                                        options={elementOptions}
                                        className="stripe-card-element"
                                        key={key}
                                        onReady={() =>
                                            setMounted((prev) => ({ ...prev, number: true }))
                                        }
                                    />
                                </div>
                                <div className="form-row" style={{ display: 'flex', width: '100%', flexDirection: 'row'}} >
                                    <div   style={{ flex: '1 1 auto', width: '60%' }}>
                                        <label>Expiration date</label>
                                        <CardExpiryElement
                                            options={elementOptions}
                                            className="stripe-card-element"
                                            onReady={() =>
                                                setMounted((prev) => ({ ...prev, expiry: true }))
                                            }
                                        />
                                    </div>

                                    <div style={{ flex: '0 0 auto', width: '30%' }}>
                                        <label>CVC</label>
                                        <CardCvcElement
                                            options={elementOptions}
                                            className="stripe-card-element"
                                            onReady={() =>
                                                setMounted((prev) => ({ ...prev, cvc: true }))
                                            }
                                        />
                                    </div>

                                </div>
                                {error && <p className={'error-message'}>{error}</p>}
                            </div>
                        </div>
                        <div style={{margin:'15px', gap:'10px'}} className="form-actions">
                            <button  disabled={(processing || !stripe)}
                                    type="submit"
                                     style={{color:'white'}}
                                    className={(!stripe || !elements || processing) ? "back-button" : "submit-button"}>
                                {processing ? 'Processing...' : 'Reschedule'}
                            </button>
                        </div>
                    </div>
                </form>
            );
        }

        function PaymentPlatform() {

            return(
                <div style={{display:'flex', flexDirection:'column'}} >
                    <Elements stripe={stripePromise}>
                        <PaymentHome clientSecret={clientSecret} paymentIntentId={paymentIntentId} />
                    </Elements>
                </div>
            );
        }

        useEffect(() => {
            if (count === 0) {
                window.scrollTo({top:'0', behavior:'smooth'});
                setCount(count + 1);
            }

        }, []);

       return (
           <div style={{display:'flex', flexDirection:'column'}}>
               <div style={{display:'flex', alignItems: 'center', gap:'10px'}}>
                   <h3>Reschedule for a new date</h3>
                    <FaTimes onClick={() => {
                        setBooking(null);
                        setPaymentIntentId(null);
                        setClientSecret(null);
                    }} size={30} style={{width:'40px', alignSelf:'end'}} />
               </div>

               {cleanerEmail && <p style={{margin:'15px', fontSize:'large'}}>
                   Please note that rescheduling this job will attract a non refundable
                   <strong style={{color:'red', fontSize:'large'}}> £{getFee(booking)}</strong> fee.
               </p> }

               {!clientSecret &&   <div className={'date-time-container'} style={{marginTop:'20px'}}>
                   <div style={{backgroundColor:'white', paddingRight:'30px', maxWidth:'300px'}}>
                       <label style={{textAlign:'center'}} htmlFor="deliveryDate">Choose date</label>
                       <DatePicker
                           selected={formData.date}
                           type={'date'}
                           name={'date'}
                           onChange={(date) => handleDateChange(date)}
                           dateFormat="yyyy-MM-dd"
                           placeholderText="Select a date"
                           inline
                           minDate={minDate}
                           filterDate={formData.disableThisDay ? filterDate : undefined}
                           dayClassName={(date) => {
                               const selected = formData.date === format(new Date(date), 'yyyy-MM-dd');
                               return selected ? 'selected-day' : undefined;
                           }}
                       />
                       {errors.date && <span className="error-message">{errors.date}</span>}
                       {formData.date && <p style={{textAlign:'center'}}>{format(formData.date, "EEE do MMM, yyyy")}</p>}
                   </div>

                   <div  style={{ flexDirection:'column', alignItems:'center', maxWidth:'200px', marginTop:'20px', justifyContent:'space-around'}}>
                       <label>Choose time</label>
                       <div  style={{display:'flex', flexDirection:'row', width:'80px', alignSelf:'center'}}>
                           <MdKeyboardArrowUp size={60}  style={{marginLeft:'12px'}} onClick={addHour} />
                           <MdKeyboardArrowUp size={60} onClick={addMinute} />
                       </div>
                       <div className={'time-container'} style={{display:'flex', flexDirection:'row',
                           justifyContent:'center', width:'100px', padding:'10px'}}>
                           <h2  style={{textAlign:'end'}}>{formData.hourText}</h2>
                           <h2  style={{textAlign:'center'}}>:</h2>
                           <h2  style={{textAlign:'start'}}>{formData.minuteText}</h2>
                       </div>

                       <div style={{display:'flex', flexDirection:'row', width:'80px', alignSelf:'center' }}>
                           <MdKeyboardArrowDown  size={60} style={{marginLeft:'12px'}} onClick={removeHour} />

                           <MdKeyboardArrowDown  size={60} onClick={removeMinute} />
                       </div>
                       <p>24-hour format</p>
                       {time && <p>{time}</p>}
                       {errors.time && <span className="error-message">{errors.time}</span>}
                   </div>
               </div> }

               <PaymentPlatform />

               {(processing && !cleanerEmail) && <p style={{margin:'10px'}}>Loading...</p>}
               {message  && <p style={{margin:'10px'}}>{message}</p>}
               {(cleanerEmail && !clientSecret) && <div style={{display:'flex', flexDirection:'column'}}>
                       <div style={{gap:'10px'}} className={'form-actions'}>
                           <button className={(!formData.date || !formData.time || processing) ? 'back-button' : 'back-button2' }
                                   disabled={processing}
                                   style={{color:'white'}}
                                   onClick={fetchData}>
                               {processing ? 'Loading...' : 'Proceed'}
                           </button>
                           <button
                               disabled={processing}
                               onClick={() => {
                                   setBooking(null);
                                   setClientSecret(null);
                                   setPaymentIntentId(null);
                               }}
                               className={'next-button'}>Cancel
                           </button>
                       </div>
                   </div>}
               {!cleanerEmail &&  <button
                   disabled={processing}
                   onClick={rescheduleBooking}
                   style={{marginTop:'10px'}}
                   className={'submit-button'}>
                   Reschedule
               </button>
               }

           </div>
       );
    }

    return (
        <div className={'support-page'} style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            {(user === 'client' && !booking) && <div>
                    {!history && (<div>
                        <div className="recent-bookings card">
                            {allBookingData.length > 0 &&  <div className="card-body">
                                <div className="grid-container">
                                    {allBookingData.map(booking => (
                                        <div key={booking.id} className="service-card">
                                            <h4 style={{textAlign:'center', margin:'10px'}}>{booking.orderId}</h4>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                                <FaHome className="icon-small" />
                                                <h3>{renderName(booking.customer)}</h3>
                                            </div>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                                <FaMapMarkerAlt className="icon-small"/>
                                                <p>{booking.address}</p>
                                            </div>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                                <FaClock className="icon-small" />
                                                <p>{getTime(booking.time)}</p>
                                            </div>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                                <div style={{display: 'flex', justifyContent: 'end', alignItems: 'baseline', alignSelf:'end'}}>
                                                    {booking.status === 'confirmed' && <FaCheckCircle className="icon-small" style={{color:'green'}}/>}
                                                    {booking.status === 'pending' && <FaClock className="icon-small" style={{color:'lightpink'}} />}
                                                    {booking.status === 'cancelled' &&  <FaTimesCircle className="icon-small" style={{color:'red'}} />}
                                                    <p>Status</p>
                                                </div>
                                                <p style={{textAlign:'end'}}>{booking.status}</p>
                                            </div>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                                <p>Amount</p>
                                                <h4 style={{textAlign:'end'}}>£{booking.estimatedAmount}</h4>
                                            </div>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                                <p>Duration</p>
                                                <h4 style={{textAlign:'end'}}>{booking.duration}</h4>
                                            </div>

                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                                <h4>{booking.plan}</h4>
                                                <p style={booking.nature === 'Light' ? {color:'green', textAlign:'end'} :
                                                    booking.nature === 'Medium' ? {color:'lightpink', textAlign:'end'}: {color:'red', textAlign:'end'}}>
                                                    {booking.nature}
                                                </p>
                                            </div>
                                            {(cancelledMessage && activeIdForCancellation === booking.orderId) && <p>{cancelledMessage}</p>}

                                            <div style={{display:'flex', alignItems:'center', marginBottom:'5px', marginTop:'10px'}}>
                                                <h3 style={{textAlign:'start'}}>My Job</h3>
                                                <MdKeyboardArrowRight
                                                    size={40}
                                                    style={{width:'40px', alignSelf:'end'}}
                                                    onClick={() => {
                                                        if (detailsId?.length > 0 && booking.orderId !== detailsId) return;
                                                        if (detailsId === null || detailsId === undefined) {
                                                            setDetailsId(booking.orderId);
                                                            return;
                                                        }
                                                        setDetailsId(null);
                                                    }}
                                                    className={detailsId === booking.orderId ? 'rotate-down' : 'rotate-up'}
                                                />
                                            </div>

                                            {detailsId === booking.orderId && <div style={{marginBottom:'15px'}} className={'price-container'}>
                                                {booking.booking.map((book, index) => (
                                                    <div key={index} className={'order-container'}>
                                                        <p style={{width:'60%', textAlign:'start'}}>{book.room}</p>
                                                        <p style={{textAlign:'end', width:'30%'}}>{book.count}</p>
                                                    </div>
                                                ))}
                                            </div>}

                                            {cancelId === booking.orderId &&  <div className="price-container">
                                                <p style={{margin:'10px'}}>
                                                    Are you sure you want to cancel this booking? This cannot be undone and it will attract a non refundable <strong style={{color:'red'}}> £{getFee(booking)}</strong> fee.
                                                </p>
                                                <div style={{gap:'10px'}} className={'form-actions'}>
                                                    <button className={'back-button2'}
                                                            onClick={() => cancelBooking(booking.orderId)}>
                                                        Yes
                                                    </button>
                                                    <button
                                                        onClick={() => setCancelId(null)}
                                                        className={'next-button'}>No
                                                    </button>
                                                </div>
                                            </div> }

                                            {cancelId === null &&  <div style={{display:'flex', flexDirection: 'column'}}>
                                                <button onClick={() => setCancelId(booking.orderId)} className="btn btn-primary"
                                                        style={(
                                                            booking.status === 'confirmed' ||
                                                            booking.status === 'cancelled' ||
                                                            cancelledIds.includes(booking.orderId) ||
                                                            loading) ? {
                                                                borderRadius:'30px',
                                                                backgroundColor:'grey',
                                                                color:'black',
                                                                marginTop:'6px'} :
                                                            !cancellable ?
                                                                {
                                                                    borderRadius:'30px',
                                                                    backgroundColor:'green',
                                                                    color:'white', marginTop:'6px'} :
                                                                {
                                                                    borderRadius:'30px',
                                                                    backgroundColor:'red',
                                                                    color:'white', marginTop:'6px'
                                                                }}
                                                        disabled={(
                                                            booking.status === 'confirmed' ||
                                                            booking.status === 'cancelled' ||
                                                            loading ||
                                                            cancelledIds.includes(booking.orderId))}>
                                                    {cancellable ? 'I Want To Cancel' : 'Assign cleaner'}
                                                </button>

                                                <button  onClick={() => setBooking(booking)} style={{marginTop:'20px', borderRadius:'30px'}}
                                                        className={'submit-button'}>I Want To Reschedule
                                                </button>
                                            </div>}

                                        </div>
                                    ))}
                                </div>
                            </div> }
                        </div>
                        {(!loading && allBookingData.length <= 0) && <div style={{marginLeft:'30px'}}><p>{message}</p></div>}
                    </div>)}
                    {history && (<div>
                        <div className="recent-bookings card">
                            {clientHistory.length > 0 &&  <div className="card-body">
                                <div className="grid-container">
                                    {clientHistory.map(booking => (
                                        <div key={booking.id} className="service-card">
                                            <h4 style={{textAlign:'center', margin:'10px'}}>{booking.orderId}</h4>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                                <FaHome className="icon-small" />
                                                <h3>{renderName(booking.customer)}</h3>
                                            </div>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                                <FaMapMarkerAlt className="icon-small"/>
                                                <p>{booking.address}</p>
                                            </div>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                                <FaClock className="icon-small" />
                                                <p> {booking.completedDate === 'on-going job' ? 'on-going job' : getTime(booking.completedDate)}</p>
                                            </div>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                                <div style={{display: 'flex', justifyContent: 'end', alignItems: 'baseline', alignSelf:'end'}}>
                                                    {booking.status === 'confirmed' && <FaCheckCircle className="icon-small" style={{color:'green'}}/>}
                                                    {booking.status === 'pending' && <FaClock className="icon-small" style={{color:'lightpink'}} />}
                                                    {booking.status === 'cancelled' &&  <FaTimesCircle className="icon-small" style={{color:'red'}} />}
                                                    <p>Status</p>
                                                </div>
                                                <p style={{textAlign:'end'}}>{booking.status}</p>
                                            </div>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                                <p>Amount</p>
                                                <h4 style={{textAlign:'end'}}>£{booking.estimatedAmount}</h4>
                                            </div>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                                <p>Duration</p>
                                                <h4 style={{textAlign:'end'}}>{booking.duration}</h4>
                                            </div>
                                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                                <p>{booking.cleaner}</p>
                                                {bookingIdForReview !== booking.id && <FaPen style={{width:'30px', marginBottom:'18px'}} onClick={bookingIdForReview === -1 ? () => {setBookingIdForReview(booking.id); setCleanerEmail(booking.cleanerEmail); setCustomer(booking.customer)}: null} />}
                                                {bookingIdForReview === booking.id && <FaTimes style={{width:'30px'}} onClick={() => {setBookingIdForReview(-1); setReview(''); setRating(1)}} />}
                                                <FaUserTie onClick={() => goToCleanerProfile(booking.cleanerEmail, booking.customer)} size={30} style={{width:'30px', color:'dodgerblue', marginLeft: '10%'}} />
                                            </div>
                                            {booking.id === bookingIdForReview && <div>
                                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom:'10px'}}>
                                                    <p>Rating: {rating}</p>
                                                    <FaArrowCircleLeft size={20} style={{width:'30px', color:'blue', marginRight:'15px'}} onClick={rating > 1 ? () => setRating(rating - 1) : null}/>
                                                    <FaArrowCircleRight size={20} style={{width:'30px', color:'blue'}} onClick={rating < 5 ? () => setRating(rating + 1) : null} />
                                                </div>
                                                <textarea placeholder={'write review'} style={{backgroundColor:'linen', color:'black', padding:'12px'}} rows={5} value={review} onChange={(e) => setReview(e.target.value)}  name={'review'}/>
                                                <button onClick={writeReview}
                                                        style={{borderRadius:'30px', marginTop:'6px'}}
                                                        className={'submit-button'}
                                                        disabled={(booking.id !== bookingIdForReview || booking.status === 'pending'
                                                            || booking.status === 'cancelled' || loading || review === '')}>
                                                    Save review
                                                </button>
                                            </div>}

                                        </div>
                                    ))}
                                </div>
                            </div> }
                        </div>
                        {(!loading && clientHistory.length <= 0) && <div style={{marginLeft:'30px'}}><p>{historyMessage}</p></div>}
                    </div>)}
                </div>}
            <Reschedule booking={booking} />
            {user === 'admin' && <div>
                <div className="recent-bookings card">
                    <div className="card-header">
                        <h2 className={'experience-text'} style={{color:'navy', width:'60%', textAlign:'start'}}>Today's Bookings</h2>
                        {todayBooking.length > 0 &&
                            <button
                                onClick={() => navigate('/bookinglist')}
                                className="btn-view-all" style={{color:'red'}}>
                                View All
                            </button>
                        }
                    </div>
                    {todayBooking.length > 0 &&  <div className="card-body">
                        <div className="grid-container">
                            {todayBooking.map(booking => (
                                <div key={booking.id} className="service-card">
                                    <div style={{display:'flex', alignItems:'center', marginBottom:'5px'}}>
                                        <h4 style={{textAlign:'start', width:'60%'}}>Stats: {booking.duration}</h4>
                                        <h4 style={{textAlign:'end', width:'40%', color:'blue'}}>£{booking.estimatedAmount}</h4>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                        <FaUser className="icon-small" />
                                        <p>{renderName(booking.customer)}</p>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                        <FaMapMarkerAlt className="icon-small"/>
                                        <p>{booking.address}</p>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                        <FaClock className="icon-small" />
                                        <p> {getTime(booking.startTime)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>}
                    {(!loading && todayBooking.length <= 0) && <p>{todayMessage}</p>}
                </div>
                <div className="recent-bookings card">
                    <div className="card-header">
                        <h2 className={'experience-text'} style={{color:'navy', width:'60%'}}>Recent Bookings</h2>
                        {last7DaysBooking.length > 0 &&
                            <button
                                onClick={() => navigate('/bookinglist')}
                                className="btn-view-all" style={{color:'red'}}>
                                View All
                            </button>
                        }
                    </div>
                    {last7DaysBooking.length > 0 && <div className="card-body">
                        <div className="grid-container">
                            {last7DaysBooking.map(booking => (
                                <div key={booking.id} className="service-card">
                                    <div style={{display:'flex', alignItems:'center', marginBottom:'10px'}}>
                                        <h4 style={{textAlign:'start', width:'60%'}}>Stats: {booking.duration}</h4>
                                        <h4 style={{textAlign:'end', width:'40%', color:'blue'}}>£{booking.estimatedAmount}</h4>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                        <FaUser className="icon-small" />
                                        <p>{renderName(booking.customer)}</p>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                        <FaMapMarkerAlt className="icon-small"/>
                                        <p>{booking.address}</p>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                        <FaClock className="icon-small" />
                                        <p> {getTime(booking.startTime)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> }
                    {(!loading && last7DaysBooking.length <= 0) && <p>{message}</p>}
                </div>
            </div>}
            {loading && (<div><p>Loading data...</p></div>)}
        </div>
    );
};

export default Bookings;