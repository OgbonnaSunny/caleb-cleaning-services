import React  from "react";
import LOGO from "../images/logo4.png";
import { Link } from 'react-router-dom'

const Privacy = () => {

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
        {id: 4,
            item: 'Cookies Policy',
            path: '/cookies',
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
                <h1 className={'help-text'} style={{textAlign:'start', color:'navy'}}>Privacy Policy</h1>
            </div>

            <section className={["container", "main-banner", "section-container"].join(" ")} style={{maxWidth:'1200px', marginBottom:'30px,', marginTop:'50px'}}>
                <p style={{marginBottom:'30px'}}>
                    1 Overview<br/><br/>

                    1.1. We (“Flymax Ltd”) collect and use personal data or information about individuals for specific and lawful purposes. Individuals could include customers, employees, temporary and agency workers, contractors and suppliers.<br/>
                    1.2. We understand that your personal data is important to you, and we have a responsibility to you to ensure that the information we collect and use is done so proportionately, correctly and safely. This policy sets out how we comply with our data protection obligations.<br/><br/>
                    2 Our Details<br/>

                    2.1. Our registered office address is: Suite 5 3rd Floor, Sovereign House, 1 Albert Place, London, England, N31QB.<br/>
                    2.2. We are registered as a ‘data controller’ with the Information Commissioner’s Office (ICO). Our registration number is SC839400.<br/>
                    If you have any questions about how we process personal data, or would like to exercise your rights as a data subject, then please email us at flyclean@gmail.com. <br/>
                    3 Purpose of processing<br/><br/>

                    3.1. We collect, hold and use personal data received from you to match your request for domestic services with ‘Fly clean’, our third-party contractors. We will then share some of your personal details with designated eMoppers to enable them to carry out the service requested.<br/>
                    3.2. We will not ask you for any information which is not necessary for the particular service we are providing to you.<br/>
                    4 Definitions<br/><br/>

                    4.1. “Fly cleaner” our third-party contractors.<br/>
                    4.2. “GDPR” means the General Data Protection Regulation.<br/>
                    4.3. “ICO” means the Information Commissioners Office, the governing body for Data Protection in the UK.<br/>
                    4.4. “Personal data” means any information relating to a person who can be identified, directly or indirectly, from that information. This could include your name, your identification number, location data, online identifier (such as IP address) or to one or more factors specific to the physical, physiological, mental, economic, cultural or social identity of that person.<br/>
                    4.5. “Platform” means the eMop platform.<br/>
                    4.6. “Processing” means obtaining, recording, organising, storing, amending, retrieving, disclosing and/or destroying information, or using or doing anything with it.<br/>
                    5 Conditions of Processing<br/><br/>

                    5.1. When we process your personal data, we will do so in accordance with the data protection principles. These principles are designed to protect you, and ensure that we:<br/>
                    5.1.1. Process your information lawfully, fairly and in a transparent manner;<br/>
                    5.1.2. Use your information for a specified, explicit and legitimate purpose and not further process it in a manner that is incompatible with that purpose;<br/>
                    5.1.3. Only obtain adequate, relevant and limited information to allow us to carry out the purpose for which it was obtained;<br/>
                    5.1.4. Ensure the information we hold about you is accurate and, where necessary, kept up to date;<br/>
                    5.1.5. Keep any information for no longer than necessary for the purposes for which it was collected;<br/>
                    5.1.6. Process your information in a manner that ensures appropriate security of your personal data, including protection against unauthorised or unlawful processing and against accidental loss, destruction or damage, using appropriate technical or organisational measures.<br/>
                    6 Lawfulness of processing<br/><br/>

                    6.1. Paragraph 5.1 above stipulates that the processing of personal data shall be undertaken ‘lawfully’. To show the processing is being undertaken lawfully the we rely on the fact that the processing is necessary for the performance of a contract, or in anticipation of entering into a contract to provide the service requested.<br/>
                    6.2. Processing may also be necessary for the purposes of our legitimate interests, or with your consent. Where we require your consent to process your personal data we will set out exactly what it is you are consenting to, and how you can withdraw your consent at any stage.<br/>
                    6.3. Customer<br/>
                    6.3.1. If you are a customer, then the information that we collect from you relates to your request for professional services, such as – name, address, telephone, email address, billing information. We will also use your personal data for the purpose of support, accounting and follow-up assistance.<br/>
                    6.3.2. If a booking request is accepted, then we may need to transfer your aforementioned data and any other relevant data you may provide to your designated eMopper, for the purpose of fulfilling the contractual relationship for the provision of professional cleaning services.<br/>
                    6.3.3. Any ratings you leave for our eMoppers, and any reviews you post either voluntarily on our website, or where you have already made publicly available reviews on external review sites such as Google Review, may be used by us on our website to promote our services.<br/>
                    6.3.4. Advertising consent: If you have consented to receiving promotional offers from us, we process and use your personal data to understand your usage habits better and to contact you with informative information on additional services that might be of interest to you. You can withdraw your consent for promotional purposes at any time using the unsubscribe link available in every email.<br/>
                    6.3.5. We may also use your personal data for other purposes of legitimate interests in promoting and selling our services. Where we rely on legitimate interests it will be of minimum privacy impact.
                    6.4. Fly cleaner<br/>
                    6.4.1. if you are an Fly cleaner, then we will collect name, address, telephone, email address, billing information such as credit or debit card details, NI Number, ID such as passport and/or driving license, UK work eligibility confirmation and Disclosure and Barring Service information (DBS).<br/>
                    6.5. Third-Party payment provider<br/>
                    6.5.1. Payments for Fly cleaning services are collected via our external partner ‘Stripe Payments Europe Limited’ (Stripe). We hold no record of payment card details, and all financial details are processed directly by Stripe, via a link on our website.  Please visit Stripe’s privacy policy for details of how they process and protect your personal data. The website link is https://stripe.com/gb/privacy.<br/>
                    7 Retention<br/><br/>

                    7.1. We will only keep customer’s personal information for as long as is necessary to fulfil the purposes we collected it for, or because of a statutory obligation to retain the information, and unless there is an ongoing relationship, we will delete customer personal data after a period of 3 years.<br/>
                    7.2. We will retain eMopper’s personal data for a period of 3 years in accordance with legal, or statutory obligations, such as to meet HMRC requirements.<br/>
                    8 Security<br/><br/>

                    8.1. We will use appropriate technical and organisational measures to keep personal information secure, and in particular to protect against unauthorised or unlawful processing and against accidental loss, destruction or damage, and in accordance with the data protection legislation.<br/>
                    8.2. However, while we do our best to protect your personal information, we cannot guarantee, or be held responsible for the security of all data which is transmitted to our website or to another website via the internet or similar connection.<br/>
                    8.3 If you suspect any misuse or loss or unauthorised access to your personal information, please let us know immediately.<br/>
                    9 International transfers of your personal data<br/><br/>

                    9.1. We may transfer personal data to agents outside the EEA.  When we do, we ensure that your privacy remains protected and in accordance with GDPR requirements.<br/>
                    9.2. Where we use providers based in the US, we may transfer data to them if they are subscribers to the ‘Privacy Shield’, which requires them to provide similar protection to Personal Data shared between Europe and the US. We use the following providers who are based in the US who all subscribe to the Privacy Policy<br/>
                    9.2.1. Amazon AWS<br/>
                    9.2.2. Google<br/>
                    9.2.3. Stripe<br/>
                    10 Your rights<br/><br/>

                    10.1. You have certain rights in relation to the personal information we hold about you. These rights are as follows:<br/>
                    10.1.1. Right to be informed – you have a right to be told about how we use your personal data. We communicate the right to be informed via this privacy policy.<br/>
                    10.1.2. Right of access – you have the right to request a copy of the information that we hold about you. (This right is similar to a subject access request).<br/>
                    10.1.3. Right of rectification – you have a right to correct data that we hold about you that is inaccurate or incomplete.<br/>
                    10.1.4. Right to erasure (right to be forgotten) – in certain circumstances you can ask for the data we hold about you to be erased from our records.<br/>
                    10.1.5. Right to restrict processing – where certain conditions apply, you have a right to restrict the processing.<br/>
                    10.1.6. Right of data portability – in certain circumstances you have the right to have the data we hold about you transferred to another organisation.<br/>
                    10.1.7. Right to object – you may have the right to object to certain types of processing such as direct marketing.<br/>
                    10.2. Right to object to automated processing, including profiling.<br/>
                    11 How to exercise your rights<br/><br/>

                    11.1. You may exercise your rights by writing to us at the address above or by email. To avoid delay in dealing with your request, please ensure that you confirm in your request which right you wish to exercise.<br/>
                    11.2. We will respond to your request within 30 calendar days, by either providing you with the information requested, requesting further information from you, or requesting further time to complete your request. If for example the request is substantial, or we need to obtain information from various departments within our company or from one of our contractors.<br/>
                    11.3. We can also refuse your request. In the event that we refuse your request we will provide you with reasons, as well as your options at that stage.<br/><br/>
                    12 Cookies<br/><br/>

                    12.1. Cookies are small text files that are placed on your computer, smartphone, tablet or smart TV when you access a website. They are widely used in order to make websites work, or work more efficiently, by allowing the website to recognise your device and store information about past actions or preferences. An example could be internet banking, where your device may recognise and populate certain previously entered login details.<br/>
                    12.2. The eMop website uses cookies in order to provide a better service and experience to our customers and other website users.<br/>
                    12.3. There are two kinds of cookies:<br/>
                    12.3.1. session cookies which are short-term and auto-delete after a few minutes or when you close your browser;<br/>
                    12.3.2. persistent cookies – set by the website and stored for a longer period of time, usually used to store commonly entered information on forms (such as your name, address, and telephone number). They also store information about your browsing habits across multiple sites, usually used to allow advertisers and social network site operators to target advertising to you.<br/>
                    12.4. We use Google Analytics to analyse the use of our website and to help us to create a more easy to use site. The data collected is completely anonymous and does not store any personal details. The information is used to analyse how visitors make use of our website and allows us to gather statistical information such as website activity, visitor numbers, popular pages and customer journey through the website.<br/>
                    12.5. If you do not wish to allow the use of cookies on our website, you can block them using your browser preferences (for an example, by amending your cookie settings on google settings). Please see our Cookie Policy  for further information on what cookies we use.<br/>
                    12.5.1. You can find out more about cookies by visiting aboutcookies.org<br/>
                    13 Links to other websites<br/><br/>

                    13.1. The Fly cleaner website may contain links to other websites run by other organisations. This Privacy Policy applies only to the eMop website‚ so we encourage you to read the privacy statements on the other websites you visit via our site. We cannot be responsible for the privacy policies and practices of other sites, even if you access them using links from our website.<br/>
                    14 Amendments<br/><br/>

                    14.1. We will continually review and update this privacy notice to reflect changes in our services and feedback from service users, as well as to comply with changes in law. When such changes occur, we will revise the “last updated” date at the top of this notice.<br/>
                    15 Complaints<br/><br/>

                    15.1. If you wish to make a complaint about how we are processing your personal data, then in the first instance please contact our data protection officer/data protection lead at: emop@emop.world.<br/>
                    15.2. If you are still dissatisfied with how we have handled your complaint, then you have the right to complain to the Information Commissioners Office (ICO). The ICO can be contacted as follows:<br/>
                    The Information Commissioner<br/>
                    • Wycliffe House<br/>
                    • Water Lane<br/>
                    • Wilmslow<br/>
                    • Cheshire<br/>
                    • SK9 5AF<br/>
                </p>
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

export default Privacy