// components/ServiceAreas.js
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ServiceAreas = () => {
    const data = [
        { name: 'Central London', value: 35 },
        { name: 'West London', value: 25 },
        { name: 'East London', value: 20 },
        { name: 'North London', value: 15 },
        { name: 'South London', value: 5 }
    ];

    const COLORS = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800'];

    return (
        <div className="service-areas card">
            <div className="card-header">
                <h2>Service Areas</h2>
            </div>
            <div className="card-body">
                <div className="idea-container">
                    <div className="areas-chart">
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="areas-legend">
                        {data.map((item, index) => (
                            <div key={index} style={{display: 'flex', alignItems: 'center'}}>
                                <div className="area-color" style={{ backgroundColor: COLORS[index] }}></div>
                                <span>{item.name}</span>
                                <span className="legend-percent" style={{textAlign:'end'}}>{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceAreas;