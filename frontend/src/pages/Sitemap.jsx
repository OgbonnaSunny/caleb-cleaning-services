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
    const currentAddress = location?.state?.address || "Unknown address";

    // Fix default marker icons (React-Leaflet issue)
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    const [position, setPosition] = useState([55.9533, -3.1883]); // Default position (Edinburgh)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [address, setAddress] = useState(currentAddress);
    const [results, setResults] = useState([]);
    const [tempAddress, setTempAddress] = useState('');

    useEffect(() => {
        if (!address) return;

        const geocodeAddress = async () => {
            try {
                setLoading(true);
                /*const response = await axios.get(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
                );*/

                const response = await axios.get(
                    "https://nominatim.openstreetmap.org/search",
                    {
                        params: {
                            format: "json",
                            q: address,
                            countrycodes: "gb", // Restrict to UK
                            limit: 5,
                        },
                    }
                );

                if (response?.data?.length > 0) {
                    const { lat, lon } = response.data[0];
                    setPosition([parseFloat(lat), parseFloat(lon)]);
                    setResults(response.data);
                    setError(null);
                    setTempAddress('')
                } else {
                    setError('No address was found');
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

    const handleSelect = (place) => {
        setPosition([parseFloat(place.lat), parseFloat(place.lon)]);
     //   setResults([]); // clear after selecting
        setAddress(place.display_name); // fill input with chosen address
    };

    useEffect(() => {
        document.title = "Map"
    }, []);


    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center'}}>
            <div style={{ width: '100%', position: 'relative' }}>
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
            {loading && <p style={{margin:'10px'}}>Loading...</p>}
            {error && <p style={{margin:'10px', textAlign:'center'}}>{error}</p>}
            <div className={['support-page', 'idea-container'].join(' ')}>
                {results.length > 0 && (<div style={{ padding: "5px", maxWidth: "400px", marginTop:'10px' }}>
                        <p>Found addresses</p>
                        <ul >
                            {results.map((place, i) => (
                                <li
                                    key={i}
                                    style={{ cursor: "pointer", margin: "4px 0" }}
                                    onClick={() => handleSelect(place)}>
                                    {place.display_name}
                                </li>
                            ))}
                        </ul>
                    </div>)}

                <div style={{ maxWidth:'600px', margin: '10px', gap:'10px', display: 'flex', alignItems: 'center' }}>
                    <input
                        type="text"
                        value={tempAddress}
                        onChange={(e) => setTempAddress(e.target.value)}
                        placeholder="Enter Edinburgh address"
                        className={'button-bg'}
                        style={{ padding: '10px', width:'80%' }}
                    />
                    <button
                        onClick={() => setAddress(tempAddress)}
                        className={'submit-button'}
                        disabled={(loading || !tempAddress)}>
                        Search
                    </button>
                </div>

            </div>
        </div>

    );
};

export default Sitemap;

