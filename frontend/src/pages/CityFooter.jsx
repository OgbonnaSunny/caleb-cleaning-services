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
import { Link } from 'react-router-dom'

const CityFooter = () => {

    const customerActions = [
        { id: "pricing", name: "Pricing", path: "/pricing" },
        { id: "whats-included", name: "What's included", path: "/what-included" },
        { id: "blog", name: "Blog" },
        { id: "booking-policy", name: "Booking Policy", path: "/booking-policy" },
        { id: "cancellation-policy", name: "Cancellation Policy", path: "/cancellation-policy" },
        { id: "terms-conditions", name: "Terms & Conditions", path: "/terms-conditions" },
        { id: "privacy-policy", name: "Privacy Policy" , path: "/privacy-policy" },
        { id: "cookies-policy", name: "Cookies Policy", path: "/cookies-policy" },
        { id: "reclean-guarantee", name: "Reclean Guarantee", path: "/reclean-guarantee" },
        { id: "sitemap", name: "Sitemap", path: "/sitemap" }
    ]

    const services = [
        { id: 'domestic', icon: 'fa-home', title: 'Domestic cleaning', description: 'One-off cleaning for your home',src: Domestic  },
        { id: 'upholstery', icon: 'fa-home', title: 'Upholstery cleaning', description: 'Upholstery cleaning for surfaces', src: Upholstery },
        { id: 'regulqr', icon: 'fa-home', title: 'Regular cleaning', description: 'Regular cleaning for your home', src: Regular },
        { id: 'commercial', icon: 'fa-building', title: 'Commercial cleaning', description: 'Office and workplace cleaning services', src: Commercial },
        { id: 'end-tenancy', icon: 'fa-couch', title: 'End of tenancy', description: 'Thorough cleaning to get your deposit back', src: EndOfTenancy },
        { id: 'carpet', icon: 'fa-rug', title: 'Carpet cleaning', description: 'Professional deep cleaning for carpets', src: LivingRoom },
        { id: 'deep', icon: 'fa-broom', title: 'Deep cleaning', description: 'Intensive cleaning for neglected spaces', src: Deep },
        { id: 'window', icon: 'fa-window-maximize', title: 'Window Cleaning', description: 'Streak-free interior and exterior windows', src: WindowCleaner },
        { id: 'office', icon: 'fa-home', title: 'Office cleaning', description: 'Detailed cleaning for office space', src: Office },
        { id: 'day', icon: 'fa-home', title: 'Same day cleaning', description: 'Quickly get your home in order as quickly as possible', src: Day},
        { id: 'move', icon: 'fa-home', title: 'Move in  cleaning', description: 'We will get your new home ready for habitaion', src: Move},
        { id: 'rug', icon: 'fa-home', title: 'Rug cleaning', description: 'Professional deep cleaning for rugs', src: Rug },
        { id: 'mattress', icon: 'fa-home', title: 'Mattress cleaning', description: 'Professional deep cleaning for mattress', src: Mattress },
        { id: 'bathroom', icon: 'fa-home', title: 'Bathroom cleaning', description: 'We provide deep cleaning for bathrooms', src: Bathroom },
        { id: 'spring', icon: 'fa-home', title: 'Spring cleaning', description: 'We offer end of spring cleaning for households', src: Spring },
    ];

    const whoWeAre = [
        {id:'about', name: 'About us', path:'/about'},
        {id:'contact', name: 'Contact us', path:'/contact'},
        {id:'reviews', name: 'Reviews', path:'/reviews'},
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
        { id: 94, name: "Canonbury" },
        { id: 95, name: "Canons" },
        { id: 96, name: "Cantelowes" },
        { id: 166, name: "Dormers Wells" },
        { id: 167, name: "Downham" },
        { id: 168, name: "Dudden Hill" },
        { id: 200, name: "Enfield" },
        { id: 201, name: "Enfield Highway" },
        { id: 202, name: "Enfield Lock" },
        { id: 284, name: "Hatch Lane" },
        { id: 285, name: "Havering" },
    ]

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 style={{color:'white'}}>Cleaner locations</h3>
                        <ul>
                            <li>
                                <Link to={`/locations`} style={{color:'aqua', marginTop:'20px'}}>See other cleaner locations</Link>
                            </li>
                        </ul>
                    </div>
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
                                    <Link to={action.path}>
                                        <div>
                                            <p>{action.name}</p>
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

export default CityFooter;