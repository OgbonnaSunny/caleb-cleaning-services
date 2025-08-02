import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // We'll create this CSS file next
import { FaBars , FaUsers, FaUserTie} from 'react-icons/fa';
import LOGO from '../images/logo3.png'
import {useLocation} from 'react-router-dom'
import {commonjs} from "globals";
import api from './api.js';
import { EventEmitter } from 'events';
import { useNavigate } from 'react-router-dom';
import { MdManageAccounts } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg'; // CSS.GG
import { FiShield } from 'react-icons/fi';

import { HiMenu } from 'react-icons/hi';
import { MdSecurity } from 'react-icons/md';
import { FaShieldAlt } from 'react-icons/fa';
import { IoShield } from 'react-icons/io5';

import { FaSquare } from 'react-icons/fa'; // Font Awesome solid square
import { MdSquare } from 'react-icons/md'; // Material Design solid square
import { BsSquareFill } from 'react-icons/bs'; // Bootstrap solid square
import { FaRectangleXmark } from 'react-icons/fa6'; // Font Awesome solid rectangle
import { MdRectangle } from 'react-icons/md'; // Material Design rectangle (outline)
import { MdDashboard } from 'react-icons/md'; // Material Design
import { BsSpeedometer2 } from 'react-icons/bs'; // Bootstrap (speedometer-style)
import { MdAdminPanelSettings } from 'react-icons/md'; // Material Design (best for admin)
import { FaUserCog } from 'react-icons/fa'; // Font Awesome
import { IoPersonCircleSharp } from 'react-icons/io5'; // Ionicons (user-focused)


const Navigation = () => {
    const navigate = useNavigate();

    const emitter = new EventEmitter();
    const navLinks = [
        {id: 1, name: 'Overview', path: '/overview' },
        {id: 2, name: 'Locations', path: '/locations' },
        {id: 3, name: 'Services', path: '/services' },
        {id: 4, name: 'Pricing', path: '/pricing' },
        {id: 5, name: 'Blog', path: '/about' },
        {id: 6, name: 'Gift', path: '/gift' },
        {id: 7, name: 'Help', path: '/help' },
        {id: 8, name: 'Reclean', path: '/reclean' },
        {id: 9, name: 'Cleaners', path: '/become' },
        {id: 10, name: 'Admin', path: '/admin' },
    ];

    const showAdmin = {display: ' '};
    const hideAdmin = {display: 'none'};

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' // Optional: for smooth scrolling animation
    })

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const location = useLocation();
    const hideNavbarPaths = ['/admin', '/customer', '/cleanerprofile', '/cashback','/tenancylist' ,'/checkout', '/privacy', '/cancellation', '/cookies', '/booking', '/terms','/cleaners', '/bookings', '/reports', '/settings', '/logout','/login','/signup', '/sitemap']; // Paths where navbar should be hidden
    const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

    const [activeTab, setActiveTab] = useState('/overview');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isAuthenticated, setIsAuthenticated] = useState(null);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setIsOpen(false);
            }
        };

        setActiveTab(location.pathname);

        function checkLoginStatus() {
            try {
                api.get('http://localhost:8081/api/login/status')
                    .then((response) => {
                        setIsAuthenticated(response.isAuthenticated);
                    })
            } catch {
                setIsAuthenticated(false);
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

        emitter.on('auth', checkLoginStatus);

        return () => emitter.off('auth', checkLoginStatus);

    }, [location.pathname]);

    const handleAuth = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
          navigate('/logout');
      }
      else {
          navigate('/login');
      }
    }

    return (
        <div  style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
            {shouldShowNavbar && <nav className="navbar"  >
                <div style={{display:'block'} } >
                    <div className="navbar-logo" >
                        <img src={LOGO} alt="logo" className="logo-icon"  />
                        <p className="email">Fly Cleaner</p>
                        <FaUserTie  onClick={handleAuth} className={'logo-icon2'} />
                        <MdDashboard style={{color:'navy'}} size={20}  onClick={() => navigate('/cleanerprofile')}  className={'logo-icon2'}/>
                        <MdAdminPanelSettings size={20} style={{color:'purple'}}  onClick={() => navigate('/customer')} className={'logo-icon2'} />
                        <FaBars style={{width:'20px', height:'30px'}}  className={` hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>open</FaBars>
                    </div>
                    <ul className={`nav-menu ${isMobile ? 'mobile' : ''} ${isOpen ? 'active' : ''}`}>
                        {navLinks.map(link => (<li key={link.id} className="nav-item" >
                            <Link
                                to={link.path}
                                style={activeTab === link.path ? {color:'brown', textDecoration: 'underline'} : {color:'', textDecoration: ''}}
                                className={activeTab === link.path ? 'active' : ''}
                                onClick={() => { isMobile && setIsOpen(false); setActiveTab(link.path)}}>
                                {link.name}
                            </Link>
                        </li>))}
                    </ul>
                </div>
            </nav> }
        </div>
    );
};

export default Navigation;