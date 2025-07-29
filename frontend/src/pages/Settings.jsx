// components/Settings.js
import React, { useState } from 'react';
import { FaSave, FaCog, FaUserCog, FaShieldAlt, FaBell, FaCreditCard, FaInfoCircle } from 'react-icons/fa';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [formData, setFormData] = useState({
        companyName: 'Fly Cleaner',
        contactEmail: 'flyclean@gmail.com',
        contactPhone: '+44 20 7946 0958',
        address: '123 Cleaning Street, London, EC1A 1AA',
        workingHours: 'Mon-Fri: 8:00 AM - 6:00 PM',
        notificationEnabled: true,
        notificationEmail: true,
        notificationSMS: false,
        paymentEnabled: true,
        paymentMethods: ['card', 'bank'],
        taxRate: 20,
        cancellationPolicy: '24 hours notice required for cancellations'
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save settings logic would go here
        alert('Settings saved successfully!');
    };

    return (
        <div className="settings-page" style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures it takes at least full viewport height
        }}>
            <h1 className="page-title">Settings</h1>

            <div className="settings-container">
                <div className="settings-sidebar">
                    <button
                        className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        <FaCog />
                        <span>General Settings</span>
                    </button>
                    <button
                        className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('notifications')}
                    >
                        <FaBell />
                        <span>Notifications</span>
                    </button>
                    <button
                        className={`settings-tab ${activeTab === 'payments' ? 'active' : ''}`}
                        onClick={() => setActiveTab('payments')}
                    >
                        <FaCreditCard />
                        <span>Payments</span>
                    </button>
                    <button
                        className={`settings-tab ${activeTab === 'privacy' ? 'active' : ''}`}
                        onClick={() => setActiveTab('privacy')}
                    >
                        <FaShieldAlt />
                        <span>Privacy & Security</span>
                    </button>
                    <button
                        className={`settings-tab ${activeTab === 'admin' ? 'active' : ''}`}
                        onClick={() => setActiveTab('admin')}
                    >
                        <FaUserCog />
                        <span>Admin Users</span>
                    </button>
                </div>

                <div className="settings-content">
                    {activeTab === 'general' && (
                        <form onSubmit={handleSubmit} className="settings-form">
                            <div className="form-section">
                                <h2 className="section-title">Company Information</h2>
                                <div className="form-group">
                                    <label>Company Name</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Contact Email</label>
                                    <input
                                        type="email"
                                        name="contactEmail"
                                        value={formData.contactEmail}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Contact Phone</label>
                                    <input
                                        type="tel"
                                        name="contactPhone"
                                        value={formData.contactPhone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <textarea
                                        name="address"
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
                                        value={formData.cancellationPolicy}
                                        onChange={handleInputChange}
                                        rows="4"
                                    />
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="save-btn">
                                    <FaSave />
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === 'notifications' && (
                        <form onSubmit={handleSubmit} className="settings-form">
                            <div className="form-section">
                                <h2 className="section-title">Notification Settings</h2>
                                <div className="form-group checkbox-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="notificationEnabled"
                                            checked={formData.notificationEnabled}
                                            onChange={handleInputChange}
                                        />
                                        <span>Enable Notifications</span>
                                    </label>
                                </div>

                                {formData.notificationEnabled && (
                                    <>
                                        <div className="form-group checkbox-group">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="notificationEmail"
                                                    checked={formData.notificationEmail}
                                                    onChange={handleInputChange}
                                                />
                                                <span>Email Notifications</span>
                                            </label>
                                        </div>
                                        <div className="form-group checkbox-group">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="notificationSMS"
                                                    checked={formData.notificationSMS}
                                                    onChange={handleInputChange}
                                                />
                                                <span>SMS Notifications</span>
                                            </label>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="save-btn">
                                    <FaSave />
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </form>
                    )}

                    {activeTab === 'payments' && (
                        <form onSubmit={handleSubmit} className="settings-form">
                            <div className="form-section">
                                <h2 className="section-title">Payment Settings</h2>
                                <div className="form-group checkbox-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="paymentEnabled"
                                            checked={formData.paymentEnabled}
                                            onChange={handleInputChange}
                                        />
                                        <span>Enable Online Payments</span>
                                    </label>
                                </div>

                                {formData.paymentEnabled && (
                                    <>
                                        <div className="form-group">
                                            <label>Accepted Payment Methods</label>
                                            <div className="checkbox-group">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        name="paymentMethods"
                                                        value="card"
                                                        checked={formData.paymentMethods.includes('card')}
                                                        onChange={(e) => {
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
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        name="paymentMethods"
                                                        value="bank"
                                                        checked={formData.paymentMethods.includes('bank')}
                                                        onChange={(e) => {
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
                                                value={formData.taxRate}
                                                onChange={handleInputChange}
                                                min="0"
                                                max="100"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="save-btn">
                                    <FaSave />
                                    <span>Save Changes</span>
                                </button>
                            </div>
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
                        <div className="admin-settings">
                            <div className="admin-users-list">
                                <h2 className="section-title">Admin Users</h2>
                                <div className="admin-user-card">
                                    <div className="user-avatar">AD</div>
                                    <div className="user-info">
                                        <h3>Admin User</h3>
                                        <p>admin@cleanpro.co.uk</p>
                                        <span className="user-role">Super Admin</span>
                                    </div>
                                    <div className="user-actions">
                                        <button className="edit-btn">Edit</button>
                                        <button className="delete-btn" disabled>Delete</button>
                                    </div>
                                </div>

                                <div className="admin-user-card">
                                    <div className="user-avatar">SM</div>
                                    <div className="user-info">
                                        <h3>Sarah Manager</h3>
                                        <p>sarah.m@cleanpro.co.uk</p>
                                        <span className="user-role">Manager</span>
                                    </div>
                                    <div className="user-actions">
                                        <button className="edit-btn">Edit</button>
                                        <button className="delete-btn">Delete</button>
                                    </div>
                                </div>

                                <button className="add-admin-btn">
                                    + Add New Admin
                                </button>
                            </div>

                            <div className="admin-permissions">
                                <h2 className="section-title">Permission Levels</h2>
                                <div className="permission-level">
                                    <h3>Super Admin</h3>
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