// components/Dashboard.js
import React from 'react';
import StatsCard from './StatsCard.jsx';
import Bookings from './Bookings.jsx';
import CleaningSchedule from './CleaningSchedule.jsx';
import ServiceAreas from './ServiceAreas.jsx';
import Sidebar from './Sidebar.jsx';
import { FaPoundSign, FaCalendarCheck, FaUserTie, FaMapMarkerAlt, FaBars, FaTimes  } from 'react-icons/fa';
import { useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom'

import { NavLink, Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUsers, FaUserShield, FaChartLine, FaCog } from 'react-icons/fa';
import LOGO from '../images/logo4.png';

const Admin = () => {
    const statsData = [
        { title: "Today's Revenue", value: "£1,245", change: "+4%", icon: <FaPoundSign />, trend: 'up' },
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
    const navigate = useNavigate();

    const links = [
        {id: 1, name: 'Dashboard', link: '/admin', icon: FaHome },
        {id: 2, name: 'Bookings', link: '/bookings', icon: FaCalendarAlt },
        {id: 3, name: 'Cleaners', link: '/cleaners', icon: FaUserShield },
        {id: 4, name: 'Customers', link: '/customers', icon: FaUsers },
        {id: 5, name: 'View reports', link: '/reports', icon: FaChartLine },
        {id: 6, name: 'Settings', link: '/settings', icon: FaCog },
        {id: 7, name: 'Add postcode', link: '/postcode', icon: FaMapMarkerAlt },
        {id: 8, name: 'Add reports', link: '/report', icon: FaChartLine },
    ]

    const [showPanel, setShowPanel] = useState(false);
    const [activeLink, setActiveLink] = useState(links[0].link);

    const show = {display:'', marginTop: '40px', marginBottom: '40px'};
    const hide = {display:'none' , marginTop: '40px', marginBottom: '40px' }

    const active = {color:'green', width:'40px', height:'30px', marginRight: '20px'};
    const notActive = {color:' ', width:'40px', height:'30px', marginRight: '20px'};


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
                            < FaTimes style={{height: '40px', alignSelf: 'end', alignContent:'end', marginBottom:'30px'}} onClick={() => setShowPanel(false) } />
                        </div>
                        <nav className="sidebar-nav">
                            {links.map(link => (
                                <div key={link.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'start', marginTop: '20px'}} >
                                    <link.icon  style={link.link === activeLink ? active : notActive} />
                                    <Link to={link.link} style={link.link === activeLink ? {color:'green'} : {color: ""}}> {link.name}</Link>
                                </div>
                            ))}

                        </nav>
                    </div>
                </div>
                <div className={'dash'}>
                    <div className="dashboard">
                        <div style={{display:'flex', justifyContent:'start', alignItems: 'baseline'}}>
                            <FaBars onClick={() => setShowPanel(!showPanel)} style={{width:'50px', marginLeft:'20px'}}/>
                            <h1 className="page-title">Dashboard Overview</h1>
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
                                <Bookings />
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