// components/CleaningSchedule.js
import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkedAlt, FaClock, FaMapMarked, FaMapMarkerAlt } from 'react-icons/fa';
import api from './api.js'
import {differenceInDays, format, isToday} from "date-fns";

const CleaningSchedule = () => {
    const schedule = [
        { time: "09:00 AM", customer: "James Wilson", plan: "Regular Clean" },
        { time: "11:30 AM", customer: "Olivia Smith", plan: "Deep Clean" },
        { time: "02:00 PM", customer: "Robert Brown", plan: "Move Out Clean" },
        { time: "04:30 PM", customer: "Emily Davis", plan: "Regular Clean" }
    ];

    const [todaySchedule, setTodaySchedule] = useState([])
    const [page, setPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        const width = window.innerWidth;
        if (width > 768) {
            setPage(20);
            return;
        }
        setPage(10);
    }, [window.innerWidth])

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
        const diff = differenceInDays(new Date(), new Date(date));
        if (diff <= 0) {
            return 'Tomorrow'+ " "+ new Date(date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        if (diff === 1) {
            return '2 days time'+ " "+ new Date(date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        return format(new Date(date), 'yyyy-mm-dd') + " "+ new Date(date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
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
    }, [pageCount])

    return (
        <div >
            <div className="cleaning-schedule card">
                <div className="card-header">
                    <h2 className={'experience-text'} style={{color:'brown', width:'60%'}}>Today's Schedule</h2>
                    <button style={{color:'black'}} className="experience-text">View Calendar</button>
                </div>
                {todaySchedule.length > 0 &&  <div className="card-body">
                    <div className="grid-container">
                        {todaySchedule.map((item, index) => (
                            <div key={index} className="schedule-item">
                                <h3>{renderName(item.customer)}</h3>
                                <div className="schedule-time">
                                    <FaClock className="icon-small" />
                                    <span>{getTime(item.startTime)}</span>
                                </div>
                                <div className="schedule-details">
                                    <div className="schedule-time">
                                        <FaMapMarkerAlt className="icon-small" />
                                        <span>{item.address}</span>
                                    </div>
                                    <p>{item.plan}</p>
                                </div>
                                <button style={{background:'cadetblue', color:'white', textAlign:'center'}} className="service-card">Assign</button>
                            </div>
                        ))}
                    </div>
                </div> }
                {(!loading && todaySchedule.length <= 0) && (<p>{message}</p>)}
                {loading && (<p>Loading data...</p>)}
            </div>
        </div>
    );
};

export default CleaningSchedule;