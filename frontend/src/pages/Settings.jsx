// components/Settings.js
import React, { useState, useEffect } from 'react';
import {
    FaSave,
    FaCog,
    FaUserCog,
    FaShieldAlt,
    FaBell,
    FaCreditCard,
    FaInfoCircle,
    FaBars,
    FaUserTie,
    FaUser,
    FaTimes,
    FaPen, FaPencilAlt, FaPlus
} from 'react-icons/fa';
import api from './api.js'
import LOGO from "../images/logo4.png";
import {subscribeUser} from "./notification.js";
import customer from "./Customer.jsx";

const Settings = () => {
    const mainAdmin = import.meta.env.VITE_COMPANY_EMAIL

    const [activeTab, setActiveTab] = useState('general');
    const [formData, setFormData] = useState({
        companyName: 'Fly Cleaner',
        contactEmail: 'flyclean02@gmail.com',
        contactPhone: '+44 73 6258 7018',
        address: 'Edinburgh',
        workingHours: 'Mon-Fri: 8:00 AM - 6:00 PM',
        notificationEnabled: true,
        notificationEmail: true,
        notificationSMS: false,
        paymentEnabled: true,
        paymentMethods: ['card', 'bank'],
        taxRate: 20,
        cancellationPolicy: '24 hours notice required for cancellations'
    });
    const [admin, setAdmin] = useState([]);
    const [ceo, setCeo] = useState('CEO');
    const [superAdmin, setSuperAdmin] = useState(mainAdmin);
    const [currentUser, setCurrentUser] = useState(null);
    const [role, setRole] = useState('Support');
    const [addAdmin, setAddAdmin] = useState(false);
    const [id, setId] = useState(null);
    const [readOnly, setReadOnly] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [changes, setChanges] = useState(false);
    const [emailNotify, setEmailNotify] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [support, setSupport] = useState(true);
    const [enabled, setEnabled] = useState(JSON.parse(localStorage.getItem("notifications")) || false);
    const [reminder, setReminder] = useState(false);
    const [alert, setAlert] = useState(false);
    const [sms, setSms] = useState(false);


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (role === 'CEO') {
            setChanges(true);
        }
    };

    const renderName = (name) => {
        const names = name.split(' ');
        if (names.length > 1) {
            let nameHolder = ''
            for (let i = 0; i < names.length; i++) {
                const newName =  names[i].charAt(0).toUpperCase() + names[i].slice(1) + " ";
                nameHolder += newName + "";
            }
            return nameHolder;
        }
        return name.toString().charAt(0).toUpperCase() + name.slice(1);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        api.post('/api/info', {info: JSON.stringify(formData)})
            .then(res => {
                setMessage(res.data.message);
            })
            .catch(err => {
                console.log(err);
                setMessage("Error occured");
            })
            .finally(() => {
            setLoading(false);
            setChanges(false);
        })

    };

    useEffect(() => {
        if (!("Notification" in window)) {
            setSupport(false);
        }
    }, []);

    const handleNotify = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        let send = 1;
        const check = e.target.checked;

        try {
            const subscribe = await subscribeUser(currentUser, check);
            localStorage.setItem("notifications", JSON.stringify(subscribe));
            setEnabled(subscribe);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        const data = {
            jobAlert: alert,
            reminder: reminder,
            rating: false,
            sms: false,
            email: currentUser
        };

        try {
            const  response = await api.post('/api/notify-update', data);
            const { success } = response.data;
            if (success) {
                setMessage('Profile updated successfully');
            }
            else {
                setMessage('Profile update not successful');
            }
        } catch (error) {
            console.error(error.response.data);
            setMessage('Profile update failed');
        } finally {
            setIsLoading(false);
        }

    };

    useEffect(() => {
        if (currentUser === null || currentUser === undefined) return;
        api.post('/api/users/admin', {email: currentUser})
        .then((res) => {
            const admin = res.data.admin;
            const role = res.data.role;
            setAdmin(admin);
            setRole(role)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [currentUser])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const userEmail = user.email;
            setCurrentUser(userEmail);
        }
    }, []);

    useEffect(() => {
        api.get('/api/admin/ceo').then((res) => {
            const ceo = res.data.ceo;
            if (ceo) {
                const name = renderName(ceo[0].firstName) + " " + renderName(ceo[0].lastName);
                setCeo(name);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    })

    useEffect(() => {
        document.title = "Setting";
    }, []);

    useEffect(() => {
        api.get('/api/info/record')
            .then((res) => {
                const info = res.data.info;
               if (info.length > 0) {
                   setFormData(info[0].info);
               }

            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        const fetchCleanerData = () => {
            if (!currentUser) {
                return;
            }
            setLoading(true);

            api.post('/api/notify-record', {email: currentUser})
                .then(response => {
                    if (response.data) {
                        setReminder(response.data?.reminder);
                        setEnabled(response.data?.enabled);
                        setAlert(response.data?.jobAlert)
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                })
        };
        fetchCleanerData();
    }, [currentUser]);

    const EditAdmin = ({ admin }) => {
        const formData = {password: '', email: admin.email, role: admin.roles};
        const [data, setData] = useState(formData);
        const [loading, setLoading] = useState(false);
        const [errors, setErrors] = useState({});
        const [message, setMessage] = useState('');
        const [adminRole, setAdminRole] = useState(null);
        const [deleteUser, setDeleteUser] = useState(false);
        const roles = ['Manager', 'Support'];

        const editAdmin = async (e) => {
            e.preventDefault();
            const newErrors = {};
            if (data.role === admin.roles) {
                newErrors.role = 'Select different role';
            }
            if (!data.password) {
                newErrors.password = 'Please enter password for verification';
            }
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
            setLoading(true);
            try {
                const response = await api.post('/api/admin/edit', data)
                const message = response.data.message;
                const success = response.data.success;
                if (success) {
                    setData({...data, password: ''});
                }
                setMessage(message);
            }
            catch (error) {
                console.log(error);
                setMessage('Error occured');
            }finally {
                setLoading(false);
            }
        }

        const deleteAdmin = async (e) => {
            e.preventDefault();
            const newErrors = {};
            if (!data.password) {
                newErrors.password = 'Please enter password for verification';
            }
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            setLoading(true);
            try {
                const response = await api.post('/api/admin/delete', data)
                const message = response.data.message;
                const success = response.data.message.success;
                setMessage(message);
                if (success) {
                    setData({});
                }
            }
            catch (error) {
                console.log(error);
                setMessage('Error occured');
            }finally {
                setLoading(false);
            }
        }

        const handleInputChange = (e) => {
            e.preventDefault();
            setData({...data, [e.target.name]: e.target.value});
            setErrors({});
        }

        useEffect(() => {
            setTimeout(() => setErrors({}), 4000);
        }, [data.role, data.password, deleteUser]);

        return (
            <form>
                {!deleteUser && <div>
                        <div style={{marginBottom: '10px'}}>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-evenly', marginBottom:'15px'}}>
                            {roles.map((role, index) => (
                                <div style={{display:'flex', alignItems:'center', gap:'5px'}}
                                     key={index}>
                                    <input
                                        checked={role === data.role}
                                        type={'checkbox'}
                                        name={'role'}
                                        onChange={() => setData({...data, role: role})}
                                        className={'button-bg'}
                                    />
                                    <label>{role}</label>
                                </div>
                            ))}
                        </div>
                        {errors.role && <label className={'error-message'}>{errors.role}</label>}
                    </div>
                        <div className={'form-group'}>
                        <input
                            placeholder='user email to be added as admin'
                            value={data.email}
                            readOnly={true}
                            type={'text'} name={'email'}
                            onChange={handleInputChange}
                            className={'button-bg'}
                            style={{backgroundColor:'lightgray'}}
                        />
                    </div>
                    </div>}
                <div className={'form-group'}>
                    <input
                        placeholder='ceo password'
                        value={data.password}
                        type={'password'}
                        name={'password'}
                        onChange={handleInputChange}
                        className={'button-bg'}
                        required
                    />
                    {errors.password && <label style={{color:'red'}} className={'error-message'}>{errors.password}</label>}
                </div>
                {loading && <p style={{marginBottom:'10px'}}>Loading...</p>}
                {message && <p style={{marginBottom:'10px'}}>{message}</p>}

                {deleteUser &&
                    <div style={{border: '1px solid red', display:'flex',
                        justifyContent:'center', flexDirection:'column', margin:'10px'}}>
                        <p style={{padding:'10px'}}>Delete user from admin. This cannot be undone. Continue?</p>
                        <div style={{display:'flex', alignItems:'center', padding:'10px', gap:'10px', justifyContent:'space-evenly'}}>
                            <button style={{background:'none', color:'red'}} onClick={deleteAdmin}>Yes</button>
                            <button className={'submit-button'} onClick={() => setDeleteUser(false)}>No</button>
                        </div>
                    </div>
                }

                <div className="user-actions">
                    <button
                        onClick={editAdmin}
                        type={'button'}
                        style={{color:'black', background:'none'}}
                        className="submit-button">
                        Edit
                    </button>
                    <button
                        disabled={deleteUser}
                        onClick={() => setDeleteUser(true)}
                        type={'button'} style={{color:'red', background:'none'}}
                        className="submit-button">
                        Delete
                    </button>
                    <FaTimes size={20} style={{width:'20px'}} onClick={() => setId(null)} />
                </div>
            </form>
        )
    }

    const Form = () => {
        const formData = {password: '', email: '', role: 'Manager'};
        const [data, setData] = useState(formData);
        const [loading, setLoading] = useState(false);
        const [errors, setErrors] = useState({});
        const [message, setMessage] = useState('');
        const roles = ['Manager', 'Support'];

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
                const response = await api.post('/api/admin/add', data)
                const message = response.data.message;
                setMessage(message);
            }
            catch (error) {
                console.log(error);
                setMessage('Error occured');
            }finally {
                setLoading(false);
            }
        }
       const handleInputChange = (e) => {
            e.preventDefault();
            setData({...data, [e.target.name]: e.target.value})
       }

        return (
            <form onSubmit={handleSubmit}>
                <div className={'form-group'}>
                    <input
                        placeholder='user email to be added as admin'
                        value={data.email}
                        type={'text'} name={'email'}
                        onChange={handleInputChange}
                        className={'button-bg'}
                        required
                    />
                    {errors.email && <label className={'error-message'}>{errors.email}</label>}
                </div>

                <div className={'form-group'}>
                    <input
                        placeholder='ceo password'
                        value={data.password}
                        type={'password'}
                        name={'password'}
                        onChange={handleInputChange}
                        className={'button-bg'}
                        required
                    />
                    {errors.password && <label className={'error-message'}>{errors.password}</label>}
                </div>

                <div className={'form-group'}>
                   <select
                       value={data.role}
                       name={'role'}
                       onChange={handleInputChange}
                       required>
                       {roles.map((role, index) => (
                           <option key={index} value={role}>{role}</option>
                       ))}
                   </select>

                </div>
                {loading && <p>Loading...</p>}
                {message && <p>{message}</p>}
                <div className="user-actions">
                    <button type={'submit'} className="submit-button">Add</button>
                    <button onClick={() => setAddAdmin(false)} type={'button'} className="back-button">Close</button>
                </div>
            </form>
        )
    }

    useEffect(() => {
        if (role === 'CEO') {
            setReadOnly(false);
        }
    }, [role]);

    useEffect(() => {
        if (message !== null) {
            setTimeout(() => setMessage(''), 5000);
        }
    }, [message]);

    //className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`}

    return (
        <div className="support-page" style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures it takes at least full viewport height
        }}>

            <div style={{display: 'flex', justifyContent:'flex-start', alignItems: 'center'}}>
                <img src={LOGO} className={'logo-icon'}/>
                <h1 className="page-title">Settings</h1>
            </div>
            <div className="settings-container">
                <div className="grid-container">
                    <button
                        className={activeTab === 'general' ? 'next-button' : 'back-button'}
                        onClick={() => setActiveTab('general')}>
                        <FaCog style={{width: '50px'}} />
                        <span>General Settings</span>
                    </button>
                    <button
                        className={activeTab === 'notifications' ? 'next-button' : 'back-button'}
                        onClick={() => setActiveTab('notifications')}>
                        <FaBell style={{width: '50px'}} />
                        <span>Notifications</span>
                    </button>
                    <button
                        className={activeTab === 'payments' ? 'next-button' : 'back-button'}
                        onClick={() => setActiveTab('payments')}>
                        <FaCreditCard style={{width: '50px'}} />
                        <span>Payments</span>
                    </button>
                    <button
                        className={activeTab === 'privacy' ? 'next-button' : 'back-button'}
                        onClick={() => setActiveTab('privacy')}>
                        <FaShieldAlt style={{width: '50px'}} />
                        <span>Privacy & Security</span>
                    </button>
                    <button
                        className={`settings-tab ${activeTab === 'admin' ? 'active' : ''}`}
                        onClick={() => setActiveTab('admin')}>
                        <FaUserCog style={{width: '30px'}} />
                        <span>Admin Users</span>
                    </button>
                </div>

                <div className="settings-content">
                    {activeTab === 'general' && (
                        <form onSubmit={handleSubmit} className="settings-form">
                            <h2 className="section-title">Company Information</h2>
                            <div className="settings-form">
                                <div className="form-section">
                                    <div className="form-group">
                                        <label>Company Name</label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            readOnly={readOnly}
                                            className={'button-bg'}
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Contact Email</label>
                                        <input
                                            type="email"
                                            name="contactEmail"
                                            readOnly={readOnly}
                                            className={'button-bg'}
                                            value={formData.contactEmail}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Contact Phone</label>
                                        <input
                                            type="tel"
                                            name="contactPhone"
                                            readOnly={readOnly}
                                            className={'button-bg'}
                                            value={formData.contactPhone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Address</label>
                                        <textarea
                                            name="address"
                                            className={'button-bg'}
                                            readOnly={readOnly}
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            rows="3"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Working Hours</label>
                                        <input
                                            type="text"
                                            name="workingHours"
                                            readOnly={readOnly}
                                            className={'button-bg'}
                                            value={formData.workingHours}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-section">
                                    <h2 className="section-title">Business Policies</h2>
                                    <div className="form-group">
                                        <label>Cancellation Policy</label>
                                        <textarea
                                            name="cancellationPolicy"
                                            readOnly={readOnly}
                                            value={formData.cancellationPolicy}
                                            onChange={handleInputChange}
                                            className={'button-bg'}
                                            rows="4"
                                        />
                                    </div>
                                </div>
                                {loading && <p style={{marginBottom:'10px'}}>Loading...</p>}
                                {message && <p style={{marginBottom:'10px'}}>{message}</p>}
                                {!readOnly && <div className="form-actions">
                                        <button
                                            disabled={(loading || !changes)}
                                            style={{display:'flex', justifyContent:'center'}}
                                            type="submit" className={(loading || !changes) ? "back-button" : "submit-button"}>
                                        <FaSave style={{color: 'white', width: '20px'}} />
                                        <span>Save Changes</span>
                                    </button>
                                    </div>}
                            </div>
                        </form>
                    )}

                    {activeTab === 'notifications' && (
                        <form onSubmit={handleSubmit} className="settings-form">
                            <div className="form-section">
                                <h2 className="section-title">Notification Settings</h2>
                                <div className="form-group">
                                    <label className="custom-checkbox" style={{color:'blue'}}>
                                        <input
                                            type="checkbox"
                                            checked={true}
                                            disabled={true}
                                            onChange={() => setEmailNotify(true)}
                                            className="hidden-checkbox"
                                        />
                                        <span className="checkbox-custom"></span>
                                        Email Notifications
                                    </label>
                                </div>
                                {formData.notificationEnabled && (<>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>

                                        <div style={{maxWidth:'500px'}} className="price-container">
                                            {!support && <label style={{margin:'10px'}}>This browser does not support notification</label>}
                                            <div className="form-group">
                                                <div  className="checkbox-label">
                                                    <label style={{
                                                        marginTop: '5px',
                                                        width:"100px",
                                                        fontSize:'large',
                                                        fontWeight:'bold'
                                                    }}>{enabled ? "Disable" : "Enable"}</label>
                                                    <label style={{alignSelf:'end'}} className="switch">
                                                        <input
                                                            type="checkbox"
                                                            disabled={disabled}
                                                            checked={enabled}
                                                            onChange={handleNotify}
                                                        />
                                                        <span className="slider"></span>
                                                    </label>

                                                </div>
                                            </div>

                                            <div style={{display:'none'}} className="form-group">
                                                <div className="checkbox-label">
                                                    <input
                                                        type="checkbox"
                                                        disabled={(!enabled || readOnly)}
                                                        onChange={() => setSms(!sms)}
                                                        checked={sms}
                                                    />
                                                    <label style={{marginTop:'5px'}}>SMS Notifications</label>

                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="checkbox-label">
                                                    <input
                                                        type="checkbox"
                                                        disabled={(!enabled || readOnly)}
                                                        checked={alert}
                                                        onChange={() => setAlert(!alert)}
                                                    />
                                                    <label style={{marginTop:'5px'}}>New Job Alerts</label>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="checkbox-label">
                                                    <input
                                                        type="checkbox"
                                                        disabled={(!enabled || readOnly)}
                                                        onChange={() => setReminder(!reminder)}
                                                        checked={reminder}
                                                    />
                                                    <label style={{marginTop:'5px'}}>Booking Reminders</label>
                                                </div>
                                            </div>

                                            <button
                                                onClick={onSubmit}
                                                style={{color:'white', padding:'12px'}}
                                                className={(!enabled || !support) ? 'back-button' : 'next-button'} type="button">
                                                {loading ? 'Saving...' : 'Save'}
                                            </button>
                                        </div>
                                    </div>
                                    </>)}
                            </div>

                            {loading && <p style={{marginBottom:'10px'}}>Loading...</p>}
                            {message && <p style={{marginBottom:'10px'}}>{message}</p>}
                            {!readOnly && <div className="form-actions">
                                <button
                                    disabled={(loading || !changes)}
                                    style={{display:'flex', justifyContent:'center'}}
                                    type="submit" className={(loading || !changes) ? "back-button" : "submit-button"}>
                                    <FaSave style={{color: 'white', width: '20px'}} />
                                    <span>Save Changes</span>
                                </button>
                            </div>}

                        </form>
                    )}

                    {activeTab === 'payments' && (
                        <form onSubmit={handleSubmit} className="settings-form">
                            <div className="form-section">
                                <h2 className="section-title">Payment Settings</h2>
                                <div className="form-group checkbox-group">
                                    <label style={{display:'flex', alignItems: 'center'}}>
                                        <input
                                            type="checkbox"
                                            name="paymentEnabled"
                                            checked={formData.paymentEnabled}
                                            onChange={readOnly ? null : handleInputChange}
                                        />
                                        <span>Enable Online Payments</span>
                                    </label>
                                </div>

                                {formData.paymentEnabled && (<>
                                        <div className="form-group">
                                            <h3 style={{marginBottom:'10px'}}>Accepted Payment Methods</h3>
                                            <div className="checkbox-group">
                                                <label style={{display:'flex', alignItems: 'center'}}>
                                                    <input
                                                        type="checkbox"
                                                        name="paymentMethods"
                                                        value="card"
                                                        checked={formData.paymentMethods.includes('card')}
                                                        onChange={(e) => {
                                                            if (readOnly) return;
                                                            setChanges(true);
                                                            const { value, checked } = e.target;
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                paymentMethods: checked
                                                                    ? [...prev.paymentMethods, value]
                                                                    : prev.paymentMethods.filter(method => method !== value)
                                                            }));
                                                        }}
                                                    />
                                                    <span>Credit/Debit Cards</span>
                                                </label>
                                                <label style={{display:'flex', alignItems: 'center'}}>
                                                    <input
                                                        type="checkbox"
                                                        name="paymentMethods"
                                                        value="bank"
                                                        checked={formData.paymentMethods.includes('bank')}
                                                        onChange={(e) => {
                                                            if (readOnly) return;
                                                            setChanges(true);
                                                            const { value, checked } = e.target;
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                paymentMethods: checked
                                                                    ? [...prev.paymentMethods, value]
                                                                    : prev.paymentMethods.filter(method => method !== value)
                                                            }));
                                                        }}
                                                    />
                                                    <span>Bank Transfer</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label>Tax Rate (%)</label>
                                            <input
                                                type="number"
                                                name="taxRate"
                                                readOnly={readOnly}
                                                value={formData.taxRate}
                                                onChange={handleInputChange}
                                                className={'button-bg'}
                                                min="0"
                                                max="100"
                                            />
                                        </div>
                                    </>)}
                            </div>
                            {loading && <p style={{marginBottom:'10px'}}>Loading...</p>}
                            {message && <p style={{marginBottom:'10px'}}>{message}</p>}
                            {!readOnly && <div className="form-actions">
                                <button
                                    disabled={(loading || !changes)}
                                    style={{display:'flex', justifyContent:'center'}}
                                    type="submit" className={(loading || !changes) ? "back-button" : "submit-button"}>
                                    <FaSave style={{color: 'white', width: '20px'}} />
                                    <span>Save Changes</span>
                                </button>
                            </div>}
                        </form>
                    )}

                    {activeTab === 'privacy' && (
                        <div className="privacy-settings">
                            <div className="info-card">
                                <FaInfoCircle className="info-icon" />
                                <h2>Privacy & Security</h2>
                                <p>
                                    Your company's privacy and security settings help protect both your business
                                    and your customers' data. These settings are automatically configured to
                                    comply with UK GDPR regulations.
                                </p>
                            </div>

                            <div className="security-features">
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <FaShieldAlt />
                                    </div>
                                    <div className="feature-info">
                                        <h3>Data Encryption</h3>
                                        <p>All customer and payment data is encrypted using industry-standard protocols.</p>
                                    </div>
                                </div>

                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <FaShieldAlt />
                                    </div>
                                    <div className="feature-info">
                                        <h3>GDPR Compliance</h3>
                                        <p>Our platform is designed to help you comply with UK GDPR requirements.</p>
                                    </div>
                                </div>

                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <FaShieldAlt />
                                    </div>
                                    <div className="feature-info">
                                        <h3>Regular Security Audits</h3>
                                        <p>We perform regular security audits to ensure your data remains protected.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'admin' && (
                        <div className="idea-container">
                            <div className="admin-users-list">
                                <h2 style={{textAlign:'center'}} className="section-title">Admin Users</h2>
                                <div className="admin-user-card">
                                    <div className="user-info">
                                        <FaUserTie size={100} style={{ width:'100%'}} />
                                        <h2 style={{textAlign:'center'}}>{ceo}</h2>
                                        <p style={{textAlign:'center'}}>@{superAdmin}</p>
                                        <span style={{textAlign:'center'}} className="user-role">CEO</span>
                                    </div>
                                    {addAdmin && <Form />}
                                    {(role === 'CEO'  && !addAdmin) && (<div className="user-actions">
                                            <label
                                                disabled={(role !== 'CEO' || addAdmin)}
                                                onClick={() => setAddAdmin(true)}
                                                style={{display:"flex", justifyContent:"center", alignItems:'baseline', gap:'4px'}}>
                                                <FaPlus size={15} style={{width:'20px', color:'black'}} />
                                                Add new Admin
                                            </label>
                                        </div>)}
                                </div>
                                <div className={'grid-container'}>
                                    {admin.map(manager => (
                                        <div key={manager.id} className="admin-user-card">
                                            <div className="user-info">
                                                <FaUser size={50} style={{ width:'100%'}} />
                                                <h3 style={{textAlign:'center'}}>{renderName(manager.firstName)} {renderName(manager.lastName)}</h3>
                                                <p style={{textAlign:'center'}}>@{manager.email}</p>
                                                <span style={{textAlign:'center'}} className="user-role">{manager.roles}</span>
                                            </div>
                                            {manager.id === id && <EditAdmin admin={manager} /> }
                                            {(role === 'CEO' && id === null) && <label style={{display:'flex', justifyContent:'center', alignItems:'baseline', gap:'4px'}}>
                                                    Edit
                                                    <FaPen size={20} onClick={() => setId(manager.id)} style={{ width:'20px'}} />
                                                </label>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="admin-permissions">
                                <h2 className="section-title">Permission Levels</h2>
                                <div className="permission-level">
                                    <h3>CEO</h3>
                                    <p>Full access to all settings and features</p>
                                </div>
                                <div className="permission-level">
                                    <h3>Manager</h3>
                                    <p>Can manage bookings, cleaners and customers but cannot change system settings</p>
                                </div>
                                <div className="permission-level">
                                    <h3>Support</h3>
                                    <p>Can view bookings and customer information but cannot make changes</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;