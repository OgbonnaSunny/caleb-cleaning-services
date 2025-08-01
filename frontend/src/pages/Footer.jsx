import React from "react";
import Domestic from "../images/domestic.png";
import Upholstery from "../images/upholstery2.png";
import Regular from "../images/regular.png";
import Commercial from "../images/commercial.png";
import EndOfTenancy from "../images/endOfTenancy.png";
import LivingRoom from "../images/livingRoom.png";
import Deep from "../images/deep.png";
import WindowCleaner from "../images/regular.png";
import Office from "../images/office.png";
import Day from "../images/day.png";
import Move from "../images/move.png";
import Rug from "../images/rug.png";
import Mattress from "../images/mattress.png";
import Bathroom from "../images/bathroom.png";
import Spring from "../images/spring.png";
import {Link} from 'react-router-dom'
import Kitchen from "../images/kitchen.png";
import Oven from "../images/oven.png";
import { useLocation } from "react-router-dom";

const Footer = () => {
    const location = useLocation();

    const customerActions = [
        { id: "pricing", name: "Pricing", path: "/pricing" },
        { id: "whats-included", name: "What's included", path: "/what-included" },
        { id: "blog", name: "Blog" },
        { id: "booking-policy", name: "Booking Policy", path: "/booking" },
        { id: "cancellation-policy", name: "Cancellation Policy", path: "/cancellation" },
        { id: "terms-conditions", name: "Terms & Conditions", path: "/terms" },
        { id: "privacy-policy", name: "Privacy Policy" , path: "/privacy" },
        { id: "cookies-policy", name: "Cookies Policy", path: "/cookies" },
        { id: "reclean-guarantee", name: "Reclean Guarantee", path: "/reclean" },
        { id: "sitemap", name: "Sitemap", path: "/sitemap" }
    ]

    const services = [
        { id: 'Upholstery ', icon: 'fa-home', title: 'Upholstery cleaning', description: 'Upholstery cleaning for surfaces', src: Upholstery },
        { id: 'Regulqr', icon: 'fa-home', title: 'Regular cleaning', description: 'Regular cleaning for your home', src: Regular },
        { id: 'End of tenancy', icon: 'fa-couch', title: 'End of tenancy', description: 'Thorough cleaning to get your deposit back', src: EndOfTenancy },
        { id: 'Carpet', icon: 'fa-rug', title: 'Carpet cleaning', description: 'Professional deep cleaning for carpets', src: LivingRoom },
        { id: 'Deep', icon: 'fa-broom', title: 'Deep cleaning', description: 'Intensive cleaning for neglected spaces', src: Deep },
        { id: 'Office', icon: 'fa-home', title: 'Office cleaning', description: 'Detailed cleaning for office space', src: Office },
        { id: 'Same day', icon: 'fa-home', title: 'Same day cleaning', description: 'Quickly get your home in order as quickly as possible', src: Day},
        { id: 'Move in', icon: 'fa-home', title: 'Move in  cleaning', description: 'We will get your new home ready for habitaion', src: Domestic},
        { id: 'Rug', icon: 'fa-home', title: 'Rug cleaning', description: 'Professional deep cleaning for rugs', src: Rug },
        { id: 'Bathroom', icon: 'fa-home', title: 'Bathroom cleaning', description: 'We provide deep cleaning for bathrooms', src: Bathroom },
        { id: 'Kitchen deep', icon: 'fa-home', title: 'Kitchen deep', description: 'Professional deep kitchen cleaning', src: Kitchen },
        { id: 'Oven', icon: 'fa-building', title: 'Oven', description: 'Oven cleaning services', src: Oven},
    ];

    const whoWeAre = [
        {id:'about', name: 'About us', path:'/frontend/about'},
        {id:'contact', name: 'Contact us', path:'/frontend/contact'},
        {id:'reviews', name: 'Reviews', path:'/frontend/reviews'},
    ]

    const cleanerLocations = [
        { id: 3, name: "Abbey Wood" },
        { id: 4, name: "Abingdon" },
        { id: 5, name: "Acton Central" },
        { id: 6, name: "Addiscombe East" },
        { id: 16, name: "Balham" },
        { id: 17, name: "Barking" },
        { id: 18, name: "Barkingside" },
        { id: 19, name: "Barnehurst" },
        { id: 20, name: "Barnes" },
        { id: 21, name: "Barnet" },
        { id: 93, name: "Cannon Hill" },

    ]

    const currentLocation = location.pathname
    const hide = {display:'none'};
    const show = {display:''};
    const hideNavbarPaths = ['/frontend/pricing', '/frontend/blog', '/frontend/reclean', '/frontend/sitemap']; // Paths where navbar should be hidden
    const names = ['Pricing', 'Blog', 'Reclean Guarantee', 'Sitemap']
    const pathIncluded = hideNavbarPaths.includes(location.pathname);

    // target="_blank" rel="noopener noreferrer"

    return (
        <footer className="footer-banner">
            <div className="container" >

                <div className="footer-content" >
                    <div className="footer-section" style={currentLocation === '/frontend/locations' ? hide : show}>
                        <h3 style={{color:'white'}}>Cleaner locations</h3>
                        <ul>
                            {cleanerLocations.map(location => (
                                <li key={location.id}>
                                    <Link to="/frontend/city" state={{ id: location.id, name: location.name }}>
                                        {location.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link to={`/frontend/locations`} style={{color:'green', marginTop:'20px'}}>See more</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-section" style={currentLocation === '/frontend/services' ? hide : show}>
                        <h3 style={{color:'white'}}>Our services</h3>
                        <ul>
                            {services.map( service => (
                                <li key={service.id}>
                                    <Link to={'/frontend/services'} state={{ id: service.id, name: service.title }}>
                                        {service.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 style={{color:'white'}}>For our customers</h3>
                        <ul>
                            {customerActions.map(action => (
                                <li key={action.id}>
                                    <Link to={action.path} target="_blank" rel="noopener noreferrer" >
                                        <div>
                                            <p style={pathIncluded && names.includes(action.name) && action.path === location.pathname ? hide : show}>
                                                {action.name}
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 style={{color:'white'}}>Who we are!</h3>
                        <ul>
                            {whoWeAre.map((who) => (
                                <li key={who.id}>
                                    <Link to={who.path}>
                                        <div>
                                            <p>{who.name}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 style={{color:'white'}}>For cleaners</h3>
                        <ul>
                            <li>
                                <Link to={'/frontend/become'}>
                                    <p>Become a fly cleaner</p>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 style={{color:'white'}}>Subscribe to our news letter</h3>
                        <input type={'email'} name='email' placeholder='Email'  style={{border:'medium', padding:'10px', borderRadius:'10px', background:'white', color:'white'}} />
                        <button style={{color:'black', width:'150px', background:'white', marginTop:'10px'}}>Subscribe</button>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>{new Date().getFullYear()} Flymax. All rights reserved.</p>
                    <div className="legal-links">
                        <Link to="/frontend/privacy">Privacy Policy</Link>
                        <Link to="/frontend/terms">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;