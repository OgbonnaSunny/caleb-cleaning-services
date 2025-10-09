import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // We'll create this CSS file next
import {FaBars, FaUsers, FaUserTie, FaTimes, FaCommentDots, FaUser, FaUserAlt, FaUserMd} from 'react-icons/fa';
import LOGO from '../images/logo4.png'
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
import {FaCircleUser, FaRectangleXmark, FaRegUser, FaUserLock} from 'react-icons/fa6'; // Font Awesome solid rectangle
import { MdRectangle } from 'react-icons/md'; // Material Design rectangle (outline)
import { MdDashboard } from 'react-icons/md'; // Material Design
import { BsSpeedometer2 } from 'react-icons/bs'; // Bootstrap (speedometer-style)
import { MdAdminPanelSettings } from 'react-icons/md'; // Material Design (best for admin)
import { FaUserCog } from 'react-icons/fa'; // Font Awesome
import { IoPersonCircleSharp } from 'react-icons/io5'; // Ionicons (user-focused)


const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const BASE_URL = import.meta.env.VITE_API_URL;

    const emitter = new EventEmitter();
    const navLinks = [
        {id: 1, category: 'Overview', path: '/overview' },
        {id: 2, category: 'Locations', path: '/locations' },
        {id: 3, category: 'Services', path: '/services' },
        {id: 4, category: 'Pricing', path: '/pricing' },
        {id: 5, category: 'Blog', path: '/blog' },
        {id: 6, category: 'Gift', path: '/gift' },
        {id: 7, category: 'Help', path: '/help' },
        {id: 8, category: 'Reclean', path: '/reclean' },
        {id: 9, category: 'Cleaners', path: '/become' }
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

    const hideNavbarPaths = ['/cashback','/checkout', '/bookings', '/reports', '/settings']; // Paths where navbar should be hidden
    let shouldShowNavbar =  navLinks.includes(location.pathname);

    const [activeTab, setActiveTab] = useState('/overview');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [showNav, setShowNav] = useState(true);
    const [role, setRole] = useState('none');

    useEffect(() => {
        const checUser = () => {
            const currentUser = JSON.parse(localStorage.getItem('user'));
            if (currentUser) {
                setRole(currentUser?.roles)
            }
            else {
                setRole('none');
            }
        }

        window.addEventListener('storage', checUser);

        return () => window.removeEventListener('storage', checUser);

    }, []);

    useEffect(() => {
        let show = false;
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setRole(user?.roles);
        }
        else {
            setRole('none');
        }


        switch (location.pathname) {
            case '/cleanerprofile':
                document.title = "My App";
                break;

            case '/customer':
                document.title = "My App";
                break;

           case '/checkout':
               document.title = "Book Cleaning";
               break;

           case '/login':
               document.title = "Login";
               break;

           case '/signup':
               document.title = "Signup";
               break;

            case '/logout':
                document.title = "Logout";
                break;
        }

        function replaceLastSegment(newSegment) {
            const path = window.location.pathname;
            const segments = path.split('/');
            segments[segments.length - 1] = newSegment;
            return segments.join('/').replace(/[ ,]+/g, '-');
        }

        for (let i = 0; i < navLinks.length; i++) {
            if (navLinks[i].path === location.pathname) {
                const title = navLinks[i].category.charAt(0).toUpperCase() + navLinks[i].category.slice(1);
                document.title = title;
                setActiveTab(navLinks[i].path);
                show = true;
                break;
            }
        }

        if (location.pathname === '/') {
            setActiveTab('/overview');
            document.title = "Overview";
            show = true;
            window.history.replaceState(null, '', replaceLastSegment('overview'));
        }

        setShowNav(show);

    }, [location.pathname]);

    const handleHomeNav = () => {
        const path = window.location.pathname;
        if (path === '/' || path === '/overview') {
            window.location.reload();
            document.title = "Overview";
            return;
        }
        navigate('/overview');
    }

    useEffect(() => {

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

        emitter.on('auth', checkLoginStatus);

        return () => emitter.off('auth', checkLoginStatus);

    }, []);

    const handleAuth = () => {
      navigate('/customer');
      return
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
          window.open('/logout', '_blank');
      }
      else {
          window.open('/login', '_blank');
      }
    }

    const handleNavigation = (path) => {
        let inMainNav = false;
        for (let i = 0; i < navLinks.length; i++) {
            if (navLinks[i].path === path) {
                inMainNav = true;
                break;
            }
        }
        if (inMainNav) {
            setActiveTab(path);
        }
    }

    return (
        <div  style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(245, 255, 250, 0.75)',
        }} >
            {showNav &&
                <nav className="navbar">
                    <div style={{display:'block'} }>
                        <div className="navbar-logo" >
                            <img src={LOGO} alt="logo" className="logo-icon" onClick={handleHomeNav} />
                            <h1  className="main-header">Fly Cleaner</h1>
                            <FaUserTie className={'logo-icon3'}   onClick={handleAuth}  />
                            {role === 'cleaner' && <MdDashboard style={{color:'navy'}} onClick={() => navigate('/cleanerprofile')}  className={'logo-icon2'}/> }
                            {role === 'user' &&  <MdDashboard  style={{color:'purple'}}  onClick={() => navigate('/customer')} className={'logo-icon2'} /> }
                            {role === 'admin' &&  <MdAdminPanelSettings  style={{color:'purple'}}  onClick={() => navigate('/admin')} className={'logo-icon2'} /> }

                            {!isOpen && <FaBars
                                style={{width:'70px', height:'30px', marginLeft:'10px'}}
                                className={`hamburger ${isOpen ? 'open' : ''}`}
                                onClick={toggleMenu}>
                                open
                            </FaBars>
                            }
                            {isOpen && <FaTimes
                                style={{width:'40px', height:'30px', marginLeft:'10px'}}
                                className={` hamburger ${isOpen ? 'open' : ''}`}
                                onClick={toggleMenu}>
                                open
                            </FaTimes>
                            }
                    </div>
                    <ul className={`nav-menu ${isMobile ? 'mobile' : ''} ${isOpen ? 'active' : ''}`}>
                        {navLinks.map(link => (<li key={link.id} className="nav-item" >
                            <Link
                                to={link.path}
                                style={activeTab === link.path ? {color:'brown', textDecoration: 'underline'} : {color:'', textDecoration: ''}}
                                className={activeTab === link.path ? 'active' : ''}
                                onClick={() => { isMobile && setIsOpen(false); handleNavigation(link.path)}}>
                                {link.category}
                            </Link>
                        </li>))}
                    </ul>
                </div>
            </nav>
            }
        </div>
    );
};

export default Navigation;