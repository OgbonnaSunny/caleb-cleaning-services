import React, { useState, useEffect, useRef} from "react";
import { useNavigate } from 'react-router-dom'

export function isValidUKPostcodeFormat(postcode) {
    // // Remove all whitespace and convert to uppercase
    const cleanedPostcode = postcode.replace(/\s/g, "").toUpperCase();

    // Reinsert the space before the last 3 characters
    const normalPostcode =  cleanedPostcode.slice(0, -3) + " " + cleanedPostcode.slice(-3);

    // Regular expression for UK currentPostcode validation
    const regex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/;

    return regex.test(normalPostcode);
}

export async function checkPostcodeExists(postcode) {
    try {
        const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}/validate`);
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("Error checking currentPostcode:", error);
        setError(`${postcode} does not exist`);
        return false;
    }
}

const Postcode = () => {
    const navigate = useNavigate();

    const [postcode, setPostcode] = useState('');
    const [error, setError] = useState('');

    const handleValidation = (e) => {
        e.preventDefault();
        if (!isValidUKPostcodeFormat(postcode)) {
            setError(`${postcode} is invalid`);
            return;
        }
        checkPostcodeExists(postcode);
    }


// Example usage
    checkPostcodeExists("SW1A 1AA").then( exists => {
        console.log("Postcode exists:", exists);
    });


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }}>
            <div className={'container'} style={{marginTop: '50px'}}>
                <h3 style={{color:'navy', textAlign:'center', marginBottom:'10px'}}>Add Postcode</h3>
                <form className='form' onSubmit={handleValidation}>
                    <div className="price-container">
                        <div style={{display: 'block', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="postcode"
                                    value={postcode}
                                    onChange={(e) => setPostcode(e.target.value)}
                                    required
                                    className={'button-bg'}
                                    style={{marginTop:'30px', marginBottom:'10px'}}
                                />
                                <label style={{color:'red'}}>{error}</label>
                            </div>

                        </div>
                        <button
                            type="submit" className="btn btn-primary"
                            style={{color:'navy', marginTop:'20px', textAlign:'center'}}
                        >
                            {`Add ${postcode}` }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Postcode;