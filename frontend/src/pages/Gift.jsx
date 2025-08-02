import  React, {useState, useRef} from 'react'
import Footer from "./Footer.jsx";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom'

const Gift = () => {
    const [voucherAmount, setVoucherAmount] = useState(50);

    const [recipientFirstName, setRecipientFirstName] = useState('');
    const [recipientLastName, setRecipientLastName] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [recipientNumber, setRecipientNumber] = useState(null);

    const [senderFirstName, setSenderFirstName] = useState('');
    const [senderLastName, setSenderLastName] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [senderNumber, setSenderNumber] = useState(null);

    const [consent, setConsent] = useState(false);
    const [message, setMessage] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    const handleAmountChange = (amount) => {
        setVoucherAmount(amount);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    if (orderComplete) {
        return (
            <div className="order-complete">
                <h2>Thank You for Your Order!</h2>
                <p>Your gift voucher has been processed successfully.</p>
                <p>A confirmation has been sent to your email address.</p>
                <button onClick={() => setOrderComplete(false)}>Order Another Voucher</button>
            </div>
        );
    }


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures it takes at least full viewport height
        }}>
            <header className="voucher-header" style={{marginTop: '2rem', color: 'navy'}}>
                <h1>Gift Vouchers</h1>
                <p>The perfect gift for any occasion</p>
            </header>

            <section>
                <div className="container" style={{maxWidth:'1200px', marginTop:'30px', marginBottom:'30px'}}>
                    <form onSubmit={handleSubmit}>

                        <div className="container" style={{ maxWidth:'1200px'}} >
                            <div className="idea-container" >
                                <div className="voucher-image-section">
                                    <div className="voucher-preview">
                                        <div className="voucher-design">
                                            <div className="voucher-logo">FLY CLEANER</div>
                                            <div className="voucher-value">£{voucherAmount}</div>
                                            <div className="voucher-message-preview">
                                                <p>Total amount</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group amount-selection">
                                    <label>Select Amount (£)</label>
                                    <div className="amount-options">
                                        {[10, 25, 50, 100].map((amount) => (
                                            <button
                                                key={amount}
                                                type="button"
                                                className={`amount-btn ${voucherAmount === amount ? 'active' : 'not-active'}`}
                                                onClick={() => handleAmountChange(amount)}
                                            >
                                                £{amount}
                                            </button>
                                        ))}

                                        <div style={{display: 'flex', justifyContent: 'end', marginRight:'20px'}}>
                                            <MdKeyboardArrowUp style={{ cursor: 'pointer', width: '30px', height: '30px' }} onClick={() => {setVoucherAmount(voucherAmount+1)}} />

                                            <MdKeyboardArrowDown style={{ cursor: 'pointer', width: '30px', height: '30px' }}
                                                                 onClick={voucherAmount > 0 ? () => {setVoucherAmount(voucherAmount - 1)} :() => {setVoucherAmount(0)} } />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container" style={{width:'100%', maxWidth:'1200px'}}>
                            <div className="idea-container">
                                <div>
                                    <h3 style={{color:'navy', textAlign:'center', marginBottom:'10px'}}>Sender</h3>
                                    <div className="price-container">
                                        <div className="form-group">
                                            <label htmlFor="recipientName">First Name</label>
                                            <input
                                                type="text"
                                                id="recipientName"
                                                value={senderFirstName}
                                                onChange={(e) => setSenderFirstName(e.target.value)}
                                                required
                                                className={'button-bg'}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="recipientName">Last Name</label>
                                            <input
                                                type="text"
                                                id="recipientName"
                                                value={senderLastName}
                                                onChange={(e) => setSenderLastName(e.target.value)}
                                                required
                                                className={'button-bg'}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="recipientEmail">Email</label>
                                            <input
                                                type="email"
                                                id="recipientEmail"
                                                value={senderEmail}
                                                onChange={(e) => setSenderEmail(e.target.value)}
                                                required
                                                className={'button-bg'}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="recipientEmail">Number</label>
                                            <input
                                                type="number"
                                                id="recipientEmail"
                                                value={senderNumber}
                                                onChange={(e) => setSenderNumber(e.target.value)}
                                                required
                                                className={'button-bg'}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 style={{color:'navy', textAlign:'center', marginBottom:'10px'}}>Reciepient</h3>
                                    <div className="price-container">
                                        <div className="form-group">
                                            <label htmlFor="recipientName">First Name</label>
                                            <input
                                                type="text"
                                                id="recipientName"
                                                value={recipientFirstName}
                                                onChange={(e) => setRecipientFirstName(e.target.value)}
                                                required
                                                className={'button-bg'}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="recipientName">Last Name</label>
                                            <input
                                                type="text"
                                                id="recipientLastName"
                                                value={recipientLastName}
                                                onChange={(e) => setRecipientLastName(e.target.value)}
                                                required
                                                className={'button-bg'}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="recipientEmail">Email</label>
                                            <input
                                                type="email"
                                                id="recipientEmail"
                                                value={recipientEmail}
                                                onChange={(e) => setRecipientEmail(e.target.value)}
                                                required
                                                className={'button-bg'}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="recipientEmail">Number(Optional)</label>
                                            <input
                                                type="number"
                                                id="recipientNumber"
                                                value={recipientNumber}
                                                onChange={(e) => setRecipientNumber(e.target.value)}
                                                required
                                                className={'button-bg'}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className="form-group" style={{marginTop:'20px'}}>
                            <label htmlFor="message">Personal Message (Optional)</label>
                            <textarea
                                id="message"
                                rows="4"
                                value={message}
                                className={'button-bg'}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>

                        <div className={'idea-container'} style={{marginBottom:'20px'}}>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="deliveryDate" style={{display:'none'}}>Delivery Date</label>
                                    <input
                                        type="date"
                                        id="deliveryDate"
                                        value={deliveryDate}
                                        onChange={(e) => setDeliveryDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        style={{ display: 'none' }}
                                    />
                                </div>

                                <div className="order-summary">
                                    <div className="summary-row">
                                        <span>Gift Voucher Amount</span>
                                        <span>£{voucherAmount}</span>
                                    </div>
                                    <div className="summary-row total">
                                        <span>Total</span>
                                        <span>£{voucherAmount}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <input
                                    type={'checkbox'}
                                    value={consent}
                                    placeholder={'Consent'}
                                    onChange={(e) => setConsent(e.target.checked)}
                                    required={true}
                                />

                            <p style={{marginLeft:'10px'}}>
                                I accept <Link to={'/terms'} target="_blank" rel="noopener noreferrer"
                                              style={{color: 'blue'}}>terns & conditions</Link>
                            </p>
                        </div>
                </div>

                <button type="submit" className="checkout-btn" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Purchase Voucher'}
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    );
}
export default Gift;
