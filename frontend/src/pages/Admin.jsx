// components/Dashboard.js
import React, { useState, useEffect, useRef } from 'react';
import StatsCard from './StatsCard.jsx';
import Bookings from './Bookings.jsx';
import CleaningSchedule from './CleaningSchedule.jsx';
import ServiceAreas from './ServiceAreas.jsx';
import Sidebar from './Sidebar.jsx';
import { FaPoundSign, FaCalendarCheck, FaUserTie, FaMapMarkerAlt, FaBars, FaTimes, FaCommentDots  } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

import { NavLink, Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUsers, FaUserShield, FaChartLine, FaCog, FaEnvelope, FaFileSignature } from 'react-icons/fa';
import LOGO from '../images/logo4.png';
import api from './api.js'
import { useSocket } from "../Socket.jsx";
import Messages from "./Messages.jsx";

const Admin = () => {
    const navigate = useNavigate();
    const companyEmail = import.meta.env.VITE_COMPANY_EMAIL;
    const socket1 = useSocket();

    const links = [
        {id: 1, category: 'Dashboard', link: '/admin', icon: FaHome },
        {id: 2, category: 'Bookings', link: '/bookinglist', icon: FaCalendarAlt },
        {id: 3, category: 'Cleaners', link: '/cleaners', icon: FaUserShield },
        {id: 4, category: 'Customers', link: '/customers', icon: FaUsers },
        {id: 5, category: 'View reports', link: '/reports', icon: FaChartLine },
        {id: 6, category: 'Settings', link: '/settings', icon: FaCog },
        {id: 7, category: 'Add expenses', link: '/expense', icon: FaPoundSign },
        {id: 8, category: 'Messages', link: '/messagelist', icon: FaCommentDots },
        {id: 9, category: 'Send news letters', link: '/newsletters', icon: FaEnvelope },
    ]

    const edinburghDistricts = [
        {
            id: 1,
            postcode: "EH1",
            category: "Edinburgh City Centre",
            addresses: [
                "1 Princes Street, Edinburgh, EH1 2EQ",
                "The Balmoral Hotel, 1 Princes Street, Edinburgh, EH1 2EQ",
                "Edinburgh Waverley Station, Edinburgh, EH1 1BQ"
            ]
        },
        {
            id: 2,
            postcode: "EH2",
            category: "New Town / City Centre",
            addresses: [
                "The Scotch Whisky Experience, 354 Castlehill, Edinburgh, EH2 4AE",
                "Assembly Rooms, 54 George Street, Edinburgh, EH2 2LR",
                "Harvey Nichols, 30-34 St Andrew Square, Edinburgh, EH2 2AD"
            ]
        },
        {
            id: 3,
            postcode: "EH3",
            category: "West End / Bruntsfield",
            addresses: [
                "The Royal College of Physicians, 9 Queen Street, Edinburgh, EH2 1JQ",
                "The Dome, 14 George Street, Edinburgh, EH2 2PF",
                "Tynecastle Park (Hearts FC), Gorgie Road, Edinburgh, EH11 2NL"
            ]
        },
        {
            id: 4,
            postcode: "EH4",
            category: "West Edinburgh (Murrayfield, Cramond, Davidson Mains)",
            addresses: [
                "Murrayfield Stadium, Roseburn Street, Edinburgh, EH12 5PJ",
                "Cramond Kirk, Cramond Glebe Road, Edinburgh, EH4 6NS",
                "Davidson Mains Park, 5 Quality Street, Edinburgh, EH4 5BP"
            ]
        },
        {
            id: 5,
            postcode: "EH5",
            category: "Trinity, Granton, Newhaven",
            addresses: [
                "Ocean Terminal, Ocean Drive, Edinburgh, EH6 6JJ",
                "Newhaven Harbour, 24 Pier Place, Edinburgh, EH6 4LP",
                "The Trinity Academy, Craighall Road, Edinburgh, EH6 4RT"
            ]
        },
        {
            id: 6,
            postcode: "EH6",
            category: "Leith",
            addresses: [
                "The Royal Yacht Britannia, Ocean Drive, Edinburgh, EH6 6JJ",
                "Leith Theatre, 28-30 Ferry Road, Edinburgh, EH6 4AE",
                "The Shore (Leith’s dining area), 1-3 Shore, Edinburgh, EH6 6QW"
            ]
        },
        {
            id: 7,
            postcode: "EH7",
            category: "Leith Walk, Easter Road, Calton Hill",
            addresses: [
                "Meadowbank Stadium, 200 London Road, Edinburgh, EH7 6AE",
                "Prestonfield House Hotel, Priestfield Road, Edinburgh, EH16 5UT",
                "The Edinburgh Playhouse, 18-22 Greenside Place, Edinburgh, EH1 3AA"
            ]
        },
        {
            id: 8,
            postcode: "EH8",
            category: "Holyrood, Old Town, University of Edinburgh",
            addresses: [
                "The Scottish Parliament, Holyrood, Edinburgh, EH99 1SP",
                "Dynamic Earth, Holyrood Road, Edinburgh, EH8 8AS",
                "University of Edinburgh Old College, South Bridge, Edinburgh, EH8 9YL"
            ]
        },
        {
            id: 9,
            postcode: "EH9",
            category: "Marchmont, Newington, Grange",
            addresses: [
                "The King’s Buildings (University of Edinburgh), Mayfield Road, Edinburgh, EH9 3JL",
                "Royal Commonwealth Pool, 21 Dalkeith Road, Edinburgh, EH16 5BB",
                "Prestonfield Golf Club, Priestfield Road, Edinburgh, EH16 5UT"
            ]
        },
        {
            id: 10,
            postcode: "EH10",
            category: "Morningside, Fairmilehead",
            addresses: [
                "Morningside Library, 184-192 Morningside Road, Edinburgh, EH10 4PD",
                "The Braid Hills Hotel, 134 Braid Road, Edinburgh, EH10 6JD",
                "Fairmilehead Parish Church, 1 Frogston Road West, Edinburgh, EH10 7AA"
            ]
        },
        {
            id: 11,
            postcode: "EH11",
            category: "Gorgie, Dalry, Shandon",
            addresses: [
                "Tynecastle Park (Heart of Midlothian FC), McLeod Street, Edinburgh, EH11 2NL",
                "Gorgie City Farm, 51 Gorgie Road, Edinburgh, EH11 2LA",
                "Dalry Swim Centre, 46 Dalry Road, Edinburgh, EH11 2AW"
            ]
        },
        {
            id: 12,
            postcode: "EH12",
            category: "Corstorphine, Murrayfield, West Coates",
            addresses: [
                "Edinburgh Zoo, 134 Corstorphine Road, Edinburgh, EH12 6TS",
                "Murrayfield Ice Rink, Riverside Crescent, Edinburgh, EH12 5XN",
                "Gyle Shopping Centre, 125 The Gyle Centre, Edinburgh, EH12 9JY"
            ]
        },
        {
            id: 13,
            postcode: "EH13",
            category: "Colinton, Juniper Green, Currie",
            addresses: [
                "Colinton Parish Church, 9 Bridge Road, Edinburgh, EH13 0LQ",
                "Currie Rugby Club, 32 Lanark Road West, Edinburgh, EH13 0PQ",
                "Juniper Green Bowling Club, 170 Lanark Road, Edinburgh, EH13 0DQ"
            ]
        },
        {
            id: 14,
            postcode: "EH14",
            category: "Balerno, Baberton, Wester Hailes",
            addresses: [
                "Balerno Parish Church, 2 Main Street, Balerno, Edinburgh, EH14 7EH",
                "Baberton Golf Club, 50 Baberton Avenue, Edinburgh, EH14 3DR",
                "Wester Hailes Library, 5 Westside Plaza, Edinburgh, EH14 2ST"
            ]
        },
        {
            id: 15,
            postcode: "EH15",
            category: "Portobello, Craigmillar, Joppa",
            addresses: [
                "Portobello Beach Promenade, Edinburgh, EH15 1DB",
                "Portobello Swim Centre, 57 The Promenade, Edinburgh, EH15 1DX",
                "Craigmillar Castle, Craigmillar Castle Road, Edinburgh, EH16 4SY"
            ]
        },
        {
            id: 16,
            postcode: "EH16",
            category: "Liberton, Gilmerton, Craigmillar",
            addresses: [
                "Liberton Kirk, 1 Kirkgate, Edinburgh, EH16 6RR",
                "Royal Infirmary of Edinburgh, 51 Little France Crescent, Edinburgh, EH16 4SA",
                "Gilmerton Community Centre, 4-6 Drum Street, Edinburgh, EH17 8QG"
            ]
        },
        {
            id: 17,
            postcode: "EH17",
            category: "Danderhall, Newcraighall, Edgefield",
            addresses: [
                "Danderhall Medical Centre, 1 Oak Lane, Danderhall, Edinburgh, EH16 4EX",
                "Newcraighall Parish Church, 1 Newcraighall Road, Edinburgh, EH21 8SF",
                "Edinburgh College (Milton Road Campus), 24 Milton Road East, Edinburgh, EH15 2PP"
            ]
        },
        {
            id: 18,
            postcode: "EH28",
            category: "Kirkliston, Newbridge, Ratho",
            addresses: [
                "Kirkliston Leisure Centre, 37 Station Road, Kirkliston, EH29 9AQ",
                "Ratho Park Golf Club, 7 Baird Road, Ratho, EH28 8RA",
                "Newbridge Industrial Estate, 1 Newbridge Industrial Estate, EH28 8PJ"
            ]
        },
        {
            id: 19,
            postcode: "EH29",
            category: "Kirkliston, Winchburgh",
            addresses: [
                "Kirkliston Primary School, The Loan, Kirkliston, EH29 9EB",
                "Winchburgh Community Centre, 6-8 High Street, Winchburgh, EH52 6HW",
                "Drumshoreland Garden Centre, 5 Drumshoreland Road, Kirkliston, EH29 9DU"
            ]
        },
        {
            id: 20,
            postcode: "EH30",
            category: "South Queensferry, Dalmeny",
            addresses: [
                "Forth Bridge, South Queensferry, EH30 9SF",
                "Dalmeny House, South Queensferry, EH30 9TQ",
                "Hopetoun Farm Shop, South Queensferry, EH30 9SL"
            ]
        },

        {
            id: 21,
            category: "Duddingston",
        },
        {
            id: 22,
            category: "East Craigs",
        },
        {
            id: 23,
            category: "Ferniehill",
        },
        {
            id: 24,
            category: "Gogar",
        },
        {
            id: 25,
            category: "Ingliston",
        },
        {
            id: 26,
            category: "Kaimes",
        },
        {
            id: 27,
            category: "Liberton (Greater)",
        },
        {
            id: 28,
            category: "Little France",
        },
        {
            id: 29,
            category: "Mayfield",
        },
        {
            id: 30,
            category: "Moredun",
        },
        {
            id: 31,
            category: "King's Knowe",
        },
        {
            id: 32,
            category: "Muirhouse",
        },
        {
            id: 33,
            category: "Oxgangs",
        },
        {
            id: 34,
            category: "Pentland Hills",
        },
        {
            id: 35,
            category: "Ratho Station",
        },
        {
            id: 36,
            category: "Sighthill",
        },
        {
            id: 37,
            category: "Slateford",
        },
        {
            id: 38,
            category: "Swanston",
        },
        {
            id: 39,
            category: "The Inch",
        },

        {
            id: 40,
            postcode: "EH18",
            category: "Lasswade",
            addresses: [
                "Lasswade High School, Eskdale Drive, Lasswade, EH18 1PB",
                "Danderhall Medical Centre, 1 Oak Lane, Danderhall, EH18 1BU",
                "Polton Mill, Lasswade Road, EH18 1PP"
            ]
        },
        {
            id: 41,
            postcode: "EH19",
            category: "Bonnyrigg",
            addresses: [
                "Bonnyrigg Town Hall, High Street, Bonnyrigg, EH19 2AE",
                "Lochrin Kennels, 22 Broomieknowe, Bonnyrigg, EH19 2JG",
                "Newbattle Abbey College, Newbattle Road, EH19 3JA"
            ]
        },
        {
            id: 42,
            postcode: "EH20",
            category: "Loanhead",
            addresses: [
                "Loanhead Leisure Centre, Clerk Street, Loanhead, EH20 9DR",
                "IKEA Edinburgh, Straiton Retail Park, EH20 9PW",
                "Pentland Hills Regional Park, EH20 9QZ"
            ]
        },
        {
            id: 43,
            postcode: "EH21",
            category: "Musselburgh",
            addresses: [
                "Musselburgh Racecourse, Linkfield Road, EH21 7RG",
                "The Brunton Theatre, Ladywell Way, EH21 6AA",
                "Musselburgh Golf Club, Monktonhall, EH21 6SW"
            ]
        },
        {
            id: 44,
            postcode: "EH22",
            category: "Dalkeith",
            addresses: [
                "Dalkeith Country Park, EH22 2NA",
                "St David's RC High School, Cousland Road, EH22 2PS",
                "Eskmills Railway Station, EH22 1AG"
            ]
        },
        {
            id: 45,
            postcode: "EH23",
            category: "Gorebridge",
            addresses: [
                "Gorebridge Leisure Centre, Hunterfield Road, EH23 4TT",
                "Arniston House, Gorebridge, EH23 4RY",
                "Newtongrange Railway Station, EH23 4LF"
            ]
        },
        {
            id: 46,
            postcode: "EH24",
            category: "Roslin",
            addresses: [
                "Rosslyn Chapel, Chapel Loan, EH25 9PU",
                "Roslin Institute, EH25 9RG",
                "Bilston Glen Industrial Estate, EH25 9SP"
            ]
        },
        {
            id: 47,
            postcode: "EH25",
            category: "Roslin",
            addresses: [
                "Roslyn Glen Country Park, EH25 9LX",
                "Eskview Medical Centre, 1 Eskview Terrace, EH25 9JA",
                "Roslin War Memorial, EH25 9PX"
            ]
        },
        {
            id: 48,
            postcode: "EH26",
            category: "Easter Bush",
            addresses: [
                "The Royal (Dick) School of Veterinary Studies, EH25 9RG",
                "Bush House, Easter Bush Campus, EH25 9RG",
                "Pentland Hills Walking Routes, EH26 0PJ"
            ]
        },
        {
            id: 49,
            postcode: "EH27",
            category: "Kirknewton",
            addresses: [
                "Kirknewton War Memorial, EH27 8DA",
                "East Calder Library, Langton Road, EH27 8DQ",
                "Harperrig Reservoir, EH27 8DN"
            ]
        },
        // council
        { id: 50, category: "Midlothian", type: "Council Area", notable: "Local government region south of Edinburgh" },
        { id: 53, category: "Penicuik", type: "Town", notable: "Former paper-mill town near Pentland Hills" },
        { id: 54, category: "Loanhead", type: "Town", notable: "Home to Straiton Retail Park" },
        { id: 56, category: "Newtongrange", type: "Village", notable: "National Mining Museum Scotland" },
        { id: 58, category: "Bilston", type: "Village", notable: "Bilston Glen Viaduct" },
        { id: 59, category: "Lasswade", type: "Village", notable: "Polton Mill and scenic river walks" },

        // Villages (IDs 60-79)
        { id: 60, category: "Mayfield", type: "Village", notable: "Post-war residential development" },
        { id: 61, category: "Eskbank", type: "Village", notable: "Eskbank Railway Station (heritage line)" },
        { id: 62, category: "Auchendinny", type: "Village", notable: "18th-century paper mill ruins" },
        { id: 63, category: "Temple", type: "Village", notable: "Knights Templar connections" },
        { id: 64, category: "Carrington", type: "Village", notable: "Rural farmland and Carrington Church" },
        { id: 65, category: "Rosewell", type: "Village", notable: "Roslin Glen Country Park access" },
        { id: 66, category: "Pathhead", type: "Village", notable: "Pathhead Sands and Prestonhall Estate" },
        { id: 67, category: "Fushiebridge", type: "Hamlet", notable: "Fushiebridge Inn and Fala Flow" },
        { id: 68, category: "North Middleton", type: "Village", notable: "Middleton Limeworks" },
        { id: 69, category: "Glencreg", type: "Hamlet", notable: "Glencreg House" },
        { id: 70, category: "Howgate", type: "Hamlet", notable: "Howgate Inn (historic coaching stop)" },
        { id: 71, category: "Edinburgh Airport", type: "Area", notable: "Technically in West Lothian but serves Midlothian" },
        { id: 72, category: "Borthwick", type: "Village", notable: "Borthwick Castle (15th-century fortress)" },
        { id: 73, category: "Crichton", type: "Village", notable: "Crichton Collegiate Church" },
        { id: 74, category: "Vogrie", type: "Hamlet", notable: "Vogrie Country Park" },
        { id: 75, category: "Tynewater", type: "Village", notable: "Tyneholm Farm" },
        { id: 76, category: "Newlandrig", type: "Hamlet", notable: "Small farming community" },
        { id: 77, category: "Edgehead", type: "Village", notable: "Near A68 scenic route" },
        { id: 78, category: "Tynedale", type: "Area", notable: "Tyne Valley walks" },
        { id: 79, category: "Fala", type: "Village", notable: "Fala Flow moorland" },

        // Historical/Outlying Areas (IDs 80-99)
        { id: 80, category: "Arniston", type: "Estate", notable: "Arniston House (historic mansion)" },
        { id: 81, category: "Prestonhall", type: "Estate", notable: "Prestonhall House" },
        { id: 82, category: "Polton", type: "Village", notable: "Polton Mill and River North Esk" },
        { id: 83, category: "Temple Kirk", type: "Ruins", notable: "Medieval church ruins" },
        { id: 84, category: "Birkenside", type: "Hamlet", notable: "Birkenside House" },
        { id: 85, category: "Sheriffhall", type: "Junction", notable: "Major road interchange" },
        { id: 86, category: "Smeaton", type: "Hamlet", notable: "Smeaton House" },
        { id: 87, category: "Easter Howgate", type: "Hamlet", notable: "Near Howgate Inn" },
        { id: 88, category: "Oatslie", type: "Area", notable: "Residential part of Penicuik" },
        { id: 89, category: "Hillend", type: "Area", notable: "Hillend Ski Centre (Pentlands)" },
        { id: 90, category: "Nine Mile Burn", type: "Hamlet", notable: "Scenic stop on A702" },
        { id: 91, category: "Silverburn", type: "Park", notable: "Silverburn Park in Penicuik" },
        { id: 92, category: "Glencorse", type: "Area", notable: "Glencorse Barracks" },
        { id: 93, category: "Mortonhall", type: "Estate", notable: "Mortonhall Caravan Park" },
        { id: 94, category: "Gowkley Moss", type: "Landmark", notable: "Peatland area" },
        { id: 95, category: "Cauldcoats", type: "Hamlet", notable: "Near Gorebridge" },
        { id: 96, category: "Ford", type: "Hamlet", notable: "Fordel Hill" },
        { id: 97, category: "Salters Road", type: "Area", notable: "Industrial zone in Dalkeith" },
        { id: 98, category: "Eldindean", type: "Farm", notable: "Rural farmland" },
        { id: 99, category: "Glenholm", type: "Valley", notable: "Remote glen in Pentlands"}

    ];

    const show = {display:'', marginTop: '40px', marginBottom: '40px'};
    const hide = {display:'none' , marginTop: '40px', marginBottom: '40px' }

    const active = {color:'green', width:'40px', height:'30px', marginRight: '20px'};
    const notActive = {color:' ', width:'40px', height:'30px', marginRight: '20px'};

    const [showPanel, setShowPanel] = useState(false);
    const [activeLink, setActiveLink] = useState(links[0].link);
    const [messageCount, setMessageCount] = useState(0);

    const [revenueToday, setRevenueToday] = useState(0);
    const [revenueTodayTrend, setRevenueTodayTrend] = useState('neutral');
    const [revenueTodayChange, setRevenueTodayChange] = useState('+0%');

    const [revenueMonth, setRevenueMonth] = useState(0);
    const [revenueMonthTrend, setRevenueMonthTrend] = useState('neutral');
    const [revenueMonthChange, setRevenueMonthChange] = useState('+0%');

    const [expense, setExpense] = useState(0);
    const [expenseChange, setExpenseChange] = useState('+0%');
    const [expenseTrend, setExpenseTrend] = useState('neutral');

    const [monthExpense, setMonthExpense] = useState(0);
    const [monthExpenseTrend, setMonthExpenseTrend] = useState('neutral');
    const [monthExpenseChange, setMonthExpenseChange] = useState('+0%');

    const [bookingToday, setBookingToday] = useState(0);
    const [bookingTrend, setBookingTrend] = useState('neutral');
    const [bookingChange, setBookingChange] = useState('+0%');

    const [monthBooking, setMonthBooking] = useState(0);
    const [monthBookingTrend, setMonthBookingTrend] = useState('neutral');
    const [monthBookingChange, setMonthBookingChange] = useState('neutral');

    const [activeCleaners, setActiveCleaners] = useState(0);
    const [activeCleanersTrend, setActiveCleanersTrend] = useState('neutral');
    const [activeCleanerChange, setActiveCleanerChange] = useState('+0%');

    const [areaCovered, setAreaCovered] = useState(0);
    const [jobCount, setJobCount] = useState(0);

    const [email, setEmail] = useState(companyEmail);
    const [socket, setSocket] = useState(socket1);

    const statsData = [
        { title: "Today's Booking", value: `${bookingToday}`, change: `${bookingChange}`, icon: <FaCalendarCheck />, trend: `${bookingTrend}` },
        { title: "Today's Revenue", value: `£${revenueToday}`, change: `${revenueTodayChange}`, icon: <FaPoundSign />, trend: `${revenueTodayTrend}` },
        { title: "This Month's Booking ", value: `${monthBooking}`, change: `${monthBookingChange}`, icon: <FaCalendarCheck />, trend: `${monthBookingTrend}` },
        { title: "This Month's Revenue", value: `£${revenueMonth}`, change: `${revenueMonthChange}`, icon: <FaPoundSign />, trend: `${revenueMonthTrend}` },
        { title: "Today's Expenses", value: `£${expense}`, change: `${expenseChange}`, icon: <FaPoundSign />, trend: `${expenseTrend}` },
        { title: "This Month's Expenses", value: `£${monthExpense}`, change: `${monthExpenseChange}`, icon: <FaPoundSign />, trend: `${monthExpenseTrend}` },
        { title: "Active Cleaners", value: `${activeCleaners}`, change: `${activeCleanerChange}`, icon: <FaUserTie />, trend: `${activeCleanersTrend}` },
        { title: "Areas Covered", value: `${areaCovered}`, change: "+0%", icon: <FaMapMarkerAlt />, trend: 'neutral' }
    ];


    useEffect(() => {
        document.title = 'Admin';
    })

    const trendLevel = (previous, current) => {
        let trend = Number(current) - Number(previous);
        if (trend > 0) return 'up';
        if (trend < 0) return 'down';
        return 'neutral';
    }

    const changeLevel = (previous, current) => {
        const incomeSum = Number(current) + Number(previous);
        const incomeDiff = Number(current) - Number(previous);
        let change = (Number(incomeDiff / incomeSum) * 100) || 0;
        if (change < 0) {
            return `${Math.round(change)}%`;
        }
        return `+${Math.round(change)}%`
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await api.get('/api/messages/admin');
                const messages = await response.data.messages;
                setMessageCount(messages);

                response = await api.get('/api/revenue/today');
                const incomeToady = response.data.incomes[0].today_income;
                const booking = response.data.incomes[0].today_booking;
                const yesterday_booking = response.data.incomes[0].yesterday_booking;
                const yesterdayIcome = response.data.incomes[0].yesterday_income;

                setRevenueToday(incomeToady);
                setBookingToday(booking);
                setBookingTrend(trendLevel(yesterday_booking, booking));
                setBookingChange(changeLevel(yesterday_booking, booking));

                setRevenueTodayTrend(trendLevel(yesterdayIcome, incomeToady));
                setRevenueTodayChange(changeLevel(yesterdayIcome, incomeToady))

                response = await api.get('/api/revenue/month');
                const incomeMonth = response.data.incomes[0].this_month;
                const lastMonth = response.data.incomes[0].last_month;

                const this_month_booking = response.data.incomes[0].this_month_booking;
                const last_month_booking = response.data.incomes[0].last_month_booking;

                setRevenueMonth(incomeMonth);
                setMonthBooking(this_month_booking);

                setRevenueMonthTrend(trendLevel(lastMonth, incomeMonth));
                setRevenueMonthChange(changeLevel(lastMonth, incomeMonth));

                setMonthBookingTrend(trendLevel(last_month_booking, this_month_booking));
                setMonthBookingChange(changeLevel(last_month_booking, this_month_booking));

                response = await api.get('/api/expenses/today')
                const expenseToday = response.data.expenses[0].today_expenses;
                const expenseYesterday = response.data.expenses[0].yesterday_expenses;
                setExpense(expenseToday);
                setExpenseTrend(trendLevel(expenseYesterday, expenseToday));
                setExpenseChange(changeLevel(expenseYesterday, expenseToday));

                response = await api.get('/api/expenses/month')
                const thisMonth = response.data.expenses[0].this_month;
                const lastMonthExp = response.data.expenses[0].last_month;
                setMonthExpense(thisMonth)
                setExpenseChange(changeLevel(lastMonthExp, thisMonth));
                setMonthExpenseTrend(trendLevel(lastMonthExp, thisMonth));

                response = await api.get('/api/booking/active-cleaners')
                setActiveCleaners(response.data.cleaners[0].active_cleaners);

                response = await api.get('/api/users/areas-covered')
                setAreaCovered(response.data.areas[0].area_covered);

                response = await api.get('/api/booking/get-approval-count')
                setJobCount(response.data.bookingApproval[0].approvals)

            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    })

    useEffect(() => {
        if (!socket) { return; }
        socket.on('receive_message', (data) => {
            if (data.receiver === email) {
                setMessageCount(prev => prev + 1);
            }
        });

        return () => {
            socket.off("receive_message");
        };

    }, []);

    useEffect(() => {
        if (!socket || !email) return;

        const handleConnect = () => {

            socket.emit("register_user", { email: email });

            socket.emit("message_delivered", { receiver: email });

        };

        socket.on("connect", handleConnect);

        // cleanup when component unmounts or sender changes
        return () => {
            socket.off("connect", handleConnect);
        };
    }, [socket, email]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            marginTop:"20px"// Ensures it takes at least full viewport height
        }}>
            <div className={'admin-container'}>
                <div className={['slide-box', 'panel', showPanel ? 'slide-in' : 'slide-out'].join(' ')}  >
                    <div className="sidebar" >
                        <div style={{display: 'flex', justifyContent: 'end', alignItems: 'baseline', width: '100%'}}>
                            <img src={LOGO} alt="logo" style={{width:'100px', height:'100px'}} />
                            < FaTimes style={{height: '40px', alignSelf: 'end', alignContent:'end', marginBottom:'30px'}}
                                      onClick={() => setShowPanel(false) }
                            />
                        </div>
                        <nav className="sidebar-nav">
                            {links.map(link => (
                                <div key={link.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'start', marginTop: '20px'}} >
                                    <link.icon  style={link.link === activeLink ? active : notActive} />
                                    <Link
                                        to={link.link} style={link.link === activeLink ?
                                        {color:'green'} : {color: ""}}>
                                        {link.category}
                                        {link.category === 'Messages' && <small style={{color:'red', paddingLeft:'5px'}}>({messageCount})</small>}
                                    </Link>
                                </div>
                            ))}

                        </nav>
                    </div>
                </div>
                <div className={'dash'}>
                    <div className="dashboard">
                        <div style={{display:'flex', justifyContent:'start', alignItems: 'center', marginLeft:'10px', maxWidth:'800px'}}>
                            <div style={{display: 'flex', justifyContent:'flex-start', alignItems: 'center'}}>
                                <img src={LOGO} className={'logo-icon'}/>
                                <FaBars size={25} onClick={() => setShowPanel(!showPanel)} style={{width:'30px'}}/>
                                <h1 className="page-title" style={{width:'20%'}}>Dashboard</h1>
                            </div>
                            <div style={{display:'flex', alignItems:'center', justifyContent:"space-evenly", maxWidth:'40%'}}>
                                <label style={{color:'red', display:'flex', alignItems:'center', fontSize:'large'}}>
                                    <FaEnvelope onClick={() => navigate('/messagelist')} size={40} style={{width:'30px', color:'black'}} />
                                    {messageCount}
                                </label>

                                <label style={{color:'red', display:'flex', alignItems:'center', fontSize:'large'}}>
                                    <FaFileSignature onClick={() => navigate('/bookinglist')} size={40} style={{width:'30px', color:'black'}} />
                                    {jobCount}
                                </label>
                            </div>
                        </div>
                        <div style={{padding:'10px'}} className="grid-container">
                            {statsData.map((stat, index) => (
                                <StatsCard
                                    key={index}
                                    title={stat.title}
                                    value={stat.value}
                                    change={stat.change}
                                    icon={stat.icon}
                                    trend={stat.trend}
                                />
                            ))}

                        </div>
                        <div className="dashboard-content">
                            <div className="content-left">
                                <Bookings
                                    cancellable={false}
                                    user={'admin'}
                                />
                            </div>
                            <div className="content-right">
                                <ServiceAreas />
                                <CleaningSchedule />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;