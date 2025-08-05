import React from 'react'
import LOGO from "../images/logo4.png";
import {Link} from 'react-router-dom'


const CashBack = () => {

    const links = [
        {id: 2,
            item: 'Booking Policy',
            path: '/booking',
        },
        {id: 3,
            item: 'Cancellation Policy',
            path: '/cancellation',
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
            marginTop: '50px',
            display:'flex',
            flexDirection:'column',
            minHeight:'100vh',
        }}>
            <div className={['container', 'main-container'].join(' ')} style={{marginTop:'50px', flex:'1'}}>
                <div className={['container', 'main-banner'].join(' ')} style={{display:'flex', flexDirection: 'row', marginTop:'20px', marginBottom:'30px', maxWidth:'1200px'}}>
                    <img src={LOGO} className={'logo-container'}/>
                    <h2 className={'help-text'} style={{textAlign:'start', color:'navy'}}>Subscription Cashback Terms & Conditions</h2>
                </div>
                <ul className={'list'}>
                    <li>Cashback cannot be used for multiple subscriptions.
                        If you have new multiple subscriptions only one subscription will be eligible
                        for the cashback. You cannot receive cashback more than once.
                    </li>
                    <li>Cashback scheme is only applicable to new subscriptions.</li>
                    <li>Cashback scheme does not apply to existing subscriptions.</li>
                    <li>Cashback is added to your bonus account within 24 hours of your last cleaning session provided all
                        cleaning sessions in your subscription have been completed successfully.
                    </li>
                    <li>The cashback amount you receive will be dependant on your subscription period: 3, 6 or 9 months.</li>
                </ul>
            </div>

            <section className={["footer-banner"].join(" ")}>
                <div className="container">
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
export default CashBack;