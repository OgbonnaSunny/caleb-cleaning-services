// src/pages/ForgotPassword.jsx
import React, {useEffect, useState} from "react";
import LOGO from "../images/logo4.png";
import api from './api.js'

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (success) {
            setEmail('')
        }
    }, [success]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        setMessage(null);
        try {
            const response = await api.post("/api/forgot-password", { email});
            const { message, success } = await response.data;
            setMessage(message);
            setSuccess(success);
        } catch (error) {
            console.log(error);
            setMessage('Error occured!');
        }
        finally {
            setSubmitting(false);
        }

    }

    return (
        <div className={'support-page'} style={{
            display: "block",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "100vh",
        }}>
            <div className={['container', 'main-banner'].join(' ')}
                 style={{display:'flex', flexDirection: 'row',
                     marginTop:'20px', marginBottom:'30px', maxWidth:'1200px', alignItems: 'center'}}>
                <img src={LOGO} className={'logo-container'}/>
                <h1 className="experience-text">Forgot your password?</h1>
            </div>

            <p className="text-sm mb-4">
                Enter your email and we’ll send you a reset link.
            </p>
            <form onSubmit={handleSubmit} className="form-group">
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="button-bg"
                />
                <button
                    type="submit"
                    disabled={submitting}
                    style={{margin:'10px'}}
                    className={submitting ? "back-button" : "submit-button"}>
                    {submitting ? "Sending..." : "Send reset link"}
                </button>
            </form>
            {message && <p style={{margin:'20px'}}>{message}</p>}
        </div>
    );
}
