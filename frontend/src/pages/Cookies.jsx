import React , { useEffect } from 'react'
import LOGO from '../images/logo4.png'
import {Link } from 'react-router-dom'


const Cookies = () => {

    const cookieData = [
        {
            title: 'Fly.ApplicationCookie',
            name: 'Fly.ApplicationCookie',
            purpose: 'This cookie is necessary for user auto-login to the personal eMop account.'
        },
        {
            title: 'Referral Cookie',
            name: 'referral',
            purpose: 'This cookie is necessary for applying promocode to the exact order'
        },
        {
            title: 'Special Referral',
            name: 'Special-referral',
            purpose: 'This cookie is necessary for making user Invites'
        },
        {
            title: 'Cookie Consent',
            name: 'CookieConsent',
            purpose: 'Stores the user\'s cookie consent state for the current domain'
        }
    ];

    const cookieData2 = [
        {
            title: 'CheckoutHome Middleware',
            name: '__stripe_mid',
            purpose: 'This cookie is necessary for making credit card transactions on the website. The service is provided by CheckoutHome.com which allows online transactions without storing any credit card information.',
            duration: '1 year'
        },
        {
            title: 'CheckoutHome Session',
            name: '__stripe_sid',
            purpose: 'This cookie is necessary for making credit card transactions on the website. The service is provided by CheckoutHome.com which allows online transactions without storing any credit card information.',
            duration: '1 day'
        },
        {
            title: 'JSESSION ID',
            name: 'JSESSIONID',
            purpose: 'Preserves users states across page requests.',
            duration: 'Session'
        },
        {
            title: 'LiveChat CSRF Token',
            name: 'LS_CSRF_TOKEN',
            purpose: 'Identifies the visitor across devices and visits, in order to optimize the chat-box function on the website.',
            duration: 'Session'
        },
        {
            title: 'Visitor Window Tab GUID',
            name: '__vw_tab_guid',
            purpose: 'Registers data on visitors\' website-behaviour. This is used for internal analysis and website optimisation.',
            duration: 'Session'
        },
        {
            title: 'Google Analytics',
            name: '_ga',
            purpose: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.',
            duration: '2 years'
        },
        {
            title: 'Google Analytics Throttle',
            name: '_gat',
            purpose: 'Used by Google Analytics to throttle request rate.',
            duration: '1 day'
        },
        {
            title: 'Google Analytics ID',
            name: '_gid',
            purpose: 'Registers a unique ID that is used to generate statistical data on how the visitor uses the website.',
            duration: '1 day'
        },
        {
            title: 'Hotjar ID',
            name: '_hjid',
            purpose: 'Sets a unique ID for the session. This allows the website to obtain data on visitor behaviour for statistical purposes.',
            duration: '1 year'
        },
        {
            title: 'Yandex Metrika First Visit',
            name: '_ym_d',
            purpose: 'Contains the date of the visitor\'s first visit to the website.',
            duration: '1 year'
        },
        {
            title: 'Yandex Ad Blocker Detection',
            name: '_ym_isad',
            purpose: 'This cookie is used to determine if the visitor has any adblocker software in their browser - this information can be used to make website content inaccessible to visitors if the website is financed with third-party advertisement.',
            duration: '1 day'
        },
        {
            title: 'Yandex Metrika Retry Requests',
            name: '_ym_retryReqs',
            purpose: 'Registers statistical data on visitors\' behaviour on the website. Used for internal analytics by the website operator.',
            duration: 'Persistent'
        },
        {
            title: 'Yandex Metrika UID',
            name: '_ym_uid',
            purpose: 'This cookie is used to collect non-personal information on the visitor\'s website behavior and non-personal visitor statistics.',
            duration: '1 year'
        },
        {
            title: 'Session IQ Database',
            name: 'siqlsdb',
            purpose: 'Sets a unique ID for the session. This allows the website to obtain data on visitor behaviour for statistical purposes.',
            duration: 'Persistent'
        },
        {
            title: 'User Tracking Session DB',
            name: 'utsdb',
            purpose: 'Registers data on visitors\' website-behaviour. This is used for internal analysis and website optimisation.',
            duration: 'Session'
        },
        {
            title: 'Facebook Pixel',
            name: '_fbp',
            purpose: 'Used by Facebook to deliver a series of advertisement products such as real time bidding from third-party advertisers.',
            duration: '3 months'
        },
        {
            title: 'Hotjar Included in Sample',
            name: '_hjIncludedInSample',
            purpose: 'Determines if the user\'s navigation should be registered in a certain statistical place holder.',
            duration: 'Session'
        },
        {
            title: 'Yandex Metrika Enabled',
            name: '_ym_metrika_enabled',
            purpose: 'This cookie is used to collect data on the visitor\'s behavior on the website - this information can be used to assign the visitor to a visitor segment, based on common preferences.',
            duration: '1 day'
        },
        {
            title: 'Google Ads Audience',
            name: 'ads/ga-audiences',
            purpose: 'Used by Google AdWords to re-engage visitors that are likely to convert to customers based on the visitor\'s online behaviour across websites.',
            duration: 'Session'
        },
        {
            title: 'Campaign Tracking',
            name: 'b3e783bb62',
            purpose: 'Collects information on user preferences and/or interaction with web-campaign content - This is used on CRM-campaign-platform used by website owners for promoting events or products.',
            duration: 'Session'
        },
        {
            title: 'Facebook Referral',
            name: 'fr',
            purpose: 'Used by Facebook to deliver a series of advertisement products such as real time bidding from third-party advertisers.',
            duration: '3 months'
        },
        {
            title: 'Google DoubleClick',
            name: 'IDE',
            purpose: 'Used by Google DoubleClick to register and report the website user\'s actions after viewing or clicking one of the advertiser\'s ads with the purpose of measuring the efficacy of an ad and to present targeted ads to the user.',
            duration: '1 year'
        },
        {
            title: 'Yandex Metrika Enabled',
            name: 'metrika_enabled',
            purpose: 'Used to track visitors on multiple websites, in order to present relevant advertisement based on the visitor\'s preferences.',
            duration: '1 day'
        },
        {
            title: 'Microsoft Unique ID',
            name: 'MUID',
            purpose: 'Used widely by Microsoft as a unique user ID. The cookie enables user tracking by synchronising the ID across many Microsoft domains.',
            duration: '1 year'
        },
        {
            title: 'Microsoft Unique ID Backup',
            name: 'MUIDB',
            purpose: 'Registers data of visitors from multiple visits and on multiple websites. This information is used to measure the efficiency of advertisement on websites.',
            duration: '1 year'
        },
        {
            title: 'Facebook Tracking',
            name: 'tr',
            purpose: 'Used by Facebook to deliver a series of advertisement products such as real time bidding from third-party advertisers.',
            duration: 'Session'
        },
        {
            title: 'Test Cookie',
            name: 'Test_cookie',
            purpose: 'Used to check if the user\'s browser supports cookies.',
            duration: '1 day'
        },
        {
            title: 'Yandex Browser Session ID',
            name: 'yabs-sid',
            purpose: 'Registers data on visitors\' website-behaviour. This is used for internal analysis and website optimisation.',
            duration: 'Session'
        },
        {
            title: 'Yandex Unique ID',
            name: 'yandexuid',
            purpose: 'Registers data on visitors\' website-behaviour. This is used for internal analysis and website optimisation.',
            duration: '1 year'
        },
        {
            title: 'Yandex Persistent',
            name: 'yp',
            purpose: 'Sets a unique ID for the session. This allows the website to obtain data on visitor behaviour for statistical purposes.',
            duration: '10 years'
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
        {id: 3,
            item: 'Cancellation Policy',
            path: '/cancellation',
        },
        {id: 5,
            item: 'Privacy Policy',
            path: '/privacy',
        },
    ]

    useEffect(() => {
        document.title = "Cookie Policy";
    }, [])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures it takes at least full viewport height
        }}>
            <div className={['container', 'main-banner'].join(' ')} style={{display:'flex', flexDirection: 'row', marginTop:'20px', marginBottom:'30px', maxWidth:'1200px'}}>
                <img src={LOGO} className={'logo-container'}/>
                <h1 className={'help-text'} style={{textAlign:'start', color:'navy'}}>Cookies Policy</h1>
            </div>

            <div className={['container', 'main-banner'].join(' ')} style={{maxWidth:'1200px', marginBottom:'30px'}} >

                <section>
                    <div className={['container', 'main-banner', 'section-container'].join(" ")}>
                        <h3 style={{color:'navy', marginTop:'30px'}}>1. Our use of cookies</h3>
                        <p>
                            Our website uses cookies to distinguish you from other users of our website at www.flymax.uk. This helps us to give you a better experience when you browse our website and it also allows us to improve our site. By continuing to browse our website, you are agreeing to our use of cookies.
                        </p>
                    </div>
                </section>

                <section>
                    <div className={['container', 'main-banner', 'section-container'].join(" ")}>
                        <h3 style={{color:'navy', marginTop:'30px'}}>2. What is a cookie?</h3>
                        <p>
                            A cookie is a small file of letters and numbers that we store on your browser or the hard drive of your computer if you agree. Cookies contain information that is transferred to your computer’s hard drive.
                        </p>
                    </div>
                </section>

                <section>
                    <div className={['container', 'main-banner', 'section-container'].join(" ")}>
                        <h3 style={{color:'navy', marginTop:'30px'}}>3. What cookies do Fly cleaner use?</h3>
                        <p>We use the following cookies:</p>
                        <ul className={'dot-list'}>
                            <li>
                                <span style={{fontWeight:'bold'}}>Strictly necessary cookies.</span> These are cookies that are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website, use a shopping cart or make use of e-billing services.
                            </li>
                            <li>
                                <span style={{fontWeight:'bold'}}>Analytical or performance cookies.</span> These allow us to recognise and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.
                            </li>
                            <li>
                                <span style={{fontWeight:'bold'}}>Functionality cookies.</span> These are used to recognise you when you return to our website. This enables us to personalise our content for you, greet you by name and remember your preferences (for example, your choice of language or region).
                            </li>
                            <li>
                                <span style={{fontWeight:'bold'}}>Targeting cookies.</span> These cookies record your visit to our website, the pages you have visited and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests.
                            </li>
                        </ul>
                    </div>
                </section>

                <section style={{marginTop:'20px'}}>
                    <div className="container">
                        <h2>4. First-party cookies</h2>
                        <p>
                            1. Our use of cookies
                            Our website uses cookies to distinguish you from other users of our website. This helps us to give you a better experience when you browse our website and it also allows us to improve our site. By continuing to browse our website, you are agreeing to our use of cookies.

                            2. What is a cookie?
                            A cookie is a small file of letters and numbers that we store on your browser or the hard drive of your computer if you agree. Cookies contain information that is transferred to your computer’s hard drive.

                            3. What cookies do Fly cleaner use?
                            We use the following cookies:

                            Strictly necessary cookies. These are cookies that are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website, use a shopping cart or make use of e-billing services.
                            Analytical or performance cookies. These allow us to recognise and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.
                            Functionality cookies. These are used to recognise you when you return to our website. This enables us to personalise our content for you, greet you by name and remember your preferences (for example, your choice of language or region).
                            Targeting cookies. These cookies record your visit to our website, the pages you have visited and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests.
                            4. First-party cookies
                            Our website will set some cookies that are essential for the website to operate correctly. These cookies do not capture personally identifiable information. They are:
                        </p>
                        <table className="cookie-table">
                            <thead>
                            <tr>
                                <th>Cookie Title</th>
                                <th>Cookie Name</th>
                                <th>Purpose and type of cookie</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cookieData.map((cookie, index) => (
                                <tr key={index}>
                                    <td>{cookie.title}</td>
                                    <td>{cookie.name}</td>
                                    <td>{cookie.purpose}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className={'main-banner'} style={{marginTop:'20px'}}>
                    <div className="container">
                        <h2>5. Third-party cookies</h2>
                        <p>Please note that the following third-parties may also use cookies, over which we have no control.
                            These named third-parties may include, for example, advertising networks and providers of external services like web traffic analysis services. T
                            hese third-party cookies are likely to be analytical cookies or performance cookies or targeting cookies.  They are:
                        </p>
                        <table className="cookie-table">
                            <thead>
                            <tr>
                                <th>Cookie Title</th>
                                <th>Cookie Name</th>
                                <th>Purpose and type of cookie</th>
                                <th>Duration</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cookieData2.map((cookie, index) => (
                                <tr key={index}>
                                    <td>{cookie.title}</td>
                                    <td><code>{cookie.name}</code></td>
                                    <td>{cookie.purpose}</td>
                                    <td>{cookie.duration}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className={'main-banner'} style={{marginTop:'20px'}}>
                    <div className="container">
                        <h2>6. How do I change my cookie settings?</h2>
                        <p>
                            You can change your cookie preferences at any time. Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit
                            www.aboutcookies.org or www.allaboutcookies.org.<br/>

                            Find out how to manage cookies on popular browsers:<br/><br/>

                            Google Chrome<br/>
                            Microsoft Edge<br/>
                            Mozilla Firefox<br/>
                            Microsoft Internet Explorer<br/>
                            Opera<br/>
                            Apple Safari<br/>
                            To find information relating to other browsers, visit the browser developer’s website.<br/>

                            To opt out of being tracked by Google Analytics across all websites, visit https://tools.google.com/dlpage/gaoptout .
                        </p>
                    </div>
                </section>
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

export default Cookies