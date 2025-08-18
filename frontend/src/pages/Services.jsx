import ServiceBG from '../images/service.png'
import Footer from '../pages/Footer.jsx'
import React, {useState, useRef, useEffect} from "react";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Sweeping from "../images/sweeping.png";
import Arranged from "../images/arranged.png";
import Booking from "../images/booking.png";
import Currency from "../images/currency.png";
import Manage from "../images/manage.png";
import Result1 from "../images/result1.png";
import Result2 from "../images/result2.png";
import Result3 from "../images/result3.png";
import Result4 from "../images/result4.png";
import Result5 from "../images/result5.png";
import Result6 from "../images/result6.png";
import Result7 from "../images/result7.png";
import Result8 from "../images/result8.png";
import Available from "../images/available.png";
import Best  from "../images/best2.png";
import Payment from "../images/payAsGo.png";
import Time from "../images/time.png";
import Kept from "../images/kept.png";
import Neat from "../images/neat.png";
import NeatBathroom from "../images/neatBathroom.png";
import Combine from "../images/combine.png";
import Kitchen from "../images/kitchen.png";
import ArrangedRoom from "../images/arrangedRoom.png";
import Move from "../images/fresh.png";
import Day from "../images/day.png";
import Stairs from "../images/stairs.png";
import Office from "../images/office.png";
import Rug from "../images/rug.png";
import Greasy from "../images/greasy.png";
import Cleaners from "../images/cleaners.png";
import Mattress from "../images/mattress.png";
import Sofa from "../images/sofa.png";
import Suit from "../images/suit.png";
import Carpet from "../images/rug.png";
import Rugs from "../images/allRugs.png";
import RugMethod from "../images/rugMethod.png";
import NeatKitchen from "../images/neatKitchen.png";
import Kitchen2 from "../images/kitchen2.png";
import Kitchen3 from "../images/kitchen3.png";
import Bathroom2 from "../images/bathroom2.png";
import Bathroom3 from "../images/bathroom3.png";
import Bathroom4 from "../images/bathroom4.png";
import Meeting from "../images/meeting.png";
import {useLocation, useNavigate } from 'react-router-dom'
import { isValidUKPostcodeFormat, checkPostcodeExists } from './Postcode.jsx'

