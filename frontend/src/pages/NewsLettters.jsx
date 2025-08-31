import React, {useState, useEffect} from 'react';
import api from './api.js'
import LOGO from "../images/logo4.png";
import {FaBars} from "react-icons/fa";

const NewsLetters = () => {
    const [newsLetters, setNewsLetters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [news, setNews] = useState('');
    const [page, setPage] = useState(10);
    const [pageSize, setPageSize] = useState(0);
    const [title, setTitle] = useState('');

    useEffect( () => {
        document.title = "News Letters";
    })

    const sendNewsLetter = (e) => {
        e.preventDefault();
        if (loading) return;
        if (newsLetters.length <= 0) {
            setMessage('No news subscribers found.');
            return;
        }
        setLoading(true);
        api.post('/api/send-bulk-email', {emails: newsLetters, news: news, title: title })
        .then(response => {
            const {message, success} = response.data;
            setMessage(message);
            if (success) {
                setNews('')
                setTitle('')
            }
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                if (!loading) {
                    setPage(page => page + 1);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]);

    useEffect(() => {
        if (message) {
            setTimeout(() => setMessage(''), 5000);
        }
    }, [message]);

    useEffect(() => {
        api.get('/api/subscribe/news')
            .then(response => {
                setNewsLetters(response.data.emails);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => setLoading(false));
    }, [])

    return  (
        <div className={'support-page'}
             style={{display: 'flex',
                 minHeight: '100vh',
                 flexDirection: 'column',
                 alignItems: 'center' }}>
            <div style={{display: 'flex', justifyContent:'flex-start', alignItems: 'center'}}>
                <img  src={LOGO} className={'logo-icon'}/>
                <h1 className="page-title" style={{marginLeft:'10px'}}>News Letters</h1>
            </div>
            <div className="main-banner">
                <form onSubmit={sendNewsLetter}>
                    <div className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">News Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                className="button-bg"
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            {title.errors && <label>{title.errors}</label>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">News</label>
                            <textarea
                                id="message"
                                name="message"
                                value={news}
                                rows={20}
                                className="button-bg"
                                required={true}
                                onChange={(e) => setNews(e.target.value)}>

                                    </textarea>
                            {news.errors && <label className="error-message">{news.errors}</label>}
                        </div>
                        {message && <p style={{margin:'10px'}}>{message}</p>}
                        {loading && <p style={{margin:'10px'}}>sending email...</p>}
                    </div>
                    <button disabled={loading} type="submit" className={loading ? "back-button" : "submit-button"}>Send Letters</button>
                </form>
            </div>
        </div>
    );
}
export default NewsLetters;