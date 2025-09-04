// src/pages/ResetPassword.jsx
import React, { useEffect, useState } from "react";
import LOGO from "../images/logo4.png";
import api from './api.js'
import {checkPostcodeExists, isValidUKPostcodeFormat} from "./Postcode.jsx";
import { useNavigate} from "react-router-dom";

function getQueryParams() {
    const url = new URL(window.location.href);
    return {
        token: url.searchParams.get("token") || "",
        email: url.searchParams.get("email") || "",
    };
}

export default function ResetPassword() {
    const navigate = useNavigate();
    const [{ token, email }, setParams] = useState({ token: "", email: "" });
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);
    const [errors, setErrors] = useState(null);


    useEffect(() => {
        setParams(getQueryParams());
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        if (submitting) return;
        setErrors(null);
        setMessage(null);
        const hasCapitalLetter = (str) => /[A-Z]/.test(str);
        const hasNumber = (str) => /\d/.test(str);

        if (password !== confirm) {
            setErrors("Passwords do not match.");
            return;
        }

        if (password.trim().length <= 7) {
            setErrors("password must be at least 8 characters long");
            return;
        }

        if (!hasCapitalLetter(password)) {
            setErrors("Password must contain at least one capital letter");
            return;
        }

        if (!hasNumber(password)) {
            setErrors("Password must contain at least one number");
            return;
        }
        try {
            setSubmitting(true);
            const response = await api.post("/api/reset-password", { token, email, password,});
            const { message, sucess } =  response.data;
            setMessage(message);
            if (sucess) {
                setPassword("");
                setConfirm("");
                navigate("/login");
                window.close();
            }

        } catch (error) {
            console.log(error);
            setMessage("Unable to reset password");
        } finally {
            setSubmitting(false);
        }

    }

    if (!token || !email) {
        return (
            <div className="max-w-md mx-auto p-6">
                <h1 className="text-xl font-semibold mb-2">Invalid link</h1>
                <p className="text-sm">The reset link is missing data.</p>
            </div>
        );
    }

    return (
        <div className={'support-page'} style={{
            display: "block",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "100vh",
        }} >
            <div className={['container', 'main-banner'].join(' ')}
                 style={{display:'flex', flexDirection: 'row',
                     marginTop:'20px', marginBottom:'30px', alignItems:'center'}}>
                <img src={LOGO} className={'logo-container'}/>
                <h1 className="experience-text">Set a new password</h1>
            </div>
            <form onSubmit={handleSubmit} className="form-group">
                <input
                    type="password"
                    required
                    minLength={8}
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="button-bg"
                />
                <input
                    type="password"
                    required
                    placeholder="Confirm new password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="button-bg"
                    style={{marginTop:'20px'}}
                />
                <button
                    type="submit"
                    disabled={submitting}
                    style={{marginTop:'20px'}}
                    className={submitting ? "back-button" : "next-button"}>
                    {submitting ? "Saving..." : "Reset password"}
                </button>
            </form>
            {errors && <p className="error-message" role="alert">{errors}</p>}
            {message && <p className="mt-4 text-sm">{message}</p>}
        </div>
    );
}
