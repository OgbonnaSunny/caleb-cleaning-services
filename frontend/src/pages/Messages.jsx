import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import api from './api.js'
import io from "socket.io-client";
import LOGO from "../images/logo4.png";
import { useSocket } from '../Socket.jsx';
import { isToday, differenceInDays, format } from 'date-fns';
import { FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation } from "react-router-dom";


export default function Messages() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentReceiver = location.state.receiver;
    const currentReceiverName = location.state.receiverName;
    const currentSender = location.state.sender;
    const currentSenderName = location.state.senderName;

   // console.log(currentReceiver, currentReceiverName, currentSender, currentSenderName);

    const companyEmail = import.meta.env.VITE_COMPANY_EMAIL;
    const [replyText, setReplyText] = useState("Hello there! Thank you for been here. Our representative will be with you shortly.");

    const socket1 = useSocket();
    const scrollerRef = useRef(null);
    const messagesContainerRef = useRef(null);

    const [messagesList, setMessagesList] = useState([]);
    const [pList, setPList] = useState([]);
    const [chatMessage, setChatMessage] = useState('');
    const [sender, setSender] = useState(currentSender);
    const [senderName, setSenderName] = useState(currentSenderName);
    const [receiver, setReceiver] = useState(currentReceiver);
    const [receiverName, setReceiverName] = useState(currentReceiverName);
    const [reply, setReply] = useState(null);
    const [loading, setLoading] = useState(false);
    const [senderReplyName, setSenderReplyName] = useState(null);
    const [adminEmail, setAdminEmail] = useState(companyEmail);
    const [statuses, setStatuses] = useState({});
    const [socket, setSocket] = useState(socket1);

    const [prevSender, setPrevSender] = useState(currentReceiver);
    const [prevReceiver, setPrevReceiver] = useState(currentSender);
    const [message, setMessage] = useState(null);
    const [scrolling, setScrolling] = useState(false);

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
        if (socket === null || !adminEmail || !sender || !senderName) return;
        if (adminEmail === sender) return;
        setLoading(true);
        api.post('/api/messages/reply', {receiver: sender})
            .then(res => {
                const { messages } = res.data;   // backend sends { messages: rows }
                if (messages.length <= 0) {
                    socket.emit('send_message', {
                        sender: adminEmail,
                        receiver: sender,
                        text: replyText,
                        reply: null,
                        senderName: "Fly Cleaner",
                        receiverName: senderName,
                    });
                }
            })
            .catch(err => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
        })
    }

    useEffect(() => {
        if (messagesList.length > 2 || sender === adminEmail) return;
        let reply = false;
        let customerSend = false;
        for (let i = 0; i < messagesList.length; i++) {
            if (messagesList[i].text === replyText) {
                reply = true;
            }
            if (messagesList[i].sender === sender) {
                customerSend = true;
            }
        }
        if (!reply && customerSend) {
            autoReply();
        }
    }, [messagesList, sender, receiver, adminEmail]);


    window.addEventListener("scroll", () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        setScrolling(true);

    });

    useEffect(() => {
        if (scrolling) return;
        const timeoutId = setTimeout(() => {
            scrollerRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timeoutId);

    }, [messagesList]);



    // Load previous messages from DB
    useEffect(() => {
        const fetchData = async () => {
            if (!sender || !receiver) { return; }
            setLoading(true);
            try {
                const res = await api.post('/api/messages', {sender: sender, receiver: receiver});
                const { messages } = res.data;
                if (!messages || messages.length <= 0) return;
                setMessagesList(messages);
            } catch (err) {
                console.log(err);
                setMessage("Error fetching messages");
            }finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [sender, receiver]);

    // Listen for incoming messages
    useEffect(() => {
        if (!socket || !sender) { return; }
        socket.on('receive_message', (data) => {
            if ((data.sender === sender && data.receiver === receiver) ||
                (data.sender === receiver && data.receiver === sender)) {
                setMessagesList(prev => [...prev, data]);
                socket.emit("message_delivered", { receiver: receiver });
            }

        }, [sender, receiver]);

        return () => {
            socket.off("receive_message");
        };

    }, [sender, receiver, socket]);

    useEffect(() => {
        if (!socket || !sender) return;

        const handleConnect = () => {

            socket.emit("register_user", { email: sender });

            socket.emit("message_delivered", { receiver: sender });

        };

        socket.on("connect", handleConnect);

        // cleanup when component unmounts or sender changes
        return () => {
            socket.off("connect", handleConnect);
        };
    }, [socket, sender]);


    useEffect(() => {
        if (!socket) return;

        const handleStatusUpdate = ({ email, status }) => {
            setStatuses((prev) => ({
                ...prev,
                [email]: status,
            }));
        };

        socket.on("status_update", handleStatusUpdate);

        return () => {
            socket.off("status_update", handleStatusUpdate);
        };
    }, [socket]);

    useEffect(() => {
        if (!socket || !prevReceiver || !prevSender) return;
        socket.emit("mark_conversation_read", {
            sender: prevSender,
            receiver: prevReceiver,
        });
    }, [prevReceiver, prevSender, messagesList]);

    useEffect(() => {
        if (!socket) return;
        socket.on("conversation_read", ({ sender, receiver}) => {
            // Update all messages in state
            setMessagesList((prev) =>
                prev.map((msg) =>
                    msg.sender === prevSender && msg.receiver === prevReceiver
                        ? { ...msg, status: 'read'} : msg
                )
            );
        });

        return () => {
            socket.off("conversation_read");
        };
    }, [socket, prevReceiver, prevSender]);

    const sendMessage = () => {
        const message = {
            sender: sender,
            senderName: senderName,
            text: chatMessage,
            reply: reply,
            receiver: receiver,
            receiverName: receiverName,
            senderReplyName: senderReplyName
        }
        console.log(message);
        if (!socket) { return; }
        if (!sender || !receiver || !senderName || !receiverName || !chatMessage) { return; }
        socket?.emit('send_message', message);
        setChatMessage('');
        setReply(null);
        console.log('receive_message');
    };

    const handleChatMessage = (e) => {
        e.preventDefault();
        setChatMessage(e.target.value);
        setScrolling(false);
    }

    const getTime = (date) => {

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

        return format(new Date(date), 'yyyy-MM-dd') + " "+ new Date(date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function useLongPress(callback = () => {}, ms = 500) {
        const timeoutRef = useRef(null);

        const start = useCallback((event, data) => {
            timeoutRef.current = setTimeout(() => {
                callback(data, event); // Pass data + event
            }, ms);
        }, [callback, ms]);

        const clear = useCallback(() => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }, []);

        return (data) => ({
            onMouseDown: (e) => start(e, data),
            onTouchStart: (e) => start(e, data),
            onMouseUp: clear,
            onMouseLeave: clear,
            onTouchEnd: clear,
        });
    }

    const handleLongPress = (msg) => {
        setReply(msg.text);
        setSenderReplyName(msg.senderName);
    };

    const longPress = useLongPress(handleLongPress, 700); // 700ms hold

    return (
        <div className="sticky-nav-container">
            <div className='top-order-nav'>
                <div style={{marginLeft:'10px', marginTop:'20px'}} className="nav-order-content">
                    <img src={LOGO} className={'logo-icon'}/>
                    <h3 className={'experience-text'} style={{marginBottom:'8px', textAlign:'start'}}>{receiverName}</h3>
                </div>
            </div>

            <main className={["main-content", "main-banner"].join(" ")}>
                {messagesList.map((msg, index) => (
                    <div style={{marginBottom:'10px'}} key={index}>
                        {msg.sender === sender ?
                            <div
                                   style={{
                                       paddingRight:'10px', display:'flex', justifyContent:'flex-end'}}>
                                <p {...longPress(msg)}  style={{
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
                                    {(msg.reply && msg.senderReplyName) &&
                                        <span className={'reply2'}>{msg.senderReplyName === msg.senderName ? 'You'
                                            : msg.senderReplyName} <br/> {msg.reply}</span>}
                                    {msg.text}
                                    <br/>
                                    <small style={{color:'darkred'}}>{getTime(msg.created_at)}</small>
                                    {(msg.status && msg.status === 'read') ?
                                        <small style={{marginLeft:'3px'}}>seen</small> :
                                        <small style={{marginLeft:'3px'}}>
                                            {(msg.delivered && msg.delivered === 1) ? 'delivered' : 'pending'}
                                        </small>}
                                </p>
                            </div>
                            :
                            <div
                                 style={{paddingLeft:'10px', display: 'flex', justifyContent:'flex-start'}}>
                                <p {...longPress(msg)}  style={{
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

                                    {(msg.reply && msg.senderReplyName) &&
                                        <span className={'reply2'}>{msg.senderReplyName === msg.senderName ? 'You'
                                            : msg.senderReplyName} <br/> {msg.reply}</span>}
                                    {msg.text}
                                    <br/>
                                    <small style={{color:'black'}}>{getTime(msg.created_at)}</small>
                                </p>
                            </div>

                        }
                    </div>
                ))}
                {(messagesList.length <= 0 && !loading) && (<div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'10%'}}>
                        <h2 style={{textAlign:'center'}}>Start chatting</h2>
                    </div>)}
                {loading && <p>Loading messages...</p>}
                {message && <p style={{margin:'20px', textAlign:'center'}}>{message}</p>}
                <div ref={scrollerRef} aria-hidden="true" style={{ height: 0 }}></div>
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
