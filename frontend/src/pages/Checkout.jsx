import React, {useRef, useEffect, useState, useCallback, memo, useMemo} from "react";
import { FaArrowLeft, FaArrowRight, FaTimes,  FaCheck } from 'react-icons/fa';
import {Link, useLocation } from 'react-router-dom'
import Payment,  { fetchData } from "./Payment.jsx";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BedroomIcon from '../images/bedIcon.png'
import KitchenIcon from '../images/kitchenIcon.png'
import OfficeIcon from '../images/officeIcon.png'
import ConservatoryIcon from '../images/conservatoryIcon.png'
import ToiletIcon from '../images/toiletIcon.png'
import BathroomIcon from '../images/bathroomIcon.png'
import StaircaseIcon from '../images/staircaseIcon.png'
import LivingRoomIcon from '../images/livinRoomIcon.png'
import HallIcon from '../images/hallIcon.png'
import GarageIcon from '../images/garageIcon.png'
import { MdAdd, MdRemove,  MdArrowDownward, MdArrowUpward, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'; // Material Design icons
import FridgeIcon from '../images/fridgeIcon.png'
import WindowIcon from '../images/windowIcon.png'
import BookcaseIcon from '../images/bookcaseIcon.png'
import IroningIcon from '../images/ironingIcon.png'
import MicrowaveIcon from '../images/microwaveIcon.png'
import KitchenInsideIcon from '../images/kitchenInside.png'
import OutdoorIcon from '../images/outdoorIcon.png'
import BedmakingIcon from '../images/bedmakingIcon.png'
import OvenAndGrill from '../images/ovenAndGrill.png'
import OvenIcon from '../images/ovenIcon.png'
import LaundryIcon from '../images/laundryIcon.png'
import EcoFrienly from '../images/ecoFriendly.png'
import DiningRoomIcon from '../images/diningRoomIcon.png'
import LoungeIcon from '../images/loungeIcon.png'
import CarpetIcon from '../images/carpetIcon.png'
import Decimal from 'decimal.js';
import { format } from 'date-fns';
import services from "./Services.jsx";
import Info from '../images/info.png'
import { isToday, differenceInDays } from 'date-fns';
import CheckoutHome from "./CheckoutHome.jsx";
import { loadStripe } from '@stripe/stripe-js';
import api from "./api.js";
import {
    Elements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import { useFormik } from 'formik';
import { debounce } from 'lodash';
import LOGO from "../images/logo4.png";
import {Surface} from "recharts";

const Checkout = () => {
    const STRIPE_KEY = import.meta.env.VITE_STRIPE_API_KEY;
   // const stripePromise = loadStripe('pk_test_51RhdyVQNUBqNulPTRgAGcLgdBJZZQPNfRkXoXwnQUGhZxPN8CFIz5PI2gGzKr3vLDa2GZVpyVDEMYuolsSKIeNU200wT5VRLe0');
    const stripePromise = loadStripe(STRIPE_KEY);
    const location = useLocation();
    const { postcode } = location.state || {};
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    const currentPostcode = (postcode !== null && postcode !== undefined) ? postcode : "SW1A 1AA";

    const cleaningFAQs = [
        {
            id: 1,
            question: "What is the minimal cleaning duration?",
            answer: "The minimum duration for any cleaning is 3 hours. All of the hours are charged by the minute. If your cleaning job is estimated to be less than 3 hours and you want to use all the hours, just leave comments in your booking with the extra tasks you want to be completed."
        },
        {
            id: 2,
            question: "What is an estimated price and an estimated duration?",
            answer: "In our system we estimate how much time we need to clean every room you choose. We guarantee to complete your cleaning job within the estimated time + 1 hr. All properties are different. That is why we give this extra hour to a cleaner in case he/she needs some more time to complete your job. As we charge customers by Pay as You Go approach, you will pay only for the real time a cleaner worked at your property. If the cleaning job is completed faster than it was estimated, you will pay less. In case your cleaning job took longer time, you will pay a little bit more, but never more than 1 hour extra."
        },
        {
            id: 3,
            question: "What if I want to limit my booking by fixed hours?",
            answer: "We don't have a choice of fixed hours, because we estimate the cleaning time based on the clients' booking requirement. However, if you wish to limit the cleaning to a specific hour, you can leave comments in your order. In this case we cannot guarantee to complete the cleaning within this time, but the cleaner will do their best."
        },
        {
            id: 4,
            question: "Why is the price so different when I choose the level of dirt?",
            answer: "We charge clients by Pay as you Go approach based on the real time a cleaner works. When you choose a higher level of dirt it means a cleaner needs more time to complete your job. The final price is determined once the job is completed. Dirt level Medium is default level for End of tenancy cleaning."
        },
        {
            id: 5,
            question: "What if I don't like the cleaning quality?",
            answer: "To be sure a cleaning service is provided according to a high standard, we ask our customers to check the job at the end, if you are at home. The cleaner will re-clean missed areas. In case you are not able to check the job immediately, we request that you report the problem within next 24 hours. In this case we will send you a supervisor if needed to re-clean."
        },
        {
            id: 6,
            question: "What is included in our Disinfection Service?",
            answer: "Disinfection includes the cleaning of all areas (with disinfectant) that are routinely touched such as light switches, desks, toilets, chairs, sinks, doorframes, doorknobs, handles, remotes, keypads, buttons, and counters."
        },
        {
            id: 7,
            question: "How many items(shirts, skirts, trousers) can be ironed per hour?",
            answer: "There are many factors that determine the amount of ironing that can be completed in an hour. Typically, our Fly cleaners can complete around 5/6 Shirts and 2 Trousers/Skirts during this time. If more time is required, please discuss with your fly cleaner."
        }
    ];

    const roomEstimates = [
        {
            id: 1,
            plan: "Bedroom",
            time: "≈25min",
            time2: 25,
            src: BedroomIcon,
            count: 0,
            unitPrice: 7.09,
            totalPrice: 0
        },
        {
            id: 2,
            plan: "Living/Dining",
            time: "≈30min",
            time2: 30,
            src: LivingRoomIcon,
            count: 0,
            unitPrice: 8.5,
            totalPrice: 0
        },
        {
            id: 3,
            plan: "Bathroom",
            time: "≈45min",
            time2: 45,
            src: BathroomIcon,
            count: 0,
            unitPrice: 12.75,
            totalPrice: 0
        },
        {
            id: 4,
            plan: "Hall",
            time: "≈10min",
            time2: 10,
            src: HallIcon,
            count: 0,
            unitPrice: 2.84,
            totalPrice: 0
        },
        {
            id: 5,
            plan: "Staircase",
            time: "≈15min",
            time2: 15,
            src: StaircaseIcon,
            count: 0,
            unitPrice: 4.25,
            totalPrice: 0
        },
        {
            id: 6,
            plan: "Toilet",
            time: "≈15min",
            time2: 15,
            src: ToiletIcon,
            count: 0,
            unitPrice: 4.25,
            totalPrice: 0
        },
        {
            id: 7,
            plan: "Kitchen",
            time: "≈45min",
            time2: 45,
            src: KitchenIcon,
            count: 0,
            unitPrice: 12.75,
            totalPrice: 0
        },
        {
            id: 8,
            plan: "Office room",
            time: "≈20min",
            time2: 20,
            src: OfficeIcon,
            count: 0,
            unitPrice: 5.67,
            totalPrice: 0
        },
        {
            id: 9,
            plan: "Conservatory",
            time: "≈25min",
            time2: 25,
            src: ConservatoryIcon,
            count: 0,
            unitPrice: 7.09,
            totalPrice: 0
        },
        {
            id: 10,
            plan: "Garage",
            time: "≈30min",
            time2: 30,
            src: GarageIcon,
            count: 0,
            unitPrice: 8.5,
            totalPrice: 0
        }
    ];

    const applienceEstimates = [

        {
            id: 11,
            plan: "Fridge (inside)",
            time: "≈30min",
            time2: 30,
            src: FridgeIcon,
            count: 0,
            unitPrice: 8.5,
            totalPrice: 0
        },
        {
            id: 12,
            plan: "Windows (inside)",
            time: "≈20min",
            time2: 20,
            src: WindowIcon,
            count: 0,
            unitPrice: 5.67,
            totalPrice: 0
        },
        {
            id: 13,
            plan: "Ironing",
            time: "≈60min",
            time2: 60,
            src: IroningIcon,
            count: 0,
            unitPrice: 17,
            totalPrice: 0
        },
        {
            id: 14,
            plan: "Microwave (inside)",
            time: "≈10min",
            time2: 10,
            src: MicrowaveIcon,
            count: 0,
            unitPrice: 2.84,
            totalPrice: 0
        },
        {
            id: 15,
            plan: "Kitchen (inside)",
            time: "≈60min",
            time2: 60,
            src: KitchenInsideIcon,
            count: 0,
            unitPrice: 17,
            totalPrice: 0
        },
        {
            id: 16,
            plan: "Bed making",
            time: "≈10min",
            time2: 10,
            src: BedmakingIcon,
            count: 0,
            unitPrice: 2.84,
            totalPrice: 0
        },
        {
            id: 17,
            plan: "Bookcase",
            time: "≈25min",
            time2: 25,
            src: BookcaseIcon,
            count: 0,
            unitPrice: 7.09,
            totalPrice: 0
        },
    ]

    const optionEstimates = [
        {id: 71,
            plan: "Laundry",
            time: "",
            time2: 0,
            addition: "(Additional £9)",
            no: "No",
            yes: "Yes",
            src: LaundryIcon,
            count: 0,
            additionPrice: 0,
            unitPrice: 9,
            totalPrice: 0
        },
        {id: 72,
            plan: "Oven",
            time: "≈30min",
            time2: 30,
            addition: "(Additional £25)",
            no: "No",
            yes: "Yes",
            src: OvenIcon,
            count: 0,
            additionPrice: 25,
            unitPrice: 33.5,
            totalPrice: 0
        },
        {id: 73,
            plan: "Oven & Grill",
            time: "≈45min",
            time2: 45,
            addition: "(Additional £35)",
            no: "No",
            yes: "Yes",
            src: OvenAndGrill,
            count: 0,
            additionPrice: 35,
            unitPrice: 47.75,
            totalPrice: 0
        },
    ]

    const endOfTenancyServices = [
        {
            id: 1,
            plan: "Single Bedroom",
            unitPrice: 24,
            time: "£24",
            time2: 30,
            src: BedroomIcon,
            count: 0,
            totalPrice: 0
        },
        {
            id: 2,
            plan: "Double Bedroom",
            unitPrice: 32,
            time: "£32",
            time2: 40,
            src: BedroomIcon,
            count: 0,
            totalPrice: 0
        },
        {
            id: 3,
            plan: "Living room",
            unitPrice: 32,
            time: "£32",
            time2: 40,
            src: LivingRoomIcon,
            count: 0,
            totalPrice: 0
        },
        {
            id: 4,
            plan: "Dining room",
            unitPrice: 32,
            time: "£32",
            time2: 40,
            src: DiningRoomIcon,
            count: 0,
            totalPrice: 0
        },
        {
            id: 5,
            plan: "Office",
            unitPrice: 20,
            time: "£20",
            time2: 25,
            src: OfficeIcon,
            count: 0,
            totalPrice: 0
        },
        {
            id: 6,
            plan: "Hall",
            unitPrice: 12,
            time: "£12",
            time2: 15,
            src: HallIcon,
            count: 0,
            totalPrice: 0
        },
        {
            id: 7,
            plan: "Toilet",
            unitPrice: 12,
            time: "£12",
            time2: 15,
            src: ToiletIcon,
            count: 0,
            totalPrice: 0
        },
        {
            id: 8,
            plan: "Bathroom",
            unitPrice: 20,
            time: "£20",
            time2: 25,
            src: BathroomIcon,
            count: 0,
            totalPrice: 0
        },
        {
            id: 9,
            plan: "Through lounge",
            unitPrice: 44,
            time: "£44",
            time2: 55,
            src: LoungeIcon,
            count: 0,
            totalPrice: 0
        },
        {
            id: 10,
            plan: "Staircase",
            unitPrice: 36,
            time: "£36",
            time2: 45,
            src: StaircaseIcon,
            count: 0,
            totalPrice: 0
        }
    ];

    const sizeBasedPricing = [
        {
            id: 30,
            plan: "Small (35 sq.ft.)",
            unitPrice: 16,
            time: "£16",
            time2: 20,
            src: CarpetIcon,
            count: 0,
            totalPrice: 0
        },
        {
            id: 31,
            plan: "Medium (70 sq.ft.)",
            unitPrice: 24,
            time: "£24",
            time2: 30,
            src: CarpetIcon,
            count: 0,
            totalPrice: 0
        },
        {
            id: 32,
            plan: "Large (100 sq.ft.)",
            unitPrice: 32,
            time: "£32",
            time2: 45,
            src: CarpetIcon,
            count: 0,
            totalPrice: 0
        }
    ];

    const endOfTenancyStaircase = [
        {id: 25,
            plan: "Staircase",
            time: "£36",
            time2: 45,
            addition: "",
            no: "No",
            yes: "Yes",
            src: StaircaseIcon,
            count: 0,
            additionPrice: 0,
            unitPrice: 36,
            totalPrice: 0
        },
    ]

    const yesNoQuestions = [
        {
            id: "check",
            no: "No",
            yes: "Yes",
            question: "Can you check the job at the end?"
        },
        {
            id: "pets",
            no: "No",
            yes: "Yes",
            question: "Do you have pets?"
        },
        {
            id: "key",
            no: "No",
            yes: "Yes",
            question: "Does a cleaner need to pick up a key?"
        },
        {
            id: "upholstery",
            no: "No",
            yes: "Yes",
            question: "Do you require upholstery cleaning?"
        }
    ];

    const dirt = ['Light', 'Medium', 'Heavy']

    const newChore = {
        id: '',
        plan: '',
        time: '',
        time2: 0,
        src: '',
        count: 1,
        unitPrice: 0,
        totalPrice: 0,
    }

    const data = {
        dayName: '',
        monthName: '',
        yearName: new Date().getFullYear(),
        starter:'',
        plan: 'One-Off',
        planType:'',
        rate: 29,
        date: '',
        time: '09:00',
        hour: 9,
        hourText: '09',
        minuteText: '00',
        minute: 0,
        startTime: '',
        nature: 'Light',
        natureActive: [false, false, false],
        room: [],
        appliance: [],
        options: [],
        booking: [],
        totalAmount: 0,
        duration: '',
        addictions: [],
        errandTime:'0',
        erranTimeInMinutes: 0,
        cashBack:'Cashback up to £25',
        weekly1:'No',
        weekly2:'No',
        monthly: 3,
        check: false,
        key: false,
        pets: false,
        upholstery: false,
        chores: [],
        choresPrevPrice: 0,
        show: false,
        show2: false,
        questionIds: [],
        questionIds2: [],
        minimumEstimate: 87,
        showInfo1: false,
        showInfo2: false,
        showInfo3: false,
        showInfo4: false,
        bookingEmpty: false,
        addresses: ['Select addres', "1 Princes Street", "10 Royal Mile", "15 North Bridge", "20 St Giles Street", "25 High Street"],
        customer: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        email: '',
        postcode: '',
        authorization: false,
        policy: false,
        disableThisDay: false,
        standardOnly: true,
        onSubscription: false,
        durationQty: 0,
        urgent: false,

    }

    const disableThisday = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today to midnight
        return date > today; // Disables today and all past dates
    };

    const enableThisday = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today to midnight
        return date >= today;
    }

    const edinburghPostcodes = [
        // EH1 - City Centre
        { id: 1, postcode: "EH1 1AB", addresses: ["1 Princes Street", "10 Royal Mile", "15 North Bridge", "20 St Giles Street", "25 High Street"] },
        { id: 2, postcode: "EH1 2CD", addresses: ["5 Cockburn Street", "12 Canongate", "18 Lawnmarket", "22 Cowgate", "30 Grassmarket"] },

        // EH2 - New Town
        { id: 3, postcode: "EH2 3EF", addresses: ["3 George Street", "8 Charlotte Square", "14 Queen Street", "19 Rose Street", "27 Thistle Street"] },
        { id: 4, postcode: "EH2 4GH", addresses: ["6 Hanover Street", "11 Frederick Street", "17 Castle Street", "23 Young Street", "29 Howe Street"] },

        // EH3 - West End
        { id: 5, postcode: "EH3 5IJ", addresses: ["2 Melville Street", "7 Drumsheugh Gardens", "13 Randolph Crescent", "18 Great King Street", "24 Dundas Street"] },
        { id: 6, postcode: "EH3 6KL", addresses: ["4 Walker Street", "9 Lynedoch Place", "15 Gloucester Place", "20 Ainslie Place", "26 Moray Place"] },

        // EH4 - Stockbridge/Dean Village
        { id: 7, postcode: "EH4 1MN", addresses: ["1 Deanhaugh Street", "6 Comely Bank Road", "12 Raeburn Place", "17 St Stephen Street", "23 Eton Terrace"] },
        { id: 8, postcode: "EH4 2OP", addresses: ["3 Inverleith Row", "8 Arboretum Road", "14 Warriston Road", "19 Canonmills", "25 Goldenacre"] },

        // EH5 - Granton/Trinity
        { id: 9, postcode: "EH5 3QR", addresses: ["5 Granton Road", "10 Boswall Parkway", "16 West Harbour Road", "21 Newhaven Road", "28 Trinity Crescent"] },

        // EH6 - Leith
        { id: 10, postcode: "EH6 4ST", addresses: ["2 Leith Walk", "9 Constitution Street", "14 The Shore", "19 Bernard Street", "25 Commercial Street"] },
        { id: 11, postcode: "EH6 5UV", addresses: ["4 Great Junction Street", "11 Henderson Street", "16 Dock Street", "22 Sandport Street", "29 Baltic Street"] },

        // EH7 - Easter Road/Calton
        { id: 12, postcode: "EH7 6WX", addresses: ["7 Easter Road", "12 London Road", "18 Montgomery Street", "24 Leith Street", "31 Calton Road"] },

        // EH8 - Holyrood/Southside
        { id: 13, postcode: "EH8 7YZ", addresses: ["3 Nicolson Street", "10 South Bridge", "15 Clerk Street", "21 Dalkeith Road", "27 Newington Road"] },

        // EH9 - Marchmont/Morningside
        { id: 14, postcode: "EH9 8ZA", addresses: ["5 Morningside Road", "13 Bruntsfield Place", "18 Marchmont Road", "22 Sciennes Road", "30 Grange Road"] },

        // EH10 - Merchiston/Gorgie
        { id: 15, postcode: "EH10 9BC", addresses: ["2 Colinton Road", "8 Slateford Road", "15 Gorgie Road", "20 Dalry Road", "26 Ardmillan Terrace"] },

        // EH11 - West Edinburgh
        { id: 16, postcode: "EH11 1DE", addresses: ["4 Bread Street", "9 Morrison Street", "14 Dalry Road", "21 Haymarket Terrace", "29 West Approach Road"] },

        // EH12 - Corstorphine
        { id: 17, postcode: "EH12 2FG", addresses: ["6 Corstorphine High Street", "12 St John's Road", "17 Haymarket Terrace", "23 Palmerston Place", "31 Shandwick Place"] },

        // EH13 - Colinton
        { id: 18, postcode: "EH13 3HI", addresses: ["3 Colinton Road", "10 Dreghorn Link", "16 Pentland Terrace", "21 Colinton Mains Road", "28 Oxgangs Road"] },

        // EH14 - Sighthill/Wester Hailes
        { id: 19, postcode: "EH14 4JK", addresses: ["5 Wester Hailes Road", "11 Sighthill Road", "19 Calder Road", "24 Longstone Road", "32 Broomhouse Drive"] },

        // EH15 - Portobello
        { id: 20, postcode: "EH15 5LM", addresses: ["7 Portobello High Street", "14 Brighton Place", "20 Bath Street", "25 Bellfield Street", "33 High Street"] },

        // EH16 - Craigmillar
        { id: 21, postcode: "EH16 6NO", addresses: ["2 Old Dalkeith Road", "9 Cameron Toll", "15 Mayfield Road", "22 Craigmillar Park", "29 Minto Street"] },

        // EH17 - Newcraighall
        { id: 22, postcode: "EH17 7PQ", addresses: ["4 Dalkeith Road", "10 Newcraighall Road", "16 Milton Road East", "23 Millerhill Road", "30 Whitehill Street"] },

        // EH20 - Loanhead/Roslin
        { id: 23, postcode: "EH20 8RS", addresses: ["6 Loanhead Road", "13 Roslin High Street", "18 Bilston Road", "24 Milton Bridge", "31 Roslin Glen Road"] },

        // EH22 - Dalkeith
        { id: 24, postcode: "EH22 9TU", addresses: ["3 Dalkeith High Street", "11 Eskbank Road", "17 Newtongrange Main Street", "22 Mayfield Road", "29 Buccleuch Street"] },

        // EH30 - South Queensferry
        { id: 25, postcode: "EH30 1VW", addresses: ["5 South Queensferry High Street", "12 Hopetoun Road", "18 The Loan", "25 Echline Road", "32 Builyeon Road"] },

        // Additional less common EH postcodes
        { id: 26, postcode: "EH21 2XY", addresses: ["4 Musselburgh High Street", "9 Bridge Street", "15 Newbigging", "20 Inveresk Road", "27 Pinkie Road"] },
        { id: 27, postcode: "EH23 3ZA", addresses: ["6 Tranent High Street", "11 Windygoul", "17 Macmerry Industrial Estate", "23 Elphinstone Road", "29 Ormiston Road"] },
        { id: 28, postcode: "EH25 4BC", addresses: ["3 Roslin Research Park", "8 Bush Estate", "14 Pentland Science Park", "19 Roslin Innovation Centre", "26 Wallace Loan"] },
        { id: 29, postcode: "EH26 5DE", addresses: ["7 Penicuik High Street", "13 Carlops Road", "19 Howgate", "25 Mauricewood Road", "31 Rullion Road"] },
        { id: 30, postcode: "EH29 6FG", addresses: ["2 Kirkliston Main Street", "8 Winchburgh Road", "14 Niddry Road", "21 Philipstoun Park", "28 Builyeon Road"] }
    ];

    const [currentStep, setCurrentStep] = useState(-1);
    const [starter, setStarter] = useState('');
    const [plan, setPlan] = useState('One-off');
    const [errors, setErrors] = useState({});
    const [question1, setQuestion1] = useState('');
    const [question2, setQuestion2] = useState('');
    const [question3, setQuestion3] = useState('');
    const [question4, setQuestion4] = useState('');
    const [question5, setQuestion5] = useState('');
    const [question6, setQuestion6] = useState('');
    const [question7, setQuestion7] = useState('');
    const [question8, setQuestion8] = useState('');
    const [question9, setQuestion9] = useState('');

    const [formData, setFormData] = useState(data);
    const [durationStep, setDurationStep] = useState(0);
    const [code, setCode] = useState(currentPostcode);

    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);
    const [customerName, setCustomerName] = useState('');
    const [paymetMethods, setPaymetMethods] = useState([]);
    const [message, setMessage] = useState(null);
    const [paymentIntentId, setPaymentIntentId] = useState(null);
    const [orderId, setOrderId] = useState('');

    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showText, setShowText] = useState(false)

    const [selectedDate, setSelectedDate] = useState(null);
    const [addressCode, setAddressCode] = useState(0);
    const [endOfTenancy, setEndOfTenancy] = useState(false);
    const [subscriptionCount, setSubscriptionCount] = useState(0);
    const [minDate, setMinDate] = useState(new Date());
    const [loggedIn, setLoggedIn] = useState(true);
    const [time, setTime] = useState('');
    const [paymentMessage, setPaymentMessage] = useState('');


    const cleaningSubscriptions = [
        {
            id: 22,
            schedule: "Weekly",
            price: "£17/h",
            rate: 17,
            minimum: 51,
            reclaim: 'Cashback up to £150',
            taskList: [
                "Background-checked professionals",
                "Replacement of the cleaner if you are not happy",
                "Helpful customer service",
                "Free rescheduling up to 24 hours prior the service"
            ]
        },
        {
            id: 33,
            schedule: "Fortnightly",
            price: "£18/h",
            rate: 18,
            minimum: 57,
            reclaim: 'Cashback up to £150',
            taskList: [
                "Background-checked professionals",
                "Replacement of the cleaner if you are not happy",
                "Helpful customer service",
                "Free rescheduling up to 24 hours prior the service"
            ]
        },
        {
            id: 44,
            schedule: "Monthly",
            price: "£19/h",
            rate: 19,
            minimum: 54,
            reclaim: 'Cashback up to £150',
            taskList: [
                "Background-checked professionals",
                "Replacement of the cleaner if you are not happy",
                "Helpful customer service",
                "Free rescheduling up to 24 hours prior the service"
            ]
        }
    ];

    const showQs = {display:'', textAlign:'start', height:'100%'};
    const hideQs = {display:'none', textAlign:'start', height:'0px'};
    const showAll = {display:''};
    const hideAll = {display:'none'};

    const starters = [
        {id: 1,
            starter:'One-Off / Regular / Carpet & Upholstery'
        },
        {id:2 ,
            starter: 'End of Tenancy'
        },
        {id:3 , starter:'Carpet & Upholstery only'}
    ]

    const handleDateChange = (selectedDate) => {
        const newErrors = errors;
        const now = isToday(selectedDate)
        let time;
        let hourText = '';
        const date =  format(selectedDate, 'yyyy-MM-dd');
        if (now) {
            const hour = new Date().getHours();
            let newHour = hour + 4;
            if (newHour < 9) {
                newHour = 9;
            }
            if (newHour.toString().length <= 1) {
                time = `0${newHour}:${formData.minuteText}`;
                hourText = `0${newHour}`;
            }
            else {
                time = `${newHour}:${formData.minuteText}`;
                hourText = newHour.toString();
            }

            setFormData({...formData, hour: newHour, hourText: hourText, date: date, minimumEstimate: 97, time: time });
            setSelectedDate(selectedDate);
            newErrors['time'] = null;
        }
        else {

            const time = `${formData.hourText}:${formData.minuteText}`;
            setFormData({...formData, date: date, minimumEstimate: 67, time: time });
            newErrors['time'] = null;
        }
        newErrors['date'] = null;
        setErrors(newErrors);
    }

    const handLeValidation1 = () => {
        const newErrors = {};
        const hours = new Date().getHours();
        const thisDday = isToday(formData.date);
        const hour = formData.hour;

        if (!formData.date.trim()) newErrors.date = 'date is required';

        if (thisDday && hour < hours) newErrors.date = 'Please re-select date';

        if (!formData.time.trim()) newErrors.time = 'time is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (!formData.onSubscription) {
            if (thisDday && (hour >= 8 && hour <= 16)) {
                setFormData({...formData, planType: 'Same day', rate: 29, minimumEstimate: 87 });
            }

            if (thisDday && (hour > 16 && hour <= 21)) {
                setFormData({...formData, planType: 'Same day and Night', rate: 29, minimumEstimate: 87 });
            }

            if (thisDday && (hour >= 21 && hour <= 23)) {
                setFormData({...formData, planType: 'Night', rate: 29, minimumEstimate: 87 });
            }

            if (!thisDday) {
                if (hour <= 8) {
                    setFormData({...formData, planType: 'Night', rate: 29, minimumEstimate: 87 });
                }
                if (hour > 8 && hour <= 21) {
                    setFormData({...formData, planType: 'Next day', rate: 19, minimumEstimate: 57 });
                }
                if (hour > 21 && hour <= 23) {
                    setFormData({...formData, planType: 'Night', rate: 29, minimumEstimate: 57 });
                }
            }
        }

       setCurrentStep(currentStep+1)

        if (endOfTenancy) {
            if (formData.booking.filter(book => book.id === 'End of Tenancy').length <= 0) {
                updateAddictions('End of Tenancy',39, 1)
            }
        }
    }

    const handleValidation2 = () => {
        let duration = 0;
        formData.booking.forEach(booking => duration += (Number(booking.count) * Number(booking.time2)));
        if ( formData.totalAmount <= 0 || formData.booking.length <= 0 || duration <= 0) {
            setFormData({...formData, bookingEmpty: true});
            return;
        }
        setCurrentStep(currentStep + 1)
    }

    const calculateDuration = (minutes, currentNature = null) => {
        let totalTime = minutes;
        let nature = formData.nature
        if (currentNature !== null && currentNature !== undefined) {
            nature = currentNature.toString();
        }
        let factor = 0;
        if (nature === dirt[0]) {
            factor = 0;
        }
        if (nature === dirt[1]) {
            factor = 0.25;
        }
        if (nature === dirt[2]) {
            factor = 0.8;
        }

        if (factor > 0) {
            totalTime = (Math.ceil(Number(minutes) * Number(factor))) + Number(minutes);
        }


        let timeForChores = 0;
        let timeForBooking = 0;
        let hour = 0;
        const minute = Number(totalTime)%60;

        hour = (Number(totalTime) - Number(minute)) / 60;
        let time;
        if (minute <= 0 && hour > 0) {
            time = `${hour}h`;
        }
        else if (minute > 0 && hour <= 0) {
            if (minute.toString().length > 0) {
                time = `${minute}m`;
            }
            else {
                time = `0${minute}m`;
            }
        }
        else {
            if (minute.toString().length > 0) {
                time = `${hour}h:${minute}m`;
            }
            else {
                time = `${hour}h:0${minute}m`;
            }

        }
        return time;
    }

    const handleStarterChange = (e) => {
        e.preventDefault();
        const user = localStorage.getItem('user');
        const { name, value } = e.target;
        setFormData(data)
        setSelectedDate(null);
        if (user) {
            setCurrentStep(0);
            setStarter(value);
        }
        else {
            setLoggedIn(false);
        }
        setCurrentStep(0);
        setStarter(value);

    }

    const initializeForm = () => {
        let natureActive = [false, false, false]
        let nature = dirt[0];
        if ( starter === starters[1].starter) {
            natureActive = [true, true, false];
            nature = dirt[2]
        }
        const hours = new Date().getHours();
        let disable = false;
        let date = '';
        let time = '';
        if (hours > 16) {
            disable = true;
            setMinDate(new Date(Date.now() + 86400000))
        }

        if ( starter === starters[2].starter) {
            disable = true;
        }

        let month;
        const day = new Date().getDate();
        switch (new Date().getMonth()) {
            case 0:
                month = 'Jan';
                break;
            case 1:
                month = 'Feb';
                break;
            case 2:
                month = 'Mar';
                break;
            case 3:
                month = 'Apr';
                break;
            case 4:
                month = 'May';
                break;
            case 5:
                month = 'Jun';
                break;
            case 6:
                month = 'Jul';
                break;
            case 7:
                month = 'Aug';
                break;
            case 8:
                month = 'Sept';
                break;
            case 9:
                month = 'Oct';
                break;
            case 10:
                month = 'Nov';
                break;
            case 11:
                month = 'Dec';
        }

        let addresses = ["Select Address"];
        addresses.push(...formData.addresses);
        if (postcode !== null && postcode !== undefined) {
            addresses = ["Select Address"];
            const cleanedPostcode = postcode.replace(/\s/g, "").toUpperCase();
            const normalPostcode =  cleanedPostcode.slice(0, -3) + " " + cleanedPostcode.slice(-3);
            for (let i = 0; i < edinburghPostcodes.length; i++) {
                if (normalPostcode === edinburghPostcodes[i].postcode) {
                    addresses.push(...edinburghPostcodes[i].addresses);
                    break;
                }
            }
        }

        if (starter === starters[0].starter || starter === starters[1].starter) {
            setFormData({...formData,
                dayName: day,
                monthName: month,
                disableThisDay: disable,
                date: date,
                time: time,
                nature: nature,
                natureActive: natureActive,
                starter: starter,
                chores: newChore,
                options: optionEstimates,
                appliance: applienceEstimates,
                room: roomEstimates,
                onSubscription: false,
                addresses: addresses,
            });
        }
        else {
            setFormData({...formData,
                dayName: day,
                monthName: month,
                disableThisDay: disable,
                date: date,
                time: time,
                nature: nature,
                natureActive: natureActive,
                starter: starter,
                chores: newChore,
                options: optionEstimates,
                appliance: sizeBasedPricing,
                room: endOfTenancyServices,
                onSubscription: false,
                addresses: addresses,
            });
        }
       setSelectedDate(null)

        setCurrentStep(currentStep+1)
        setAddressCode(addressCode+1)
        setClientSecret(null)

        if (starter === starters[1].starter) {
               setEndOfTenancy(true)
        }
        else {
                setEndOfTenancy(false)
        }
    }

    const handleSubscriptionPlan = (tarrif, price, rate, minimumRate) => {
        const date = formData.date
        const time = formData.time;
        let natureActive = [false, false, false]
        let onSubscription = true;
        if (tarrif.includes('One-Off')) {
            onSubscription = false;
        }

        setFormData({...formData,
            disableThisDay: false,
            date: date,
            time: time,
            natureActive: natureActive,
            starter: starters[0].starter,
            chores: newChore,
            options: optionEstimates,
            appliance: applienceEstimates,
            room: roomEstimates,
            rate: rate,
            plan: tarrif,
            minimumEstimate: minimumRate,
            onSubscription: onSubscription
        });
        if (endOfTenancy) { setEndOfTenancy(false) }
    }

    const addRoomQuote = (id) => {
        const oldQuotes = formData.room
        for (let i = 0; oldQuotes.length > i; i++) {
            const newCount = oldQuotes[i].count + 1;
            const price = oldQuotes[i].unitPrice * newCount;
            if (id === oldQuotes[i].id) {
                oldQuotes[i].totalPrice = price;
                oldQuotes[i].count = newCount;
                break;
            }
        }
        setFormData({...formData, room: oldQuotes});
        updateBooking()
    };

    const removeRoomQuote = (id) => {
        const oldQuotes = formData.room
        let price;
        for (let i = 0; oldQuotes.length > i; i++) {
            const newCount = oldQuotes[i].count - 1;
            price = oldQuotes[i].unitPrice * newCount
            if (id === oldQuotes[i].id) {
                oldQuotes[i].totalPrice = price;
                oldQuotes[i].count = newCount;
                break;
            }
        }
        setFormData({...formData, room: oldQuotes});
        updateBooking()
    }

    const addApplienceQuote = (id) => {
        const oldQuotes = formData.appliance
        for (let i = 0; oldQuotes.length > i; i++) {
            const newCount = oldQuotes[i].count + 1;
            const price = oldQuotes[i].unitPrice * newCount ;
            if (id === oldQuotes[i].id) {
                oldQuotes[i].totalPrice = price;
                oldQuotes[i].count = newCount;
                break;
            }
        }
        setFormData({...formData, appliance: oldQuotes});
        updateBooking()
    }

    const removeApplienceQuote = (id) => {
        const oldQuotes = formData.appliance
        let price;
        for (let i = 0; oldQuotes.length > i; i++) {
            const newCount = oldQuotes[i].count - 1;
            price = oldQuotes[i].unitPrice * newCount
            if (id === oldQuotes[i].id) {
                oldQuotes[i].totalPrice = price;
                oldQuotes[i].count = newCount;
                break;
            }
        }
        setFormData({...formData, appliance: oldQuotes});
        updateBooking()
    }

    const updateBooking = (nature = null) => {
        let currentNature = formData.nature;
        if (nature !== null && nature !== undefined) {
            currentNature = nature;
        }

        const services = []
        let total = 0
        const room = formData.room
        const appliance = formData.appliance
        const options = formData.options
        const added = formData.addictions
        const newRoom = room.filter(item =>  item.count > 0)
        const newAppliance = appliance.filter(item =>  item.count > 0)
        const newOptions = options.filter(item =>  item.count > 0)
        const newAdded = added.filter(item =>  item.count > 0)
        services.push(...newRoom)
        services.push(...newAppliance)
        services.push(...newAdded)

        for (let i = 0; newOptions.length > i; i++) {
            const price = newOptions[i].unitPrice + newOptions[i].additionPrice;
            const newOption = {
                id: newOptions[i].id,
                plan: newOptions[i].plan,
                time: newOptions[i].time,
                time2: newOptions[i].time2,
                src: newOptions[i].src,
                count: newOptions[i].count,
                unitPrice: newOptions[i].unitPrice,
                totalPrice: price
            };
            services.push(newOption);
        }

        let duration = 0;

        for (let i = 0; i < services.length; i++) {
            const time = services[i].count * services[i].time2
            duration += time;
            const thisPrice = Number(services[i].totalPrice);
            total += Number(calculateTotalCost(time, thisPrice, currentNature));
        }

        const allTime = Number(duration) + Number(formData.erranTimeInMinutes);

        const timeText = calculateDuration(allTime, currentNature);

        const allPrices = Number(total) + Number(formData.choresPrevPrice);

        const price = new Decimal(Number(allPrices)).toFixed(2);

        setFormData({...formData,
            booking: services,
            totalAmount: price,
            addictions: newAdded,
            bookingEmpty: false,
            duration: timeText,
            durationQty: allTime,
            nature: currentNature,
        });
    }

    const clearBooking = (id) => {
        let found = false;
        const oldQuotesRoom = formData.room;
        for (let i = 0; oldQuotesRoom.length > i; i++) {
            if (id === oldQuotesRoom[i].id) {
                oldQuotesRoom[i].totalPrice = 0;
                oldQuotesRoom[i].count = 0;
                found = true;
                break;
            }
        }
        if (found) {
            setFormData({...formData, room: oldQuotesRoom});
            updateBooking()
            return
        }

        const oldQuotes = formData.appliance
        for (let i = 0; oldQuotes.length > i; i++) {
            if (id === oldQuotes[i].id) {
                oldQuotes[i].totalPrice = 0;
                oldQuotes[i].count = 0;
                found = true;
                break;
            }
        }
        if (found) {
            setFormData({...formData, appliance: oldQuotes});
            updateBooking()
            return
        }

        const oldOptions = formData.options;
        for (let i = 0; oldOptions.length > i; i++) {
            if (id === oldOptions[i].id) {
                oldOptions[i].totalPrice = 0;
                oldOptions[i].count = 0;
            }
        }
        if (found) {
            setFormData({...formData, options: oldOptions});
            updateBooking()
            return
        }
        const oldAddictions = formData.addictions;
        for (let i = 0; oldAddictions.length > i; i++) {
            if (id === oldAddictions[i].id) {
                oldAddictions[i].totalPrice = 0;
                oldAddictions[i].count = 0;
            }
        }
        setFormData({...formData, addictions: oldAddictions});
        updateBooking()

    }

    const updateOptions = (id) => {
        const options = formData.options;
        for (let i = 0; options.length > i; i++) {
            if (id === options[i].id) {
                if (options[i].count == 0) {
                    options[i].count = 1;
                }
                else {
                    options[i].count = 0;
                }
            }
        }
        setFormData({...formData, options: options});
        updateBooking()
    }

    const addErandTime = () => {
        const newErandTime = formData.erranTimeInMinutes + 30;
        const minutes = newErandTime % 60;
        const hours = (newErandTime - minutes) / 60;
        const unitPrice = 9.5;
        const duration = newErandTime / 30;
        const totalPrice = new Decimal(duration * unitPrice).toFixed(2);
        let time;
        if (hours > 0 && minutes > 0) {
            time = `${hours}h:${minutes}m`;
        }
        if (hours > 0 && minutes == 0) {
            time = `${hours}h`;
        }
        if (hours === 0 && minutes > 0) {
            time = `${minutes}m`;
        }

        const id = 'Errand & chores'
        const newChores = {
            id: id,
            plan: 'Errand & chores',
            time: time,
            time2: 0,
            src: '',
            count: 1,
            unitPrice: 0,
            totalPrice: totalPrice,
        }
        const allChores = [];
        allChores.push(newChores);

        let total = 0;
        let bookingDuration = 0;
        for (let i = 0; i < formData.booking.length; i++) {
            total += formData.booking[i].totalPrice;
            bookingDuration += formData.booking[i].count * formData.booking[i].time2;
        }

        const allPrices = Number(total) + Number(totalPrice);

        const price = new Decimal(Number(allPrices)).toFixed(2);

        const allMinutes = Number(newErandTime) + Number(bookingDuration)

        const allTime = calculateDuration(allMinutes);

        setFormData({...formData,
            errandTime: time,
            erranTimeInMinutes: newErandTime,
            chores: allChores,
            totalAmount: price,
            choresPrevPrice: totalPrice,
            bookingEmpty: false,
            duration: allTime,
            durationQty: allMinutes,
        });
    }

    const removeErandTime = () => {
        const newErandTime = formData.erranTimeInMinutes - 30;
        const minutes = newErandTime % 60;
        const hours = (newErandTime - minutes) / 60;
        const unitPrice = 9.5;
        const duration = newErandTime / 30;
        const totalPrice = new Decimal(duration * unitPrice).toFixed(2);
        let time;
        if (hours > 0 && minutes > 0) {
            time = `${hours}h:${minutes}m`;
        }
        if (hours > 0 && minutes == 0) {
            time = `${hours}h`;
        }
        if (hours === 0 && minutes > 0) {
            time = `${minutes}m`;
        }
        if (hours === 0 && minutes === 0) {
            time = "0";
        }

        const id = 'Errand & chores'
        const newChores = {
            id: id,
            plan: 'Errand & chores',
            time: time,
            time2: 0,
            src: '',
            count: 1,
            unitPrice: 0,
            totalPrice: totalPrice,
        }
        const allChores = [];
        allChores.push(newChores);

        let total = 0;
        let bookingDuration = 0;
        for (let i = 0; i < formData.booking.length; i++) {
            total += formData.booking[i].totalPrice;
            bookingDuration += formData.booking[i].count * formData.booking[i].time2;
        }

        const allPrices = Number(total) + Number(totalPrice);

        const price = new Decimal(Number(allPrices)).toFixed(2);

        const allMinutes = Number(newErandTime) + Number(bookingDuration)

        const allTime = calculateDuration(allMinutes);

        setFormData({...formData,
            errandTime: time,
            erranTimeInMinutes: newErandTime,
            chores: allChores,
            totalAmount: price,
            choresPrevPrice: totalPrice,
            duration: allTime,
            durationQty: allMinutes,
        });
    }

    const HoverOverlay = ({ triggerText, overlayText }) => {

        return (
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <div
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    style={{ cursor: 'pointer' }}
                >
                    {triggerText}
                </div>

                {isHovering && (
                    <div style={{
                        position: 'absolute',
                        zIndex: 1000, // High value to ensure it's on top
                        bottom: '100%', // Position above the trigger
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        color: 'white',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none' // Allows clicking through the overlay
                    }}>
                        {overlayText}
                    </div>
                )}
            </div>
        );
    };

    useEffect(() => {
        const checkHour = () => {
            const hours = new Date().getHours();
            if (hours > 16) {
                setFormData({...formData, disableThisDay: true});
            }
        }
        checkHour();

    }, [])

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768); // Common mobile breakpoint
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);

    }, []);

    useEffect(() => {
        if (currentStep > 1) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth' // Optional: for smooth scrolling animation
            })
        }

    }, [currentStep])

    const handleInteraction = () => {
        if (isMobile) {
            setShowText(prev => !prev); // Toggle on mobile
        }
    };

    const handlePlanChange = (e) => {
        setFormData({...formData, plan: e.target.category});
    }

    const updateAddictions = (service, totalPrice, tenancyCount = -1) => {
        const addictions = formData.addictions;
        const booking = formData.booking;
        let foundInBooking = false;
        let foundInAddiction = false;

        for (let i = 0; booking.length > i; i++) {
            if (service === booking[i].id) {
                booking[i].count = 0;
                foundInBooking = true;
                break;
            }
        }

        for (let i = 0; addictions.length > i; i++) {
            if (service === addictions[i].id) {
                addictions[i].count = 0;
                foundInAddiction = true;
                break;
            }
        }

        const newAddition = {
            id: service,
            plan: service,
            time: "",
            time2: 0,
            src: '',
            count: 1,
            unitPrice: 0,
            totalPrice: totalPrice,
        }

        if (!foundInBooking) {
            booking.push(newAddition);
        }

        if (!foundInAddiction) {
            addictions.push(newAddition);
        }

        setFormData({...formData, booking: booking, addictions: addictions});

        if (tenancyCount === 1) {
            setEndOfTenancy(true)
        }
        if (tenancyCount === 0) {
            setEndOfTenancy(false)
        }

        updateBooking()

    }

    const updateIds = (id) => {
        const ids = formData.questionIds
        if (ids.includes(id)) {
            for(let i = 0; i < ids.length; i++) {
                if (id === ids[i]) {
                    ids.splice(i, 1);
                    break;
                }
            }
        }
        else {
            ids.push(id);
        }
        setFormData({...formData, questionIds: ids});
    }

    const updateIds2 = (id) => {
        const ids = formData.questionIds2
        if (ids.includes(id)) {
            for(let i = 0; i < ids.length; i++) {
                if (id === ids[i]) {
                    ids.splice(i, 1);
                    break;
                }
            }
        }
        else {
            ids.push(id);
        }
        setFormData({...formData, questionIds2: ids});
    }

    const addHour = () => {
        let hours = formData.hour;
        let minuteText = formData.minuteText;
        let time;
        if (hours >= 23) return;
        hours += 1;

        let hour;
        if (hours.toString().length <= 1) {
            hour =  `0${hours}`;
            time = `${hour}:${minuteText}`;
        }
        else {
            hour = hours.toString();
            time = `${hour}:${minuteText}`;
        }
        setFormData({...formData, hourText: hour, hour: hours, time: time });
    }

    const removeHour = () => {
        let hours = formData.hour - 1;
        const thisHour = new Date().getHours();
        let minimumHours = thisHour + 4;
        let minuteText = formData.minuteText;
        let time;

        const thisDay = isToday(formData.date)
        const daysDiff = differenceInDays(new Date(formData.date), new Date());

        if (thisDay) {
            if (hours < minimumHours) {
                hours = minimumHours;
            }
            if (hours < 9) {
                hours = 9;
            }
        }
        else {
            if (daysDiff <= 0) {
                if (hours < 9) {
                    hours = 9;
                }
            }
            else {
                if (hours <= 0) {
                    hours = 1;
                }
            }
        }

        let hour;
        if (hours.toString().length <= 1) {
            hour =  `0${hours}`;
            time = `${hour}:${minuteText}`;

        }
        else {
            hour = hours.toString();
            time = `${hour}:${minuteText}`;
        }

        setFormData({...formData, hourText: hour, hour: hours, time: time });

    }

    const addMinute = () => {
        let minutes = formData.minute;
        let hourText = formData.hourText;
        let hour;
        if (minutes === 30) {
            return
        }
        minutes =  formData.minute + 30;
        let minute = minutes.toString();
        let time = `${hourText}:${minute}`;

        setFormData({...formData, minuteText: minute, minute: minutes, time: time });
    }

    const removeMinute = () => {
        let minutes = formData.minute;
        let hourText = formData.hourText;
        let time;
        if (minutes === 0) {
            return
        }
        minutes =  formData.minute - 30;
        let minute = `0${minutes}`;
        time = `${hourText}:${minute}`;

        setFormData({...formData, minuteText: minute, minute: minutes, time: time });
    }

    useEffect(() => {
        const time = new Date(selectedDate).setHours(formData.hour, formData.minute, 0, 0);
        const date = new Date(time).toLocaleTimeString([],{
            hour: '2-digit',
            minute: '2-digit'
        } );
        setTime(date);
    }, [formData.hour, formData.minute, selectedDate, formData.date])

    const paymentFAQs = [
        {
            id: 1,
            question: "When will I be charged?",
            answer: "When you place a booking and enter your bank details, we verify your card and make a pre-authorization of the estimated amount on your card. We then charge you after the cleaning is completed according to the actual time the cleaner worked."
        },
        {
            id: 3,
            question: "How can I track the status of my booking?",
            answer: "You can track and manage all your bookings through our website. Our website shows real-time updates including when a cleaner accepts your job and when they complete the cleaning."
        },
        {
            id: 4,
            question: "Where can I find my receipt?",
            answer: "A detailed receipt will be automatically sent to your email address immediately after your cleaning job is completed. You can also access past receipts through your account on our website."
        }
    ];

    const paymentFAQs2 = [
        {
            id: 5,
            question: "When will I be charged?",
            answer: "When you book, we verify your card and pre-authorize the estimated amount. After cleaning completes, we charge only for the actual time worked."
        },
        {
            id: 7,
            question: "How can I track my booking?",
            answer: "Track real-time status updates through our mobile app, including cleaner assignment and job completion."
        },
        {
            id: 8,
            question: "Where's my receipt?",
            answer: "A detailed receipt is emailed immediately after service. You can also access all receipts in your account dashboard."
        }
    ];

    const carpetCleaningFAQs = [
        {
            id: 1,
            question: "Do I have to hoover before you arrive?",
            answer: "Your Fly cleaner will hoover/vacuum clean your carpets when they arrive before proceeding with the carpet cleaning."
        },
        {
            id: 2,
            question: "How long will it take for my carpets to dry?",
            answer: "Drying typically takes between 9-12 hours, though it may take longer depending on factors like the amount of water used and current weather conditions."
        },
        {
            id: 3,
            question: "Will all stains be removed?",
            answer: "While we make every effort to remove stains, we cannot guarantee complete removal of all stains. Some stains may permanently damage carpet fibers beyond what professional cleaning can repair."
        },
        {
            id: 4,
            question: "Do I need to move my furniture?",
            answer: "Please move small or fragile items beforehand. Our cleaners will work around larger furniture and can move lighter pieces. For cleaning under heavy furniture like wardrobes or beds, these need to be moved prior to our arrival."
        }
    ];

    const validation3 = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';

        if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }


        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';

        if (!formData.address.trim()) newErrors.address = 'Address is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setFormData({...formData, customer: `${formData.firstName} ${formData.lastName}`});
        setCurrentStep(currentStep + 1);
    }

    const handleQuestions = (id) => {
        const ids = formData.questionIds
        if (ids.includes(id)) {
            for (let i = 0; i < ids.length; i++) {
                if (id === ids[i]) {
                    ids.splice(i, 1);
                    if (id.toLowerCase().includes('pets')) {
                        setFormData({...formData, pets: false});
                    }
                    if (id.toLowerCase().includes('key')) {
                        setFormData({...formData, key: false});
                    }
                    if (id.toLowerCase().includes('check')) {
                        setFormData({...formData, check: false});
                    }
                    if (id.toLowerCase().includes('upholstery')) {
                        setFormData({...formData, upholstery: false});
                    }
                    break;
                }
            }
        }
        else {
            ids.push(id);
            if (id.toLowerCase().includes('pets')) {
                setFormData({...formData, pets: true});
            }
            if (id.toLowerCase().includes('key')) {
                setFormData({...formData, key: true});
            }
            if (id.toLowerCase().includes('check')) {
                setFormData({...formData, check: true});
            }
            if (id.toLowerCase().includes('upholstery')) {
                setFormData({...formData, upholstery: true});
            }
        }
    }

    const calculateTotalCost = (timeInMinutes, unitPrice, level = null) =>  {
        const rate = formData.rate
        let factor = 0;
        let nature = formData.nature
        if (level !== null && level !== undefined) {
            nature = level;
        }

        let cost = unitPrice;
        const chargePerMinute = Number(rate) / 60;
        if (nature === dirt[0]) {
            factor = 0;
        }
        if (nature === dirt[1]) {
            factor = 0.25;
        }
        if (nature === dirt[2]) {
            factor = 0.8;
        }

        if (factor > 0) {
            const additionalTime = Math.ceil((Number(timeInMinutes) * Number(factor)));
            cost = (Number(additionalTime) * Number(chargePerMinute)) + Number(unitPrice);
        }

        return new Decimal(Number(cost)).toFixed(2);
    }

    const getOrderId = () => {
        return `Fly${
            new Date().toISOString().replace(/[^\d]/g, '').slice(0, 14)
        }${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    }

    function getPaymentIntentIdFromClientSecret(clientSecret) {
        return clientSecret.split('_')[1];
    }

    const elementOptions = {
        disableLink: true,
        showIcon: true,
        iconStyle: 'solid',
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                letterSpacing: '0.025em',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',   //className="form-group"
            },
        },
    };

    useEffect(() => {
        const cardNumber = elements?.getElement('cardNumber');
        if (cardNumber) {
            // Simulate a "blank" card state showing all supported brands
            cardNumber.update({
                showIcon: true,
                paymentMethod: 'card', // Shows all card brands
                iconStyle: 'solid'
            });
        }
    }, [elements]);

    const fetchData = async () => {
        setProcessing(true);
        try {
            // 1. Create customer or return customerId if already exists - note we send {email} as object
            const createResponse = await api.post('/api/create-customer', { email: formData.email} );
            const { customerId } = createResponse.data;

            // create payement intent
            const amount = Number(formData.totalAmount) * 100; // converting to pence
            const paymentIntent = await api.post('/api/create-payment-intent', {
                amount: amount, // note amount must be in pence. 100 pence = 1 pound
                currency: 'gbp',
                customerId: customerId
            });
            setClientSecret(paymentIntent.data.clientSecret);
            setCustomerName(customerName);
            setPaymentIntentId(paymentIntent.data.paymentIntentId);

            // 2. Then fetch payment methods - wait until we have customerId
            const paymentResponse = await api.get(`/api/payment-methods/${customerId}`);
         //   setPaymentMethods(paymentResponse.data);

            setCurrentStep(currentStep+1);
        } catch (error) {
            setError("Something went wrong!. Please try again");
            console.log(error.message);
            setProcessing(false);
        }
        finally {
            setProcessing(false);
        }
    };

    const handleDelayedPaymentAuthorization = async () => {
        try {
            // 1. Create customer or return customerId if already exists - note we send {email} as object
            const createResponse = await api.post('/api/create-customer', { email: formData.email} );
            const { customerId } = createResponse.data;

            const orderIdResponse = await api.get('/api/order-id')
            const { order_id } = orderIdResponse.data;

            // Create payment intent first (from your server)
            const amount = Number(formData.totalAmount) * 100;
            const response = await api.post('/api/create-deleyed-payment-intent', {amount: amount, orderId: order_id});
            //   const { clientSecret } = await response.json();

            setClientSecret(response.clientSecret);
            setCustomerName(customerName);
            setPaymentIntentId(response.paymentIntentId);
            setOrderId(order_id);

            // Confirm the payment (pre-authorization)
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: 'https://your-site.com/order-confirmation',
                }
            });

            if (error) {
                console.error(error);
            } else if (paymentIntent.status === 'requires_capture') {
                setMessage("You will be charged when the job is done")
                console.log('Pre-authorization successful!');
            }
        } catch (error) {
            console.log(error);
        }

    };

    const checkAuthorizationAndFetchData = () => {
        const newErrors = {};
        if (!formData.policy) newErrors.policy = 'Please accept policy agreement';
        if (!formData.authorization) newErrors.authorization = 'Please accept terms & conditions';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setClientSecret(null);
        fetchData()
    }

    function PaymentHome() {
        const stripe = useStripe();
        const elements = useElements();
        const [processing, setProcessing] = useState(false);
        const [error, setError] = useState(null);
        const [success, setSuccess] = useState(false);

        const handleBackButton = (e) => {
            e.preventDefault();
            if (processing) return;
            if (success) {
                setFormData(data);
                setCurrentStep(-1);
                return;
            }
            setCurrentStep(currentStep - 1);
        }

        const updateBookingOnDatabase =  async () => {
            try {
                let response = await api.get('/api/order-id')
                const orderId = response.data.orderId;

                const revenue = {
                    customer: `${formData.firstName} ${formData.lastName}`,
                    payment: formData.totalAmount,
                    orderId: orderId,
                    customerEmail: formData.email,
                    plan: formData.plan
                }

                const booking = [];
                for (let i = 0; i < formData.booking.length; i++) {
                    const duration = formData.booking[i].time2;
                    let book;
                    if (duration > 0) {
                        book = {room: formData.booking[i].plan,  count: formData.booking[i].count}
                    }
                    else {
                        book = {room: formData.booking[i].plan,  count: 'Needed'}
                    }
                    booking.push(book);
                }

                const bookDetails = {
                    bookDate: `${format(formData.date, 'EEEE, d MMMM yyyy')} ${formData.time}`,
                    date: formData.date,
                    today: new Date().toISOString(),
                    customer: `${formData.firstName} ${formData.lastName}`,
                    payment: formData.totalAmount,
                    paymentIntentId: paymentIntentId,
                    clientSecret: clientSecret,
                    nature: formData.nature,
                    plan: formData.plan,
                    email: formData.email,
                    rate: formData.rate,
                    timeCompleted: '',
                    extraTime: 0,
                    extraCharge: 0,
                    mainDate: selectedDate,
                    minimumPrice: formData.minimumEstimate,
                    cleanerWage: 0,
                    address: formData.address,
                    postcode: postcode,
                    phone: formData.phone,
                };


                const orderData = {
                    orderId: orderId,
                    booking: JSON.stringify(booking),
                    details: JSON.stringify(bookDetails),
                    cleanerAssigned: false,
                    completed: false,
                    urgent: formData.urgent,
                    duration: formData.duration,
                    nature: formData.nature,
                    assignedCleanerName: '',
                    assignedCleanerEmail: '',
                    assignedCleanerPhone: '',
                    customerEmail: formData.email,
                    payment: formData.totalAmount,
                    startTime: `${formData.date} ${formData.hourText}:${formData.minuteText}:00`,
                    startHour: formData.hour,
                    startMinute: formData.minute,
                };

                response = await api.post('/api/booking', orderData);

              //  const bookSuccess = response.data.success;

                response = await api.post('/api/revenue', revenue);

                if (response.data.success || bookSuccess) {
                 //   setBookMessage("Booking details are  successfully registered!");
                }
                else {
                 //   setBookMessage("Booking details still processing!");
                }

            } catch (error) {
                console.log(error)
            }

        }

        const handlePayment = async (e) => {
            e.preventDefault();
            if (processing) return;

            setProcessing(true);
            setError(null);
            setPaymentMessage(null);

            if (!stripe || !elements) {
                return;
            }

            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                    },
                },
            });

            if (stripeError) {
                setError(stripeError.message);
            }
            else if (paymentIntent) {
                if (paymentIntent.status === "succeeded") {
                    updateBookingOnDatabase();
                    setSuccess(true);
                    setPaymentMessage("Payment successful!");
                }
            }
            setProcessing(false);

        };

        return (
            <form onSubmit={handlePayment}
                className={'support-page'}>
                <div style={{maxWidth:"1000px"}}>
                    <div className="stripe-card-form">
                        <div className="price-container">
                            <h3 style={{color:'navy', marginBottom:'5px', textAlign:'end'}}>Powered by Stripe</h3>
                            <div className="form-row" style={{display: 'block', justifyContent: 'space-between'}}>
                                <label>Card number</label>
                                <CardNumberElement
                                    options={elementOptions}
                                    className="stripe-card-element"
                                />
                            </div>
                            <div className="form-row" style={{ display: 'flex', width: '100%', flexDirection: 'row'}} >
                                <div   style={{ flex: '1 1 auto', width: '60%' }}>
                                    <label>Expiration date</label>
                                    <CardExpiryElement
                                        options={elementOptions}
                                        className="stripe-card-element"
                                    />
                                </div>

                                <div style={{ flex: '0 0 auto', width: '30%' }}>
                                    <label>CVC</label>
                                    <CardCvcElement
                                        options={elementOptions}
                                        className="stripe-card-element"
                                    />
                                </div>

                            </div>
                            {error && <label className="card-error">{error}</label>}
                            {paymentMessage &&  <label className="experience-text">{paymentMessage}</label>}
                        </div>
                    </div>
                    <div style={{margin:'15px', gap:'10px'}} className="form-actions">
                        <button disabled={processing}
                                type="button" className="back-button"
                                onClick={handleBackButton}>
                            Back
                        </button>
                        <button disabled={(processing || !stripe)}
                                type="submit"
                                className={(!stripe || !elements) ? "back-button" : "submit-button"}>
                            {processing ? 'Processing...' : 'Book Now'}
                        </button>
                    </div>
                </div>
            </form>
        );
    }

    function Steps() {
        return(
            <div style={{marginTop:'20px'}} className="registration-steps" >

                <div className={`step ${currentStep === 0 ? 'passive' : currentStep > 0 ? 'active' : ''}`} >
                    <span>0</span>
                    <p>Plan</p>
                </div>

                <div className={`step ${currentStep === 1 ? 'passive' : currentStep > 1 ? 'active' : ''}`} >
                    <span>1</span>
                    <p>Schedule</p>
                </div>

                <div className={`step ${currentStep === 2 ? 'passive' : currentStep > 2 ? 'active' : ''}`}>
                    <span>2</span>
                    <p>Tasks</p>
                </div>

                <div className={`step ${currentStep === 3 ? 'passive' : currentStep > 3 ? 'active' : ''}`} >
                    <span>3</span>
                    <p>Data</p>
                </div>

                <div className={`step ${currentStep === 4 ? 'passive' : currentStep == 5 ? 'passive' : currentStep > 5 ? 'active' : ''}`} >
                    <span>4</span>
                    <p>Pay</p>
                </div>
            </div>
        );
    }

    function Plan() {
        return(
            <div className={'starter-container'}>
                <div className={["form-group", "main-banner"].join(" ")}>
                    {starters.map(item => (
                        <div key={item.id}>
                            <button value={item.starter} onClick={handleStarterChange}
                                    className={item.starter !== starter ? 'trapezium-button': 'trapezium-button-active'}>
                                {item.starter}
                            </button>
                        </div>
                    ))}
                    {!loggedIn && <div style={{marginTop:'20px'}}>
                        <h3 style={{fontWeight:"lighter"}}>We couldn't find a record of your credentials. In order to proceed, it is important that you sign up or sign in.
                            If you already have an account, sign in  <Link style={{color:'blue', fontWeight:'bold'}} to={'/login'}>here</Link>,
                            otherwise sign up <Link style={{color:'darkred', fontWeight:'bold'}} to={'/signup'}>here</Link>.
                        </h3>
                    </div>  }
                    <button disabled={starter.length === 0} className={starter.length === 0 ?
                        'back-button' :'next-button'} style={{width:'100px', marginTop:'20px'}}
                            onClick={initializeForm}>
                        Next
                    </button>
                </div>

            </div>
        );
    }

    function Schedule() {
        return(
            <div>
                <div className={['checkout-box', 'main-banner'].join(' ')}>
                    <div className={'checkout-container'} style={{margin:'10px'}}>
                        {starter !== starters[2].starter &&  <div>
                            <h3>How often are we cleaning?</h3>
                            <p>You can always reschedule or save cleanings for later.</p>

                            {formData.starter.includes('One-Off / Regular / Carpet & Upholstery') &&  <div className='plan-container'>
                                {cleaningSubscriptions.map(item => (
                                    <div key={item.id} className={formData.plan === item.schedule ? 'price-container-selected': 'price-container'}
                                         onClick={() => { formData.plan !== item.schedule ? handleSubscriptionPlan(item.schedule, item.price, item.rate, item.minimum) : null}}>
                                        <p style={{color:'red'}}>{item.reclaim}</p>
                                        <div style={{display:'flex', flexDirection:'row'}}>
                                            <label className="custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    name={formData.plan}
                                                    checked={formData.plan === item.schedule ? true : false }
                                                    className="hidden-checkbox"
                                                    onChange={() => setSubscriptionCount(0)}
                                                />
                                                <span className="checkbox-custom"></span>
                                                {item.schedule}
                                            </label>
                                            <p style={{textAlign:'end', color:'blue'}}>{item.price}</p>
                                        </div>
                                        {item.taskList.map((task, index) => (
                                            <div key={index}>
                                                <ul className={'dot-list'}>
                                                    <li>{task}</li>
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                                <div className={formData.plan === 'One-Off' ? 'price-container-selected': 'price-container'}
                                     onClick={() => { formData.plan !== 'One-Off' ? handleSubscriptionPlan('One-Off','£17/h', 29, 87) : null}}>
                                    <p style={{color:'red'}}>Cashback up to £150</p>
                                    <div style={{display:'flex', flexDirection:'row'}}>
                                        <label className="custom-checkbox">
                                            <input
                                                type="checkbox"
                                                name={formData.plan}
                                                onChange={() => setSubscriptionCount(0)}
                                                checked={formData.plan === 'One-Off' ? true : false }
                                                className="hidden-checkbox"
                                            />
                                            <span className="checkbox-custom"></span>One-off</label>
                                        <p style={{textAlign:'end', color:'blue'}}>£17/h</p>
                                    </div>
                                    <div style={{display:'flex', flexDirection:'row', marginBottom:'5px'}}>
                                        <div>
                                            <h5>Next day</h5>
                                            <p style={{fontSize:'small'}}>Any day from tomorrow (8 am - 9 pm)</p>
                                        </div>
                                        <p style={{textAlign:'end', width:'20%'}}>£19/h</p>
                                    </div>
                                    <div style={{display:'flex', flexDirection:'row', marginBottom:'5px'}}>
                                        <div>
                                            <h5>Same day</h5>
                                            <p style={{fontSize:'small'}}>Today, in 4h minimum (8 am - 9 pm)</p>
                                        </div>
                                        <p style={{textAlign:'end', width:'20%'}}>£29/h</p>
                                    </div>
                                    <div style={{display:'flex', flexDirection:'row', marginBottom:'5px'}}>
                                        <div>
                                            <h5>Peak</h5>
                                            <p style={{fontSize:'small'}}>High demand</p>
                                        </div>
                                        <p style={{textAlign:'end', width:'20%'}}>£20/h</p>
                                    </div>
                                    <div style={{display:'flex', flexDirection:'row'}}>
                                        <div>
                                            <h5>Night</h5>
                                            <p style={{fontSize:'small'}}>Any day (9 pm - 8 am)</p>
                                        </div>
                                        <p style={{textAlign:'end', width:'20%'}}>£29/h</p>
                                    </div>
                                </div>
                            </div> }

                            {['One-Off / Regular / Carpet & Upholstery', 'End of Tenancy'].includes(formData.starter) && !['Monthly','Fortnightly', 'Weekly'].includes(formData.plan)  &&  <div>
                                <div style={{display:'flex', flexDirection:'row', marginBottom:'5px', alignItems:'center'}}>
                                    <div className="form-actions" style={{marginLeft:'50px', width:'60px', marginRight:'10px'}}>
                                        <button id={'tenancyNegative'} type="button" className={ !endOfTenancy ? "next-button" : "back-button"}
                                                onClick={() => { endOfTenancy ? updateAddictions('End of Tenancy',39, 0) : null }}>
                                            No
                                        </button>
                                        <button id={'tenancyPositive'} type="button"  className={ endOfTenancy ? "next-button" : "back-button"}
                                                onClick={() => { !endOfTenancy ? updateAddictions('End of Tenancy',39, 1) : null }}>
                                            Yes
                                        </button>
                                    </div>
                                    <div style={{marginTop:'25px'}}>
                                        <h3>Do you need End of Tenancy cleaning?</h3>
                                        <p>Please check our Check-list <Link to={'/tenancylist'} target="_blank" rel="noopener noreferrer" style={{color:'blue'}}>here</Link> <label style={{color:'red'}}>( Additional £39 )</label></p>
                                    </div>
                                </div>
                            </div>}

                            {formData.starter.includes('One-Off / Regular / Carpet & Upholstery') &&  <div>
                                {['Monthly','Fortnightly', 'Weekly'].includes(formData.plan)  &&   <div style={{marginTop:'20px', marginBottom:'10px',
                                    border:'dashed', padding:'5px', borderRadius:'10px'}} >
                                    <p style={{ borderRadius:'10px', background:'yellow', width:'200px', padding:'5px',
                                        textAlign:'center', marginTop:'5px'}}>{formData.cashBack}
                                    </p>
                                    <h3 style={{marginTop:'10px'}}>How many months do you want to subscribe with us?</h3>
                                    <div style={{display:'flex', flexDirection:'column', marginBottom:'5px', marginTop:'20px', alignItems:'center'}}>
                                        <div style={{display:'flex', flexDirection:'row', marginBottom:'5px'}}>
                                            <button style={{flex:'1'}} type="button" className={formData.monthly === 3 ? "next-button" : "back-button"}
                                                    onClick={() => {setFormData({...formData, cashBack: 'Cashback up to £25', monthly: 3})}}
                                            >
                                                3
                                            </button>
                                            <button style={{flex:'1'}} type="button"  className={formData.monthly === 6 ? "next-button" : "back-button"}
                                                    onClick={() => {setFormData({...formData, cashBack: 'Cashback up to £75', monthly: 6}) }}
                                            >
                                                6
                                            </button>
                                            <button style={{flex:'1'}} type="button"  className={formData.monthly === 9 ? "next-button" : "back-button"}
                                                    onClick={() => {setFormData({...formData, cashBack: 'Cashback up to £150', monthly: 9}) }}
                                            >
                                                9
                                            </button>
                                        </div>
                                        <h5 style={{marginTop:'10px'}}>Сashback terms & conditions available <Link style={{color:'blue'}} to={'/cashback'}>here</Link></h5>
                                    </div>
                                </div> }
                            </div> }

                            <div style={{display:'flex', flexDirection:'row', marginBottom:'5px', alignItems:'center'}}>
                                <div className="form-actions" style={{marginLeft:'50px', width:'60px', marginRight:'10px'}}>
                                    <button type="button" className={formData.weekly2 === 'No' ? "next-button" : "back-button"}
                                            onClick={() => setFormData({...formData, weekly2: 'No'})}>
                                        No
                                    </button>
                                    <button type="button"  className={formData.weekly2 === 'Yes' ? "next-button" : "back-button"}
                                            onClick={() => setFormData({...formData, weekly2: 'Yes'})}>
                                        Yes
                                    </button>
                                </div>
                                <div style={{marginTop:'25px'}}>
                                    <h3>Need <span style={{color:'blue'}}>Express</span> or <span style={{color:'blue'}}>Studio</span> cleaning?</h3>
                                    <p>2h clean with Cleaning products included</p>
                                </div>
                            </div>
                        </div>
                        }
                        <div>
                            <div className={'grid-container'} style={{margin:'20px'}}>

                                <div style={{backgroundColor:'white', paddingRight:'30px', maxWidth:'300px'}}>
                                    <label htmlFor="deliveryDate">Choose date</label>
                                    <DatePicker
                                        selected={selectedDate}
                                        value={formData.date}
                                        type={'date'}
                                        name={'date'}
                                        onChange={(date) => handleDateChange(date)}
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Select a date"
                                        minDate={minDate}
                                        inline
                                        filterDate={formData.disableThisDay ? disableThisday : enableThisday}
                                        dayClassName={(date) => {
                                            const selected = selectedDate && date.toDateString() === selectedDate.toDateString();
                                            return selected ? 'selected-day' : undefined;
                                        }}
                                    />
                                    {errors.date && <span className="error-message">{errors.date}</span>}
                                    {formData.date && <p style={{textAlign:'center'}}>{format(formData.date, "EEE do MMM, yyyy")}</p>}
                                </div>

                                <div  style={{ flexDirection:'column', alignItems:'center', maxWidth:'200px'}}>
                                    <label>Choose time</label>
                                    <div  style={{display:'flex', flexDirection:'row', justifyContent:'center', width:'80px'}}>
                                        <MdKeyboardArrowUp size={60}
                                                           onClick={addHour}
                                        />
                                        <MdKeyboardArrowUp size={60}
                                                           onClick={addMinute}
                                        />
                                    </div>
                                    <div className={'time-container'} style={{display:'flex', flexDirection:'row',
                                        justifyContent:'center', width:'100px', padding:'10px'
                                    }}>
                                        <h2  style={{textAlign:'end'}}>{formData.hourText}</h2>
                                        <h2  style={{textAlign:'center'}}>:</h2>
                                        <h2  style={{textAlign:'start'}}>{formData.minuteText}</h2>
                                    </div>

                                    <div style={{display:'flex', flexDirection:'row', justifyContent:'center', width:'80px' }}>
                                        <MdKeyboardArrowDown  size={60}
                                                              onClick={removeHour}
                                        />
                                        <MdKeyboardArrowDown  size={60}
                                                              onClick={removeMinute}
                                        />
                                    </div>
                                    <p>24-hour format</p>
                                    {time && <p>{time}</p>}
                                    {errors.time && <span className="error-message">{errors.time}</span>}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={'question-container'}>
                        {formData.totalAmount > 0 && <div> <Summary /></div> }
                        {starter !== starters[2].starter &&  <div>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                < FaArrowLeft style={{color:'black', width:'30px', marginTop:'24px'}}
                                              className={question1 == 'What is included in cleaning service?' ? 'rotate-down': 'rotate-up'}
                                              onClick={() => { question1.length > 0 ? setQuestion1(''): setQuestion1('What is included in cleaning service?') }}/>
                                <div style={{display:'block', paddingLeft:'10px', paddingRight:'10px', marginTop:'20px'}}>
                                    <h4 style={{textAlign:'start'}}>What is included in cleaning service?</h4>
                                    <p style={question1 === 'What is included in cleaning service?' ? showQs: hideQs}>
                                        Our standards include everything to make a house clean. Here you can find details of what is exactly included in the service room by room.
                                    </p>
                                </div>
                            </div>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                < FaArrowLeft style={{color:'black', width:'30px', marginTop:'24px'}}
                                              className={question2 == 'What is Cancellation Policy?' ? 'rotate-down': 'rotate-up'}
                                              onClick={() => { question2.length > 0 ? setQuestion2(''): setQuestion2('What is Cancellation Policy?') }}/>
                                <div style={{display:'block', paddingLeft:'10px', paddingRight:'10px', marginTop:'20px'}}>
                                    <h4 style={{textAlign:'start'}}>What is Cancellation Policy?</h4>
                                    <p style={question2 === 'What is Cancellation Policy?' ? showQs: hideQs}>
                                        Time is valuable for both clients and cleaners. If a customer cancels a job 12 hours before the start time or at the last minute, cleaners lose their income and it messes with their schedule. Clients cancellation fees cover cleaners time and the eMop platform costs. Please see our <Link to={'/cancellation'} style={{color:'blue'}}>Cancellation Policy</Link>
                                    </p>
                                </div>
                            </div>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                < FaArrowLeft style={{color:'black', width:'30px', marginTop:'24px'}}
                                              className={question3 == 'How can I skip or reschedule a booking within subscription?' ? 'rotate-down': 'rotate-up'}
                                              onClick={() => { question3.length > 0 ? setQuestion3(''): setQuestion3('How can I skip or reschedule a booking within subscription?') }}/>
                                <div style={{display:'block', paddingLeft:'10px', paddingRight:'10px', marginTop:'20px'}}>
                                    <h4 style={{textAlign:'start'}}>How can I skip or reschedule a booking within subscription?</h4>
                                    <p style={question3 === 'How can I skip or reschedule a booking within subscription?' ? showQs: hideQs}>
                                        If you need to reschedule your booking for whatever reason, you can do it in My Account on our website.
                                        Please see our <Link to={'/cancellation'} style={{color:'blue'}}>Cancellation Policy</Link> before rescheduling to avoid any penalty for late cancellation.
                                    </p>
                                </div>
                            </div>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                < FaArrowLeft style={{color:'black', width:'30px', marginTop:'24px'}}
                                              className={question4 == 'When will my booking be confirmed?' ? 'rotate-down': 'rotate-up'}
                                              onClick={() => { question4.length > 0 ? setQuestion4(''): setQuestion4('When will my booking be confirmed?') }}/>
                                <div style={{display:'block', paddingLeft:'10px', paddingRight:'10px', marginTop:'20px'}}>
                                    <h4 style={{textAlign:'start'}}>When will my booking be confirmed?</h4>
                                    <p style={question4 === 'When will my booking be confirmed?' ? showQs: hideQs}>
                                        It can take a few minutes or up to a few days depending on the type of booking.
                                        As soon as a cleaner accepts your job, you will get a notification about that.
                                    </p>
                                </div>
                            </div>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                < FaArrowLeft style={{color:'black', width:'30px', marginTop:'24px'}}
                                              className={question5 == 'Can I make a last-minute booking, and how soon can the cleaner arrive?' ? 'rotate-down': 'rotate-up'}
                                              onClick={() => { question5.length > 0 ? setQuestion5(''): setQuestion5('Can I make a last-minute booking, and how soon can the cleaner arrive?') }}/>
                                <div style={{display:'block', paddingLeft:'10px', paddingRight:'10px', marginTop:'20px'}}>
                                    <h4 style={{textAlign:'start'}}>Can I make a last-minute booking, and how soon can the cleaner arrive?</h4>
                                    <p style={question5 === 'Can I make a last-minute booking, and how soon can the cleaner arrive?' ? showQs: hideQs}>
                                        You can make a last-minute booking, which is 4 hours before the cleaning starts. If you make your booking at 12:00, expect the cleaner to arrive at 16:00.
                                    </p>
                                </div>
                            </div>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                < FaArrowLeft style={{color:'black', width:'30px', marginTop:'24px'}}
                                              className={question6 == 'Who will come to clean my property?' ? 'rotate-down': 'rotate-up'}
                                              onClick={() => { question6.length > 0 ? setQuestion6(''): setQuestion6('Who will come to clean my property?') }}/>
                                <div style={{display:'block', paddingLeft:'10px', paddingRight:'10px', marginTop:'20px'}}>
                                    <h4 style={{textAlign:'start'}}>Who will come to clean my property?</h4>
                                    <p style={question6 === 'Who will come to clean my property?' ? showQs: hideQs}>
                                        After you place a booking, your job becomes available to all the cleaners on our platform.
                                        As soon as someone accepts your job, you will get information about your cleaner: name and rating.
                                    </p>
                                </div>
                            </div>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                < FaArrowLeft style={{color:'black', width:'30px', marginTop:'24px'}}
                                              className={question7 == 'Can I book a male or a female cleaner?' ? 'rotate-down': 'rotate-up'}
                                              onClick={() => { question7.length > 0 ? setQuestion7(''): setQuestion7('Can I book a male or a female cleaner?') }}/>
                                <div style={{display:'block', paddingLeft:'10px', paddingRight:'10px', marginTop:'20px'}}>
                                    <h4 style={{textAlign:'start'}}>Can I book a male or a female cleaner?</h4>
                                    <p style={question7 === 'Can I book a male or a female cleaner?' ? showQs: hideQs}>
                                        Our platform doesn’t allow you to choose the gender of the cleaner in order to avoid any discrimination.
                                        However, if there is any reason you prefer a female or a male cleaner to work in your home,
                                        please make a comment about your requirements in the booking. Cleaners can see your comments
                                        and pick up your job according to your preferences.
                                    </p>
                                </div>
                            </div>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                < FaArrowLeft style={{color:'black', width:'30px', marginTop:'24px'}}
                                              className={question8 == 'What is duration of subscription?' ? 'rotate-down': 'rotate-up'}
                                              onClick={() => { question8.length > 0 ? setQuestion8(''): setQuestion8('What is duration of subscription?') }}/>
                                <div style={{display:'block', paddingLeft:'10px', paddingRight:'10px', marginTop:'20px'}}>
                                    <h4 style={{textAlign:'start'}}>What is duration of subscription?</h4>
                                    <p style={question8 === 'What is duration of subscription?' ? showQs: hideQs}>
                                        The subscription period is either 3 or 6 months. All subscriptions are automatically renewed upon completion unless cancelled prior.
                                    </p>
                                </div>
                            </div>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                < FaArrowLeft style={{color:'black', width:'30px', marginTop:'24px'}}
                                              className={question9 == 'I booked a studio clean but I\'m told it\'s not' ? 'rotate-down': 'rotate-up'}
                                              onClick={() => { question9.length > 0 ? setQuestion9(''): setQuestion9('I booked a studio clean but I\'m told it\'s not') }}/>
                                <div style={{display:'block', paddingLeft:'10px', paddingRight:'10px', marginTop:'20px'}}>
                                    <h4 style={{textAlign:'start'}}>I booked a studio clean but I'm told it's not</h4>
                                    <p style={question9 === 'I booked a studio clean but I\'m told it\'s not' ? showQs: hideQs}>
                                        A studio flat is self-contained flat in which the normal functions of a number of rooms like the living room,
                                        bedroom, and kitchen are combined into a single room with a separate bathroom.
                                        If your flat is not described as above you will be charged additionally.
                                    </p>
                                </div>
                            </div>
                        </div> }
                        {starter === starters[2].starter &&  <div>
                            <h3>Need to know</h3>
                            {carpetCleaningFAQs.map(question => (
                                <div key={question.id}>
                                    <div style={{display:'flex', alignItems:'center', flexDirection:'row', marginTop:'20px'}}>
                                        <h4>{question.question}</h4>
                                        <MdKeyboardArrowDown className={formData.questionIds.includes(question.id) ? 'rotate-up': 'rotate-down'} size={30} style={{width:'30px', marginLeft:'10px'}}
                                                             onClick={() => updateIds(question.id)}
                                        />
                                    </div>
                                    {formData.questionIds.includes(question.id) && <p style={{marginLeft:'10px'}} className={'slide-in'}>{question.answer}</p> }
                                </div>
                            ))}
                        </div> }
                    </div>
                </div>
                <div style={{paddingLeft:'20px', paddingRight:'20px', maxWidth:'600px'}} className="form-actions">
                    <button type="button" className="back-button" onClick={() => setCurrentStep(currentStep -1)}>
                        Back
                    </button>
                    <button type="button" className="next-button" onClick={handLeValidation1}>
                        Next
                    </button>
                </div>
            </div>
        );
    }

    function Summary() {

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (currentStep === 3) {
                        setIsVisible(false)
                        return;
                    }
                    if (entry.isIntersecting === isVisible) {
                        return;
                    }
                    setIsVisible(entry.isIntersecting);
                },
                {
                    root: null, // viewport
                    rootMargin: '0px',
                    threshold: 0.2 // 10% of the element must be visible
                }
            );

            if (ref.current) {
                observer.observe(ref.current);
            }

            return () => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            };
        }, []);

        return (
            <div ref={ref} className={'support-page'}>
                <div style={{backgroundColor:'burlywood', padding:'10px', borderRadius:'12px'}}>
                    <h3 style={{textAlign:'center', marginBottom:'5px'}}>Booking Summary</h3>
                    <div className={'checkout-summary-unit'}>
                        <p style={{textAlign:'center'}}> {formData.date} {formData.time}</p>
                    </div>
                    <div className={'checkout-summary-unit'}>
                        <p style={{width:'40px'}}>Tarrif</p>
                        {formData.plan.includes('One-Off') &&  <h3 style={{textAlign:'end'}}>{formData.plan}/{formData.planType}</h3> }
                        {!formData.plan.includes('One-Off') &&  <h3 style={{textAlign:'end'}}>
                            {formData.plan}
                            <span style={{fontWeight:'lighter'}}>
                            Subscription
                        </span>
                        </h3>
                        }
                    </div>
                    <div className={'checkout-summary-unit'}>
                        <p>Rate</p>
                        <h3 style={{textAlign:'end'}}>£{formData.rate}/h</h3>
                    </div>
                    <div className={'checkout-summary-unit'}>
                        <p>Minimum Price</p>
                        <h3 style={{textAlign:'end'}}>£{formData.minimumEstimate}</h3>
                    </div>

                    {!formData.onSubscription &&  <div className="checkout-summary-unit">
                        <p>Level of dirt</p>
                        <h3 style={formData.nature === 'Light' ? {color:'green', textAlign:'end'} :
                            formData.nature === 'Medium' ? {color:'blue', textAlign:'end'}: {color:'red', textAlign:'end'}}>
                            {formData.nature}
                        </h3>
                    </div> }

                    {formData.durationQty > 0 &&  <div className={'checkout-summary-unit'}>
                        <p>Estimated time</p>
                        <h3 style={{textAlign:'end'}}>{formData.duration}</h3>
                    </div> }
                </div>
                {formData.booking.map(task => (
                    <div key={task.id}>
                        <div className={task.totalPrice <= 10 ? 'one':
                            task.totalPrice > 10 && task.totalPrice <= 15 ? 'two' : 'more'}>
                            <div className={'line'} style={{height:'1px'}}/>
                            <div className={'summary-row'}>
                                {task.time2 > 0 ? <p>{task.plan} {task.time2}min </p> : <p>{task.plan}</p>}
                                {task.unitPrice > 0 && task.id < 20 && <p style={{textAlign:'center', flex:'1'}}>{task.count}</p> }
                                {task.unitPrice > 0 && task.id < 20 && <MdAdd style={{width:'30px', height:'30px', marginLeft:'10px', marginRight:'10px'}}
                                                                              onClick={() =>
                                                                              {task.id <= 10 ? addRoomQuote(task.id) : addApplienceQuote(task.id)}}
                                /> }
                                <p style={{textAlign:'end'}}>£{task.totalPrice}</p>
                                <FaTimes style={{width:'30px', marginLeft:'10px'}} onClick={() => clearBooking(task.id)} />
                            </div>
                            <div className={'line'} style={{height:'1px'}}/>
                        </div>
                    </div>
                ))}

                {formData.choresPrevPrice > 0 && <div>
                    {formData.chores.map(task => (
                        <div key={task.id}>
                            <div className={'chores'}>
                                <div className={'summary-row'}>
                                    {task.time2 > 0 ? <p>{task.plan} {task.time2}min </p> : <p>{task.plan}</p>}
                                    {task.time.length > 0 && <p style={{textAlign:'center', flex:'1'}}>{task.time}</p> }
                                    <p style={{textAlign:'end'}}>£{task.totalPrice}</p>
                                    <FaTimes style={{width:'30px', marginLeft:'10px'}}
                                             onClick={() => setFormData({...formData,
                                                 totalAmount: (new Decimal(Number(formData.totalAmount - formData.choresPrevPrice))).toFixed(2),
                                                 choresPrevPrice: 0,
                                                 erranTimeInMinutes: 0,
                                                 errandTime: '0'
                                             })
                                             }/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}

                <div className={'line'} style={{height:'2px'}}/>

                {formData.totalAmount > 0 && <div className={'total'}>
                    <h4>Estimated Amount</h4>
                    <h2 style={{color:'red', alignItems:'end', flex:'1'}}>£{formData.totalAmount}</h2>
                </div>}

                <div className={'line'} style={{height:'2px'}}/>
            </div>
        );
    }

    function Task() {
        return (
            <div>
                <div className={['checkout-box', 'main-banner'].join(' ')}>
                    <div className="checkout-container">
                        {starter !== starters[2].starter &&  <div>
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom:'20px', justifyContent:'space-between'}}>
                                <p className={'number-background'}>1</p>
                                <h3 style={{color:'navy', marginLeft:'10px'}}> Please choose the rooms to clean to get an estimated price</h3>
                            </div>
                            <div  style={{padding:'10px',  boxShadow:'20px', marginLeft:'10px'}} className={['grid-container'].join(' ')}>
                                {formData.room.map(task => (
                                    <div key={task.id} style={{display:'flex', flexDirection:'row', alignItems:'center', borderColor:'dodgerblue', borderRadius:'10px', border:'dotted'}}>
                                        <img src={task.src} style={{width:'50px', height:'55px'}} alt='' />
                                        <div style={{marginLeft:'10px'}}>
                                            <h5 style={task.count > 0 ? {color:'red', display:'flex', flexDirection:'row'}: {color:'', display:'flex', flexDirection:'row' }}>
                                                {task.plan} {task.count > 0 && <FaCheck style={{width:'10px', marginLeft:'4px', marginTop:'4px'}}/> }
                                            </h5>
                                            <p>{task.time}</p>
                                        </div>
                                        <MdRemove style={{background:'white', color:'black', width:'50%', height:'25px'}}
                                                  onClick={() => {task.count > 0 ? removeRoomQuote(task.id) : null }}
                                        />
                                        <p style={{width:'20px', alignSelf:'center'}}>{task.count}</p>
                                        < MdAdd style={{ background:'white', color:'black', width:'50%', height:'25px'}}
                                                onClick={() => addRoomQuote(task.id)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom:'20px', marginTop:'50px', justifyContent:'space-between'}}>
                                <p className={'number-background'}>2</p>
                                <h3 style={{color:'navy', marginLeft:'10px'}}>Choose appliances or more areas to get an estimate price</h3>
                            </div>
                            <div  style={{padding:'10px',  boxShadow:'20px', marginLeft:'10px'}} className={['grid-container'].join(' ')}>
                                {formData.appliance.map(task => (
                                    <div key={task.id} className={'appliance'}>
                                        <img src={task.src} style={{width:'50px', height:'55px'}} alt='' />
                                        <div style={{marginLeft:'10px'}}>
                                            <h5 style={task.count > 0 ? {color:'red', display:'flex', flexDirection:'row'}: {color:'', display:'flex', flexDirection:'row' }}>
                                                {task.plan} {task.count > 0 && <FaCheck style={{width:'10px', marginLeft:'4px', marginTop:'4px'}}/> } </h5>
                                            <p>{task.time}</p>
                                        </div>
                                        <MdRemove style={{background:'white', color:'black', width:'50%', height:'25px'}}
                                                  onClick={() => {task.count > 0 ? removeApplienceQuote(task.id) : null}}
                                        />
                                        <p style={{width:'20px', alignSelf:'center'}}>{task.count}</p>
                                        < MdAdd style={{ background:'white', color:'black', width:'50%', height:'25px'}}
                                                onClick={() => addApplienceQuote(task.id)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom:'20px', marginTop:'50px', justifyContent:'space-between'}}>
                                <p className={'number-background'}>3</p>
                                <h3 style={{color:'navy', marginLeft:'10px'}}>Let us know if you need any additional services</h3>
                            </div>
                            <div className={['grid-container'].join(' ')}>
                                {formData.options.map(task => (
                                    <div key={task.id} style={{display:'flex', flexDirection:'row', padding:'10px', alignItems:'center', borderColor:'dodgerblue', borderRadius:'10px', border:'dotted'}}>
                                        <img src={task.src} style={{width:'50px', height:'55px'}} alt='' />
                                        <div style={{marginLeft:'10px'}}>
                                            <h5 style={task.count > 0 ? {color:'red', display:'flex', flexDirection:'row'}: {color:'', display:'flex', flexDirection:'row' }}>
                                                {task.plan} {task.count > 0 && <FaCheck style={{width:'10px', marginLeft:'4px', marginTop:'4px'}}/> } </h5>
                                            {task.time.length > 0 && <p>{task.time}</p>}
                                            {task.addition.length > 0 && <p style={{color:'blue'}}>{task.addition}</p>}
                                        </div>
                                        <div className="form-actions" style={{marginLeft:'10px', width:'40px', marginRight:'auto'}}>
                                            <button type="button" className={task.count === 0 ? "next-button" : "back-button"}  onClick={() => updateOptions(task.id)}>
                                                {task.no}
                                            </button>
                                            <button  type="button"  className={task.count > 0 ? "next-button" : "back-button"} onClick={() => updateOptions(task.id)}>
                                                {task.yes}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{display:'flex', flexDirection:'row', marginBottom:'5px', alignItems:'center', marginLeft:'10px'}}>
                                <div className="form-actions" style={{marginLeft:'10px', width:'60px', marginRight:'10px'}}>
                                    <button  name={'Eco-friendly'} type="button" className={formData.addictions.filter(item => item.id ==='Eco-friendly').length <= 0
                                        ? "next-button" : "back-button"}
                                             onClick={() => {formData.addictions.filter(item => item.id ==='Eco-friendly').length > 0 ?
                                                 updateAddictions('Eco-friendly',6): null}}
                                    >
                                        No
                                    </button>
                                    <button  name={'Eco-friendly'} type="button"  className={formData.addictions.filter(item => item.id ==='Eco-friendly').length > 0
                                        ? "next-button" : "back-button"}
                                             onClick={() => {formData.addictions.filter(item => item.id ==='Eco-friendly').length <= 0 ?
                                                 updateAddictions('Eco-friendly',6): null}}
                                    >
                                        Yes
                                    </button>
                                </div>
                                <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', maxWidth: '600px'}}>
                                    <div style={{display:'flex', flexDirection:'column', marginTop:'30px'}}>
                                        <h4> Do you need Eco-friendly cleaning products? <span style={{color:'navy'}}>(Additional £6)</span> </h4>
                                        <p style={{fontSize:'x-small'}}>Cleaning products include sprays and cloths.</p>
                                    </div>
                                    <img src={EcoFrienly} style={{width:'30px', height:'20px', marginTop:'20px'}} alt='' />
                                </div>
                            </div>

                            <div style={{display:'flex', flexDirection:'row', marginBottom:'5px', alignItems:'center', marginLeft:'10px'}}>
                                <div className="form-actions" style={{marginLeft:'10px', width:'60px', marginRight:'10px'}}>
                                    <button type="button" className={formData.addictions.filter(item => item.id ==='Hoover').length <= 0 ?
                                        "next-button" : "back-button"}
                                            onClick={() => {formData.addictions.filter(item => item.id ==='Hoover').length > 0 ?
                                                updateAddictions('Hoover',6): null}}
                                    >
                                        No
                                    </button>
                                    <button type="button"  className={formData.addictions.filter(item => item.id ==='Hoover').length > 0
                                        ? "next-button" : "back-button"}
                                            onClick={() => {formData.addictions.filter(item => item.id ==='Hoover').length <= 0 ?
                                                updateAddictions('Hoover',15): null}}
                                    >
                                        Yes
                                    </button>
                                </div>
                                <div style={{marginTop:'25px'}}>
                                    <h3>Do you need a Hoover and a Mop?</h3>
                                    <p style={{color:'blue'}}>(Additional £15)</p>
                                </div>
                            </div>

                            <div style={{display:'flex', flexDirection:'row', marginBottom:'5px', alignItems:'center', marginLeft:'10px'}}>
                                <div className="form-actions" style={{marginLeft:'10px', width:'60px', marginRight:'10px'}}>
                                    <button type="button" className={formData.addictions.filter(item => item.id ==='Disinfection').length <= 0
                                        ? "next-button" : "back-button"}
                                            onClick={() => {formData.addictions.filter(item => item.id ==='Disinfection').length > 0 ?
                                                updateAddictions('Disinfection',6): null}}
                                    >
                                        No
                                    </button>
                                    <button type="button"  className={formData.addictions.filter(item => item.id ==='Disinfection').length > 0
                                        ? "next-button" : "back-button"}
                                            onClick={() => {formData.addictions.filter(item => item.id ==='Disinfection').length <= 0 ?
                                                updateAddictions('Disinfection',10): null}}
                                    >
                                        Yes
                                    </button>
                                </div>
                                <div style={{marginTop:'25px'}}>
                                    <h3>Do you need us to disinfect your home? <span style={{color:'darkblue'}}>(Additional £10)</span></h3>
                                    <p style={{color:'red', fontSize:'small', marginTop:'8px'}}>We strongly recommend that all cleanings include a disinfection service which will give you
                                        extra protection for you and your loved ones.
                                    </p>
                                </div>
                            </div>

                            <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginLeft:'10px'}}>

                                <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:'30px'}}>
                                    <h4 style={{flex:'1'}} >Do you need help with any Errands/Chores?</h4>
                                    <MdRemove
                                        style={{ background:'white', color:'black', width:'50px', height:'25px'}}
                                        onClick={formData.erranTimeInMinutes > 0 ? removeErandTime : null}
                                    />
                                    <p style={formData.errandTime.length === 1 ? {width:'20px', textAlign:'center'} : {width:'60px', textAlign:'center'}}>{formData.errandTime}</p>
                                    <MdAdd
                                        style={{ background:'white', color:'black', width:'50px',  height:'25px'}}
                                        onClick={addErandTime}
                                    />

                                </div>

                                <div style={{display:'flex', flexDirection:'row', marginBottom:'5px', alignItems:'center'}}>
                                    <div className="form-actions" style={{marginLeft:'10px', width:'60px', marginRight:'10px'}}>
                                        <button type="button" className={formData.check === false ? "next-button" : "back-button"}
                                                onClick={() => setFormData({...formData, check: false})}
                                        >
                                            No
                                        </button>
                                        <button type="button"  className={formData.check === true ? "next-button" : "back-button"}
                                                onClick={() => setFormData({...formData, check: true})}
                                        >
                                            Yes
                                        </button>
                                    </div>
                                    <p style={{marginTop:'25px'}}>Can you check the job at the end?</p>
                                </div>

                                <div style={{display:'flex', flexDirection:'row', marginBottom:'5px', alignItems:'center'}}>
                                    <div className="form-actions" style={{marginLeft:'10px', width:'60px', marginRight:'10px'}}>
                                        <button type="button" className={formData.pets === false ? "next-button" : "back-button"}
                                                onClick={() => setFormData({...formData, pets: false})}>
                                            No
                                        </button>
                                        <button type="button"  className={formData.pets === true ? "next-button" : "back-button"}
                                                onClick={() => setFormData({...formData, pets: true})}>
                                            Yes
                                        </button>
                                    </div>
                                    <p style={{marginTop:'25px'}}>Do you have pets?</p>
                                </div>

                                <div style={{display:'flex', flexDirection:'row', marginBottom:'5px', alignItems:'center'}}>
                                    <div className="form-actions" style={{marginLeft:'10px', width:'60px', marginRight:'10px'}}>
                                        <button type="button" className={formData.key === false ? "next-button" : "back-button"}
                                                onClick={() => setFormData({...formData, key: false})}>
                                            No
                                        </button>
                                        <button type="button"  className={formData.key === true ? "next-button" : "back-button"}
                                                onClick={() => setFormData({...formData, key: true})}>
                                            Yes
                                        </button>
                                    </div>
                                    <p style={{marginTop:'25px'}}>Does a cleaner need to pick up a key?</p>
                                </div>

                            </div>

                            <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom:'20px',marginTop:'50px', justifyContent:'space-between'}}>
                                <p className={'number-background'}>4</p>
                                <h3 style={{color:'navy', marginLeft:'10px'}}> Let us know the level of dirt at your property</h3>
                            </div>
                            <div style={{display:'flex', flexDirection:'row', marginBottom:'5px', marginLeft:'10px'}}>
                                {dirt.map((level, index) => (
                                    <button key={index} type={'button'}
                                            style={{flex:'1'}}
                                            className={formData.nature === level ? "next-button" : "back-button"}
                                            onClick={() => { updateBooking(level)}}
                                            disabled={formData.natureActive[index]}>
                                        {level}
                                    </button>
                                ))}
                            </div>

                            <div style={{marginLeft:'10px'}}>
                                {formData.nature === dirt[0] &&  <ul className={'dot-list'}>
                                    <li>You do cleaning on a regular basis, from two times a month</li>
                                    <li>Your home is fairly clean, it just needs some refreshing</li>
                                </ul>}
                                {formData.nature === dirt[1] &&  <ul className={'dot-list'}>
                                    <li>You haven’t done cleaning for almost or over a month</li>
                                    <li>You have children</li>
                                    <li>You have pets</li>
                                    <li>You had a party</li>
                                </ul>}
                                {formData.nature === dirt[2] &&  <ul className={'dot-list'}>
                                    <li>You haven’t done cleaning for over a month or even two</li>
                                    <li>You have a lot of stuff that need to be moved /rearranged to clean your home</li>
                                    <li>You had a party and there are a lot of things to be cleaned and arranged</li>
                                </ul>}
                            </div>
                        </div> }
                        { starter === starters[2].starter &&
                            <div>
                                <h3>What fibers are your carpets/rugs made off?</h3>
                                <div style={{display:'flex', flexDirection:'row', marginBottom:'5px',justifyContent:'space-evenly', alignItems:'center', maxWidth:'700px'}}>
                                    <div className={'price-container'} style={{display:'flex', flex:'1',
                                        flexDirection:'row', alignItems:'center', marginTop:'20px', maxWidth:'300px'}}
                                         onClick={() => setFormData({...formData, standardOnly: true})}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.standardOnly}
                                            onChange={() => setFormData({...formData, standardOnly: true})}
                                            name={'standard'}
                                        />
                                        <p style={{marginLeft:'10px', display:'flex', flexDirection:'row'}}>
                                            Standard Only {formData.standardOnly && <FaCheck style={{width:'20px', flex:'1'}} />}</p>
                                    </div>
                                    <div className={'price-container'} style={{display:'flex',flex:'1',
                                        flexDirection:'row', alignItems:'center', marginTop:'20px', maxWidth:'300px'}}
                                         onClick={() => setFormData({...formData, standardOnly: false})}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={!formData.standardOnly}
                                            onChange={() => setFormData({...formData, standardOnly: false})}
                                            name={'delicate'}
                                        />
                                        <p style={{marginLeft:'10px', display:'flex', flexDirection:'row'}}>Standard & Delicate {!formData.standardOnly && <FaCheck style={{width:'20px', flex:'1'}} />}</p>
                                    </div>
                                </div>
                                <h3 style={{colorL:"blue", marginTop:'50px'}}>Please choose number of rooms or staircases with carpets</h3>
                                <div style={{padding:'10px',  boxShadow:'20px', marginLeft:'10px'}} className={['grid-container'].join(' ')}>
                                    {formData.room.map(task => (
                                        <div key={task.id} style={{display:'flex', flexDirection:'row', alignItems:'center', borderColor:'dodgerblue', borderRadius:'10px', border:'dotted'}}>
                                            <img src={task.src} style={{width:'50px', height:'55px'}} alt='' />
                                            <div style={{marginLeft:'10px'}}>
                                                <h5 style={task.count > 0 ? {color:'red', display:'flex', flexDirection:'row'}: {color:'', display:'flex', flexDirection:'row' }}>
                                                    {task.plan} {task.count > 0 && <FaCheck style={{width:'10px', marginLeft:'4px', marginTop:'4px'}}/> }
                                                </h5>
                                                <p>{task.time}</p>
                                            </div>
                                            <MdRemove style={{background:'white', color:'black', width:'50%', height:'25px'}}
                                                      onClick={() => {task.count > 0 ? removeRoomQuote(task.id) : null }}
                                            />
                                            <p style={{width:'20px', alignSelf:'center'}}>{task.count}</p>
                                            < MdAdd style={{ background:'white', color:'black', width:'50%', height:'25px'}}
                                                    onClick={() => addRoomQuote(task.id)}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <h3 style={{marginTop:'50px'}}>Please choose number and size of your rugs</h3>
                                <div  style={{padding:'10px',  boxShadow:'20px', marginLeft:'10px'}} className={['grid-container'].join(' ')}>
                                    {formData.appliance.map((task, index ) => (
                                        <div key={task.id} className={'appliance'}>
                                            <img src={task.src} style={index === 0 ? {width:'20px', height:'25px'} : index === 1 ? {width:'30px', height:'35px'}: {width:'50px', height:'55px'} } alt='' />
                                            <div style={{marginLeft:'10px'}}>
                                                <h5 style={task.count > 0 ? {color:'red', display:'flex', flexDirection:'row'}: {color:'', display:'flex', flexDirection:'row' }}>
                                                    {task.plan} {task.count > 0 && <FaCheck style={{width:'10px', marginLeft:'4px', marginTop:'4px'}}/> } </h5>
                                                <p>{task.time}</p>
                                            </div>
                                            <MdRemove style={{background:'white', color:'black', width:'50%', height:'25px'}}
                                                      onClick={() => {task.count > 0 ? removeApplienceQuote(task.id) : null}}
                                            />
                                            <p style={{width:'20px', alignSelf:'center'}}>{task.count}</p>
                                            < MdAdd style={{ background:'white', color:'black', width:'50%', height:'25px'}}
                                                    onClick={() => addApplienceQuote(task.id)}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    {yesNoQuestions.map(question => (
                                        <div style={{marginLeft:'20px'}} key={question.id}>
                                            <div style={{display:'flex', flexDirection:'row', alignItems:'baseline', justifyContent:'center', marginTop:'20px'}}>
                                                <div style={{ maxWidth:'100px'}} className="form-actions">
                                                    <button type="button" className={!formData.questionIds.includes(question.id) ? "next-button" : "back-button" }
                                                            onClick={() => handleQuestions(question.id)}>
                                                        {question.no}
                                                    </button>
                                                    <button type="button" className={formData.questionIds.includes(question.id) ? "next-button" : "back-button" }
                                                            onClick={() => handleQuestions(question.id)}>
                                                        {question.yes}
                                                    </button>
                                                </div>
                                                <p style={{marginLeft:'10px'}}>{question.question}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }

                    </div>
                    <div className="question-container">
                       <Summary />
                        <div>
                            <div style={{display:'flex', alignItems:'baseline', flexDirection:'row',justifyContent:'space-between', marginTop:'50px'}}>
                                <h3 style={{flex:'1'}}>Need to know</h3>
                                <img src={Info} style={{width:'20px', height:'20px', marginLeft:'10px', color:'black'}}
                                     onClick={()=>{formData.showInfo1 === true ?
                                         setFormData({...formData, showInfo1: false}) : setFormData({...formData, showInfo1: true})}}
                                />
                                <img src={Info} style={{width:'20px', height:'20px', marginLeft:'10px'}}
                                     onClick={()=>{formData.showInfo2 === true ?
                                         setFormData({...formData, showInfo2: false}) : setFormData({...formData, showInfo2: true})}}
                                />
                                <FaArrowRight size={20} className={formData.show === true ? 'rotate-up': 'rotate-down'}
                                              style={{alignSelf:'end', marginBottom:'10px', width:'30px'}}
                                              onClick={() => {formData.show === true ? setFormData({...formData, show: false}) :
                                                  setFormData({...formData, show: true})}}
                                />
                            </div>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', marginTop:'10px', padding:'5px'}}>
                                {formData.showInfo1 === true &&  <div style={{flex:'1'}} className={'slide-in'}>
                                    <h4 style={{color:'blue'}}>Estimated amount</h4>
                                    <p>
                                        As we charge customers by Pay as You Go approach, you will pay only for
                                        the real time a cleaner worked at your property.
                                        If the cleaning job is completed faster than it was estimated,
                                        you will pay less. In case your cleaning job took longer time,
                                        you will pay a little bit more but never more than 1 hour extra.
                                    </p>
                                </div>}
                                {formData.showInfo2 === true &&  <div style={{flex:'1'}} className={'slide-in'}>
                                    <h4 style={{color:'blue'}}>Estimated duration</h4>
                                    <p>
                                        Based on your selection our system estimates the time it would take for our Fly cleaners to clean your home and usually,
                                        we are able complete your cleaning job within the estimated time however we may need an additional
                                        hour if the property is more dirty or larger than estimated.
                                    </p>
                                </div>}
                            </div>
                            <div style={formData.show === true ? showQs : hideQs}>
                                {carpetCleaningFAQs.map(question => (
                                    <div key={question.id}>
                                        <div style={{display:'flex', alignItems:'center', flexDirection:'row', marginTop:'20px'}}>
                                            <h4>{question.question}</h4>
                                            <MdKeyboardArrowDown className={formData.questionIds.includes(question.id) ? 'rotate-up': 'rotate-down'} size={30} style={{width:'30px', marginLeft:'10px'}}
                                                                 onClick={() => updateIds(question.id)}
                                            />
                                        </div>
                                        {formData.questionIds.includes(question.id) && <p style={{marginLeft:'10px'}} className={'slide-in'}>{question.answer}</p> }
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {formData.bookingEmpty &&  <h1 style={{marginLeft:'10px'}} className={["error-message", "slide-in"].join(" ")}>Please select where or what to clean</h1> }
                <div style={{marginLeft:'10px,', marginRight:'10px', padding:'10px', maxWidth:'700px'}} className="form-actions">
                    <button type="button" className="back-button" onClick={() => setCurrentStep(currentStep -1)}>
                        Back
                    </button>
                    <button id={'booking'} name={'booking'} type="button" className="next-button"
                            onClick={ handleValidation2 }>
                        Next
                    </button>
                </div>
            </div>
        );
    }

    const handleValueChange = (e) => {
        const newErrors = errors;
        newErrors[e.target.category] = null;
        setErrors(newErrors);
        setFormData({...formData,  [e.target.category]: e.target.value });
    }

    // const validationSchema = Yup.object().shape({
    //     firstName: Yup.string().required('First name is required'),
    //     lastName: Yup.string().required('Last name is required'),
    //     email: Yup.string().email('Invalid email').required('Email is required'),
    //     phone: Yup.string().required('Phone number is required'),
    //     address: Yup.string().required('Address is required'),
    //     date: Yup.date().required('Date is required'),
    // });
    //
    // const formik = useFormik({
    //     initialValues: formData,
    //     onSubmit: values => {
    //         // Final form submission
    //         console.log('Form submitted:', values);
    //     }
    // });
    //
    // // Debounced save function
    // const debouncedSave = useCallback(
    //     debounce((name, value) => {
    //         // Use functional update to avoid stale state
    //         setFormData(prevFormData => ({
    //             ...prevFormData,
    //             [name]: value
    //         }));
    //     }, 1000),
    //     [] // Still empty because debounce doesn't depend on external values
    // );
    //
    // // Handle field changes with debounce
    // const handleFieldChange = (e) => {
    //     const { name, value } = e.target;
    //     // Immediate update for responsiveness
    //     setFormData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));
    //     // Debounced save
    //     debouncedSave(name, value);; // Debounced save
    // };
    //
    // // Cleanup debounce on unmount
    // useEffect(() => {
    //    // return () => debouncedSave.cancel();
    // }, []);


    const Data = () => {
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [email, setEmail] = useState('');
        const [phone, setPhone] = useState('');
        const [address, setAddress] = useState('');

        const [useOldRecord, setUseOldRecord] = useState(false);
        const [missingRecord, setMissingRecord] = useState(false);

        const handleAcknwoledgeChange = (e) => {
            e.preventDefault();
            setAcknwoledge(e.target.checked);
            setMissingRecord(false);
        }

        const [oldRecord, setOldRecord] = useState('');
        const [dataErrors, setDataErrors] = useState({});
        const [acknwoledge, setAcknwoledge] = useState(false);

        const [dataMessage, setDataMessage] = useState('Required record(s) from your data are missing or incomplete. Please  fill the form to continue');

        useEffect(() => {
            if (!useOldRecord) {
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhone('');
                setAddress('');
            }
            else {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    setDataMessage('Required record(s) from your data are missing or incomplete. Please  fill the form to continue')
                    setMissingRecord(true);
                    return
                }
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setEmail(user.email);
                setPhone(user.phone);
                setAddress(user.address);
            }
            setAcknwoledge(false);
        }, [useOldRecord]);

        const handleOldRecordChange = (e) => {
            e.preventDefault();
            setUseOldRecord(e.target.checked);

        }

        const validateData = () => {
            let newErrors = {};
            setDataErrors({})
            const user = JSON.parse(localStorage.getItem('user'));
            if (!firstName) {
                newErrors.firstName = 'First name is required';
            }
            if (!lastName) {
                newErrors.lastName = 'last name is required';
            }
            if (!phone) {
                newErrors.phone = 'phone is required';
            }
            if (!address) {
                newErrors.address = 'address is required';
            }
            if (!email) {
                newErrors.email = 'email is required';
            }
            else if (!/^\S+@\S+\.\S+$/.test(email)) {
                newErrors.email = 'Email is invalid';
            }
            if (Object.keys(newErrors).length > 0) {
                setDataErrors(newErrors);
                return;
            }
            if (useOldRecord && !acknwoledge) {
                setDataMessage('Please review and acknowledge that the records from your data are correct');
                setMissingRecord(true);
                return;
            }
            setFormData({
                ...formData,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                address: address,
            })
            setCurrentStep(currentStep + 1);
        }

        return (
            <div>
                <div className={['checkout-box', 'main-banner'].join(' ')}>
                    <div className={['checkout-container', 'main-banner'].join(' ')}>
                        <h3 className={'experience-text'} style={{ marginTop: '20px' }}>Contact details</h3>
                        <p style={{ marginLeft: '20px', marginBottom: '30px' }}>
                            Please note that contact details are necessary to manage your orders
                        </p>
                        <div   style={{display:'flex', alignItems:'center', gap: '5px'}}>
                            <input
                                type="checkbox"
                                checked={useOldRecord}
                                onChange={handleOldRecordChange}
                                name="useOldRecord"
                            />
                            <h3 className={'experience-text'} htmlFor="useOldRecord">Use records from my data</h3>
                        </div>
                        <div className="form-step">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name*</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="button-bg"
                                />
                                {dataErrors.firstName && <label style={{color:'red'}}>{dataErrors.firstName}</label>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Last Name*</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="button-bg"
                                />
                                {dataErrors.lastName && <label style={{color:'red'}}>{dataErrors.lastName}</label>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email*</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="button-bg"
                                />
                                {dataErrors.email && <label style={{color:'red'}}>{dataErrors.email}</label>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number*</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="button-bg"
                                />
                                {dataErrors.phone && <label style={{color:'red'}}>{dataErrors.phone}</label>}
                            </div>
                        </div>

                        <div className="form-group">
                            <select
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="button-bg">
                                {formData.addresses.map((address, index) => (
                                    <option key={index} value={address}>{address}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <p>Please provide your address if not in the list above</p>
                            <input
                                type="textarea"
                                id="address"
                                name="address"
                                placeholder="Your address"
                                rows="5"
                                cols="50"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="button-bg"
                            />
                            {dataErrors.address && <label style={{color:'red'}}>{dataErrors.address}</label>}
                        </div>

                        {useOldRecord &&
                            <div style={{display:'flex', alignItems:'center', gap: '5px'}}>
                                <input
                                    type="checkbox"
                                    checked={acknwoledge}
                                    onChange={() => setAcknwoledge(!acknwoledge)}
                                    name="acknowledge"
                                />
                                <label htmlFor="acknowledge">I acknowledge that the records from my data are correct</label>
                            </div>
                        }
                    </div>
                    <div className="question-container">
                        <Summary />
                        {starter !== starters[2].starter &&  <div>
                            <div style={{display:'flex', alignItems:'baseline', flexDirection:'row',justifyContent:'space-between', marginTop:'50px'}}>
                                <h3 style={{flex:'1'}}>Need to know</h3>
                                <FaArrowRight size={20} className={formData.show2 === true ? 'rotate-up': 'rotate-down'}
                                              style={{alignSelf:'end', marginBottom:'10px', width:'30px'}}
                                              onClick={() => {formData.show2 === true ? setFormData({...formData, show2: false}) :
                                                  setFormData({...formData, show2: true})}}
                                />
                            </div>
                            <div style={formData.show2 === true ? showQs : hideQs}>
                                {paymentFAQs.map(question => (
                                    <div key={question.id}>
                                        <div style={{display:'flex', alignItems:'center', flexDirection:'row', marginTop:'20px'}}>
                                            <h4>{question.question}</h4>
                                            <MdKeyboardArrowDown className={formData.questionIds2.includes(question.id) ? 'rotate-up': 'rotate-down'} size={30} style={{width:'30px', marginLeft:'10px'}}
                                                                 onClick={() => updateIds2(question.id)}
                                            />
                                        </div>
                                        {formData.questionIds2.includes(question.id) && <p style={{marginLeft:'10px'}} className={'slide-in'}>{question.answer}</p> }
                                    </div>
                                ))}
                                <div style={{display:'flex', alignItems:'center', flexDirection:'row', marginTop:'20px'}}>
                                    <h4>Are my payment details secure?</h4>
                                    <MdKeyboardArrowDown className={formData.questionIds2.includes(2) ? 'rotate-up': 'rotate-down'} size={30} style={{width:'30px', marginLeft:'10px'}}
                                                         onClick={() => updateIds2(2)}
                                    />
                                </div>
                                {formData.questionIds2.includes(2) && <p style={{marginLeft:'10px'}} className={'slide-in'}>
                                    Yes, your bank details are securely stored by <Link to={'https://stripe.com/'} style={{color:'blue'}}>Stripe</Link>, which handles all payments with industry-standard encryption.
                                </p> }
                            </div>
                        </div> }
                        {starter === starters[2].starter &&  <div>
                            <div style={{display:'flex', alignItems:'baseline', flexDirection:'row',justifyContent:'space-between', marginTop:'50px'}}>
                                <h3 style={{flex:'1'}}>Need to know</h3>
                                <img src={Info} style={{width:'20px', height:'20px', marginLeft:'10px', color:'black'}}
                                     onClick={()=>{formData.showInfo1 === true ?
                                         setFormData({...formData, showInfo1: false}) : setFormData({...formData, showInfo1: true})}}
                                />
                                <img src={Info} style={{width:'20px', height:'20px', marginLeft:'10px'}}
                                     onClick={()=>{formData.showInfo2 === true ?
                                         setFormData({...formData, showInfo2: false}) : setFormData({...formData, showInfo2: true})}}
                                />
                                <FaArrowRight size={20} className={formData.show === true ? 'rotate-up': 'rotate-down'}
                                              style={{alignSelf:'end', marginBottom:'10px', width:'30px'}}
                                              onClick={() => {formData.show === true ? setFormData({...formData, show: false}) :
                                                  setFormData({...formData, show: true})}}
                                />
                            </div>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', marginTop:'10px', padding:'5px'}}>
                                {formData.showInfo1 === true &&  <div style={{flex:'1'}} className={'slide-in'}>
                                    <h4 style={{color:'blue'}}>Estimated amount</h4>
                                    <p>
                                        As we charge customers by Pay as You Go approach, you will pay only for
                                        the real time a cleaner worked at your property.
                                        If the cleaning job is completed faster than it was estimated,
                                        you will pay less. In case your cleaning job took longer time,
                                        you will pay a little bit more but never more than 1 hour extra.
                                    </p>
                                </div>}
                                {formData.showInfo2 === true &&  <div style={{flex:'1'}} className={'slide-in'}>
                                    <h4 style={{color:'blue'}}>Estimated duration</h4>
                                    <p>
                                        Based on your selection our system estimates the time it would take for our Fly cleaners to clean your home and usually,
                                        we are able complete your cleaning job within the estimated time however we may need an additional
                                        hour if the property is more dirty or larger than estimated.
                                    </p>
                                </div>}
                            </div>
                            <div style={formData.show === true ? showQs : hideQs}>
                                {carpetCleaningFAQs.map(question => (
                                    <div key={question.id}>
                                        <div style={{display:'flex', alignItems:'center', flexDirection:'row', marginTop:'20px'}}>
                                            <h4>{question.question}</h4>
                                            <MdKeyboardArrowDown className={formData.questionIds.includes(question.id) ? 'rotate-up': 'rotate-down'} size={30} style={{width:'30px', marginLeft:'10px'}}
                                                                 onClick={() => updateIds(question.id)}
                                            />
                                        </div>
                                        {formData.questionIds.includes(question.id) && <p style={{marginLeft:'10px'}} className={'slide-in'}>{question.answer}</p> }
                                    </div>
                                ))}
                            </div>
                        </div> }
                    </div>
                </div>
                {missingRecord && <label style={{color:'red', paddingLeft:'10px', paddingRight:'10px'}}>{dataMessage}</label>}
                <div style={{marginLeft:'40px,', marginRight:'40px', padding:'20px', maxWidth:'700px'}} className="form-actions">
                    <button type="button" className="back-button" onClick={() => setCurrentStep(currentStep -1)}>
                        Back
                    </button>
                    <button type="button" className="next-button" onClick={validateData}>
                        Next
                    </button>
                </div>
            </div>
        );
    };

    function PaymentPlatform() {

        return(
            <div className={'price-container'}>
                <h2 style={{color:'blue', paddingLeft:'10px'}}>Payment details</h2>
                <p style={{paddingLeft:'15px', paddingRight:'5px'}}>
                    Please note that your payement details are securely
                    stored and managed by third-party.
                </p>
                <Elements stripe={stripePromise}>
                    <PaymentHome  />
                </Elements>
            </div>
        );
    }

    return (
        <div className={['form-group', 'main-banner'].join(' ')}
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}>
            <div className="sticky-nav-container">
                <nav  className='top-order-nav'>
                    {(formData.totalAmount > 0 && !isVisible) && <p className={'booking-amount'}>
                            Total Amount: £{formData.totalAmount}
                    </p> }
                    <div className="nav-order-content">
                        <img style={{display:'none'}} src={LOGO} className={'logo-icon'}/>
                        <Steps />
                    </div>
                </nav>
                <main className={["main-content", "main-banner"].join(" ")}>
                    <div style={{
                        width:'100%',
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        marginTop:'20px'}}>
                        <div className={['form-group', 'main-banner'].join(' ')}>
                            {currentStep <= 0 &&  <Plan /> }
                            {currentStep === 1 &&  <Schedule />}
                            {currentStep === 2 && <Task /> }
                            {currentStep === 3 &&  <Data /> }
                            {currentStep === 4  && <div>
                                    <div className={['checkout-box', 'main-banner'].join(' ')}>
                                    <div  className={['checkout-container', 'main-banner'].join(' ')}>
                                        <div>
                                            <div>
                                                <div style={{display:'flex', alignItems:'center', flexDirection:'row', marginTop:'20px'}}>
                                                    <input
                                                        id="policy"
                                                        name={'policy'}
                                                        type='checkbox'
                                                        onChange={(e) => setFormData({...formData, policy: e.target.checked})}
                                                    />
                                                    <label style={{marginTop:'10px', marginLeft:'10px', maxWidth:'900px'}}>Fly cleaners require personal data to process your booking.
                                                        For more information please see our <Link to={'/privacy'} style={{color:'blue'}}>Privacy </Link>policy.
                                                        By ticking this box you accept our <Link to={'/booking'} style={{color:'blue'}}>Booking</Link>,
                                                        <Link style={{color:'blue'}} to={'/terms'}>Terms & Conditions</Link> and <Link style={{color:'blue'}} to={'/cancellation'}>Cancellation </Link>policies.</label>
                                                </div>
                                                {errors.policy && <span className="error-message">{errors.policy}</span>}
                                            </div>
                                            <div>
                                                <div style={{display:'flex', alignItems:'center', flexDirection:'row', marginTop:'20px'}}>
                                                    <input
                                                        id="authorization"
                                                        name={'authorization'}
                                                        type='checkbox'
                                                        onChange={(e) => setFormData({...formData, authorization: e.target.checked})}
                                                    />
                                                    <label style={{marginTop:'10px', marginLeft:'10px', maxWidth:'900px'}}>
                                                        In accordance with the Strong Customer Authentication Regulation (SCA), I authorise you, Fly cleaners,
                                                        to send instructions to the financial institution that issue my card to take payments from my card in accordance with the <Link to={'/terms'} style={{color:'blue'}}>terms of my agreement</Link> with you
                                                    </label>
                                                </div>
                                                {errors.authorization && <span className="error-message">{errors.authorization}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="question-container">
                                        <div style={{backgroundColor:'burlywood', padding:'10px', borderRadius:'12px'}}>
                                            <h3 style={{textAlign:'center', marginBottom:'20px'}}>Booking Summary</h3>
                                            <div style={{display:'flex', flexDirection:'row', alignItems:'start', justifyContent:'center'}}>
                                                <p style={{textAlign:'center'}}>{format(formData.date, 'EEEE, d MMMM yyyy')} {formData.time}</p>
                                            </div>
                                            <div style={{display:'flex', alignItems:'center', padding:'5px'}}>
                                                <p style={{width:'40px'}}>Tarrif</p>
                                                {formData.plan.includes('One-Off') &&  <h3 style={{textAlign:'end'}}>{formData.plan}/{formData.planType}</h3> }
                                                {!formData.plan.includes('One-Off') &&  <h3 style={{textAlign:'end'}}>{formData.plan} <span style={{fontWeight:'lighter'}}>Subscription</span></h3> }
                                            </div>
                                            <div style={{display:'flex', alignItems:'center', padding:'5px'}}>
                                                <p>Rate</p>
                                                <h3 style={{textAlign:'end'}}>£{formData.rate}/h</h3>
                                            </div>
                                            <div style={{display:'flex', alignItems:'center', padding:'5px'}}>
                                                <p>Minimum Price</p>
                                                <h3 style={{textAlign:'end'}}>£{formData.minimumEstimate}</h3>
                                            </div>

                                            {!formData.onSubscription &&  <div style={{display:'flex', alignItems:'center', padding:'5px'}}>
                                                <p>Level of dirt</p>
                                                <h3 style={formData.nature === 'Light' ? {color:'green', textAlign:'end'} :
                                                    formData.nature === 'Medium' ? {color:'blue', textAlign:'end'}: {color:'red', textAlign:'end'}}>
                                                    {formData.nature}
                                                </h3>
                                            </div> }

                                            {formData.durationQty > 0 &&  <div style={{display:'flex', alignItems:'center', padding:'5px'}}>
                                                <p>Estimated duration</p>
                                                <h3 style={{textAlign:'end'}}>{formData.duration}</h3>
                                            </div> }

                                        </div>
                                        {formData.booking.map(task => (
                                            <div key={task.id}>
                                                <div className={task.totalPrice <= 10 ? 'one':
                                                    task.totalPrice > 10 && task.totalPrice <= 15 ? 'two' : 'more'}>
                                                    <div className={'line'} style={{height:'1px'}}/>
                                                    <div className={'summary-row'}>
                                                        {task.time2 > 0 ? <p>{task.plan} {task.time2}min </p> : <p>{task.plan}</p>}
                                                        {task.unitPrice > 0 && task.id < 20 && <p style={{textAlign:'center', flex:'1'}}>{task.count}</p> }
                                                        {task.unitPrice > 0 && task.id < 20 && <MdAdd style={{width:'30px', height:'30px', marginLeft:'10px', marginRight:'10px'}}
                                                                                                      onClick={() =>
                                                                                                      {task.id <= 10 ? addRoomQuote(task.id) : addApplienceQuote(task.id)}}
                                                        /> }
                                                        <p style={{textAlign:'end'}}>£{task.totalPrice}</p>
                                                        <FaTimes style={{width:'30px', marginLeft:'10px'}} onClick={() => clearBooking(task.id)} />
                                                    </div>
                                                    <div className={'line'} style={{height:'1px'}}/>
                                                </div>
                                            </div>
                                        ))}
                                        {formData.choresPrevPrice > 0 && <div>
                                            {formData.chores.map(task => (
                                                <div key={task.id}>
                                                    <div className={'chores'}>
                                                        <div className={'summary-row'}>
                                                            {task.time2 > 0 ? <p>{task.plan} {task.time2}min </p> : <p>{task.plan}</p>}
                                                            {task.time.length > 0 && <p style={{textAlign:'center', flex:'1'}}>{task.time}</p> }
                                                            <p style={{textAlign:'end'}}>£{task.totalPrice}</p>
                                                            <FaTimes style={{width:'30px', marginLeft:'10px'}}
                                                                     onClick={() => setFormData({...formData,
                                                                         totalAmount: (formData.totalAmount - formData.choresPrevPrice),
                                                                         choresPrevPrice: 0,
                                                                         erranTimeInMinutes: 0,
                                                                         errandTime: '0'
                                                                     })
                                                                     }/>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>}
                                        <div className={'line'} style={{height:'2px'}}/>
                                        {formData.totalAmount > 0 && <div className={'total'}>
                                            <h3 style={{fontSize:'x-large'}} >Estimated amount</h3>
                                            <p style={{color:'red', alignItems:'end', flex:'1'}}>£{formData.totalAmount}</p>
                                        </div>}
                                        <div className={'line'} style={{height:'2px'}}/>
                                        {starter !== starters[2].starter && <div>
                                            <div style={{display:'flex', alignItems:'baseline', flexDirection:'row',justifyContent:'space-between', marginTop:'50px'}}>
                                                <h3 style={{flex:'1'}}>Need to know</h3>
                                                <FaArrowRight size={20} className={formData.show2 === true ? 'rotate-up': 'rotate-down'}
                                                              style={{alignSelf:'end', marginBottom:'10px', width:'30px'}}
                                                              onClick={() => {formData.show2 === true ? setFormData({...formData, show2: false}) :
                                                                  setFormData({...formData, show2: true})}}
                                                />
                                            </div>

                                            <div style={formData.show2 === true ? showQs : hideQs}>
                                                {paymentFAQs2.map(question => (
                                                    <div key={question.id}>
                                                        <div style={{display:'flex', alignItems:'center', flexDirection:'row', marginTop:'20px'}}>
                                                            <h4>{question.question}</h4>
                                                            <MdKeyboardArrowDown className={formData.questionIds2.includes(question.id) ? 'rotate-up': 'rotate-down'} size={30} style={{width:'30px', marginLeft:'10px'}}
                                                                                 onClick={() => updateIds2(question.id)}
                                                            />
                                                        </div>
                                                        {formData.questionIds2.includes(question.id) && <p style={{marginLeft:'10px'}} className={'slide-in'}>{question.answer}</p> }
                                                    </div>
                                                ))}

                                                <div style={{display:'flex', alignItems:'center', flexDirection:'row', marginTop:'20px'}}>
                                                    <h4>Are my payment details secure?</h4>
                                                    <MdKeyboardArrowDown className={formData.questionIds2.includes(6) ? 'rotate-up': 'rotate-down'} size={30} style={{width:'30px', marginLeft:'10px'}}
                                                                         onClick={() => updateIds2(6)}
                                                    />
                                                </div>
                                                {formData.questionIds2.includes(6) && <p style={{marginLeft:'10px'}} className={'slide-in'}>
                                                    Yes, your bank details are securely stored by <Link to={'https://stripe.com/'} style={{color:'blue'}}>Stripe</Link>, our PCI-compliant payment processor. We never store card details directly.
                                                </p> }
                                            </div>
                                        </div> }
                                        { starter === starters[2].starter &&
                                            <div>
                                                <div style={{display:'flex', alignItems:'baseline', flexDirection:'row',justifyContent:'space-between', marginTop:'50px'}}>
                                                    <h3 style={{flex:'1'}}>Need to know</h3>
                                                    <img src={Info} style={{width:'20px', height:'20px', marginLeft:'10px', color:'black'}}
                                                         onClick={()=>{formData.showInfo1 === true ?
                                                             setFormData({...formData, showInfo1: false}) : setFormData({...formData, showInfo1: true})}}
                                                    />
                                                    <img src={Info} style={{width:'20px', height:'20px', marginLeft:'10px'}}
                                                         onClick={()=>{formData.showInfo2 === true ?
                                                             setFormData({...formData, showInfo2: false}) : setFormData({...formData, showInfo2: true})}}
                                                    />
                                                    <FaArrowRight size={20} className={formData.show === true ? 'rotate-up': 'rotate-down'}
                                                                  style={{alignSelf:'end', marginBottom:'10px', width:'30px'}}
                                                                  onClick={() => {formData.show === true ? setFormData({...formData, show: false}) :
                                                                      setFormData({...formData, show: true})}}
                                                    />
                                                </div>
                                                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', marginTop:'10px', padding:'5px'}}>
                                                    {formData.showInfo1 === true &&  <div style={{flex:'1'}} className={'slide-in'}>
                                                        <h4 style={{color:'blue'}}>Estimated amount</h4>
                                                        <p>
                                                            As we charge customers by Pay as You Go approach, you will pay only for
                                                            the real time a cleaner worked at your property.
                                                            If the cleaning job is completed faster than it was estimated,
                                                            you will pay less. In case your cleaning job took longer time,
                                                            you will pay a little bit more but never more than 1 hour extra.
                                                        </p>
                                                    </div>}
                                                    {formData.showInfo2 === true &&  <div style={{flex:'1'}} className={'slide-in'}>
                                                        <h4 style={{color:'blue'}}>Estimated duration</h4>
                                                        <p>
                                                            Based on your selection our system estimates the time it would take for our Fly cleaners to clean your home and usually,
                                                            we are able complete your cleaning job within the estimated time however we may need an additional
                                                            hour if the property is more dirty or larger than estimated.
                                                        </p>
                                                    </div>}
                                                </div>
                                                <div style={formData.show === true ? showQs : hideQs}>
                                                    {carpetCleaningFAQs.map(question => (
                                                        <div key={question.id}>
                                                            <div style={{display:'flex', alignItems:'center', flexDirection:'row', marginTop:'20px'}}>
                                                                <h4>{question.question}</h4>
                                                                <MdKeyboardArrowDown className={formData.questionIds.includes(question.id) ? 'rotate-up': 'rotate-down'} size={30} style={{width:'30px', marginLeft:'10px'}}
                                                                                     onClick={() => updateIds(question.id)}
                                                                />
                                                            </div>
                                                            {formData.questionIds.includes(question.id) && <p style={{marginLeft:'10px'}} className={'slide-in'}>{question.answer}</p> }
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        }
                                    </div>

                                </div>
                                    <div style={{marginLeft:'40px,',
                                    marginRight:'40px',
                                    padding:'20px', maxWidth:'700px'}} className="form-actions">
                                    <button disabled={processing} type="button" className="back-button" onClick={() => setCurrentStep(currentStep -1)}>
                                        Back
                                    </button>
                                    <button disabled={processing} onClick={checkAuthorizationAndFetchData} type="button" className="next-button">
                                        {processing ? 'Processing data...' : 'Next'}
                                    </button>
                                </div>
                                </div>}
                            {(clientSecret && clientSecret?.trim().length > 0 && currentStep === 5) && <PaymentPlatform />}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )

}

export default Checkout;