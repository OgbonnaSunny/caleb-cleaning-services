// components/Sidebar.js
import React, {useState} from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUsers, FaUserShield, FaChartLine, FaCog, FaTimes } from 'react-icons/fa';
import LOGO from '../images/logo.png';

const Sidebar = () => {

    const handleClick = () => {
        setShowPanel(!showPanel);
    }
    const [showPanel, setShowPanel] = useState(false);

    const links = [
        {id: 1, name: 'Dashboard', link: '/admin', icon: FaHome },
        {id: 2, name: 'Bookings', link: '/bookings', icon: FaCalendarAlt },
        {id: 3, name: 'Cleaners', link: '/cleaners', icon: FaUserShield },
        {id: 4, name: 'Customers', link: '/customers', icon: FaUsers },
        {id: 5, name: 'Reports', link: '/reports', icon: FaChartLine },
        {id: 6, name: 'Settings', link: '/settings', icon: FaCog },
    ]

    return (
        <div className="sidebar" >
            <div style={{display: 'flex', justifyContent: 'stretch', alignItems: 'end', width: '100%', marginTop: '20px'}}>
                <img src={LOGO} alt="logo" className={'navbar-logo'} />
                < FaTimes style={{height: '40px', alignSelf: 'end', alignContent:'end'}}  />
            </div>
            <nav className="sidebar-nav">
                {links.map(link => (
                    <div key={link.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'start', marginTop: '20px', marginLeft: '0px'}} >
                        <link.icon  style={{width:'40px', height:'30px', marginRight: '20px'}} />
                        <Link to={link.link} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}> {link.name}</Link>
                    </div>
                ))}

            </nav>
        </div>
    );
};

export default Sidebar;