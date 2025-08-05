import React, { useState, useEffect} from "react";
import login from "./Login.jsx";
import {useNavigate, Link} from 'react-router-dom'
import api from "./api.js"
import LOGO from "../images/logo4.png";

const Logout = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const logout = (e) => {
        e.preventDefault();
        setLoading(true);
        api.post('/api/logout')
            .then((response) => {
                if (response.data) {
                    localStorage.removeItem('user');
                    navigate('/overview');
                }
            })
            .catch((error) => {
                console.log(error);
                localStorage.removeItem('user');
                navigate('/overview');
            })
            .finally(() => {
                setLoading(false);
            })
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            alignItems: "center",
        }}
        className="support-page">
            {loading && <div className="raise-progress-bar-container">
                <div className="progress-bar-container">
                    <div className="spinner"></div>
                    <p style={{textAlign:'center'}}>processing data...</p>
                </div>
            </div>}
            <div className="main-banner">
                <div className="navbar-logo">
                    <img src={LOGO} alt="logo" className="logo"  />
                    <h2 className={'help-text'}>Logout</h2>
                </div>
                <form style={{marginTop:'20%'}} onSubmit={logout}>
                    <div>
                        <button style={{width:'100%'}}
                                className={'submit-button'} type={'submit'}>
                            Logout
                        </button>
                    </div>
                    <p style={{marginTop:'20px'}}>Didn't login yet? <Link style={{color:'navy'}} to={'/login'}>Login</Link></p>
                </form>
            </div>
        </div>
    )
}
export default Logout;
