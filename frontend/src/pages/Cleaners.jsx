// components/Cleaners.js
import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaUserPlus, FaFilter, FaStar, FaPhone, FaEnvelope, FaUserEdit, FaUserTimes, FaTimes, FaArrowRight, FaUserTie, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios'
import LOGO from "../images/logo4.png";
import api from './api.js'
import { useNavigate } from "react-router-dom";

const Cleaners = () => {
    const navigate = useNavigate();
    const docRef = useRef(null);
    const allCeaners = [
        {
            id: 1,
            category: "Emma Johnson",
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
            category: "David Smith",
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
            category: "Sophia Williams",
            rating: 4.9,
            jobs: 156,
            status: "inactive",
            phone: "+44 7890 987654",
            email: "sophia.w@cleanpro.co.uk",
            areas: ["South London"],
            services: ["Deep Clean"]
        },
        {
            id: 4,
            category: "James Brown",
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
    const [tabValue, setTabValue] = useState(-1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDatabase, setSearchDatabase] = useState('');
    const [cleanerData, setCleanerData] = useState({});
    const [activeServiceName, setActiveServiceName] = useState('');
    const [showTools, setShowTools] = useState(false);
    const [cleaners, setCleaners] = useState(allCeaners);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(10);
    const [allCleaners, setAllCleaners] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [messages, setMessages] = useState('');
    const [email, setEmail] = useState('');
    const [deleteEmail, setDeleteEmail] = useState(null);
    const [ids, setIds] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [name, setName] = useState('');
    const [noCleaner, setNoCleaner] = useState(false);


    const filteredCleaners = allCleaners.filter(cleaner => {
        const matchesSearch = cleaner.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cleaner.email.toLowerCase().includes(searchTerm.toLowerCase()) || cleaner.lastName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = tabValue === -1 || cleaner.isActive === tabValue;
        return matchesSearch && matchesStatus;
    });

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

    useEffect(() => {
        if (window.innerWidth > 768) {
            setPage(20);
            return;
        }
        setPage(10);
    }, []);

    useEffect(() => {
        if (noCleaner) return;
        setLoading(true);
        let offset = 0;
        if (allCleaners.length > 0) {
            offset = allCleaners[allCleaners.length - 1].id;
        }
        api.post('/api/users/all-cleaners', {limit: page, offset: offset })
            .then(response => {
                const cleaners = response.data.cleaners;
                setAllCleaners(prev => {
                    const map = new Map(prev.map(item => [item.id, item])); // old items
                    cleaners.forEach(item => map.set(item.id, item));    // add/replace new
                    return Array.from(map.values()).sort((a, b) => a.id - b.id); // convert back to array
                });
                if (cleaners.length <= 0) {
                    setNoCleaner(true)
                }

            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [pageCount])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;

            if (scrollTop + clientHeight >= scrollHeight - 100) {
                if (!loading && documents.length <= 0) {
                    setPageCount(prev => prev + 1);
                }
            }
            if (scrollTop <= scrollHeight / 2) {
            //    setNoCleaner(false)
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, documents]);

    const openProfile = (email) => {
        window.open(`/cleanerprofilepage?email=${encodeURIComponent(email)}`, '_blank');
    }

    const activateOrDeactivate = (email, status) => {
        if (loading) {
            return;
        }
        setLoading(true);
        api.post('/api/users/cleaners/status', {email: email, status: status})
            .then(response => {
                const message = response.data.message;
                setMessages(message);
            })
            .catch(error => {
                console.log(error);
                setMessages("Error occured");
            })
            .finally(() =>{
                setLoading(false);
                setEmail(email)
            })
    }

    const deleteCleaner = (email) => {
        if (loading) {
            return;
        }
        setLoading(true);
        api.post('/api/users/cleaners/delete', {email: email})
            .then(response => {
                const message = response.data.message;
                const success = response.data.success;
                if (success) {
                    setIds(prev => [...prev, email]);
                    setDeleteEmail(null)
                }
                setMessages(message);
            })
            .catch(error => {
                console.log(error);
                setMessages("Error occured");
            })
            .finally(() =>{
                setLoading(false);
                setEmail(email)
            })
    }

    useEffect(() => {
        setTimeout(() => setMessages(null), 5000);
    }, [messages]);

    const searchCleaner = () => {
        if (loading) {return;}
        if (!searchDatabase) {
            return;
        }
        setLoading(true);
        api.post('/api/users/cleaner-search', {search: searchDatabase })
            .then(response => {
                const cleaners = response.data.cleaners;
                setAllCleaners(cleaners);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        if (searchDatabase.length <= 0) {
            setPageCount(prev => prev + 1);
        }
    }, [searchDatabase]);

    const handleDocs = (cleaner) => {
        setDocuments([])
        setDocuments(prev => [...prev, {title:"Photo", img: cleaner?.photo_path}]);
        setDocuments(prev => [...prev, {title: "ID", img: cleaner?.identify_path}]);
        setDocuments(prev => [...prev, {title:"National insurance", img: cleaner?.ni_path}]);
        setDocuments(prev => [...prev, {title: "Proof of address", img: cleaner?.addressProof_path}])
        setName(cleaner?.firstName?.charAt(0)?.toUpperCase() + cleaner?.firstName.slice(1) + " " + cleaner?.lastName?.charAt(0)?.toUpperCase() + cleaner?.lastName.slice(1));
        docRef?.current?.scrollIntoView({behavior: 'smooth'});
      //  window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures it takes at least full viewport height
        }} className="cleaners-page">
            <div ref={docRef} style={{display:'flex', flexDirection: 'row',alignItems: 'center', justifyContent:'flex-start', gap:'10px'}}>
                <img src={LOGO} className={'logo-icon'}/>
                <h1 className="page-title">Cleaners Management</h1>
            </div>
            {documents.length <= 0 && <div className="cleaners-header">
                <div style={{flexFlow:'1', maxWidth:'900px'}}  className="search-bar" >
                    <FaSearch style={{ width:'10px'}} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search current list..."
                        value={searchTerm}
                        className={'button-bg'}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={{flexFlow:'1', maxWidth:'900px', display:'flex', alignItems:'center'}} className="search-bar" >
                    <input
                        type="text"
                        placeholder="Search database..."
                        value={searchDatabase}
                        className={'button-bg'}
                        style={{width:'90%'}}
                        onChange={(e) => setSearchDatabase(e.target.value)}
                    />
                    <FaSearch onClick={searchCleaner} style={{width:'40px'}}  />

                </div>
            </div> }
            {documents.length > 0 &&
                <div  className="container">
                    <div style={{display:'flex', alignItems:'baseline', marginBottom:'10px'}}>
                        <h3 className={'experience-text'}>{name}</h3>
                        <FaTimes size={25} style={{width:'20px', alignSelf:'end'}} onClick={() => {setDocuments([]); setName('')}} />
                    </div>
                    <div className={'grid-container'}>
                        {documents.map((doc, index ) => (
                            <div key={index}>
                                <h3 style={{textAlign:'center'}}>{doc.title}</h3>
                                <img src={doc.img}/>
                            </div>
                        ))}
                    </div>
                </div>
            }

            <div className="cleaners-tabs">
                <div
                    style={{textAlign:'center'}}
                    className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => {setActiveTab('all'); setTabValue(-1)}}>
                    All
                </div>
                <div
                    style={{textAlign:'center'}}
                    className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
                    onClick={() => {setActiveTab('active'); setTabValue(1)}}>
                    Active
                </div>
                <div
                    style={{textAlign:'center'}}
                    className={`tab-btn ${activeTab === 'inactive' ? 'active' : ''}`}
                    onClick={() => {setActiveTab('inactive'); setTabValue(0)}}>
                    Inactive
                </div>
            </div>

            <div className="grid-container">
                {filteredCleaners.length > 0 ? (
                    filteredCleaners.map(cleaner => (
                        <div key={cleaner.id} className="service-card">
                            <div style={{display: 'block'}}>
                                <h3>{renderName(cleaner.firstName)} {renderName(cleaner.lastName)}</h3>

                                <div style={{display:'flex', alignItems:'baseline', justifyContent: 'space-between'}}>
                                    <FaPhone className={'icon-small'} />
                                    <p>{cleaner.phone}</p>
                                </div>

                                <div style={{display:'flex', alignItems:'baseline', justifyItems:'space-between'}}>
                                    <FaEnvelope className={'icon-small'} />
                                    <p>{cleaner.email}</p>
                                </div>

                                <div style={{display:'flex', alignItems:'baseline', justifyItems:'space-between'}}>
                                    <FaMapMarkerAlt className={'icon-small'} />
                                    <p>{cleaner.postcode}</p>
                                </div>

                                <div style={{display:'flex', alignItems:'baseline', justifyContent: 'space-between'}}>
                                    <p>Status</p>
                                    <span
                                        style={cleaner.isActive === 1 ?
                                            { color: 'green', textAlign:'end', width:'20%'} :
                                            { color: 'red', textAlign:'end', width:'20%'} }>
                                        {cleaner.isActive === 1 ? "Active" : "Inactive"}
                                    </span>
                                </div>

                            </div>
                            {cleaner?.areas?.length > 0  &&  <div className="cleaner-meta">
                                <div className="cleaner-areas">
                                    <h4>Areas Covered:</h4>
                                    {cleaner.areas && <div className="areas-tags">
                                        {cleaner.areas.map((area, index) => (
                                            <span key={index} className="area-tag">{area}</span>
                                        ))}
                                    </div> }

                                </div>

                            </div> }
                            {(messages && cleaner.email === email) && <p>{messages}</p>}

                            {deleteEmail === cleaner.email &&
                                <div style={{display: 'flex', alignItems: 'center', flexDirection:'column', border:'dashed', padding:'10px'}}>
                                    <p>
                                        Are you sure you want to delele <span style={{fontWeight:'bold', color:'darkred'}}>{cleaner.firstName} {cleaner.lastName}</span>'s records? This cannot be undone.
                                    </p>
                                    <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
                                        <button onClick={() => deleteCleaner(cleaner.email)} style={{color:'red'}}>YES</button>
                                        <button onClick={() => setDeleteEmail(null)} style={{color:'green'}}>NO</button>
                                    </div>

                                </div>
                            }

                            <div style={{display: 'flex', alignItems: 'center', gap:'7px', justifyContent:'space-evenly'}}>
                                {cleaner.isActive === 1 ?
                                    <button onClick={() => activateOrDeactivate(cleaner.email, false)}
                                            disabled={(cleaner.email === ids.includes(cleaner.email) || deleteEmail !== null || documents.length > 0)}
                                            style={{color:'red', textAlign:'start'}}>
                                        DISABLE
                                    </button> :
                                    <button onClick={() => activateOrDeactivate(cleaner.email, true)}
                                            style={{color:'black', textAlign:'start'}}
                                            disabled={(cleaner.email === ids.includes(cleaner.email) || deleteEmail !== null || documents.length > 0)}>
                                        ENABLE
                                    </button>
                                }

                                <button onClick={() => setDeleteEmail(cleaner.email)}
                                        style={{color:'darkred', textAlign:'start'}}
                                        disabled={(cleaner.email === ids.includes(cleaner.email) || deleteEmail !== null || documents.length > 0)}>
                                    DELETE
                                </button>

                                <button onClick={() => handleDocs(cleaner)}
                                        style={{color:'darkred', textAlign:'start'}}
                                        disabled={(cleaner.email === ids.includes(cleaner.email) || deleteEmail !== null || documents.length > 0)}>
                                    DOCS
                                </button>

                                <FaUserTie
                                    size={20} style={{width:'20px', alignSelf:'end', marginBottom:'14px'}}
                                    onClick={() => openProfile(cleaner.email)}
                                    disabled={(cleaner.email === ids.includes(cleaner.email) || deleteEmail !== null || documents.length > 0)}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results">
                        <p>{(searchDatabase || searchTerm) ? "No cleaners found matching your criteria" : "No cleaner was found"}</p>
                    </div>
                )}
            </div>
            {loading && <div>Loading...</div>}
        </div>
    );
};

export default Cleaners;