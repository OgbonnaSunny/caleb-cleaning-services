import React, {useEffect, useState,  useRef} from "react";
import { Link, useNavigate } from "react-router-dom"
import Footer from "./Footer";
import Sweeping from "../images/sweeping.png";
import Arranged from "../images/arranged.png";
import { FaArrowLeft, FaArrowRight  } from 'react-icons/fa';
import {checkPostcodeExists, isValidUKPostcodeFormat} from "./Postcode.jsx";

const Reclean = () => {
  const navigate = useNavigate();

  const [showQ1, setShowQ1] = useState(false);
  const [showQ2, setShowQ2] = useState(false);
  const [showQ3, setShowQ3] = useState(false);
  const [postcode, setPostcode] = useState('');
  const [error, setError] = useState('');
  const [clearText, setClearText] = useState({display:''});

  const showQs = {display:'', textAlign:'start'};
  const hideQs = {display:'none', textAlign:'start'};

  const handleSubmit = (e) => {
    e.preventDefault();
    setClearText({display: ''})
    if (!postcode.trim()) {
      setError('Please enter a postcode');
      return;
    }
    if (!isValidUKPostcodeFormat(postcode)) {
      setError(`${postcode} is not a valid postcode`);
      return;
    }
    checkPostcodeExists(postcode).then(exists => {
      if (!exists) {
        setError(`${postcode} does not exist`);
        return;
      }
    })

    navigate('/checkout', { state: { postcode: postcode } });
  };

  useEffect(() => {
    setTimeout(() => setClearText({display: 'none'}), 4000)
  }, [error])


  return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh' // Ensures it takes at least full viewport height
      }}>
        {error && <label style={clearText} className={['slide-in', 'error-label'].join(' ')} >{error}</label>}
        <div className={"section-container"}>
          <section style={{marginTop:'50px', marginBottom:'10px'}}>
            <div className={'container'} style={{maxWidth:'1200px'}}>
              <h1 className={'help-text'} style={{color:'navy'}}>Unhappy with your clean? Reclean Guarantee</h1>
              <p style={{width:'100%'}}>We care about the quality of our services and offer the Reclean Guarantee to our customers.
                Compensation can be provided in the form of a reclean, credit to your account, complimentary future clean or free additional addons.</p>
            </div>
          </section>

          <section className={['main-banner', 'container'].join(' ')} style={{marginTop:'50px', marginBottom:'30px'}}>
            <div className={'main-banner'} style={{display:'block'}} >

              <div style={{display:'flex', justifyContent:'center'}}>
                < FaArrowLeft style={{color:'black', width:'30px', marginTop:'24px', marginBottom:'30px'}}
                              className={showQ1 ? 'rotate-down': 'rotate-up'}
                              onClick={() => { setShowQ1(!showQ1) }}/>
                <div style={{display:'block', paddingLeft:'10px', paddingRight:'10px', marginTop:'20px'}}>
                  <h4 style={{textAlign:'start'}}>What is included in Fly cleaning service?</h4>
                  <p style={showQ1 ? showQs: hideQs}>
                    You can review what is included in the cleaning <Link to={'/services'} style={{color:'blue'}}>here</Link></p>
                </div>
              </div>

              <div style={{display:'flex', justifyContent:'center'}}>
                < FaArrowLeft style={{color:'black', width:'30px', marginTop:'24px', marginBottom:'30px'}}
                              className={showQ2 ? 'rotate-down': 'rotate-up'}
                              onClick={() => { setShowQ2(!showQ2) }}/>
                <div style={{display:'block', paddingLeft:'10px', paddingRight:'10px', marginTop:'20px'}}>
                  <h4 style={{textAlign:'start'}}>How to book a reclean?</h4>
                  <p style={showQ2 ? showQs: hideQs}>
                    Please email us or get in touch via live chat feature on our website within 48 hours of the
                    cleaning being completed with a full description of the issues together with any supporting evidence.
                    Our support team will review your email and get in touch with you ASAP.</p>
                </div>
              </div>

              <div style={{display:'flex', justifyContent:'center'}}>
                < FaArrowLeft style={{color:'black', width:'30px', marginTop:'24px', marginBottom:'30px'}}
                              className={showQ3 ? 'rotate-down': 'rotate-up'}
                              onClick={() => { setShowQ3(!showQ3) }}/>
                <div style={{display:'block', paddingLeft:'10px', paddingRight:'10px', marginTop:'20px'}}>
                  <h4 style={{textAlign:'start'}}>What is Fly complaint procedure?</h4>
                  <p style={showQ3 ? showQs: hideQs}>
                    Please read more about Fly cleaner complaints procedure <Link to={'/help'} style={{color:'blue'}}>here</Link></p>
                </div>
              </div>
            </div>
          </section>

          <section className={'main-banner'} style={{marginTop:'50px'}}>
            <div className={"container"} style={{maxWidth:'800px'}}>
              <div className={'price-container'}>
                <h2 style={{color:'navy'}}>Book cleaning service</h2>
                <p>
                  Our standard cleaning service includes everything you need to get your home in order as quickly as possible.
                  You can book additional services when you make your booking.</p>
              </div>
            </div>

          </section>

          <section className={'main-banner'} style={{marginTop:'50px', marginBottom:'30px'}}>
            <div className="container">
              <div className="burden-container">
                <img src={Sweeping} className={'cart-image4'} alt="" />
                <div className="search-container">
                  <h1 className={'burden'}>Shift your cleaning burden to us</h1>
                  <input
                      type="text" placeholder="Enter your full post code here"
                      style={{textAlign:'center'}}
                      onChange={(e) => setPostcode(e.target.value)}/>
                  <button onClick={handleSubmit} className={'next-button'} style={{textAlign:'center', margin:'10px'}}>Get a quote</button>
                </div>
                <img src={Arranged} className={'cart-image4'} alt="" />
              </div>
            </div>

          </section>

          < Footer />
        </div>

      </div>
  );
}
export default Reclean;