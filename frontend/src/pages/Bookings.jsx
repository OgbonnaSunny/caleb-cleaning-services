// components/Bookings.js
import React from 'react';
import { FaHome, FaClock, FaCheckCircle, FaTimesCircle, FaMapMarkerAlt } from 'react-icons/fa';

const Bookings = () => {
    const bookings = [
        { id: 1, postcode: "G10AS", customer: "Sarah Johnson", address: "25 Park Lane, London", time: "Today, 10:00 AM", service: "Deep Clean", status: "confirmed" },
        { id: 2, postcode: "O10AS", customer: "Michael Brown", address: "42 Kensington High St", time: "Today, 12:30 PM", service: "Regular Clean", status: "confirmed" },
        { id: 3, postcode: "W10AR", customer: "Emma Wilson", address: "7 Chelsea Bridge Rd", time: "Today, 2:00 PM", service: "Move in Clean", status: "pending" },
        { id: 4, postcode: "G10AS",  customer: "David Smith", address: "33 Baker Street", time: "Tomorrow, 9:00 AM", service: "Regular Clean", status: "confirmed" },
        { id: 5, postcode: "B10AS", customer: "Lisa Taylor", address: "18 Oxford Street", time: "Tomorrow, 11:00 AM", service: "Deep Clean", status: "cancelled" }
    ];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures it takes at least full viewport height
        }}>
            <div className="recent-bookings card">
                <div className="card-header">
                    <h2 style={{color:'navy'}}>Recent Bookings</h2>
                    <button className="btn-view-all" style={{color:'red'}}>View All</button>
                </div>
                <div className="card-body">
                    <div className="grid-container">
                        {bookings.map(booking => (
                            <div key={booking.id} className="service-card">
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                    <FaHome className="icon-small" />
                                    <h3>{booking.customer}</h3>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                    <FaMapMarkerAlt className="icon-small"/>
                                    <p>{booking.address}</p>
                                </div>

                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                    <FaClock className="icon-small" />
                                    <p> {booking.time}</p>
                                </div>
                                <span className={`booking-service ${booking.service.toLowerCase().replace(' ', '-')}`}>{booking.service}</span>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                    <span>{booking.status}</span>
                                    <div className={`booking-status ${booking.status}`} >
                                        {booking.status === 'confirmed' && <FaCheckCircle className="icon-small" style={{color:'green'}}/>}
                                        {booking.status === 'pending' && <FaClock className="icon-small" style={{color:'yellow'}} />}
                                        {booking.status === 'cancelled' &&  <FaTimesCircle className="icon-small" style={{color:'red'}} />}

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bookings;