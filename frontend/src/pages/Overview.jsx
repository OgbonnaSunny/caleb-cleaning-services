import React, { useState, useEffect } from 'react';
import '../App.css';
import Navigation from './NavigationLinks.jsx'
import NavigationItem from './Navigation.jsx'
import OfficeCleaner from '../images/officeCleaner.png'
import FlyCleaner from '../images/flyCleaners.png'
import LivingRoom from '../images/livingRoom.png'
import { Link } from 'react-router-dom'
import Domestic from '../images/domestic.png'
import Upholstery from '../images/upholstery2.png'
import Regular from '../images/regular.png'
import Commercial from '../images/commercial.png'
import EndOfTenancy from '../images/endOfTenancy.png'
import WindowCleaner from '../images/regular.png'
import Rug from '../images/rug.png'
import Mattress from '../images/mattress.png'
import Bathroom from '../images/bathroom.png'
import Spring from '../images/spring.png'
import Office from '../images/office.png'
import Day from '../images/day.png'
import Move from '../images/move.png'
import Deep from '../images/deep.png'
import Currency from '../images/currency.png'
import Booking from '../images/booking.png'
import Manage from '../images/manage.png'
import Kitchen from '../images/kitchen.png'
import Oven from '../images/oven.png'
import Footer from '../pages/Footer.jsx'
import { useNavigate } from 'react-router-dom';
import { isValidUKPostcodeFormat, checkPostcodeExists } from './Postcode.jsx'

