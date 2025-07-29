// components/TopNav.js
import React from 'react';
import { FaBell, FaSearch, FaQuestionCircle } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

const TopNav = () => {
    return (
        <div className="top-nav">
            <div className="search-bar">
                <FaSearch className="search-icon" />
                <input type="text" placeholder="Search..." />
            </div>
            <div className="nav-right">
                <button className="nav-btn help-btn">
                    <FaQuestionCircle />
                    <span>Help</span>
                </button>
                <button className="nav-btn notification-btn">
                    <FaBell />
                    <span className="badge">3</span>
                </button>
                <button className="nav-btn messages-btn">
                    <IoMdMail />
                    <span className="badge">5</span>
                </button>
                <div className="user-menu">
                    <div className="avatar small">AD</div>
                </div>
            </div>
        </div>
    );
};

export default TopNav;