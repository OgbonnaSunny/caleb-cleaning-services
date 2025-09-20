// components/Customers.js
import React, {use, useEffect, useState} from 'react';
import { FaSearch, FaUserPlus, FaPhone, FaEnvelope, FaHome, FaHistory, FaEdit, FaUserTie } from 'react-icons/fa';
import api from './api.js';
import LOGO from "../images/logo4.png";
import { format } from 'date-fns';
import {number} from "yup";

const Customers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDatabase, setSearchDatabase] = useState('');
    const [allCustomers, setAllCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [message, setMessage] = useState('No customers found');
    const [id, setId] = useState(-1);
    const [emailMessage, setEmailMessage] = useState('');
    const [emailTitle, setEmailTitle] = useState('');
    const [emailSuccess, setEmailSuccess] = useState('');
    const [loadingEmail, setLoadingEmail] = useState(false);
    const [role, setRole] = useState('Support');
    const [noCustomers, setNoCustomers] = useState(false);

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

    const filteredCustomers = allCustomers.filter(customer =>
        customer.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        if (searchDatabase.length <= 0 || searchTerm.length <= 0) {
            setNoCustomers(false);
            setPageCount(pre => pre + 1);
        }

    }, [searchDatabase, searchTerm])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;

            if (scrollTop + clientHeight >= scrollHeight - 100) {
                if (!loading) {
              //      setPageCount(prev => prev + 1);
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
                const newName =  names[i].charAt(0).toUpperCase() + names[i].slice(1) + " ";
                nameHolder += newName + "";
            }
            return nameHolder;
        }
        return name.toString().charAt(0).toUpperCase() + name.slice(1);
    }

    useEffect(() => {
      //  if(noCustomers) return
        setLoading(true);
        api.get('/api/users/all-customer-booking')
            .then(response => {
                const customers = response.data.booking;
                setAllCustomers(prev => {
                    const map = new Map(prev.map(item => [item.id, item])); // old items
                    customers.forEach(item => map.set(item.id, item));    // add/replace new
                    return Array.from(map.values()).sort((a, b) => a.id - b.id); // convert back to array
                });
                if (customers.length <= 0  ) {
                    setMessage('No customers found.');
                    setNoCustomers(true);
                }

            })
            .catch(error => {
                console.log(error);
                setMessage('Error fetching customers data');
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
                const customers = response.data.booking;
                setAllCustomers(customers);
                if (customers.length <= 0) {
                    setMessage('No customer found.');
                }
            })
            .catch(error => {
                console.log(error);
                setMessage('Error fetching customers data');
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const sendEmail = (email) => {
        if (role === 'Support') {
            setEmailSuccess('You are not authorized to perform this action');
            return;
        }
        if (!email || loadingEmail) return;
        if (!emailMessage || !emailTitle) {
            setEmailSuccess('Please fill all the required fields');
            return;
        }
        setLoadingEmail(true);
        api.post('/api/send-email-to-customer', {to: email, text: emailMessage, subject: emailTitle})
        .then(response => {
            setEmailSuccess(response.data.message);
            if (response.data.success) {
                setEmailMessage('');
                setEmailTitle('')
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            setLoadingEmail(false);
        })
    }

    const copyNumber = (number) => {
        navigator.clipboard.writeText(number).then(text => {
            alert("Copied!");
        })
    }

    function CallButton({ phoneNumber, name }) {
        if (role === 'Support') {
            return null;
        }
        return (
            <div style={{width:'50%'}}>
                <p>
                    <a href={`tel:${phoneNumber}`} style={{ color: "blue" }}>
                        <FaPhone style={{width:'100%'}} size={20}/>
                    </a>
                </p>
            </div>
        );
    }

    useEffect(() => {
        if (emailSuccess !== null) {
            setTimeout(() => setEmailSuccess(null), 5000);
        }
    }, [emailSuccess]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            api.post('/api/users/admin', {email: user.email})
                .then((res) => {
                    const role = res.data.role;
                     setRole(role)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [])


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
                        placeholder="Search database with email..."
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
                                    <h3>{renderName(customer.customer)}</h3>
                                    <p style={{ alignSelf:'end', textAlign:'end'}}>{format(new Date(customer.lastDate), 'yyyy-MM-dd')}</p>

                                </div>
                                <div className="table-cell contact">
                                    <div style={{display: 'flex', alignItems: 'baseline'}}>
                                        <FaPhone style={{width:'20px'}} className="icon-small" />
                                        <p>{customer.phone}</p>
                                        <small style={{textAlign:'end'}}>All Booking: {customer.booking}</small>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'baseline'}} >
                                        <FaEnvelope style={{width:'20px'}} className="icon-small" />
                                        <p>{customer.email}</p>
                                    </div>
                                </div>
                                <div style={{display: 'flex', alignItems: 'baseline'}}>
                                    <FaHome style={{width:'20px'}} className="icon-small" />
                                    <p className="address-box">{customer.address}</p>
                                </div>
                                {id === customer.id &&
                                    <div style={{display: 'flex', flexDirection:'column', padding:'10px', alignItems:
                                            'center', gap:'10px', marginBottom:'20px', border:'dashed'}}>
                                        <input
                                        type="text"
                                        value={emailTitle}
                                        onChange={(e) => setEmailTitle(e.target.value)}
                                        placeholder="title..."
                                        style={{padding:'10px', backgroundColor:'white', color:'black'}}
                                        />
                                        <textarea
                                            rows={5}
                                            placeholder='type a message...'
                                            value={emailMessage}
                                            style={{padding:'10px', backgroundColor:'white', color:'black'}}
                                            onChange={(e) => setEmailMessage(e.target.value)}
                                        />
                                        {loadingEmail && <p>Sending email...</p>}
                                        {(!loadingEmail && emailSuccess) && <p>{emailSuccess}</p>}
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-evenly', gap:'10px'}}>
                                            <button disabled={loadingEmail} onClick={() => sendEmail(customer.email)} className={'submit-button'}>Send</button>
                                            <button disabled={loadingEmail} onClick={() => {setId(-1); setEmailMessage(''); setEmailTitle('')}} className={'back-button'}>Cancel</button>
                                        </div>
                                    </div>
                                }
                                {role !== 'Support' && <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-evenly'}} >
                                    <FaEnvelope onClick={(id === -1 || id === null) ? () => setId(customer.id) : null} size={20} style={{width:'50%'}} />
                                    <CallButton phoneNumber={customer.phone}   />
                                </div>}
                            </div>
                        ))
                    ) : (
                        <div className="no-results-row">
                            <div className="no-results-cell">{message}</div>
                        </div>
                    )}
                </div>
                {loading && <p>Loading...</p>}
            </div>
        </div>
    );
};

export default Customers;