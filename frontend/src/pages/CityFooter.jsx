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
        { id: "booking-policy", category: "Booking Policy", path: "/booking-policy" },
        { id: "cancellation-policy", category: "Cancellation Policy", path: "/cancellation-policy" },
        { id: "terms-conditions", category: "Terms & Conditions", path: "/terms-conditions" },
        { id: "privacy-policy", category: "Privacy Policy" , path: "/privacy-policy" },
        { id: "cookies-policy", category: "Cookies Policy", path: "/cookies-policy" },
        { id: "sitemap", category: "Sitemap", path: "/sitemap" }
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
        {id:'about', category: 'About us', path:'/about'},
        {id:'contact', category: 'Contact us', path:'/contact'},
        {id:'reviews', category: 'Reviews', path:'/reviews'},
    ]
    const special = [
        { id: "whats-included", category: "What's included", path: "/services" },
        { id: "blog", category: "Blog", path: "/blog" },
        { id: "reclean-guarantee", category: "Reclean Guarantee", path: "/reclean" },
        { id: "pricing", category: "Pricing", path: "/pricing" },
    ]

    const currentLocation = location.pathname
    const hide = {display:'none'};
    const show = {display:''};
    const hideNavbarPaths = ['/pricing', '/blog', '/reclean', '/sitemap']; // Paths where navbar should be hidden
    const names = ['Pricing', 'Blog', 'Reclean Guarantee', 'Sitemap']
    const pathIncluded = hideNavbarPaths.includes(location.pathname);

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 style={{color:'white'}}>Cleaner locations</h3>
                        <ul style={{color:'grey'}}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <div className={'footer-mark'}></div>
                                <Link style={{padding:'10px'}} to={`/locations`}>
                                    See other cleaner locations
                                </Link>
                            </div>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 style={{color:'white'}}>Our services</h3>
                        <ul style={{color:'grey'}} >
                            {services.map( service => (
                                <div key={service.id} style={{display:'flex', alignItems:'center'}}>
                                    <div className={'footer-mark'}></div>
                                    <Link style={{padding:'10px'}} to={'/services'}>
                                        {service.title}
                                    </Link>
                                </div>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 style={{color:'white'}}>For our customers</h3>
                        <ul style={{color:'grey'}} >
                            {customerActions.map(action => (
                                <div key={action.id} style={{display:'flex', alignItems:'center'}}>
                                    <div className={'footer-mark'}></div>
                                    <Link style={{padding:'10px'}} to={action.path}>
                                        {action.category}
                                    </Link>
                                </div>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 style={{color:'white'}}>Get more insight</h3>
                        <ul style={{color:'grey'}}>
                            {special.map(action => (
                                <div key={action.id} style={pathIncluded && names.includes(action.category)
                                && action.path === location.pathname ? hide : show}>
                                    <div style={{display:'flex', alignItems:'center'}}>
                                        <div className={'footer-mark'}></div>
                                        <h5 style={{padding:'10px'}}>
                                            <Link to={action.path}>{action.category}</Link>
                                        </h5>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 style={{color:'white'}}>Who we are!</h3>
                        <ul style={{color:'grey'}} >
                            {whoWeAre.map((who) => (
                                <div key={who.id} style={{display:'flex', alignItems:'center'}}>
                                    <div className={'footer-mark'}></div>
                                    <Link style={{padding:'10px'}} to={who.path}>
                                        {who.category}
                                    </Link>
                                </div>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 style={{color:'white'}}>For cleaners</h3>
                        <ul style={{color:'grey'}} >
                            <div style={{display:'flex', alignItems:'center'}}>
                                <div className={'footer-mark'}></div>
                                <Link style={{padding:'10px'}} to={'/become'}>
                                    Become a fly cleaner
                                </Link>
                            </div>
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