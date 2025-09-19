import LOGO from "../images/logo4.png";
import React, {useState, useEffect} from "react";
import api from "./api.js";
import Upholstery from "../images/upholstery2.png";
import Regular from "../images/regular.png";
import EndOfTenancy from "../images/endOfTenancy.png";
import LivingRoom from "../images/livingRoom.png";
import Deep from "../images/deep.png";
import Office from "../images/office.png";
import Day from "../images/day.png";
import Domestic from "../images/domestic.png";
import Rug from "../images/rug.png";
import Bathroom from "../images/bathroom.png";
import Kitchen from "../images/kitchen.png";
import Oven from "../images/oven.png";
import {FaPhone} from "react-icons/fa";

const Contact = () => {
    const services = [
        { id: 'select', icon: 'fa-home', title: 'Select service', description: 'Upholstery cleaning for surfaces', src: Upholstery },
        { id: 'complains', icon: 'fa-home', title: 'Complains', description: 'Upholstery cleaning for surfaces', src: Upholstery },
        { id: 'Upholstery ', icon: 'fa-home', title: 'Upholstery cleaning', description: 'Upholstery cleaning for surfaces', src: Upholstery },
        { id: 'Regulqr', icon: 'fa-home', title: 'Regular cleaning', description: 'Regular cleaning for your home', src: Regular },
        { id: 'End of tenancy', icon: 'fa-couch', title: 'End of tenancy', description: 'Thorough cleaning to get your deposit back', src: EndOfTenancy },
        { id: 'Carpet', icon: 'fa-rug', title: 'Carpet cleaning', description: 'Professional deep cleaning for carpets', src: LivingRoom },
        { id: 'Deep', icon: 'fa-broom', title: 'Deep cleaning', description: 'Intensive cleaning for neglected spaces', src: Deep },
        { id: 'Office', icon: 'fa-home', title: 'Office cleaning', description: 'Detailed cleaning for office space', src: Office },
        { id: 'Same day', icon: 'fa-home', title: 'Same day cleaning', description: 'Quickly get your home in order as quickly as possible', src: Day},
        { id: 'Move in', icon: 'fa-home', title: 'Move in  cleaning', description: 'We will get your new home ready for habitaion', src: Domestic},
        { id: 'Rug', icon: 'fa-home', title: 'Rug cleaning', description: 'Professional deep cleaning for rugs', src: Rug },
        { id: 'Bathroom', icon: 'fa-home', title: 'Bathroom cleaning', description: 'We provide deep cleaning for bathrooms', src: Bathroom },
        { id: 'Kitchen deep', icon: 'fa-home', title: 'Kitchen deep', description: 'Professional deep kitchen cleaning', src: Kitchen },
        { id: 'Oven', icon: 'fa-building', title: 'Oven', description: 'Oven cleaning services', src: Oven},
    ];

    const [name, setName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [service, setService] = useState('');
    const [contactMessage, setContactMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [number, setNumber] = useState('+447362587018');

    function CallButton({ phoneNumber}) {
        return (
            <div style={{width:'30px', marginRight:'10px'}}>
                <p>
                    <a href={`tel:${phoneNumber}`} style={{ color: "blue" }}>
                        <FaPhone size={20}/>
                    </a>
                </p>
            </div>
        );
    }

    useEffect(() => {
        document.title = 'Contact';
    })

    useEffect(() => {
        if (response !== null) {
            setTimeout(() => {setResponse(null)}, 4000)
        }
    }, [response]);

    const handleServiceChange = (e) => {
        const value = e.target.value;
        const newErrors = {};
        if (value === 'Select service') {
            newErrors.service = "select service";
            setService('');
            setErrors(newErrors);
            alert(value)
            return;

        }
        setService(value);

    }

    const sendMessage  = async (e) => {
        e.preventDefault();
        const newErrors = {}
        if (!contactEmail) newErrors.contactemail = 'Email address required';
        if (!phone) newErrors.phone = 'Phone number required';
        if (!name) newErrors.name = 'Name required';
        if (!service || service === 'Select service') newErrors.service = 'Select service required';
        if (!contactMessage) newErrors.contactMessage = 'Write a message';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setLoading(true);

        const data = { email: contactEmail, customer: name, service: service, phone: phone, message: contactMessage}
        try {
            const response = await api.post('/api/send-email-to-fly-cleaner', data);
            const message = response.data.message;
            const success = response.data.success;
            setResponse(message);
            if (success) {
                setContactEmail('');
                setPhone('');
                setService('');
                setContactMessage('');
                setName('');
                setErrors(null);
            }
        } catch (error) {
            setErrors(errors);
            setResponse('Error occured');
        }finally {
            setLoading(false);
        }
    }


  return (
      <div className={['support-page', 'main-banner'].join(' ')} style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
      }}>
          <div style={{display: 'flex', alignItems: 'center', marginLeft:'10px'}}>
              <img  src={LOGO} alt={''} className={'logo-icon'}/>
              <h1 className="page-title" style={{marginLeft:'10px', width:'40%'}}>Contact Us </h1>
              <CallButton phoneNumber={number} />
          </div>
          <section className="main-banner">
              <div className="container">
                  <div className="burden-container">
                      <div className="contact-form">
                          <h3>Send Us a Message</h3>
                          <form onSubmit={sendMessage}>
                              <div className="form-row">
                                  <div className="form-group">
                                      <label htmlFor="name">Full Name</label>
                                      <input
                                          type="text"
                                          id="name"
                                          name="name"
                                          value={name}
                                          className="button-bg"
                                          onChange={(e) => setName(e.target.value)}
                                          required
                                      />
                                      {name.errors && <label>{name.errors}</label>}
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="email">Email Address</label>
                                      <input
                                          type="email"
                                          id="email"
                                          name="contactEmail"
                                          value={contactEmail}
                                          className="button-bg"
                                          onChange={(e) => setContactEmail(e.target.value)}
                                          required
                                      />
                                      {contactEmail.errors && <label className="error-message">{contactEmail.errors}</label>}
                                  </div>
                              </div>
                              <div className="form-row">
                                  <div className="form-group">
                                      <label htmlFor="phone">Phone Number</label>
                                      <input
                                          type="tel"
                                          id="phone"
                                          name="phone"
                                          value={phone}
                                          className="button-bg"
                                          onChange={(e) => setPhone(e.target.value)}
                                          required
                                      />
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="service">Service Needed</label>
                                      <select
                                          id="service"
                                          name="service"
                                          value={service}
                                          className="button-bg"
                                          onChange={handleServiceChange}>
                                          {services.map(plan => (
                                              <option key={plan.id} value={plan.title}>{plan.title}</option>
                                          ))}
                                      </select>
                                      {service.errors && <label>{service.errors}</label>}
                                  </div>
                              </div>
                              <div className="form-group">
                                  <label htmlFor="message">Your Message</label>
                                  <textarea
                                      id="message"
                                      name="message"
                                      value={contactMessage}
                                      className="button-bg"
                                      onChange={(e) => setContactMessage(e.target.value)}
                                  ></textarea>
                                  {contactMessage.errors && <label className="error-message">{contactMessage.errors}</label>}
                              </div>
                              {response && <p style={{margin:'10px'}}>{response}</p>}
                              {loading && <p style={{margin:'10px'}}>sending email...</p>}
                              <button type="submit" className="submit-button">Send Email</button>
                          </form>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  );
}
export default Contact;