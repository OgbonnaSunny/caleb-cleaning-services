// components/Cleaners.js
import React, { useState, useEffect } from 'react';
import { FaSearch, FaUserPlus, FaFilter, FaStar, FaPhone, FaEnvelope, FaUserEdit, FaUserTimes, FaTimes, FaArrowRight } from 'react-icons/fa';
import axios from 'axios'

const Cleaners = () => {
    const allCeaners = [
        {
            id: 1,
            name: "Emma Johnson",
            rating: 4.8,
            jobs: 124,
            status: "active",
            phone: "+44 7890 123456",
            email: "emma.j@cleanpro.co.uk",
            areas: ["Central London", "West London"],
            services: ["Regular Clean", "Deep Clean"]
        },
        {
            id: 2,
            name: "David Smith",
            rating: 4.5,
            jobs: 87,
            status: "active",
            phone: "+44 7890 654321",
            email: "david.s@cleanpro.co.uk",
            areas: ["East London", "North London"],
            services: ["Regular Clean", "Move Out Clean"]
        },
        {
            id: 3,
            name: "Sophia Williams",
            rating: 4.9,
            jobs: 156,
            status: "on leave",
            phone: "+44 7890 987654",
            email: "sophia.w@cleanpro.co.uk",
            areas: ["South London"],
            services: ["Deep Clean"]
        },
        {
            id: 4,
            name: "James Brown",
            rating: 4.2,
            jobs: 42,
            status: "inactive",
            phone: "+44 7890 456789",
            email: "james.b@cleanpro.co.uk",
            areas: ["Central London"],
            services: ["Regular Clean"]
        }
    ];

    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [cleanerData, setCleanerData] = useState({});
    const [activeServiceName, setActiveServiceName] = useState('');
    const [showTools, setShowTools] = useState(false);
    const [cleaners, setCleaners] = useState(allCeaners);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cleanerActions = ['Update areas', 'Activate', 'Deactivate', 'Approve leave', 'Update service', 'Update worked hours'];

    const filteredCleaners = cleaners.filter(cleaner => {
        const matchesSearch = cleaner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cleaner.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = activeTab === 'all' || cleaner.status === activeTab;
        return matchesSearch && matchesStatus;
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/cleaners');
                if (response.data !== null && response.data.length > 0) {
                 //   setCleaners(response.data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures it takes at least full viewport height
        }} className="cleaners-page">
            <h1 className="page-title">Cleaners Management</h1>

            <div className={['slidings', 'cleaners-tabs', showTools ? 'visible' : 'hidden'].join(' ')} style={{marginTop: '10px'}}>
                <div className="price-container">
                    <div style={{marginBottom:'20px', display:'flex', justifyContent:'stretch',  alignItems: 'baseline'}}>
                        <h3 style={{textAlign:'center', marginLeft:'20px'}}>{`Updating profile for ${cleanerData.name}`}</h3>
                    </div>
                    <div className="grid-container">
                        {cleanerActions.map((action, index) => (
                            <div key={index} className="actions">
                                <button className="service-card" style={{color:'green', textAlign:'center'}}
                                        onClick={() => setActiveServiceName(action)}>{action}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="cleaners-header">
                <div className="search-filter">
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search cleaners..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="filter-btn">
                        <FaFilter />
                        <span>Filters</span>
                    </button>
                </div>
                <button className="add-cleaner-btn">
                    <FaUserPlus />
                    <span>Add New Cleaner</span>
                </button>
            </div>

            <div className="cleaners-tabs">
                <button
                    className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                >
                    All Cleaners
                </button>
                <button
                    className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
                    onClick={() => setActiveTab('active')}
                >
                    Active
                </button>
                <button
                    className={`tab-btn ${activeTab === 'on leave' ? 'active' : ''}`}
                    onClick={() => setActiveTab('on leave')}
                >
                    On Leave
                </button>
                <button
                    className={`tab-btn ${activeTab === 'inactive' ? 'active' : ''}`}
                    onClick={() => setActiveTab('inactive')}
                >
                    Inactive
                </button>
            </div>

            <div className="grid-container">
                {filteredCleaners.length > 0 ? (
                    filteredCleaners.map(cleaner => (
                        <div key={cleaner.id} className="service-card">
                            <div style={{display: 'block'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                    <h5>{cleaner.name}</h5>
                                    <span className="jobs-count">({cleaner.jobs} jobs)</span>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                        <FaStar style={{width:'20px', height:'12px'}} />
                                        <span>{cleaner.rating}</span>
                                    </div>
                                </div>

                                <div style={{display:'flex', alignItems:'baseline', justifyContent: 'space-between'}}>
                                    <FaPhone style={{width:'20px', height:'12px'}} />
                                    <p>{cleaner.phone}</p>
                                    <span
                                          style={{color: cleaner.status === 'active' ? 'green' : cleaner.status === 'inactive' ? 'red' : cleaner.status === 'on leave' ? 'yellow' : 'black'}}>{cleaner.status}
                                    </span>
                                </div>

                                <div style={{display:'flex', alignItems:'baseline', justifyItems:'space-between'}}>
                                    <FaEnvelope style={{width:'20px', height:'12px'}} />
                                    <p>{cleaner.email}</p>
                                </div>

                            </div>

                            <div className="cleaner-meta">
                                <div className="cleaner-areas">
                                    <h4>Areas Covered:</h4>
                                    <div className="areas-tags">
                                        {cleaner.areas.map((area, index) => (
                                            <span key={index} className="area-tag">{area}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="cleaner-services">
                                    <h4>Services:</h4>
                                    <div className="services-tags">
                                        {cleaner.services.map((plan, index) => (
                                            <span key={index} className="service-tag">{service}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="cleaner-actions">

                                <div className="action-buttons">
                                    <button className="edit-btn">
                                        <FaUserEdit onClick={() => { setCleanerData(cleaner); setShowTools(true) }} />
                                    </button>
                                    <button className="delete-btn">
                                        <FaUserTimes
                                            style={(cleanerData.id === cleaner.id && showTools) ? {color:'red'} : {color:''}}
                                            onClick={cleaner.id === cleanerData.id ? () => { setShowTools(false) } : null } />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results">
                        <p>No cleaners found matching your criteria</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Cleaners;