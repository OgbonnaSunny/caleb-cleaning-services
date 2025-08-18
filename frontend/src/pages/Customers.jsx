// components/Customers.js
import React, { useState } from 'react';
import { FaSearch, FaUserPlus, FaPhone, FaEnvelope, FaHome, FaHistory, FaEdit } from 'react-icons/fa';
import api from './api.js';

const Customers = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const customers = [
        {
            id: 1,
            category: "Sarah Wilson",
            email: "sarah.w@example.com",
            phone: "+44 7890 112233",
            address: "25 Park Lane, London, W1K 7AF",
            bookings: 12,
            lastBooking: "2023-06-15"
        },
        {
            id: 2,
            category: "Michael Brown",
            email: "michael.b@example.com",
            phone: "+44 7890 445566",
            address: "42 Kensington High St, London, W8 5HA",
            bookings: 8,
            lastBooking: "2023-06-18"
        },
        {
            id: 3,
            category: "Emily Davis",
            email: "emily.d@example.com",
            phone: "+44 7890 778899",
            address: "7 Chelsea Bridge Rd, London, SW1W 8RH",
            bookings: 5,
            lastBooking: "2023-05-28"
        },
        {
            id: 4,
            category: "Robert Taylor",
            email: "robert.t@example.com",
            phone: "+44 7890 001122",
            address: "33 Baker Street, London, W1U 6HQ",
            bookings: 3,
            lastBooking: "2023-04-10"
        }
    ];

    const customerData = {}

    const registerCustomer = () => {
        api.get('/api/customers', customers)
            .then(response => console.log(response.data))
            .catch(error => console.error('Error:', error));
    }

    const filteredCustomers = customers.filter(customer =>
        customer.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
    );

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures it takes at least full viewport height
        }} className="customers-page">
            <h1 className="page-title">Customers Management</h1>

            <div className="customers-header">
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="add-customer-btn">
                    <FaUserPlus />
                    <span>Add New Customer</span>
                </button>
            </div>

            <div className="customers-table">
                <div className="grid-container">
                    {filteredCustomers.length > 0 ? (
                        filteredCustomers.map(customer => (
                            <div key={customer.id} className="service-card">

                                <div style={{display: 'flex', justifyContent: 'stretch', alignItems: 'center'}}>
                                    <span>{customer.category}</span>
                                    <span style={{marginLeft:'8px'}}>{customer.lastBooking}</span>

                                </div>
                                <div className="table-cell contact">
                                    <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                                        <FaPhone style={{width:'20px'}} className="contact-icon" />
                                        <span>{customer.phone}</span>
                                        <span>{customer.bookings}</span>
                                    </div>
                                    <div className="contact-item">
                                        <FaEnvelope style={{width:'20px'}} className="contact-icon" />
                                        <span>{customer.email}</span>
                                    </div>
                                </div>
                                <div className="table-cell address">
                                    <FaHome style={{width:'20px'}} className="address-icon" />
                                    <span className="address-text">{customer.address}</span>
                                </div>
                                <div className="table-cell bookings">

                                </div>
                                <div className="table-cell actions">
                                    <button className="action-btn history-btn">
                                        <FaHistory style={{width:'10px'}} />
                                        <span>History</span>
                                    </button>
                                    <button className="action-btn edit-btn">
                                        <FaEdit style={{width:'10px'}} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results-row">
                            <div className="no-results-cell">No customers found</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Customers;