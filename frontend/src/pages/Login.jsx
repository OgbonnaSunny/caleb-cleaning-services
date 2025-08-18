import React, { useState, useEffect } from "react";
import api from './api.js'
import {Link, useNavigate} from "react-router-dom";
import Payment from "./Payment.jsx";
import LOGO from "../images/logo4.png";

const Login = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({email: "", password: ""});
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const sanitizedValue = value.replace(/<[^>]*>/g, ''); // Basic XSS prevention
        setFormData({...formData, [name]: sanitizedValue});
        setError('');
        setMessage("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newError = {}
        if (!formData.email) {
            newError.email = 'Please enter a valid email';
        }
        if (!formData.password) {
            newError.password = 'Please enter a password';
        }

        if (Object.keys(newError).length > 0) {
            setError(newError);
            return;
        }
        login()
    }

    const login = async () => {
        setLoading(true);
        try {
            const response = await api.post('/api/login', formData);
            const { success, user } = response.data;
            if (success === true) {
                console.log(success);
                localStorage.setItem("user", JSON.stringify(user));
                console.log(user);
                const role = user.roles;
                if (role === 'admin') {
                    navigate('/admin');
                    return;
                }
                if (role === 'user') {
                    navigate('/checkout');
                    return;
                }
                if (role === 'cleaner') {
                    navigate('/cleanerprofile');
                    return;
                }
                navigate('/overview');
            }
            else {
                setMessage("Invalid email or password");
            }
            window.close();
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message;
            setMessage(errorMessage);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div style={{
            display: "block",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "100vh",
        }}>
            {loading && <div className="raise-progress-bar-container">
                <div className="progress-bar-container">
                    <div className="spinner"></div>
                    <p style={{textAlign:'center'}}>processing credentials...</p>
                </div>
            </div>}
            <div className={['container', 'main-banner'].join(' ')}>
                <form onSubmit={handleSubmit}>
                    <div className={['container', 'main-banner'].join(' ')}
                         style={{display:'flex', flexDirection: 'row',
                             marginTop:'20px', marginBottom:'30px', maxWidth:'1200px'}}>
                        <img src={LOGO} className={'logo-container'}/>
                        <h1 className={'help-text'} style={{textAlign:'start', color:'navy'}}>Sign in</h1>
                    </div>

                    {message && <label className={'error-message'}>{message}</label> }

                    <div className="form-group" >
                        <label htmlFor="email">Email*</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={'button-bg'}
                            required
                        />
                        {error.email && <span className="error-message">{error.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="postcode">Password*</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={'button-bg'}
                            required
                        />
                        {error.password && <span className="error-message">{error.password}</span>}
                    </div>

                    <button type="submit" className={loading ? "back-button" : "next-button" }  disabled={loading}>Submit</button>

                    <p style={{marginTop:'20px'}}>Don't have an account? <Link style={{color:'navy'}} to={'/signup'} target="_blank" rel="noopener noreferrer">
                        sign up</Link></p>
                </form>
            </div>
        </div>
    )
  
}
export default Login;