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
import React from "react";
import Locations from "./Locations.jsx";
import {Link} from 'react-router-dom'

const LocationFooter = () => {

    const customerActions = [
        { id: "pricing", category: "Pricing", path: "/pricing" },
        { id: "whats-included", category: "What's included", path: "/what-included" },
        { id: "blog", category: "Blog" },
        { id: "booking-policy", category: "Booking Policy", path: "/booking" },
        { id: "cancellation-policy", category: "Cancellation Policy", path: "/cancellation" },
        { id: "terms-conditions", category: "Terms & Conditions", path: "/terms" },
        { id: "privacy-policy", category: "Privacy Policy" , path: "/privacy" },
        { id: "cookies-policy", category: "Cookies Policy", path: "/cookies" },
        { id: "reclean-guarantee", category: "Reclean Guarantee", path: "/reclean" },
        { id: "sitemap", category: "Sitemap", path: "/sitemap" }
    ]

    const services = [
        { id: 'domestic', icon: 'fa-home', title: 'Domestic cleaning', description: 'One-off cleaning for your home',src: Domestic  },
        { id: 'upholstery', icon: 'fa-home', title: 'Upholstery cleaning', description: 'Upholstery cleaning for surfaces', src: Upholstery },
        { id: 'regulqr', icon: 'fa-home', title: 'Regular cleaning', description: 'Regular cleaning for your home', src: Regular },
        { id: 'end-tenancy', icon: 'fa-couch', title: 'End of tenancy', description: 'Thorough cleaning to get your deposit back', src: EndOfTenancy },
        { id: 'carpet', icon: 'fa-rug', title: 'Carpet cleaning', description: 'Professional deep cleaning for carpets', src: LivingRoom },
        { id: 'deep', icon: 'fa-broom', title: 'Deep cleaning', description: 'Intensive cleaning for neglected spaces', src: Deep },
        { id: 'office', icon: 'fa-home', title: 'Office cleaning', description: 'Detailed cleaning for office space', src: Office },
        { id: 'move', icon: 'fa-home', title: 'Move in  cleaning', description: 'We will get your new home ready for habitaion', src: Move},
        { id: 'rug', icon: 'fa-home', title: 'Rug cleaning', description: 'Professional deep cleaning for rugs', src: Rug },
        { id: 'mattress', icon: 'fa-home', title: 'Mattress cleaning', description: 'Professional deep cleaning for mattress', src: Mattress },
        { id: 'bathroom', icon: 'fa-home', title: 'Bathroom cleaning', description: 'We provide deep cleaning for bathrooms', src: Bathroom },
        { id: 'spring', icon: 'fa-home', title: 'Spring cleaning', description: 'We offer end of spring cleaning for households', src: Spring },
    ];

    const whoWeAre = [
        {id:'about', category: 'About us', path:'/about'},
        {id:'contact', category: 'Contact us', path:'/contact'},
        {id:'reviews', category: 'Reviews', path:'/reviews'},
    ]

    return (
        <footer className="footer-banner">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 style={{color:'white'}}>Our services</h3>
                        <ul>
                            {services.map( service => (
                                <li key={service.id}>
                                    <Link to={`/services/${service.title}`}>
                                        <div>
                                            <p>{service.title}</p>
                                        </div>
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
                                    <Link to={action.path} target="_blank" rel="noopener noreferrer">
                                        <div>
                                            <p>{action.category}</p>
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
                                            <p>{who.category}</p>
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
                                <Link to={'/become'}>
                                    <p>Become a fly cleaner</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>{new Date().getFullYear()} Flymax. All rights reserved.</p>
                    <div className="legal-links">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default LocationFooter;