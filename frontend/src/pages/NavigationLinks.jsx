import React, {useState} from "react";
import '../App.css';

const NavLinks = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [isScrolled, setIsScrolled] = useState(false);
    return (
        <div>
            <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container header-container">
                    <div className="logo">
                        <h1>Flymax</h1>
                        <p style={{fontSize:'small'}}>Professional Cleaning Services</p>
                    </div>

                    <nav className="desktop-nav">
                        <ul>
                            <li className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</li>
                            <li className={activeTab === 'locations' ? 'active' : ''} onClick={() => setActiveTab('locations')}>Locations</li>
                            <li className={activeTab === 'services' ? 'active' : ''} onClick={() => setActiveTab('services')}>Services</li>
                            <li className={activeTab === 'pricing' ? 'active' : ''} onClick={() => setActiveTab('pricing')}>Pricing</li>
                            <li className={activeTab === 'about' ? 'active' : ''} onClick={() => setActiveTab('about')}>About</li>
                            <li className={activeTab === 'gift' ? 'active' : ''} onClick={() => setActiveTab('gift')}>Gift</li>
                            <li className={activeTab === 'help' ? 'active' : ''} onClick={() => setActiveTab('help')}>Help</li>
                            <li className={activeTab === 'reclean' ? 'active' : ''} onClick={() => setActiveTab('reclean')}>Reclean</li>
                            <li className={activeTab === 'contact' ? 'active' : ''} onClick={() => setActiveTab('contact')}>Contact us</li>
                            <li className={activeTab === 'become' ? 'active' : ''} onClick={() => setActiveTab('become')}>Become a cleaner</li>
                            <li className={activeTab === 'sign' ? 'active' : ''} onClick={() => setActiveTab('sign')}>Sign up</li>
                        </ul>
                    </nav>

                </div>
            </header>
        </div>
    )
}

export default NavLinks;