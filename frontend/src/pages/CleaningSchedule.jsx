// components/CleaningSchedule.js
import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const CleaningSchedule = () => {
    const schedule = [
        { time: "09:00 AM", customer: "James Wilson", plan: "Regular Clean" },
        { time: "11:30 AM", customer: "Olivia Smith", plan: "Deep Clean" },
        { time: "02:00 PM", customer: "Robert Brown", plan: "Move Out Clean" },
        { time: "04:30 PM", customer: "Emily Davis", plan: "Regular Clean" }
    ];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures it takes at least full viewport height
        }}>
            <div className="cleaning-schedule card">
                <div className="card-header">
                    <h2 className={'help-text'} style={{color:'brown'}}>Today's Schedule</h2>
                    <button className="btn-view-all">View Calendar</button>
                </div>
                <div className="card-body">
                    <div className="grid-container">
                        {schedule.map((item, index) => (
                            <div key={index} className="schedule-item">
                                <div className="schedule-time">
                                    <FaCalendarAlt className="icon-small" />
                                    <span>{item.time}</span>
                                </div>
                                <div className="schedule-details">
                                    <h3>{item.customer}</h3>
                                    <p>{item.plan}</p>
                                </div>
                                <button style={{background:'cadetblue', color:'white', textAlign:'center'}} className="service-card">Assign</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CleaningSchedule;