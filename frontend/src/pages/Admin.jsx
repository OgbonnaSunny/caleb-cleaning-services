// components/Dashboard.js
import React, { useState, useEffect, useRef } from 'react';
import StatsCard from './StatsCard.jsx';
import Bookings from './Bookings.jsx';
import CleaningSchedule from './CleaningSchedule.jsx';
import ServiceAreas from './ServiceAreas.jsx';
import Sidebar from './Sidebar.jsx';
import { FaPoundSign, FaCalendarCheck, FaUserTie, FaMapMarkerAlt, FaBars, FaTimes, FaCommentDots  } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import { useSocket } from "../Socket.jsx";

import { NavLink, Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUsers, FaUserShield, FaChartLine, FaCog } from 'react-icons/fa';
import LOGO from '../images/logo4.png';
import api from './api.js'

const Admin = () => {
    const navigate = useNavigate();
    const socket = useSocket();

    const links = [
        {id: 1, category: 'Dashboard', link: '/admin', icon: FaHome },
        {id: 2, category: 'Bookings', link: '/bookings', icon: FaCalendarAlt },
        {id: 3, category: 'Cleaners', link: '/cleaners', icon: FaUserShield },
        {id: 4, category: 'Customers', link: '/customers', icon: FaUsers },
        {id: 5, category: 'View reports', link: '/reports', icon: FaChartLine },
        {id: 6, category: 'Settings', link: '/settings', icon: FaCog },
        {id: 7, category: 'Add postcode', link: '/postcode', icon: FaMapMarkerAlt },
        {id: 8, category: 'Add reports', link: '/report', icon: FaChartLine },
        {id: 9, category: 'Add expenses', link: '/expenses', icon: FaPoundSign },
    ]

    const [showPanel, setShowPanel] = useState(false);
    const [activeLink, setActiveLink] = useState(links[0].link);
    const [messageCount, setMessageCount] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [email, setEmail] = useState(null);

    const show = {display:'', marginTop: '40px', marginBottom: '40px'};
    const hide = {display:'none' , marginTop: '40px', marginBottom: '40px' }

    const active = {color:'green', width:'40px', height:'30px', marginRight: '20px'};
    const notActive = {color:' ', width:'40px', height:'30px', marginRight: '20px'};

    const statsData = [
        { title: "Today's Revenue", value: `${revenue}`, change: "+4%", icon: <FaPoundSign />, trend: 'up' },
        { title: "Today's Expenses", value: "£150", change: "+1%", icon: <FaPoundSign />, trend: 'down' },
        { title: "This Month's Revenue", value: "£7,300", change: "+12%", icon: <FaPoundSign />, trend: 'up' },
        { title: "This Month's Expenses", value: "£645", change: "+1%", icon: <FaPoundSign />, trend: 'up' },
        { title: "Bookings Today", value: "24", change: "+5%", icon: <FaCalendarCheck />, trend: 'up' },
        { title: "Active Cleaners", value: "18", change: "+2", icon: <FaUserTie />, trend: 'up' },
        { title: "Idle Cleaners", value: "4", change: "+3%", icon: <FaUserTie />, trend: 'down' },
        { title: "Cleaners on leave", value: "1", change: "+1%", icon: <FaUserTie />, trend: 'neutral' },
        { title: "Sick Cleaners", value: "0", change: "+0%", icon: <FaUserTie />, trend: 'neutral' },
        { title: "Areas Covered", value: "12", change: "London", icon: <FaMapMarkerAlt />, trend: 'neutral' }
    ];

    useEffect(() => {
        document.title = 'Admin';
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await api.get('/api/messages/admin')
                const messages = await response.data.messages;
                setMessageCount(messages)
                response = await api.get('/api/company-email')
                setEmail(response.data.email)

            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    })

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
        <div className="sticky-nav-container">
            <nav className='top-order-nav'>
                <div  className="nav-order-content">
                    <img src={LOGO} className={'logo-icon'}/>
                    {showPanel &&  <FaTimes size={30} style={{width:'50px', marginLeft:'20px'}} onClick={() => setShowPanel(!showPanel) } />}
                    {!showPanel && <FaBars size={30} style={{width:'50px', marginLeft:'20px'}} onClick={() => setShowPanel(!showPanel)} />}
                    <h1 className="page-title" style={{width:'20%'}}>Dashboard</h1>
                    <label style={{color:'red', display:'flex', alignItems:'center', fontSize:'large'}}>
                        <FaCommentDots size={30} style={{width:'30px', color:'black', marginRight:'2px'}} />
                        {messageCount}
                    </label>
                </div>
            </nav>
            <main className="main-content">
                <div className={['slide-box', 'panel', showPanel ? 'slide-in' : 'slide-out'].join(' ')}>
                    <div className="sidebar" >
                        <nav style={{marginTop:'50px'}} className="sidebar-nav">
                            {links.map(link => (
                                <div key={link.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'start', marginTop: '50px'}} >
                                    <link.icon  style={link.link === activeLink ? active : notActive} />
                                    <Link to={link.link} style={link.link === activeLink ? {color:'green'} : {color: ""}}> {link.category}</Link>
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>
                <div className="stats-grid">
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
            </main>
        </div>
    );
};

export default Admin;