import React, { useState, useEffect} from "react";
import {FaBroom, FaCheck, FaClock, FaMapMarkerAlt, FaRegStar, FaStar, FaUserTie} from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from "react-router-dom";
import api from './api.js'
const API_BASE = import.meta.env.VITE_API_BASE_URL;


const ProfilePage = ({ emailFromProile }) => {
    const location = useLocation();

    const params = new URLSearchParams(window.location.search);
    const cleanerEmail = params.get("email");
    const currentCleaner = params.get("cleaner");

    const cleanerData = {
        personal: {
            firstName: 'Sarah',
            lastName: 'Jones',
            phone: '+44 770 1234 567',
            password: '',
            newPassword: '',
            confirmPassword: '',
            oldPassword: '',
            nationalInsurance: '',
            address: 'Buckingham Palace',
            bio: 'A good cleaner',
            email:'sarah@gmail.com',
            emergencyContact: {
                category: 'Martha Caleb',
                relationship: 'Spouse',
                phone: '073 6258 7018'
            }
        },
        work: {
            cleaningExperience: 'Less than 1 year',
            preferredAreas: ['Central London', 'East London'],
            services: ['Deep cleaning', 'Regular cleaning', 'End of tenancy'],
            specialities: ["Eco-friendly cleaning", "Pet-friendly products", "Stain removal"],
            hourlyRate: 10.50,
            travelRadius: 10, // miles
            equipmentProvided: false
        },
        availability: {
            monday: { morning: false, afternoon: false, evening: false },
            tuesday: { morning: false, afternoon: false, evening: false },
            wednesday: { morning: false, afternoon: false, evening: true },
            thursday: { morning: false, afternoon: false, evening: false },
            friday: { morning: false, afternoon: false, evening: false },
            saturday: { morning: false, afternoon: false, evening: false },
            sunday: { morning: false, afternoon: false, evening: false }
        },
        notifications: {
            emailNotifications: true,
            smsNotifications: true,
            jobAlerts: true,
            reminderAlerts: true,
            ratingNotifications: true
        },
        review: [
            {id: 1,
                category: 'Michael Brown',
                rating: 5,
                review: 'Sarah did an excellent job cleaning my flat. She was punctual, professional, and paid attention to all the details I requested. The place has never looked better!',
                time: '2 weeks ago'
            },
            {id: 2,
                category: 'Emma Wilson',
                rating: 4,
                review: 'Very thorough cleaning service. Sarah was friendly and efficient. Only reason for 4 stars instead of 5 is that she arrived 15 minutes late, but she made up for it by staying later to finish everything.',
                time: '1 month ago'
            },
            {id: 2,
                category: 'John Smith',
                rating: 5,
                review: 'Very thorough cleaning service. Sarah was Professional, detailed and friendly. Only reason for 4 stars instead of 5 is that she arrived 15 minutes late, but she made up for it by staying later to finish everything.',
                time: '2 months ago'
            },
            {id: 2,
                category: 'Dialo Becko',
                rating: 4,
                review: 'Smart and nice cleaning service. Sarah was Professional, detailed and friendly. Only reason for 4 stars instead of 5 is that she arrived 15 minutes late, but she made up for it by staying later to finish everything.',
                time: '4 months ago'
            },
        ]
    };

    const myOrderData =  {
        id: 0,
        orderId: '',
        pascode: '',
        address: '',
        estimatedAmount: 0,
        duration: '',
        plan: '',
        bookDate: '',
        booking: [{room: '', count: 0}],
        nature: '',
    };

    const historyData = {
        id: 0,
        orderId: '',
        address: '',
        postcode: '',
        estimatedAmount: 0,
        customer: '',
        duration: '',
        cleanerWage: 0,
        completedDate: '',
    };

    const specialities = ["Eco-friendly cleaning", "Pet-friendly products", "Stain removal", "Vacuum cleaner"];
    const bookData = {
        id: 0,
        orderId: '',
        pascode: '',
        address: '',
        estimatedAmount: 0,
        duration: '',
        plan: '',
        bookDate: '',
    };

    const reader = new FileReader();

    // Navbar items
    const topNavItems = ['New', 'Jobs', 'History'];
    const bottomNavItems = [
        {id: 1, category: 'Setting'},
        {id: 2, category: 'Finance'},
        {id: 3, category: 'Docs'},
        {id: 4, category: 'Support'},
        {id: 5, category: 'Profile'},
    ];

    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('No new orders yet.');
    const [email, setEmail] = useState(cleanerEmail);
    const [cleanerName, setCleanerName] = useState(currentCleaner);
    const [cleaner, setCleaner] = useState({
        category: cleanerName,
        profileImage: "https://randomuser.me/api/portraits/women/45.jpg",
        rating: 4.8,
        reviewCount: 127,
        yearsExperience: 'Less than 1 year',
        location: "London, UK",
        services: ["House Cleaning", "Office Cleaning", "Deep Cleaning", "Carpet Cleaning"],
        bio: "Professional cleaner with 5 years of experience providing top-quality cleaning services across London. I take pride in my attention to detail and commitment to customer satisfaction.",
        certifications: ["BICSc Certified", "COVID-19 Safety Certified"],
        availability: ["Monday-Friday: 8am-6pm", "Saturday: 9am-2pm"],
        languages: ["English"],
        hourlyRate: "£15-£25 (depending on service)",
        company: "Fly Cleaners Ltd",
        specialities: ["Eco-friendly cleaning", "Pet-friendly products", "Stain removal"],
        recentlyViewed: ["Bleach", "Microfiber cloths", "Vacuum cleaner"]
    });
    const { register, setValue, getValues, handleSubmit, formState, watch, reset, formState: { errors }, trigger }
        = useForm({defaultValues: cleanerData, mode: 'onChange'});
    const [successMessage, setSuccessMessage] = useState('');
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [activeTab2, setActiveTab2] = useState('about');
    const [reviewList, setReviewList] = useState([])
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [experience, setExperience] = useState(null);
    const [address, setAddress] = useState('');
    const [rating, setRating] = useState(null);
    const [reviewCount, setReviewCount] = useState(null);
    const [bio, setBio] = useState('');
    const [phone, setPhone] = useState(null);
    const [availability, setAvailability] = useState({
        monday: { morning: false, afternoon: false, evening: false },
        tuesday: { morning: false, afternoon: false, evening: false },
        wednesday: { morning: false, afternoon: false, evening: true },
        thursday: { morning: false, afternoon: false, evening: false },
        friday: { morning: false, afternoon: false, evening: false },
        saturday: { morning: false, afternoon: false, evening: false },
        sunday: { morning: false, afternoon: false, evening: false }
    });
    const [specialties, setSpecialties] = useState(["Eco-friendly cleaning", "Pet-friendly products", "Stain removal"]);
    const [languages, setLanguages] = useState(["English"]);
    const [services, setServices] = useState(["House Cleaning", "Office Cleaning", "Deep Cleaning", "Carpet Cleaning"]);
    const [five, setFive] = useState(0);
    const [four, setFour] = useState(0);
    const [three, setThree] = useState(0);
    const [two, setTwo] = useState(0);
    const [one, setOne] = useState(0);
    const [loadingReviews, setLoadingReviews] = useState(false);
    const [offset, setOffset] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(10);

    useEffect(() => {
        if (window.innerWidth > 768) {
            setPage(20);
            return;
        }
        setPage(10);
    }, [])


    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar style={{width:'15px'}} key={i} className="star filled" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FaStar style={{width:'15px'}} key={i} className="star half-filled" />);
            } else {
                stars.push(<FaRegStar style={{width:'15px'}} key={i} className="star" />);
            }
        }
        return stars;
    };

    useEffect(() => {
        if (cleanerName === null || cleanerName === undefined) {
            return;
        }
        function replaceLastSegment(newSegment) {
            if (!newSegment) return;
            const path = window.location.pathname;
            const segments = path.split('/');
            segments[segments?.length - 1] = newSegment;
            return segments.join('/').replace(/[ ,]+/g, '-');
        }
        window.history.replaceState(null, '', replaceLastSegment(cleanerName));

    }, [cleanerName]);

    useEffect(() => {
        if (emailFromProile !== null && emailFromProile !== undefined) {
            setEmail(emailFromProile);
        }
    }, [emailFromProile]);

    function timeAgo(date) {
        const now = new Date();
        const prevDate = new Date(date);
        const seconds = Math.floor((now - prevDate) / 1000);

        let interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
            return interval === 1 ? '1 year ago' : `${interval} years ago`;
        }

        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            return interval === 1 ? '1 month ago' : `${interval} months ago`;
        }

        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
            return interval === 1 ? '1 day ago' : `${interval} days ago`;
        }

        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
        }

        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
        }

        return 'just now';
    }

    const reviewPercentage = (ratingCount, ratingTotalCount) => {
        const perc = (Number(ratingCount) / Number(ratingTotalCount)) * 100;
        return Math.round(perc)
    }

    useEffect(() => {
        if (reviewList.length > 0) {
            setLoadingReviews(true);
            const occurence = reviewList.reduce((acc, review) => {
                const rating = review.rating;
                acc[rating] = (acc[rating] || 0) + 1;
                return acc;
            }, {1: 0, 2: 0, 3: 0, 4: 0, 5: 0});

            setFive(reviewPercentage(occurence[5], reviewList.length));
            setFour(reviewPercentage(occurence[4], reviewList.length));
            setThree(reviewPercentage(occurence[3], reviewList.length));
            setTwo(reviewPercentage(occurence[2], reviewList.length));
            setOne(reviewPercentage(occurence[1], reviewList.length));
            setLoadingReviews(false);

            setOffset(reviewList[reviewList.length - 1].id);
        }

    }, [reviewList])


    useEffect(() => {
         const fetchCleanerData =  async () => {
             setIsLoading(true);
             try {
                 let response = await api.post('/api/users/record', {email: email});
                 const { user } = response.data;
                 if (user) {
                     if (user?.firstName?.toString()?.length > 0) {
                         setFirstName(user?.firstName?.charAt(0)?.toUpperCase() + user?.firstName?.slice(1));
                     }
                     if (user?.lastName?.toString()?.length > 0) {
                         setLastName(user?.lastName?.charAt(0)?.toUpperCase() + user?.lastName?.slice(1));
                     }
                     setAddress(user?.address);
                     setPhone(user?.phone);
                     setBio(user?.bio);
                     setProfilePhoto(user?.photo_path);
                     setAvailability(user?.available);
                     setServices(user?.workExperience?.services);
                     setSpecialties(user?.workExperience?.specialities)
                 }
                 else {
                     setSuccessMessage('Error updating user');
                     setBgColor('red');
                 }

             } catch(error) {
                 console.log(error);
                 setSuccessMessage('Error fetching some profile data')
             } finally {
                 setIsLoading(false);
             }
         };
        if (email !== null || email !== undefined) {
            fetchCleanerData();
        }
    }, [email]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                if (!loadingMore) {
                    if (activeTab2 === 'reviews') {
                        setPageCount(prev => prev + 1);
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loadingMore, activeTab2]);

    useEffect(() => {
        const fetchCleanerData =  async () => {
            if (reviewList.length > 0) {
                setLoadingMore(true);
            }
            else {
                setIsLoading(true);
            }
            try {
                const response = await api.post('/api/reviews/record', {cleanerEmail: email, limit: page, offset: offset});
                const { reviews } = response.data;
                if (reviews.reviews.length > 0) {
                    setRating(reviews.value);
                    setReviewCount(reviews.count);

                    setReviewList(prev => {
                        const map = new Map(prev.map(item => [item.id, item])); // old items
                        reviews.reviews.forEach(item => map.set(item.id, item));    // add/replace new
                        return Array.from(map.values()).sort((a, b) => a.id - b.id); // convert back to array
                    });
                }
                else {
                    if (reviewList.length <= 0) {
                        setSuccessMessage('No reviewList record was found');
                        setBgColor('red');
                    }
                }
            } catch(error) {
                console.log(error);
                setSuccessMessage('Error fetching some profile data')
            } finally {
                setIsLoading(false);
                setLoadingMore(false);
            }
        };
        if (email !== null || email !== undefined) {
            fetchCleanerData();
        }
    }, [email, pageCount]);

    return (
        <div style={{display:'flex', flexDirection:'column', minHeight: '100vh'}}>
            {isLoading && <div className="raise-progress-bar-container">
                <div className="progress-bar-container">
                    <div className="spinner"></div>
                    <p style={{textAlign:'center'}}>Loading data...</p>
                </div>
            </div>}
            <div className="profile-container" >
                <div className="profile-header">
                    <div className="profile-image-container">
                        {profilePhoto && <img src={profilePhoto}  className="profile-image" alt={firstName} />}
                    </div>

                    <div className="profile-info">
                        <h3 className={'profile-name'}>{firstName} {lastName}</h3>
                        {reviewList.length > 0 && <p className="review-count"><span className="rating-value">{rating}</span> ({reviewCount}) reviews </p> }

                        <div className="meta-info">
                            {experience &&  <p className="meta-item"><FaUserTie style={{width:'20px'}} /> {experience} experience</p> }
                            <p className="meta-item"><FaMapMarkerAlt style={{width:'20px'}} />  <span style={{textAlign:'start'}}>{address}</span></p>
                            <p className="meta-item"> <FaBroom style={{width:'20px'}} /> <span style={{textAlign:'start'}}>Flymax Ltd</span></p>
                        </div>

                    </div>
                </div>

                <div className="profile-tabs">
                    <button
                        className={`tab-btn ${activeTab2 === 'about' ? 'active' : ''}`}
                        onClick={() => setActiveTab2('about')}>
                        About
                    </button>
                    <button
                        className={`tab-btn ${activeTab2 === 'services' ? 'active' : ''}`}
                        onClick={() => setActiveTab2('services')}>
                        Services
                    </button>
                    <button
                        className={`tab-btn ${activeTab2 === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveTab2('reviews')}>
                        Reviews
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab2 === 'about' && (<div className="about-section">
                            <h2 className={'experience-text'}>About {firstName} {lastName}</h2>
                            <p>{bio}</p>
                            <div className="details-section">
                                <h3 className={'experience-text'}><FaClock style={{width:'40px'}} /> Availability</h3>
                                {availability && <div className="availability-grid">
                                    {(availability.monday.morning || availability.monday.afternoon || availability.monday.evening) &&
                                        <div className="availability-day">
                                            <h3>Monday</h3>
                                            {availability.monday.morning && <label style={{marginTop:'5px'}}>Morning (8am-12pm)</label>}
                                            {availability.monday.afternoon && <label style={{marginTop:'5px'}}>Afternoon (12pm-5pm)</label>}
                                            {availability.monday.evening && <label style={{marginTop:'5px'}}>Evening (5pm-9pm)</label>}
                                        </div>
                                    }
                                    {(availability.tuesday.morning || availability.tuesday.afternoon || availability.tuesday.evening) &&
                                        <div className="availability-day">
                                            <h3>Tuesday</h3>
                                            {availability.tuesday.morning && <label style={{marginTop:'5px'}}>Morning (8am-12pm)</label>}
                                            {availability.tuesday.afternoon && <label style={{marginTop:'5px'}}>Afternoon (12pm-5pm)</label>}
                                            {availability.tuesday.evening && <label style={{marginTop:'5px'}}>Evening (5pm-9pm)</label>}
                                        </div>
                                    }
                                    {(availability.wednesday.morning || availability.wednesday.afternoon || availability.wednesday.evening) &&
                                        <div className="availability-day">
                                            <h3>Wednesday</h3>
                                            {availability.wednesday.morning && <label style={{marginTop:'5px'}}>Morning (8am-12pm)</label>}
                                            {availability.wednesday.afternoon && <label style={{marginTop:'5px'}}>Afternoon (12pm-5pm)</label>}
                                            {availability.wednesday.evening && <label style={{marginTop:'5px'}}>Evening (5pm-9pm)</label>}
                                        </div>
                                    }
                                    {(availability.thursday.morning || availability.thursday.afternoon || availability.thursday.evening) &&
                                        <div className="availability-day">
                                            <h3>Thursday</h3>
                                            {availability.thursday.morning && <label style={{marginTop:'5px'}}>Morning (8am-12pm)</label>}
                                            {availability.thursday.afternoon && <label style={{marginTop:'5px'}}>Afternoon (12pm-5pm)</label>}
                                            {availability.thursday.evening && <label style={{marginTop:'5px'}}>Evening (5pm-9pm)</label>}
                                        </div>
                                    }
                                    {(availability.friday.morning || availability.friday.afternoon || availability.friday.evening) &&
                                        <div className="availability-day">
                                            <h3>Friday</h3>
                                            {availability.friday.morning && <label style={{marginTop:'5px'}}>Morning (8am-12pm)</label>}
                                            {availability.friday.afternoon && <label style={{marginTop:'5px'}}>Afternoon (12pm-5pm)</label>}
                                            {availability.friday.evening && <label style={{marginTop:'5px'}}>Evening (5pm-9pm)</label>}
                                        </div>
                                    }
                                    {(availability.saturday.morning || availability.saturday.afternoon || availability.saturday.evening) &&
                                        <div className="availability-day">
                                            <h3>Saturday</h3>
                                            {availability.saturday.morning && <label style={{marginTop:'5px'}}>Morning (8am-12pm)</label>}
                                            {availability.saturday.afternoon && <label style={{marginTop:'5px'}}>Afternoon (12pm-5pm)</label>}
                                            {availability.saturday.evening && <label style={{marginTop:'5px'}}>Evening (5pm-9pm)</label>}
                                        </div>
                                    }
                                    {(availability.sunday.morning || availability.sunday.afternoon || availability.sunday.evening) &&
                                        <div className="availability-day">
                                            <h3>Sunday</h3>
                                            {availability.sunday.morning && <label style={{marginTop:'5px'}}>Morning (8am-12pm)</label>}
                                            {availability.sunday.afternoon && <label style={{marginTop:'5px'}}>Afternoon (12pm-5pm)</label>}
                                            {availability.sunday.evening && <label style={{marginTop:'5px'}}>Evening (5pm-9pm)</label>}
                                        </div>
                                    }

                                </div> }

                                <h3 className={'experience-text'}>Languages Spoken</h3>
                                <div className="grid-container">
                                    {languages.map((lang, index) => (
                                        <span key={index} className="language-badge">{lang}</span>
                                    ))}
                                </div>

                                <h3 className={'experience-text'} style={{textAlign:'center'}}>Specialities</h3>
                                <div className="grid-container">
                                    {specialities.map((spec, index) => (
                                        <span style={{width:'100%'}} key={index} className="speciality-badge">
                                            <FaCheck style={{width:'40px'}} className="check-icon" />
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>)}

                    {activeTab2 === 'services' && (<div className="services-section">
                            <h1 className={'experience-text'}>Services Offered</h1>
                            <div className="services-grid">
                                {services.map((service, index) => (
                                    <div key={index} className="stats-card">
                                        <h3 style={{textAlign:'center'}}>{service}</h3>
                                    </div>
                                ))}
                            </div>

                            <div className="pricing-section">
                                <h2 className={'experience-text'}>Pricing Information</h2>
                                <p><strong>Standard Rate:</strong>Company rate</p>
                                <p><strong>Discounts:</strong>Company authorized</p>
                                <p><strong>Travel Fee:</strong>According to company's policy</p>
                            </div>

                            <div className="materials-section">
                                <h2 className={'experience-text'}>Preferred Cleaning Materials</h2>
                                <p>Fly cleaner primarily uses eco-friendly, non-toxic cleaning products that are safe for children and pets.</p>
                            </div>
                        </div>)}

                    {activeTab2 === 'reviews' &&
                        <div>
                            {!loadingReviews ? <div>
                                {reviewList.length > 0 && <div className="reviews-section">
                                <h2>Customer Reviews</h2>
                                <div className="review-summary">
                                    <div className="overall-rating">
                                        <p className="stars">{renderStars(rating)}</p>
                                        <p className="big-rating">{rating}</p>
                                        <p style={{textAlign:'end'}} className="review-count">{reviewCount} reviews</p>
                                    </div>

                                    <div className="rating-breakdown">
                                        <div className="rating-bar">
                                            <span>5 stars</span>
                                            <div className="bar-container">
                                                <div className="bar" style={{ width: `${five}%` }}></div>
                                            </div>
                                            <span>{five}%</span>
                                        </div>
                                        <div className="rating-bar">
                                            <span>4 stars</span>
                                            <div className="bar-container">
                                                <div className="bar" style={{ width: `${four}%` }}></div>
                                            </div>
                                            <span>{four}%</span>
                                        </div>
                                        <div className="rating-bar">
                                            <span>3 stars</span>
                                            <div className="bar-container">
                                                <div className="bar" style={{ width: `${three}%` }}></div>
                                            </div>
                                            <span>{three}%</span>
                                        </div>
                                        <div className="rating-bar">
                                            <span>2 stars</span>
                                            <div className="bar-container">
                                                <div className="bar" style={{ width: `${two}%` }}></div>
                                            </div>
                                            <span>{two}%</span>
                                        </div>
                                        <div className="rating-bar">
                                            <span>1 star</span>
                                            <div className="bar-container">
                                                <div className="bar" style={{ width: `${one}%` }}></div>
                                            </div>
                                            <span>{one}%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={'grid-container'}>
                                    {reviewList.map((review, index) => (
                                        <div key={review.id} className="review-card">
                                            <div className="review-header">
                                                <div className="reviewer-info">
                                                    <h4>{review.customer}</h4>
                                                    <div className="review-rating">
                                                        {renderStars(review.rating)}
                                                        <span className="review-date">{timeAgo(review.time)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="review-content">
                                                <p>{review.review}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>}
                                {reviewList.length <= 0 && <p>No review for {firstName} {lastName} yet </p> }
                            </div>  : <p>Loading reviews...</p>}
                            {loadingMore && <p>Loading...</p>}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};
export default ProfilePage;