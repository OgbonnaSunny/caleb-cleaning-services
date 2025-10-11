import React, {useState, useEffect } from "react";
import LOGO from "../images/logo4.png";
import {
    FaCalendarCheck,
    FaCommentDots,
    FaQuestionCircle,
    FaUserTie,
    FaCalendarAlt,
    FaHome, FaTimes,
    FaMapMarkerAlt, FaClock, FaCheckCircle, FaTimesCircle, FaUser, FaPhone, FaEnvelope, FaSearch
} from "react-icons/fa";
import {MdAdd, MdKeyboardArrowRight} from "react-icons/md";
import Bookings from "./Bookings.jsx";
import api from "./api.js";
import {differenceInCalendarDays, differenceInDays, differenceInMinutes, format, isToday} from "date-fns";
import booking from "./Booking.jsx";
import {date} from "yup";
import Income from "./Income.jsx";

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

    const [finishJobs, setFinishJobs] = useState(false);
    const [finishTodayJobs, setFinishTodayJobs] = useState(false);
    const [finishRecentJobs, setFinishRecentJobs] = useState(false);
    const [finishScheduleJobs, setFinishScheduleJobs] = useState(false);
    const [finishAllJobs, setFinishAllJobs] = useState(false);
    const [allJobs, setAllJobs] = useState([]);
    const [searchDatabase, setSearchDatabase] = useState('');
    const [extensionList, setExtensionList] = useState([]);
    const [extendCount, setExtendCount] = useState(0);
    const [totalOT, setTotalOT] = useState(0);
    const [approveExtension, setApproveExtension] = useState(false);
    const [updateCount, setUpdateCount] = useState(0);
    const [idleCount, setIdleCount] = useState(0);
    const [filter, setFilter] = useState('');
    const [email, setEmail] = useState('');
    const [schedules, setSchedules] = useState({});
    const [loadingSchedules, setLoadingSchedules] = useState(false);
    const [editId, setEditId] = useState(null);
    const [booking, setBooking] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [clickCount, setClickCount] = useState(0);


    const bottomNavItems = [
        {id: 1, category: 'Jobs', title: 'Jobs For Approval'},
        {id: 2, category: 'Today', title: ['Today\' Booking']},
        {id: 3, category: 'Recent', title: ['Recent Booking']},
        {id: 4, category: 'Schedule', title: ['Today \' Schedule']},
        {id: 5, category: 'All', title: ['All Booking']},
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
            setFinishJobs(false);
            setFinishTodayJobs(false);
            setFinishRecentJobs(false);
            setFinishScheduleJobs(false);
            setFilter('');
    }, [activeBottomMenu]);

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
        const parsed = new Date(date);
      //  console.log(parsed);
        if (isNaN(parsed.getTime())) {
            return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true  });
        }

        if (isToday(parsed)) {
            return "Today " + " " + parsed.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
        }

        const diff = differenceInCalendarDays(parsed, new Date());

        if (diff === 1) {
            return "Tomorrow " + " " + parsed.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
        }

        if (diff === 2) {
            return "In 2 days" + " " + parsed.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
        }

        return format(parsed, "EEE do MMM, yyyy h:mm a");
    }

    useEffect(() => {
        document.title = "Jobs";
    }, []);

    useEffect(() => {
        setMessage('');
        if (activeBottomMenu === 'Today' && !loading && !finishTodayJobs) {
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
                        setFinishTodayJobs(true)

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
        setMessage('');
        if (activeBottomMenu === 'Recent' && !loading && !finishRecentJobs) {
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
                        setFinishRecentJobs(true)
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
        if (booking) return;
        setMessage('');
       if (activeBottomMenu === 'Schedule' && !loading && !finishScheduleJobs) {
           setLoading(true);
           let offset = 0;
           if (todaySchedule.length > 0) {
               offset = todaySchedule[setTodaySchedule.length - 1].id;
           }
           const data = {limit: page, offset: offset};
           api.post('/api/booking/all-schedule', data)
               .then(res => {
                   const { booking } = res.data;
                   if (!booking || booking.length <= 0) {
                       setFinishScheduleJobs(true)
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
        setMessage('');
        if (activeBottomMenu === 'Jobs' && !loading && !finishJobs) {
            setLoading(true);
            let offset = 0;
            if (approvedBookings.length > 0) {
                offset = approvedBookings[approvedBookings.length - 1].id;
            }
            const data = {limit: page, offset: offset};
            api.post('/api/booking/get-approval', data)
                .then(res => {
                    const { booking } = res.data;
                    if (approvedBookings?.length <= 0 && booking?.length <= 0) {
                        setMessage("No booking for approval found for today");
                        return;
                    }
                    setApprovedBookings(prev => {
                        const map = new Map(prev.map(item => [item.id, item]));
                        booking.forEach(item => map.set(item.id, item));
                        return Array.from(map.values()).sort((a, b) => a.id - b.id);
                    })
                    if (booking?.length <= 0) {
                        setFinishJobs(true)
                    }
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
        setMessage('');
        if (activeBottomMenu === 'All' && !loading && !finishAllJobs) {
            setLoading(true);
            let offset = 0;
            if (allJobs.length > 0) {
                const jobs = allJobs;
                jobs.sort((a, b) => a.id - b.id);
                offset = jobs[jobs.length -1].id;
            }
            const data = {limit: page, offset: offset};
            api.post('/api/booking/all-booking-admin', data)
                .then(res => {
                    const { booking } = res.data;
                    if (allJobs?.length <= 0 && booking?.length <= 0) {
                        setMessage("No booking at the moment");
                        return;
                    }
                    setAllJobs(prev => {
                        const map = new Map(prev.map(item => [item.id, item]));
                        booking.forEach(item => map.set(item.id, item));
                        return Array.from(map.values()).sort((a, b) => b.id - a.id);
                    })
                    if (booking?.length <= 0) {
                        setFinishAllJobs(true)
                    }
                })
                .catch(err => {
                    console.log(err);
                    setMessage("Error while fetching booking");
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [activeBottomMenu, pageCount]);

    useEffect(() => {
        api.get('/api/booking/ot-list')
            .then(res => {
                const { booking } = res.data;
                setExtensionList([]);
                setExtensionList(prev => {
                    const map = new Map(prev.map(item => [item.id, item]));
                    booking.forEach(item => map.set(item.id, item));
                    return Array.from(map.values()).sort((a, b) => b.id - a.id);
                })
                let allOT = 0;
                for (const book of booking) {
                    allOT = allOT + book?.extra;
                }
                setTotalOT(allOT);
            })
            .catch(err => {
                console.log(err);
            })
    }, [extendCount]);

    useEffect(() => {
        if (loading || updateCount <= 0) { return; }
        setLoading(true);
        api.get('/api/booking/job-updates')
            .then(res => {
                const { booking } = res.data;
                if (booking?.length <= 0) {
                    setMessage("No job is in progress for now");
                    return;
                }
                setAllJobs(prev => {
                    const map = new Map(prev.map(item => [item.id, item]));
                    booking.forEach(item => map.set(item.id, item));
                    return Array.from(map.values()).sort((a, b) => b.id - a.id);
                })
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [updateCount]);

    useEffect(() => {
        if (loading || idleCount <= 0) { return; }
        setLoading(true);
        api.get('/api/booking/idle-jobs')
            .then(res => {
                const { booking } = res.data;
                if (booking?.length <= 0) {
                    setMessage("No idle job. All jobs are either in progress or completed");
                    return;
                }
                setAllJobs(prev => {
                    const map = new Map(prev.map(item => [item.id, item]));
                    booking.forEach(item => map.set(item.id, item));
                    return Array.from(map.values()).sort((a, b) => b.id - a.id);
                })
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [idleCount]);

    useEffect(() => {
        if (approvalMessage !== null) {
            setTimeout(() => setApprovalMessage(null), 5000);
        }
    }, [approvalMessage])

    useEffect(() => {
        if (!email || loadingSchedules) {
            return;
        }
        setLoadingSchedules(true);
        const data = {email: email };
        api.post('/api/booking/cleaner-schedules', data)
            .then((response) => {
                const { booking } = response.data;
                setSchedules(prev => ({
                    ...prev,
                    [email]: booking
                }))
                console.log(booking);
            })
            .catch((error) => {
                console.log(error);
                setMessage("Error while fetching booking data.");
            })
            .finally(() => {
                setLoadingSchedules(false);
                setEmail('');
            })
    }, [email])

    useEffect(() => {
        setMessage('');
    }, [activeBottomMenu]);

    function CallButton({ phoneNumber }) {
        return (
            <div style={{width:'50px'}}>
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

    const getPostcode = (postcode) => {
        if (!postcode) {return;}
        const cleanedPostcode = postcode?.replace(/\s/g, "").toUpperCase();
        const normalPostcode =  cleanedPostcode?.slice(0, -3) + " " + cleanedPostcode?.slice(-3);
        return normalPostcode;
    }

    useEffect(() => {
        function setWatcher(watch = true) {
            setInterval(() => {
                setExtendCount(prev => prev + 1);
                if (!watch) {
                    clearInterval();
                }

            }, 60000);
        }
        setWatcher();
    }, []);

    const TodayBookings = ({ todayBooking, message }) => {

        if (todayBooking?.length <= 0) {
            return <p style={{margin:'10px'}}>{message ? message : "No booking found for today"}</p>;
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

        if (last7DaysBooking?.length <= 0) {
            return <p style={{margin:'10px', textAlign:'center'}}>{message ? message : "No recent  bookings found"}</p>;
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
                {loading && <p style={{margin:'10px'}}>Loading...</p>}
            </div>
        );
    }

    const revoke = async (e) => {
        e.preventDefault();
        if (processing) {
            return;
        }
        setProcessing(true);
        try {
            const data = { orderId: booking.orderId };
            const response = await api.post('/api/booking/revoke-job', data);
            const {success, message} = response.data;
            setMessage(message);
            if (success) {
                setAssignedIds(prev => [...prev, booking.orderId]);
            }

        } catch (error) {
            console.log(error);
            setMessage("Error occured")
        } finally {
            setProcessing(false);
            setClickCount(0);
        }
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

        if (booking.accepted && manageIds === booking.orderId) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection:'column',
                    alignItems: 'center'}}>
                    <div style={{
                        display: 'flex',
                        flexDirection:'column',
                        alignItems: 'center',
                        padding:'10px'
                    }}>
                        <p style={{
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'space-evenly'
                        }}>
                            Cleaner Details  <FaTimes size={20} style={{ width:'30px'}} onClick={() => setManageIds(-1)} /></p>
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
                    <FaTimes size={30} style={{ width:'40px'}} onClick={() => {
                        setEditId(null);
                        setMessage('');
                    }} />
                </div>
            </form>
        )
    }

    const Schedule = ({ todaySchedule, message }) => {
        if (todaySchedule?.length <= 0) {
            return <p style={{textAlign:'center'}}>{message ? message : "No booking schedule for today"}</p>;
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

                                    {booking === item &&
                                        <div style={{
                                            display:'flex',
                                            flexDirection:'column',
                                            border:'dashed',
                                            padding:'10px',
                                            marginTop:'10px'}}>
                                            <p>You can either remove this job from the current cleaner that this job
                                                is assigned to and make it available to all cleaners or assign this job to a particular cleaner.
                                                {item.accepted === 1 && <label> You could also view cleaner details.</label>}
                                            </p>

                                            {editId === item.orderId && <Cleaner booking={booking}/>}

                                            {processing && <p style={{margin:'15px'}}>Loading...</p>}

                                            {message && <p style={{margin:'15px'}}>{message}</p>}

                                            {clickCount > 0 &&
                                                <p style={{margin:'15px', color:'darkred'}}>
                                                    Are you sure you want to revoke this job. This cannot be undone.
                                                    If you are sure that  you want to revoke this job, click the 'Proceed'.
                                                    <FaTimes size={30}
                                                             style={{ width:'20px',height:'15px', color:'black', marginLeft:'15px'}}
                                                             onClick={() => {
                                                                 setClickCount(0);
                                                             }} />

                                                    <label onClick={revoke} style={{color:'red', marginLeft:'10px'}}>Proceed</label>
                                                </p>
                                            }

                                            <div style={{gap:'10px'}} className={'form-actions'}>
                                                <button
                                                    style={{color:'white'}}
                                                    disabled={manageIds === item.orderId || editId === item.orderId || item.accepted === 0}
                                                    onClick={() => setManageIds(item.orderId)}
                                                    className={(manageIds === item.orderId || editId === item.orderId || item.accepted === 0) ?
                                                        'back-button' : "submit-button"}>
                                                    View
                                                </button>
                                                <button  onClick={() => setEditId(item.orderId)}
                                                         disabled={manageIds === item.orderId || editId === item.orderId}
                                                         style={{color:'white'}}
                                                         className={manageIds === item.orderId ? 'back-button' : 'next-button' }>
                                                    Assign
                                                </button>
                                                <button
                                                    style={{color:'white'}}
                                                    onClick={() => setClickCount(prev => prev + 1)}
                                                    disabled={(manageIds === item.orderId || editId === item.orderId || item.accepted === 0
                                                        || assignedIds.includes(item.orderId) || clickCount > 0)}
                                                    className={(manageIds === item.orderId || editId === item.orderId
                                                        || item.accepted === 0 || assignedIds.includes(item.orderId) || clickCount > 0) ?
                                                        'back-button' : "submit-button"}>
                                                    Revoke
                                                </button>
                                            </div>
                                        </div>
                                    }
                                    <div style={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'space-evenly',
                                        margin:'10px'}}>
                                        <button style={{margin:'10px'}}
                                                className={booking !== null ? 'back-button' :'next-button' }
                                                disabled={booking !== null}
                                                onClick={() => setBooking(item)}>
                                            Manage Booking
                                        </button>
                                        {booking === item &&
                                            <FaTimes size={30}
                                                     style={{ width:'40px'}}
                                                     onClick={() => {
                                                         if (manageIds === item.orderId || editId === item.orderId) return;
                                                         setBooking(null);
                                                         setClickCount(0);
                                                         setMessage('');
                                                     }} />
                                        }
                                    </div>
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
            const response = await api.post('/api/booking/approval-booking', {
                orderId: booking.orderId,
                cleanerEmail: booking.cleanerEmail ,
                cleanerName: booking.cleaner,
                cleanerEmail2: booking?.cleanerEmail2 ,
                cleanerName2: booking?.cleaner2,
            })
            const { success, message} = response.data;
            setApprovedMessage(message)
            if (success) {
                setApprovedIds(prev => [...prev, booking.orderId]);
                const prevOrder = approvedBookings.filter(book => book.orderId !== booking.orderId);
                setTimeout(() => setApprovedBookings(prevOrder), 1000);
            }
        } catch (error) {
            console.error(error)
            setApprovedMessage("Error occured")
        }finally {
            setLoadingApproval(false);
        }
    }

    const ApproveJob = ({ jobs, message, notice }) => {
        const [detailsId, setDetailsId] = useState(null);
        if (notice) {
            return <p style={{textAlign:'center'}}>{notice}</p>;
        }
        if (jobs?.length <= 0) {
            return <p style={{textAlign:'center'}}>{message ? message : "No booking for approval found for today"}</p>;
        }

        return (
            <div >
                <div className="cleaning-schedule card">
                    <div className="grid-container">
                        {jobs.map(booking  => (
                            <div key={booking.id} className="service-card">
                                <h3 style={{textAlign:'start'}}>{renderName(booking.customer)}</h3>
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
                                    <p>Income</p>
                                    <h4 style={{textAlign:'end'}}>£{booking?.income}</h4>
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

                                <div style={{display:'flex', alignItems:'center', marginBottom:'5px', marginTop:'10px'}}>
                                    <h3 style={{textAlign:'start'}}>Details</h3>
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

                                <div style={{display:'flex', alignItems:'center', marginBottom:'5px', marginTop:'10px'}}>
                                    <h3 style={{textAlign:'start'}}>Check job schedules</h3>
                                    <button
                                        onClick={() => {setEmail(booking.cleanerEmail);}}
                                         disabled={loadingSchedules}
                                        className={loadingSchedules ? 'back-button' : 'submit-button'}
                                        style={{width:'80px', alignSelf:'end'}}>
                                        Check
                                    </button>
                                </div>
                                {(loadingSchedules && email === booking.cleanerEmail) && <p style={{margin:'15px'}}>Loading...</p>}
                                {(!loadingSchedules && schedules[booking.cleanerEmail]?.length <= 0 ) && <p>No job schedules found for {booking?.cleaner}</p>}
                                {schedules[booking.cleanerEmail]?.length > 0 &&
                                    <div style={{display: 'flex', flexDirection:'column'}}>
                                        <p>Schedules for <strong>{booking.cleaner}</strong></p>
                                        {schedules[booking.cleanerEmail]?.map((schedule, index) => (
                                            <div key={schedule?.orderId} style={{border:'dashed', padding:'10px'}}>
                                                <p style={{textAlign:'center'}}>{index + 1}</p>
                                                <p>{schedule?.address}</p>
                                                <p>{getTime(schedule?.startTime)}</p>
                                            </div>
                                        ))}
                                    </div>
                                }

                                <div style={{
                                    display: 'flex',
                                    flexDirection:'column',
                                    alignItems: 'center',
                                    justifyContent:'space-between',
                                    padding:'10px'
                                }}>
                                    <h4 style={{marginLeft:'10px'}}>Cleaner Details</h4>
                                    <ul style={{marginLeft:'10px'}}>
                                        <li>{booking.cleaner}</li>
                                        <li>{booking.cleanerEmail}</li>
                                        <li>{booking.cleanerPhone} </li>
                                        {booking?.cleaner2 && <li style={{marginTop:'15px'}}>{booking.cleaner2}</li>}
                                        {booking?.cleanerEmail2 && <li>{booking.cleanerEmail2}</li> }
                                        {booking?.cleanerPhone2 && <li>{booking.cleanerPhone2}</li>}
                                    </ul>

                                </div>
                                {loadingApproval && <p>loading...</p>}
                                {approvedMessage && <p>{approvedMessage}</p>}
                                <button
                                    disabled={(loadingApproval || approvedIds.includes(booking.orderId))}
                                    onClick={() => approve(booking)}
                                    style={{marginTop:'10px'}}
                                    className={(loadingApproval || approvedIds.includes(booking.orderId)) ? 'back-button' : 'submit-button' }>
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

    const search = async (e) => {
        e.preventDefault()
        if (loading) return;
        setLoading(true);
        setAllJobs([]);
        try {
            const res = await api.post('/api/booking/serach-booking-admin', {orderId: searchDatabase})
            const { booking } = res.data;
            console.log(booking);
            if (booking?.length <= 0) {
                setMessage("No booking matching your order id");
                return;
            }
            setAllJobs(prev => {
                const map = new Map(prev.map(item => [item.id, item]));
                booking.forEach(item => map.set(item.id, item));
                return Array.from(map.values()).sort((a, b) => b.id - a.id);
            })
        } catch (error) {
            console.log(error);
            setMessage("Error while fetching data");
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (searchDatabase?.length <= 0) {
            setFinishAllJobs(false);
            setAllJobs([]);
            setPageCount(prev => prev + 1);
        }
    }, [searchDatabase]);

    const handleExtension = (e) => {
        e.preventDefault();
        setAllJobs([]);
        setApproveExtension(true);
        setAllJobs(extensionList);
        if (extensionList.length <= 0) {
            setMessage("No time extension  request available at this time");
        }
        if (activeBottomMenu !== "All") {
            setActiveBottomMenu('All');
            setTitle("All Booking");
        }
        setFilter('OT');

    }

    useEffect(() => {
        setMessage('');
        if (activeBottomMenu !== "All") {
            setApproveExtension(false);
        }
    }, [activeBottomMenu]);

    const AllJobs = ({ all, message, notice, approve = false }) => {
        const [detailsId, setDetailsId] = useState(null);
        const [id, setId] = useState(null);
        const [otId, setotId] = useState(null);

        if (all?.length <= 0) {
            return <p style={{margin:'20px'}}>
                {message ? message :
                    "No booking at the moment"
                }
            </p>;
        }

        function jobProgress(booking) {
            const hour = booking?.startHour;
            const minute = booking?.startMinute;
            const timeInMins = (Number(hour) * 60) + minute;
            if (booking?.actualStartTime !== null && !booking?.actualStopTime) {
                const diffInMins = Math.abs(differenceInMinutes(new Date(), new Date(booking?.actualStartTime)));
                if (diffInMins <= timeInMins) {
                    return {color: "green", message: "This job is in progress"};
                }
                if (diffInMins > timeInMins) {
                    return {color: "red", message: "This job's duration has been extended"};
                }

            }
            if (booking?.actualStartTime && booking?.actualStopTime) {
                return {color: "blue", message: "This job has been done"};
            }
            return {color: "grey", message: "This job has not been done"};
        }

        const IncomeForOT = ({ booking }) => {
            const [loadingData, setLoadingData] = useState(false);
            const [income, setIncome] = useState(0);


            async function approveOT(order) {


                try {



                } catch (error) {
                    console.log(error);
                    setApprovalMessage("Error couured")
                } finally {
                    setLoadingApproval(false);
                }
            }

            const handleSubmit = async (e) => {
                e.preventDefault();
                if (loadingApproval) {return;}

                if (income <= 0) {
                    setApprovalMessage("Please enter income");
                    return;
                }
                setLoadingApproval(true);
                try {
                    let data = {email: booking?.cleanerEmail, orderId: booking?.orderId}
                    const response = await api.post(`/api/booking/approve-ot`, data);
                    const {booking, success } = response.data;

                    data = { orderId: booking.orderId, income: income };
                    await api.post('/api/booking/add-income', data);

                    if (success) {
                        setApprovalMessage('Successfully approved');
                        setAllJobs(prev => {
                            const map = new Map(prev.map(item => [item.id, item]));
                            booking.forEach(item => map.set(item.id, item));
                            return Array.from(map.values()).sort((a, b) => b.id - a.id);
                        })
                    }
                    else {
                        setApprovalMessage('Failed to approve extension. Try again');
                    }

                } catch (error) {
                    console.log(error);
                    setApprovalMessage("Error occured")
                } finally {
                    setLoadingApproval(false);
                }
            }

            return (
                <form style={{display: 'flex', flexDirection:'column',
                    alignItems: 'center', justifyContent:'space-evenly', padding:'10px', border:'dashed', gap:'10px'}}
                      onSubmit={handleSubmit} className={'form-group'}>
                    <h4 style={{marginBottom:'15px'}}>{booking?.extra} mins duration extension for approval</h4>
                    <input
                        type="number"
                        name="email"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        placeholder="Enter cleaner income"
                        className="button-bg"
                        style={{padding:'10px'}}
                        required={true}
                    />

                    <div style={{
                        display:'flex',
                        justifyContent:'space-evenly',
                        alignItems:'center',
                        gap:'10px',
                        margin:'10px'
                    }}>
                        <button
                            disabled={loadingApproval}
                            style={{border:'none', flexFlow:'1'}}
                            type={'submit'} className={loadingApproval ? "back-button" : 'submit-button'}>
                            {booking?.income ? "Update income" : " Add income"}
                        </button>
                        <FaTimes size={30} style={{ width:'40px'}} onClick={() => {
                            setotId(null);
                        }} />
                    </div>
                </form>
            )
        }

        return (
            <div>
                <div className="cleaning-schedule card">
                    <div className="grid-container">
                        {all.map(booking  => (
                            <div key={booking.id} className="service-card">
                                <h4 style={{textAlign:'center', marginTop:'5px'}}>{booking?.orderId}</h4>

                                <div style={{display:'flex', alignItems:'center', marginTop:'10px'}}>
                                    <h4 style={{color: jobProgress(booking).color}}>{jobProgress(booking).message}</h4>
                                    <div style={{
                                        alignSelf:'end',
                                        width:'20px',
                                        height:'20px',
                                        borderRadius:'50%',
                                        backgroundColor: jobProgress(booking).color,
                                    }}>
                                    </div>
                                </div>

                                <div style={{display:'flex', alignItems:'center', marginTop:'10px'}}>
                                    <h3 style={{textAlign:'start'}}>Client details</h3>
                                    <MdKeyboardArrowRight
                                        size={50}
                                        style={{width:'40px', alignSelf:'end', marginBottom:'15px'}}
                                        onClick={() => {
                                            if (id?.length > 0 && booking.id !== id) return;
                                            if (id === null || id === undefined) {
                                                setId(booking.id);
                                                return;
                                            }
                                            setId(null);
                                        }}
                                        className={id === booking.id ? 'rotate-down' : 'rotate-up'}
                                    />
                                </div>

                                {id === booking.id && <div>
                                        <h3 style={{textAlign:'start'}}>{renderName(booking.customer)}</h3>
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'baseline', marginRight:'10px'}}>
                                            <FaPhone  className={'icon-small'} />
                                            <p>{booking.phone}</p>
                                            <CallButton phoneNumber={booking.phone} />
                                        </div>
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'baseline', marginRight:'10px'}}>
                                            <FaEnvelope  className={'icon-small'} />
                                            <p>{booking.email}</p>
                                        </div>
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'baseline'}}>
                                            <FaMapMarkerAlt className={'icon-small'}  />
                                            <p><span style={{fontWeight:'bold'}} >{getPostcode(booking.postcode)}</span> {booking.address}</p>
                                        </div>
                                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                            <FaClock className="icon-small" />
                                            <p> {getTime(booking.startTime)}</p>
                                        </div>
                                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                            <p>Amount</p>
                                            <h4 style={{textAlign:'end'}}>£{booking.estimatedAmount}</h4>
                                        </div>
                                        {booking?.income && <div style={{
                                            display: 'flex',
                                            ustifyContent:
                                                'space-between',
                                            alignItems: 'baseline'
                                        }}>
                                                <p>Cleaner income</p>
                                                <h4 style={{
                                                textAlign:'end'
                                            }}>£{booking?.income}</h4>
                                            </div> }
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
                                    </div>}

                                <div style={{display:'flex', alignItems:'center', marginTop:'10px'}}>
                                    <h3 style={{textAlign:'start', color:'darkred'}}>Job details</h3>
                                    <MdKeyboardArrowRight
                                        size={50}
                                        style={{width:'40px', alignSelf:'end', marginBottom:'15px'}}
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

                                {(booking?.cleaner && booking.cleanerEmail) &&  <div style={{
                                    display: 'flex',
                                    flexDirection:'column',
                                    alignItems: 'center',
                                    justifyContent:'space-between',
                                    padding:'10px'
                                }}>
                                    <h3  style={{textAlign:'start', color:'darkorchid'}}>Cleaner details</h3>
                                    <div style={{marginLeft:'10px'}}>
                                        <ul>
                                            <li>{booking.cleaner}</li>
                                            <li>{booking.cleanerEmail}</li>
                                        </ul>
                                        <div style={{
                                            display:'flex',
                                            justifyContent:'center',
                                            alignItems:'baseline',
                                            marginRight:'10px'
                                        }}>
                                            <ul><li> {booking.cleanerPhone} </li></ul>
                                            <CallButton phoneNumber={booking.cleanerPhone} />
                                        </div>

                                        <ul style={{marginLeft:'15px'}}>
                                            {booking?.cleaner2 && <li>{booking.cleaner2}</li>}
                                            {booking?.cleanerEmail2 && <li>{booking.cleanerEmail2}</li>}
                                        </ul>
                                        {booking?.cleanerPhone2 &&
                                            <div style={{
                                            display:'flex',
                                            justifyContent:'center',
                                            alignItems:'baseline',
                                            marginRight:'10px'
                                        }}>
                                            <ul><li> {booking.cleanerPhone2} </li></ul>
                                            <CallButton phoneNumber={booking.cleanerPhone2} />
                                        </div> }

                                        <ul style={{marginTop:'15px'}}>
                                            {booking?.actualStartTime && <li>Job started at {format(new Date(booking?.actualStartTime), 'yyyy-MM-dd hh:mm')}</li>}
                                            {booking?.actualStopTime && <li>Job ended at {format(new Date(booking?.actualStopTime), 'yyyy-MM-dd hh:mm')}</li>}
                                            {booking?.extra && <li>Requested an extension of {booking?.extra} mins</li>}
                                        </ul>
                                    </div>

                                </div> }

                                {(approve && booking?.extraApproval === 'no' && booking?.extra) &&
                                    <div style={{
                                        display: 'flex',
                                        flexDirection:'column'
                                    }}>
                                        {loadingApproval && <p style={{margin:'10px'}}>Loading...</p>}
                                        {approvalMessage && <p style={{margin:'15px'}}>{approvalMessage}</p>}
                                        {otId === booking.orderId && <IncomeForOT booking={booking} />}
                                        <button
                                            onClick={() => setotId(booking.orderId)}
                                            disabled={(loadingApproval || booking?.extraApproval === 'yes' ||
                                                !booking?.extra || booking?.orderId === otId)}
                                            className={(loadingApproval || booking?.extraApproval === 'yes' ||
                                                !booking?.extra || booking?.orderId === otId) ? 'back-button' : 'submit-button'}>
                                            Approve
                                        </button>
                                    </div>
                                }

                                {booking?.rescheduleRecord === 1 && <p style={{marginTop:'15px'}}>Note! This job was rescheduled</p>}

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
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <div style={{display:'flex', flexDirection:'row', marginLeft:'20px', marginRight:'20px', alignItems:'baseline'}}>
                            <div style={{ display:'flex', alignItems: 'center', gap:'10px'}}>
                                <img src={LOGO} className={'logo-icon'}/>
                                <h2 className={'experience-text'} style={{textAlign:'start'}}>{title}</h2>
                            </div>
                            {totalOT > 0 && <strong style={{
                                alignSelf:'end',
                                width:'60%',
                                marginRight:'13px',
                                fontSize:'small',
                                color:'red',
                                marginBottom:'15px',
                            }}>{totalOT} mins for approval</strong>}
                        </div>

                        {activeBottomMenu === 'All' &&  <div style={{
                            display:'flex',
                            justifyContent:'space-evenly',
                            alignItems:'center',
                            marginBottom:'15px'
                        }}>
                            <div style={{
                                display:'flex',
                                justifyContent:'center',
                                flexDirection:'column',
                                width:'25%',
                                alignItems:'center'
                            }}
                                 onClick={() => {
                                     setApproveExtension(false);
                                     setAllJobs([]);
                                     setUpdateCount(prev => prev + 1 );
                                     setFilter('Updates')
                                 }}>
                                <div style={{
                                    width:'20px',
                                    height:'20px',
                                    borderRadius:'50%',
                                    backgroundColor: 'yellowgreen',
                                }}>
                                </div>
                                <label style={filter === 'Updates' ? {color: 'yellowgreen', textDecoration:'underline'} : {color: 'yellowgreen', textDecoration:'none'}}>Updates</label>
                            </div>

                            <div style={{
                                display:'flex',
                                justifyContent:'center',
                                flexDirection:'column',
                                width:'25%',
                                alignItems:'center'
                            }}
                                 onClick={handleExtension}>
                                <div style={{
                                    width:'20px',
                                    height:'20px',
                                    borderRadius:'50%',
                                    backgroundColor: 'red',
                                }}>
                                </div>
                                <label style={filter === 'OT' ? {color: 'red', textDecoration:'underline'} : {color: 'red', textDecoration:'none'}}>OT</label>
                            </div>

                            <div style={{
                                display:'flex',
                                justifyContent:'center',
                                flexDirection:'column',
                                alignItems:'center', width:'25%'
                            }}
                                 onClick={() => {
                                     setApproveExtension(false);
                                     setFinishAllJobs(false);
                                     setAllJobs([]);
                                     setIdleCount(prev => prev + 1);
                                     setFilter('Idle');
                                 }}>
                                <div style={{
                                    width:'20px',
                                    height:'20px',
                                    borderRadius:'50%',
                                    backgroundColor: 'grey',
                                }}>
                                </div>
                                <label style={filter === 'Idle' ? {color: 'grey', textDecoration:'underline'} : {color: 'grey', textDecoration:'none'}}>Idle</label>
                            </div>

                            <div style={{
                                display:'flex',
                                flexDirection:'column',
                                ustifyContent:'center',
                                width:'25%',
                                alignItems:'center'
                            }}
                                 onClick={() => {
                                     setApproveExtension(false);
                                     setFinishAllJobs(false);
                                     setAllJobs([]);
                                     setPageCount(prevState => prevState + 1);
                                     setFilter('Reset');
                                 }}>
                                <div style={{
                                    width:'20px',
                                    height:'20px',
                                    borderRadius:'50%',
                                    backgroundColor: 'indigo',
                                }}>
                                </div>
                                <label style={filter === 'Reset' ? {color: 'indigo', textDecoration:'underline'} : {color: 'indigo', textDecoration:'none'}}>Reset</label>
                            </div>
                        </div> }

                        {activeBottomMenu === "All" && <div style={{
                            flexFlow: "1",
                            maxWidth:'1200px',
                            display:'flex',
                            alignItems:'center'
                        }} className="search-bar" >
                            <input
                                type="text"
                                placeholder="search using order number..."
                                value={searchDatabase}
                                className={'button-bg'}
                                style={{width:'90%'}}
                                onChange={(e) => setSearchDatabase(e.target.value)}
                            />
                            <FaSearch onClick={searchDatabase?.length > 0 ? search : null } style={{width:'40px'}}  />

                        </div>}
                    </div>

                </div>
            </nav>

            <main className={["main-content", "main-banner"].join(" ")}>
                {activeBottomMenu === "Today" && <TodayBookings todayBooking={todayBooking} message={message} />}
                {activeBottomMenu === "Recent" && <Recent last7DaysBooking={recentBookings} message={message} /> }
                {activeBottomMenu === "Schedule" && <Schedule todaySchedule={todaySchedule} message={message} />}
                {activeBottomMenu === "Jobs" && <ApproveJob jobs={approvedBookings} message={message} notice={approvalMessage} />}
                {activeBottomMenu === "All" && <AllJobs all={allJobs} message={message} approve={approveExtension} />}
            </main>

            <nav  className='bottom-order-nav'>
                <div style={{padding:'10px'}} className="nav-order-content">
                    {bottomNavItems.map((item, index) => (
                        <div key={`bottom-${item.id}`} className="nav-order-item"
                             onClick={() => {setActiveBottomMenu(item.category); setTitle(item.title)}}>
                            <div className={'book-list'} style={activeBottomMenu === item.category ? {color:'blue'} : {color:''}}>
                                <FaCalendarAlt className="book-menu" />
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