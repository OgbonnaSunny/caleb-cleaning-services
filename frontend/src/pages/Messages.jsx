import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import api from './api.js'
import io from "socket.io-client";
import LOGO from "../images/logo4.png";
import { useSocket } from '../Socket.jsx'
import { isToday, differenceInDays, format } from 'date-fns';
import { FaTimes } from 'react-icons/fa';

export default function Messages() {
    const socket = useSocket();
    const scrollerRef = useRef(null);

    const [messagesList, setMessagesList] = useState([]);
    const [pList, setPList] = useState([]);
    const [chatMessage, setChatMessage] = useState('');
    const [sender, setSender] = useState(null);
    const [receiver, setReceiver] = useState(null);
    const [receiverName, setReceiverName] = useState("");
    const [reply, setReply] = useState(null);
    const [senderName, setSenderName] = useState("");
    const [loading, setLoading] = useState(false);
    const [senderReplyName, setSenderReplyName] = useState(null);
    const [replies, setReplies] = useState(false);
    const [adminEmail, setAdminEmail] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) { return; }
            try {
                const response = await api.get('/api/company-email')
                const { email } = response.data;
                const userEmail = user.email;
                if (email === userEmail) {
                    setSender(email);
                    setSenderName("Fly Cleaner");
                    setAdminEmail(null);
                }
                else {
                    setSender(userEmail);
                    setSenderName(user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1));
                    setReceiver(email);
                    setReceiverName("Fly Cleaner")
                    setAdminEmail(email);

                }

            }catch(err) {
                console.log(err);
            }
        }
       fetchData();

    }, []);

    const updateMessage =  (newMessages) => {
        const groupedMesages =  [...messagesList];
        if (groupedMesages.length > 0) {
            newMessages.forEach((message) => {
                let date;
                try {
                    date = new Date(message.created_at).toISOString().split('T')[0];
                    if (isNaN(date.getTime())) throw new Error('Invalid date');
                } catch {
                    date = new Date().toISOString().split('T')[0]; // Fallback to current date
                }
                if (!groupedMesages[date]) {
                    groupedMesages[date] = [];
                }
                groupedMesages[date].push(message);
            })

            return Object.entries(groupedMesages)
                .map(([date, message]) => ({ date, message }))
                .sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        const groupedMessage = newMessages.reduce((groups, message) => {
            let date;
            try {
                date = new Date(message.created_at).toISOString().split('T')[0];
                if (isNaN(date.getTime())) throw new Error('Invalid date');
            } catch {
                date = new Date().toISOString().split('T')[0]; // Fallback to current date
            }
            groups[date] = groups[date] || [];
            groups[date].push(message);
            return groups;
        }, {})

        return  Object.entries(groupedMessage)
            .map(([date, messages]) => ({ date, messages }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));

    }


    const autoReply = () => {
        if (socket === null || adminEmail === null || receiver === null) return;
        setLoading(true);
        api.post('/api/messages/reply', {sender: adminEmail, receiver: sender})
            .then(res => {
                const { messages } = res.data;   // backend sends { messages: rows }
                if (!messages || messages.length <= 0) {
                    socket.emit('send_message', {
                        sender: adminEmail,
                        receiver: sender,
                        text: "Hello there! Thank you for been here. Our representative will be with you shortly.",
                        reply: null,
                        senderName: "Fly Cleaner",
                        receiverName: senderName,
                    });
                    setReplies(true)
                }
            })
            .catch(err => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
        })
    }

    useEffect(() => {
        autoReply();
        scrollerRef.current?.scrollIntoView();
    }, [messagesList]);


    // Load previous messages from DB
    useEffect(() => {
        if (!sender || !receiver) { return; }
        api.post('/api/messages', {sender: sender, receiver: receiver})
            .then(res => {
                const { messages } = res.data;   // backend sends { messages: rows }
                if (messages && messages.length > 0) {
                    setMessagesList(messages);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [sender, receiver]);

    // Listen for incoming messages
    useEffect(() => {
        if (!socket) { return; }
        socket.on('receive_message', (data) => {
            if ((data.sender === sender && data.receiver === receiver) ||
                (data.sender === receiver && data.receiver === sender)) {
                setMessagesList(prev => [...prev, data]);
            }
        });

        return () => {
            socket.off("receive_message");
        };

    }, [sender, receiver]);


    const sendMessage = () => {
        if (!socket) { return; }
        if (chatMessage.trim()) {
            socket.emit('send_message', {
                sender: sender,
                senderName: senderName,
                text: chatMessage,
                reply: reply,
                receiver: receiver,
                receiverName: receiverName,
                senderReplyName: senderReplyName
            });
            setChatMessage('');
            setReply(null);

        }
    };

    const handleChatMessage = (e) => {
        e.preventDefault();
        setChatMessage(e.target.value);
    }


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
        const diff = differenceInDays(new Date(date), new Date());
        if (diff <= 0) {
            return 'yesterday'+ " "+ new Date(date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        if (diff == 1) {
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

    return (
        <div className="sticky-nav-container">
            <div className='top-order-nav'>
                <div style={{marginLeft:'10px', marginTop:'20px'}} className="nav-order-content">
                    <img src={LOGO} className={'logo-icon'}/>
                    <h3 style={{marginBottom:'8px', textAlign:'start'}}>{receiverName}</h3>
                </div>
            </div>

            <main className={["main-content", "main-banner"].join(" ")}>
                {messagesList.map((msg, index) => (
                    <div key={index}>
                        {msg.sender === sender ?
                            <div className="message user1"  onClick={() => {setReply(msg.text); setSenderReplyName(msg.senderName)}}
                                 style={{paddingRight:'10px', display:'flex', justifyContent:'flex-end'}}>
                                <p className="message user1" style={{
                                    display:'inline-block',
                                    background: '#dcf8c6',
                                    padding: '15px 10px',
                                    borderRadius: '8px',
                                    margin: '2px 0',
                                    maxWidth: '70%',
                                    textAlign: 'left',
                                    width: 'fit-content',
                                    whiteSpace: 'wrap',
                                }}>
                                    {(msg.reply && msg.senderReplyName) && <p className={'reply2'}>{msg.senderReplyName === msg.senderName ? 'You' : msg.senderReplyName} <br/> {msg.reply}</p>}
                                    {msg.text}
                                    <br/>
                                    <small style={{color:'darkred'}}>{getTime(msg.created_at)}</small>
                                </p>
                            </div>
                            :
                            <div className="message user2"  onClick={() => {setReply(msg.text); setSenderReplyName(msg.senderName)}}
                                 style={{paddingLeft:'10px', display: 'flex', justifyContent:'flex-start'}}>
                                <p style={{
                                    display:'inline-block',
                                    background: '#fbbfcf',
                                    padding: '15px 10px',
                                    borderRadius: '8px',
                                    margin: '2px 0',
                                    maxWidth: '70%',
                                    textAlign: 'left',
                                    width: 'fit-content',
                                    whiteSpace: 'wrap',
                                }}>
                                    {msg.reply && <p className={'reply2'}>{msg.reply}</p>}
                                    {msg.text}
                                    <br/>
                                    <small style={{color:'black'}}>{getTime(msg.created_at)}</small>
                                </p>
                            </div>

                        }
                    </div>
                ))}
                {messagesList.length <= 0 && (
                    <div
                        style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'10%'}}>
                        <h2 style={{textAlign:'center'}}>Start chatting</h2>
                    </div>)
                }
                <div ref={scrollerRef}></div>
            </main>

            <nav  className='bottom-order-nav'>
                <div>
                    {reply &&
                        <div style={{display: 'flex', justifyContent:'flex-start', alignItems: 'start', flexDirection:'column', marginLeft:'10px'}}>
                            <FaTimes onClick={()=> setReply(null)} size={20} className={'icon-small'} />
                            <p className={'reply'}>{reply}</p>
                        </div>
                    }
                    <div  className={'chat-container'}>
                        <input
                            type="text"
                            value={chatMessage}
                            onChange={handleChatMessage}
                            placeholder="Type a message"
                            className={'button-bg'}
                            style={{ width: '80%' , padding: '13px'}}
                        />
                        <button  onClick={sendMessage} style={{ backgroundColor:'blue', width:'20%'}}>Send</button>
                    </div>
                </div>
            </nav>
        </div>

    );
}
