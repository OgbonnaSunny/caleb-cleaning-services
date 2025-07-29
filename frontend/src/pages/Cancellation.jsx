import React from 'react'
import {Link} from 'react-router-dom'
import LOGO from "../images/logo3.png";

const Cancellation = () => {

    const feeData = [
        {
            action: 'Cancellation/Rescheduling between 6-24 hours before the start time if a fly cleaner is assigned',
            fee: '£30'
        },
        {
            action: 'Cancellation/Rescheduling less than 6 hours before the start time if a fly cleaner is assigned',
            fee: '£50'
        },
        {
            action: 'No Show Up - If fly cleaner arrives, but the client is not reachable within 30 minutes and the fly cleaner cannot access the client\'s property',
            fee: '£50'
        },
        {
            action: 'Subscription cancellation at any time, if the orders within your subscription are picked up by a cleaner',
            fee: '£0'
        }
    ];

    const links = [
        {id: 1,
            item: 'Terms and Conditions',
            path: '/terms',
        },
        {id: 2,
            item: 'Booking Policy',
            path: '/booking',
        },
        {id: 4,
            item: 'Cookies Policy',
            path: '/cookies',
        },
        {id: 5,
            item: 'Privacy Policy',
            path: '/privacy',
        },
    ]

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures it takes at least full viewport height
        }}>
            <div className={['container', 'main-banner'].join(' ')} style={{display:'flex', flexDirection: 'row', marginTop:'20px', marginBottom:'30px', maxWidth:'1200px'}}>
                <img src={LOGO} className={'logo-container'}/>
                <h1 className={'help-text'} style={{textAlign:'start', color:'navy'}}>Cancellation Policy</h1>
            </div>

            <section className={["container", "main-banner", "section-container"].join(" ")} style={{maxWidth:'1200px' , marginBottom:'30px,', marginTop:'50px', flex:'1'}} >
                <div>
                    <p>
                        Time is valuable for both clients and Fly cleaners. That is why we have introduced a Cancellation Policy for both clients and Fly cleaners, which also covers rescheduling.
                        By accepting our terms and conditions you accept the conditions set out in this cancellation policy.<br/>
                        If a client cancels a job less than 12 hours before the start time or at the last minute,
                        our Fly cleaners lose their income and it messes with their schedule. Clients’ cancellation fees cover eMoppers’ time and the Fly cleaner platform’s costs.
                    </p>
                    <table className="cookie-table">
                        <thead>
                        <tr>
                            <th>Action</th>
                            <th>Fee</th>
                        </tr>
                        </thead>
                        <tbody>
                        {feeData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.action}</td>
                                <td>{item.fee}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <p style={{marginTop:'20px'}}>
                        Fee applied only if a fly cleaner reported the case to Fly cleaners and provided a print screen with unanswered calls to the client and pictures of the door of the client’s property.
                    </p>
                </div>
            </section>

            <section className={["main-banner", "footer-banner"].join(" ")} style={{marginTop:'30px'}}>
                <div className="container" >
                    <div className="grid-container">
                        {links.map((link, index) => (
                            <div key={index.id}>
                                <Link to={link.path} target="_blank" rel="noopener noreferrer">{link.item}</Link>
                            </div>
                        ))}
                    </div>
                    <p style={{marginTop:'20px', color:"brown"}} >{new Date().getFullYear()} Flymax. All rights reserved.</p>
                </div>
            </section>
        </div>
    )
}

export default Cancellation;