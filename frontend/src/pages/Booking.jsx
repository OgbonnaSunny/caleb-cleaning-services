import React from 'react'
import {Link} from 'react-router-dom'
import LOGO from "../images/logo4.png";


const Booking = () => {

    const termsAndConditions = [
        {
            id: 1,
            item: "We, Fly Ltd, are not a cleaning company. We simply provide a platform where Customers can order cleaning services ('Service'); we administer the booking and collect payment."
        },
        {
            id: 2,
            item: "Cleaning services ordered via the Fly cleaner platform are performed by 'Fly cleaners', self-employed cleaners who have registered on our website. When a service is accepted by a Fly cleaner, the customer will enter into a separate contract with the Fly cleaner."
        },
        {
            id: 3,
            item: "We are not responsible for the performance of service provided by Fly cleaners, however in some cases we rearrange the service to ensure customer satisfaction."
        },
        {
            id: 4,
            item: "By agreeing to these Booking Terms and Conditions you agree to our Cancellation Policy and Cancellation fees."
        },
        {
            id: 5,
            item: "We are not responsible for loss of income, revenue, business, profits, anticipated savings, data or waste of management or office time."
        },
        {
            id: 6,
            item: "We may amend these Booking Terms and Conditions from time to time, and the Booking Terms and Conditions in force at the time a service is made will apply to that service."
        },
        {
            id: 7,
            item: "Nothing in these Booking Terms and Conditions affects your statutory rights as a customer or excludes or limits our liability if you suffer personal injury or death as a result of our negligence, or if you suffer loss or damage as a result of our fraud or fraudulent misrepresentation."
        }
    ];

    const links = [
        {id: 1,
            item: 'Terms and Conditions',
            path: '/terms',
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
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures it takes at least full viewport height
        }}>
            <div className={['container', 'main-banner'].join(' ')} style={{display:'flex', flexDirection: 'row', marginTop:'20px', marginBottom:'30px', maxWidth:'1200px'}}>
                <img src={LOGO} className={'logo-container'}/>
                <h1 className={'help-text'} style={{textAlign:'start', color:'navy'}}>Booking Policy</h1>
            </div>

            <section className={['main-banner', 'container'].join(' ')} style={{maxWidth:'1200px', marginBottom:'30px'}} >
                <div className="container">
                    <h3 className={'help-text'} style={{color:'navy'}}>1. THESE TERMS</h3>
                    <p>
                        1.1. Please read these Booking Terms and Conditions carefully before you submit your booking to Fly cleaner Ltd (“Fly cleaner” “we” “us”).
                        These terms tell you how we will provide services to you (“Customer”), how you or Fly cleaner may change or end the contract, what to do if there is a problem and other important information.<br/>
                        1.2. These Booking Terms and Conditions MUST be read in conjunction with our Website Terms and Conditions.<br/>
                        1.3. By making a booking via the platform website at www.flymax.uk, you confirm that you accept these terms and conditions, and that you agree to comply with them.
                        If you think that there is a mistake in these Booking Terms and Conditions please contact us to discuss the issue.
                        If there is anything you do not agree with in these Booking Terms and Conditions, please do not make a booking. If there is anything you do not understand in these Booking Terms and Conditions, then please contact us at support@emop.world and we will do our best to assist you.
                    </p>

                    <h3 className={'help-text'} style={{marginTop:'50px'}}>2. SUMMARY</h3>
                    <p>2.1. In summary, these Booking Terms and Conditions include your agreement and understanding that:</p>
                    {termsAndConditions.map(term => (
                        <div key={term.id}>
                            <ul className={'dot-list'}>
                                <li>{term.item}</li>
                            </ul>
                        </div>
                    ))}

                    <h3 className={'help-text'} style={{color:'navy', marginTop:'30px'}}>3. INFORMATION ABOUT US AND HOW TO CONTACT US</h3>
                    <p>
                        3.1. Who we are – We are eMop Ltd, a company registered in England and Wales. Our company registration number is 10643724 and our registered office is eMop Ltd, 7-12 Tavistock Sq, London, WC1H9BQ.<br/>

                        3.2. How to contact us – You can contact us by email.<br/>

                        3.3 How we may contact you – If we have to contact you, we will do so by telephone or by writing to you at the email address or postal address you provided to us in your Booking.<br/>

                        3.4. ”Writing” includes emails – When we use the words “writing” or “written” in these terms, this includes emails.

                    </p>

                    <h3 className={'help-text'}  style={{color:'navy', marginTop:'30px'}}>4. WHAT WE DO</h3>
                    <p>4.1. We operate an online platform, or on our App (collectively referred to as the “Flymax Platform”) through which customers can book an Fly cleaner for the provision of cleaning services, by submitting a booking request.<br/>
                        4.2. We, Fly cleaner, do not offer the cleaning service itself. We are merely a third-party facilitator of the contracts between the customer and the eMopper.
                        Accordingly, Fly cleaner can receive and confirm customer’s requests for cleaning services, issue invoices on behalf of the eMopper and pass on payments to the Fly cleaner.
                    </p>

                    <h3 className={'help-text'} style={{color:'navy', marginTop:'30px'}}>5.  OUR CONTRACT WITH YOU</h3>
                    <p>
                        5.1. When you make a booking on the Fly cleaner Platform, you will create two legal contracts. The first contract being with us, and the second contract being with the Fly cleaner for the provision of the service.<br/>

                        5.2. In the contract with us, we have certain responsibilities to you in relation to booking and payment process as well as our standards maintenance and use of the website in accordance with the provisions of these Booking Terms and Conditions, including governing access.<br/>

                        5.3. We are also responsible for taking your bookings and making it available for Fly cleaner, and for dealing with payments made by you in relation to those bookings. This contractual agreement is made on these Booking Terms and Conditions.<br/>

                        5.4. The contract between you and the Fly cleaner (“Cleaning Agreement”) sets out the provisions of the service you book via the eMop platform. The service you book is the responsibility of the Fly cleaner who provides it. We act as booking agent for eMoppers; therefore, we are not responsible or liable for the actual service that is booked through the Fly cleaner platform.<br/>

                        5.5. We only operate in the UK. Our website is solely for the promotion of our products in the UK. Unfortunately, we do not accept requests from outside the UK.<br/>

                        5.6. Customers must be at least 18 (eighteen) years of age to use the Fly cleaner platform.
                    </p>

                    <h3 className={'help-text'} style={{color:'navy', marginTop:'30px'}}>6. THE PLATFORM</h3>
                    <p>
                        6.1. The Fly cleaner platform allows you, the Customer, to book and pay for cleaning services undertaken by eMoppers. The service is provided by our Fly cleaners, and not by us.<br/>

                        6.2. The service shown on the Fly cleaner platform is subject to availability and the images on the Fly cleaner platform are for illustrative purposes only. We ask our Fly cleaner to ensure that they provide the service in accordance with the description on our platform. It is each Fly cleaners' responsibility to ensure that he or she provides the service not only in accordance with the description, but also in accordance with our standards and materials provided during the Fly cleaners enrolment.
                    </p>

                    <h3 className={'help-text'} style={{color:'navy', marginTop:'30px'}}>7 . MAKING A BOOKING</h3>
                    <p>
                        7.1. We may ask you to provide a valid proof of identity in a form reasonably acceptable to us upon request.<br/>

                        7.2. You may make a booking only under your name. If you make a booking under another person’s name, this person is responsible for contacting eMop regarding the service booked and all possible issues.<br/>

                        7.3. Once registered on the eMop platform, you can select the service you require, the location, and the time. When you enter these details we will notify you of the estimated cost and the estimated time required to carryout the service. If you would like to go ahead, you may then submit the Order (“Order”) to confirm your request.<br/>

                        7.4. When you submit your Order for Service, we will send you an email acknowledging receipt of that service (“Order Confirmation”). Please note that the service is only confirmed when you receive the Order Confirmation. The contract between you and the eMopper will be formed only when you receive the Order Confirmation.<br/>

                        7.5. You must treat an eMopper courteously and lawfully and ensure that the location in which he/she provides the service is safe, and that an appropriate working environment is supplied for the eMopper, in compliance with all applicable laws and regulations.<br/>

                        7.6. We strongly advise that you exercise caution and common sense to protect your personal safety and property, as you would when interacting with any person whom you do not know. Whilst we have undertaken a Basic Disclosure and Barring Service check (DBS), an identity check based on identifying documents, and a check for adverse financial history such as bankruptcy, it is your responsibility to keep yourself safe by having all personal or sentimental possessions locked away.
                    </p>

                    <h3 className={'help-text'}  style={{color:'navy', marginTop:'30px'}}>8 . PAYMENT</h3>

                    <h4 style={{marginTop:'30px'}}>General</h4>
                    <p>
                        8.1. The price of the services on the Fly cleaner platform may be subject to change from time to time, and we will endeavour to ensure that our website prices are accurately updated accordingly.<br/>

                        8.2. Prices are based on the specified hourly rate, which depends on factors such as booking date and time.<br/>

                        8.3. Prices include VAT where applicable, unless it is stated otherwise on the relevant page in relation to the service on the eMop platform.<br/>

                        8.4. Any currency conversion costs, or other charges incurred in making a payment will be borne by you in addition to the price due to us.<br/>
                    </p>

                    <h4 style={{marginTop:'30px'}}>Our Payment Provider – Stripe</h4>
                    <p>
                        8.5. We use ‘Stripe’ as our payment processing partner. By placing a booking on our website, you authorise Fly cleaner. Ltd, through Stripe, to send instructions to the financial institution that issued your card to take payments from your card account in accordance with the Booking Terms and Conditions.<br/>

                        8.6. Fly cleaner reserves the rights to decline your payment method in case of insufficient funds on your card or suspicions of fraud or for any other reason.<br/>

                        8.7. Fly cleaner holds the estimated amount on your card after the booking has been placed so as to ensure payment will be provided after the service is completed.<br/>

                        8.8. Payment for the service will be made after your cleaning has been completed, and you will be charged based on the actual time an eMopper spent in your premises, cleaning. The amount payable will be rounded up to the next minute and will be based on the rate shown to you on the website when you made your booking. You will be responsible for protecting the confidentiality of your username and any password or other security information used by you to access this payment facility and/or the eMop platform.<br/>

                        8.9. We take reasonable care to provide a functioning payment facility at all times, but cannot guarantee continuous, uninterrupted or secure access to such payment facility, nor can we guarantee that the facility is virus or error free. We also try to ensure that your payments are processed promptly, but it is often difficult to predict the amount of time needed to complete processing because it is dependent on many factors outside our control, such as delays in the banking system or in card networks. Access to our payment facility may be occasionally restricted to allow for repairs, maintenance or the introduction of new facilities or services. We will attempt to provide reasonable notice of any scheduled interruptions and will do what we can to restore the facility as soon as reasonably possible.<br/>

                        8.10. By accepting these Booking Terms and Conditions:<br/>
                        <p style={{marginLeft:'30px'}}>
                            8.10.1. In accordance with the Strong Customer Authentication Regulation (SCA), you are giving eMop, via Stripe, permission to charge your on-file credit card, debit card, or other approved methods of payment for fees that you owe eMop. The payment initiation is for ‘one-off’ payments only and will be determined by the actual time incurred in the provision of the service (in other words, the actual time it took to carryout the service).<br/>

                            8.10.2. All information that you provide in connection with a purchase or transaction or other monetary transaction interaction with the service must be accurate, complete, and current.<br/>

                            8.10.3. You agree to pay all charges incurred by eMoppers or eMop at the prices in effect when such charges are incurred
                        </p>
                    </p>

                    <h3 style={{color:'navy', marginTop:'30px'}}>9. CANCELLATION</h3>
                    <p>
                        9.1. In addition to your other legal rights as a consumer, you have the right to cancel an order, subject to our Cancellations Policy, which you agree to by accepting our Booking Terms and Conditions. Please familiarise yourself with our Cancellation Policy, and any cancellation penalty fees you may incur as a result of the cancellation.
                    </p>

                    <h3 className={'help-text'} style={{color:'navy', marginTop:'30px'}}>10.  LIABILITY</h3>
                    <p>
                        10.1. The service which you book via the Fly cleaner platform is the responsibility of the Fly cleaner who provides it. We are not responsible or liable to you for the actual service provided by the Fly cleaner to the fullest extent permissible by law.<br/>

                        10.2. Under these Booking Terms and Conditions, we have certain obligations to you. These are:<br/>

                        10.2.1 We are responsible for taking your bookings and making it available for Fly cleaners.<br/>

                        10.2.2. We are responsible for dealing with payments made by you in relation to your bookings.<br/>

                        10.2.3. We are responsible for vetting our Fly cleaners and ensuring they have appropriate insurance. We ensure that eMoppers have appropriate professional insurance.<br/>

                        10.2.4. We also undertake a Basic Disclosure and Barring Service check (DBS), an identity check based on identifying documents, and a check for adverse financial history such as bankruptcy.<br/>

                        10.2.5. Where we have breached any obligation to you under Section 10.2, our liability will be limited up 125% of the service fee.<br/>

                        10.2.6.  Our liability does not include any losses relating to your business, even if those losses are reasonably foreseeable. These types of losses include (for example) loss of income or revenue; loss of business; loss of profits; loss of anticipated savings; loss of data; or waste of management or office time.
                    </p>

                    <h3 className={'help-text'} style={{color:'navy', marginTop:'30px'}}>11. DAMAGE</h3>
                    <p>
                        11.1. Fly cleaner LTD does not accept any liability for Loss , Damage or Theft at the location of the property in the order as a result of the Fly cleaners accessing the property to perform their duties. Our Fly cleaners will do their best to ensure that utmost care is taken when cleaning said property however sometimes accidents can happen. In this case we highly recommend that all households have the relevant insurance in place to cover any loss including theft or damages caused as a result of the service provided.
                    </p>

                    <h3 className={'help-text'} style={{color:'navy', marginTop:'30px'}}>12. REFUNDS</h3>
                    <p>
                        12.1. Fly cleaner LTD does not offer any refunds for services provided, which is why we always encourage our customers to fully inspect the cleaning before your Fly cleaner leaves to ensure that you are completely satisfied with the results.<br/>

                        12.2. If you are dissatisfied with the service, then any issue must be reported within 24 hours of completion of the service. We will then attempt to rectify these issues.<br/>

                        12.3. We reserve the right to revise/amend these Booking Terms and Conditions from time to time.
                    </p>

                    <h3 className={'help-text'} style={{color:'navy', marginTop:'30px'}}>13. COMPLAINTS</h3>
                    <p>
                        13.1. If you would like to make a complaint or provide negative feedback about one of our eMoppers or the service generally, please contact us as soon as possible. We’ll then contact the eMopper and try to resolve any issues on your behalf.<br/>

                        13.2. If you are unhappy with the service received from an Fly cleaner, then in the first instance you should speak to the Fly cleaner yourself to try to resolve the issue.<br/>

                        13.2. If you are unable to resolve the issue with the Fly cleaner then please let us know and we will try to resolve the issue. If we are unable to resolve the issue following contact with the eMopper, you may arrange for the re-performance of the disputed/complained about aspect of the service by an alternative eMopper, at no additional cost to you.


                    </p>

                    <h3 className={'help-text'} style={{color:'navy', marginTop:'30px'}}>14. DATA PROTECTION</h3>
                    <p>
                        15.1. We will process any personal data provided by you in accordance with UK data protection legislation. Please see our <Link to={'/privacy'} style={{color:'blue'}}>Privacy Policy</Link> for further information on what personal data we process and for what purpose.

                    </p>

                    <h3 className={'help-text'} style={{color:'navy', marginTop:'30px'}}>15. LEGAL JURUSDICTION</h3>
                    <p>
                        15.1. If any of these Booking Terms and Conditions are determined by a competent authority to be invalid, unlawful or unenforceable to any extent, such term, condition or provision will to that extent be severed from the remaining terms, conditions and provisions which will continue to be valid to the fullest extent permitted by law.<br/>

                        15.2. These Booking Terms and Conditions are governed by English law.
                    </p>
                </div>
            </section>

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
export default Booking;