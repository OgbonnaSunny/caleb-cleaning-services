// components/StatsCard.js
import React from 'react';
import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';

const StatsCard = ({ title, value, change, icon, trend }) => {
    return (
        <div className="price-container">
            <div style={{display: 'flex', justifyContent: 'start', alignItems: 'baseline'}}>
                <div className="stats-icon" style={{width:'30px'}}>{icon}</div>
                <h3>{title}</h3>
            </div>
            <div >
                <div style={{display: 'flex', justifyContent: 'start', alignItems: 'baseline'}}>
                    <h2>{value}</h2>
                    <div className={`stats-change ${trend}`}>
                        {trend === 'up' && <FaArrowUp style={{ width: '30px' }} />}
                        {trend === 'down' && <FaArrowDown style={{ width: '30px' }} />}
                        {trend === 'neutral' && <FaMinus style={{ width: '30px' }} />}
                        <span>{change}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;