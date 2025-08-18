import {useParams, useLocation, redirect} from 'react-router-dom'
import React, {useState, useEffect} from "react";
import Footer from "./CityFooter.jsx";
import Domestic from '../images/domestic.png'
import Upholstery from '../images/upholstery2.png'
import Regular from '../images/regular.png'
import Deep from '../images/deep.png'
import Carpert from '../images/livingRoom.png'
import Office from '../images/office.png'
import EndOfTenancy from '../images/endOfTenancy.png'
import Currency from '../images/currency.png'
import Booking from '../images/booking.png'
import Manage from '../images/manage.png'
import Cleaners from '../images/tasks2.png'
import Stairs from '../images/stairs.png'
import Kitchen from '../images/kitchen.png'
import Bathrooms from '../images/bathroom.png'
import SketctedWindow from '../images/sketchWindow.png'
import SketchedFridge from '../images/SketchedFridge.png'
import Cabinets from '../images/cabinet.png'
import Shelf from '../images/shelf.png'
import Bed from '../images/bed.png'
import Neat from '../images/neat.png'
import Kept from '../images/kept.png'
import { FaArrowLeft, FaArrowRight  } from 'react-icons/fa';
import Sweeping from "../images/sweeping.png";
import Arranged from "../images/arranged.png";
import postcode, { isValidUKPostcodeFormat, checkPostcodeExists } from './Postcode.jsx'
import { useNavigate } from 'react-router-dom';

