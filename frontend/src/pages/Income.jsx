import React, {useState, useEffect} from "react";
import {differenceInCalendarDays, differenceInMinutes, format, isToday} from "date-fns";
import api from "./api.js";
import {MdKeyboardArrowRight} from "react-icons/md";
import {FaClock, FaCommentDots, FaEnvelope, FaMapMarkerAlt, FaPhone, FaSearch, FaTimes} from "react-icons/fa";
import LOGO from "../images/logo4.png";
import ProfilePage from "./CleanerProfilePage.jsx";


const Income = () => {

    const [count, setCount] = useState(0);
    const [buffer, setBuffer] = useState([]);
    const [newJobs, setNewJobs] = useState([]);
    const [oldJobs, setOldJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [newActive, setNewActive] = useState(true);
    const [page, setPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [searchDatabase, setSearchDatabase] = useState('');

    useEffect(() => {
        if (window.innerWidth > 768) {
            setPage(20);
            return;
        }
        setPage(10);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (newActive !== null) { return; }
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

    const getTime = (date) => {
        const parsed = new Date(date);
        //  console.log(parsed);
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

    const getPostcode = (postcode) => {
        if (!postcode) {return;}
        const cleanedPostcode = postcode?.replace(/\s/g, "").toUpperCase();
        const normalPostcode =  cleanedPostcode?.slice(0, -3) + " " + cleanedPostcode?.slice(-3);
        return normalPostcode;
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
        const fetchData = async () => {
            if (loading) {
                return;
            }
            if (count === 0) {
                setLoading(true);
            }
            try {
                let responspnse = await api.get('/api/booking/no-income-jobs')
                let { booking } = responspnse.data;
                console.log(booking);
                if (newActive === true) {
                    setBuffer(prev => {
                        const map = new Map(prev.map(item => [item.id, item]));
                        booking.forEach(item => map.set(item.id, item));
                        return Array.from(map.values()).sort((a, b) => a.id - b.id);
                    })
                    if (booking?.length <= 0) {
                        setMessage("No new booking found");
                    }
                }
                setNewJobs(prev => {
                    const map = new Map(prev.map(item => [item.id, item]));
                    booking.forEach(item => map.set(item.id, item));
                    return Array.from(map.values()).sort((a, b) => a.id - b.id);
                })

                responspnse = await api.get('/api/booking/income-jobs')
                const oldBooking = responspnse.data.booking;
                if (newActive === false) {
                    setBuffer(prev => {
                        const map = new Map(prev.map(item => [item.id, item]));
                        oldBooking.forEach(item => map.set(item.id, item));
                        return Array.from(map.values()).sort((a, b) => a.id - b.id);
                    })
                    if (oldBooking?.length <= 0) {
                        setMessage("No previous booking found");
                    }
                }
                setOldJobs(prev => {
                    const map = new Map(prev.map(item => [item.id, item]));
                    oldBooking.forEach(item => map.set(item.id, item));
                    return Array.from(map.values()).sort((a, b) => a.id - b.id);
                })


            } catch (error) {
                console.log(error);
                setMessage("Something went wrong");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [count]);

    useEffect(() => {
        const update = (update = true) => {
            setInterval(() => {
                setCount(count + 1);
                if (!update) {
                    clearInterval();
                }
            }, 60000)
        }
        update()
    }, [])

    useEffect(() => {
        if (newActive !== null || loading) return;
        setLoading(true);
        let offset = 0;
        if (buffer.length > 0) {
            offset = buffer[buffer.length - 1].id;
        }
        const data = {limit: page, offset: offset };
        api.post('/api/booking/old-income-jobs', data)
            .then(response => {
                const { booking } = response.data;
                if (booking.length <= 0) {
                    setMessage('No old booking found');
                    return;
                }
                setBuffer(prev => {
                    const map = new Map(prev.map(item => [item.id, item])); // old items
                    booking.forEach(item => map.set(item.id, item));    // add/replace new
                    return Array.from(map.values()).sort((a, b) => a.id - b.id); // convert back to array
                });
            })
            .catch(error => {
                console.log(error);
                setMessage('Something went wrong');
            })
            .finally(() => {
                setLoading(false);
            })
    }, [pageCount]);

    const search = async (e) => {
        e.preventDefault()
        if (loading || !searchDatabase) return;
        setLoading(true);
        setBuffer([]);
        try {
            const res = await api.post('/api/booking/search-income-jobs', {orderId: searchDatabase})
            const { booking } = res.data;
            if (booking?.length <= 0) {
                setMessage("No booking matching your order id");
                return;
            }
            setBuffer(prev => {
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
            setBuffer([]);
            setPageCount(prev => prev + 1);
        }
    }, [searchDatabase]);

    const AllJobs = ({ all, message }) => {
        if (all?.length <= 0) {
            return <p style={{margin:'20px'}}>{message ? message : "No booking at the moment"}</p>;
        }

        const [detailsId, setDetailsId] = useState(null);
        const [id, setId] = useState(null);
        const [incomeId, setIncomeId] = useState(null);

      //  const [message, setMessage] = useState('');
        const [loadingData, setLoadingData] = useState(false);

        const Cleaner = ({ booking }) => {
            const [income, setIncome] = useState(null);
            const [personel, setPersonel] = useState(null);

            const data = { orderId: booking.orderId, income: income, personel: personel };

            const handleSubmit = async (e) => {
                e.preventDefault();
                if (loadingData) {
                    return;
                }

                if (income <= 0 || income === null) {
                    setMessage("Please enter income");
                    return;
                }
                setLoadingData(true);
                try {
                    const response = await api.post('/api/booking/add-income', data);
                    const { booking } = response.data;
                    setMessage("Successfully added icome");
                    if (booking?.length > 0) {
                        setTimeout(() => {
                            setBuffer(prev => {
                                const map = new Map(prev.map(item => [item.id, item]));
                                booking.forEach(item => map.set(item.id, item));
                                return Array.from(map.values()).sort((a, b) => a.id - b.id);
                            })
                        }, 2000)

                    }

                } catch (error) {
                    console.log(error);
                    setMessage("Error occured")
                } finally {
                    setLoadingData(false);
                }
            }

            return (
                <form style={{display: 'flex', flexDirection:'column',
                    alignItems: 'center', justifyContent:'space-evenly', padding:'10px', border:'dashed', gap:'10px'}}
                      onSubmit={handleSubmit} className={'form-group'}>
                    <h4>{booking?.income ? "Update income for cleaner" : " Add income to this job"}</h4>
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

                    <input
                        type="number"
                        name="personel"
                        value={personel}
                        onChange={(e) => setPersonel(e.target.value)}
                        placeholder="Enter number of cleaners"
                        className="button-bg"
                        style={{padding:'10px', marginTop:'15px'}}
                    />

                    {message && <p style={{margin:'10px'}}>{message}</p>}
                    {loadingData && <p style={{margin:'10px'}}>Loading...</p>}
                    <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center', gap:'10px', margin:'10px'}}>
                        <button
                            disabled={loadingData}
                            style={{border:'none', flexFlow:'1'}}
                            type={'submit'} className={loadingData ? "back-button" : 'submit-button'}>
                            {booking?.income ? "Update income" : " Add income"}
                        </button>
                        <FaTimes size={30} style={{ width:'40px'}} onClick={() => {
                            setIncomeId(null);
                            setMessage('');
                        }} />
                    </div>
                </form>
            )
        }

        function jobProgress(booking) {
            if (booking?.completed === 1) {
                return {color: "blue", message: "This job is completed."};
            }
            if (booking?.income) {
                return {color: "green", message: "Income has been allocated to this job"};
            }
            return {color: "red", message: "This job has no income for cleaner"};
        }

        async function approveOT(order) {
            if (loadingApproval) {return;}
            setLoadingApproval(true);
            const data = {email: order?.cleanerEmail, orderId: order?.orderId}
            try {
                const response = await api.post(`/api/booking/approve-ot`, data);
                const {booking, success } = response.data;
                if (success) {
                    setApprovalMessage('Successfully approved');
                    setAllJobs(prev => {
                        const map = new Map(prev.map(item => [item.id, item]));
                        booking.forEach(item => map.set(item.id, item));
                        return Array.from(map.values()).sort((a, b) => a.id - b.id);
                    })
                }
                else {
                    setApprovalMessage('Failed to approve extension. Try again');
                }


            } catch (error) {
                console.log(error);
                setApprovalMessage("Error couured")
            } finally {
                setLoadingApproval(false);
            }
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

                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                        <p>Cleaner Income</p>
                                        <h4 style={{textAlign:'end'}}>£{booking?.income ? booking?.income : "0.00"}</h4>
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

                                        {booking?.cleanerEmail2 && <div style={{marginLeft:'10px'}}>
                                                <ul>
                                                    <li>{booking.cleaner2}</li>
                                                    <li>{booking.cleanerEmail2}</li>
                                                </ul>
                                                <div style={{
                                                    display:'flex',
                                                    justifyContent:'center',
                                                    alignItems:'baseline',
                                                    marginRight:'10px'
                                                }}>
                                                    <ul><li> {booking?.cleanerPhone2} </li></ul>
                                                    <CallButton phoneNumber={booking?.cleanerPhone2} />
                                                </div>
                                            </div>}

                                        <ul style={{marginTop:'15px'}}>
                                            {booking?.actualStartTime && <li>Job started at {format(new Date(booking?.actualStartTime), 'yyyy-MM-dd hh:mm')}</li>}
                                            {booking?.actualStopTime && <li>Job ended at {format(new Date(booking?.actualStopTime), 'yyyy-MM-dd hh:mm')}</li>}
                                            {booking?.extra && <li>Requested an extension of {booking?.extra} mins</li>}
                                        </ul>
                                    </div>

                                </div> }

                                {incomeId === booking.orderId && <Cleaner booking={booking} />}

                                <button
                                    onClick={() => setIncomeId(booking.orderId)}
                                    className={incomeId === null ? 'submit-button' : 'back-button'}
                                    disabled={incomeId !== null}>
                                    Manage Cleaner Income
                                </button>

                            </div>
                        ))}
                    </div>
                    {loading && (<p>Loading...</p>)}
                </div>
            </div>
        );
    }

    useEffect(() => {
        setMessage('');
    }, [newActive]);

    return (
        <div className="sticky-nav-container">
            <nav  className='top-order-nav'>
                <div style={{display:'flex', flexDirection: 'column'}}>
                    <div style={{display:'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <img src={LOGO} style={{maxWidth:'12%'}}  className={'logo-icon2'}/>
                        <h1 style={{textAlign:'start'}} className={'page-title'}>Cleaner Income</h1>
                    </div>
                    <div className="nav-order-content">
                        <div style={{
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
                                     setBuffer(newJobs);
                                     setNewActive(true);
                                 }}>
                                <div style={{
                                    width:'20px',
                                    height:'20px',
                                    borderRadius:'50%',
                                    backgroundColor: 'yellowgreen',
                                }}>
                                </div>
                                <label style={newActive === true ? {textDecoration:'underline'} : {textDecoration:'none'}}>New Jobs</label>
                            </div>

                            <div style={{
                                display:'flex',
                                justifyContent:'center',
                                flexDirection:'column',
                                width:'25%',
                                alignItems:'center'
                            }}
                                 onClick={() => {
                                     setBuffer(oldJobs);
                                     setNewActive(false);
                                 }}>
                                <div style={{
                                    width:'20px',
                                    height:'20px',
                                    borderRadius:'50%',
                                    backgroundColor: 'red',
                                }}>
                                </div>
                                <label style={
                                    newActive === false ?
                                        {textDecoration:'underline'}
                                        : {textDecoration:'none'}}>
                                    Active Jobs
                                </label>
                            </div>

                            <div style={{
                                display:'flex',
                                justifyContent:'center',
                                flexDirection:'column',
                                width:'25%',
                                alignItems:'center'
                            }}
                                 onClick={() => {
                                     setNewActive(null);
                                     setBuffer([]);
                                     setPageCount(prev => prev + 1);
                                 }}>
                                <div style={{
                                    width:'20px',
                                    height:'20px',
                                    borderRadius:'50%',
                                    backgroundColor: 'blue',
                                }}>
                                </div>
                                <label style={
                                    newActive === null ?
                                        {textDecoration:'underline'}
                                        : {textDecoration:'none'}}>
                                    Old Jobs
                                </label>
                            </div>

                        </div>
                    </div>
                    {newActive === null && <div style={{
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
            </nav>

            <main className={["main-content", "main-banner"].join(" ")}>
                <AllJobs message={message} all={buffer} />
            </main>

        </div>
    );

}

export default Income;