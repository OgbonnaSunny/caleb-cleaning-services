import React, {useState, useEffect } from "react";
import LOGO from "../images/logo4.png";
import {
    FaCalendarCheck,
    FaCommentDots,
    FaQuestionCircle,
    FaUserTie,
    FaCalendarAlt,
    FaHome, FaTimes,
    FaMapMarkerAlt, FaClock, FaCheckCircle, FaTimesCircle, FaUser, FaPhone
} from "react-icons/fa";
import {MdAdd} from "react-icons/md";
import Bookings from "./Bookings.jsx";
import api from "./api.js";
import {differenceInDays, format, isToday} from "date-fns";
import booking from "./Booking.jsx";

const BookingList = () => {
    const [title, setTitle] = useState('Jobs For Approval');
    const [message, setMessage] = useState('');
    const [activeBottomMenu, setActiveBottomMenu] = useState('Jobs');
    const [todayBooking, setTodayBooking] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [recentBookings, setRecentBookings] = useState([]);
    const [todaySchedule, setTodaySchedule] = useState([])
    const [approvedBookings, setApprovedBookings] = useState([]);
    const [role, setRole] = useState('Support');
    const [approvalMessage, setApprovalMessage] = useState(null);
    const [approvedIds, setApprovedIds] = useState([]);
    const [approvedMessage, setApprovedMessage] = useState(null);
    const [loadingApproval, setLoadingApproval] = useState(false);
    const [manageIds, setManageIds] = useState(-1);
    const [assignedIds, setAssignedIds] = useState([]);

    const bottomNavItems = [
        {id: 1, category: 'Jobs', title: 'Jobs For Approval'},
        {id: 2, category: 'Today', title: ['Today\' Booking']},
        {id: 3, category: 'Recent', title: ['Recent Booking']},
        {id: 4, category: 'Schedule', title: ['Today \' Schedule']},
    ];

    useEffect(() => {
        if (window.innerWidth > 768) {
            setPage(20);
            return;
        }
        setPage(10);
    }, []);

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
        const user = JSON.parse(localStorage.getItem("user"));
        if (user === null || user === undefined) return;
        api.post('/api/users/admin', {email: user.email})
            .then((res) => {
                const role = res.data.role;
                setRole(role)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

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

    useEffect(() => {
        document.title = "Jobs";
    }, []);

    useEffect(() => {
        if (activeBottomMenu === 'Today') {
            setLoading(true);
            let offset = 0;
            if (todayBooking.length > 0) {
                offset = todayBooking[todayBooking.length - 1].id;
            }
            const data = {limit: page, offset: offset };
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
                            setMessage("No booking found for today");
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

    }, [activeBottomMenu, pageCount]);

    useEffect(() => {
        if (activeBottomMenu === 'Recent') {
            setLoading(true);
            let offset = 0;
            if (recentBookings.length > 0) {
                offset = recentBookings[recentBookings.length - 1].id;
            }
            const data = {limit: page, offset: offset};
            api.post('/api/booking/last-seven-days', data)
                .then((res) => {
                    const { booking } = res.data;
                    if (booking.length > 0) {
                        setRecentBookings(prev => {
                            const map = new Map(prev.map(item => [item.id, item])); // old items
                            booking.forEach(item => map.set(item.id, item));    // add/replace new
                            return Array.from(map.values()).sort((a, b) => a.id - b.id); // convert back to array
                        });
                    }
                    else {
                        if (recentBookings.length <= 0) {
                            setMessage("No recent  bookings found");
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
    }, [activeBottomMenu, pageCount]);

    useEffect(() => {
       if (activeBottomMenu === 'Schedule') {
           setLoading(true);
           let offset = 0;
           if (todaySchedule.length > 0) {
               offset = todaySchedule[setTodaySchedule.length - 1].id;
           }
           const data = {limit: page, offset: offset};
           api.post('/api/booking/today-schedule', data)
               .then(res => {
                   const { booking } = res.data;
                   if (!booking || booking.length <= 0) {
                       setMessage("No booking schedule for today");
                       return;
                   }
                   setTodaySchedule(prev => {
                       const map = new Map(prev.map(item => [item.id, item])); // old items
                       booking.forEach(item => map.set(item.id, item));    // add/replace new
                       return Array.from(map.values()).sort((a, b) => a.id - b.id); // convert back to array
                   });
               })
               .catch(err => {
                   console.log(err);
                   setMessage("Error fetching schedules");
               })
               .finally(() => {
                   setLoading(false);
               })
       }
    }, [activeBottomMenu, pageCount])

    useEffect(() => {
        if (activeBottomMenu === 'Jobs') {
            setLoading(true);
            let offset = 0;
            if (approvedBookings.length > 0) {
                offset = approvedBookings[approvedBookings.length - 1].id;
            }
            const data = {limit: page, offset: offset};
            api.post('/api/booking/get-approval', data)
                .then(res => {
                    const { booking } = res.data;
                    if (!booking || booking.length <= 0 && approvedBookings.length <= 0) {
                        setMessage("No booking for approval found for today");
                        return;
                    }
                    setApprovedBookings(prev => {
                        const map = new Map(prev.map(item => [item.id, item]));
                        booking.forEach(item => map.set(item.id, item));
                        return Array.from(map.values()).sort((a, b) => a.id - b.id);
                    })
                })
                .catch(err => {
                    console.log(err);
                    setMessage("Error while fetching jobs for approval");
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [activeBottomMenu, pageCount]);

    useEffect(() => {
        if (approvalMessage !== null) {
            setTimeout(() => setApprovalMessage(null), 5000);
        }
    }, [approvalMessage])

    function CallButton({ phoneNumber }) {
        return (
            <div style={{width:'50%'}}>
                <p>
                    <a href={`tel:${phoneNumber}`} style={{ color: "blue" }}>
                        Call
                    </a>
                </p>
            </div>
        );
    }

    const formatDuration = (time) => {
        if (time === null || time === undefined || time.toString().length <= 0) {return }
        const times = time.split(':');
        if (times.length > 1) {
            return `${times[0]} ${times[1]}`;
        }
        return time;
    }

    const TodayBookings = ({ todayBooking, message }) => {
        if ( !todayBooking || todayBooking.length <= 0) {
            return <p style={{margin:'10px'}}>{message}</p>;
        }
        return (
            <div className="card-body">
                <div className="grid-container">
                    {todayBooking.map(booking => (
                        <div key={booking.id} className="service-card">
                            <h4 style={{textAlign:'center', marginBottom:'10px'}}>{booking.orderId}</h4>
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
                                <h4 style={{textAlign:'end'}}>{formatDuration(booking.duration)}</h4>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                <h4>{booking.plan}</h4>
                                <p style={booking.nature === 'Light' ? {color:'green', textAlign:'end'} :
                                    booking.nature === 'Medium' ? {color:'lightpink', textAlign:'end'}: {color:'red', textAlign:'end'}}>
                                    {booking.nature}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {loading && <p>Loading...</p>}
            </div>
        );
    }

    const Recent = ({ last7DaysBooking, message }) => {
        if (!last7DaysBooking || last7DaysBooking.length <= 0) {
            return <p style={{margin:'10px', textAlign:'center'}}>{message}</p>;
        }

        return (
            <div className="recent-bookings card">
                <div className="card-body">
                    <div className="grid-container">
                        {last7DaysBooking.map(booking => (
                            <div key={booking.id} className="service-card">
                                <h4 style={{textAlign:'center', marginBottom:'10px'}}>{booking.orderId}</h4>
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
                                    <h4 style={{textAlign:'end'}}>{formatDuration(booking.duration)}</h4>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                    <h4>{booking.plan}</h4>
                                    <p style={booking.nature === 'Light' ? {color:'green', textAlign:'end'} :
                                        booking.nature === 'Medium' ? {color:'lightpink', textAlign:'end'}: {color:'red', textAlign:'end'}}>
                                        {booking.nature}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {loading && <p>Loading...</p>}
            </div>
        );
    }

    const Cleaner = ({ booking }) => {
        if (role === 'Support') {
            setManageIds(-1)
            return;
        }
        if (!booking) {
            return <p>Booking data not found</p>;
        }
        const [email, setEmail] = useState('');
        const [message, setMessage] = useState('');
        const [loadingData, setLoadingData] = useState(false);

        useEffect(() => {
            if (message !== null) {
                setTimeout(() => setMessage(null), 3000);
            }
        }, [message]);

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (loadingData) {
                return;
            }
            setLoadingData(true);
            try {
                const data = { cleanerEmail: email, orderId: booking.orderId };
                const response = await api.post('/api/booking/assign-booking', data);
                const {success, message} = response.data;
                setMessage(message);
                if (success) {
                    setAssignedIds(prev => [...prev, booking.orderId]);
                }

            } catch (error) {
                console.log(error);
                setMessage("Error occured")
            } finally {
                setLoadingData(false);
            }
        }

        if (booking.accepted) {
            return (
                <div style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
                    <div style={{display: 'flex', flexDirection:'column', alignItems: 'center', padding:'10px'}}>
                        <p style={{display:'flex', alignItems:'center', justifyContent:'space-evenly'}}>Cleaner Details  <FaTimes size={20} style={{ width:'30px'}} onClick={() => setManageIds(-1)} /></p>
                        <ul style={{marginLeft:'10px'}}>
                            <li>{booking.cleaner}</li>
                            <li>{booking.cleanerEmail}</li>
                            <li>{booking.cleanerPhone}</li>
                        </ul>

                    </div>
                </div>
            )
        }
        return (
            <form style={{display: 'flex', flexDirection:'column',
                alignItems: 'center', justifyContent:'space-evenly', padding:'10px', border:'dashed', gap:'10px'}}
                  onSubmit={handleSubmit} className={'form-group'}>
                <h4>Add cleaner email to assign this job</h4>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter cleaner email"
                    className="button-bg"
                    style={{padding:'10px'}}
                    required={true}
                />
                {message && <p style={{margin:'10px'}}>{message}</p>}
                {loadingData && <p style={{margin:'10px'}}>Loading...</p>}
                <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center', gap:'10px', margin:'10px'}}>
                    <button
                        disabled={assignedIds.includes(booking.orderId)}
                        style={{border:'none', flexFlow:'1'}}
                        type={'submit'} className={(loadingData || assignedIds.includes(booking.orderId)) ? "back-button" : 'submit-button'}>
                        {assignedIds.includes(booking.orderId) ? "Job assigned" : " Assign job"}
                    </button>
                    <FaTimes size={30} style={{ width:'40px'}} onClick={() => setManageIds(-1)} />
                </div>
            </form>
        )
    }

    const Schedule = ({ todaySchedule, message }) => {
        if (!todaySchedule || todaySchedule.length <= 0) {
            return <p style={{textAlign:'center'}}>{message}</p>;
        }
        return (
            <div >
                <div className="cleaning-schedule card">
                    {todaySchedule.length > 0 &&  <div className="card-body">
                        <div className="grid-container">
                            {todaySchedule.map(item  => (
                                <div key={item.orderId} className="stats-card">
                                    <h3 style={{textAlign:'center'}}>{renderName(item.customer)}</h3>
                                    <div className="schedule-time">
                                        <FaClock className="icon-small" />
                                        <span>{getTime(item.startTime)}</span>
                                    </div>
                                    <div className="schedule-details">
                                        <div className="schedule-time">
                                            <FaMapMarkerAlt className="icon-small" />
                                            <span>{item.address}</span>
                                        </div>
                                    </div>
                                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-evenly', margin:'10px'}}>
                                        <p style={{marginLeft:'10px'}}>{item.plan} <strong>{formatDuration(item.duration)}</strong></p>
                                        <h3 style={{marginLeft:'10px', textAlign:'end', width:'40%'}}>£{item.estimatedAmount}</h3>
                                    </div>
                                    {manageIds === item.orderId && <Cleaner booking={item}/>}
                                    <button
                                        disabled={(assignedIds.includes(item.orderId) || manageIds === item.orderId)}
                                        onClick={() => setManageIds(item.orderId)}
                                        className={(manageIds === item.orderId || manageIds !== -1 || assignedIds.includes(item.orderId)) ? 'back-button' : "submit-button"}>
                                        {item.accepted ? "View Cleaner Detail" : "Manage Schedule"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div> }
                    {(!loading && todaySchedule.length <= 0) && (<p>{message}</p>)}
                    {loading && (<p>Loading data...</p>)}
                </div>
            </div>
        );
    }

    const approve = async (booking) => {
        if (role === null || role === undefined || role === 'Support') {
            setApprovalMessage("You do not have clearance to approve jobs");
            return;
        }
        if (loadingApproval) return;
        setLoadingApproval(true);
        setApprovedMessage(null)
        try {
            const response = await api.post('/api/booking/approval-booking', {orderId: booking.orderId, cleanerEmail: booking.cleanerEmail , cleanerName: booking.cleaner })
            const { success, message} = response.data;
            if (success) {
                setApprovedIds(prev => [...prev, booking.orderId]);
            }
            setApprovedMessage(message)
        } catch (error) {
            console.error(error)
            setApprovedMessage("Error occured")
        }finally {
            setLoadingApproval(false);
        }
    }

    const ApproveJob = ({ jobs, message, notice }) => {
        if (notice) {
            return <p style={{textAlign:'center'}}>{notice}</p>;
        }
        if (!jobs || jobs.length <= 0) {
            return <p style={{textAlign:'center'}}>{message}</p>;
        }

        return (
            <div >
                <div className="cleaning-schedule card">
                    <div className="grid-container">
                        {jobs.map(booking  => (
                            <div key={booking.id} className="service-card">
                                <h3 style={{textAlign:'center'}}>{renderName(booking.customer)}</h3>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                    <FaMapMarkerAlt className="icon-small"/>
                                    <p>{booking.address}</p>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                    <FaClock className="icon-small" />
                                    <p> {getTime(booking.startTime)}</p>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                    <p>Amount</p>
                                    <h4 style={{textAlign:'end'}}>£{booking.estimatedAmount}</h4>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                    <p>Duration</p>
                                    <h4 style={{textAlign:'end'}}>{formatDuration(booking.duration)}</h4>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                    <h4>{booking.plan}</h4>
                                    <p style={booking.nature === 'Light' ? {color:'green', textAlign:'end'} :
                                        booking.nature === 'Medium' ? {color:'lightpink', textAlign:'end'}: {color:'red', textAlign:'end'}}>
                                        {booking.nature}
                                    </p>
                                </div>
                                <div style={{display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent:'space-between', padding:'10px'}}>
                                    <h4 style={{marginLeft:'10px'}}>Cleaner Details</h4>
                                    <ul style={{marginLeft:'10px'}}>
                                        <li>{booking.cleaner}</li>
                                        <li>{booking.cleanerEmail}</li>
                                        <li>{booking.cleanerPhone} </li>
                                    </ul>

                                </div>
                                {loadingApproval && <p>loading...</p>}
                                {approvedMessage && <p>{approvedMessage}</p>}
                                <button
                                    disabled={(loadingApproval || approvedIds.includes(booking.orderId))} onClick={() => approve(booking)}
                                    style={{marginTop:'10px'}} className={(loadingApproval || approvedIds.includes(booking.orderId)) ? 'back-button' : 'submit-button' }>
                                    Approve
                                </button>
                            </div>
                        ))}
                    </div>
                    {loading && (<p>Loading data...</p>)}
                </div>
            </div>
        );
    }

    return (
        <div className="sticky-nav-container">
            <nav  className='top-order-nav'>
                <div className="nav-order-content">
                    <div style={{display:'flex', flexDirection:'row', marginLeft:'20px', marginRight:'20px', alignItems:'center'}}>
                        <div style={{ display:'flex', alignItems: 'center', gap:'10px' }}>
                            <img src={LOGO} className={'logo-icon'}/>
                            <h2 style={{textAlign:'start'}}>{title}</h2>
                        </div>
                    </div>

                </div>
            </nav>

            <main className={["main-content", "main-banner"].join(" ")}>
                {activeBottomMenu === "Today" && <TodayBookings todayBooking={todayBooking} message={message} />}
                {activeBottomMenu === "Recent" && <Recent last7DaysBooking={recentBookings} message={message} /> }
                {activeBottomMenu === "Schedule" && <Schedule todaySchedule={todaySchedule} message={message} />}
                {activeBottomMenu === "Jobs" && <ApproveJob jobs={approvedBookings} message={message} notice={approvalMessage} />}
            </main>

            <nav  className='bottom-order-nav'>
                <div className="nav-order-content">
                    {bottomNavItems.map((item, index) => (
                        <div key={`bottom-${item.id}`} className="nav-order-item"
                             onClick={() => {setActiveBottomMenu(item.category); setTitle(item.title)}}>
                            <div className={'book-list'} style={activeBottomMenu === item.category ? {color:'blue'} : {color:''}}>
                                <FaCalendarAlt className="logo-icon2" />
                                <h3  style={activeBottomMenu === item.category ?
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
export default BookingList;