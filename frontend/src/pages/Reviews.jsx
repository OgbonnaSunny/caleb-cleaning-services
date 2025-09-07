import React, { useState, useEffect} from "react";
import LOGO from "../images/logo4.png";
import {FaRegStar, FaStar} from "react-icons/fa";
import api from "./api.js";

const Reviews = () => {

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(10);
    const [pageCount, setPageCount] = useState(10);
    const [reviewList, setReviewList] = useState([]);
    const [message, setMessage] = useState("");
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        if (window.innerWidth > 768) {
            setPage(20)
            return;
        }
        setPage(10);
    }, []);

    useEffect(() => {
        document.title = "Reviews";
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                if (!loading && !finished) {
                    setPageCount(prev => prev + 1);
                }
            }

            if (scrollTop <= scrollHeight / 2) {
                setFinished(false);
            }

        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]);

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
        const fetchCleanerData =  async () => {
            setLoading(true);
            try {
                let offset = 0;
                if (reviewList?.length > 0) {
                    offset = reviewList[reviewList.length - 1].id;
                }
                const response = await api.post('/api/reviews/public', {limit: page, offset: offset});
                const { reviews } = response.data;
                if (reviews?.length > 0) {
                    setReviewList(prev => {
                        const map = new Map(prev.map(item => [item.id, item])); // old items
                        reviews?.forEach(item => map.set(item.id, item));    // add/replace new
                        return Array.from(map.values()).sort((a, b) => a.id - b.id); // convert back to array
                    });
                }
                else {
                    if (reviewList?.length <= 0) {
                        setMessage('No review record was found');
                    }
                    setFinished(true)
                }
            } catch(error) {
                console.log(error);
                setMessage('Error fetching some profile data')
            } finally {
                setLoading(false);
            }
        };
        fetchCleanerData();
    }, [pageCount]);

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


    return (
        <div className={['support-page', 'main-banner'].join(' ')} style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        }}>
            <div style={{display: 'flex', justifyContent:'flex-start', alignItems: 'center'}}>
                <img  src={LOGO} alt={''} className={'logo-icon'}/>
                <h1 className="page-title" style={{marginLeft:'10px'}}>Reviews</h1>
            </div>
            <div className={'container'}>
                <div>
                    {!loading ? <div>
                        {reviewList?.length > 0 &&
                            <div className="reviews-section">
                            <div className={'grid-container'}>
                                {reviewList?.map((review, index) => (
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
                        {reviewList?.length <= 0 && <p>No reviews yet </p> }
                    </div>  : <p>Loading reviews...</p>}
                    {loading && <p>Loading...</p>}
                </div>
            </div>
        </div>
    )
}
export default Reviews;