const City = () => {
    const navigate = useNavigate();
    const location  = useLocation();
     const state  = location?.state;
     const [city, setCity] = useState(state?.category)
     const [quote, setQuote] = useState("");
    const [question1, setQuestion1] = useState('');
     const [question2, setQuestion2] = useState('');
     const [question3, setQuestion3] = useState('');
     const [question4, setQuestion4] = useState('');

     const [styleRight1, setStyleRight1] = useState({
         display: '',
         width: '60px',
         color: 'navy',
     });
     const [styleLeft1, setStyleLeft1] = useState({
        display: 'none',
        width: '60px',
        color: 'navy',
    });

    const [styleRight2,setStyleRight2] = useState({
        display: '',
        width: '60px',
        color: 'navy',
    });
    const [styleLeft2,setStyleLeft2] = useState({
        display: 'none',
        width: '60px',
        color: 'navy',
    });

    const [styleRight3,setStyleRight3] = useState({
        display: '',
        width: '60px',
        color: 'navy',
    });
    const [styleLeft3, setStyleLeft3] = useState({
        display: 'none',
        width: '60px',
        color: 'navy',
    });

    const [styleRight4,setStyleRight4] = useState({
        display: '',
        width: '60px',
        color: 'navy',
    });
    const [styleLeft4,setStyleLeft4] = useState({
        display: 'none',
        width: '60px',
        color: 'navy',
    });
    const [postcode1, setPostcode1] = useState('');
    const [postcode2, setPostcode2] = useState('');
    const [postcode3, setPostcode3] = useState('');
    const [postcode4, setPostcode4] = useState('');
    const [postcode5, setPostcode5] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const HandQuote = () => {}

    const serviceDetails = [
        {id: 1, src: Domestic, category: 'Domestcic cleaning', detail: 'Count on us for cleaning your home. Our seasoned cleaners will swiftly and effectively complete all the work using professional-grade supplies. Your home will be spotlessly clean and dust-free. Give us a call and we\'ll come at a time that\'s convenient for you.'},
        {id: 2, src: Upholstery, category: 'Upholstery cleaning', detail: 'You can trust your furniture cleaning to our professionals. We use specialized solutions that effectively remove stains without damaging the upholstery. After cleaning, your sofa, chairs and other furniture will look like new. Book a cleaning with us today!'},
        {id: 3, src: Regular, category: 'Regular cleaning', detail: 'Spotlessness and order in your home every day is what our company\'s regular cleaning provides. Just choose a schedule that’s convenient for you, and it can always be changed if needed. Our professionals are ready to come clean any day.'},
        {id: 4, src: Deep, category: 'Deep cleaning', detail: 'Want your home gleaming with cleanliness? Our team will perform a thorough house cleaning for you. We will diligently wash everything, from floor to ceiling, without missing a single nook or cranny. And our rates will pleasantly surprise you.'},
        {id: 5, src: Carpert, category: 'Carpet cleaning', detail: 'Our team of professionals ensures flawless dry cleaning for carpets. Clean carpets mean caring for the health and comfort of your home. We value quality, providing cleanliness that accentuates your style and coziness. Leave an inquiry to experience our efficient cleaning.'},
        {id: 6, src: Office, category: 'Office cleaning', detail: 'Our service ensures comprehensive cleaning of office spaces. No detail is overlooked: desks, equipment, furniture — everything will be pristine. Regular cleaning provides a healthy environment and enhances employee well-being.'},
        {id: 7, src: EndOfTenancy, category: 'End of tenancy cleaning', detail: 'We are your solution for meticulous end of tenancy cleaning. We\'ll restore the space to its original condition, fix any damages, and clean every corner, including rooms, kitchen, and bathroom. We guarantee the removal of all waste.'}
    ]

    const stages = [
        {id:'submit', src: Booking, stage:'Stage 1', category:'Submit your booking online', steps:['Enter postcode','Choose a type of cleaning','Select a cleaning schedule', 'Choose rooms to get an estimated price', 'Select additional cleaning services if you need them', 'Indicate the level of dirt in your property']},
        {id:'pay', src: Currency, stage:'Stage 2', category: 'Pay as you go', steps: [' The estimated amount of your booking will be held in your bank account', ' You will only be charged after the cleaning session is completed and according to the actual time a cleaner worked']},
        {id:'manage',src: Manage,  stage: 'Stage 3', category: 'Manage your booking online', steps: [' When you submit your cleaning request, your booking becomes available to all cleaners in the system',
                ' When you make an appointment with a cleaner, we email you or send a text message through the app', 'You can use MyAccount on our website or the eMop App to keep track of your booking']}
    ]

    const reasons = [
        {id: 1, reason: '24/7 Availability', detail: 'Pick a date and time that suits you. You can even book for same day cleaning, 4 hours in advance'},
        {id: 2, reason: 'Bespoke Service', detail: 'You can choose which rooms you wish us to clean and book only the services you need'},
        {id: 3, reason: 'Pay as You Go', detail: 'We charge clients only for the actual time a cleaner spends at your property'},
        {id: 4, reason: 'Last minute cleaning', detail: 'Need urgent cleaning? You can make a booking 4 hours in advance'}
    ]

    const items = [
        {id: 1, category: 'Window cleaning', src: SketctedWindow},
        {id: 2, category: 'Fridge and microwave cleaning', src: SketchedFridge},
        {id: 3, category: 'Kitchen cabinets cleaning', src: Cabinets},
        {id: 4, category: 'Cleaning bookcases', src: Shelf},
        {id: 5, category: 'Changing linens and bed covers', src: Bed}
    ]

    const arrowRightStyleOff = {
        display: 'none',
        width: '60px',
        color: 'navy',
    }

    const arrowRightStyleOn = {
        display: '',
        width: '60px',
        color: 'navy',
    }

    const arrowLeftStyleOff = {
        display: 'none',
        width: '60px',
        color: 'navy',
    }

    const arrowLeftStyleOn = {
        display: '',
        width: '60px',
        color: 'navy',
    }

    const handleRight1 = () => {
        setStyleRight1(arrowRightStyleOff)
        setStyleLeft1(arrowLeftStyleOn)
        setQuestion1(`Our cleaning services in ${city}  start at £19 per hour.`)

    }

    const handleLeft1 = () => {
        setStyleRight1(arrowRightStyleOn)
        setStyleLeft1(arrowLeftStyleOff)
        setQuestion1('')

    }

    const handleRight2 = () => {
        setStyleRight2(arrowRightStyleOff)
        setStyleLeft2(arrowLeftStyleOn)
        setQuestion2(`Our ${city}  cleaning services for end-of-tenancy cleaning start at £15 per hour. This can change depending on factors like the number of cleaners you request, your location, and extra services.`)

    }

    const handleLeft2 = () => {
        setStyleRight2(arrowRightStyleOn)
        setStyleLeft2(arrowLeftStyleOff)
        setQuestion2('')

    }

    const handleRight3 = () => {
        setStyleRight3(arrowRightStyleOff)
        setStyleLeft3(arrowLeftStyleOn)
        setQuestion3('With only 3 hours needed, a cleaner can clean the entire house with a vacuum, clean the bathrooms, including the toilets, sinks, showers, and baths, clean the kitchen, including mopping the floor, wiping surfaces down, emptying the trash, cleaning the mirrors, oven cleaning, etc.')

    }

    const handleLeft3 = () => {
        setStyleRight3(arrowRightStyleOn)
        setStyleLeft3(arrowLeftStyleOff)
        setQuestion3('')

    }

    const handleRight4 = () => {
        setStyleRight4(arrowRightStyleOff)
        setStyleLeft4(arrowLeftStyleOn)
        setQuestion4('When placing an order, please ask the cleaner to include a hoover and a mop if you don\'t have your own equipment. If you place an order that includes equipment, there will be an extra fee.')

    }

    const handleLeft4 = () => {
        setStyleRight4(arrowRightStyleOn)
        setStyleLeft4(arrowLeftStyleOff)
        setQuestion4('')

    }

    const handleSubmit = (postcode) => {
        if (loading) return;
        setLoading(true)
        setError(null)
        if (!postcode.trim()) {
            setError('Please enter a postcode');
            setLoading(false)
            window.scroll({top: 0, behavior: 'smooth'});
            return;
        }
        if (!isValidUKPostcodeFormat(postcode)) {
            setError(`${postcode} is not a valid postcode`);
            setLoading(false)
            window.scroll({top: 0, behavior: 'smooth'});
            return;
        }
        checkPostcodeExists(postcode).then(exists => {
            if (!exists) {
                setError(`${postcode} does not exist`);
                window.scroll({top: 0, behavior: 'smooth'});
                setLoading(false)
                return;
            }
        })
        setLoading(false)
        navigate('/checkout', { state: { postcode: postcode } });
    };

    useEffect(() => {
        if (city === null || city === undefined) {
            return;
        }
        function replaceLastSegment(newSegment) {
            const path = window.location.pathname;
            const segments = path.split('/');
            segments[segments.length - 1] = newSegment;
            return segments.join('/').replace(/[ ,]+/g, '-');
        }
        window.history.replaceState(null, '', replaceLastSegment(city));
        document.title = city.charAt(0).toUpperCase() + city.slice(1);

    }, [city])


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures it takes at least full viewport height
        }}>
            <section>
                <div className={'container'}>
                    {error && <p style={{textAlign:'center'}} className={'error-message'}>{error}</p>}
                    <h2 className={'experience-text'} style={{textAlign:'center', margin:'20px', color:'navy'}}>{`Domestic cleaning services in ${city}`}</h2>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Enter your full post code"
                            value={postcode1}
                            onChange={(e) => setPostcode1(e.target.value)}
                        />
                        <button className="search-button"
                                onClick={() => handleSubmit(postcode1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                            </svg>
                            OK
                        </button>
                    </div>
                </div>

            </section>

            <section className={'main-banner'}>`
                <div className="container">
                    <h2 className={'experience-text'} style={{textAlign:'center', color:'brown'}}>{`Our services in ${city}`}</h2>
                    <div className="grid-container">
                        {serviceDetails.map((plan) => (
                            <div key={plan.id} className="service-card">
                                <img src={plan.src} alt="" className={'cart-image'}/>
                                <h4 style={{color:'navy', textAlign:'center', marginBottom:'10px'}}>{plan.category}</h4>
                                <p>{plan.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </section>

            <section className={'main-banner'} style={{marginTop:'30px'}}>
                <div className="container">
                    <h2 className={'experience-text'} style={{textAlign:'center', marginBottom:'20px'}} >{`How much does a house cleaning cost in ${city}?`}</h2>
                    <div className="idea-container">
                        <div className="service-card" style={{marginBottom:'20px'}}>
                            <h3 style={{textAlign:'center'}}>Regular house cleaning</h3>
                            <p style={{color:'navy', fontWeight:'bold', textAlign:'center'}}>from £19/h</p>
                            <div className="search-container">
                                <input
                                    type="text"
                                    placeholder="Enter your full post code"
                                    value={postcode2}
                                    onChange={(e) => setPostcode2(e.target.value)}
                                />
                                <button className="search-button"
                                onClick={() => handleSubmit(postcode2)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                    </svg>
                                    OK
                                </button>
                            </div>
                        </div>
                        <div className="service-card" style={{marginBottom:'20px'}}>
                            <h3 style={{textAlign:'center'}}>One-off domestic cleaning</h3>
                            <p style={{color:'navy', fontWeight:'bold', textAlign:'center'}}>from £19/h</p>
                            <div className="search-container">
                                <input
                                    type="text"
                                    placeholder="Enter your full post code"
                                    value={postcode3}
                                    onChange={(e) => setPostcode3(e.target.value)}
                                />
                                <button className="search-button"
                                onClick={() => handleSubmit(postcode3)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                    </svg>
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section  className={["services-section", "main-banner"].join("")}>
                <div className="container">
                    <h2 style={{textAlign:'center', marginBottom:'20px', marginTop:'10px'}}>How Fly cleaning services work</h2>
                    <div className={'idea-container'}>
                        <div className="grid-container">
                            {stages.map(stage => (
                                <div key={stage.id} className="service-card">
                                    <img src={stage.src} alt="" className={'cart-image'}/>
                                    <h3>{stage.stage}</h3>
                                    <p style={{fontWeight:'bold', textAlign:'start', color:'blue'}}>{stage.category}</p>
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
            </section>

            <section className={'main-banner'}>
                <div className="container" style={{marginBottom:'30px'}}>
                    <h2 style={{textAlign:'center', color:'navy',  margin:'10px', }}>What is included in Fly cleaning?</h2>
                    <div className={'idea-container'}>
                        <img src={Cleaners} alt={"cleaners"} className={'cart-image2'}/>
                        <div className="service-card">
                            <h3 style={{color:'darkolivegreen'}}>Bedroom, living, dining, office rooms</h3>
                            <p style={{color:'navy'}}>Our cleaning London services include:</p>
                            <ul className={'dot-list'}>
                                <li>Dusting all accessible surfaces</li>
                                <li>Cleaning lighting appliances, and chandeliers</li>
                                <li>Wiping appliances</li>
                                <li>Wiping mirrors and glass fixtures</li>
                                <li>Folding clothes and arranging things</li>
                                <li>Wiping doors, door handles, and switches</li>
                                <li>Wiping doors, door handles, and switches Vacuuming the carpets and washing the floor and skirting boards</li>
                                <li>Taking out rubbish</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                    <div className={'idea-container'}>
                        <div className="service-card">
                            <h3 style={{color:'darkolivegreen'}}>Halls and stairs</h3>
                            <ul className={'dot-list'}>
                                <li>Dusting all accessible surfaces</li>
                                <li>Cleaning mirrors and glass surfaces and the front door (inside)</li>
                                <li>Vacuuming and mopping the floor and the skirting boards</li>
                                <li>Arranging things</li>
                                <li>Taking out rubbish</li>
                            </ul>
                        </div>
                        <img src={Stairs} alt={"cleaners"} className={'cart-image2'}/>
                    </div>
                </div>
            </section>

            <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                    <div className={'idea-container'}>
                        <img src={Kitchen} alt={"cleaners"} className={'cart-image2'}/>
                        <div className="service-card">
                            <h3 style={{color:'darkolivegreen'}}>Kitchen</h3>
                            <p>As you know, the kitchen is one of the most difficult rooms to clean in a London house. So, here are all the tasks we perform in the kitchen.</p>
                            <ul className={'dot-list'}>
                                <li>Getting all accessible surfaces free from dust and grease (sinks, taps, surfaces, stoves, and kitchen equipment)</li>
                                <li>Making the front, upper and bottom kitchen facades spotless</li>
                                <li>Vacuuming and washing the floor and skirting boards</li>
                                <li>Wiping doors, door handles, and switches</li>
                                <li>Doing the washing-up</li>
                                <li>Taking out rubbish</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className={'main-banner'}  style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                    <div className={'idea-container'}>
                        <div className="service-card">
                            <h3 style={{color:'darkolivegreen'}}>Bathrooms</h3>
                            <p>Bathrooms require regular and meticulous servicing to maintain a sanitary space. So, our cleaners come with all the necessary equipment to clean yours perfectly.</p>
                            <ul className={'dot-list'}>
                                <li>Washing and sanitizing the toilet, the sink and the bidet</li>
                                <li>Washing the shower and the tub</li>
                                <li>Wiping down mirrors, glass fixtures and lighting appliance</li>
                                <li>Dusting all accessible surfaces</li>
                                <li>Wiping down walls, doors, door handles and switches</li>
                                <li>Vacuuming and washing the floor and skirting boards</li>
                                <li>Taking out rubbish</li>
                            </ul>
                        </div>
                        <img src={Bathrooms} alt={"cleaners"} className={'cart-image2'}/>
                    </div>
                </div>
            </section>

            <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                    <div className={'idea-container'}>
                        <img src={Office} alt={"cleaners"} className={'cart-image2'}/>
                        <div className="service-card">
                            <h3 style={{color:'darkolivegreen'}}>Office cleaning</h3>
                            <p>Office cleaning is a delicate and sensitive task. We give your office a perfect and professional touch making your business envrirons smell good.</p>
                            <ul className={'dot-list'}>
                                <li>Dusting of desks and computer equipment</li>
                                <li>Vacuuming carpets, mopping the floor, and removing dirt from skirting boards</li>
                                <li>Wiping mirrors and glass fixtures</li>
                                <li>Washing and sanitising the toilet and shower</li>
                                <li>Toilet and shower washing and sanitizing</li>
                                <li>Kitchen sanitation: washing all used crockery and equipment, as well as wiping and sanitising all the external surfaces</li>
                                <li>Taking out rubbish and replacing with new bin liners</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'50px'}}>
                    <h3 className={'experience-text'} style={{textAlign:'center', color:'navy', marginBottom:'30px'}}>{`Why choose Fly cleaning plan in ${city}`}</h3>
                    <div className={'grid-container'}>
                        {reasons.map(reason => (
                            <div key={reason.id} className={'service-card'}>
                                <p style={{fontWeight:'bold'}}>{reason.reason}</p>
                                <p>{reason.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div>
                    <h2 className={'experience-text'} style={{textAlign:'center', marginBottom:'20px', marginTop:'10px'}}>How Fly cleaning services work</h2>
                    <div className="container">
                        <div className={'idea-container'} >
                            <div className="grid-container">
                                {items.map(item => (
                                    <div key={item.id} className={'grid-item'}>
                                        <img src={item.src} alt="" className={'cart-image3'}/>
                                        <p>{item.category}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={'service-card'} >
                        <h3 className={'experience-text'} style={{color:'navy', textAlign:'center'}}>Additional domestic cleaning services</h3>
                        <p style={{textAlign:'center'}}>For advanced cleaning, you can add more services when booking. Most extra cleaning add-ons add half an hour to the cleaning time of your booking.</p>
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Enter your full post code"
                                value={postcode4}
                                onChange={(e) => setPostcode4(e.target.value)}
                            />
                            <button className="search-button"
                            onClick={() => setPostcode4(postcode4)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                </svg>
                                OK
                            </button>
                        </div>

                    </div>

                </div>
            </section>

            <section className={'main-banner'} style={{marginTop:'50px'}}>
                <h3 style={{textAlign:'center', marginBottom:'30px', color:'navy'}}>{`Professional cleaning services in ${city}`}</h3>
                <div className="container" style={{marginBottom:'30px'}}>
                    <div className={'idea-container'}>
                        <img src={Cleaners} alt={"cleaners"} className={'cart-image2'}/>
                        <div className="service-card">
                            <p>Our domestic cleaners can render one-off, end-of-tenancy, deep cleaning, and regular cleaning services. This full range of professional cleaning services in St Albans is affordable and customisable.
                                If you need cleaners in St Albans that will show up to your house even on short notice and clean your bedrooms, kitchen, toilet, cabinets, and living room, and even provide laundry services like washing and ironing, eMop has the right cleaners for you.
                                One-off visits, as well as regular appointments, are available from eMop professional cleaning services in St Albans. No matter the plan, it is carried out to the greatest standards possible by our reliable house cleaning crew.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                    <div className={'idea-container'}>
                        <div className="service-card">
                            <p style={{color:'navy'}}>{`Reliable cleaners in ${city}`}</p>
                            <ul className={'dot-list'}>
                                <li>We make every effort to have qualified cleaners available for an interview as soon as there is a vacancy. Before employment, we ensure that all our cleaners are knowledgeable and reliable.t</li>
                                <li>Our cleaners are trained to be professional cleaners at all times. They are taught to be courteous and polite to clients. All customers always testify of how good our cleaners are.</li>
                                <li>Our home cleaning team is made up of cleaners that have worked with us for years. Be rest assured that you will get quality cleaners in Birmingham from Fly cleaners.</li>
                            </ul>
                        </div>
                        <img src={Neat} alt={"cleaners"} className={'cart-image2'}/>
                    </div>
                </div>
            </section>

            <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                    <div className={'idea-container'}>
                        <img src={Domestic} alt={"cleaners"} className={'cart-image2'}/>
                        <div className="service-card">
                            <p style={{color:'navy'}}>Cleaning plan that cares for your home</p>
                            <p>{`In ${city},  our cleaners offer expert house cleaning services. Our domestic cleaning services are followed with other packages like laundry, one-off and other deep cleaning for home homes and offices.
Nobody enjoys having to clean their house in their free time. Our cleaners are responsible for that. Home cleaning services from eMop in St Albans offer you back time to focus on activities you enjoy.
We provide a regular cleaning plan as needed, whether it be daily, weekly, bi-weekly, or monthly, and we provide all of our own cleaning supplies. eMop has trusted cleaners with experience in providing cleaning solutions for shared housing, small offices, social areas of apartments, and family residences.`}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                    <div className={'idea-container'}>
                        <div className="service-card">
                            <p style={{color:'navy'}}>Appreciate the benefits of domestic house cleaners</p>
                            <p>Regardless of your cleaning demands, Fly domestic cleaners are available to serve you anywhere in St Albans. Our services are extremely cheap. This helps those from different strata of society to afford our services.
                                Our domestic cleaners are fully equipped with the right tools and equipment to handle all kind of cleaning challenges. There are specific materials to wipe off stubborn dirts from certain surfaces. You don’t have to do this alone, our domestic cleaning team can help.
                                With Fly cleaners' house cleaning services, all household chores are handled. You get to take care of other things like spending time with family and friends or other important engagement you may have. Our home cleaning services can include window cleaning, furniture dusting, ironing and carpet cleaning.</p>
                        </div>
                        <img src={Kept} alt={"cleaners"} className={'cart-image2'}/>
                    </div>
                </div>
            </section>

            <section className={'main-banner'} style={{marginTop:'50px', display:'block'}}>

                <div className={'container'}>
                    <h3 className={'experience-text'} style={{textAlign:'start', color:'navy', marginBottom:'30px'}}>Frequently asked questions</h3>
                    <div className={'mini-container'}>
                        <FaArrowRight onClick={handleRight1} style={styleRight1} />
                        <FaArrowLeft onClick={handleLeft1} style={styleLeft1} />
                        <div className={'question-container'}>
                            <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>{`How much do cleaners charge in ${city}?`}</p>
                            <p style={{marginLeft:'10px'}}>{question1}</p>
                        </div>
                    </div>
                </div>

                <div className={'container'}>
                    <div className={'mini-container'}>
                        <FaArrowRight onClick={handleRight2} style={styleRight2} />
                        <FaArrowLeft onClick={handleLeft2} style={styleLeft2} />
                        <div className={'question-container'}>
                            <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>{`How much is an end-of-tenancy clean in ${city}?`}</p>
                            <p style={{marginLeft:'10px'}}>{question2}</p>
                        </div>
                    </div>
                </div>

                <div className={'container'}>
                    <div className={'mini-container'}>
                        <FaArrowRight onClick={handleRight3} style={styleRight3} />
                        <FaArrowLeft onClick={handleLeft3} style={styleLeft3} />
                        <div className={'question-container'}>
                            <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>What can a cleaner do in 3 hours?</p>
                            <p style={{marginLeft:'10px'}}>{question3}</p>
                        </div>
                    </div>
                </div>

                <div className={'container'}>
                    <div className={'mini-container'}>
                        <FaArrowRight onClick={handleRight4} style={styleRight4} />
                        <FaArrowLeft onClick={handleLeft4} style={styleLeft4} />
                        <div className={'question-container'}>
                            <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>Do cleaners provide cleaning products and equipment?</p>
                            <p style={{marginLeft:'10px'}}>{question4}</p>
                        </div>
                    </div>
                </div>

            </section>

            <section className={["locations-grid", "main-banner"].join("")} style={{marginBottom:'30px'}}>
                <div className="container">
                    <div className="burden-container">
                        <img src={Sweeping} className={'cart-image4'} alt="" />
                        <div className="search-container">
                            <h1 className={'experience-text'}>Shift your cleaning burden to us</h1>
                            <input
                                type="text" placeholder="Enter your full post code here"
                                value={postcode5}
                                style={{textAlign:'center'}}
                                onChange={(e) => setPostcode5(e.target.value)}/>
                            <button className={'submit-button'} style={{textAlign:'center', margin:'10px'}}
                            onClick={() => handleSubmit(postcode5)}>
                                Get a quote
                            </button>
                        </div>
                        <img src={Arranged} className={'cart-image4'} alt="" />
                    </div>
                </div>

            </section>

            < Footer />
        </div>
    );



}

export default City;