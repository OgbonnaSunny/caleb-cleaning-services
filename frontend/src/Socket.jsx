
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const URL = import.meta.env.BACKEND_API_URL;
    const socketRef = useRef(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const s = io(URL, {
            transports: ["websocket", "polling"], // force fallback if needed
        });
        setSocket(s);

        return () => {
            s.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
