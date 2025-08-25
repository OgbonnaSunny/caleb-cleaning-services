//require('dotenv').config();
import React, { useState, useEffect} from "react";
import { useLocation } from 'react-router-dom'
import Footer from "./Footer";
const API_KEY = import.meta.env.VITE_API_KEY;

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import api from './api.js'

const Sitemap = () => {
    const location = useLocation();
    let currentAddress = "Unknown address";
    if (location.state !== null && location.state !== undefined) {
        currentAddress = location.state.address;
    }

    // Fix default marker icons (React-Leaflet issue)
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    const [position, setPosition] = useState([51.505, -0.09]); // Default position (London)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [address, setAddress] = useState(currentAddress);

    useEffect(() => {
        if (!address) return;

        const geocodeAddress = async () => {
            try {
                setLoading(true);
                const response = await api.get(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
                );

                if (response.data && response.data.length > 0) {
                    const { lat, lon } = response.data[0];
                    setPosition([parseFloat(lat), parseFloat(lon)]);
                    setError(null);
                } else {
                    setError('Address not found');
                }
            } catch (err) {
                setError('Geocoding failed');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        geocodeAddress();
    }, [address]);


    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center'}}>
            <div style={{ width: '100%', position: 'relative' }}>
                {loading && <div style={{ position: 'absolute', zIndex: 1000, background: 'white', padding: '10px' }}>Loading...</div>}
                {error && <div style={{ position: 'absolute', zIndex: 1000, background: 'red', color: 'white', padding: '10px' }}>{error}</div>}
                <MapContainer
                    center={position}
                    zoom={13}
                    style={{ height: '80vh', width: '90%', margin: '0 auto' , marginTop:'50px', borderRadius:'20px', padding: '10px'}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            {address}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>

    );
};

export default Sitemap;

