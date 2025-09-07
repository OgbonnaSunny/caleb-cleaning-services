import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Kitchen from '../images/neatKitchen.png'
import LOGO from "../images/logo4.png";

const About = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'About';
    })

    return (
        <div className="about-container">
            <header className="about-hero">
                <div className="overlay">
                    <img  src={LOGO} alt={''} className={'logo-icon'}/>
                    <h1 className={'experience-text'}>About Us</h1>
                    <p>Your Trusted Cleaning Partner in Edinburgh</p>
                </div>
            </header>

            <section className="support-page">
                <div className="idea-container">
                    <div className="about-text">
                        <h2 style={{textAlign:'center'}}>Who We Are</h2>
                        <div className="idea-container">
                            <p style={{textAlign:'start'}}>
                                At <strong>Fly Cleaning Services</strong>, we pride ourselves
                                on being one of the most reliable and affordable cleaning companies
                                in Edinburgh. Established with the mission of making homes and
                                businesses spotless, our team is dedicated to delivering top-notch
                                cleaning solutions tailored to your specific needs.
                            </p>
                            <p style={{textAlign:'start'}}>
                                We cover a wide range of services including domestic cleaning, deep
                                cleaning, carpet & upholstery cleaning, office cleaning, and end of
                                tenancy cleaning. Whether you’re a busy professional, a landlord, or
                                a property manager, we’ve got you covered.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="about-image">
                    <img
                        src={Kitchen}
                        alt="Cleaning team at work"
                    />
                </div>
            </section>

            <section className="mission-vision">
                <div className="mission">
                    <h2>Our Mission</h2>
                    <p>
                        To provide consistent, high-quality cleaning services that give our
                        clients peace of mind and a healthier environment.
                    </p>
                </div>
                <div className="vision">
                    <h2>Our Vision</h2>
                    <p>
                        To be recognised as the Edinburgh’s most trusted cleaning company,
                        delivering excellence and setting the standard for professional
                        cleaning.
                    </p>
                </div>
            </section>

            <section className="values-section">
                <h2>Our Core Values</h2>
                <div className="values-grid">
                    <div className="value-card">
                        <h3>Reliability</h3>
                        <p>Always on time, every time. We respect your schedule.</p>
                    </div>
                    <div className="value-card">
                        <h3>Professionalism</h3>
                        <p>
                            Fully trained and uniformed staff providing consistent, quality
                            results.
                        </p>
                    </div>
                    <div className="value-card">
                        <h3>Eco-Friendly</h3>
                        <p>
                            We use safe, non-toxic, and sustainable products wherever
                            possible.
                        </p>
                    </div>
                    <div className="value-card">
                        <h3>Customer Satisfaction</h3>
                        <p>
                            Our clients’ happiness is our top priority – we don’t settle for
                            less.
                        </p>
                    </div>
                </div>
            </section>

            <section className="about-cta">
                <h2>Why Choose Us?</h2>
                <p className={'support-page'} style={{textAlign:'center', color:'white'}}>
                    With affordable rates, flexible schedules, and a team of friendly
                    professionals, we make it easy for you to enjoy a spotless home or
                    office. Trusted by hundreds of clients across Edinburgh, we go above and
                    beyond to exceed expectations.
                </p>
                <button onClick={() => navigate('/contact')} className="contact-btn">Contact Us Today</button>
            </section>
        </div>
    );
};

export default About;

