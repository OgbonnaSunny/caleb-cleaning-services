
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
import { useNavigate } from 'react-router-dom';
import {differenceInDays, format, isToday} from 'date-fns';

const Bookings = ( {cancellable =  false, user, history = false }) => {
    const navigate = useNavigate();
    const bookings = [
        { id: 1, postcode: "G10AS", cleanerEmail:'ogbonnasundaycy@gmail.com', cleaner: 'Sunday Ogbonna', customer: "Sarah Johnson", address: "25 Park Lane, London", date: '3 months ago', time: "Today, 10:00 AM", nature: 'Light', plan: "One-off", status: "confirmed", duration: "2h 45m", estimatedAmount: 45.76 },
        { id: 2, postcode: "O10AS", cleanerEmail:'ogbonnasundaycy@gmail.com',  cleaner: 'Sunday Ogbonna', customer: "Michael Brown", address: "42 Kensington High St", date: '6 months ago', time: "Today, 12:30 PM", nature: 'Light', plan: "One-off", status: "confirmed", duration: "1h 20m", estimatedAmount: 16.99  },
        { id: 3, postcode: "W10AR", cleanerEmail:'ogbonnasundaycy@gmail.com', cleaner: 'Jane Dia',  customer: "Emma Wilson", address: "7 Chelsea Bridge Rd", date:'9 months ago', time: "Today, 2:00 PM", nature: 'Medium', plan: "Subscription", status: "pending", duration: "45m", estimatedAmount: 62.00  },
        { id: 4, postcode: "G10AS", cleanerEmail:'ogbonnasundaycy@gmail.com', cleaner: 'Samantha Bay',  customer: "David Smith", address: "33 Baker Street", date:'1 year ago', time: "Tomorrow, 9:00 AM", nature: 'Medium', plan: "One-off", status: "confirmed", duration: "3h 55m", estimatedAmount: 95.12  },
        { id: 5, postcode: "B10AS", cleanerEmail:'hjj@gmail.com', cleaner: 'June Far', customer: "Lisa Taylor", address: "18 Oxford Street", date:'3 weeks ago', time: "Tomorrow, 11:00 AM", nature: 'Heavy', plan: "One-off", status: "cancelled", duration: "4h 05m", estimatedAmount: 25.06  }
    ];

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
        if (email === null || email === undefined) {
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
                    if ( booking && booking.length > 0) {
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
            if (email === null || email === undefined) return;
            setLoading(true);
            try {
                let offset = 0;
                if (clientHistory.length > 0) {
                    offset = clientHistory[clientHistory.length - 1].id;
                }
                const data = {email: email, limit: page, offset: offset};
                const response = await api.post('/api/booking/client-history', data);
                const { booking } = response.data;
                if ( booking && booking.length > 0) {
                    setClientHistory(prev => {
                        const map = new Map(prev.map(item => [item.id, item])); // old items
                        booking.forEach(item => map.set(item.id, item));    // add/replace new
                        return Array.from(map.values()).sort((a, b) => a.id - b.id); // convert back to array
                    });

                }
                else {
                    if (clientHistory.length <= 0) {
                        setHistoryMessage("No history of  booking found");
                    }
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

                if (!loading) {
                    setPageCount(prev => prev + 1);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]);

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

    const getTime = (date) => {
        const invalidDate = isNaN(new Date(date).getTime());
        if (invalidDate) {
            return new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        const now = isToday(new Date(date));
        if (now) {
            return 'Today'+ " "+ new Date(date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        const diff = differenceInDays(new Date(date), new Date());
        if (diff === 1) {
            return 'Tomorrow'+ " "+ new Date(date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        if (diff === 2) {
            return '2 days time'+ " "+ new Date(date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        return format(new Date(date), 'EE, yyyy-MM-dd') + " "+ new Date(date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    return (
        <div className={'support-page'} style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            {user === 'client' &&
                <div>
                    {!history && (<div>
                        <div className="recent-bookings card">
                            <div className="card-header">
                                <h2 className={'experience-text'} style={{color:'navy'}}>Active booking</h2>
                            </div>
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
                                                <p> {booking.time}</p>
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
                                            <button onClick={() => cancelBooking(booking.orderId)} className="btn btn-primary"
                                                    style={(booking.status === 'confirmed' || booking.status === 'cancelled' || cancelledIds.includes(booking.orderId) || loading) ? {borderRadius:'30px', backgroundColor:'grey', color:'black', marginTop:'6px'} :
                                                        !cancellable ? {borderRadius:'30px', backgroundColor:'green', color:'white', marginTop:'6px'} :
                                                            {borderRadius:'30px', backgroundColor:'red', color:'white', marginTop:'6px'}}
                                                    disabled={(booking.status === 'confirmed' || booking.status === 'cancelled' || loading || cancelledIds.includes(booking.orderId))}>
                                                {cancellable ? 'Cancel booking' : 'Assign cleaner'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div> }
                        </div>
                        {(!loading && allBookingData.length <= 0) && <div style={{marginLeft:'30px'}}><p>{message}</p></div>}
                    </div>)}
                    {history && (<div>
                        <div className="recent-bookings card">
                            <div className="card-header">
                                <h2 className={'experience-text'} style={{color:'navy'}}>History</h2>
                            </div>
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
                                                <p> {booking.date}</p>
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
                </div>
            }
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