// components/Dashboard.js
import React, { useState, useEffect, useRef } from 'react';
import StatsCard from './StatsCard.jsx';
import Bookings from './Bookings.jsx';
import CleaningSchedule from './CleaningSchedule.jsx';
import ServiceAreas from './ServiceAreas.jsx';
import Sidebar from './Sidebar.jsx';
import { FaPoundSign, FaCalendarCheck, FaUserTie, FaMapMarkerAlt, FaBars, FaTimes, FaCommentDots  } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

import { NavLink, Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUsers, FaUserShield, FaChartLine, FaCog, FaEnvelope } from 'react-icons/fa';
import LOGO from '../images/logo4.png';
import api from './api.js'
import { useSocket } from "../Socket.jsx";
import Messages from "./Messages.jsx";

const Admin = () => {
    const socket = useSocket();
    const navigate = useNavigate();

    const links = [
        {id: 1, category: 'Dashboard', link: '/admin', icon: FaHome },
        {id: 2, category: 'Bookings', link: '/bookings', icon: FaCalendarAlt },
        {id: 3, category: 'Cleaners', link: '/cleaners', icon: FaUserShield },
        {id: 4, category: 'Customers', link: '/customers', icon: FaUsers },
        {id: 5, category: 'View reports', link: '/reports', icon: FaChartLine },
        {id: 6, category: 'Settings', link: '/settings', icon: FaCog },
        {id: 7, category: 'Add postcode', link: '/postcode', icon: FaMapMarkerAlt },
        {id: 8, category: 'Add reports', link: '/report', icon: FaChartLine },
        {id: 8, category: 'Add expenses', link: '/expense', icon: FaPoundSign },
        {id: 8, category: 'Messages', link: '/expense', icon: FaCommentDots },
    ]

    const [showPanel, setShowPanel] = useState(false);
    const [activeLink, setActiveLink] = useState(links[0].link);
    const [messageCount, setMessageCount] = useState(0);

    const [revenueToday, setRevenueToday] = useState(0);
    const [revenueTodayTrend, setRevenueTodayTrend] = useState('neutral');
    const [revenueTodayChange, setRevenueTodayChange] = useState('+0%');

    const [revenueMonth, setRevenueMonth] = useState(0);
    const [revenueMonthTrend, setRevenueMonthTrend] = useState('neutral');
    const [revenueMonthChange, setRevenueMonthChange] = useState('+0%');

    const [expense, setExpense] = useState(0);
    const [expenseChange, setExpenseChange] = useState('+0%');
    const [expenseTrend, setExpenseTrend] = useState('neutral');

    const [monthExpense, setMonthExpense] = useState(0);
    const [monthExpenseTrend, setMonthExpenseTrend] = useState('neutral');
    const [monthExpenseChange, setMonthExpenseChange] = useState('+0%');

    const [bookingToday, setBookingToday] = useState(0);
    const [bookingTrend, setBookingTrend] = useState('neutral');
    const [bookingChange, setBookingChange] = useState('+0%');

    const [monthBooking, setMonthBooking] = useState(0);
    const [monthBookingTrend, setMonthBookingTrend] = useState('neutral');
    const [monthBookingChange, setMonthBookingChange] = useState('neutral');

    const [activeCleaners, setActiveCleaners] = useState(0);
    const [activeCleanersTrend, setActiveCleanersTrend] = useState('neutral');
    const [activeCleanerChange, setActiveCleanerChange] = useState('+0%');

    const [email, setEmail] = useState(null);

    const statsData = [
        { title: "Today's Revenue", value: `£${revenueToday}`, change: `${revenueTodayChange}`, icon: <FaPoundSign />, trend: `${revenueTodayTrend}` },
        { title: "Today's Expenses", value: `£${expense}`, change: `${expenseChange}`, icon: <FaPoundSign />, trend: `${expenseTrend}` },
        { title: "This Month's Revenue", value: `£${revenueMonth}`, change: `${revenueMonthChange}`, icon: <FaPoundSign />, trend: `${revenueMonthTrend}` },
        { title: "This Month's Expenses", value: `£${monthExpense}`, change: `${monthExpenseChange}`, icon: <FaPoundSign />, trend: `${monthExpenseTrend}` },
        { title: "Today's Booking", value: `${bookingToday}`, change: `${bookingChange}`, icon: <FaCalendarCheck />, trend: `${bookingTrend}` },
        { title: "This Month's Booking ", value: `${monthBooking}`, change: `${monthBookingChange}`, icon: <FaCalendarCheck />, trend: `${monthBookingTrend}` },
        { title: "Active Cleaners", value: `${activeCleaners}`, change: `${activeCleanerChange}`, icon: <FaUserTie />, trend: `${activeCleanersTrend}` },
        { title: "Areas Covered", value: "12", change: "+0%", icon: <FaMapMarkerAlt />, trend: 'neutral' }
    ];

    const show = {display:'', marginTop: '40px', marginBottom: '40px'};
    const hide = {display:'none' , marginTop: '40px', marginBottom: '40px' }

    const active = {color:'green', width:'40px', height:'30px', marginRight: '20px'};
    const notActive = {color:' ', width:'40px', height:'30px', marginRight: '20px'};

    useEffect(() => {
        document.title = 'Admin';
    })

    const trendLevel = (previous, current) => {
        let trend = Number(current) - Number(previous);
        if (trend > 0) return 'up';
        if (trend < 0) return 'down';
        return 'neutral';
    }

    const changeLevel = (previous, current) => {
        const incomeSum = Number(current) + Number(previous);
        const incomeDiff = Number(current) - Number(previous);
        let change = (Number(incomeDiff / incomeSum) * 100) || 0;
        if (change < 0) {
            return `${Math.round(change)}%`;
        }
        return `+${Math.round(change)}%`
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await api.get('/api/messages/admin');
                const messages = await response.data.messages;
                setMessageCount(messages);

                response = await api.get('/api/revenue/today');
                const incomeToady = response.data.incomes[0].today_income;
                const booking = response.data.incomes[0].today_booking;
                const yesterday_booking = response.data.incomes[0].yesterday_booking;
                const yesterdayIcome = response.data.incomes[0].yesterday_income;

                setRevenueToday(incomeToady);
                setBookingToday(booking);
                setBookingTrend(trendLevel(yesterday_booking, booking));
                setBookingChange(changeLevel(yesterday_booking, booking));

                setRevenueTodayTrend(trendLevel(yesterdayIcome, incomeToady));
                setRevenueTodayChange(changeLevel(yesterdayIcome, incomeToady))

                response = await api.get('/api/revenue/month');
                const incomeMonth = response.data.incomes[0].this_month;
                const lastMonth = response.data.incomes[0].last_month;
                const this_month_booking = response.data.incomes[0].this_month_booking;
                const last_month_booking = response.data.incomes[0].last_month_booking;

                setRevenueMonth(incomeMonth);
                setMonthBooking(this_month_booking);
                setRevenueMonthTrend(trendLevel(lastMonth, incomeMonth));
                setRevenueMonthChange(changeLevel(lastMonth, incomeToady));
                setMonthBookingTrend(trendLevel(last_month_booking, this_month_booking));
                setMonthBookingChange(changeLevel(last_month_booking, this_month_booking));

                response = await api.get('/api/expenses/today')
                const expenseToday = response.data.expenses[0].today_expenses;
                const expenseYesterday = response.data.expenses[0].yesterday_expenses;
                setExpense(expenseToday);
                setExpenseTrend(trendLevel(expenseYesterday, expenseToday));
                setExpenseChange(changeLevel(expenseYesterday, expenseToday));

                response = await api.get('/api/expenses/month')
                const thisMonth = response.data.expenses[0].this_month;
                const lastMonthExp = response.data.expenses[0].last_month;
                setMonthExpense(thisMonth)
                setExpenseChange(changeLevel(lastMonthExp, thisMonth));
                setMonthExpenseTrend(trendLevel(lastMonthExp, thisMonth));

                response = await api.get('/api/booking/active-cleaners')
                setActiveCleaners(response.data.cleaners[0].active_cleaners);

            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    })

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const response = await api.get('/api/company-email')
                setEmail(response.data.email)
            } catch (error) {
                console.log(error)
            }
        }
        fetchEmail();
    }, [])

    useEffect(() => {
        if (!socket) { return; }
        socket.on('receive_message', (data) => {
            if (data.receiver === email) {
                setMessageCount(prev => prev + 1);
            }
        });

        return () => {
            socket.off("receive_message");
        };

    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            marginTop:"20px"// Ensures it takes at least full viewport height
        }}>
            <div className={'admin-container'}>
                <div className={['slide-box', 'panel', showPanel ? 'slide-in' : 'slide-out'].join(' ')}  >
                    <div className="sidebar" >
                        <div style={{display: 'flex', justifyContent: 'end', alignItems: 'baseline', width: '100%'}}>
                            <img src={LOGO} alt="logo" style={{width:'100px', height:'100px'}} />
                            < FaTimes style={{height: '40px', alignSelf: 'end', alignContent:'end', marginBottom:'30px'}}
                                      onClick={() => setShowPanel(false) }
                            />
                        </div>
                        <nav className="sidebar-nav">
                            {links.map(link => (
                                <div key={link.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'start', marginTop: '20px'}} >
                                    <link.icon  style={link.link === activeLink ? active : notActive} />
                                    <Link
                                        to={link.link} style={link.link === activeLink ?
                                        {color:'green'} : {color: ""}}>
                                        {link.category}
                                        {link.category === 'Messages' && <small style={{color:'red', paddingLeft:'5px'}}>({messageCount})</small>}
                                    </Link>
                                </div>
                            ))}

                        </nav>
                    </div>
                </div>
                <div className={'dash'}>
                    <div className="dashboard">
                        <div style={{display:'flex', justifyContent:'start', alignItems: 'center', marginLeft:'10px', maxWidth:'800px'}}>
                            <div style={{display: 'flex', justifyContent:'flex-start', alignItems: 'center'}}>
                                <img src={LOGO} className={'logo-icon'}/>
                                <FaBars size={25} onClick={() => setShowPanel(!showPanel)} style={{width:'30px'}}/>
                                <h1 className="page-title" style={{width:'20%'}}>Dashboard</h1>
                            </div>
                            <label style={{color:'red', display:'flex', alignItems:'center', fontSize:'large', justifyContent:'flex-end', marginRight:'5%'}}>
                                <FaEnvelope size={40} style={{width:'30px', color:'black'}} />
                                {messageCount}
                            </label>
                        </div>
                        <div style={{padding:'10px'}} className="grid-container">
                            {statsData.map((stat, index) => (
                                <StatsCard
                                    key={index}
                                    title={stat.title}
                                    value={stat.value}
                                    change={stat.change}
                                    icon={stat.icon}
                                    trend={stat.trend}
                                />
                            ))}

                        </div>
                        <div className="dashboard-content">
                            <div className="content-left">
                                <Bookings
                                    cancellable={false}
                                    user={'admin'}
                                />
                            </div>
                            <div className="content-right">
                                <CleaningSchedule />
                                <ServiceAreas />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;