const Overview = () => {
    const navigate = useNavigate();

    const miniService = [
        { id: 'Upholstery', icon: 'fa-home', title: 'Upholstery cleaning', description: 'Upholstery cleaning for surfaces', src: Upholstery },
        { id: 'Regulqr', icon: 'fa-home', title: 'Regular cleaning', description: 'Regular cleaning for your home', src: Regular },
        { id: 'End of tenancy', icon: 'fa-couch', title: 'End of tenancy', description: 'Thorough cleaning to get your deposit back', src: EndOfTenancy },
        { id: 'Carpet', icon: 'fa-rug', title: 'Carpet cleaning', description: 'Professional deep cleaning for carpets', src: LivingRoom },
    ]
    const [isScrolled, setIsScrolled] = useState(false);
    const [formData, setFormData] = useState({
        postcode: '',
        name:'',
        phone:'',
        email:'',
        message:'',
        service:'',
    });
    const [serviceList, setServiceList] = useState(miniService);
    const [isAllServices, setIsAllServices] = useState(false)
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.postcode.trim()) {
            setError('Please enter a postcode');
            return;
        }
        if (!isValidUKPostcodeFormat(formData.postcode)) {
            setError(`${formData.postcode} is not a valid postcode`);
            return;
        }
        checkPostcodeExists(formData.postcode).then(exists => {
            if (!exists) {
                setError(`${formData.postcode} does not exist`);
                return;
            }
        })

        navigate('/checkout', { state: { postcode: formData.postcode } });
    };

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

    const upadateServiceList = () => {
        if (serviceList.length === miniService.length) {
            setServiceList(services);
        }
        else {
            setServiceList(miniService);
        }
        setIsAllServices(!isAllServices);
    }

    const testimonials = [
        { id: 1, rating: 5, text: "The team did an amazing job cleaning my flat. It looked brand new!", author: "Sarah K." },
        { id:2, rating: 5, text: "Reliable service week after week. Highly recommend.", author: "James T." },
        { id: 3, rating: 5, text: "They transformed my office space completely. Will use again.", author: "Priya M." }
    ];

    const pricings = [{id:'regular', name:'Regular cleaning', price:'from £19/h', desc: 'Regular visits by a professional cleaner in West London who will vacuum, dust, and clean surfaces in all living areas, bathrooms, and kitchen. Additional services such as laundry, changing bed linen, and washing dishes can be added upon request.'},
        {id:'one-off', name: 'One-off domestic cleaning', price: 'from £19/h', desc:'A comprehensive deep cleaning of the entire property, including thorough cleaning of bathrooms, kitchens, living areas, and bedrooms, as well as dusting and vacuuming throughout.'}]

    const stages = [
        {id:'submit', src: Booking, stage:'Stage 1', name:'Submit your booking online', steps:['Enter error','Choose a type of cleaning','Select a cleaning schedule', 'Choose rooms to get an estimated price', 'Select additional cleaning services if you need them', 'Indicate the level of dirt in your property']},
        {id:'pay', src: Currency, stage:'Stage 2', name: 'Pay as you go', steps: [' The estimated amount of your booking will be held in your bank account', ' You will only be charged after the cleaning session is completed and according to the actual time a cleaner worked']},
        {id:'manage',src: Manage,  stage: 'Stage 3', name: 'Manage your booking online', steps: [' When you submit your cleaning request, your booking becomes available to all cleaners in the system',
            ' When you make an appointment with a cleaner, we email you or send a text message through the app', 'You can use MyAccount on our website or the eMop App to keep track of your booking']}
    ]

    const pack = [
        {id:1 ,name:'Bedroom, living, dining rooms', packs:['Dusting all accessible surfaces','Clean and wipe mirrors and glass fixtures', 'Cleaning surfaces', 'Wiping appliances', 'Folding clothes and arranging things', 'Wiping doors, door handles, and switches', 'Cleaning lighting appliances, and chandeliers', 'Vacuum cleaning of the carpets and washing the floor and skirting boards', 'Taking out rubbish', 'Hoovering and mopping floors']},
        {id:2, name: 'Bathroom', packs: ['Cleaning surfaces such as tiles, shower cabin, bath sink, toilet and seat', 'Washing and sanitizing the toilet, the sink and the bidet', 'Cleaning and washing the shower and the tub', 'Wiping down mirrors, glass fixtures and lighting appliance', 'Dusting all accessible surfaces', 'Wiping down walls, doors, door handles and switches', 'Vacuuming and washing the floor and skirting boards', 'Taking out rubbish']},
        {id:3, name: 'Kitchen', packs: ['Cleaning all accessible surfaces from dust and grease (sink, sink faucet, table surface, stove and kitchen equipment)', 'Cleaning the front, upper and bottom kitchen facades', 'Vacuuming and washing the floor and skirting boards', 'Wiping doors, door handles, and switches', 'Doing washing-up', 'Taking out rubbish']},
        {id:4, name: 'Office Cleaning', packs: ['Mopping, cleaning, brooming, and vacuuming procedures', 'Dusting of desks and computer equipment', 'Vacuum cleaning carpets mopping the floor, and cleaning skirting boards', 'Wiping mirrors and glass fixtures', 'Toilet and shower washing and sanitizing', 'Kitchen cleaning: washing all used crockery and equipment as well as cleaning all the external surfaces', 'Taking out rubbish and replacing with new bin liners', 'Carpet and windows deep cleaning']},
        {id:5, name: 'Halls and stairs', packs: ['Dusting all accessible surfaces', 'Cleaning mirrors and glass surfaces', 'Cleaning the front door (inside)', 'Vacuuming and mopping the floor and the skirting boards', 'Arranging things', 'Taking out rubbish']}
    ]

    const navLinks = [
        {id:'location', name: 'Locations', path: '/locations' },
        {id:'services', name: 'Services', path: '/services' },
        {id:'pricing', name: 'Pricing', path: '/pricing' },
        {id:'blog', name: 'Blog', path: '/about' },
        {id:'gift', name: 'Gift', path: '/gift' },
        {id:'help', name: 'Help', path: '/help' },
        {id:'reclean', name: 'Reclean', path: '/reclean' },
        {id:'become', name: 'Become a cleaner', path: '/become' },
        {id:'sing', name: 'Sign up', path: '/signup' }
    ];

    const sendMessage = message => {}

    const reason = 'The highly desirable West London housing area is pricey, so people always appreciate affordable cleaning services. Our prices start from £15/hr, which is a steal to get your house professionally cleaned. If the cleaning process takes more or less than an hour, we offer payment by the minute.'
        'We are one of the best cleaning agencies in London in general and West London in particular. If needed, our cleaners will arrive at your West London house or office on the same day.'
        'The types of domestic cleaning services offered extends well beyond the standard packages. So, you can easily customise your order depending on what your specific requirements for cleaning are at the time, for example, you can easily order end of tenancy cleaning or office cleaning.'

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures it takes at least full viewport height
        }}>
            <section className="hero-banner">
                <div className="container">
                    <div className="hero-content">
                        <h2 style={{color:'white', margin:"10px"}}>Professional Cleaning Services in West London</h2>
                        <p style={{margin:'10px'}}>Reliable, affordable, and thorough cleaning for homes and businesses across West London</p>
                        <div className="hero-buttons" style={{margin:'10px'}}>
                            <button onClick={() => navigate('/services')} className="cta-button secondary">
                                Learn More
                            </button>
                        </div>
                    </div>
                    <div className="hero-form" style={{paddingLeft:'10px'}}>
                        <h3>Quick Quote Request</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="postcode"
                                    placeholder="Enter your full postcode"
                                    value={formData.postcode}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleInputChange}
                                    required>
                                    {services.map(service => (
                                        <option key={service.id} value={service.id}>{service.title}</option>
                                    ))}
                                </select>
                            </div>
                            {error  && <span className={'error-message'}>{error}</span>}
                            <button type="submit" className="submit-button">Get Quote</button>
                        </form>
                    </div>
                </div>
            </section>

            <section className={"main-banner"}>
                <div className="container">
                    <div className="row" style={{paddingBottom:'50px'}}>
                        <h1>Fly Cleaners</h1>
                        <p>
                            Hiring cleaners in West London goes beyond affordability, and flymax profesional cleaning services in West London save you time, ensure proper house cleaning, and give your surroundings a breath of fresh air. The types of domestic cleaning services offered extend well beyond the standard packages, so you can easily customise your order depending on what your specific requirements for cleaning are at the time, for example, you can easily order end of tenancy cleaning or office cleaning.
                        </p>
                    </div>
                    <div className="section-header">
                        <h2>Our Cleaning Services</h2>
                        <p>We offer comprehensive cleaning solutions tailored to your needs</p>
                    </div>
                    <div style={{display:'block'}} className={'main-banner'}>
                        <div className="services-grid">
                            {serviceList.map(service => (
                                <div key={service.id} className="service-card">
                                    <img src={service.src} alt="" className={'cart-image'}/>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <Link to={'/services'} state={{ id: service.id, name: service.title }} style={{width:'100%', textAlign:'center', color:'blue'}}>Learn More</Link>
                                </div>
                            ))}
                        </div>
                        <button onClick={upadateServiceList} style={{width:'150px', background:'white', color:'black'}}>{!isAllServices ? 'See more' : 'See less'}</button>
                    </div>
                    <div className={["services-grid", "main-banner"].join(" ")} style={{paddingBottom:'30px', paddingTop:'30px'}}>
                        {pricings.map(pricings => (
                            <div key={pricings.id} className="service-card">
                                <h3>{pricings.name}</h3>
                                <p style={{color:'blue'}}>{pricings.price}</p>
                                <p style={{textAlign:'start'}}>{pricings.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className={'main-banner'}>
                        <h2 style={{textAlign:'center', marginBottom:'10px', marginTop:'10px'}}>How Fly cleaning services work</h2>
                        <div>
                            <div className="services-grid">
                                {stages.map(stage => (
                                    <div key={stage.id} className="service-card">
                                        <img src={stage.src} alt="" className={'cart-image'}/>
                                        <h3>{stage.stage}</h3>
                                        <p style={{fontWeight:'bold', textAlign:'start', color:'blue'}}>{stage.name}</p>
                                        <ul style={{textAlign:'start'}} className="dot-list">
                                            {stage.steps.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 style={{ marginBottom:'10px', marginTop:'30px'}}>What is included in Fly basic cleaning services?</h3>
                        <div className="services-grid">
                            {pack.map(pack =>(
                                <div className="service-card">
                                    <h3>{pack.name}</h3>
                                    <ul style={{textAlign:'start'}} className="dot-list">
                                        {pack.packs.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={'main-banner'} style={{marginTop:'30px'}}>
                        <h3 style={{textAlign:'center'}}>Why Fly cleaners?</h3>
                        <div className='image-container'>
                            <img src={OfficeCleaner} alt={"cleaner"} className="image-display" />
                            <p style={{alignContent:'center', marginTop:'10px', marginLeft:'10px', maxWidth:'600px'}}>
                                {reason}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={["about-section", "main-banner"].join(" ")}>
                <div className="container">
                    <div className="about-content">
                        <h2 style={{textAlign:'center'}}>Why Choose Fly Cleaners</h2>
                        <ul className="features-list">
                            <li>
                                <i className="fas fa-check-circle"></i>
                                <div>
                                    <h4>Fully Insured Professionals</h4>
                                    <p>All our cleaners are vetted, insured, and trained to the highest standards</p>
                                </div>
                            </li>
                            <li>
                                <i className="fas fa-check-circle"></i>
                                <div>
                                    <h4>Flexible Scheduling</h4>
                                    <p>We work around your schedule with daily, weekly, or monthly options</p>
                                </div>
                            </li>
                            <li>
                                <i className="fas fa-check-circle"></i>
                                <div>
                                    <h4>Eco-Friendly Options</h4>
                                    <p>Choose from our range of environmentally friendly cleaning products</p>
                                </div>
                            </li>
                            <li>
                                <i className="fas fa-check-circle"></i>
                                <div>
                                    <h4>Satisfaction Guarantee</h4>
                                    <p>If you're not happy, we'll come back and fix it at no extra cost</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="about-image">
                        <img src={FlyCleaner} alt="Professional cleaner" />
                        <div className="experience-badge">
                            <span>10+</span>
                            <p>Years Experience</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={["testimonials-section", "main-banner"].join(" ")}>
                <div className="container">
                    <div className="section-header">
                        <h2>What Our Clients Say</h2>
                        <p>Don't just take our word for it - hear from our satisfied customers</p>
                    </div>
                    <div className="testimonials-grid">
                        {testimonials.map(testimonial => (
                            <div key={testimonial.id} className="testimonial-card">
                                <div className="rating">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <i key={i} className="fas fa-star"></i>
                                    ))}
                                </div>
                                <p className="testimonial-text">"{testimonial.text}"</p>
                                <div className="client-name">— {testimonial.author}</div>
                                <div className="client-location">West London</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={["contact-section", "main-banner"].join(" ")}>
                <div className="container">
                    <div className="contact-content">
                        <h2>Ready to Transform Your Space?</h2>
                        <p>Contact us today for a free, no-obligation quote</p>
                        <div className="contact-methods">
                            <div className="contact-method">
                                <i className="fas fa-phone-alt"></i>
                                <h4>Call Us</h4>
                                <p>073 6258 7018</p>
                                <p>Mon-Sat: 8am-6pm</p>
                            </div>
                            <div className="contact-method">
                                <i className="fas fa-envelope"></i>
                                <h4>Email Us</h4>
                                <p>flyclean@gmail.com</p>
                                <p>Response within 24 hours</p>
                            </div>
                            <div className="contact-method">
                                <i className="fas fa-map-marker-alt"></i>
                                <h4>Areas We Serve</h4>
                                <p>All West London boroughs including Kensington, Chelsea, Hammersmith, and more</p>
                            </div>
                        </div>
                    </div>
                    <div className="contact-form">
                        <h3>Send Us a Message</h3>
                        <form onSubmit={sendMessage}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="service">Service Needed</label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        {services.map(service => (
                                            <option key={service.id} value={service.id}>{service.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-button">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
           
        </div>
    );
};

export default Overview;