import React, { useState, useEffect} from "react";
import Footer from './Footer.jsx'
import LOGO from "../images/logo4.png";
import {Link, useLocation } from 'react-router-dom'

const Terms = () => {
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
    const location = useLocation();

    useEffect(() => {
        document.title = "Terms & Conditions";
    })

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures it takes at least full viewport height
        }}>
            <div className={['container', 'main-banner'].join(' ')} style={{display:'flex', flexDirection: 'row', marginTop:'20px', marginBottom:'30px', maxWidth:'1200px'}}>
                <img src={LOGO} className={'logo-container'}/>
                <h1 className={'help-text'} style={{textAlign:'start', color:'navy'}}>Terms and Conditions</h1>
            </div>
            <section className={["container", "main-banner"].join(" ")} style={{maxWidth:'1200px'}} >
                <div className="container">
                    <p>
                        1. ABOUT US <br/><br/>

                        1.1. Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following Website Terms and Conditions of use, which together with our Booking Terms and Conditions and Privacy Policy govern eMop’s relationship with you. If you disagree with any part of these terms and conditions, please do not use our website.<br/><br/>

                        1.2. These are the terms and conditions on which we, Flymax Ltd,  supply our services to you (“Customer”), via our website, our App and the Fly cleaner Platform (collectively referred to throughout these Terms and Conditions as “Website”).<br/><br/>

                        1.3. If you are a customer, then these Website Terms and Conditions MUST be read in conjunction with our Booking Terms and Conditions.<br/><br/>

                        1.4. Our registered office is: 11-13 Bayley street, London, WC1B3HD. Our company registration number is SC839400.<br/><br/>

                        What we do<br/><br/>
                        1.5. Fly provides an online platform to facilitate the introduction of self-employed domestic cleaners (“Fly cleaners”) and customers who require domestic cleaning.<br/><br/>

                        2. PRIVACY<br/><br/>

                        2.1. When you use our website, you will be providing us with personal data about you. You can see how we use the personal data by going to our Privacy Policy.<br/><br/>

                        2.3. This website uses cookies to monitor browsing preferences. If you do not wish for cookies to be used, then please disable cookies in your browser. (Please see our Cookie Policy for details on how to disable cookies on your browser.)<br/><br/>

                        3. YOUR ACCOUNT AND PASSWORD<br/><br/>

                        3.1. When you register on our website you will be asked to create your user credentials. (“User”) You are responsible for all use of our website associated with your User details.<br/><br/>

                        3.2. You agree to keep your User details secret. We may disable any User, at any time, if in our reasonable opinion they have failed to comply with any of the provisions of these terms of use.<br/><br/>

                        3.3. If you believe or suspect that your User login details have been compromised, please notify us at: emop@emop.world and update your user credentials immediately.<br/><br/>

                        4. ACCESSING OUR WEBSITE<br/><br/>

                        4.1. We do not guarantee that our website will always be available or will be uninterrupted or error free.<br/><br/>

                        4.2. We will not be held responsible if for any reason our website is unavailable to you.<br/><br/>

                        5. CHANGES TO OUR WEBSITE<br/><br/>

                        5.1. We may update, change, suspend or withdraw our website, in whole or part, at any time for our own business reasons. We will try and give you reasonable notice of any suspension or withdrawal.<br/><br/>

                        6. UPLOADING CONTENT TO OUR WEBSITE<br/><br/>

                        6.1. We also have the right to disclose your identity to any third party who is claiming that any content posted or uploaded by you to our website constitutes a violation of their intellectual property rights, or of their right to privacy.<br/><br/>

                        6.2. We will not be liable to any third-party for the content or accuracy of any content posted by you or any other user of our website.<br/><br/>

                        6.3. We have the right to remove any content you place on our website if, in our opinion, it does not comply with our content standards.<br/><br/>

                        6.4. The views expressed by other users on our website do not represent our views or values.<br/><br/>

                        7. INTELLECTUAL PROPERTY RIGHTS<br/><br/>

                        7.1. We are the owner or the licensee of all intellectual property rights on the website, being any and all rights under patent law, copyright law, trade secret law, trademark law, and any and all other proprietary rights.<br/><br/>

                        7.2. We expressly reserve all intellectual property rights on our website, app and platform, including the eMop domain name and all related domains and sub-domains, the name “eMop”, our logo device, service marks, trading names and/or trademarks. Other trademarks and product/company names mentioned on eMop platform may be trademarks of their respective owners or licensors and the rights in such marks are reserved to them.<br/><br/>

                        7.3. Any content you upload to our website will be considered non-confidential and non-proprietary, and we have the right to use, copy, distribute and disclose to third parties any such content for any purpose. You grant us a worldwide, non-exclusive, irrevocable, perpetual, royalty-free license to reproduce, adapt, distribute and publish such uploaded content.<br/><br/>

                        7.4. You may not extract and/or re-utilise parts of the content of our website, app or platform without our express written permission. You may also not create and/or publish your own database that features substantial parts of our website, app or platform without our express written permission.<br/><br/>

                        7.5. Subject to your compliance with these terms we grant you a limited, non-exclusive, non-transferable, non-sublicensable licence to access and make use of our website. This licence does not include any resale or commercial use of our website.<br/><br/>

                        7.6. All rights not expressly granted to you in these terms are reserved and retained by us or our licensors, suppliers or other content providers.<br/><br/>

                        8. NO WARRANTIES<br/><br/>

                        8.1. Although we make reasonable efforts to update the information on our website, we make no representations, warranties or guarantees, whether express or implied, that the content on our website is accurate, complete or up-to-date.<br/><br/>

                        8.2. Your use of any information or materials on our website is therefore entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any services or information available through this website meets your specific requirements.<br/><br/>

                        9. LIMITATION OF LIABILITY<br/><br/>

                        9.1. Nothing in these terms excludes or limits our liability for death or personal injury arising from our negligence, or our fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited by English law.<br/><br/>

                        9.2. To the extent permitted by law, we exclude all conditions, warranties, representations or other terms which may apply to our website, whether express or implied.<br/><br/>

                        9.3. The service which you book via our website, is the responsibility of the eMopper who provides it. We are not responsible or liable to you for the actual service provided by the eMopper to the fullest extent permissible by law.<br/><br/>

                        9.4. We will not be liable to any user for any loss or damage, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, even if foreseeable, arising under or in connection with use of, or inability to use, our website; or use of or reliance on any content displayed on our website.<br/><br/>

                        9.5. Please note that in particular, we will not be liable for loss of profits, sales, business, or revenue; business interruption or loss or damage to computers, devices or any software or data; loss of anticipated savings; loss of business opportunity, goodwill or reputation. Nor will we be liable for any indirect or consequential loss or damage.<br/><br/>

                        9.6. We will not be liable for any loss or damage caused by a virus distributed denial-of-service attack, or other technologically harmful material that may infect your computer equipment, computer programs, data or other proprietary material due to your use of our website or to your downloading of any content on it, or on any website linked to it.<br/><br/>

                        9.7. We assume no responsibility for the content of websites linked on our website. Such links should not be interpreted as endorsement by us of those linked websites. We will not be liable for any loss or damage that may arise from your use of them.<br/><br/>

                        9.8. The content of the pages on our website is for your general information and use only.<br/><br/>

                        10. INDEMNITY<br/><br/>

                        10.1. You will protect, indemnify, defend and hold harmless eMop, our directors, employees, agents, eMoppers, partners, from any third-party claim or demand, including reasonable lawyers’ fees, relating to or arising from: (a) your uploading any content to our website; (b) your use of our website and activities and behaviours occurring during such use of our website; (c) any violation by you of these terms; or (d) your violation of any third-party rights. This obligation will survive the termination of these terms and your use of our website.<br/><br/>

                        11. LINKING TO OUR WEBSITE<br/><br/>

                        11.1. You may link to any page of the website, for non-commercial purposes and provided that:<br/><br/>

                        11.1.1. you do so in a way that is fair and legal and which does not damage or take unfair advantage of our reputation;<br/><br/>

                        11.1.2. any link does not contain or associate our website with any pornographic or illegal material, or any material that is offensive, harassing, or otherwise objectionable;<br/><br/>

                        11.1.3. you do not do so in a way that suggests any form of association, approval or endorsement on our part where none exists; and/or<br/><br/>

                        11.1.4. you do not do so in a way that removes or obscures by framing or otherwise advertisements or copyright or other proprietary notices contained on the website.<br/><br/>

                        11.2. We reserve the right to withdraw linking permission at any time without notice. If you would like to link to our website for commercial purposes, or other than provided above, please contact us: emop@emop.world.<br/><br/>

                        12. THIRD-PARTY LINKS<br/><br/>

                        12.1. Our website may contain links to third-party websites. If you decide to visit any third-party websites, you do so at your own risk. We are not responsible or liable for the content, accuracy or opinions expressed in such websites or the standard of goods and/or services available through or on such websites. Unless expressly stated otherwise, links do not mean that we are, or the website is, affiliated or associated with such third-party sites.<br/><br/>

                        13. SUBMISSION AREAS<br/><br/>

                        13.1. Our website has some areas where you may communicate with other users or us, such as blogs, message boards, and leaving reviews. Any material which is posted on the website (“User Content”) through your Account will be attributed to you, and you are personally responsible for it.<br/><br/>

                        13.2. Some Submission Area content is available to the public, and, in the interests of data protection, we recommend that you anonymise your personal information on any publicly viewable areas. eMop will not be responsible for any information or materials posted on such public areas.<br/><br/>

                        13.3. We reserve the right to refuse to publish any User Content or to remove or suspend access to such User Content if it does not comply with these Website Terms and Conditions, including the ‘Acceptable Content’ listed below at Section 14. We will not be responsible for any loss or damages arising from our decision to exercise our rights under this clause.<br/><br/>

                        13.4. Views and opinions expressed in any User Content are those of the individual submitting that content. They are not our views and opinions and we do not accept responsibility for them. However, if you find any User Content on the website that you consider is in breach of the Acceptable Content section below, please notify us by email: emop@emop.world using the subject heading “Unacceptable Content”, setting out details of the User Content and where it can be found, and we will investigate the matter.<br/><br/>

                        13.5. If you do not comply with the Acceptable Content contained at Section14, or if any of your User Content causes us concern, we reserve the right to pass on that User Content to the relevant authorities.

                        13.6. If a third-party claims that your User Content infringes their rights, we will remove the content, and reserve the content in accordance with any claim or legal obligations we have.<br/>

                        14. ACCEPTABLE CONTENT <br/>

                        14.1. You represent and warrant that your User account:<br/><br/>

                        i. does not contain or condone sexually explicit material or violence, or condone discrimination based on race, sex, religion, nationality, disability, sexual orientation or age;<br/><br/>

                        ii. is not threatening, abusive or intimidating, or provided with an intent to harass any other person;<br/><br/>

                        iii. does not infringe anyone else’s rights, including any intellectual property rights or right of confidentiality or privacy. In particular, Users should not submit content which is protected by copyright, trademark, patent, trade secret, moral right, or any other proprietary right without the express consent of the owner of the respective right;<br/><br/>

                        iv. complies with all applicable laws;<br/><br/>

                        v. does not contain any material which is defamatory, invades the privacy of any person, is obscene, offensive, or hate speech;<br/><br/>

                        vi. does not breach any legal duty you owe to a third-party, such as a contractual duty or a duty of confidence;<br/><br/>

                        vii. is accurate and representative of your genuinely-held opinion where it states opinions – for example, in reviews;<br/><br/>

                        viii. does not misrepresent your identity or affiliation with any person, or falsely gives the impression that such content comes from someone else;<br/><br/>

                        ix. does not contain any unsolicited or unauthorised advertising, promotional materials, junk mail, spam, chain letters, pyramid schemes or other forms of solicitation or advertisement commercial or otherwise;<br/><br/>

                        x. does not advocate, promote or assist any unlawful act (e.g., criminal acts, copyright infringement, computer misuse, etc.); and<br/><br/>

                        xi. does not feature any individual who has not expressly consented to his or her image and/or voice is featured on our website, nor any individual under the age of 18 without the consent of that individual’s parent or guardian;<br/><br/>

                        xii. and you agree that you are responsible for any loss or damage we may suffer as a result of your breach of this warranty.<br/><br/>

                        15. VIRUSES<br/><br/>

                        15.1. We do not guarantee that our website will be secure or free from viruses. You are responsible for ensuring your own virus protection measures and should ensure that you have up to date anti-virus software on any device from which you access our website.<br/><br/>

                        15.2. You must not misuse our website by knowingly introducing viruses, trojans, worms, logic bombs or other material which is malicious or technologically harmful.<br/><br/>

                        15.3. You must not attempt to gain unauthorised access to our website, the server on which our website is stored, or any server, computer or database connected to our website.<br/><br/>

                        15.4. You must not attack our website via a denial-of-service attack or a distributed denial-of service attack. By breaching this provision, you would commit a criminal offence under the Computer Misuse Act 1990. We will report any such breach to the relevant law enforcement authorities and we will co-operate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use our website will end immediately.<br/><br/>

                        16. TERMINATION<br/><br/>

                        16.1. If you do not comply with these terms we may suspend or end your right to use of our website until you comply. If it is not possible for you to comply, we may end your use of our website completely.<br/><br/>

                        17. CHANGES TO THESE TERMS AND CONDITIONS<br/><br/>

                        17.1. We may revise these Website Terms and Conditions of use at any time by amending this page.<br/><br/>

                        18. GENERAL<br/><br/>

                        18.1. If any of the terms and conditions are found to be illegal, invalid or unenforceable, the rest of these terms and conditions shall remain in full force and effect.<br/><br/>

                        18.2. Only eMop and you shall be entitled to enforce these terms. No third-party shall be entitled to enforce any of these terms and conditions.<br/><br/>

                        18.3. These terms and conditions set out the entire agreement between you and Fly cleaner with respect to your use of the website and supersede any and all representations, communications and prior agreements (written or oral) made by you or eMop in relation to your use of our website.<br/><br/>
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
export default Terms;