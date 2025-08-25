// components/Customers.js
import React, {useEffect, useState} from 'react';
import { FaSearch, FaUserPlus, FaPhone, FaEnvelope, FaHome, FaHistory, FaEdit } from 'react-icons/fa';
import api from './api.js';
import LOGO from "../images/logo4.png";

const Customers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDatabase, setSearchDatabase] = useState('');
    const [allCustomers, setAllCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [message, setMessage] = useState('');

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

    useEffect(() => {
        if (window.innerWidth > 768) {
            setPage(20);
            return;
        }
        setPage(10)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;

            if (scrollTop + clientHeight >= scrollHeight - 100) {
                if (!loading) {
                    setPageCount(prev => prev + 1);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]);

    useEffect(() => {
        document.title = "Customers";
    })

    const renderName = (name) => {
        const names = name.split(' ');
        if (names.length > 1) {
            let nameHolder = ''
            for (let i = 0; i < names.length; i++) {
                nameHolder =+ names[i].toString().charAt(0).toUpperCase() + names[i].slice(1) + " ";
            }
            return nameHolder;
        }
        return name.toString().charAt(0).toUpperCase() + name.slice(1);
    }

    useEffect(() => {
        setLoading(true);
        let offset = 0;
        if (allCustomers.length > 0) {
            offset = allCustomers[allCustomers.length - 1].id;
        }
        api.post('/api/users/all-customers', {limit: page, offset: offset })
            .then(response => {
                const customers = response.data.customers;
                setAllCustomers(prev => {
                    const map = new Map(prev.map(item => [item.id, item])); // old items
                    customers.forEach(item => map.set(item.id, item));    // add/replace new
                    return Array.from(map.values()).sort((a, b) => a.id - b.id); // convert back to array
                });

            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [pageCount])

    const searchCustomer = () => {
        if (loading) {return;}
        if (!searchDatabase) {
            return;
        }
        setLoading(true);
        api.post('/api/users/customer-search', {search: searchDatabase })
            .then(response => {
                const cleaners = response.data.users;
                setAllCustomers(cleaners);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const sendEmail = (email) => {}

    const copyNumber = (number) => {
        navigator.clipboard.writeText(number).then(text => {
            alert("Copied!");
        })
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures it takes at least full viewport height
        }} className="customers-page">
            <div style={{display: 'flex', alignItems: 'center'}}>
                <img src={LOGO} className={'logo-icon'}/>
                <h1 className="page-title">Customers Management</h1>
            </div>

            <div className="cleaners-header">
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
                    <FaSearch onClick={searchCustomer} style={{width:'40px'}}  />

                </div>
            </div>

            <div className="customers-table">
                <div className="grid-container">
                    {filteredCustomers.length > 0 ? (
                        filteredCustomers.map(customer => (
                            <div key={customer.id} className="service-card">

                                <div style={{display: 'flex', justifyContent: 'stretch', alignItems: 'baseline'}}>
                                    <h3>{customer.category}</h3>
                                    <p style={{ alignSelf:'end', textAlign:'end'}}>{customer.lastBooking}</p>

                                </div>
                                <div className="table-cell contact">
                                    <div style={{display: 'flex', alignItems: 'baseline'}}>
                                        <FaPhone style={{width:'20px'}} className="icon-small" />
                                        <p onClick={() => copyNumber(customer.phone)}>{customer.phone}</p>
                                        <small style={{textAlign:'end'}}>All Booking: {customer.bookings}</small>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'baseline'}} >
                                        <FaEnvelope style={{width:'20px'}} className="icon-small" />
                                        <p>{customer.email}</p>
                                    </div>
                                </div>
                                <div style={{display: 'flex', alignItems: 'baseline'}}>
                                    <FaHome style={{width:'20px'}} className="icon-small" />
                                    <p className="reply3">{customer.address}</p>
                                </div>
                                <div style={{display: 'flex', alignItems: 'baseline'}} >
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
                {loading && <p>Loading...</p>}
            </div>
        </div>
    );
};

export default Customers;