const Services = () => {
  const location  = useLocation();
  const state  = location?.state;
  const navigate = useNavigate();

  const active = {color:'red', textDecoration: 'underline', padding: '8px'};
  const notActive = {color:'navy', padding:'8px'}
  const miniTask = [
    {
      id: 1,
      task: "Bedroom",
      details: [
        {
          id: 1,
          description: "Wiping all exteriors, cleaning mirrors, and getting rid of fingerprints"
        },
        {
          id: 2,
          description: "Organising the bedding"
        },
        {
          id: 3,
          description: "Dusting light fixtures, doorknobs, and skirting boards"
        },
        {
          id: 4,
          description: "Dusting and mopping the floor"
        },
        {
          id: 5,
          description: "Tidying and folding clothes"
        },
        {
          id: 6,
          description: "Dusting, cleaning and polishing appliances, furniture, and windows"
        },
        {
          id: 7,
          description: "Laundry services"
        }
      ]
    }
  ]
  const miniOffice = [
    {
      id: 1,
      task: "Clean any leftover office equipment"
    },
    {
      id: 2,
      task: "Dust and wipe office desks"
    },
    {
      id: 3,
      task: "Wipe mirrors and glass fixtures"
    },
  ]
  const miniList = [
    {
      id: 1,
      item: "Fly cleaner professional cleaners will go above and beyond your expectations, whether you need a one-time clean or a recurring cleaning contract."
    },
    {
      id: 2,
      item: "Over the years, we have cleaned a lot of residential and commercial locations, and we don't think any work is too big or too small."
    },
    {
      id: 3,
      item: "At Fly cleaners, we prioritize quality in all of our operations, employing only the top cleaning supplies and disinfecting methods."
    },
    {
      id: 4,
      item: "We have many years of experience in the field and a keen eye for detail. As a result, we never leave until every assignment has been completed to the highest standards."
    },
  ]
  const miniMove = [
    {
      id: 1,
      tag: "Professional and Reliable Service",
      reason: "Cleaning services from eMop are competent, dependable, and fully insured. Your cleaning jobs will be addressed with great quality and attention to detail thanks to our team of seasoned and background-checked cleaners."
    },
    {
      id: 2,
      tag: "Convenience and Flexibility",
      reason: "You have the ease of scheduling cleaning services with Fly cleaners online. You can select a time that works for you thanks to our flexible scheduling choices. The prompt serviceName provided by Fly cleaners guarantees that your cleaning will be finished within the scheduled window of time."
    },
  ]
  const miniChecklist = [
    {
      id: 1,
      task: "Living Room & Bedroom Cleaning",
      checklist: [
        "Remove dust and cobwebs from the ceiling",
        "Clean the doors and their tops",
        "Remove any dust from wooden furniture's skirting boards",
        "Internally clean windows, including the ledges and sills",
        "Clean the interior, outside, and tops of any cabinets or wardrobes",
        "Tidy curtain rails, picture rails, cornices, and coving",
        "Clean and polish photos and mirrors"
      ],
      src: Neat
    },
  ]
  const miniHousehold = [
    {
      id: 1,
      task: "Cleaning fridge (inside & outside)"
    },
    {
      id: 2,
      task: "Cleaning windows"
    },
    {
      id: 3,
      task: "Ironing"
    },
    {
      id: 4,
      task: "Laundry"
    },
    {
      id: 5,
      task: "Cleaning microwave"
    },
    {
      id: 6,
      task: "Cleaning kitchen"
    },
  ]

  const services = [
    { id: 1, icon: 'fa-home', title: 'Deep', description: 'Detailed deep cleaning for your home'},
    { id: 2, icon: 'fa-home', title: 'Upholstery', description: 'Upholstery cleaning for surfaces'},
    { id: 3, icon: 'fa-home', title: 'Regular', description: 'Regular cleaning for your home'},
    { id: 4, icon: 'fa-building', title: 'Oven', description: 'Oven cleaning services'},
    { id: 5, icon: 'fa-couch', title: 'End of tenancy', description: 'Thorough cleaning to get your deposit back'},
    { id: 6, icon: 'fa-rug', title: 'Carpet', description: 'Professional deep cleaning for carpets'},
    { id: 7, icon: 'fa-home', title: 'Office', description: 'Detailed cleaning for office space'},
    { id: 8, icon: 'fa-home', title: 'Same day', description: 'Quickly get your home in order as quickly as possible'},
    { id: 9, icon: 'fa-home', title: 'Move in', description: 'We will get your new home ready for habitaion'},
    { id: 10, icon: 'fa-home', title: 'Rug', description: 'Professional deep cleaning for rugs'},
    { id: 11, icon: 'fa-home', title: 'Kitchen deep', description: 'Professional deep kitchen cleaning'},
    { id: 12, icon: 'fa-home', title: 'Bathroom', description: 'We provide deep cleaning for bathrooms'},
  ];
  const miniResults = [
    {id:1, src: Result1},
    {id:2, src: Result2},
    {id:3, src: Result3}
  ]
  const miniIspection = [
    {
      id: 1,
      category: "Inspection",
      detail: "Fly cleaners' fully insured personnel prepare the space and make sure all surfaces are reachable before beginning the deep cleaning procedure. So they don't miss any places during the cleaning, they may gently reorganise the furniture in the agreed-upon order. This preparation guarantees that every nook and cranny, high point and low point is prepared for a comprehensive cleaning, laying the groundwork for a deep cleaning session of the highest quality."
    },
  ]

  const scrollRef = useRef(null);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const [postcode, setPostcode] = useState('');
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);
  const [serviceName, setServiceName] = useState(services[0].title);
  const [serviceDesc, setServiceDesc] = useState(services[0].description);
  const [resultList, setResultList] = useState(miniResults);
  const [layout, setLayout] = useState(null);
  const [tasklist, setTaskList] = useState(miniTask);
  const [inspectionList, setInspectionList] = useState(miniIspection);
  const [officeList, setOfficeList] = useState(miniOffice);
  const [highlist, setHighlist] = useState(miniList);
  const [moveInList, setMoveInList] = useState(miniMove);
  const [checklistImg, setChecklistImg] = useState(Neat);
  const [checklist, setChecklist] = useState(miniChecklist);
  const [householdList, setHouseholdList] = useState(miniHousehold)
  const [clearText, setClearText] = useState({display:''});

  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [question4, setQuestion4] = useState('');
  const [question5, setQuestion5] = useState('');
  const [question6, setQuestion6] = useState('');
  const [question7, setQuestion7] = useState('');

  const [styleRight1, setStyleRight1] = useState({
    display: '',
    width: '60px',
    color: 'navy',
  });
  const [styleLeft1, setStyleLeft1] = useState({
    display: 'none',
    width: '60px',
    color: 'navy',
  });

  const [styleRight2,setStyleRight2] = useState({
    display: '',
    width: '60px',
    color: 'navy',
  });
  const [styleLeft2,setStyleLeft2] = useState({
    display: 'none',
    width: '60px',
    color: 'navy',
  });

  const [styleRight3,setStyleRight3] = useState({
    display: '',
    width: '60px',
    color: 'navy',
  });
  const [styleLeft3, setStyleLeft3] = useState({
    display: 'none',
    width: '60px',
    color: 'navy',
  });

  const [styleRight4,setStyleRight4] = useState({
    display: '',
    width: '60px',
    color: 'navy',
  });
  const [styleLeft4,setStyleLeft4] = useState({
    display: 'none',
    width: '60px',
    color: 'navy',
  });

  const [styleRight5,setStyleRight5] = useState({
    display: '',
    width: '60px',
    color: 'navy',
  });
  const [styleLeft5,setStyleLeft5] = useState({
    display: 'none',
    width: '60px',
    color: 'navy',
  });

  const [styleRight6,setStyleRight6] = useState({
    display: '',
    width: '60px',
    color: 'navy',
  });
  const [styleLeft6,setStyleLeft6] = useState({
    display: 'none',
    width: '60px',
    color: 'navy',
  });

  const [styleRight7,setStyleRight7] = useState({
    display: '',
    width: '60px',
    color: 'navy',
  });
  const [styleLeft7,setStyleLeft7] = useState({
    display: 'none',
    width: '60px',
    color: 'navy',
  });

  const arrowRightStyleOff = {
    display: 'none',
    width: '60px',
    color: 'navy',
  }

  const arrowRightStyleOn = {
    display: '',
    width: '60px',
    color: 'navy',
  }

  const arrowLeftStyleOff = {
    display: 'none',
    width: '60px',
    color: 'navy',
  }

  const arrowLeftStyleOn = {
    display: '',
    width: '60px',
    color: 'navy',
  }

  const handleRight1 = () => {
    setStyleRight1(arrowRightStyleOff)
    setStyleLeft1(arrowLeftStyleOn)
    setQuestion1('We provide deep cleaning in Edinburgh from £16/h. All of our rates for a thorough cleaning are contingent upon the property size, including the number of bedrooms, bathrooms, and reception areas, as well as the style of the house and any additional cleaning services.')

  }

  const handleLeft1 = () => {
    setStyleRight1(arrowRightStyleOn)
    setStyleLeft1(arrowLeftStyleOff)
    setQuestion1('')

  }

  const handleRight2 = () => {
    setStyleRight2(arrowRightStyleOff)
    setStyleLeft2(arrowLeftStyleOn)
    setQuestion2('Booking our deep cleaners is very simple. Go to our website, and fill in your postal code and other information like your name and phone number. The online booking system only takes a few minutes.')

  }

  const handleLeft2 = () => {
    setStyleRight2(arrowRightStyleOn)
    setStyleLeft2(arrowLeftStyleOff)
    setQuestion2('')

  }

  const handleRight3 = () => {
    setStyleRight3(arrowRightStyleOff)
    setStyleLeft3(arrowLeftStyleOn)
    setQuestion3('In contrast to routine cleaning serviceName in Edinburgh, one-off deep cleaning entails completely sanitising every room of the house, including the living room, bedroom, kitchen, and bathroom. This kind of serviceName is offered by our cleaners, who are skilled in safely and successfully eliminating filth, dust, and grime.')

  }

  const handleLeft3 = () => {
    setStyleRight3(arrowRightStyleOn)
    setStyleLeft3(arrowLeftStyleOff)
    setQuestion3('')

  }

  const handleRight4 = () => {
    setStyleRight4(arrowRightStyleOff)
    setStyleLeft4(arrowLeftStyleOn)
    setQuestion4('Please make sure that all cabinets, refrigerators, and freezers are empty and defrosted on the day of the deep clean session. Kindly shift the furniture away from the wall. If you have cleaning equipment, that will be good. Let us know during the booking process if you’d like to request cleaners to come with their own cleaning materials.')

  }

  const handleLeft4 = () => {
    setStyleRight4(arrowRightStyleOn)
    setStyleLeft4(arrowLeftStyleOff)
    setQuestion4('')

  }

  const handleRight5 = () => {
    setStyleRight5(arrowRightStyleOff)
    setStyleLeft5(arrowLeftStyleOn)
    setQuestion5('Deep cleaning entails a thorough inspection and special attention to frequently missed and difficult-to-reach areas. A deep clean involves cleaning everything that is accessible within your house.')

  }

  const handleLeft5 = () => {
    setStyleRight5(arrowRightStyleOn)
    setStyleLeft5(arrowLeftStyleOff)
    setQuestion5('')

  }



  const results = [
    {id:1, src: Result1},
    {id:2, src: Result2},
    {id:3, src: Result3},
    {id:4, src: Result4},
    {id:5, src: Result5},
    {id:6, src: Result6},
    {id:7, src: Result7},
    {id:8, src: Result8}
  ]

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Adjust this value as needed
      if (direction === 'left') {
        scrollRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -150, // Adjust scroll amount as needed
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 150, // Adjust scroll amount as needed
        behavior: 'smooth'
      });
    }
  };

  const stages = [
    {id:'submit', src: Booking, stage:'Stage 1', category:'Submit your booking online', steps:['Enter postcode','Choose a type of cleaning','Select a cleaning schedule', 'Choose rooms to get an estimated price', 'Select additional cleaning services if you need them', 'Indicate the level of dirt in your property']},
    {id:'pay', src: Currency, stage:'Stage 2', category: 'Pay as you go', steps: [' The estimated amount of your booking will be held in your bank account', ' You will only be charged after the cleaning session is completed and according to the actual time a cleaner worked']},
    {id:'manage',src: Manage,  stage: 'Stage 3', category: 'Manage your booking online', steps: [' When you submit your cleaning request, your booking becomes available to all cleaners in the system',
        ' When you make an appointment with a cleaner, we email you or send a text message through the app', 'You can use our website to keep track of your booking']}
  ]

  const handServiceClick = (plan) => {
    setServiceName(service.title);
  }

  const handleResultChange = () => {
    if (resultList.length == miniResults.length) {
      setResultList(results);
    }
    else {
      setResultList(miniResults);
    }
  }

  const cleaningTasks = [
    {
      id: 1,
      item: "Dusting all furniture including bottoms and sides"
    },
    {
      id: 2,
      item: "Scrubbing every glass surface, including restrooms, and making sure it's sanitary"
    },
    {
      id: 3,
      item: "If desired, we will clean the appliances, and mop or sweep every floor"
    },
    {
      id: 4,
      item: "Sanitising door frames"
    },
    {
      id: 5,
      item: "Dusting every surface that's reachable"
    },
    {
      id: 6,
      item: "Cleaning windows and mirrors"
    },
    {
      id: 7,
      item: "Cleaning kitchenware"
    },
    {
      id: 8,
      item: "Folding garments and organising items"
    },
    {
      id: 9,
      item: "Removing spiderwebs and sanitising light switches"
    },
    {
      id: 10,
      item: "Hoovering carpets, and washing the floor and skirting boards"
    },
    {
      id: 11,
      item: "Emptying the trash"
    }
  ];

  const carpetCleaningList = [
    {
      id: 1,
      tag: "Preparation",
      details: "The area is first prepared by eMop's carpet cleaners. Moving light furniture (including heavy furniture sometimes) enabling easy access, and checking the carpet for common stains or special cleaning requirements are all part of this process. They hoover the carpet as well to get rid of any loose dirt or debris especially from areas with heavy foot traffic, remove stains, and give you refreshed carpets."
    },
    {
      id: 2,
      tag: "Carpet cleaning process",
      details: "Utilising cutting-edge tools and efficient cleaning methods are part of the fundamental carpet cleaning process. Depending on the type of carpet and its state, Fly carpet cleaners frequently use hot water extraction (also known as 'steam cleaning') or dry cleaning techniques. Hot water and a cleaning solution are injected into the carpet during a hot water extraction, which is then completely extracted. Specialised chemicals or foams may be used in dry cleaning processes."
    },
    {
      id: 3,
      tag: "Finishing touch",
      details: "Fly carpet cleaners ensure that the carpet dries efficiently after cleaning by using powerful extraction instruments and, if required, air movers. In order to ensure that all stains and spots have been removed and the carpet looks clean and new, our expert carpet cleaning serviceName staff also performs a final inspection. The comprehensiveness and customer satisfaction of eMop's professional carpet cleaning services make them a trustworthy choice for maintaining the stain- and wear-resistant qualities of your rugs."
    }
  ];

  const uniqueAdvantages = [
    {
      id: 1,
      reason: "We stand out from other deep cleaning serviceName providers in Edinburgh because of our accountability, commitment to quality, and professionalism. All Edinburgh landlords and tenants love our work because we always deliver a healthy home at the end of the day."
    },
    {
      id: 2,
      reason: "Our highly recommended services offer our customers the opportunity to select a day and time that works for you. Even on short notice, house cleaning appointments can be made in advance with our booking system."
    },
    {
      id: 3,
      reason: "In addition to our one-off cleaning serviceName, we can tailor our orders to include weekly, fortnightly, or monthly appointments; this is one of the finest things about the Fly professional deep cleaning services."
    },
    {
      id: 4,
      reason: "You pay for only the serviceName provided."
    },
    {
      id: 5,
      reason: "We have highly trained cleaners that can give you the high-quality deep cleaning serviceName that our agency is associated with in the cleaning industry. A large part of our friendly team is made up of local cleaners who are familiar with the Edinburgh area. This makes us stand out as the best cleaning company."
    }
  ];

  const cleaningTasksList = [
    {
      id: 1,
      task: "Bedroom",
      details: [
        {
          id: 1,
          description: "Wiping all exteriors, cleaning mirrors, and getting rid of fingerprints"
        },
        {
          id: 2,
          description: "Organising the bedding"
        },
        {
          id: 3,
          description: "Dusting light fixtures, doorknobs, and skirting boards"
        },
        {
          id: 4,
          description: "Dusting and mopping the floor"
        },
        {
          id: 5,
          description: "Tidying and folding clothes"
        },
        {
          id: 6,
          description: "Dusting, cleaning and polishing appliances, furniture, and windows"
        },
        {
          id: 7,
          description: "Laundry services"
        }
      ]
    },
    {
      id: 2,
      task: "Bathrooms",
      details: [
        {
          id: 1,
          description: "Cleaning the bathtub, shower, toilet bowl, and floor"
        },
        {
          id: 2,
          description: "Dusting and cleaning every exterior that is accessible"
        },
        {
          id: 3,
          description: "Cleaning and polishing fittings, flooring, and glass"
        },
        {
          id: 4,
          description: "Taking out the garbage"
        },
        {
          id: 5,
          description: "Cleaning wall tiles"
        }
      ]
    },
    {
      id: 3,
      task: "Living areas",
      details: [
        {
          id: 1,
          description: "Dusting, cleaning, and polishing skirting boards, light switches, doors, and other exteriors"
        },
        {
          id: 2,
          description: "Dusting, sanitising, and shining windows, furniture, and appliances"
        },
        {
          id: 3,
          description: "Mopping or vacuuming the floor, especially under the furniture"
        },
        {
          id: 4,
          description: "Emptying and replacing any trash bins"
        },
        {
          id: 5,
          description: "Getting rid of fingerprints and cobwebs"
        },
        {
          id: 6,
          description: "Tidying curtain rails, cornices, and picture rails"
        }
      ]
    },
    {
      id: 4,
      task: "Kitchen",
      details: [
        {
          id: 1,
          description: "Cleaning the kitchen sink and faucets, as well as the stove"
        },
        {
          id: 2,
          description: "Cleaning and scrubbing the floor"
        },
        {
          id: 3,
          description: "Cleaning and polishing every work surface"
        },
        {
          id: 4,
          description: "Properly cleaning the oven and the refrigerator"
        },
        {
          id: 5,
          description: "Taking out the trash and replacing the bags"
        },
        {
          id: 6,
          description: "Cleaning windows and window sills"
        }
      ]
    },
    {
      id: 5,
      task: "Stairs",
      details: [
        {
          id: 1,
          description: "Cleaning the skirting boards"
        },
        {
          id: 2,
          description: "Cleaning the railings, bannister, and staircase"
        },
        {
          id: 3,
          description: "Cleaning light fittings, plugs, and switches"
        },
        {
          id: 4,
          description: "Dusting and polishing every surface"
        }
      ]
    }
  ];

  const handleTask = () => {
    if (tasklist.length === miniTask.length) {
      setTaskList(cleaningTasksList);
    }
    else {
      setTaskList(miniTask);
    }
  }

  const cleaningInspectionList = [
    {
      id: 1,
      category: "Inspection",
      detail: "Fly cleaners' fully insured personnel prepare the space and make sure all surfaces are reachable before beginning the deep cleaning procedure. So they don't miss any places during the cleaning, they may gently reorganise the furniture in the agreed-upon order. This preparation guarantees that every nook and cranny, high point and low point is prepared for a comprehensive cleaning, laying the groundwork for a deep cleaning session of the highest quality."
    },
    {
      id: 2,
      category: "Deep cleaning process",
      detail: "Dusting, wiping, and sanitising surfaces, furniture, and fixtures are all part of the thorough cleaning that takes place in each room during the main stage. Fly cleaners' fully trained and trusted one-off cleaners will remove dirt and polish faucets, tiles, and appliances in kitchens and bathrooms, leaving these surfaces hygienically clean."
    },
    {
      id: 3,
      category: "Final review",
      detail: "Our cleaners do a last inspection to make sure everything is immaculate after every cleaning serviceName in Edinburgh. To make the area appear tidy and welcoming, they can put anything that has been moved back in its original location. This concludes the amazing job they will do in giving you a clean home."
    }
  ];

  const handleInspection = () => {
    if (inspectionList.length === miniIspection.length) {
      setInspectionList(cleaningInspectionList);
    }
    else {
      setInspectionList(miniIspection);
    }
  }

  const roomCleaningServices = [
    {
      id: 1,
      category: "Living room and bedroom",
      detail: "Professional dusting of surfaces (including furniture, bed frames, bookcases, etc.), wiping the mirrors, mopping, hoovering the carpet, and wiping the picture frames. If needed, you can request changing the linens and bed covers and various other additional services."
    },
    {
      id: 2,
      category: "Kitchen",
      detail: "Wiping and polishing all surfaces and worktops, mopping and vacuuming the floors, cleaning equipment and appliances, washing the dishes, cleaning doors and handles. You can also request cleaning inside the fridge, the oven and the microwave, arranging things inside kitchen cabinets, etc."
    },
    {
      id: 3,
      category: "Bathroom and hallway",
      detail: "Polishing and sanitising the sink, the tiles, the toilet, the toilet seat, the bathtubs and/or the shower cubicle. Also, our cleaners hoover/sweep and mop the floors, polish the accessible surfaces and furniture, clean mirrors and glasses, remove fingerprints and marks from surfaces, wipe the skirting boards and the inside of the front door."
    }
  ];

  const priorityAreas = [
    {
      id: 1,
      category: "Living room and bedroom - professional dusting of surfaces (including furniture, the bed frame, bookcases, etc.), wiping the mirrors, mopping, hoovering the carpet, and wiping the picture frames. If needed, you can request changing the linens and bed covers and various other additional services."
    },
    {
      id: 2,
      category: "Kitchen - wiping and polishing all surfaces and worktops, mopping and vacuuming the floors, cleaning equipment and appliances, washing the dishes, cleaning doors and handles. You can also request cleaning inside the fridge, the oven and the microwave, arranging things inside kitchen cabinets, etc."
    },
    {
      id: 3,
      category: "Bathroom - polishing and sanitising the sink, the tiles, the toilet, the toilet seat, the bathtubs and/or the shower cubicle. Also, our cleaners hoover/sweep and mop the floors, polish the accessible surfaces and clean mirrors and glasses."
    },
    {
      id: 4,
      category: "Hallway and stairs - cleaning and polishing the furniture, hoovering carpets and rugs, washing the floors, removing fingerprints and marks from surfaces, wiping the skirting boards and the inside of the front door."
    }
  ];

  const serviceBenefits = [
    {
      id: 1,
      category: "We are fully insured. We guarantee that your property and possessions will stay safe."
    },
    {
      id: 2,
      category: "You can book our cleaning services any time or day of the week - regardless of weekends or bank holidays."
    },
    {
      id: 3,
      category: "We cover a full range of cleaning tasks, which you can also customise according to your needs."
    },
    {
      id: 4,
      category: "All the pricing plans are transparent and there are no hidden charges."
    },
    {
      id: 5,
      category: "We have qualified and trustworthy cleaners."
    },
    {
      id: 6,
      category: "Our customer service is always ready to help you and resolve any issues."
    }
  ];

  const handleRight1R = () => {
    setStyleRight1(arrowRightStyleOff)
    setStyleLeft1(arrowLeftStyleOn)
    setQuestion1('If you do not have your own equipment/ products, please request a cleaner to the equipmentor products. You will be charged additionally for an order with the equipment/products.')

  }

  const handleLeft1R = () => {
    setStyleRight1(arrowRightStyleOn)
    setStyleLeft1(arrowLeftStyleOff)
    setQuestion1('')

  }

  const handleRight2R = () => {
    setStyleRight2(arrowRightStyleOff)
    setStyleLeft2(arrowLeftStyleOn)
    setQuestion2('The minimum duration of the job is 3 hours. If the cleaner finishes early, please give them another task.')

  }

  const handleLeft2R = () => {
    setStyleRight2(arrowRightStyleOn)
    setStyleLeft2(arrowLeftStyleOff)
    setQuestion2('')

  }

  const handleRight3R = () => {
    setStyleRight3(arrowRightStyleOff)
    setStyleLeft3(arrowLeftStyleOn)
    setQuestion3('Please request a quote on our website simply entering your postcode. Please add all items you need to be cleaned and you will receive the quotation for the serviceName.')
  }

  const handleLeft3R = () => {
    setStyleRight3(arrowRightStyleOn)
    setStyleLeft3(arrowLeftStyleOff)
    setQuestion3('')

  }

  const handleRight4R = () => {
    setStyleRight4(arrowRightStyleOff)
    setStyleLeft4(arrowLeftStyleOn)
    setQuestion4('According to Fly cleaners policy we do not provide any refunds. However, in case of any complaint, we will investigate the case, review the evidence and get back to you with a proposed solution in accordance with eMop policy. The full description of the complaint followed by picture evidence will be requested.')

  }

  const handleLeft4R = () => {
    setStyleRight4(arrowRightStyleOn)
    setStyleLeft4(arrowLeftStyleOff)
    setQuestion4('')

  }

  const handleRight5R = () => {
    setStyleRight5(arrowRightStyleOff)
    setStyleLeft5(arrowLeftStyleOn)
    setQuestion5('As soon as you make a booking it becomes available to all cleaners in the Fly cleaners platform. The time of the booking confirmation depends on the availability of the cleaners in the area and the type of the cleaning you request. eMop team will contact you if there is no availability for the chosen time and offer you the closest available time of the cleaning.')

  }

  const handleLeft5R = () => {
    setStyleRight5(arrowRightStyleOn)
    setStyleLeft5(arrowLeftStyleOff)
    setQuestion5('')

  }

  const carpetCleaningServices = [
    { id: 1, category: "Hoovering the carpet" },
    { id: 2, category: "Removing stains and dirt" },
    { id: 3, category: "Washing the carpet with carpet washing equipment" },
    { id: 4, category: "Deodorization to get rid of smells" },
    { id: 5, category: "Using a hoover to get rid of loose dirt and debris" },
    { id: 6, category: "Pre-treatment of stains and high-traffic areas" },
    { id: 7, category: "Cleaning with steam or hot water" },
    { id: 8, category: "Deep cleaning to get rid of allergies and ingrained grime" },
    { id: 9, category: "Grooming carpet to bring back its texture" },
    { id: 10, category: "Applying stain protection" },
    { id: 11, category: "Removing contaminants, moisture, and cleaning chemicals" },
    { id: 12, category: "Last assessment to ensure quality" },
    { id: 13, category: "Additional options like pet stain treatments or Scotchgard protection" }
  ];

  const handleRight1U = () => {
    setStyleRight1(arrowRightStyleOff)
    setStyleLeft1(arrowLeftStyleOn)
    setQuestion1('If you do not have your own equipment/ products, please request a cleaner to the equipmentor products. You will be charged additionally for an order with the equipment/products.')

  }

  const handleLeft1U = () => {
    setStyleRight1(arrowRightStyleOn)
    setStyleLeft1(arrowLeftStyleOff)
    setQuestion1('')

  }

  const handleRight2U = () => {
    setStyleRight2(arrowRightStyleOff)
    setStyleLeft2(arrowLeftStyleOn)
    setQuestion2('The minimum duration of the job is 3 hours. If the cleaner finishes early, please give them another task.')

  }

  const handleLeft2U = () => {
    setStyleRight2(arrowRightStyleOn)
    setStyleLeft2(arrowLeftStyleOff)
    setQuestion2('')

  }

  const handleRight3U = () => {
    setStyleRight3(arrowRightStyleOff)
    setStyleLeft3(arrowLeftStyleOn)
    setQuestion3('Please request a quote on our website simply entering your postcode. Please add all items you need to be cleaned and you will receive the quotation for the serviceName.')
  }

  const handleLeft3U = () => {
    setStyleRight3(arrowRightStyleOn)
    setStyleLeft3(arrowLeftStyleOff)
    setQuestion3('')

  }

  const handleRight4U = () => {
    setStyleRight4(arrowRightStyleOff)
    setStyleLeft4(arrowLeftStyleOn)
    setQuestion4('According to Fly cleaners policy we do not provide any refunds. However, in case of any complaint, we will investigate the case, review the evidence and get back to you with a proposed solution in accordance with Fly cleaners policy. The full description of the complaint followed by picture evidence will be requested.')

  }

  const handleLeft4U = () => {
    setStyleRight4(arrowRightStyleOn)
    setStyleLeft4(arrowLeftStyleOff)
    setQuestion4('')

  }

  const handleRight5U = () => {
    setStyleRight5(arrowRightStyleOff)
    setStyleLeft5(arrowLeftStyleOn)
    setQuestion5('As soon as you make a booking it becomes available to all cleaners in the Fly cleaners platform. The time of the booking confirmation depends on the availability of the cleaners in the area and the type of the cleaning you request. eMop team will contact you if there is no availability for the chosen time and offer you the closest available time of the cleaning.')

  }

  const handleLeft5U = () => {
    setStyleRight5(arrowRightStyleOn)
    setStyleLeft5(arrowLeftStyleOff)
    setQuestion5('')

  }


  const ovenCleaningServices = [
    {
      id: 1,
      category: "Interior oven cleaning",
      detail: "Complete inside cleaning of the oven, including removal of grease and food particles, and cleaning of oven bulbs, also for a double oven."
    },
    {
      id: 2,
      category: "Exterior oven cleaning",
      detail: "Scrubbing the outside to bring back the lustre and shine, especially the glass door."
    },
    {
      id: 3,
      category: "Oven trays and racks",
      detail: "Oven trays and racks will be cleaned and degreased."
    },
    {
      id: 4,
      category: "Cleaning of hobs",
      detail: "Cleaning stove tops and burners of dirt and burned-on stains."
    },
    {
      id: 5,
      category: "Cleaning of extractor fans",
      detail: "To enhance the quality of the air, we will clean and degrease the extractor fans."
    },
    {
      id: 6,
      category: "Cleaning the microwave",
      detail: "For a microwave that is pristine, we will clean both the inside and outside."
    },
    {
      id: 7,
      category: "Extra service",
      detail: "As an extra, we can also clean your cooker hood filters."
    }
  ];

  const ovenCleaning = [
    {
      id: 1,
      category: "Interior oven cleaning: Complete inside cleaning of the oven, including removal of grease and food particles, and cleaning of oven bulbs, also for a double oven."
    },
    {
      id: 2,
      category: "Exterior oven cleaning: Scrubbing the outside to bring back the lustre and shine, especially the glass door."
    },
    {
      id: 3,
      category: "Oven trays and racks: Oven trays and racks will be cleaned and degreased."
    },
    {
      id: 4,
      category: "Cleaning of hobs: Cleaning stove tops and burners of dirt and burned-on stains."
    },
    {
      id: 5,
      category: "Cleaning of extractor fans: To enhance the quality of the air, we will clean and degrease the extractor fans."
    },
    {
      id: 6,
      category: "Cleaning the microwave: For a microwave that is pristine, we will clean both the inside and outside."
    },
    {
      id: 7,
      category: "Extra service: As an extra, we can also clean your cooker hood filters."
    }
  ];

  const ovenCleaningProcess = [
    {
      id: 1,
      category: "Evaluation and Planning",
      desc: "An extensive evaluation is the first step in our oven cleaning serviceName procedure. To find any places that need extra care, our experts will thoroughly evaluate your oven. Plus, to make sure you with the best oven cleaning in Edinburgh, we will safeguard your kitchen, guaranteeing a hygienic and secure working environment. To avoid any mess, this also involves protecting adjacent surfaces and flooring."
    },
    {
      id: 2,
      category: "Safe and reliable cleaning supplies",
      desc: "Our oven cleaning Edinburgh serviceName includes employing non-toxic, environmentally safe cleaning products that won't harm you or the environment. Grease, dirt, and burnt-on residues are easily removed with our proven methods. Our oven wizards take great care to completely clean and protect the surfaces of your oven."
    },
    {
      id: 3,
      category: "Thorough Cleaning and Glazing",
      desc: "Racks and trays are just two of the parts of the oven that our skilled cleaners carefully scrub and degrease. Carefully applied treatments guarantee total removal of stubborn stains and residues. Once the cleaning process is finished, your oven is left looking immaculate by polishing both the interior and exterior."
    }
  ];

  const ovenCleaningBenefits = [
    {
      id: 1,
      tag: "Eco-Friendly and Secure Solutions",
      remark: "The environment and your safety come first. That's why we only use environmentally safe cleaning products. With our non-toxic solutions, you can be confident that your kitchen will always be chemical-free, sustainable, and healthy."
    },
    {
      id: 2,
      tag: "Professionals You Can Trust",
      remark: "Oven cleaning in Edinburgh has never been easier thanks to Fly cleaners' unparalleled experience. Our cleaners have experience cleaning ovens, & they can handle even the most stubborn oven dirt as they have received extensive training. We take great satisfaction in our abilities to get your oven back to working like new."
    },
    {
      id: 3,
      tag: "Adjustable Scheduling",
      remark: "We are aware that each client has particular needs, so we provide flexible schedule choices. Fly is available to meet your needs and fit with your hectic schedule, whether you require routine maintenance or a one-time deep cleaning."
    },
    {
      id: 4,
      tag: "Clear and Simple Oven Cleaning Prices",
      remark: "We embrace transparency: with Fly cleaners, you get upfront, transparent pricing. There aren't any unexpected costs or hidden expenses. We are committed to providing reasonable prices without sacrificing quality."
    }
  ];

  const handleRight1O = () => {
    setStyleRight1(arrowRightStyleOff)
    setStyleLeft1(arrowLeftStyleOn)
    setQuestion1('The cost of cleaning the interior of an oven is influenced by various elements, such as its size and state. For a precise quotation, kindly visit our website or get in touch with us.')

  }

  const handleLeft1O = () => {
    setStyleRight1(arrowRightStyleOn)
    setStyleLeft1(arrowLeftStyleOff)
    setQuestion1('')

  }

  const handleRight2O = () => {
    setStyleRight2(arrowRightStyleOff)
    setStyleLeft2(arrowLeftStyleOn)
    setQuestion2('It is definitely worth hiring a specialist to clean your oven. Regular cleaning keeps appliances operating efficiently and improves kitchen hygiene while guaranteeing a complete, safe, and environmentally responsible cleaning process.')

  }

  const handleLeft2O = () => {
    setStyleRight2(arrowRightStyleOn)
    setStyleLeft2(arrowLeftStyleOff)
    setQuestion2('')

  }

  const handleRight3O = () => {
    setStyleRight3(arrowRightStyleOff)
    setStyleLeft3(arrowLeftStyleOn)
    setQuestion3('A professional oven cleaning company will assess, carefully cleanse and degrease, use safe and environmentally friendly cleaning solutions, and polish to bring ovens back to their original state.')
  }

  const handleLeft3O = () => {
    setStyleRight3(arrowRightStyleOn)
    setStyleLeft3(arrowLeftStyleOff)
    setQuestion3('')

  }

  const handleRight4O = () => {
    setStyleRight4(arrowRightStyleOff)
    setStyleLeft4(arrowLeftStyleOn)
    setQuestion4('For domestic ovens, clean and maintain efficiency every 6–12 months, depending on usage. Ovens in commercial kitchens may require more frequent cleaning.')

  }

  const handleLeft4O = () => {
    setStyleRight4(arrowRightStyleOn)
    setStyleLeft4(arrowLeftStyleOff)
    setQuestion4('')

  }

  const handleRight5O = () => {
    setStyleRight5(arrowRightStyleOff)
    setStyleLeft5(arrowLeftStyleOn)
    setQuestion5('Ignoring oven cleaning can result in burned-on fat, decreased effectiveness, disagreeable smells, and possible fire hazards.')

  }

  const handleLeft5O = () => {
    setStyleRight5(arrowRightStyleOn)
    setStyleLeft5(arrowLeftStyleOff)
    setQuestion5('')

  }

  const endOfTenancyTasks = [
    {
      id: 1,
      item: "Deep cleaning and dusting of all surfaces such as skirting boards, walls, ceiling, and limescale on tiles and taps"
    },
    {
      id: 2,
      item: "Cleaning and polishing windows, mirrors, and any glass surfaces"
    },
    {
      id: 3,
      item: "Deep cleaning of appliances: oven and hob, microwave, fridge, and freezer"
    },
    {
      id: 4,
      item: "Hoovering and mopping the floor"
    },
    {
      id: 5,
      item: "Cleaning all bathroom fixtures"
    },
    {
      id: 6,
      item: "Taking out the rubbish from the house premises"
    },
    {
      id: 7,
      item: "Removing cobwebs and dust from the ceiling"
    },
    {
      id: 8,
      item: "Cleaning plugs, sockets, light switches & fittings, and lamp shades"
    },
    {
      id: 9,
      item: "Washing windows (inside and if selected), including sills and ledges"
    },
    {
      id: 10,
      item: "Scrubbing fingerprints and stains off walls and doors"
    },
    {
      id: 11,
      item: "Cleaning the interior and exterior of cabinets and drawers in kitchens and bathrooms"
    },
    {
      id: 12,
      item: "Upholstery cleaning for sofas, chairs, and curtains"
    }
  ];

  const tenancyCleaningServices = [
    {
      id: 1,
      forWho: "Tenants",
      detail: "End of tenancy cleaning is crucial for tenants aiming to secure their deposit upon moving out. A professional cleaning company can help you meet the landlord's expectations by providing a thorough tenancy cleaning serviceName. This ensures that the property is in the best condition, with comprehensive cleaning from carpets to appliances."
    },
    {
      id: 2,
      forWho: "Landlords",
      detail: "For buildings to be ready for new tenants, landlords frequently depend on expert end of tenancy cleaners. The house will be ready for the next inhabitants, and exceed industry standards with a thorough tenancy clean from a London tenancy cleaning company."
    },
    {
      id: 3,
      forWho: "Estate agents",
      detail: "To keep their good name, estate agents need trustworthy tenancy cleaning London services. Move-out cleaning services are something that tenancy cleaning companies provide as end of tenancy cleaning in London to make sure that properties are always presentable for viewings and new tenants."
    }
  ];

  const cleaningServices = [
    {
      id: 1,
      category: "Clean and polish windows and household items"
    },
    {
      id: 2,
      category: "Provide upholstery cleaning"
    },
    {
      id: 3,
      category: "Wipe lighting fixtures"
    },
    {
      id: 4,
      category: "Fold clothes and tidy up"
    },
    {
      id: 5,
      category: "Clean mirrors and glass surfaces"
    },
    {
      id: 6,
      category: "Mop and vacuum the floors"
    },
    {
      id: 7,
      category: "Treat woodwork to maintain their quality"
    }
  ];

  const kitchenCleaningTasks = [
    {
      id: 1,
      task: "Wipe and polish all worktops"
    },
    {
      id: 2,
      task: "Dust and descale the sink, sink taps, cooker, and kitchen appliances"
    },
    {
      id: 3,
      task: "Clean the oven and fridge"
    },
    {
      id: 4,
      task: "Mop the floor and vacuuming"
    },
    {
      id: 5,
      task: "Wash-up"
    },
    {
      id: 6,
      task: "Take out the rubbish"
    }
  ];

  const generalCleaningTasks = [
    {
      id: 1,
      task: "Dust and wipe woodwork and skirting boards"
    },
    {
      id: 2,
      task: "Tidy up"
    },
    {
      id: 3,
      task: "Vacuum the carpet"
    },
    {
      id: 4,
      task: "Clean mirrors and glass surfaces"
    },
    {
      id: 5,
      task: "Polish the property's front door from inside"
    }
  ];

  const officeCleaningTasks = [
    {
      id: 1,
      task: "Clean any leftover office equipment"
    },
    {
      id: 2,
      task: "Dust and wipe office desks"
    },
    {
      id: 3,
      task: "Wipe mirrors and glass fixtures"
    },
    {
      id: 4,
      task: "Give the bathrooms deep cleaning and sanitise it"
    },
    {
      id: 5,
      task: "Floors: vacuum the carpets, mop the floors and wipe skirting boards"
    },
    {
      id: 6,
      task: "Kitchen: wash up any remaining dishes, arrange items and thoroughly clean the worktops"
    },
    {
      id: 7,
      task: "Take out the rubbish and replace bin liners"
    }
  ];

  const handleOfficeTask = () => {
    if (officeList.length === miniOffice.length) {
      setOfficeList(officeCleaningTasks);
    }
    else {
      setOfficeList(miniOffice);
    }
  }

  const carpetCheckList = [
    {
      id: 1,
      category: "Hoovering the carpet"
    },
    {
      id: 2,
      category: "Removing stains and dirt"
    },
    {
      id: 3,
      category: "Washing the carpet with carpet washing equipment"
    },
    {
      id: 4,
      category: "Deodorization to get rid of smells"
    },
    {
      id: 5,
      category: "Using a hoover to get rid of loose dirt and debris"
    },
    {
      id: 6,
      category: "Pre-treatment of stains and high-traffic areas"
    },
    {
      id: 7,
      category: "Cleaning with steam or hot water"
    },
    {
      id: 8,
      category: "Deep cleaning to get rid of allergies and ingrained grime"
    },
    {
      id: 9,
      category: "Grooming carpet to bring back its texture"
    },
    {
      id: 10,
      category: "Applying stain protection"
    },
    {
      id: 11,
      category: "Removing contaminants, moisture, and cleaning chemicals"
    },
    {
      id: 12,
      category: "Last assessment to ensure quality"
    },
    {
      id: 13,
      category: "Additional options like pet stain treatments or Scotchgard protection"
    }
  ];

  const handleRight1C = () => {
    setStyleRight1(arrowRightStyleOff)
    setStyleLeft1(arrowLeftStyleOn)
    setQuestion1('Our Edinburgh carpet cleaners are equipped with the necessary equipment and materials needed for all cleaning tasks. However, it is expected that clients provide products for cleaning. If you want the cleaners to come with cleaning materials, indicate it during the booking process. This will come at an extra cost.')

  }

  const handleLeft1C = () => {
    setStyleRight1(arrowRightStyleOn)
    setStyleLeft1(arrowLeftStyleOff)
    setQuestion1('')

  }

  const handleRight2C = () => {
    setStyleRight2(arrowRightStyleOff)
    setStyleLeft2(arrowLeftStyleOn)
    setQuestion2('This can be as a result of some factors like the distance to your location, the size of the carpet onsite, extra services like curtain cleaning, etc. The minimum carpet cleaning Edinburgh working hours for our Edinburgh carpet cleaners is 3 hours. If our cleaners finish up before the time is up, you can add some tasks. Be rest assured that we offer fair pricing for our rug cleaning.')

  }

  const handleLeft2C = () => {
    setStyleRight2(arrowRightStyleOn)
    setStyleLeft2(arrowLeftStyleOff)
    setQuestion2('')

  }

  const handleRight3C = () => {
    setStyleRight3(arrowRightStyleOff)
    setStyleLeft3(arrowLeftStyleOn)
    setQuestion3('To obtain a price for Edinburgh carpet cleaning, end of tenancy and one off cleaning, kindly input your postcode on our website. When you add all the things you want cleaned, a quote for the work will be sent to you.')
  }

  const handleLeft3C = () => {
    setStyleRight3(arrowRightStyleOn)
    setStyleLeft3(arrowLeftStyleOff)
    setQuestion3('')

  }

  const handleRight4C = () => {
    setStyleRight4(arrowRightStyleOff)
    setStyleLeft4(arrowLeftStyleOn)
    setQuestion4('As per Fly cleaners policy, we are unable to issue refunds. In the event that you file a complaint, nevertheless, we will look into the matter, examine the available data, and get back to you with a suggested resolution that complies with eMop policy. We will need a detailed account of the complaint along with photographic proof.')

  }

  const handleLeft4C = () => {
    setStyleRight4(arrowRightStyleOn)
    setStyleLeft4(arrowLeftStyleOff)
    setQuestion4('')

  }

  const handleRight5C = () => {
    setStyleRight5(arrowRightStyleOff)
    setStyleLeft5(arrowLeftStyleOn)
     setQuestion5('Bookings are made through the Fly cleaners platform and are immediately accessible to all cleaners. Depending on the type of cleaning you need and the availability of Edinburgh carpet cleaners in the area, the time of booking confirmation will vary. If the time you have selected is not available, the fly cleaners  staff will get in touch with you and suggest the nearest time for the cleaning.')
  }

  const handleLeft5C = () => {
    setStyleRight5(arrowRightStyleOn)
    setStyleLeft5(arrowLeftStyleOff)
    setQuestion5('')

  }

  const officeTasks = [
    {
      id: 1,
      task: "Dusting all furniture"
    },
    {
      id: 2,
      task: "Cleaning all glass surfaces"
    },
    {
      id: 3,
      task: "Vacuuming and mopping floors"
    },
    {
      id: 4,
      task: "Taking out the rubbish"
    },
    {
      id: 5,
      task: "Hygiene testing"
    },
    {
      id: 6,
      task: "Anti-bacteria cleaning"
    },
    {
      id: 7,
      task: "Toilets & urinals cleaning"
    },
    {
      id: 8,
      task: "ATP testing"
    }
  ];

  const specializedCleaningServices = [
    {
      id: 1,
      category: "Stain removal",
      task: "The work of stain removal may be carried out by cleaners offering office cleaning services utilizing expert equipment. This entails spotting and eliminating various stains on a range of office-related surfaces. The cleaners will employ specialized equipment and cleaning solutions to efficiently remove any stains, whether they be on carpets, furniture, or walls."
    },
    {
      id: 2,
      category: "Window cleaning",
      task: "Our cleaners will make sure that the windows are free of dust, filth, smudges, and fingerprints. To get streak-free, immaculate results on interior windows, cleaners can utilize window cleaning products, squeegees, and microfiber cloths. To securely reach upper windows when cleaning outside windows, you might need to use ladders, poles, or even specialized tools like water-fed poles."
    },
    {
      id: 3,
      category: "Balcony cleaning",
      task: "In office buildings with balconies or other outside spaces, our cleaners can handle the job of cleaning the balcony. This includes cleaning the furniture, railing, and balcony floor of any collected dirt, dust, or debris. They can sweep up debris and leaves with brooms, brushes, and vacuums, and wash the balcony's surfaces with the proper cleaning solutions."
    }
  ];

  const competitiveAdvantages = [
    {
      id: 1,
      reason: "Because of our high standards and quality serviceName, we have a very high client retention rate"
    },
    {
      id: 2,
      reason: "We provide dependable, quality office cleaning serviceName with several convenient payment methods"
    },
    {
      id: 3,
      reason: "The majority of our customers come to us after a trusted referral from a previous customer"
    },
    {
      id: 4,
      reason: "Our office cleaning services are reasonably, competitively priced, and provide excellent value"
    },
    {
      id: 5,
      reason: "We provide expert commercial cleaning services"
    }
  ];

  const cleaningChecklist = [
    {
      id: 1,
      item: "Deep cleaning of all accessible surfaces, including sink, sink faucet, table surface, stove and kitchen equipment"
    },
    {
      id: 2,
      item: "Vacuum cleaning of the carpets and washing the floor and skirting boards"
    },
    {
      id: 3,
      item: "Washing and sanitizing the toilet, the sink and the bidet"
    },
    {
      id: 4,
      item: "Wiping mirrors, glass fixtures and lighting appliance"
    },
    {
      id: 5,
      item: "Folding clothes and arranging things"
    },
    {
      id: 6,
      item: "Wiping down walls, doors, door handles and switches"
    },
    {
      id: 7,
      item: "Cleaning the front, upper and bottom kitchen facades"
    },
    {
      id: 8,
      item: "Doing washing-up"
    },
    {
      id: 9,
      item: "Taking out rubbish"
    }
  ];

  const sameDayCleaningServices = [
    {
      id: 1,
      category: "Emergency spills",
      task: "For urgent spills like food or drink spills, pet mishaps, or water leaks, same-day cleaning may be required. To avoid stains, odors, and potential harm to carpets, upholstery, or other surfaces, prompt cleaning is required."
    },
    {
      id: 2,
      category: "Moving out",
      task: "When leaving a rental home, cleaning is frequently needed on the same day. In order to leave the property clean and attractive for the landlord or next tenants, a full cleaning of the entire space is required, including the floors, walls, appliances, and fixtures."
    },
    {
      id: 3,
      category: "Guests and visitors",
      task: "Hosting visitors or guests, particularly for important occasions or events, may necessitate same-day cleaning. Cleaning and maintaining the common areas and living spaces, as well as dusting and vacuuming, is necessary to provide a welcome environment."
    }
  ];

  const serviceHighlights = [
    {
      id: 1,
      item: "Fly cleaner professional cleaners will go above and beyond your expectations, whether you need a one-time clean or a recurring cleaning contract."
    },
    {
      id: 2,
      item: "Over the years, we have cleaned a lot of residential and commercial locations, and we don't think any work is too big or too small."
    },
    {
      id: 3,
      item: "At Fly cleaners, we prioritize quality in all of our operations, employing only the top cleaning supplies and disinfecting methods."
    },
    {
      id: 4,
      item: "We have many years of experience in the field and a keen eye for detail. As a result, we never leave until every assignment has been completed to the highest standards."
    },
    {
      id: 5,
      item: "You can easily book our Edinburgh cleaners to schedule your clean."
    },
    {
      id: 6,
      item: "Fly cleaner is your trustworthy partner whenever you require a quick cleaning task to be completed quickly."
    },
    {
      id: 7,
      item: "Our cleaners are readily available to clean your property speedily, sometimes on the same day, and they have fast response times."
    },
    {
      id: 8,
      item: "Our cleaning company can come to your rescue if you require them immediately."
    },
    {
      id: 9,
      item: "Whenever you have more work than you can handle at home, or you're looking for a cleaning services provider in Edinburgh, there is no need to get confused with the myriad numbers you might see on the internet."
    },
    {
      id: 10,
      item: "Fly Cleaner is the best you can find. There is one way to find out; book us today to enjoy our complete coverage."
    }
  ];

  const handleServiceList = () => {
    if (highlist.length == miniList.length) {
      setHighlist(serviceHighlights);
    }
    else {
      setHighlist(miniList);
    }
  }

  const deepCleaningServices = [
    {
      id: 1,
      item: "Deep cleaning and dusting of all surfaces such as skirting boards, walls, ceiling, and limescale on tiles and taps"
    },
    {
      id: 2,
      item: "Cleaning and polishing windows, mirrors, and any glass surfaces"
    },
    {
      id: 3,
      item: "Deep cleaning of appliances: oven and hob, microwave, fridge, freezer"
    },
    {
      id: 4,
      item: "Removing mould and grease from wall tiles, plus wash down and polish"
    },
    {
      id: 5,
      item: "Cleaning exterior of all kitchen appliances such as kettle & toaster"
    },
    {
      id: 6,
      item: "Taking out the rubbish from the house premises"
    },
    {
      id: 7,
      item: "Removing cobwebs and dust from the ceiling"
    },
    {
      id: 8,
      item: "Cleaning plugs, sockets, light switches & fittings, and lamp shades"
    },
    {
      id: 9,
      item: "Washing windows internally, including sills and ledges"
    }
  ];

  const moveInCleaningProcess = [
    {
      id: 1,
      category: "Online Estimate and Booking",
      desc: "Obtaining a move-in clean is a simple procedure. An online quote and reservation are the first steps. Simply go to our website and provide the essential information, including your property's dimensions, the number of rooms, and any particular cleaning services you may need. We will provide you with an exact estimate for the serviceName based on this data. If you're happy with the quote, you can book the move-in clean online whenever it's convenient for you."
    },
    {
      id: 2,
      category: "Professional Clean",
      desc: "Our crew of seasoned cleaners will visit your new residence on the appointed day with all the essential cleaning supplies and machinery. Your home's floors, walls, windows, kitchen, bathrooms, and other living areas will all be given a thorough cleaning by our professionals. Our seasoned cleaners pay close attention to detail and make sure that your new house is completely cleaned and sanitized, producing a fresh and pleasant environment for you and your family."
    },
    {
      id: 3,
      category: "Finishing Up",
      desc: "Our trained professionals will perform a final inspection once the cleaning procedure is complete to make sure that everything satisfies our stringent requirements. They will take care of any spots that need more attention right away. Our staff will leave your home spotless and prepared for your move-in once you are happy with the outcomes. Now that cleaning is no longer a chore, you can enjoy a clean and sanitary living environment."
    }
  ];

  const moveInBenefits = [
    {
      id: 1,
      tag: "Professional and Reliable Service",
      reason: "Cleaning services from eMop are competent, dependable, and fully insured. Your cleaning jobs will be addressed with great quality and attention to detail thanks to our team of seasoned and background-checked cleaners."
    },
    {
      id: 2,
      tag: "Convenience and Flexibility",
      reason: "You have the ease of scheduling cleaning services with Fly cleaners online. You can select a time that works for you thanks to our flexible scheduling choices. The prompt serviceName provided by Fly cleaners guarantees that your cleaning will be finished within the scheduled window of time."
    },
    {
      id: 3,
      tag: "Price Transparency",
      reason: "Pricing from Fly is open and reasonable. Our fee schedule is determined by the size of the property and the particular cleaning jobs needed. You can always get an accurate price for the services you require without worrying about any unexpected fees."
    },
    {
      id: 4,
      tag: "Eco-friendly Methods",
      reason: "Environmentally friendly cleaning methods are important to eMop. Our cleaners employ eco-friendly cleaning supplies that are secure for your house and the environment. By deciding on eMop, you support sustainability initiatives and improve the quality of the environment where you live."
    },
    {
      id: 5,
      tag: "Client Satisfaction",
      reason: "Customers have consistently expressed pleasure with Fly cleaners. Our serviceName is well-regarded, and customers, even estate agents, have complimented our professionalism, effectiveness, and calibre of work. All of our customers receive the highest calibre of customer care from us, and our amiable staff always tries to help."
    }
  ];

  const handleMoveIn = () => {
    if (moveInList.length === miniMove.length) {
      setMoveInList(moveInBenefits);
    }
    else {
      setMoveInList(miniMove);
    }
  }

  const allChecklist = [
    {
      id: 1,
      task: "Living Room & Bedroom Cleaning",
      checklist: [
        "Remove dust and cobwebs from the ceiling",
        "Clean the doors and their tops",
        "Remove any dust from wooden furniture's skirting boards",
        "Internally clean windows, including the ledges and sills",
        "Clean the interior, outside, and tops of any cabinets or wardrobes",
        "Tidy curtain rails, picture rails, cornices, and coving",
        "Clean and polish photos and mirrors"
      ],
      src: Neat
    },
    {
      id: 2,
      task: "Kitchen Cleaning",
      checklist: [
        "Clean work surfaces",
        "Clean units & cabinets",
        "Clean drawers, fixtures, and shelves",
        "Mop tiles, interior windows, doors, and skirting",
        "Clean sink and taps",
        "Empty bins",
        "Clean glass, light fixtures, and fittings",
        "Remove cobwebs"
      ],
      src: Kitchen
    },
    {
      id: 3,
      task: "Hallways & Stairways",
      checklist: [
        "Remove the dust and cobwebs from the ceiling",
        "Clean the picture rail, curtain rails, and cornice",
        "Inspect and polish mirrors",
        "Clean window sills, ledges, and interiors",
        "Arrange cushions and vacuum and clean the upholstery underneath",
        "Clean the doors and their tops",
        "Clean the floor with a vacuum cleaner"
      ],
      src: Stairs
    },
    {
      id: 4,
      task: "Toilets & Bathrooms",
      checklist: [
        "Remove dust and cobwebs from the ceiling",
        "Clean the bathtub and remove limescale",
        "Descale the shower screen and cabinet, and give them a thorough cleaning",
        "Disinfect the toilet inside and out",
        "Shine taps and clean and descale sinks",
        "Clean tiles, get rid of mold and wipe them"
      ],
      src: NeatBathroom
    }
  ];

  const moreChecklist = [
    {
      id: 1,
      task: "Living Room & Bedroom Cleaning",
      checklist: [
        "Remove dust and cobwebs from the ceiling",
        "Clean the doors and their tops",
        "Remove any dust from wooden furniture's skirting boards",
        "Internally clean windows, including the ledges and sills",
        "Clean the interior, outside, and tops of any cabinets or wardrobes",
        "Tidy curtain rails, picture rails, cornices, and coving",
        "Clean and polish photos and mirrors"
      ],
      src: Neat
    },
    {
      id: 2,
      task: "Kitchen Cleaning",
      checklist: [
        "Clean work surfaces",
        "Clean units & cabinets",
        "Clean drawers, fixtures, and shelves",
        "Mop tiles, interior windows, doors, and skirting",
        "Clean sink and taps",
        "Empty bins",
        "Clean glass, light fixtures, and fittings",
        "Remove cobwebs"
      ],
      src: Kitchen
    },
  ]

  const checklistImgList = [Neat, Kitchen, Stairs, NeatBathroom]

  const handleChecklist = () => {
    if (checklist.length === miniChecklist.length) {
      setChecklist(moreChecklist);
    }
    else if (checklist.length === moreChecklist.length) {
      setChecklist(allChecklist);
    }
    else {
      setChecklist(miniChecklist);
    }
  }

  const householdCleaningTasks = [
    {
      id: 1,
      task: "Cleaning fridge (inside & outside)"
    },
    {
      id: 2,
      task: "Cleaning windows"
    },
    {
      id: 3,
      task: "Ironing"
    },
    {
      id: 4,
      task: "Laundry"
    },
    {
      id: 5,
      task: "Cleaning microwave"
    },
    {
      id: 6,
      task: "Cleaning kitchen"
    },
    {
      id: 7,
      task: "Arranging bookcases"
    },
    {
      id: 8,
      task: "Bed making"
    },
    {
      id: 9,
      task: "Upholstery cleaning"
    },
    {
      id: 10,
      task: "Oven cleaning"
    },
    {
      id: 11,
      task: "Grill cleaning"
    },
    {
      id: 12,
      task: "Outdoor cleaning"
    }
  ];
  const handleHousehold = () => {
    if (householdList.length === miniHousehold.length) {
      setHouseholdList(householdCleaningTasks);
      return;
    }
    setHouseholdList(miniHousehold)
  }

  const handleRight1M = () => {
    setStyleRight1(arrowRightStyleOff)
    setStyleLeft1(arrowLeftStyleOn)
    setQuestion1('Several factors, including the size of the property, the degree of cleaning needed, and the location, might affect the price of new house cleaning services. For detailed pricing information, it is better to obtain a free estimate from our website.')

  }

  const handleLeft1M = () => {
    setStyleRight1(arrowRightStyleOn)
    setStyleLeft1(arrowLeftStyleOff)
    setQuestion1('')

  }

  const handleRight2M = () => {
    setStyleRight2(arrowRightStyleOff)
    setStyleLeft2(arrowLeftStyleOn)
    setQuestion2('To ensure a tidy and hygienic living space, it is advised to bring in professional cleaners before moving in. They will assist you and give your new house a fresh start by removing dust, filth, and other possible allergens.')

  }

  const handleLeft2M = () => {
    setStyleRight2(arrowRightStyleOn)
    setStyleLeft2(arrowLeftStyleOff)
    setQuestion2('')

  }

  const handleRight3M = () => {
    setStyleRight3(arrowRightStyleOff)
    setStyleLeft3(arrowLeftStyleOn)
    setQuestion3('Yes, there are two different carpet cleaning options that we offer: basic one & professional carpet cleaning. The distinction is that basic cleaning uses less expensive, rapid equipment to give the carpets a short once-over. Professional carpet cleaning is the best choice if you need comprehensive tenancy carpet cleaning, spot treatment, or more.')
  }

  const handleLeft3M = () => {
    setStyleRight3(arrowRightStyleOn)
    setStyleLeft3(arrowLeftStyleOff)
    setQuestion3('')

  }

  const handleRight4M = () => {
    setStyleRight4(arrowRightStyleOff)
    setStyleLeft4(arrowLeftStyleOn)
    setQuestion4('You can get in touch with us whenever you want. Our cleaning crews are on duty every day of the week. Our team is ready to step out early enough. The cleaning serviceName begins at 8:00 AM and goes till as late as 8:00 PM.')

  }

  const handleLeft4M = () => {
    setStyleRight4(arrowRightStyleOn)
    setStyleLeft4(arrowLeftStyleOff)
    setQuestion4('')

  }

  const handleRight5M = () => {
    setStyleRight5(arrowRightStyleOff)
    setStyleLeft5(arrowLeftStyleOn)
    setQuestion5('Our professional move-in cleaning teams do indeed arrive at the job site well-prepared. If you already have any cleaning supplies, please let us know when you book a serviceName so that we can ensure our cleaners have the right tools and supplies on hand.')
  }

  const handleLeft5M = () => {
    setStyleRight5(arrowRightStyleOn)
    setStyleLeft5(arrowLeftStyleOff)
    setQuestion5('')

  }

  const handleRight6M = () => {
    setStyleRight6(arrowRightStyleOff)
    setStyleLeft6(arrowLeftStyleOn)
    setQuestion6('The time needed for a move-in clean can vary depending on a number of variables, including the size of the property, its current state, the quality of cleanliness sought, and how many cleaners will be cleaning the property. However, an estimated time of 6 to 12 hours will be sufficient for the cleaning.')
  }

  const handleLeft6M = () => {
    setStyleRight6(arrowRightStyleOn)
    setStyleLeft6(arrowLeftStyleOff)
    setQuestion6('')

  }

  const handleRight7M = () => {
    setStyleRight7(arrowRightStyleOff)
    setStyleLeft7(arrowLeftStyleOn)
    setQuestion7('Not really. Our cleaners can carry out the move-in or tenancy cleaning serviceName if you are not at home. However, you will need to provide them with access to your property. You can also mention that you won\'t be present while you’re booking our services.')
  }

  const handleLeft7M = () => {
    setStyleRight7(arrowRightStyleOn)
    setStyleLeft7(arrowLeftStyleOff)
    setQuestion7('')

  }

  const rugCleaningServices = [
    {
      id: 1,
      item: "Checking the rug for any particular problems or regions that require extra care"
    },
    {
      id: 2,
      item: "Hoovering the carpet"
    },
    {
      id: 3,
      item: "To get rid of any loose dust, grime, and debris, the rug will be dusted and vacuumed meticulously"
    },
    {
      id: 4,
      item: "Washing the carpet with carpet cleaning equipment"
    },
    {
      id: 5,
      item: "The cleaning serviceName will use the proper stain removal methods to treat any stains on the rug in an effort to lift or eliminate them"
    },
    {
      id: 6,
      item: "The fringes of the rug might get particular care and cleaning"
    },
    {
      id: 7,
      item: "To prevent mould and mildew formation, specialised equipment will be used to dry the rug properly"
    }
  ];

  const rugCleaningBenefits = [
    {
      id: 1,
      reason: "We offer same-day bookings and flexible scheduling to fit busy schedules, making our serviceName incredibly convenient and effective. Customers can quickly request rug cleaning on our intuitive web platform at their preferred time, making the process hassle-free."
    },
    {
      id: 2,
      reason: "Our team consists of knowledgeable and experienced rug cleaning specialists. We use state-of-the-art tools and premium cleaning solutions to guarantee thorough results while protecting delicate rug fibers."
    },
    {
      id: 3,
      reason: "We're committed to environmentally friendly practices, using only eco-safe cleaning products that are gentle on both your rugs and the planet. This green approach distinguishes us from competitors using harsh chemicals."
    },
    {
      id: 4,
      reason: "Transparent pricing with no hidden fees - you'll know exactly what you're paying for. Our straightforward pricing model ensures complete peace of mind."
    },
    {
      id: 5,
      reason: "Exceptional customer support with quick responses to all inquiries. Our dedicated team ensures your complete satisfaction throughout the entire serviceName experience."
    }
  ];

  const handleRight1RU = () => {
    setStyleRight1(arrowRightStyleOff)
    setStyleLeft1(arrowLeftStyleOn)
    setQuestion1('Yes, regular rug cleaning is necessary to preserve its look, hygienic standards, and durability. The quality of the rug is preserved and a healthy environment is ensured by routine cleaning, which also removes dirt, stains, and allergies.')

  }

  const handleLeft1RU = () => {
    setStyleRight1(arrowRightStyleOn)
    setStyleLeft1(arrowLeftStyleOff)
    setQuestion1('')

  }

  const handleRight2RU = () => {
    setStyleRight2(arrowRightStyleOff)
    setStyleLeft2(arrowLeftStyleOn)
    setQuestion2('A gentle method must be used while cleaning an expensive rug to prevent damage. To begin, hoover it lightly to get rid of any loose dirt and debris. Think about hiring specialised rug-handling professionals for deep steam cleaning. Try any cleaning product on a tiny, discreet area before applying it, and stay away from using harsh chemicals.')

  }

  const handleLeft2RU = () => {
    setStyleRight2(arrowRightStyleOn)
    setStyleLeft2(arrowLeftStyleOff)
    setQuestion2('')

  }

  const handleRight3RU = () => {
    setStyleRight3(arrowRightStyleOff)
    setStyleLeft3(arrowLeftStyleOn)
    setQuestion3('Debris and tiny objects should be removed from the rug\'s surface. To get rid of any loose dust and grime, hoover thoroughly. Any stains should be noted and reported to the cleaners for the proper handling. Give explicit directions and inform about any worries you may have. These procedures will guarantee that your rug receives the best possible professional rug cleaning treatment.')
  }

  const handleLeft3RU = () => {
    setStyleRight3(arrowRightStyleOn)
    setStyleLeft3(arrowLeftStyleOff)
    setQuestion3('')

  }

  const handleRight4RU = () => {
    setStyleRight4(arrowRightStyleOff)
    setStyleLeft4(arrowLeftStyleOn)
    setQuestion4('Following a professional rug cleaning, a typical rug may take longer or shorter to dry entirely depending on the rug\'s thickness, material, humidity, and ventilation. The average drying time for a rug ranges between a few hours and a day.')

  }

  const handleLeft4RU = () => {
    setStyleRight4(arrowRightStyleOn)
    setStyleLeft4(arrowLeftStyleOff)
    setQuestion4('')

  }

  const handleRight5RU = () => {
    setStyleRight5(arrowRightStyleOff)
    setStyleLeft5(arrowLeftStyleOn)
    setQuestion5('We do, in fact, provide stain removal services as part of our cleaning process. Food stains, pet stains, wine stains, and all the dirt present can all be treated by us as we are skilled and have specialised equipment.')

  }

  const handleLeft5RU = () => {
    setStyleRight5(arrowRightStyleOn)
    setStyleLeft5(arrowLeftStyleOff)
    setQuestion5('')

  }

  const kitchenDeepCleaningTasks = [
    {
      id: 1,
      task: "Dust all kitchen furniture including bottoms and sides"
    },
    {
      id: 2,
      task: "Clean all kitchen surfaces"
    },
    {
      id: 3,
      task: "Clean appliances if requested and hoover or mop all floors"
    },
    {
      id: 4,
      task: "Clean inside and out of all cabinets, drawers, pantry spaces, and storage units"
    },
    {
      id: 5,
      task: "Thorough cleaning of sinks, taps, and work surfaces"
    },
    {
      id: 6,
      task: "Whenever feasible, we clean the switches and light fixtures"
    },
    {
      id: 7,
      task: "Remove cobwebs from kitchen walls and hidden corners"
    },
    {
      id: 8,
      task: "Tile and grout cleaning and polishing"
    },
    {
      id: 9,
      task: "Clean up and polish splashbacks"
    },
    {
      id: 10,
      task: "Internal window and window sill cleaning"
    }
  ];

  const kitchenDeepCleaningProcess = [
    {
      id: 1,
      step: "Step 1: Initial Preparation",
      detail: "A thorough deep cleaning of the kitchen is necessary to maintain a clean cooking environment. Cleaning the countertops, removing kitchenware, and organising the kitchen are the initial steps. Then, to improve their appearance and functionality, surfaces and appliances are degreased using specialised cleansers to remove tough filth and grease."
    },
    {
      id: 2,
      step: "Step 2: Appliance Deep Cleaning",
      detail: "Appliances and fittings are the focus of the process. Both the inside and outside of the refrigerator, as well as the shelves and drawers, are cleaned. To get rid of baked-on food, oven walls and racks are scrubbed. Sink faucets and grout lines are cleaned, as well as appliances like the toaster and dishwasher."
    },
    {
      id: 3,
      step: "Step 3: Final Sanitization",
      detail: "The last two steps are sanitization and deodorization. To get rid of dangerous microorganisms, surfaces, cutting boards, and high-touch areas are disinfected. We use environmentally friendly air fresheners to deodorise the kitchen. The end result is a spotlessly clean kitchen that encourages a wholesome and welcoming environment for cooking. To preserve cleanliness and extend appliance lifespan, periodic deep cleaning is advised."
    }
  ];

  const kitchenCleaningBenefits = [
    {
      id: 1,
      reason: "We offer same-day bookings and flexible scheduling to fit busy schedules, making our kitchen cleaning serviceName incredibly convenient and effective. Customers can quickly request cleaners at their preferred time through our intuitive web platform."
    },
    {
      id: 2,
      reason: "Our team consists of knowledgeable and experienced domestic cleaning specialists. We use state-of-the-art tools and powerful yet safe cleaning solutions to guarantee thorough results without damaging delicate kitchen surfaces and appliances."
    },
    {
      id: 3,
      reason: "We're committed to environmentally friendly practices, using only eco-safe cleaning products that protect both the environment and our clients. This green approach distinguishes us from competitors who may use toxic chemicals."
    },
    {
      id: 4,
      reason: "Customers enjoy transparent pricing with no hidden fees. Our straightforward pricing model ensures you know exactly what you're paying for upfront."
    },
    {
      id: 5,
      reason: "Our outstanding customer serviceName team promptly addresses all inquiries, ensuring a completely satisfying experience from booking to completion of serviceName."
    }
  ];

  const kitchenCleaningServices = [
    {
      id: 1,
      plan: "Deep tank oven cleaning: In order to clean your cooker as thoroughly as possible, we will send a dedicated specialist to ensure it is disassembled and deep cleaned."
    },
    {
      id: 2,
      plan: "Spot wall washing: When the wall and its condition allow it, you can accomplish this. However, keep in mind that sometimes the wall might need repairs rather than cleaning."
    },
    {
      id: 3,
      plan: "Appliance cleaning: Cleaning thoroughly all kitchen appliances, including the ovens, stovetops, microwaves, refrigerators, and dishwashers. Grease, food particles, and stains can all be eliminated in this process."
    },
    {
      id: 4,
      plan: "Trash can sanitising: To get rid of bacteria and bad odours, our cleaners disinfect and deodorise the trash cans."
    },
    {
      id: 5,
      plan: "Cabinet cleaning: We clean the outside and inside of cabinets to get rid of dirt, stains, and food residue."
    },
    {
      id: 6,
      plan: "Deep cleaning of areas that are hard to reach: We focus on spaces that are frequently missed during routine cleaning, like those in small gaps, under sinks, and behind appliances."
    }
  ];

  const handleRight1K = () => {
    setStyleRight1(arrowRightStyleOff)
    setStyleLeft1(arrowLeftStyleOn)
    setQuestion1('Professional cleaners use a variety of specialised cleaning supplies, such as degreasers, powerful oven cleansers, disinfectants, and environmentally friendly cleaners to thoroughly clean and sanitise kitchen surfaces and appliances.')

  }

  const handleLeft1K = () => {
    setStyleRight1(arrowRightStyleOn)
    setStyleLeft1(arrowLeftStyleOff)
    setQuestion1('')

  }

  const handleRight2K = () => {
    setStyleRight2(arrowRightStyleOff)
    setStyleLeft2(arrowLeftStyleOn)
    setQuestion2('Your kitchen needs to be cleaned frequently, ideally every day. Countertops, sinks, and other high-touch areas need to be cleaned on a regular basis. A thorough cleaning should be performed at least once every few months to maintain a clean and hygienic cooking environment.')

  }

  const handleLeft2K = () => {
    setStyleRight2(arrowRightStyleOn)
    setStyleLeft2(arrowLeftStyleOff)
    setQuestion2('')

  }

  const handleRight3K = () => {
    setStyleRight3(arrowRightStyleOff)
    setStyleLeft3(arrowLeftStyleOn)
    setQuestion3('The size, degree of dirtiness, and quantity of gadgets in a kitchen can all affect how long it takes to thoroughly clean it. A comprehensive deep cleaning can often be finished in 2 to 5 hours.')
  }

  const handleLeft3K = () => {
    setStyleRight3(arrowRightStyleOn)
    setStyleLeft3(arrowLeftStyleOff)
    setQuestion3('')

  }

  const handleRight4K = () => {
    setStyleRight4(arrowRightStyleOff)
    setStyleLeft4(arrowLeftStyleOn)
    setQuestion4('We clean a wide range of kitchen appliances. Ovens, stovetops, microwaves, refrigerators, dishwashers, toasters, and more fall under this category, but are not the only ones. To efficiently clean and sanitise various types of kitchen appliances, our cleaners are provided with specialised cleaning supplies and methods.')

  }

  const handleLeft4K = () => {
    setStyleRight4(arrowRightStyleOn)
    setStyleLeft4(arrowLeftStyleOff)
    setQuestion4('')

  }

  const bathroomCleaningServices = [
    {
      id: 1,
      item: "Polishing and descaling mirrors, tiles, and appliances"
    },
    {
      id: 2,
      item: "Sanitising the bathtub, shower, toilet bowl, and the floor surface"
    },
    {
      id: 3,
      item: "Dusting and wiping all accessible surfaces"
    },
    {
      id: 4,
      item: "Cleaning and polishing shower head, faucets, and other fixtures"
    },
    {
      id: 5,
      item: "Cleaning the bathroom floor with a broom and a sweeper to remove any dust, hair, or other debris"
    },
    {
      id: 6,
      item: "Removing and replacing the garbage bags from waste containers after emptying them"
    },
    {
      id: 7,
      item: "Putting disinfectants on high-touch areas, such as handles, light switches, and doorknobs, to destroy bacteria and germs"
    },
    {
      id: 8,
      item: "If necessary, scrubbing and cleaning the grout on the tiled floors"
    },
    {
      id: 9,
      item: "Wiping and cleaning the interior of the windows and windowsills"
    }
  ];

  const bathroomDeepCleaningProcess = [
    {
      id: 1,
      task: "Preparation",
      detail: "Our bathroom cleaners gather the required cleaning supplies, including a disinfectant, all-purpose cleaner, glass cleaner, toilet bowl cleaner, scrub brushes, microfiber cloths, gloves, and a mop, before beginning a full bathroom deep cleaning, removing everything from the bathroom, including the amenities, bath mats and shower curtains."
    },
    {
      id: 2,
      task: "Cleaning process",
      detail: "They start by cleaning the vents and light fixtures. They use an all-purpose cleanser to wipe down all surfaces, including counters, mirrors, and fixtures, and then mop floors. They utilise a scrub brush or a specialised cleanser for tough stains and filth. Paying special attention, they completely clean the toilet inside and outside. Then they clean and sanitise the bathtub or shower, paying particular attention to the grout lines and corners. After that, they wipe the floor with a suitable cleanser and wash any removable fabric objects, such as bath mats and shower curtains."
    },
    {
      id: 3,
      task: "Finishing touches",
      detail: "After the bathroom has been thoroughly cleaned, all of the items that had been taken out are put back, the garbage is emptied, and the liner is replaced. Regular deep cleaning ensures that your bathroom stays fresh and welcoming while also extending the life of your fixtures and tiles and maintaining a hygienic environment."
    }
  ];

  const bathroomCleaningTasks = [
    {
      id: 1,
      item: "Giving the bathtub and sinks a thorough cleaning"
    },
    {
      id: 2,
      item: "Cleaning and sanitising your toilet"
    },
    {
      id: 3,
      item: "Cleaning the floor completely and mopping it"
    },
    {
      id: 4,
      item: "Cleaning and polishing mirrors and windows"
    },
    {
      id: 5,
      item: "Cleaning all the units, including the shelves"
    },
    {
      id: 6,
      item: "Cleaning the shower and any related fittings thoroughly"
    },
    {
      id: 7,
      item: "Thoroughly cleaning and unclogging each washbasin"
    }
  ];

  const detailedBathroomCleaning = [
    {
      id: 1,
      task: "Keeping the baseboards clean"
    },
    {
      id: 2,
      task: "Removing soap scum and water stains from shower doors and walls"
    },
    {
      id: 3,
      task: "Cleaning and dusting skirting boards, window ledges, and door handles"
    },
    {
      id: 4,
      task: "Concentrating more on the edges and corners where dirt tends to collect"
    },
    {
      id: 5,
      task: "Cleaning the toilet's outside, paying particular attention to the flush handle"
    },
    {
      id: 6,
      task: "Cleaning up any dust from any ornamental pieces, vents, and light fixtures"
    },
    {
      id: 7,
      task: "Discarding empty bottles or other objects that are no longer needed"
    }
  ];

  const bathroomCleaningBenefits = [
    {
      id: 1,
      reason: "All bathroom surfaces will be sanitised as part of our deep washroom cleaning services, lowering the risk of infection and the spread of germs. With our deep cleaning, you'll have restrooms that people enjoy using and returning to."
    },
    {
      id: 2,
      reason: "We provide clear pricing with no hidden costs, building customer trust in our professional cleaning services. Our transparent approach ensures you know exactly what you're paying for."
    },
    {
      id: 3,
      reason: "Our excellent customer serviceName team provides prompt responses to all enquiries, enhancing your overall experience from booking to completion."
    },
    {
      id: 4,
      reason: "Our team consists of trained specialists in deep bathroom cleaning who use cutting-edge equipment and appropriate cleaning solutions to deliver thorough results without damaging delicate bathroom fixtures."
    },
    {
      id: 5,
      reason: "We're committed to eco-friendly practices, using only environmentally safe cleaning materials that protect both your family and the planet, setting us apart from competitors using harsh chemicals."
    }
  ];

  const handleRight1B = () => {
    setStyleRight1(arrowRightStyleOff)
    setStyleLeft1(arrowLeftStyleOn)
    setQuestion1('Liquids and other cleaning supplies are frequently used for cleaning bathrooms. Depending on the cleaning task and personal preference, a specific solvent may be utilised.')

  }

  const handleLeft1B = () => {
    setStyleRight1(arrowRightStyleOn)
    setStyleLeft1(arrowLeftStyleOff)
    setQuestion1('')

  }

  const handleRight2B = () => {
    setStyleRight2(arrowRightStyleOff)
    setStyleLeft2(arrowLeftStyleOn)
    setQuestion2('Decluttering and eliminating objects is the first step in deep cleaning a soiled bathroom. Use the right cleaners and a brush to scrub all surfaces, including the shower, washbasin and toilet. Pay close care to the corners, faucets, and grout. After cleaning the fixtures and mirrors, mop the floor. Shower curtains and mats should be changed or washed.')

  }

  const handleLeft2B = () => {
    setStyleRight2(arrowRightStyleOn)
    setStyleLeft2(arrowLeftStyleOff)
    setQuestion2('')

  }

  const handleRight3B = () => {
    setStyleRight3(arrowRightStyleOff)
    setStyleLeft3(arrowLeftStyleOn)
    setQuestion3('Concentrating on locations with a lot of traffic will help you clean a domestic bathroom more quickly. On surfaces like the countertops, sink, and toilet, spritz an all-purpose cleanser. Then, clean it with a microfiber cloth after letting it sit for a while. Immediately mop the floor to complete.')
  }

  const handleLeft3B = () => {
    setStyleRight3(arrowRightStyleOn)
    setStyleLeft3(arrowLeftStyleOff)
    setQuestion3('')

  }

  const handleRight4B = () => {
    setStyleRight4(arrowRightStyleOff)
    setStyleLeft4(arrowLeftStyleOn)
    setQuestion4('Cleaning your bathroom at least once a week is advised to preserve hygiene. High usage bathrooms, however, might need to be cleaned more frequently. Maintaining a clean and inviting environment can be achieved by preventing dirt buildup.')

  }

  const handleLeft4B = () => {
    setStyleRight4(arrowRightStyleOn)
    setStyleLeft4(arrowLeftStyleOff)
    setQuestion4('')

  }

  useEffect(() => {
    switch (serviceName) {
      case 'Deep':
        setLayout(
            <div>
              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                  <div className={'idea-container'}>
                    <div className={'price-container'}>
                      <p style={{color:'red', textAlign:'end'}}>Cashback up to £150</p>
                      <h3 style={{textAlign:'center'}}>Prices for One-off deep cleaning</h3>
                      <p style={{color:'blue'}}>from £18/h</p>

                      <ul className={'dot-list'} >
                        <li>Time: 8 am - 9 pm </li>
                      </ul>

                      <div style={{display:'flex'}}>
                        <p>Next day</p>
                        <p style={{textAlign:'end'}}>Any day from tomorrow </p>
                        <p style={{color:'navy', textAlign:'end'}}>£18/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Same day</p>
                        <p style={{textAlign:'end', maxLines:'1'}}>Today, in 4h minimum</p>
                        <p style={{color:'navy', textAlign:'end'}}>£25/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Peak</p>
                        <p style={{textAlign:'end'}}>High demand</p>
                        <p style={{color:'navy', textAlign:'end'}}>£19/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Night</p>
                        <p style={{textAlign:'end'}}>Any day</p>
                        <p style={{color:'navy', textAlign:'end'}}>£29/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Night day</p>
                        <p style={{textAlign:'end'}}>Any day from tomorrow</p>
                        <p style={{color:'navy', textAlign:'end'}}>£18/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>End of tenancy</p>
                        <p style={{textAlign:'end'}}>Applicable Tariff + End of Tenancy Charge</p>
                        <p style={{color:'navy', textAlign:'end'}}>£29/h</p>
                      </div>

                    </div>
                    <div style={{display:'block'}}>
                      <div className="service-card">
                        <h3 style={{color:'navy'}}>What is included in deep cleaning?</h3>
                        {cleaningTasks.map(task => (
                            <div key={task.id}>
                              <ul className={'dot-list'}>
                                <li>{task.item}</li>
                              </ul>
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={"container"} style={{maxWidth:'800px'}}>
                  <div className={'price-container'}>
                    <h2 style={{color:'navy'}}>One-off deep cleaning plan</h2>
                    <p  >When you make your reservation, you can ask for extra specialist services
                      like spring cleaning, deep house cleaning services, office cleaning, regular
                      cleaning services, upholstery cleaning, end of tenancy cleaning,
                      and professional carpet cleaning services.</p>
                  </div>
                </div>

              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div style={{display:'block'}}>
                  <h2 style={{color:'navy', marginBottom:'30px'}}>What does the process of One-off deep cleaning look like?</h2>
                  <div className={"grid-container"}>
                    {carpetCleaningList.map(task => (
                        <div key={task.id} className={'price-container'}>
                          <h2>{task.tag}</h2>
                          <p>{task.details}</p>
                        </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <p style={{color:'navy'}}>Deep Cleaning</p>
                    <p>Whether you need a deep cleaning plan once or often, Fly cleaner offers professional deep cleaning services in the Edinburgh area.
                      The thought of having to dedicate time to clean your property, flat, office (commercial cleaning), or any other location might be depressing. However, assigning this job to reliable expert and fully insured cleaners with years of expertise will greatly reduce your workload.
                      You can be confident that we have staff with the highest standards for the task if you're seeking expert deep cleaning services in Edinburgh. As the premier and go-to option for deep cleaning in Edinburgh, our achievements over the years speak for themselves, and we take satisfaction in our very good plan, which is suitable for any of your cleaning needs.
                      We are all aware of how time-consuming and annoying cleaning your whole property feels. For a one-off deep clean in Edinburgh, Fly cleaner is the best choice.
                      Our professional cleaners will work on as many things as we can in the allocated time, while also considering your cleanliness needs and preferences.</p>
                  </div>
                  <img src={Kept} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section className={'main-banner'}  style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <img src={Neat} alt={"cleaners"} className={'cart-image2'}/>
                  <div className="service-card">
                    <h3 style={{color:'navy', marginBottom:'20px'}}>Why choose Fly for deep cleaning?</h3>
                    {uniqueAdvantages.map(task => (
                        <div key={task.id}>
                          <ul className={'dot-list'}>
                            <li>{task.reason}</li>
                          </ul>
                        </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className={'main-banner'}  style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <img src={NeatBathroom} alt={"cleaners"} className={'cart-image2'}/>
                  <div className="service-card">
                    <h3 style={{color:'darkolivegreen'}}>One-Off Deep Cleaning Checklist</h3>
                    <div style={{display:'block'}}>
                      {tasklist.map(task => (
                          <div key={task.id}>
                            <h3 style={{color:'brown'}}>{task.task}</h3>
                            {task.details.map(taskItem => (
                                <ul className={'dot-list'} key={taskItem.id}>
                                  <div>
                                    <li>{taskItem.description}</li>
                                  </div>
                                </ul>
                            ))}
                          </div>
                      ))}
                      <p style={tasklist.length == miniTask.length ? {display:'none'}: {display:''}}>
                        We have experienced cleaners who are dedicated to what we do and take great pride in providing extra services.
                        We can give you unmatched deep cleaning services in Edinburgh, and guarantee that your one-off deep cleaning will
                        be done correctly, regardless of what your cleaning preferences are, whether you need business or domestic regular
                        cleaning services in Edinburgh. All our prices are affordable for everyone.
                      </p>
                      <button onClick={handleTask} style={{width:'150px', background:'white', color:'black', marginTop:'20px'}}>{tasklist.length == miniTask.length ? 'See more' : 'See less'}</button>
                    </div>
                  </div>
                </div>
              </section>

              <section className={'main-banner'}  style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <p style={{color:'navy'}}>Full Deep Cleaning Coverage in Edinburgh</p>
                    <p>We cover every local area in Edinburgh. Scotland's capital, Edinburgh, is recognised as a centre for tourism, culture, and
                      education. Many historical sites that encapsulate the spirit of this great city's rich past can be found all throughout it.<br/>
                      With its majestic Castle, regal Palace of Holyroodhouse, and alluring Royal Mile, Edinburgh beckons tourists to immerse themselves
                      in its rich history. The city, which is well-known as a hub for culture, is illuminated by renowned events that bring in visitors from
                      all over the world, such as the Edinburgh International Film Festival and the Edinburgh Festival Fringe.<br/>
                      Although Edinburgh was formerly a part of Midlothian county, it became independent of its neighbouring county in 1482. With its alluring
                      fusion of culture, history, and unique personality, Edinburgh is a location that captivates the hearts and minds of everyone who comes.</p>
                  </div>
                  <img src={Combine} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section  style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <img src={NeatBathroom} alt={"cleaners"} className={'cart-image2'}/>
                  <div className="service-card">
                    <h3 style={{color:'darkolivegreen'}}>One-Off Deep Cleaning Checklist</h3>
                    <div style={{display:'block'}}>
                      {inspectionList.map(itemTask => (
                          <div key={itemTask.id}>
                            <ul className={'dot-list'}>
                              <li style={{color:'brown'}}>{itemTask.category}</li>
                            </ul>
                            <p>{itemTask.detail}</p>
                          </div>
                      ))}
                      <button onClick={handleInspection} style={{width:'150px', background:'white', color:'black', marginTop:'20px'}}>{inspectionList.length == miniIspection.length ? 'See more' : 'See less'}</button>
                    </div>
                  </div>
                </div>
              </section>

              <section className={'main-banner'}  style={{marginTop:'50px', maxWidth:'800px'}}>
                <div className={'price-container'}>
                  <h3 style={{color:'navy'}}>Let the results amaze you!</h3>
                  <p>Our deep cleaners in Edinburgh are fully trained, licensed and background checked to deliver cleaning services in Edinburgh.
                    Fly is known for delivering cleaning of the highest quality, and that will never change. We guarantee complete satisfaction after our deep cleaners
                    are done with your property in Edinburgh. Did you know you can book other services alongside deep cleaning as well,
                    like moving home plan? Send us a message today
                  </p>
                </div>
              </section>

              <section className={'main-banner'}  style={{marginTop:'50px', display:'block'}}>
                <div className={'container'}>
                  <h3 style={{textAlign:'start', color:'navy', marginBottom:'30px'}}>Frequently asked questions</h3>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight1} style={styleRight1} />
                    <FaArrowLeft onClick={handleLeft1} style={styleLeft1} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>How much does deep cleaning cost in Edinburgh?</p>
                      <p style={{marginLeft:'10px'}}>{question1}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight2} style={styleRight2} />
                    <FaArrowLeft onClick={handleLeft2} style={styleLeft2} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        How do I book deep cleaners in Edinburgh online?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question2}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight3} style={styleRight3} />
                    <FaArrowLeft onClick={handleLeft3} style={styleLeft3} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        What does your one-off deep cleaning in Edinburgh include?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question3}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight4} style={styleRight4} />
                    <FaArrowLeft onClick={handleLeft4} style={styleLeft4} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        What should I do to prepare for your deep cleaning visit?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question4}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight5} style={styleRight5} />
                    <FaArrowLeft onClick={handleLeft5} style={styleLeft5} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        What is deep cleaning?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question5}</p>
                    </div>
                  </div>
                </div>
              </section>

            </div>
        );
        break;

      case 'Regular':
        setLayout(
            <div>
              <section className={'main-banner'}  style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                  <div className={'idea-container'}>
                    <div className={'price-container'}>
                      <p style={{color:'red', textAlign:'end'}}>Cashback up to £150</p>
                      <h3 style={{textAlign:'center'}}>Prices for regular cleaning in Edinburgh</h3>
                      <div style={{display:'flex'}}>
                        <p>Weekly</p>
                        <p style={{color:'navy', textAlign:'end'}}>£16/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Fortnightly</p>
                        <p style={{color:'navy', textAlign:'end'}}>£17/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Monthly</p>
                        <p style={{color:'navy', textAlign:'end'}}>£17/h</p>
                      </div>

                    </div>
                    <div style={{display:'block'}}>
                      <div className="service-card">
                        <h3 style={{color:'navy'}}>What is included in regular cleaning in Edinburgh?</h3>
                        <ul className={'dot-list'}>
                          <li>Tidying up the rooms</li>
                          <li>Wiping surfaces in kitchens and bathrooms</li>
                          <li>Cleaning floors</li>
                          <li>Taking out the rubbish</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={"container"} style={{maxWidth:'800px'}}>
                  <div className={'price-container'}>
                    <h2 style={{color:'navy'}}>Regular cleaning plan in Edinburgh</h2>
                    <p>Our standard cleaning plan includes everything you need to get your home in order as quickly as possible. You can book additional services when you make your booking.</p>
                  </div>
                </div>
              </section>

              <section className={'main-banner'}  style={{marginTop:'50px'}}>
                <div className={'container'}>
                  <h3 style={{color:'navy', marginBottom:'20px', textAlign:'center'}}>Priority areas</h3>
                  <div className="grid-container">
                    {roomCleaningServices.map(task => (
                        <div key={task.id} className={'price-container'}>
                          <ul className={'dot-list'}>
                            <li style={{marginBottom:'10px'}}>{task.category}</li>
                            <p>{task.detail}</p>
                          </ul>
                        </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <p style={{color:'navy'}}>Fly Regular Cleaning in Edinburgh</p>
                    <p>At Fly cleaners we offer high-quality regular cleaning in Edinburgh that will make your house spotless. Our goal is to lift
                      the burden of domestic chores off of your shoulders and provide excellent services at affordable prices.
                      The less time you spend cleaning, the more time you have for enjoying things that matter - family,
                      friends, work, and hobbies. Our professional cleaners will help you with that.
                    </p>
                  </div>
                  <img src={Kitchen} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section className={'main-banner'}  style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <img src={NeatBathroom} alt={"cleaners"} className={'cart-image2'}/>
                  <div className="price-container">
                      <p>
                        Every house is unique, which is why our cleaners are encouraged to take a personalised approach.
                        Besides, different clients require different things and having your needs fully satisfied is our top priority.
                        The ability to modify the standard set of services is a major benefit of working with Fly cleaner regular
                        cleaning in Edinburgh. When your regular cleaning plan is tailored to your needs,
                        you are paying precisely for the services you need. However, there are certain services our
                        cleaners don't provide. For example, our cleaners don't lift or move heavy objects,
                        do ironing, or clean the back garden. If you want to discuss add-ons in detail, we are always happy to answer your questions.
                      </p>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <h3 style={{color:'darkolivegreen'}}>As part of our regular cleaning packages, priority areas for our cleaners include</h3>
                    <div style={{display:'block'}}>
                      {priorityAreas.map(area => (
                          <div key={area.id}>
                            <ul className={'dot-list'}>
                              <li>{area.category}</li>
                            </ul>
                          </div>
                      ))}
                    </div>
                  </div>
                  <img src={ArrangedRoom} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <img src={Move} alt={"cleaners"} className={'cart-image2'}/>
                  <p>
                    Every house is unique, which is why our cleaners are encouraged to take a personalised approach.
                    Besides, different clients require different things and having your needs fully satisfied is our top priority.
                    The ability to modify the standard set of services is a major benefit of working with Fly cleaner regular cleaning in Edinburgh.
                    When your regular cleaning plan is tailored to your needs, you are paying precisely for the services you need. However,
                    there are certain services our cleaners don't provide. For example, our cleaners don't lift or move heavy objects, do ironing, or
                    clean the back garden. If you want to discuss add-ons in detail, we are always happy to answer your questions.
                  </p>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div style={{display:'block'}}>
                    <h2 style={{color:'navy'}}>Why book regular cleaning from Fly cleaners Edinburgh:</h2>
                    {serviceBenefits.map(benefits => (
                        <div key={benefits.id}>
                          <ul className={'dot-list'}>
                            <li>{benefits.category}</li>
                          </ul>
                        </div>
                    ))}
                  </div>
                  <img src={Kept} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <img src={Combine} alt={"cleaners"} className={'cart-image2'}/>
                  <p>There are multiple tasks that people need to take care of every single day.
                    As a result, cleaning becomes a lesser priority and leads to a dirty and/or disorganised house.
                    To avoid that, hire a professional cleaner, as this will have a positive effect on your mental and physical well-being.
                    Fly cleaners provides excellent cleaning services, which will make you wonder why you didn't do it sooner.
                    It is quick, convenient, and affordable. You will be surprised by how much a thoroughly cleaned house can improve the quality of your life.
                  </p>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'price-container'}>
                  <h2>Let the results amaze you!</h2>
                  <p>There are multiple tasks that people need to take care of every single day. As a result,
                    cleaning becomes a lesser priority and leads to a dirty and/or disorganised house.
                    To avoid that, hire a professional cleaner, as this will have a positive effect on your
                    mental and physical well-being. Fly cleaner provides excellent cleaning services, which will make you
                    wonder why you didn't do it sooner. It is quick, convenient, and affordable.
                    You will be surprised by how much a thoroughly cleaned house can improve the quality of your life.</p>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px', display:'block'}}>
                <div className={'container'}>
                  <h3 style={{textAlign:'start', color:'navy', marginBottom:'30px'}}>Frequently asked questions</h3>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight1R} style={styleRight1} />
                    <FaArrowLeft onClick={handleLeft1R} style={styleLeft1} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>Do cleaners provide equipment / products?</p>
                      <p style={{marginLeft:'10px'}}>{question1}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight2R} style={styleRight2} />
                    <FaArrowLeft onClick={handleLeft2R} style={styleLeft2} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Why is the estimated price for the cleaning more than what I chose?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question2}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight3R} style={styleRight3} />
                    <FaArrowLeft onClick={handleLeft3R} style={styleLeft3} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        I need a quotation for end of tenancy / one off / carpet (combined) order
                      </p>
                      <p style={{marginLeft:'10px'}}>{question3}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight4R} style={styleRight4} />
                    <FaArrowLeft onClick={handleLeft4R} style={styleLeft4} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Is there a guarantee of a refund if the job isn't done up to standard?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question4}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight5R} style={styleRight5} />
                    <FaArrowLeft onClick={handleLeft5R} style={styleLeft5} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        When will I get confirmation for my booking?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question5}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
        );
        break;

      case 'Upholstery':
        setLayout(
            <div>
              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                  <div className={'idea-container'}>
                    <div className={'price-container'}>
                      <p style={{color:'red', textAlign:'end'}}>Cashback up to £150</p>
                      <h3 style={{textAlign:'center'}}>Prices for upholstery cleaning in Edinburgh</h3>
                      <div style={{display:'flex'}}>
                        <p>Next day</p>
                        <p style={{color:'navy', textAlign:'end'}}>£48/h</p>
                      </div>
                    </div>
                    <div className={'price-container'}>
                      <h3 style={{color:'navy'}}>Upholstery cleaning plan in Edinburgh</h3>
                      {carpetCleaningServices.map(plan => (
                          <div key={service.id}>
                            <ul className={'dot-list'}>
                              <li>{service.category}</li>
                            </ul>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={"container"} style={{maxWidth:'800px'}}>
                  <div className={'price-container'}>
                    <h2 style={{color:'navy'}}>Upholstery cleaning plan in Edinburgh</h2>
                    <p>Our standard cleaning plan includes everything you need to get your home in order as quickly as possible.
                      You can book additional services when you make your booking..</p>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'container'}>
                  <h3 style={{color:'navy', marginBottom:'20px', textAlign:'center'}}>What does the process of upholstery cleaning look like?</h3>
                  <div className="grid-container">
                   <div className="price-container">
                     <h3>Step 1</h3>
                     <p>
                       As a professional company with years in the cleaning industry, our upholstery cleaning normally starts with
                       a careful examination of the soft furnishings to choose the best cleaning technique. After that,
                       the cleaners usually hoover the upholstery furniture to remove any debris and loose dirt.
                     </p>
                   </div>

                    <div className="price-container">
                      <h3>Step 2</h3>
                      <p>
                        Afterwards, they use specialised eco-friendly upholstery cleaning equipment to thoroughly clean the fabric after applying a pre-treatment
                        solution to any particularly filthy spots.
                        In order to prevent additional stains, the cleaners may use a protective solution at the end.
                      </p>
                    </div>

                    <div className="price-container">
                      <h3>Step 3</h3>
                      <p>
                        The cleaners may bring various equipment, such as a pre-treatment solvent, upholstery cleaning machine,
                        stain protection solution, vacuum cleaner, and cleaning cloths.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <p style={{color:'navy'}}>Fly Upholstery cleaning in Edinburgh</p>
                    <p>We often neglect our upholstery, until we spill a drink or notice a big stain.
                      Spillage and stains shouldn't be the only reasons to clean your upholstery. Your sofa and armchairs can collect dirt and dust overtime. Imagine the amount of time you sat on it.
                      Would you wear the same trousers for the same length of time? We wouldn't, and you wouldn't either! If not cleaned regularly,
                      furniture such as sofas and armchairs can become a breeding ground for bacteria and germs. Fly cleaner's upholstery
                      cleaning plan removes visible dirt from the surface, such as dust and debris. Our cleaners will also
                      remove any stains on your furniture, using special stain removing products. eMop's cleaning solution
                      includes removal of bad odour - this can be particularly a
                      problem if you have pets or smoke indoors. Our upholstery cleaning solution also includes sanitisation.
                      This part of the cleaning process involves the use of cleaning products with antibacterial properties.
                      These products will eliminate bacteria and germs from your furniture, and provide a safer environment.
                    </p>
                  </div>
                  <img src={Day} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="price-container">
                  <h3 style={{color:'navy'}}>Let the results amaze you!</h3>
                  <p>
                    Avoid letting your upholstery lose its appeal by ordering our upholstery cleaning plan right now and
                    experiencing the difference of our superior cleaning standards. Count on us to revitalize your
                    furnishings and make your home healthier and more appealing. Make a reservation with us right away.
                  </p>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px', display:'block'}}>
                <div className={'container'}>
                  <h3 style={{textAlign:'start', color:'navy', marginBottom:'30px'}}>Frequently asked questions</h3>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight1U} style={styleRight1} />
                    <FaArrowLeft onClick={handleLeft1U} style={styleLeft1} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>Do cleaners provide equipment / products?</p>
                      <p style={{marginLeft:'10px'}}>{question1}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight2U} style={styleRight2} />
                    <FaArrowLeft onClick={handleLeft2U} style={styleLeft2} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Why is the estimated price for the cleaning more than what I chose?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question2}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight3U} style={styleRight3} />
                    <FaArrowLeft onClick={handleLeft3U} style={styleLeft3} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        I need a quotation for end of tenancy / one off / carpet (combined) order
                      </p>
                      <p style={{marginLeft:'10px'}}>{question3}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight4U} style={styleRight4} />
                    <FaArrowLeft onClick={handleLeft4U} style={styleLeft4} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Is there a guarantee of a refund if the job isn't done up to standard?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question4}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight5U} style={styleRight5} />
                    <FaArrowLeft onClick={handleLeft5U} style={styleLeft5} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        When will I get confirmation for my booking?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question5}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
        );
        break;

      case 'Oven':
        setLayout(
            <div>
              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                  <div className={'idea-container'}>
                    <div className={'price-container'}>
                      <p style={{color:'red', textAlign:'end'}}>Cashback up to £150</p>
                      <h3 style={{textAlign:'center'}}>Prices for oven cleaning in Edinburgh</h3>
                      <ul className={'dot-list'} >
                        <li>Time: 8 am - 9 pm </li>
                      </ul>

                      <div style={{display:'flex'}}>
                        <p>Next day</p>
                        <p style={{textAlign:'end'}}>Any day from tomorrow </p>
                        <p style={{color:'navy', textAlign:'end'}}>£18/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Same day</p>
                        <p style={{textAlign:'end', maxLines:'1'}}>Today, in 4h minimum</p>
                        <p style={{color:'navy', textAlign:'end'}}>£25/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Peak</p>
                        <p style={{textAlign:'end'}}>High demand</p>
                        <p style={{color:'navy', textAlign:'end'}}>£19/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Night</p>
                        <p style={{textAlign:'end'}}>Any day</p>
                        <p style={{color:'navy', textAlign:'end'}}>£29/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Night day</p>
                        <p style={{textAlign:'end'}}>Any day from tomorrow</p>
                        <p style={{color:'navy', textAlign:'end'}}>£18/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>End of tenancy</p>
                        <p style={{textAlign:'end'}}>Applicable Tariff + End of Tenancy Charge</p>
                        <p style={{color:'navy', textAlign:'end'}}>£29/h</p>
                      </div>

                    </div>
                    <div style={{display:'block'}}>
                      <div className="service-card">
                        <h3 style={{color:'navy'}}>What is included in oven cleaning in Edinburgh?</h3>
                        {ovenCleaning.map(task => (
                            <div key={task.id}>
                              <ul className={'dot-list'}>
                                <li>{task.category}</li>
                              </ul>
                            </div>
                        ))}

                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={"container"} style={{maxWidth:'800px'}}>
                  <div className={'price-container'}>
                    <h2 style={{color:'navy'}}>Oven cleaning plan in Edinburgh</h2>
                    <p>Our standard cleaning plan includes everything you need to get your home in order as quickly as possible.
                      You can book additional services when you make your booking.</p>
                  </div>
                </div>
              </section>

              <section className={'main-banner'}  style={{marginTop:'50px'}}>
                <div style={{display:'block'}}>
                  <h2 style={{color:'navy', marginBottom:'30px'}}>What does the process of oven cleaning look like?</h2>
                  <div className={"grid-container"}>
                    {ovenCleaningProcess.map(task => (
                        <div key={task.id} className={'price-container'}>
                          <h2>{task.category}</h2>
                          <p>{task.desc}</p>
                        </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <p style={{color:'navy'}}>Why choose Fly cleaners for oven cleaning?</p>
                    {ovenCleaningBenefits.map(task => (
                        <div key={task.id}>
                          <ul className={'dot-list'}>
                            <li>{task.tag}</li>
                          </ul>
                          <p>{task.remark}</p>
                        </div>
                    ))}
                  </div>
                  <img src={Kept} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section className={'main-banner'}  style={{marginTop:'50px'}}>
                <div className="price-container">
                  <h2 style={{color:'navy'}}>Let the results amaze you!</h2>
                  <p>
                    Find out the secret to a spotless, expertly cleaned oven. Our professional oven cleaning plan in Edinburgh guarantees thorough, environmentally
                    responsible cleaning to make your kitchen sparkle. Make an appointment right now for an oven that is safer, cleaner, and more effective.
                    We guarantee complete customer satisfaction!</p>
                </div>
              </section>

              <section style={{marginTop:'50px', display:'block'}}>
                <div className={'container'}>
                  <h3 style={{textAlign:'start', color:'navy', marginBottom:'30px'}}>Frequently asked questions</h3>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight1O} style={styleRight1} />
                    <FaArrowLeft onClick={handleLeft1O} style={styleLeft1} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>How much does it cost to clean inside an oven?</p>
                      <p style={{marginLeft:'10px'}}>{question1}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight2O} style={styleRight2} />
                    <FaArrowLeft onClick={handleLeft2O} style={styleLeft2} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Is it worth getting my oven professionally cleaned?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question2}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight3O} style={styleRight3} />
                    <FaArrowLeft onClick={handleLeft3O} style={styleLeft3} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        How do professionals clean an oven?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question3}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight4O} style={styleRight4} />
                    <FaArrowLeft onClick={handleLeft4O} style={styleLeft4} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        How often should you get your oven cleaned by professionals?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question4}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight5O} style={styleRight5} />
                    <FaArrowLeft onClick={handleLeft5O} style={styleLeft5} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        What happens if you never clean your oven?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question5}</p>
                    </div>
                  </div>
                </div>
              </section>

            </div>
        );
        break;

      case 'End of tenancy':
        setLayout(
            <div>
              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                  <div className={'idea-container'}>
                    <div className={'price-container'}>
                      <p style={{color:'red', textAlign:'end'}}>Cashback up to £150</p>
                      <h3 style={{textAlign:'center'}}>Prices for end of tenancy cleaning in Edinburgh</h3>
                      <ul className={'dot-list'} >
                        <li>Time: 8 am - 9 pm </li>
                      </ul>

                      <div style={{display:'flex'}}>
                        <p>Next day</p>
                        <p style={{textAlign:'end'}}>Any day from tomorrow </p>
                        <p style={{color:'navy', textAlign:'end'}}>£18/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Same day</p>
                        <p style={{textAlign:'end', maxLines:'1'}}>Today, in 4h minimum</p>
                        <p style={{color:'navy', textAlign:'end'}}>£25/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Peak</p>
                        <p style={{textAlign:'end'}}>High demand</p>
                        <p style={{color:'navy', textAlign:'end'}}>£19/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Night</p>
                        <p style={{textAlign:'end'}}>Any day</p>
                        <p style={{color:'navy', textAlign:'end'}}>£29/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Night day</p>
                        <p style={{textAlign:'end'}}>Any day from tomorrow</p>
                        <p style={{color:'navy', textAlign:'end'}}>£18/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>End of tenancy</p>
                        <p style={{textAlign:'end'}}>Applicable Tariff + End of Tenancy Charge</p>
                        <p style={{color:'navy', textAlign:'end'}}>£29/h</p>
                      </div>

                    </div>
                    <div style={{display:'block'}}>
                      <div className="service-card">
                        <h3 style={{color:'navy'}}>What is included in end of tenancy cleaning in Edinburgh?</h3>
                        {endOfTenancyTasks.map(task => (
                            <div key={task.id}>
                              <ul className={'dot-list'}>
                                <li>{task.item}</li>
                              </ul>
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className={"container"} style={{maxWidth:'800px'}}>
                  <div className={'price-container'}>
                    <h2 style={{color:'navy'}}>End of Tenancy cleaning plan in Edinburgh</h2>
                    <p>
                      Our standard cleaning plan includes everything you need to get your home in order as quickly as possible.
                      You can book additional services when you make your booking.</p>
                  </div>
                </div>

              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div style={{display:'block'}}>
                  <h2 style={{color:'navy', marginBottom:'30px'}}>Who needs professional end of tenancy cleaners?</h2>
                  <div className={"grid-container"}>
                    {tenancyCleaningServices.map(task => (
                        <div key={task.id} className={'price-container'}>
                          <ul className={'dot-list'} style={{color:'navy', fontSize:'x-large'}}>
                            <li>{task.forWho}</li>
                          </ul>
                          <p>{task.detail}</p>
                        </div>
                    ))}
                  </div>
                </div>
              </section>

              <section  style={{marginTop:'50px'}}>
                <h2 style={{color:'navy'}}>End of tenancy cleaning in Edinburgh</h2>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <p>
                      When a tenancy comes to an end, it is essential for property owners to restore their rented property to its prime condition in order to place it back on the market.
                      To achieve this, it is crucial to enlist the services of a dependable and competent provider. At Fly cleaners, we exclusively employ top-tier tenancy cleaners who are highly
                      experienced and provide exceptional cleaning services. Our clients highly appreciate their work, often giving them a 5-star rating on review apps.
                      Presently, eMop's tenancy cleaning services are accessible in Edinburgh and the neighbouring regions.</p>
                  </div>
                  <img src={Kept} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <img src={Combine} alt={"cleaners"} className={'cart-image2'}/>
                  <div className="service-card">
                    <p>
                      Restore your property to its pristine state by booking a professional end of tenancy cleaning with us today.
                      Our standout feature is our 24/7 availability, enabling you to schedule cleaning at your convenience.
                      Just allow our cleaners a 4-hour window from the time of your end-of-tenancy booking to their arrival.
                      This plan is perfect for those in urgent need of tenancy cleaners, especially when their previous cleaner has become unavailable.
                      We offer a suitable tenancy cleaning package, enabling you to select which areas of your property require cleaning. While we provide an estimate,
                      we only charge you for the time our cleaner spent at your rental property.
                    </p>
                  </div>

                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <h3 style={{color:'navy', marginBottom:'20px'}}>For your bedroom, living and dining, we:</h3>
                    {cleaningServices.map(task => (
                        <div key={task.id}>
                          <ul className={'dot-list'}>
                            <li>{task.category}</li>
                          </ul>
                        </div>
                    ))}
                  </div>
                  <img src={Neat} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <img src={NeatBathroom} alt={"cleaners"} className={'cart-image2'}/>
                  <div className="service-card">
                    <h3 style={{color:'darkolivegreen'}}>For your bathroom, we:</h3>
                    <ul className={'dot-list'}>
                      <li>polish and descale mirrors, tiles, and appliances</li>
                      <li>clean and sanitise the bathtub, shower, toilet bowl, and the floor surface</li>
                      <li>dust and wipe all accessible surfaces</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <h3 style={{color:'darkolivegreen'}}>For your kitchen, we:</h3>
                    <div style={{display:'block'}}>
                      {kitchenCleaningTasks.map(itemTask => (
                          <div key={itemTask.id}>
                            <ul className={'dot-list'}>
                              <li>{itemTask.task}</li>
                            </ul>
                          </div>
                      ))}
                    </div>
                  </div>
                  <img src={Kitchen} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <img src={Stairs} alt={"cleaners"} className={'cart-image2'}/>
                  <div className="service-card">
                    <h3 style={{color:'darkolivegreen'}}>For the hallways and stairs, we:</h3>
                    <div style={{display:'block'}}>
                      {generalCleaningTasks.map(itemTask => (
                          <div key={itemTask.id}>
                            <ul className={'dot-list'}>
                              <li>{itemTask.task}</li>
                            </ul>
                          </div>
                      ))}
                      <p>Subject to availability of time, our tenancy cleaners can provide additional services,
                        such as cleaning bookcases, the balcony, pet trays, birdcages, and the entire kitchen.
                        They are also capable of changing linens and bed covers.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="price-container">
                    <h3 style={{color:'darkolivegreen'}}>For office end of tenancy cleaning, we:</h3>
                    <div style={{display:'block'}}>
                      {officeList.map(itemTask => (
                          <div key={itemTask.id}>
                            <ul className={'dot-list'}>
                              <li>{itemTask.task}</li>
                            </ul>
                          </div>
                      ))}
                      <p style={officeList.length == miniOffice.length ? {display:'none'} : {display:''}}>
                        Our cleaning plan priority is your complete satisfaction, especially when it comes to lease cleaning.
                        We understand that every client has unique requirements, and thus, our plan is fully customizable to meet your specific needs.
                        Our comprehensive and flexible approach ensures that your rental property is restored to a pristine condition, and you have the freedom to select what needs cleaning.
                        To guarantee exceptional results, we strictly adhere to our comprehensive cleaning checklist.</p>
                      <button onClick={handleOfficeTask} style={{color:'blue', width:'150px', background:'white'}}>{officeList.length === miniOffice.length ? 'See more ': 'See less'}</button>
                    </div>
                  </div>
                  <img src={Office} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px', maxWidth:'800px'}}>
                <div className={'price-container'}>
                  <h3 style={{color:'navy'}}>Let the results amaze you!</h3>
                  <p>
                    We know that every client has specific needs, and for this reason our plan is customisable.
                    Our flexible design lets you choose what needs cleaning. Here is our full Checklist.
                  </p>
                </div>
              </section>

              <section style={{marginTop:'50px', display:'block'}}>
                <div className={'container'}>
                  <h3 style={{textAlign:'start', color:'navy', marginBottom:'30px'}}>Frequently asked questions</h3>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight1U} style={styleRight1} />
                    <FaArrowLeft onClick={handleLeft1U} style={styleLeft1} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>Do cleaners provide equipment / products?</p>
                      <p style={{marginLeft:'10px'}}>{question1}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight2U} style={styleRight2} />
                    <FaArrowLeft onClick={handleLeft2U} style={styleLeft2} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Why is the estimated price for the cleaning more than what I chose?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question2}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight3U} style={styleRight3} />
                    <FaArrowLeft onClick={handleLeft3U} style={styleLeft3} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        I need a quotation for end of tenancy / one off / carpet (combined) order
                      </p>
                      <p style={{marginLeft:'10px'}}>{question3}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight4U} style={styleRight4} />
                    <FaArrowLeft onClick={handleLeft4U} style={styleLeft4} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Is there a guarantee of a refund if the job isn't done up to standard?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question4}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight5U} style={styleRight5} />
                    <FaArrowLeft onClick={handleLeft5U} style={styleLeft5} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        When will I get confirmation for my booking?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question5}</p>
                    </div>
                  </div>
                </div>
              </section>

            </div>
        );
        break;

      case 'Carpet':
        setLayout(
            <div>
              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                  <div className={'idea-container'}>
                    <div className={'price-container'}>
                      <p style={{color:'red', textAlign:'end'}}>Cashback up to £150</p>
                      <h3 style={{textAlign:'center'}}>Prices for carpet cleaning in Edinburgh</h3>
                      <div style={{display:'flex'}}>
                        <p>Next day</p>
                        <p style={{color:'navy', textAlign:'end'}}>£48/h</p>
                      </div>
                    </div>
                    <div className={'price-container'}>
                      <h3 style={{color:'navy'}}>What is included in carpet cleaning in Edinburgh?</h3>
                      {carpetCheckList.map(plan => (
                          <div key={service.id}>
                            <ul className={'dot-list'}>
                              <li>{service.category}</li>
                            </ul>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={"container"} style={{maxWidth:'800px'}}>
                  <div className={'price-container'}>
                    <h2 style={{color:'navy'}}>Carpet cleaning plan in Edinburgh</h2>
                    <p>
                      Our standard cleaning plan includes everything you need to get your home in order as quickly as possible.
                      You can book additional services when you make your booking.
                    </p>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className={'container'}>
                  <h3 style={{color:'navy', marginBottom:'20px', textAlign:'center'}}>What does the process of carpet cleaning look like?</h3>
                  <div className="grid-container">
                    <div className="price-container">
                      <h3>Preparation</h3>
                      <p>
                        Fly carpet cleaning Edinburgh team will first prep the area. This procedure includes moving heavy and soft furnishings to allow for simple access, inspecting the carpet for dust mites, frequent stains (like those caused by pet accidents) or specific cleaning needs, and more. In order to give you freshly cleaned carpets, our expertly trained crew also hoover the carpet to remove dirt or debris.
                      </p>
                    </div>

                    <div className="price-container">
                      <h3>Cleaning process</h3>
                      <p>
                        Using cutting-edge machinery and potent cleaning agents are part of the standard professional plan for carpet cleaning. Fly clearners Edinburgh carpet cleaners frequently employ dry cleaning or hot water extraction (sometimes known as "steam cleaning") techniques, depending on the type of carpet and its state.
                        During a hot water extraction, the carpet is totally extracted after hot water and a cleaning solution are pumped into it. Dry cleaning procedures may call for the use of specialised chemicals or foams.
                      </p>
                    </div>

                    <div className="price-container">
                      <h3>Finishing touch</h3>
                      <p>
                        When cleaning a carpet, eMop carpet cleaning Edinburgh team use powerful extraction tools and air movers if needed to ensure proper drying. Our specialist cleaning plan crew also does a final inspection to guarantee that all stains and spots have been removed and the carpet looks clean and new. Applying stain protection is also part of the final touches.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <p style={{color:'navy'}}>What our cleaners will do</p>
                    <p>
                      In a professional manner, our carpet cleaners Edinburgh will use their specialised equipment to clean areas with hair,
                      dust, and loose debris from the surfaces. Once all the dust and loose debris has been collected,
                      they will identify any areas that are highly discoloured, get them rigorously tested, and start treating them.
                      They'll also use a highly effective infection control cleaning agent that is also environmentally friendly. T
                      hat way, your rug and furniture will be clear of visible dust and debris, but they will also be sanitised.
                      After our carpet cleaning Edinburgh crew have given thorough cleaning to the carpet and upholstery, t
                      hey will leave you completely satisfied, making sure that every item of furniture is returned to its original state for a reasonable price.
                      Our organisation can help you keep the carpets clean and eliminate every upholstery cleaning problem in your Edinburgh residential home or nursing homes,
                      or place of business smelling good.
                    </p>
                  </div>
                  <img src={Rug} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className="price-container">
                  <h3 style={{color:'navy'}}>Let the results amaze you!</h3>
                  <p>
                    You need to experience our Edinburgh carpet cleaning services once for you to fall in love with us.
                    Carpet cleaning is made easy by our highly trained and committed carpet cleaning Edinburgh team.
                    It is easy to order our cleaning services. All you need to do is to submit your postcode and then you will get a free quote.
                    Upon completing your booking process, the cleaners will come to your location to give you great value for your money.
                  </p>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px', display:'block'}}>
                <div className={'container'}>
                  <h3 style={{textAlign:'start', color:'navy', marginBottom:'30px'}}>Frequently asked questions</h3>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight1C} style={styleRight1} />
                    <FaArrowLeft onClick={handleLeft1C} style={styleLeft1} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>Do cleaners provide equipment / products?</p>
                      <p style={{marginLeft:'10px'}}>{question1}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight2C} style={styleRight2} />
                    <FaArrowLeft onClick={handleLeft2C} style={styleLeft2} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Why is the estimated price for the cleaning more than what I chose?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question2}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight3C} style={styleRight3} />
                    <FaArrowLeft onClick={handleLeft3C} style={styleLeft3} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        I need a quotation for end of tenancy / one off / carpet (combined) order
                      </p>
                      <p style={{marginLeft:'10px'}}>{question3}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight4C} style={styleRight4} />
                    <FaArrowLeft onClick={handleLeft4C} style={styleLeft4} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Is there a guarantee of a refund if the job isn't done up to standard?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question4}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight5C} style={styleRight5} />
                    <FaArrowLeft onClick={handleLeft5C} style={styleLeft5} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        When will I get confirmation for my booking?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question5}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
        );
        break;

      case 'Office':
        setLayout(
            <div>
              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px', maxWidth:'800px'}}>
                  <div className={'price-container'}>
                    <h3 style={{color:'navy'}}>What is included in office cleaning in Edinburgh?</h3>
                    {officeTasks.map(plan => (
                        <div key={service.id}>
                          <ul className={'dot-list'}>
                            <li>{service.task}</li>
                          </ul>
                        </div>
                    ))}
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className={"container"} style={{maxWidth:'800px'}}>
                  <div className={'price-container'}>
                    <h2 style={{color:'navy'}}>Business office cleaning plan in Edinburgh</h2>
                    <p>
                      Our standard cleaning plan includes everything you need to get your home in order as quickly as possible.
                      You can book additional services when you make your booking.
                    </p>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'container'}>
                  <h3 style={{color:'navy', marginBottom:'20px', textAlign:'center'}}>Office cleaning</h3>
                  <div className="grid-container">
                    {specializedCleaningServices.map(plan => (
                        <div key={service.id} className={'price-container'}>
                          <h3>{service.category}</h3>
                          <ul className={'dot-list'}>
                            <li>{service.task}</li>
                          </ul>
                        </div>
                    ))}
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <h2 style={{color:'navy'}}>Choose trusted office cleaning plan in Edinburgh</h2>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <p>
                      When customers enter your office, their first impressions matter. If the office space is clean,
                      tidy and generally pleasant to be in, it sets your relationship with the customer on the right path.
                      Our office cleaning plan in Edinburgh is here to help you present your business in the best possible light.
                      An uncluttered, spotless work environment sends an important message to your customers as well as your employees.
                      Fly  is dedicated to achieving and maintaining the highest standards when it comes to commercial cleaning services.
                      Our crew of skilled office cleaners in Edinburgh is composed of enthusiastic, committed experts.
                      Our professional office cleaners have access to the training and education necessary to provide cleaning services
                      that go above and beyond clients' expectations thanks to our staff training programs.</p>
                  </div>
                  <img src={Greasy} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>

              <div className={'idea-container'}>
                <img src={Cleaners} alt={"cleaners"} className={'cart-image2'}/>
                <div className="service-card">
                  <h3 style={{color:'navy'}}>More reasons you should use our reliable plan</h3>
                  {competitiveAdvantages.map(task =>(
                      <div key={task.id}>
                        <ul className={'dot-list'}>
                          <li>{task.reason}</li>
                        </ul>
                      </div>
                  ))}
                </div>
              </div>

            </section>

              <section style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <h3 style={{color:'navy'}}>Easily customised commercial cleaning plan</h3>
                    <p>There are occasions when you don't require a specific plan as part of your office cleaning,
                      or you wish to include something extra. You might wish to adjust the cleaning schedule based on t
                      he kind of office you have or your demands at a particular moment.
                      We provide a long list of commercial services in addition to the typical office cleaning packages, including:
                    </p>
                    <ul className={'dot-list'}>
                      <li>Office equipment cleaning</li>
                      <li>Bathroom washing and sanitizing</li>
                      <li>Kitchen cleaning</li>
                      <li>Stain removal with professional equipment</li>
                      <li>Interior & exterior window cleaning</li>
                      <li>Balcony cleaning</li>
                      <li>Cleaning floors, vacuuming the carpets, mopping the floors, and wiping skirting boards</li>
                    </ul>
                  </div>
                  <img src={Mattress} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <h3 style={{color:'navy'}}>Cleaning plan for office kitchen includes</h3>
                    <ul className={'dot-list'}>
                      <li>Washing dishes</li>
                      <li>Wiping down appliances</li>
                      <li>Cleaning kitchen surfaces with the proper ecologically friendly products and techniques</li>
                    </ul>
                  </div>
                  <img src={Rug} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <img src={Office} alt={"cleaners"} className={'cart-image2'}/>
                  <div className="service-card">
                    <h3 style={{color:'navy'}}>Why book office cleaning plan from Fly cleaners Edinburgh?</h3>
                    <ul className={'dot-list'}>
                      <li>All of our office cleaning personnel are certified and covered by insurance</li>
                      <li>To guarantee a high-quality clean, we provide all the cleaning materials and machinery</li>
                      <li>We clean both inside and outside, any time you want</li>
                      <li>We clean the microwave, oven, and refrigerator in the office</li>
                      <li>We offer our office cleaning services at affordable prices</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="price-container">
                  <h3 style={{color:'navy'}}>Let the results amaze you!</h3>
                  <p>
                    Our cutting-edge cleaning techniques eliminate the need for chemicals that are bad for the environment and our people,
                    while leaving your business clean and safe. Our level of plan is extraordinary, and we are also kind to people and the environment.
                    We take great pride in our tight working relationships with our clients. Don't pass up the chance to have expert cleaners handle your office's cleaning needs.
                  </p>
                </div>
              </section>

              <section style={{marginTop:'50px', display:'block'}}>
                <div className={'container'}>
                  <h3 style={{textAlign:'start', color:'navy', marginBottom:'30px'}}>Frequently asked questions</h3>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight1R} style={styleRight1} />
                    <FaArrowLeft onClick={handleLeft1R} style={styleLeft1} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>Do cleaners provide equipment / products?</p>
                      <p style={{marginLeft:'10px'}}>{question1}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight2R} style={styleRight2} />
                    <FaArrowLeft onClick={handleLeft2R} style={styleLeft2} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Why is the estimated price for the cleaning more than what I chose?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question2}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight3R} style={styleRight3} />
                    <FaArrowLeft onClick={handleLeft3R} style={styleLeft3} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        I need a quotation for end of tenancy / one off / carpet (combined) order
                      </p>
                      <p style={{marginLeft:'10px'}}>{question3}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight4R} style={styleRight4} />
                    <FaArrowLeft onClick={handleLeft4R} style={styleLeft4} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Is there a guarantee of a refund if the job isn't done up to standard?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question4}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight5R} style={styleRight5} />
                    <FaArrowLeft onClick={handleLeft5R} style={styleLeft5} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        When will I get confirmation for my booking?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question5}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
        );
        break;

      case 'Same day':
        setLayout(
            <div>
              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container">
                  <div className={'idea-container'}>
                    <div className={'price-container'}>
                      <p style={{color:'red', textAlign:'end'}}>Cashback up to £150</p>
                      <h3 style={{textAlign:'center'}}>What is included in Same Day cleaning in Edinburgh?</h3>
                      <p style={{color:'blue'}}>from £25/h</p>
                      <li>Time: 8 am - 9 pm</li>
                      <div style={{display:'flex'}}>
                        <p>Next day</p>
                        <p style={{color:'navy', textAlign:'end'}}>£48/h</p>
                      </div>
                      <div style={{display:'flex'}}>
                        <p>End of tenancy</p>
                        <p>Applicable Tariff + End of Tenancy Charge</p>
                        <p style={{color:'navy', textAlign:'end'}}>29/h</p>
                      </div>

                    </div>
                    <div className={'service-card'}>
                      <h3 style={{color:'navy'}}>What is included in Same Day cleaning in Edinburgh?</h3>
                      {cleaningChecklist.map(plan => (
                          <div key={service.id}>
                            <ul className={'dot-list'}>
                              <li>{service.item}</li>
                            </ul>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className={"container"} style={{maxWidth:'800px'}}>
                  <div className={'price-container'}>
                    <h2 style={{color:'navy'}}>Same Day cleaning plan in Edinburgh</h2>
                    <p>
                      Our standard cleaning plan includes everything you need to get your home in order as quickly as possible. You can book additional services when you make your booking
                    </p>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <img src={Office} alt={"cleaners"} className={'cart-image2'}/>
                  <div className="service-card">
                    <h3 style={{color:'navy'}}>Try our last-minute cleaning services</h3>
                    {highlist.map(plan => (
                        <div key={service.id}>
                          <ul className={'dot-list'}>
                            <li>{service.item}</li>
                          </ul>
                        </div>
                    ))}
                    <button onClick={handleServiceList} style={{width:'150px', color:'blue', background:'white'}}>{highlist.length === miniList.length ? 'See more': 'See less'}</button>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <h3 style={{color:'navy'}}>Same Day Steam Cleaning</h3>
                    <p>An environmentally friendly method of cleaning is steam cleaning, where we use heat to remove all domestic dust and debris as well as industrially-related sticky grease and grime. The mopping solution evaporates quickly, allowing the floor to finish drying. Steaming enables tough dust to swiftly lose its force and facilitates cleaning. The process of steam cleaning makes it simple to remove stubborn and persistent dust and stains.
                      Following our cleaning procedure, all filth and dust from your home or business will be removed, and your floors, furniture, sofas, and carpets will all appear brand new.</p>
                  </div>
                  <img src={Sofa} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <img src={Suit} alt={"cleaners"} className={'cart-image2'}/>
                  <div className="service-card">
                    <h3 style={{color:'navy'}}>Same Day Hotel Cleaning</h3>
                    <p>You must pay more for your maids for a single day of washing and maintenance because hotel cleaning is more difficult than you might assume.
                      Our Same day cleaning services employ professionals with greater knowledge and training in hotel management cleaning services.
                      The complete cleaning process will be handled by our hard-working team in a single day after they arrive on time.
                      Cleaning of the living space, cooking area, restrooms, and front lobby are all included in the chores. Booking our same day cleaning plan is easy - just enter your postcode in the form on our website and choose our professional cleaning services.</p>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <h2 style={{color:'navy'}}>Same Day Carpet Cleaning</h2>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <p>
                      For major businesses, corporate buildings, and residential properties, we provide same-day carpet cleaning.
                      We offer a thorough plan to remove tough stains from your carpet and restore its fresh, recently purchased appearance.
                      We are Edinburgh's leading authority on same-day cleaning services. For your carpets, we provide punctual dry cleaning,
                      steam cleaning, stain treatment, and pet odour removal services. It's easy to book us, even if it's for a last minute cleaning plan.</p>
                  </div>
                  <img src={Carpet} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <h2 style={{color:'navy', marginBottom:'20px'}}>Same Day House Cleaning</h2>
                <div className={'idea-container'}>
                  <img src={Neat} alt={"cleaners"} className={'cart-image2'}/>
                  <div className="service-card">
                    <p>
                      It is impossible for one person to clean the entire house in one day. Make a call on our behalf,
                      and we'll handle your process. We dust the kitchen first, then sweep the floor as the final step in our maintenance process.
                      After receiving your booking, we quickly arrived and quickly created an environment that is both clean and eco-friendly in your home.
                      In addition to vacuuming the carpet and floor, wiping down the furniture and glass windows, and dusting the walls and ceiling,
                      we also take care of your laundry and garments. As part of our house cleaning same day maintenance services,
                      we also make the beds and make sure your room is well arranged.</p>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="price-container">
                  <h3 style={{color:'navy'}}>Let the results amaze you!</h3>
                  <p>
                    We make sure that no assignment is completed unless it reaches the highest standards,
                    thanks to our in-depth industry knowledge and thorough attention to detail.
                    Booking our top-notch London cleaners is an easy and practical approach to handle your cleaning requirements.
                  </p>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <h2 style={{color:'navy', marginBottom:'20px'}}>Same Day Office Cleaning</h2>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <p>
                      Our same day office cleaning services enable you to give your team a smart, clean, and hygienic working environment in addition to
                      enhancing the first impression that customers get of your business right on your doorstep.
                      Fly professional cleaners constantly provide a standard of plan that is at the highest level
                      due to our years of experience and our strong internal project management system infrastructure.
                      Our area managers assist our highly qualified and committed team, and they are all available to
                      make sure that you are always satisfied with our cleaning services.
                      Our cleaning plan in Edinburgh offers you the assistance you need, whether you're in a tiny office, a big commercial facility,
                      or on several different sites with different needs. Fly expert cleaners work with domestic and
                      commercial properties and ensure efficient cleaning of any premises.</p>
                  </div>
                  <img src={Combine} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

            </div>
        );
        break;

      case 'Move in':
        setLayout(
            <div>
              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                  <div className={'idea-container'}>
                    <div className={'price-container'}>
                      <p style={{color:'red', textAlign:'end'}}>Cashback up to £150</p>
                      <h3 style={{textAlign:'center'}}>Prices for move-In cleaning in Edinburgh</h3>
                      <p style={{color:'blue'}}>from £18/h</p>
                      <ul className={'dot-list'} >
                        <li>Time: 8 am - 9 pm </li>
                      </ul>

                      <div style={{display:'flex'}}>
                        <p>Next day</p>
                        <p style={{textAlign:'end'}}>Any day from tomorrow </p>
                        <p style={{color:'navy', textAlign:'end'}}>£18/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Same day</p>
                        <p style={{textAlign:'end', maxLines:'1'}}>Today, in 4h minimum</p>
                        <p style={{color:'navy', textAlign:'end'}}>£25/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Peak</p>
                        <p style={{textAlign:'end'}}>High demand</p>
                        <p style={{color:'navy', textAlign:'end'}}>£19/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Night</p>
                        <p style={{textAlign:'end'}}>Any day</p>
                        <p style={{color:'navy', textAlign:'end'}}>£29/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>End of tenancy</p>
                        <p style={{textAlign:'end'}}>Applicable Tariff + End of Tenancy Charge</p>
                        <p style={{color:'navy', textAlign:'end'}}>£29/h</p>
                      </div>

                    </div>
                    <div style={{display:'block'}}>
                      <div className="service-card">
                        <h3 style={{color:'navy'}}>What is included in move-In cleaning in Edinburgh?</h3>
                        {deepCleaningServices.map(task => (
                            <div key={task.id}>
                              <ul className={'dot-list'}>
                                <li>{task.item}</li>
                              </ul>
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={"container"} style={{maxWidth:'800px'}}>
                  <div className={'price-container'}>
                    <h2 style={{color:'navy'}}>Move-In cleaning plan in Edinburgh</h2>
                    <p>
                      Our standard cleaning plan includes everything you need to get your home in order as quickly as possible.
                      You can book additional services when you make your booking..</p>
                  </div>
                </div>

              </section>

              <section style={{marginTop:'50px'}}>
                <div style={{display:'block'}}>
                  <h2 style={{color:'navy', marginBottom:'30px'}}>How does a move-in cleaning plan work?</h2>
                  <div className={"grid-container"}>
                    {moveInCleaningProcess.map(task => (
                        <div key={task.id} className={'price-container'}>
                          <h2>{task.category}</h2>
                          <p>{task.desc}</p>
                        </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <p style={{color:'navy'}}>Why choose Fly cleaners for new house cleaning?</p>
                    {moveInList.map(task => (
                        <div key={task.id}>
                          <ul className={'dot-list'}>
                            <li>{task.tag}</li>
                          </ul>
                          <p>{task.reason}</p>
                        </div>
                    ))}
                    <button onClick={handleMoveIn} style={{color:'blue', width:'150px', background:'white'}}>{moveInList.length === miniMove.length ? 'See more': 'See less'}</button>
                  </div>
                  <img src={Kept} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div style={{display:'block'}}>
                  <h3 style={{color:'navy', marginBottom:'20px'}}>Move-In Cleaning Service Checklist</h3>
                  {checklist.map(task => (
                      <div className={'idea-container'} style={{marginBottom:'20px'}}>
                        <img src={task.src} alt={"cleaners"} className={'cart-image2'}/>
                        <div key={task.id} className="service-card">
                          <h3 style={{color:'navy'}}>{task.task}</h3>
                          {task.checklist.map((list, index) => (
                              <ul className={'dot-list'} key={index}>
                                <li>{list}</li>
                              </ul>
                          ))}
                        </div>
                      </div>
                  ))}
                  <button style={{background:'white', width:'150px', color:'blue'}}
                          onClick={handleChecklist}>{checklist.length < allChecklist.length ? 'See More': 'See less'}
                  </button>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <img src={NeatBathroom} alt={"cleaners"} className={'cart-image2'}/>
                  <div className="service-card">
                    <h3 style={{color:'darkolivegreen'}}>Get more with our extra services</h3>
                    <div style={{display:'block'}}>
                      {householdList.map(itemTask => (
                          <div key={itemTask.id}>
                            <ul className={'dot-list'}>
                              <li>{itemTask.task}</li>
                            </ul>
                          </div>
                      ))}
                      <button onClick={handleHousehold} style={{width:'150px', background:'white', color:'black', marginTop:'20px'}}>
                        {householdList.length == miniHousehold.length ? 'See more' : 'See less'}</button>
                    </div>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px', maxWidth:'800px'}}>
                <div className={'price-container'}>
                  <h3 style={{color:'navy'}}>Let the results amaze you!</h3>
                  <p>
                    At Fly cleaners, we take great pleasure in our focus on the little things and dedication to complete customer satisfaction.
                    With the time and work saved, you can concentrate on settling into your new home with the help of our move-in cleaning services.
                    To schedule an appointment and enjoy a spotless and pleasant environment right away, call or email us right now.
                  </p>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px', display:'block'}}>
                <div className={'container'}>
                  <h3 style={{textAlign:'start', color:'navy', marginBottom:'30px'}}>Frequently asked questions</h3>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight1M} style={styleRight1} />
                    <FaArrowLeft onClick={handleLeft1M} style={styleLeft1} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>How much does a move-in cleaning plan cost?</p>
                      <p style={{marginLeft:'10px'}}>{question1}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight2M} style={styleRight2} />
                    <FaArrowLeft onClick={handleLeft2M} style={styleLeft2} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Do I need to hire professional move-in cleaners before moving in?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question2}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight3M} style={styleRight3} />
                    <FaArrowLeft onClick={handleLeft3M} style={styleLeft3} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        I need my carpets cleaned with my move-in clean. Can you help?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question3}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight4M} style={styleRight4} />
                    <FaArrowLeft onClick={handleLeft4M} style={styleLeft4} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        What are your move-in cleaning operating hours?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question4}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight5M} style={styleRight5} />
                    <FaArrowLeft onClick={handleLeft5M} style={styleLeft5} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Do you provide cleaning materials and equipment?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question5}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight6M} style={styleRight6} />
                    <FaArrowLeft onClick={handleLeft6M} style={styleLeft6} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        How long will the cleaning take?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question6}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight7M} style={styleRight7} />
                    <FaArrowLeft onClick={handleLeft7M} style={styleLeft7} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Do I need to be at the property?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question7}</p>
                    </div>
                  </div>
                </div>

              </section>

            </div>
        );
        break;

      case 'Rug':
        setLayout(
            <div>
              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                  <div className={'idea-container'}>
                    <div className={'price-container'}>
                      <p style={{color:'red', textAlign:'end'}}>Cashback up to £150</p>
                      <h3 style={{textAlign:'center'}}>Prices for rug cleaning in Edinburgh</h3>
                      <p style={{color:'blue'}}>from £48/h</p>
                      <div style={{display:'flex'}}>
                        <p>Next day</p>
                        <p style={{color:'navy', textAlign:'end'}}>£48/h</p>
                      </div>
                    </div>
                    <div className={'price-container'}>
                      <h3 style={{color:'navy'}}>What is included in rug cleaning in Edinburgh?</h3>
                      {rugCleaningServices.map(plan => (
                          <div key={service.id}>
                            <ul className={'dot-list'}>
                              <li>{service.item}</li>
                            </ul>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className={"container"} style={{maxWidth:'800px'}}>
                  <div className={'price-container'}>
                    <h2 style={{color:'navy'}}>Rug cleaning plan in Edinburgh</h2>
                    <p>
                      Our standard cleaning plan includes everything you need to get your home in order as quickly as possible.
                      You can book additional services when you make your booking.</p>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'container'}>
                  <h3 style={{color:'navy', marginBottom:'20px', textAlign:'center'}}>What does the process of rug cleaning look like?</h3>
                  <div className="grid-container">
                    <div className="price-container">
                      <h3>Dry cleaning</h3>
                      <p>
                        Any type of rug can be dry cleaned, however particular silk varieties, sisal, seagrass, jute, coir, viscose, and rugs made of plant fibre or pulp must be dry cleaned.
                        Some rugs can only be dry cleaned, which means that a dry cleaning product or powder must be used to clean them. These carpets include fibres that can absorb liquids, causing the rug to become permanently damaged.
                      </p>
                    </div>

                    <div className="price-container">
                      <h3>Foam cleaning</h3>
                      <p>
                        Delicate, specialised cleaning of unique textiles like velvet, viscose (rayon), silk, and velour, among others, is necessary. We clean these fabrics with a foam composition for safer and better results because liquids can damage them.
                        When agitated during the application process, the specialised chemicals we utilise quickly froth. The foam draws contaminants, allergies, and germs from the fibres, which are then quickly removed from the fabric.
                      </p>
                    </div>

                    <div className="price-container">
                      <h3>Cold water extraction</h3>
                      <p>
                        Certain carpets, especially those composed of wool, linen, or a combination of these two fibres, can be cleaned using cold water extraction or dry cleaning. More efficient elimination of stains and spots is a benefit of cold water extraction.
                        Chemicals that have been authorised by Woolsafe are used in cold water extraction with water that can reach 30 degrees Celsius.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <h3 style={{color:'navy'}}>Why choose Fly cleaners for rug cleaning?</h3>
                    {rugCleaningBenefits.map(benefit => (
                        <div key={benefit.id}>
                          <ul className={'dot-list'}>
                            <li>{benefit.reason}</li>
                          </ul>
                        </div>
                    ))}
                  </div>
                  <img src={Rug} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <h3 style={{color:'navy'}}>We clean all types of rugs</h3>
                    <p>
                      Rugs are once again gaining attention as hard floors become more and more fashionable and carpet sales fall. Not only is it pleasing to the sight to have a gorgeous rug in the middle of the room, but it also makes a statement about the property's style.
                      We have the answer for you whether you have a synthetic rug that requires expert cleaning, an antique rug that needs to be revived, or a high-end viscose item that has to be dry cleaned.
                      Our rug cleaning procedure is rigorous and customised to meet the unique requirements of each type of rug. We are aware that various fibres and weaves demand particular handling, so our trained specialists use the best cleaning techniques to maintain the durability of your carpets.
                      Our rug cleaners thoroughly but delicately remove allergens, stains, and filth from your rugs using cutting-edge cleaning technology and eco-friendly cleaning solutions, leaving them renewed and revived. The meticulousness of our team's work ensures that even the most delicate fibres are handled with the utmost care.</p>
                  </div>
                  <img src={Rugs} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <img src={RugMethod} alt={"cleaners"} className={'cart-image2'}/>
                  <div className="service-card">
                    <h3 style={{color:'navy'}}>Professional rug cleaning methods available</h3>
                    <p>
                      Both residential and commercial customers in Edinburgh can take advantage of our superior rug cleaning services.
                      Fly cleaners as a cleaning agency provides top carpet and upholstery cleaning services just like other rug cleaning companies.<br/><br/>
                      Our rug cleaning in Edinburgh is customised to meet the unique requirements of your residence or place of business. Our machines are all top-of-the-line, commercial products,
                      and we only utilise the best rug cleaning solutions. Our personnel have received extensive training in the art of rug cleaning and stain removal.<br/><br/>
                      Fly cleaner has a team of rug cleaning technicians who are certified and insured. We take great pride in being able to offer the best rug cleaning plan.
                      We always go above and beyond to satisfy your requirements and expectations.
                    </p>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <h3 style={{color:'navy'}}>Professional rug cleaning methods available</h3>
                    <p>
                      Fly professional cleaners use a sanitation method that forces pressurised hot water and detergent into your rug to give it the deepest clean possible. This offers a thorough cleaning that is not achievable with simple vacuuming or even dry rug washing.
                      Carpets receive a lot of foot movement and have dirt deeply embedded in them. They are deep in the carpet pile, where harmful microbes are present.<br/><br/>
                      Our expert cleaning techniques guarantee that even the most stubborn stains and bacteria are thoroughly and neatly eliminated. For this, we employ a hot water extraction technique in our rug cleaning Edinburgh plan, which is carried out by a machine that sends high-pressure water loaded with cleaning solution into the rug's deepest, darkest crevices.<br/><br/>
                      Our cleaning methods are perfect for you if you or a member of your family has asthma or other allergies, because it significantly decreases allergens, including fungi, mould, dust mites, and mildew. Even the toughest stains and filth can be removed from rugs with this method of cleaning.
                    </p>
                  </div>
                  <img src={Rug} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className="price-container">
                  <h3 style={{color:'navy'}}>Let the results amaze you!</h3>
                  <p>
                    You will be delighted with the outcomes of our excellent rug cleaning services, which will also add brightness to your house.
                    We highly recommend our professional rug cleaning services to people who are busy, or have children or pets.
                  </p>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px', display:'block'}}>
                <div className={'container'}>
                  <h3 style={{textAlign:'start', color:'navy', marginBottom:'30px'}}>Frequently asked questions</h3>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight1RU} style={styleRight1} />
                    <FaArrowLeft onClick={handleLeft1RU} style={styleLeft1} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>Is it worth it to clean a rug?</p>
                      <p style={{marginLeft:'10px'}}>{question1}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight2RU} style={styleRight2} />
                    <FaArrowLeft onClick={handleLeft2RU} style={styleLeft2} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        How do you clean an expensive rug?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question2}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight3RU} style={styleRight3} />
                    <FaArrowLeft onClick={handleLeft3RU} style={styleLeft3} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        How do I prepare my rug for professional cleaning?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question3}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight4RU} style={styleRight4} />
                    <FaArrowLeft onClick={handleLeft4RU} style={styleLeft4} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        How long will it take for an average rug to dry completely after a professional cleaning?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question4}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight5RU} style={styleRight5} />
                    <FaArrowLeft onClick={handleLeft5RU} style={styleLeft5} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Do you remove stains from rugs?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question5}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
        );
        break;

      case 'Kitchen deep':
        setLayout(
            <div>
              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                  <div className={'idea-container'}>
                    <div className={'price-container'}>
                      <p style={{color:'red', textAlign:'end'}}>Cashback up to £150</p>
                      <h3 style={{textAlign:'center'}}>Prices for kitchen deep cleaning in Edinburgh</h3>
                      <p style={{color:'blue'}}>from £18/h</p>

                      <ul className={'dot-list'} >
                        <li>Time: 8 am - 9 pm </li>
                      </ul>

                      <div style={{display:'flex'}}>
                        <p>Next day</p>
                        <p style={{textAlign:'end'}}>Any day from tomorrow </p>
                        <p style={{color:'navy', textAlign:'end'}}>£18/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Same day</p>
                        <p style={{textAlign:'end', maxLines:'1'}}>Today, in 4h minimum</p>
                        <p style={{color:'navy', textAlign:'end'}}>£25/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Peak</p>
                        <p style={{textAlign:'end'}}>High demand</p>
                        <p style={{color:'navy', textAlign:'end'}}>£19/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Night</p>
                        <p style={{textAlign:'end'}}>Any day</p>
                        <p style={{color:'navy', textAlign:'end'}}>£29/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>End of tenancy</p>
                        <p style={{textAlign:'end'}}>Applicable Tariff + End of Tenancy Charge</p>
                        <p style={{color:'navy', textAlign:'end'}}>£29/h</p>
                      </div>

                    </div>

                    <div style={{display:'block'}}>
                      <div className="service-card">
                        <h3 style={{color:'navy'}}>What is included in kitchen deep cleaning in Edinburgh?</h3>
                        {kitchenDeepCleaningTasks.map(task => (
                            <div key={task.id}>
                              <ul className={'dot-list'}>
                                <li>{task.task}</li>
                              </ul>
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className={"container"} style={{maxWidth:'800px'}}>
                  <div className={'price-container'}>
                    <h2 style={{color:'navy'}}>Kitchen Deep cleaning plan in Edinburgh</h2>
                    <p>
                      Our standard cleaning plan includes everything you need to get your home in order as quickly as possible.
                      You can book additional services when you make your booking.
                    </p>
                  </div>
                </div>

              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div style={{display:'block'}}>
                  <h2 style={{color:'navy', marginBottom:'30px'}}>What does the process of cleaning a kitchen look like?</h2>
                  <div className={"grid-container"}>
                    {kitchenDeepCleaningProcess.map(task => (
                        <div key={task.id} className={'price-container'}>
                          <h2>{task.step}</h2>
                          <p>{task.detail}</p>
                        </div>
                    ))}
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <img src={Kitchen3} alt={"cleaners"} className={'cart-image2'}/>
                  <div className="service-card">
                    <h3 style={{color:'navy', marginBottom:'20px'}}>What is the difference between regular cleaning and deep kitchen cleaning?</h3>
                    <p>
                      Deep kitchen cleaning is distinct from routine or spring cleaning since it removes the filth and grime that is embedded deep within your home.<br/><br/>
                      It cleans places that are typically not covered by a normal or spring clean, such as kitchen appliances like the oven and washing machine,
                      removing built-up filth. Typically, we send two or more cleaners to accomplish this type of cleaning plan because it takes longer than usual.<br/><br/>
                      Kitchen deep cleaning extends beyond the usual responsibilities of daily cleaning, such as wiping countertops and doing the dishes. In order to provide a
                      more thorough effect, it involves thorough cleaning of the grout, cupboards, appliances, and other difficult-to-reach locations.<br/><br/>
                      Descaling appliances, cleaning vents and exhaust fans, sanitising garbage cans, and disinfecting surfaces are additional deep cleaning activities
                      for your kitchen. To maintain a clean and secure kitchen environment, it takes care of neglected areas.
                    </p>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <h3 style={{color:'darkolivegreen'}}>Why Choose Fly cleaner for Kitchen Cleaning?</h3>
                    {kitchenCleaningBenefits.map(task => (
                        <div key={task.id}>
                          <ul className={'dot-list'}>
                            <li>{task.reason}</li>
                          </ul>
                        </div>
                    ))}
                  </div>
                  <img src={Kitchen2} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <img src={NeatKitchen} alt={"cleaners"} className={'cart-image2'}/>
                  <div className="service-card">
                    <h3 style={{color:'darkolivegreen'}}>Kitchen Deep Cleaning Extra Services</h3>
                    <p>You can make special requests for extra kitchen deep cleaning services like the ones listed below:</p>
                    <div style={{display:'block'}}>
                      {kitchenCleaningServices.map(itemTask => (
                          <div key={itemTask.id}>
                            <ul className={'dot-list'}>
                              <li>{itemTask.plan}</li>
                            </ul>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px', maxWidth:'800px'}}>
                <div className={'price-container'}>
                  <h3 style={{color:'navy'}}>Let the results amaze you!</h3>
                  <p>
                    You will be delighted with the outcomes of our excellent kitchen cleaning plan, which will also add brightness to your entire home.
                    We highly recommend our professional kitchen deep cleaning services to people who are busy and/or have children or pets.
                  </p>
                </div>
              </section>


              <section className={'main-banner'} style={{marginTop:'50px', display:'block'}}>
                <div className={'container'}>
                  <h3 style={{textAlign:'start', color:'navy', marginBottom:'30px'}}>Frequently asked questions</h3>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight1K} style={styleRight1} />
                    <FaArrowLeft onClick={handleLeft1K} style={styleLeft1} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>What do professional kitchen cleaners use to clean?</p>
                      <p style={{marginLeft:'10px'}}>{question1}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight2K} style={styleRight2} />
                    <FaArrowLeft onClick={handleLeft2K} style={styleLeft2} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        How often should you clean your kitchen?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question2}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight3K} style={styleRight3} />
                    <FaArrowLeft onClick={handleLeft3K} style={styleLeft3} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        How long does it take to deep clean a kitchen?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question3}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight4K} style={styleRight4} />
                    <FaArrowLeft onClick={handleLeft4K} style={styleLeft4} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Can you clean all types of domestic kitchen appliances?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question4}</p>
                    </div>
                  </div>
                </div>

              </section>

            </div>
        );
        break;

      case 'Bathroom':
        setLayout(
            <div>
              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                  <div className={'idea-container'}>
                    <div className={'price-container'}>
                      <p style={{color:'red', textAlign:'end'}}>Cashback up to £150</p>
                      <h3 style={{textAlign:'center'}}>Prices for bathroom cleaning in Edinburgh</h3>
                      <p style={{color:'blue'}}>from £18/h</p>

                      <ul className={'dot-list'} >
                        <li>Time: 8 am - 9 pm </li>
                      </ul>

                      <div style={{display:'flex'}}>
                        <p>Next day</p>
                        <p style={{textAlign:'end'}}>Any day from tomorrow </p>
                        <p style={{color:'navy', textAlign:'end'}}>£18/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Same day</p>
                        <p style={{textAlign:'end', maxLines:'1'}}>Today, in 4h minimum</p>
                        <p style={{color:'navy', textAlign:'end'}}>£25/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Peak</p>
                        <p style={{textAlign:'end'}}>High demand</p>
                        <p style={{color:'navy', textAlign:'end'}}>£19/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>Night</p>
                        <p style={{textAlign:'end'}}>Any day</p>
                        <p style={{color:'navy', textAlign:'end'}}>£29/h</p>
                      </div>

                      <div style={{display:'flex'}}>
                        <p>End of tenancy</p>
                        <p style={{textAlign:'end'}}>Applicable Tariff + End of Tenancy Charge</p>
                        <p style={{color:'navy', textAlign:'end'}}>£29/h</p>
                      </div>

                    </div>

                    <div style={{display:'block'}}>
                      <div className="service-card">
                        <h3 style={{color:'navy'}}>What is included in bathroom cleaning in Edinburgh?</h3>
                        {bathroomCleaningServices.map(task => (
                            <div key={task.id}>
                              <ul className={'dot-list'}>
                                <li>{task.item}</li>
                              </ul>
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className={"container"} style={{maxWidth:'800px'}}>
                  <div className={'price-container'}>
                    <h2 style={{color:'navy'}}>Professional Bathroom Cleaning Services in Edinburgh</h2>
                    <p>
                      Our standard cleaning plan includes everything you need to get your home in order as quickly as possible.
                      You can book additional services when you make your booking.
                    </p>
                  </div>
                </div>



              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div style={{display:'block'}}>
                  <h2 style={{color:'navy', marginBottom:'30px'}}>What Does the Process of Bathroom Cleaning Look Like?</h2>
                  <div className={"grid-container"}>
                    {bathroomDeepCleaningProcess.map(task => (
                        <div key={task.id} className={'price-container'}>
                          <h2>{task.task}</h2>
                          <p>{task.detail}</p>
                        </div>
                    ))}
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <h3 style={{color:'navy', marginBottom:'20px'}}>Professional Bathroom Cleaning Services In Edinburgh</h3>
                    <p>
                      Fly bathroom cleaners have years of experience offering professional thorough bathroom cleaning plan to homes throughout London.
                      They have seen a lot of bathroom cases and know how to fix them all, whether there are calcium deposits on the taps, or accumulation of waste in the toilet.<br/>
                      When you make a reservation for deep bathroom cleaning plan with us, you can be confident that the cleaners visiting your home are completely vetted for security
                      and routinely receive safety and risk training.<br/>
                      Additionally, the team is renowned for being kind, considerate, discreet, and on time, which are qualities that are crucial when working in private residences.
                    </p>
                  </div>
                  <img src={Bathroom2} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <img src={Bathroom3} alt={"cleaners"} className={'cart-image2'}/>
                  <div className="service-card">
                    <h3 style={{color:'navy', marginBottom:'20px'}}>Why Is a Clean Bathroom Important?</h3>
                    <p>
                      Despite being the place we go to be clean, bathrooms may easily fill up with filth, grime, and bacteria due to how frequently we use them. In reality, having a dirty bathroom can significantly affect your welfare and health in addition to being an eyesore.<br/>
                      A spotless bathroom improves relaxation and comfort. A spotless setting stimulates relaxation while utilising the facilities and fosters a sense of well-being. The opposite outcome, stress and discomfort, can be caused by mess and clutter.<br/>

                      Those who have respiratory issues, for example, may experience health concerns due to a build-up of dust and mould. Meanwhile, germs, viruses, and microbes can linger and proliferate on the surfaces of our bathrooms, infecting us.<br/>

                      As a result, maintaining your bathroom's hygiene is essential and involves a lot of care, including routinely deep cleaning as well as practising more frequent and regular cleaning techniques.
                    </p>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <h3>Bathroom Cleaning Checklist</h3>
                    <p>
                      For bathrooms of all sizes and shapes, Fly cleaner professional bathroom cleaners take great delight in providing a thorough bathroom deep cleaning plan.
                      When it comes to thoroughly keeping your bathroom clean, we don't cut corners. The typical checklist of our
                      bathroom cleaning plan includes the following fundamental duties:
                    </p>
                    {bathroomCleaningTasks.map(task => (
                        <div key={task.id}>
                          <ul className={'dot-list'}>
                            <li>{task.item}</li>
                          </ul>
                        </div>
                    ))}
                  </div>
                  <img src={NeatBathroom} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <img src={Bathroom4} alt={"cleaners"} className={'cart-image2'}/>
                  <div className="service-card">
                   <div style={{display:'block'}}>
                     <h4 style={{color:'navy', marginBottom:'15px'}}>More checklist</h4>
                     {detailedBathroomCleaning.map(itemTask => (
                         <div key={itemTask.id}>
                           <ul className={'dot-list'}>
                             <li>{itemTask.task}</li>
                           </ul>
                         </div>
                     ))}
                   </div>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className={'idea-container'}>
                  <div className="service-card">
                    <div style={{display:'block'}}>
                      <h3 style={{color:'navy', marginBottom:'15px'}}>Why Choose Fly cleaner for Bathroom Cleaning?</h3>
                      {bathroomCleaningBenefits.map(itemTask => (
                          <div key={itemTask.id}>
                            <ul className={'dot-list'}>
                              <li>{itemTask.reason}</li>
                            </ul>
                          </div>
                      ))}
                    </div>
                  </div>
                  <img src={Meeting} alt={"cleaners"} className={'cart-image2'}/>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className={'price-container'}>
                  <h3 style={{color:'navy'}}>Let the results amaze you!</h3>
                  <p>
                    Find the secret to a sparkling, pristine bathroom. We promise to have your bathroom spotless in no time with our expert bathroom cleaning services. Say goodbye to dirt and hello to immaculate hygiene. Order right away to enjoy the magic of our skilled cleaners. Your bathroom deserves it.
                  </p>
                </div>
              </section>

              <section style={{marginTop:'50px', display:'block'}}>
                <div className={'container'}>
                  <h3 style={{textAlign:'start', color:'navy', marginBottom:'30px'}}>Frequently asked questions</h3>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight1B} style={styleRight1} />
                    <FaArrowLeft onClick={handleLeft1B} style={styleLeft1} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>Which liquid is used for bathroom cleaning?</p>
                      <p style={{marginLeft:'10px'}}>{question1}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight2B} style={styleRight2} />
                    <FaArrowLeft onClick={handleLeft2B} style={styleLeft2} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        How do you deep clean a dirty bathroom?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question2}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight3B} style={styleRight3} />
                    <FaArrowLeft onClick={handleLeft3B} style={styleLeft3} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        What is the fastest way to clean a bathroom?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question3}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight4B} style={styleRight4} />
                    <FaArrowLeft onClick={handleLeft4B} style={styleLeft4} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        How often should you clean your bathroom?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question4}</p>
                    </div>
                  </div>
                </div>

              </section>

            </div>
        );

    }

    if (state !== null && state !== undefined) {
      if (serviceName !== state.id) {
        setServiceName(state.id)
      }
    }

  }, [serviceName, tasklist, inspectionList, styleLeft1,styleLeft2,
    styleLeft3, styleLeft4, styleLeft5, styleLeft6, styleLeft7, styleRight1, styleRight2,
    styleRight3, styleRight4, styleRight5, styleRight6, styleRight7, officeList, highlist, moveInList, checklist, householdList, state?.id ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setClearText({display: ''})
    if (!postcode.trim()) {
      setError('Please enter a postcode');
      return;
    }
    if (!isValidUKPostcodeFormat(postcode)) {
      setError(`${postcode} is not a valid postcode`);
      return;
    }
    checkPostcodeExists(postcode).then(exists => {
      if (!exists) {
        setError(`${postcode} does not exist`);
        return;
      }
    })

    navigate('/checkout', { state: { postcode: postcode } });
  };

  // words-container

  return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh' // Ensures it takes at least full viewport height
      }}>
        {error && <label style={clearText} className={['slide-in', 'error-label'].join(' ')} >{error}</label>}
        <div className={'service-banner'}>
          <section>
            <div className="container" style={{marginBottom:'30px'}}>
              <h2 style={{color:'navy', textAlign:'center'}}>Choose a Cleaning plan type</h2>
              <div className="word-scroller-container" style={{marginTop:'20px'}}>
                <FaArrowLeft onClick={scrollLeft} />
                <div className="words-container" ref={scrollContainerRef}>
                  {services.map( serviceItem => (
                      <div key={serviceItem.id} >
                        <h3 style={serviceName === serviceItem.title ? active: notActive}
                                onClick={() => {setServiceName(serviceItem.title); setServiceDesc(serviceItem.description)}}
                            className="word-item">
                          {serviceItem.title}
                        </h3>
                      </div>
                  ))}
                </div>
                <FaArrowRight onClick={scrollRight} />
              </div>
              <h3 style={{color:'brown', marginTop:'10px'}}>{serviceDesc}</h3>
              <section className="search-section">
                <div className="search-container">
                  <input
                      type="text"
                      placeholder="Enter full post code"
                      value={postcode}
                      name={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                  />
                  <button className="search-button" onClick={handleSubmit}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                    Ok
                  </button>
                </div>
              </section>
            </div>
          </section>

          <section style={{marginTop:'50px'}}>
            <div className="container">
              {layout}
            </div>
          </section>

          <section  style={{marginTop:'50px'}}>
            <div className={'container'}>
              <div style={{display:'block'}} className={'main-banner'}>
                <h2 style={{textAlign:'center', color:'navy', marginBottom:'30px' }}>Why choose Fly cleaning plan?</h2>
                <div className={'grid-container'}>
                  <div className={'price-container'}>
                    <img src={Available}/>
                    <h4>24/7 Availability</h4>
                    <p>Pick a date and time that suits you.
                      You can even book for same day cleaning, 4 hours in advance</p>
                  </div>
                  <div className={'price-container'}>
                    <img src={Best}/>
                    <h4>Bespoke Service</h4>
                    <p>You can choose which rooms you wish us to clean and book only the services you need</p>
                  </div>
                  <div className={'price-container'}>
                    <img src={Payment}/>
                    <h4>Pay as You Go</h4>
                    <p>We charge clients only for the actual time a cleaner spends at your property</p>
                  </div>
                  <div className={'price-container'}>
                    <img src={Time}/>
                    <h4>Last minute cleaning</h4>
                    <p>Need urgent cleaning? You can make a booking 4 hours in advance</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section  style={{marginTop:'50px'}}>
            <div className="container">
              <div style={{display:'block'}}>
                <h3 style={{textAlign:'center', color:'navy', marginBottom:'30px'}}>Results</h3>
                <div className="services-grid">
                  {resultList.map(result => (
                      <div key={result.id}>
                        <img src={result.src} alt="" className={'cart-image'}/>
                      </div>
                  ))}
                </div>
                <button onClick={handleResultChange} style={{width:'150px', background:'white', color:'blue', marginTop:'10px'}}>
                  {resultList.length === miniResults.length ? 'See more' : 'See less'}
                </button>
              </div>
            </div>
          </section>

          <section  style={{marginTop:'50px', marginBottom:'30px'}}>
            <div className="container">
              <div>
                <h2 style={{textAlign:'center', marginBottom:'10px', marginTop:'10px'}}>How Fly cleaning services work</h2>
                <div>
                  <div className="burden-container">
                    {stages.map(stage => (
                        <div key={stage.id} className="service-card">
                          <img src={stage.src} alt="" className={'cart-image'}/>
                          <h3>{stage.stage}</h3>
                          <p style={{fontWeight:'bold', textAlign:'start', color:'blue'}}>{stage.category}</p>
                          <ul style={{textAlign:'start'}} className="dot-list">
                            {stage.steps.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={['services-section', 'main-banner'].join('')} style={{marginBottom:'30px'}}>
            <div className="container">
              <div className="burden-container">
                <img src={Sweeping} className={'cart-image4'} alt="" />
                <div className="search-container">
                  <h1 className={'burden'}>Shift your cleaning burden to us</h1>
                  <input
                      type="text" placeholder="Enter your full post code here"
                      style={{textAlign:'center'}}
                      onChange={(e) => setPostcode(e.target.value)}/>
                  <button onClick={handleSubmit} className={'next-button'} style={{textAlign:'center', margin:'10px'}}>Get a quote</button>
                </div>
                <img src={Arranged} className={'cart-image4'} alt="" />
              </div>
            </div>

          </section>

        </div>
        < Footer />
      </div>
  );
}
export default Services;