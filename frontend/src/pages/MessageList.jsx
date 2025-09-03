import React, { useState, useEffect} from "react";
import api from './api.js'
import LOGO from "../images/logo4.png";
import {FaBars} from "react-icons/fa";
import {differenceInDays, format, isToday} from "date-fns";
import { useNavigate} from "react-router-dom";
import { useSocket } from '../Socket.jsx'


const MessageList = () => {
    const navigate = useNavigate();
    const companyEmail = import.meta.env.VITE_COMPANY_EMAIL;

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(10);
    const [email, setEmail] = useState(companyEmail);
    const [count, setCount] = useState(0);
    const [role, setRole] = useState('Support');

    useEffect(() => {
        if (window.innerWidth > 768) {
            setPage(20);
            return;
        }
        setPage(10)
    } );


    useEffect(() => {
        document.title = "Messages";
    })


    const getTime = (date) => {
        const invalidDate = isNaN(new Date(date).getTime());
        if (invalidDate) {
            return new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        const now = isToday(new Date(date));
        if (now) {
            return new Date(date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        const diff = differenceInDays(new Date(), new Date(date));

        if (diff === 1) {
            return 'yesterday'+ " "+ new Date(date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        if (diff === 2) {
            return '2 days ago'+ " "+ new Date(date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        }


        return format(new Date(date), 'yyyy-mm-dd') + " "+ new Date(date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            api.post('/api/messages/all', {receiver: email })
                .then((res) => {
                    const { messages } = res.data;
                    if (messages && messages?.length > 0) {
                        setMessages(messages);
                    }
                    else {
                        setMessage('No messages found.');
                    }

                })
                .catch((err) => {
                    setMessage('Error fetching messages');
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
        if (email !== null && email !== undefined) {
            fetchMessages();
        }
    }, [email]);

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
            minHeight: '100vh',
            flexDirection: 'column'}}>
            <div className={'support-page'}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img src={LOGO} className={'logo-icon'}/>
                    <h1 className="page-title" style={{width:'20%'}}>Messages</h1>
                </div>
                {messages?.length > 0 && <div>
                    {messages.map((msg, i) => (
                        <div onClick={() => navigate('/messages',
                            {state: {receiver: msg.sender_email, receiverName: msg.sender_name, sender: companyEmail, senderName: 'Fly Cleaner'}})}
                             style={{marginBottom:'20px'}} key={i}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <h3 style={{textAlign:'start'}}>{msg.sender_name}</h3>
                                <p style={{textAlign:'end'}}>{getTime(msg.last_message_time)}</p>
                            </div>
                            <div style={{display: 'flex', alignItems: 'baseline'}}>
                                <p className={'reply3'}>{msg.last_message}</p>
                                {msg.new_messages > 0 &&  <p style={{color:'red', width:'10%', alignSelf:'end', textAlign:'end'}}>{msg.new_messages}</p>}
                            </div>
                        </div>
                    ))}
                </div>}
                {message && <p>{message}</p>}
            </div>

        </div>
    );
}

export default MessageList;