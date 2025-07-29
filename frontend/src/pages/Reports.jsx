// components/Reports.js
import React, { useState } from 'react';
import { FaCalendarAlt, FaDownload, FaFilter, FaChartBar, FaChartLine, FaChartPie, FaPoundSign } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Reports = () => {
    const [activeReport, setActiveReport] = useState('revenue');
    const [dateRange, setDateRange] = useState('month');

    // Sample data for charts
    const revenueData = [
        { name: 'Jan', revenue: 12000 },
        { name: 'Feb', revenue: 19000 },
        { name: 'Mar', revenue: 15000 },
        { name: 'Apr', revenue: 18000 },
        { name: 'May', revenue: 21000 },
        { name: 'Jun', revenue: 25000 },
        { name: 'Jul', revenue: 22000 }
    ];

    const bookingsData = [
        { name: 'Jan', bookings: 85 },
        { name: 'Feb', bookings: 125 },
        { name: 'Mar', bookings: 110 },
        { name: 'Apr', bookings: 135 },
        { name: 'May', bookings: 155 },
        { name: 'Jun', bookings: 180 },
        { name: 'Jul', bookings: 165 }
    ];

    const serviceData = [
        { name: 'Regular Clean', value: 65 },
        { name: 'Deep Clean', value: 25 },
        { name: 'Move Out Clean', value: 10 }
    ];

    const COLORS = ['#4CAF50', '#2196F3', '#FFC107'];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures it takes at least full viewport height
        }} className="reports-page">
            <h1 className="page-title">Reports & Analytics</h1>

            <div className="reports-header">
                <div className="report-tabs">
                    <button
                        className={`tab-btn ${activeReport === 'revenue' ? 'active' : ''}`}
                        onClick={() => setActiveReport('revenue')}
                    >
                        <FaPoundSign />
                        <span>Revenue</span>
                    </button>
                    <button
                        className={`tab-btn ${activeReport === 'bookings' ? 'active' : ''}`}
                        onClick={() => setActiveReport('bookings')}
                    >
                        <FaChartBar />
                        <span>Bookings</span>
                    </button>
                    <button
                        className={`tab-btn ${activeReport === 'services' ? 'active' : ''}`}
                        onClick={() => setActiveReport('services')}
                    >
                        <FaChartPie />
                        <span>Services</span>
                    </button>
                </div>

                <div className="report-controls">
                    <div className="date-range">
                        <button
                            className={`range-btn ${dateRange === 'week' ? 'active' : ''}`}
                            onClick={() => setDateRange('week')}
                        >
                            Week
                        </button>
                        <button
                            className={`range-btn ${dateRange === 'month' ? 'active' : ''}`}
                            onClick={() => setDateRange('month')}
                        >
                            Month
                        </button>
                        <button
                            className={`range-btn ${dateRange === 'year' ? 'active' : ''}`}
                            onClick={() => setDateRange('year')}
                        >
                            Year
                        </button>
                    </div>

                    <div className="custom-range">
                        <FaCalendarAlt className="calendar-icon" />
                        <span>Custom Range</span>
                    </div>

                    <button className="download-btn">
                        <FaDownload />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            <div className="report-content">
                {activeReport === 'revenue' && (
                    <div className="revenue-report">
                        <div className="report-card">
                            <div className="card-header">
                                <h2>Revenue Overview</h2>
                                <button className="filter-btn">
                                    <FaFilter />
                                    <span>Filter</span>
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="chart-container">
                                    <ResponsiveContainer width="100%" height={400}>
                                        <BarChart data={revenueData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip formatter={(value) => [`£${value}`, 'Revenue']} />
                                            <Legend />
                                            <Bar dataKey="revenue" fill="#4CAF50" name="Revenue (£)" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="stats-grid">
                                    <div className="stat-card">
                                        <h3>Total Revenue</h3>
                                        <h2>£142,500</h2>
                                        <div className="change up">
                                            +12% from last month
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <h3>Avg. Revenue per Booking</h3>
                                        <h2>£85.50</h2>
                                        <div className="change up">
                                            +5% from last month
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <h3>Most Profitable Service</h3>
                                        <h2>Deep Clean</h2>
                                        <div className="change neutral">
                                            £120 avg.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeReport === 'bookings' && (
                    <div className="bookings-report">
                        <div className="report-card">
                            <div className="card-header">
                                <h2>Bookings Overview</h2>
                                <button className="filter-btn">
                                    <FaFilter />
                                    <span>Filter</span>
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="chart-container">
                                    <ResponsiveContainer width="100%" height={400}>
                                        <LineChart data={bookingsData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="bookings" stroke="#2196F3" name="Bookings" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="stats-grid">
                                    <div className="stat-card">
                                        <h3>Total Bookings</h3>
                                        <h2>1,050</h2>
                                        <div className="change up">
                                            +15% from last month
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <h3>Repeat Customers</h3>
                                        <h2>68%</h2>
                                        <div className="change up">
                                            +8% from last month
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <h3>Most Popular Service</h3>
                                        <h2>Regular Clean</h2>
                                        <div className="change neutral">
                                            65% of bookings
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeReport === 'services' && (
                    <div className="services-report">
                        <div className="report-card">
                            <div className="card-header">
                                <h2>Services Distribution</h2>
                                <button className="filter-btn">
                                    <FaFilter />
                                    <span>Filter</span>
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="chart-container">
                                    <div className="pie-chart">
                                        <ResponsiveContainer width="100%" height={300}>
                                            <PieChart>
                                                <Pie
                                                    data={serviceData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    outerRadius={120}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                >
                                                    {serviceData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value) => [`${value} bookings`, 'Count']} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="services-stats">
                                    <div className="service-stat">
                                        <div className="color-dot" style={{ backgroundColor: COLORS[0] }}></div>
                                        <div className="service-info">
                                            <h3>Regular Clean</h3>
                                            <p>65% of total bookings</p>
                                        </div>
                                        <div className="service-value">£89,250</div>
                                    </div>
                                    <div className="service-stat">
                                        <div className="color-dot" style={{ backgroundColor: COLORS[1] }}></div>
                                        <div className="service-info">
                                            <h3>Deep Clean</h3>
                                            <p>25% of total bookings</p>
                                        </div>
                                        <div className="service-value">£34,500</div>
                                    </div>
                                    <div className="service-stat">
                                        <div className="color-dot" style={{ backgroundColor: COLORS[2] }}></div>
                                        <div className="service-info">
                                            <h3>Move Out Clean</h3>
                                            <p>10% of total bookings</p>
                                        </div>
                                        <div className="service-value">£18,750</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;