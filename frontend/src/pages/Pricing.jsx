import React, {useState, useRef, useEffect} from "react";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Footer from "./Footer.jsx";
import Booking from "../images/booking.png";
import Currency from "../images/currency.png";
import Manage from "../images/manage.png";
import Sweeping from "../images/sweeping.png";
import Arranged from "../images/arranged.png";
import Stairs from "../images/stairs.png";
import Cleaners from "../images/cleaners.png";
import Domestic from "../images/domestic.png";
import Regular from "../images/regular.png";
import Equipment from "../images/equipments.png";
import Result1 from "../images/result1.png";
import Result2 from "../images/result2.png";
import Result3 from "../images/result3.png";
import Result4 from "../images/result4.png";
import Result5 from "../images/result5.png";
import Result6 from "../images/result6.png";
import Result7 from "../images/result7.png";
import Result8 from "../images/result8.png";
import Kept from "../images/kept.png";
import NeatBathroom from "../images/neatBathroom.png";
import Combine from "../images/combine.png";
import Neat from "../images/neat.png";
import Fresh from "../images/fresh.png";
import Greasy from "../images/greasy.png";
import Meeting from "../images/meeting.png";
import Commercial from "../images/commercial.png";
import Sofa from "../images/sofa2.png";
import Sofa2 from "../images/sofa.png";
import { isValidUKPostcodeFormat, checkPostcodeExists } from './Postcode.jsx'
import { useNavigate } from 'react-router-dom'

const Pricing = () => {
  const navigate = useNavigate();

  const pricings = [{id:'regular', name:'Regular cleaning', price:'from £19/h', desc: 'Regular visits by a professional cleaner in West London who will vacuum, dust, and clean surfaces in all living areas, bathrooms, and kitchen. Additional services such as laundry, changing bed linen, and washing dishes can be added upon request.'},
    {id:'one-off', name: 'One-off domestic cleaning', price: 'from £19/h', desc:'A comprehensive deep cleaning of the entire property, including thorough cleaning of bathrooms, kitchens, living areas, and bedrooms, as well as dusting and vacuuming throughout.'}]
  const miniResults = [
    {id:1, src: Result1},
    {id:2, src: Result2},
    {id:3, src: Result3}
  ]
  const miniTasks = [
    {
      id: 1,
      room: "Bedroom",
      tasks: [
        { id: 101, task: "Wiping all exteriors, cleaning mirrors, and getting rid of fingerprints" },
        { id: 102, task: "Organising the bedding" },
        { id: 103, task: "Dusting light fixtures, doorknobs, and skirting boards" },
        { id: 104, task: "Dusting and mopping the floor" },
        { id: 105, task: "Tidying and folding clothes" },
        { id: 106, task: "Dusting, cleaning and polishing appliances, furniture, and windows" },
        { id: 107, task: "Laundry services" }
      ]
    },
  ]
  const hide = {
    display: "none",
  }
  const show = {
    display: "",
  }
  const minFactors = [
    {
      id: 1,
      name: "Size of the office",
      detail: "The size of the office has the most noticeable effect on cleaning expenses. Larger spaces necessitate more time, manpower, and cleaning materials, which inevitably drives up the overall cost. Larger offices incur higher costs because cleaning fees are often calculated based on square footage."
    },
    {
      id: 2,
      name: "Frequency of cleaning",
      detail: "How frequently cleaning services are employed has the biggest impact on costs. Cleaning an office on a daily basis will be more expensive than doing so once or twice a week. The cleaning schedule can be modified in accordance with the requirements and cost constraints of the office."
    },
    {
      id: 3,
      name: "Type of office",
      detail: "Cleaning requirements differ depending on the type of workplace. As an illustration, a creative agency with an open floor design could require more frequent cleaning than a law firm with private offices."
    },
  ]
  const miniTenancy = [
    {
      id: 1,
      narration: "There are a number of variables that can affect the cost of end of tenancy cleaning."
    },
    {
      id: 2,
      narration: "First and foremost, the size of the property is important. Larger properties cost more, since cleaning them takes more time, labor, and resources."
    },
    {
      id: 3,
      narration: "Second, the property's condition is quite important. In comparison to a property that needs a thorough deep cleaning to get it back to its original cleanliness, cleaning a well-maintained property may be easier and less expensive."
    },
  ]
  const miniCarpetList = [
    {
      id: 1,
      name: "The size of the carpet",
      detail: "The cost is directly impacted by the amount of time and materials needed to clean a bigger carpet area. Compared to cleaning an entire home or a business, washing a tiny rug or a single room's carpet will be less expensive."
    },
    {
      id: 2,
      name: "Carpet material and condition",
      detail: "Various cleaning methods and solutions are required for various carpet materials. Delicate or severely stained carpets would require specialised cleaning methods, which could raise the final cost. Older or seriously damaged carpets may require further care and cost more money."
    }
  ]
  const serviceList = [
    {id: 1, name:'House'},
    {id: 2, name:'Deep'},
    {id: 4, name:'Office'},
    {id: 5, name:'End of tenancy'},
    {id: 6, name:'Carpet'},
    {id: 7, name:'Upholstery'},
  ]
  const active = {color:'red', textDecoration: 'underline', padding: '8px'};
  const notActive = {color:'navy', padding:'8px'}
  const miniBenefits = [
    {
      id: 1,
      name: "Clear prices",
      reason: "Prices that are transparent and free of ambiguity enable customers to make well-informed choices. Ensuring there are no surprises or hidden fees improves client happiness and trust. Any other local cleaning company may hide their carpet cleaning prices, but with eMop, you know the price of the professional carpet cleaning services at the moment of booking."
    },
  ]
  const sofaText = ['We frequently ignore our upholstery until we spill something or see a significant stain. Your upholstery should be cleaned for more than just spills and stains. Over time, the dust and filth on your sofa and chairs may accumulate.\n' +
  '\n' +
  '\n' +
  'Many individuals consider their sofa to be an essential component of their house. In addition to using it as seats, individuals might also use it as a location to store things or to unwind. If your sofa needs cleaning, you might be wondering how to approach the task...\n' +
  '\n']
  const miniUpholsteryList = [
    {
      id: 1,
      reason: "Regardless of whether you require a one-time clean or regular cleaning services, eMop professional cleaners will go above and beyond your expectations."
    },
    {
      id: 2,
      reason: "We've cleaned a lot of sofas over the years, and we don't consider any job to be too big or small. In all of our activities, at eMop, we place a high priority on quality, using only the best cleaning products and disinfection techniques."
    }
  ]

  const scrollContainerRef = useRef(null);
  const [price, setPrice] = useState('');
  const [service, setService] = useState(serviceList[0]);
  const [postcode, setPostcode] = useState('');
  const [error, setError] = useState('');
  const [clearText, setClearText] = useState({display: ''});
  const [layout, setLayout] = useState( <div><section>
      <div className={'container'} style={{maxWidth:'800px'}}>
        <div style={{display:'block', marginTop:'50px'}}>
          <h2 style={{color:'navy', marginBottom:'30px'}}>Fly cleaning service prices</h2>
          <div className="price-container">
            <p style={{textAlign:'end', color:'red'}}>Cashback up to £150</p>
            <h3 style={{textAlign:'center'}}>Choose a cleaning type</h3>
            <p style={{color:'navy'}}>from £16</p>
            <p>
              Welcome to Fly Cleaning service, where we transform your space into a spotless sanctuary! Whether it's your home or office,
              our professional team delivers top-notch cleaning services tailored to your needs. With eco-friendly products, attention to detail,
              and affordable pricing, we take the hassle out of cleaning, so you don’t have to. Enjoy a fresher, healthier environment without lifting a finger.
              Book your cleaning today and let us handle the mess!
            </p>
            <section className="search-section">
              <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter your full post code"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                />
                <button className="search-button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                  Ok
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section></div>);
  const [resultList, setResultList] = useState(miniResults);
  const [isAllResults, setIsAllResults] = useState(false);
  const [tasks, setTasks] = useState(miniTasks);
  const [isAllTask, setIsAllTask] = useState(false);
  const [factors, setFactors] = useState(minFactors);
  const [tenancyList, setTenancyList] = useState(miniTenancy);
  const [carpetList, setCarpetList] = useState(miniCarpetList);
  const [benefits, setBenefits] = useState(miniBenefits);
  const [sofaDetail, setSofaDetail] = useState(sofaText);
  const [upholsteryList, setUpholsteryList] = useState(miniUpholsteryList);

  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [question4, setQuestion4] = useState('');
  const [question5, setQuestion5] = useState('');

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
    setQuestion3('In contrast to routine cleaning service, one-off deep cleaning entails completely sanitising every room of the house, including the living room, bedroom, kitchen, and bathroom. This kind of service is offered by our cleaners, who are skilled in safely and successfully eliminating filth, dust, and grime.')

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

  const cleaningTasks = [
    {
      id: 1,
      room: "Bedroom",
      tasks: [
        { id: 101, task: "Wiping all exteriors, cleaning mirrors, and getting rid of fingerprints" },
        { id: 102, task: "Organising the bedding" },
        { id: 103, task: "Dusting light fixtures, doorknobs, and skirting boards" },
        { id: 104, task: "Dusting and mopping the floor" },
        { id: 105, task: "Tidying and folding clothes" },
        { id: 106, task: "Dusting, cleaning and polishing appliances, furniture, and windows" },
        { id: 107, task: "Laundry services" }
      ]
    },
    {
      id: 2,
      room: "Bathrooms",
      tasks: [
        { id: 201, task: "Cleaning the bathtub, shower, toilet bowl, and floor" },
        { id: 202, task: "Dusting and cleaning every exterior that is accessible" },
        { id: 203, task: "Cleaning and polishing fittings, flooring, and glass" },
        { id: 204, task: "Taking out the garbage" },
        { id: 205, task: "Cleaning wall tiles" }
      ]
    },
    {
      id: 3,
      room: "Living areas",
      tasks: [
        { id: 301, task: "Dusting, cleaning, and polishing skirting boards, light switches, doors, and other exteriors" },
        { id: 302, task: "Dusting, sanitising, and shining windows, furniture, and appliances" },
        { id: 303, task: "Mopping or vacuuming the floor, especially under the furniture" },
        { id: 304, task: "Emptying and replacing any trash bins" },
        { id: 305, task: "Getting rid of fingerprints and cobwebs" },
        { id: 306, task: "Tidying curtain rails, cornices, and picture rails" }
      ]
    },
    {
      id: 4,
      room: "Kitchen",
      tasks: [
        { id: 401, task: "Cleaning the kitchen sink and faucets, as well as the stove" },
        { id: 402, task: "Cleaning and scrubbing the floor" },
        { id: 403, task: "Cleaning and polishing every work surface" },
        { id: 404, task: "Properly cleaning the oven and the refrigerator" },
        { id: 405, task: "Taking out the trash and replacing the bags" },
        { id: 406, task: "Cleaning windows and window sills" }
      ]
    },
    {
      id: 5,
      room: "Stairs",
      tasks: [
        { id: 501, task: "Cleaning the skirting boards" },
        { id: 502, task: "Cleaning the railings, bannister, and staircase" },
        { id: 503, task: "Cleaning light fittings, plugs, and switches" },
        { id: 504, task: "Dusting and polishing every surface" }
      ]
    }
  ];

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
    {id:'submit', src: Booking, stage:'Stage 1', name:'Submit your booking online', steps:['Enter postcode','Choose a type of cleaning','Select a cleaning schedule', 'Choose rooms to get an estimated price', 'Select additional cleaning services if you need them', 'Indicate the level of dirt in your property']},
    {id:'pay', src: Currency, stage:'Stage 2', name: 'Pay as you go', steps: [' The estimated amount of your booking will be held in your bank account', ' You will only be charged after the cleaning session is completed and according to the actual time a cleaner worked']},
    {id:'manage',src: Manage,  stage: 'Stage 3', name: 'Manage your booking online', steps: [' When you submit your cleaning request, your booking becomes available to all cleaners in the system',
        ' When you make an appointment with a cleaner, we email you or send a text message through the app', 'You can use  our website  to keep track of your booking']}
  ]

  const cleaningInspectionSteps = [
    {
      id: 1,
      title: "Preparation",
      description: "Fly cleaners are fully insured personnel prepare the space and make sure all surfaces are reachable before beginning the deep cleaning procedure. They may gently reorganise the furniture in the agreed-upon order to ensure no places are missed during cleaning. This preparation guarantees that every nook and cranny, high point and low point is prepared for a comprehensive cleaning, laying the groundwork for a deep cleaning session of the highest quality."
    },
    {
      id: 2,
      title: "Deep Cleaning Process",
      description: "Dusting, wiping, and sanitising surfaces, furniture, and fixtures are all part of the thorough cleaning that takes place in each room. Fly cleaners' fully trained and trusted one-off cleaners will remove dirt and polish faucets, tiles, and appliances in kitchens and bathrooms, leaving these surfaces hygienically clean."
    },
    {
      id: 3,
      title: "Final Review",
      description: "Our cleaners do a last inspection to make sure everything is immaculate after every cleaning service in Edinburgh. To make the area appear tidy and welcoming, they can put anything that has been moved back in its original location. This concludes the amazing job they will do in giving you a clean home."
    }
  ];

  const handleResultChange = () => {
    if (resultList.length === miniResults.length) {
      setResultList(results);
    }
    else {
      setResultList(miniResults);
    }
    setIsAllResults(!isAllResults);

  }

  const handleTasks = () => {
    if (tasks.length === miniTasks.length) {
      setTasks(cleaningTasks)
    }
    else {
      setTasks(miniTasks)
    }
    setIsAllTask(!isAllTask);
  }

  const pricingOptions = [
    {
      id: 1,
      name: "Next day: £18/h"
    },
    {
      id: 2,
      name: "Same day: £25/h"
    },
    {
      id: 3,
      name: "Peak: £19/h"
    },
    {
      id: 4,
      name: "Night: £29/h"
    },
    {
      id: 5,
      name: "End of tenancy: £29"
    }
  ];

  const cleaningFactors = [
    {
      id: 1,
      name: "Size of the office",
      detail: "The size of the office has the most noticeable effect on cleaning expenses. Larger spaces necessitate more time, manpower, and cleaning materials, which inevitably drives up the overall cost. Larger offices incur higher costs because cleaning fees are often calculated based on square footage."
    },
    {
      id: 2,
      name: "Frequency of cleaning",
      detail: "How frequently cleaning services are employed has the biggest impact on costs. Cleaning an office on a daily basis will be more expensive than doing so once or twice a week. The cleaning schedule can be modified in accordance with the requirements and cost constraints of the office."
    },
    {
      id: 3,
      name: "Type of office",
      detail: "Cleaning requirements differ depending on the type of workplace. As an illustration, a creative agency with an open floor design could require more frequent cleaning than a law firm with private offices."
    },
    {
      id: 4,
      name: "Specialized equipment and correct cleaning products",
      detail: "It may be necessary to use specialised cleaning tools and solutions on specific office supplies and surfaces, which will raise the overall cost. For instance, expensive furniture or fragile gadgets may require extra cleaning care."
    },
    {
      id: 5,
      name: "Location of the office",
      detail: "Location has a significant impact on office cleaning costs per hour, just like it does for other services. Office cleaning costs in Edinburgh and other major UK cities can range from £17 to £20, including a one-time cleaning fee. A difference in labour costs, transportation costs, and cost of living depending on where the office space is located can affect cleaning prices."
    },
    {
      id: 6,
      name: "Quality of service",
      detail: "Although reputable cleaning companies may charge more, their services are of higher quality and are more dependable. A reputable cleaning business can help you achieve greater outcomes and a cleaner workplace."
    }
  ];

  const handleFactors = () => {
    if (factors.length === minFactors.length) {
      setFactors(cleaningFactors)
    }
    else {
      setFactors(minFactors)
    }
  }

  const serviceFeatures = [
    {
      id: 1,
      name: "Clear prices",
      detail: "Prices that are transparent and free of ambiguity enable customers to make well-informed choices. Ensuring there are no surprises or hidden fees improves client happiness and trust. Any other local cleaning company may hide their office cleaning costs, but with eMop, you know the price of the professional cleaning services at the moment of booking."
    },
    {
      id: 2,
      name: "Pay-as-you-go approach",
      detail: "The estimated amount of your reservation will be deducted from your bank account. After the cleaning session is finished, you will only be billed for the time the office cleaner(s) actually worked. Only the time that was actually spent cleaning your workplace is charged."
    },
    {
      id: 3,
      name: "Insured and accredited cleaners",
      detail: "A thorough background check is carried out on our commercial cleaners to examine their past records. This is to ensure the safety of our customers. In addition to that, our professional clean team are duly insured and licensed to carry out cleaning activities in the UK. They are trained and have become professional cleaners over time and can fit into any professional cleaning company. You can be sure to get professional office cleaning services when you choose eMop. If you also need domestic cleaning services, eMop cleaners can help."
    }
  ];

  const handleRight11 = () => {
    setStyleRight1(arrowRightStyleOff)
    setStyleLeft1(arrowLeftStyleOn)
    setQuestion1('To keep it clean and organised, a workplace usually gets cleaned daily or on a regular schedule. Depending on the needs and size of the office, the frequency may change.')

  }

  const handleLeft11 = () => {
    setStyleRight1(arrowRightStyleOn)
    setStyleLeft1(arrowLeftStyleOff)
    setQuestion1('')

  }

  const handleRight22 = () => {
    setStyleRight2(arrowRightStyleOff)
    setStyleLeft2(arrowLeftStyleOn)
    setQuestion2('The size, amount of debris, and cleaning chores involved will all affect how long it takes to clean an office. Typically, it could take up to three hours or longer.')

  }

  const handleLeft22 = () => {
    setStyleRight2(arrowRightStyleOn)
    setStyleLeft2(arrowLeftStyleOff)
    setQuestion2('')

  }

  const handleRight33 = () => {
    setStyleRight3(arrowRightStyleOff)
    setStyleLeft3(arrowLeftStyleOn)
    setQuestion3('In order to minimise disturbance to everyday office operations, cleaners typically work outside of regular business hours, such as early in the morning or late in the afternoon. However, you and the person or cleaning service should come to an agreement over the hours. You will be required to pay more if you need a cleaner during office hours.')

  }

  const handleLeft33 = () => {
    setStyleRight3(arrowRightStyleOn)
    setStyleLeft3(arrowLeftStyleOff)
    setQuestion3('')

  }

  const handleRight44 = () => {
    setStyleRight4(arrowRightStyleOff)
    setStyleLeft4(arrowLeftStyleOn)
    setQuestion4('Keys to the office should only be given to cleaners under strict supervision. Make sure the commercial cleaning service is reliable, performs background checks, and has the necessary security measures in place to protect your office building.')

  }

  const handleLeft44 = () => {
    setStyleRight4(arrowRightStyleOn)
    setStyleLeft4(arrowLeftStyleOff)
    setQuestion4('')

  }

  const tenancyCleaningFactors = [
    {
      id: 1,
      narration: "There are a number of variables that can affect the cost of end of tenancy cleaning."
    },
    {
      id: 2,
      narration: "First and foremost, the size of the property is important. Larger properties cost more, since cleaning them takes more time, labor, and resources."
    },
    {
      id: 3,
      narration: "Second, the property's condition is quite important. In comparison to a property that needs a thorough deep cleaning to get it back to its original cleanliness, cleaning a well-maintained property may be easier and less expensive."
    },
    {
      id: 4,
      narration: "The number of rooms and other areas that need to be cleaned, such as the number of bathrooms, kitchens, and living spaces, is another consideration."
    },
    {
      id: 5,
      narration: "The price might also be affected by the existence of particular objects that need special maintenance, like professional carpet or upholstery cleaning."
    },
    {
      id: 6,
      narration: "A price rise may also result from the addition of extra services like oven cleaning, fridge, ironing, microwave, bed making, outdoor cleaning, laundry, kitchen, bookcase and window cleaning."
    },
    {
      id: 7,
      narration: "eMop may charge more if you need urgent or same-day cleaning services because we may need to add more workers or adjust their timetable."
    },
    {
      id: 8,
      narration: "Last but not least, end of tenancy cleaning prices may differ depending on where the property is located."
    },
    {
      id: 9,
      narration: "A professional cleaning service agency should be consulted to provide exact tenancy cleaning quotes based on these variables."
    }
  ];

  const handleTenancy = () => {
    if (tenancyList.length === miniTenancy.length) {
      setTenancyList(tenancyCleaningFactors);
    }
    else {
      setTenancyList(miniTenancy);
    }
  }

  const tenancyServiceFeatures = [
    {
      id: 1,
      name: "Clear prices",
      story: "Prices that are transparent and free of ambiguity enable customers to make well-informed choices. Ensuring there are no surprises or hidden fees improves client happiness and trust. Most cleaning companies may hide their service costs, but for eMop, you know the price of the professional cleaning services at the moment of booking."
    },
    {
      id: 2,
      name: "Pay-as-you-go approach",
      story: "Your bank account will be put on hold to cover the projected cost of your reservation. You will only be charged for the time a tenancy cleaner actually worked after the cleaning session is over. You only pay for the actual time they spent cleaning your home."
    },
    {
      id: 3,
      name: "Insured and accredited cleaners",
      story: "A thorough background check is carried out on our end of tenancy cleaners to examine their past records. This is to ensure the safety of our customers. In addition to that, our professional clean team are duly insured and licensed to carry out cleaning activities in the UK. They are trained and have become professional cleaners over time and can fit into any professional cleaning company. You can be sure to get professional end of tenancy cleaning services when you choose eMop. If you need office cleaning also, eMop cleaners can help also."
    }
  ];

  const handleRight111 = () => {
    setStyleRight1(arrowRightStyleOff)
    setStyleLeft1(arrowLeftStyleOn)
    setQuestion1('Payment according to end of tenancy cleaning prices is made on our website via a secure 3rd-party provider. Funds will only be taken from your card once the job has been completed. However, please note that as soon as the booking is confirmed, the estimated amount of the job is pre-authorised on your card to be sure the payment will go through after the cleaning job is completed.')

  }

  const handleLeft111 = () => {
    setStyleRight1(arrowRightStyleOn)
    setStyleLeft1(arrowLeftStyleOff)
    setQuestion1('')

  }

  const handleRight222 = () => {
    setStyleRight2(arrowRightStyleOff)
    setStyleLeft2(arrowLeftStyleOn)
    setQuestion2('This is possible when you provide us with the necessary information about your property. Information like the size of your property, the general state of the apartment or property, additional services you require, and the number of cleaners you need, etc. will help us give you an accurate estimate for your cleaning need.')

  }

  const handleLeft222 = () => {
    setStyleRight2(arrowRightStyleOn)
    setStyleLeft2(arrowLeftStyleOff)
    setQuestion2('')

  }

  const handleRight333 = () => {
    setStyleRight3(arrowRightStyleOff)
    setStyleLeft3(arrowLeftStyleOn)
    setQuestion3('If you place an order that includes equipment, there will be an extra fee. When placing an order, please ask the cleaner to include all the cleaning materials if you don\'t have your own equipment. Extra costs may be added for additional services like window, oven, fridge, bookcase, carpet cleaning, etc.')

  }

  const handleLeft333 = () => {
    setStyleRight3(arrowRightStyleOn)
    setStyleLeft3(arrowLeftStyleOff)
    setQuestion3('')

  }

  const handleRight444 = () => {
    setStyleRight4(arrowRightStyleOff)
    setStyleLeft4(arrowLeftStyleOn)
    setQuestion4('Prices may include VAT unless it is clearly stated otherwise in the estimated cost.')

  }

  const handleLeft444 = () => {
    setStyleRight4(arrowRightStyleOn)
    setStyleLeft4(arrowLeftStyleOff)
    setQuestion4('')

  }

  const carpetCleaningFactors = [
    {
      id: 1,
      name: "The size of the carpet",
      detail: "The cost is directly impacted by the amount of time and materials needed to clean a bigger carpet area. Compared to cleaning an entire home or a business, washing a tiny rug or a single room's carpet will be less expensive."
    },
    {
      id: 2,
      name: "Carpet material and condition",
      detail: "Various cleaning methods and solutions are required for various carpet materials. Delicate or severely stained carpets would require specialised cleaning methods, which could raise the final cost. Older or seriously damaged carpets may require further care and cost more money."
    },
    {
      id: 3,
      name: "The cleaning method required",
      detail: "Numerous carpet cleaning methods exist, including steam cleaning, dry cleaning, bonnet cleaning, hot water extraction method, and others. Each approach has a different price tag, with steam cleaning often costing more because it is so thorough and efficient."
    },
    {
      id: 4,
      name: "The kinds of stains and odors",
      detail: "Strong cleaning products or multiple treatments may be required to get rid of difficult stains and lingering odours, which will raise the cost of the project."
    },
    {
      id: 5,
      name: "Accessibility",
      detail: "Hiring professional carpet cleaners may require more money if the carpet is difficult to access or calls for unusual arrangements, such as moving furniture, due to the added work and time required."
    },
    {
      id: 6,
      name: "The location of your property",
      detail: "Your location is important since some carpet or upholstery cleaning firms may charge more to travel to farther-flung places. The typical day fee in Edinburgh is about £140, but businesses in the nearby districts only charge about £100 per day. If you live in Edinburgh, you should prepare to spend extra."
    },
    {
      id: 7,
      name: "Additional/extra services",
      detail: "A carpet cleaning company also provides further services including deodorising, spot removal, and applying carpet protection. The price will increase due to these additional services."
    }
  ];

  const handleCarpetList = () => {
    if (carpetList.length === miniCarpetList.length) {
      setCarpetList(carpetCleaningFactors)
    }
    else {
      setCarpetList(miniCarpetList)
    }
  }

  const carpetCleaningBenefits = [
    {
      id: 1,
      name: "Clear prices",
      reason: "Prices that are transparent and free of ambiguity enable customers to make well-informed choices. Ensuring there are no surprises or hidden fees improves client happiness and trust. Any other local cleaning company may hide their carpet cleaning prices, but with eMop, you know the price of the professional carpet cleaning services at the moment of booking."
    },
    {
      id: 2,
      name: "Pay-as-you-go approach",
      reason: "The estimated amount of your reservation will be deducted from your bank account. After the cleaning session is finished, you will only be billed for the time a carpet cleaner actually worked. Only the time that was actually spent cleaning your carpets is reimbursed."
    },
    {
      id: 3,
      name: "Insured and accredited cleaners",
      reason: "A thorough background check is carried out on our carpet cleaners to examine their past records. This is to ensure the safety of our customers. In addition to that, our professional clean team are duly insured and licensed to carry out cleaning activities in the UK. They are trained and have become professional carpet cleaners over time and can fit into any professional cleaning company. You can be sure to get professional carpet cleaning services when you choose eMop. If you also need end of tenancy cleaning services, eMop cleaners can help too."
    }
  ];

  const handleBenefitsList = () => {
    if (benefits.length === miniBenefits.length) {
      setBenefits(carpetCleaningBenefits);
    }
    else {
      setBenefits(miniBenefits);
    }
  }

  const handleRight1111 = () => {
    setStyleRight1(arrowRightStyleOff)
    setStyleLeft1(arrowLeftStyleOn)
    setQuestion1('No, the carpet does not need to be cleaned in an empty room. Even with furniture or other objects present, it is still possible to clean the carpet. Before cleaning, however, moving any obstructions like furniture may be more practical in order to provide comprehensive cleaning.')

  }

  const handleLeft1111 = () => {
    setStyleRight1(arrowRightStyleOn)
    setStyleLeft1(arrowLeftStyleOff)
    setQuestion1('')

  }

  const handleRight2222 = () => {
    setStyleRight2(arrowRightStyleOff)
    setStyleLeft2(arrowLeftStyleOn)
    setQuestion2('Yes, it is possible to clean severely stained carpets. The beauty and cleanliness of the carpet can be restored by using professional carpet cleaning services and strong cleaning tools to remove stubborn stains and grime.')

  }

  const handleLeft2222 = () => {
    setStyleRight2(arrowRightStyleOn)
    setStyleLeft2(arrowLeftStyleOff)
    setQuestion2('')

  }

  const handleRight3333 = () => {
    setStyleRight3(arrowRightStyleOff)
    setStyleLeft3(arrowLeftStyleOn)
    setQuestion3('It definitely relies on a number of variables, including the age and condition of the carpet, as well as whether or not you have children or animals who like to make a mess. However, unless there are family members who have allergies, asthma, or other illnesses that affect their ability to breathe, once a year is usually sufficient.')

  }

  const handleLeft3333 = () => {
    setStyleRight3(arrowRightStyleOn)
    setStyleLeft3(arrowLeftStyleOff)
    setQuestion3('')

  }

  const handleRight4444 = () => {
    setStyleRight4(arrowRightStyleOff)
    setStyleLeft4(arrowLeftStyleOn)
    setQuestion4('Vacuuming is advised following carpet cleaning, yes. In order to keep your carpet looking new and preserving its longevity, vacuuming helps to remove any leftover dirt, debris, or loose fibres that may have been loosened during the cleaning procedure.')

  }

  const handleLeft4444 = () => {
    setStyleRight4(arrowRightStyleOn)
    setStyleLeft4(arrowLeftStyleOff)
    setQuestion4('')

  }

  const fullSofaText = ['We frequently ignore our upholstery until we spill something or see a significant stain. Your upholstery should be cleaned for more than just spills and stains. Over time, the dust and filth on your sofa and chairs may accumulate.\n' +
  '\n' +
  '\n' +
  'Many individuals consider their sofa to be an essential component of their house. In addition to using it as seats, individuals might also use it as a location to store things or to unwind. If your sofa needs cleaning, you might be wondering how to approach the task.\n' +
  '\n' +
  '\n' +
  'In order to restore the appearance of a soiled or unclean sofa, more effort will be needed. During a deep cleaning, all dirt, stains, and damage will most likely be removed from the sofa along with it. If you\'re only seeking to clean your sofa, attempt to locate less expensive choices first because this may frequently be pretty pricey.\n' +
  '\n' +
  '\n' +
  'There is no need to pay for professional cleaning services if your furniture is in good shape. In reality, a lot of people perform this task on their own every few months or years because it is manageable and doesn\'t require a lot of effort or resources.\n' +
  '\n' +
  '\n' +
  'However, if your furniture begins to show indications of deterioration, it\'s crucial to get it inspected by a professional sofa cleaning expert so that any necessary upholstery treatment may be completed before it sustains further harm.\n' +
  '\n']

  const handleSofa = () => {
    if (sofaDetail[0].length === sofaText[0].length) {
      setSofaDetail(fullSofaText)
    }
    else {
      setSofaDetail(sofaText)
    }
  }

  const upholsteryCleaningBenefits = [
    {
      id: 1,
      reason: "Regardless of whether you require a one-time clean or regular cleaning services, eMop professional cleaners will go above and beyond your expectations."
    },
    {
      id: 2,
      reason: "We've cleaned a lot of sofas over the years, and we don't consider any job to be too big or small. In all of our activities, at eMop, we place a high priority on quality, using only the best cleaning products and disinfection techniques."
    },
    {
      id: 3,
      reason: "Your house is safe with us since we are completely covered by insurance, including fidelity guarantee, public and products liability, and employer's responsibility. You don't need to be home to allow our staff in to clean because we are an insured company. If you are looking to get the best upholstery cleaning services, eMop is the agency to call."
    },
    {
      id: 4,
      reason: "Due to the Pay As You Go billing model we use, the upholstery cleaning rates only be charged for the actual time upholstery cleaners spend on your property. You will pay less if the cleaning service is finished sooner than anticipated."
    },
    {
      id: 5,
      reason: "If the cleaning work went longer than expected, it will attract an extra sofa cleaning cost, but never more than an additional hour."
    }
  ];

  const handleUpholsteryList = () => {
    if (upholsteryList.length === miniUpholsteryList.length) {
      setUpholsteryList(upholsteryCleaningBenefits);
    }
    else {
      setUpholsteryList(miniUpholsteryList);
    }
  }

  const handleRight11111 = () => {
    setStyleRight1(arrowRightStyleOff)
    setStyleLeft1(arrowLeftStyleOn)
    setQuestion1('Usage and household conditions determine how frequently you should use upholstery cleaning services. For routine maintenance, it is often advised every 12 to 24 months. Areas with high traffic may require more frequent cleaning, whereas those with little traffic can go longer. To avoid damage and maintain hygiene, stains and odours must receive rapid care.')

  }

  const handleLeft11111 = () => {
    setStyleRight1(arrowRightStyleOn)
    setStyleLeft1(arrowLeftStyleOff)
    setQuestion1('')

  }

  const handleRight22222 = () => {
    setStyleRight2(arrowRightStyleOff)
    setStyleLeft2(arrowLeftStyleOn)
    setQuestion2('It is worthwhile to clean a sofa, yes. Its lifespan is increased by routine cleaning in addition to maintaining its attractiveness. It makes the living space healthier by removing dirt, allergies, and odours. Additionally, paying a professional cleaner can be less expensive than prematurely replacing a sofa due to negligence.')

  }

  const handleLeft22222 = () => {
    setStyleRight2(arrowRightStyleOn)
    setStyleLeft2(arrowLeftStyleOff)
    setQuestion2('')

  }

  const handleRight33333 = () => {
    setStyleRight3(arrowRightStyleOff)
    setStyleLeft3(arrowLeftStyleOn)
    setQuestion3('Fabric sofas can be cleaned, yes. Fabric couches can benefit from the efficient removal of grime, stains, and odours by professional upholstery cleaning services. Additionally, DIY techniques like vacuuming and spot cleaning can help keep them looking good. Your fabric sofa\'s lifespan can be increased and its appearance preserved with routine washing.')

  }

  const handleLeft33333 = () => {
    setStyleRight3(arrowRightStyleOn)
    setStyleLeft3(arrowLeftStyleOff)
    setQuestion3('')

  }

  const handleRight44444 = () => {
    setStyleRight4(arrowRightStyleOff)
    setStyleLeft4(arrowLeftStyleOn)
    setQuestion4('Size, fabric type, and cleaning technique all influence how long it takes to wash a sofa. Typically, professional upholstery cleaning requires 1-2 hours per sofa. DIY cleaning could take longer because drying time adds to the process. Multiple washing sessions and more time may be needed to remove difficult stains or really dirty sofas.')

  }

  const handleLeft44444 = () => {
    setStyleRight4(arrowRightStyleOn)
    setStyleLeft4(arrowLeftStyleOff)
    setQuestion4('')

  }

  const handleRight44445 = () => {
    setStyleRight5(arrowRightStyleOff)
    setStyleLeft5(arrowLeftStyleOn)
    setQuestion5('When washing an expensive fabric sofa, remove trash with a hoover, test a spot with a mild cleaning solution and then use delicate cleaning techniques. Blot spills instead of rubbing them, and let the area entirely air dry. Consider hiring a professional upholstery cleaner for fragile fabrics.')

  }

  const handleLeft44445 = () => {
    setStyleRight5(arrowRightStyleOn)
    setStyleLeft5(arrowLeftStyleOff)
    setQuestion5('')

  }


  useEffect(() => {
    switch (service) {
      case serviceList[0].name:
        setLayout(
            <div>
              <h3 className={'main-banner'} style={{color:'navy', textAlign:'center'}}>What is house cleaner price per hour?</h3>
              <div>
                <div className="services-grid" style={{paddingBottom:'30px', paddingTop:'30px'}}>
                  {pricings.map(pricings => (
                      <div key={pricings.id} className="service-card">
                        <h3>{pricings.name}</h3>
                        <p style={{color:'blue'}}>{pricings.price}</p>
                        <p style={{textAlign:'start'}}>{pricings.desc}</p>
                        <input type={"text"} placeholder={"Enter your full post code"} style={{marginBottom:'10px', marginTop:'10px', padding:'10px'}} />
                        <button className="service-button">Give me quote</button>
                      </div>
                  ))}
                </div>

                <section className={'main-banner'} style={{marginTop:'50px'}}>
                  <div className="container" style={{marginBottom:'30px'}}>
                    <h3 style={{color:'navy', textAlign:'center'}}>House cleaning prices</h3>
                    <p style={{color:'brown'}}>What is house cleaner price per hour?</p>
                    <div className={'idea-container'}>
                      <div style={{display: 'block'}}>
                        <p>Given that domestic cleaning prices vary across the UK depending on location, nature of the cleaning, and size of the property, we will need to know the postcode of the residence for which you are interested in a domestic cleaning service. We will offer you free price quotes for weekly,forthnightly, monthly, and one off cleanings</p>
                        <p style={{marginTop:'20px'}}>We are happy to offer you the following cleaning services:</p>
                        <div>
                          <ul className={'dot-list'}>
                            <li>Weekly: cost start at £16/h</li>
                            <li>Monthly: cost start at £17/h</li>
                            <li>Bi-weekly: cost start at £17/h</li>
                            <li>One off: cost start at £18/h</li>
                          </ul>
                        </div>
                        <p>Our cleaning prices at Fly cleaners are the best you will get in Edinburgh and around the UK. We take pride in offering cost-effective cleaning aid of the highest quality. For all cleaning services in Edinburgh that are provided to our cherished clients, eMop strives to offer the finest price to quality ratio.</p>
                      </div>
                      <img src={Stairs} alt={"cleaners"} className={'cart-image2'}/>
                    </div>
                  </div>
                </section>

                <section style={{marginTop:'50px'}}>
                  <div className="container" style={{marginBottom:'30px'}}>
                    <div className={'idea-container'}>
                      <img src={Cleaners} alt={"cleaners"} className={'cart-image2'}/>
                      <div>
                        <h3 style={{color:'navy'}}>Why choose Fly cleaners?</h3>
                        <ul className={'dot-list'}>
                          <li>Among the many insurance products we provide are fidelity guarantees, general liability, and employer's liability. Since we are an insured cleaning agency, you do not need to be home to let our personnel in to clean.</li>
                          <li>Since all of our maids are working full-time, they can rest easy knowing that their jobs are safe. They are local cleaners, and they receive paid time off, sick days when needed, and pension contributions. In addition to receiving a fair hourly wage, our maids also share in the cost of each clean they perform.</li>
                          <li>Kitchen - wiping and polishing all surfaces and worktops, mopping and vacuuming the floors, cleaning equipment and appliances, washing the dishes, cleaning doors and handles. You can also request cleaning inside the fridge, the oven and the microwave, arranging things inside kitchen cabinets, etc.</li>
                          <li>Our cleaning cost is the most affordable in the UK.</li>
                          <li>Amost all of our clients recommend us. This shows the quality of services we render.</li>
                          <li>To always provide our clients with a high-quality service, our cleaning company conducts routine quality control tests.</li>
                          <li>We offer same day cleaning solutions for our customers.</li>
                          <li>Our service options are flexible and are available every day of the week to meet your cleaning needs.</li>
                          <li>Our prices are clear and direct. You get to know them once you’re booking for our specialist cleaning services.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                <section className={'main-banner'} style={{marginTop:'50px'}}>
                  <div className="container" style={{marginBottom:'30px'}}>
                    <div className={'idea-container'}>
                      <img src={Domestic} alt={"cleaners"} className={'cart-image2'}/>
                      <div className="service-card">
                        <h3 style={{color:'navy'}}>Cleaning prices for extra services</h3>
                        <ul className={'dot-list'}>
                          <li>For an additional cost, eMop provides additional services. That may entail outdoor and deep cleaning service, carpet cleaning, window washing, fridge, microwave, ironing, bed making, kitchen, bathroom, bookcase, oven and grill cleaning.</li>
                          <li>If you find that you require any of these services, be sure to research the cost of our house cleaning. Be aware that the minimum charge for the extra aid prices starts at £9 to £25 on an hourly rate.</li>
                          <li>If you're looking for a trustworthy cleaning service that's reasonably priced and also provides other solutions, eMop is the ideal option. We provide carpet cleaning, upholstery, and end of tenancy cleaning, for instance, at very affordable prices.</li>
                          <li>Additionally, one of our many areas of expertise is window washing. Delivering exceptional service to every customer has always been the priority of our professional cleaners</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                <section style={{marginTop:'50px'}}>
                  <div className="container" style={{marginBottom:'30px'}}>
                    <div className={'idea-container'}>
                      <div className="service-card">
                        <h3 style={{color:'navy'}}>Are materials included in the price?</h3>
                        <p>Please be aware that cleaners only have the cleaning materials needed to properly clean general-purpose surfaces, so if you'd like, you can add it on. While most characters respond favourably to these items, others may require particular cleaning agents that we do not offer.
                          Due to this, we are unable to guarantee the efficacy of our standard cleaning products. When placing a booking with your domestic cleaner, be sure to specify if you need anything like a hoover, vacuum cleaner, or a mop. For this equipment, you will be charged more.</p>
                      </div>
                      <img src={Equipment} alt={"cleaners"} className={'cart-image2'}/>
                    </div>
                  </div>
                </section>

                <section className={'main-banner'} style={{marginTop:'50px'}}>
                  <div className="container" style={{marginBottom:'30px'}}>
                    <div className={'idea-container'}>
                      <img src={Regular} alt={"cleaners"} className={'cart-image2'}/>
                      <div className="service-card">
                        <h3 style={{color:'navy'}}>Try our pay as you go service</h3>
                        <ul className={'dot-list'}>
                          <li>This service means that payment on our website is handled by a safe third-party supplier. Once the job is finished, your card won't be charged until then. It's quite practical to pay as you go for cleaning solutions.</li>
                          <li>Without committing to a lengthy contract, you can utilise it to clean your property or place of business. You make the necessary payments, and the cleaners then arrive and take care of everything.</li>
                          <li>For customers who may want a flexible and non-committing cleaning solution, this may be a fantastic choice.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            </div>
        )
        break;

      case serviceList[1].name:
        setLayout(
            <div>
              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                  <div className={'idea-container'}>
                    <div className={'price-container'}>
                      <p style={{color:'red', textAlign:'end'}}>Cashback up to £150</p>
                      <h3 style={{textAlign:'center'}}>Prices for One-off deep cleaning</h3>
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

                    </div>
                    <div className="service-card">
                      <h3 style={{color:'navy'}}>What is included in deep cleaning?</h3>
                      <ul className={'dot-list'}>
                        <li>Dusting all furniture including bottoms and sides</li>
                        <li>Scrubbing every glass surface, including restrooms, and making sure it's sanitary</li>
                        <li>If desired, we will clean the appliances, and mop or sweep every floor.</li>
                        <li>Sanitising door frames</li>
                        <li>Dusting every surface that's reachable</li>
                        <li>Cleaning windows and mirrors</li>
                        <li>Cleaning kitchenware</li>
                        <li>Folding garments and organising items</li>
                        <li>Removing spiderwebs and sanitising light switches</li>
                        <li>Hoovering carpets, and washing the the floor and skirting boards</li>
                        <li>Emptying the trash</li>
                      </ul>
                    </div>
                  </div>
                  <div className="price-container" style={{marginTop:'50px', maxWidth:'800px'}}>
                    <h3 style={{textAlign:'center'}}>One-off deep cleaning service</h3>
                    <p>When you make your reservation, you can ask for extra specialist services like spring cleaning, deep house cleaning services, office cleaning, regular cleaning services, upholstery cleaning, end of tenancy cleaning, and professional carpet cleaning services.</p>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className="container">
                  <div style={{display:'block'}}>
                    <h3 style={{textAlign:'center', color:'navy'}}>Results</h3>
                    <div className="services-grid">
                      {resultList.map(result => (
                          <div key={result.id}>
                            <img src={result.src} alt="" className={'cart-image'}/>
                          </div>
                      ))}
                    </div>
                    <button onClick={handleResultChange} style={{width:'150px', background:'white', color:'black', marginTop:'20px'}}>{!isAllResults ? 'See more' : 'See less'}</button>
                  </div>
                </div>
              </section>

              <section className={'main-banner'}  style={{marginTop:'50px'}}>
                <div className="container" >
                  <div style={{display:'block'}}>
                    <h2 style={{color:'navy', textAlign:'center', marginBottom:'30px'}}>What does the process of One-off deep cleaning look like?</h2>
                  </div>
                  <div className="grid-container">
                    <div className="service-card">
                      <h3 style={{color:'brown'}}>Preparation</h3>
                      <p>
                        The area is first prepared by eMop's carpet cleaners. Moving light furniture (including heavy furniture sometimes) enabling easy access, and checking the carpet for common stains or special cleaning requirements are all part of this process. They hoover the carpet as well to get rid of any loose dirt or debris especially from areas with heavy foot traffic, remove stains, and give you refreshed carpets.
                      </p>
                    </div>

                    <div className="service-card">
                      <h3 style={{color:'brown'}}>Carpet cleaning process</h3>
                      <p>
                        Utilising cutting-edge tools and efficient cleaning methods are part of the fundamental carpet cleaning process. Depending on the type of carpet and its state, eMop carpet cleaners frequently use hot water extraction (also known as 'steam cleaning') or dry cleaning techniques.
                        Hot water and a cleaning solution are injected into the carpet during a hot water extraction, which is then completely extracted. Specialised chemicals or foams may be used in dry cleaning processes.
                      </p>
                    </div>

                    <div className="service-card">
                      <h3 style={{color:'brown'}}>Finishing touch</h3>
                      <p>
                        Fly carpet cleaners ensure that the carpet dries efficiently after cleaning by using powerful extraction instruments and, if required, air movers. In order to ensure that all stains and spots have been removed and the carpet looks clean and new, our expert carpet cleaning service staff also performs a final inspection.
                        The comprehensiveness and customer satisfaction of eMop's professional carpet cleaning services make them a trustworthy choice for maintaining the stain- and wear-resistant qualities of your rugs.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                  <div className={'idea-container'}>
                    <div className="service-card">
                      <p style={{color:'navy'}}>Deep Cleaning</p>
                      <p>Whether you need a deep cleaning service once or often, Fly cleaners offers professional deep cleaning services in the Edinburgh area.
                        The thought of having to dedicate time to clean your property, flat, office (commercial cleaning), or any other location might be depressing. However, assigning this job to reliable expert and fully insured cleaners with years of expertise will greatly reduce your workload.
                        You can be confident that we have staff with the highest standards for the task if you're seeking expert deep cleaning services. As the premier and go-to option for deep cleaning in Edinburgh, our achievements over the years speak for themselves, and we take satisfaction in our very good service, which is suitable for any of your cleaning needs.
                        We are all aware of how time-consuming and annoying cleaning your whole property feels. For a one-off deep clean in Edinburgh, eMop is the best choice.
                        Our professional cleaners will work on as many things as we can in the allocated time, while also considering your cleanliness needs and preferences.</p>
                    </div>
                    <img src={Kept} alt={"cleaners"} className={'cart-image2'}/>
                  </div>
                </div>
              </section>

              <section  className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                  <div className={'idea-container'}>
                    <img src={Combine} alt={"cleaners"} className={'cart-image2'}/>
                    <div className="service-card">
                      <h3 style={{color:'darkolivegreen'}}>Why choose Fly cleaners for deep cleaning?</h3>
                      <ul className={'dot-list'}>
                        <li>We stand out from other deep cleaning service providers in Edinburgh because of our accountability, commitment to quality, and professionalism. All Edinburgh landlords and tenants love our work because we always deliver a healthy home at the end of the day.</li>
                        <li>Our highly recommended services offer our customers the opportunity to select a day and time that works for you. Even on short notice, house cleaning appointments can be made in advance with our booking system.</li>
                        <li>In addition to our one-off cleaning service, we can tailor our orders to include weekly, fortnightly, or monthly appointments; this is one of the finest things about the eMop professional deep cleaning services.</li>
                        <li>You pay for only the service provided.</li>
                        <li>We have highly trained cleaners that can give you the high-quality deep cleaning service that our agency is associated with in the cleaning industry. A large part of our friendly team is made up of local cleaners who are familiar with the Edinburgh area. This makes us stand out as the best cleaning company.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                  <div className={'idea-container'}>
                    <img src={NeatBathroom} alt={"cleaners"} className={'cart-image2'}/>
                    <div className="service-card">
                      <h3 style={{color:'darkolivegreen'}}>One-Off Deep Cleaning Checklist</h3>
                      <div style={{display:'block'}}>
                        {tasks.map(task => (
                            <div key={task.id}>
                              <h3 className={'dot-list'} style={{color:'brown'}}>{task.room}</h3>
                              {task.tasks.map(taskItem => (
                                  <ul className={'dot-list'} key={taskItem.id}>
                                    <div>
                                      <li>{taskItem.task}</li>
                                    </div>
                                  </ul>
                              ))}
                            </div>
                        ))}
                        <p style={!isAllTask ? hide: show}>We have experienced cleaners who are dedicated to what we do and take great pride in providing extra services. We can give you unmatched deep cleaning services, and guarantee that your one-off deep cleaning will be done correctly, regardless of what your cleaning preferences are, whether you need business or domestic regular cleaning services in Edinburgh. All our prices are affordable for everyone.</p>
                        <button onClick={handleTasks} style={{width:'150px', background:'white', color:'black', marginTop:'20px'}}>{!isAllTask ? 'See more' : 'See less'}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section  className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                  <div className={'idea-container'}>
                    <div className="service-card">
                      <h3 style={{color:'navy'}}>Full Deep Cleaning Coverage</h3>
                      <p>We cover every local area in Edinburgh. Scotland's capital, Edinburgh, is recognised as a centre for tourism, culture, and education. Many historical sites that encapsulate the spirit of this great city's rich past can be found all throughout it.
                        With its majestic Castle, regal Palace of Holyroodhouse, and alluring Royal Mile, Edinburgh beckons tourists to immerse themselves in its rich history. The city, which is well-known as a hub for culture, is illuminated by renowned events that bring in visitors from all over the world, such as the Edinburgh International Film Festival and the Edinburgh Festival Fringe.
                        Although Edinburgh was formerly a part of Midlothian county, it became independent of its neighbouring county in 1482. With its alluring fusion of culture, history, and unique personality, Edinburgh is a location that captivates the hearts and minds of everyone who comes.</p>
                    </div>
                    <img src={Neat} alt={"cleaners"} className={'cart-image2'}/>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                  <div className={'idea-container'}>
                    <div className="service-card">
                      <h3 style={{color:'navy'}}>What does the process of deep cleaning look like?</h3>
                      {cleaningInspectionSteps.map((step => (
                          <div key={step.id} style={{display:'block'}}>
                            <ul className={'dot-list'}>
                              <li style={{color:'brown'}}>{step.title}</li>
                            </ul>
                            <p>{step.description}</p>
                          </div>
                      )))}
                    </div>
                    <img src={Fresh} alt={"cleaners"} className={'cart-image2'}/>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px'}}>
                <div className="container" style={{marginBottom:'30px'}}>
                  <div style={{display:'block'}}>
                    <h3 style={{color:'navy'}}>Let the results amaze you!</h3>
                    <p>Our deep cleaners are fully trained, licensed and background checked to deliver cleaning services in Edinburgh. eMop is known for delivering cleaning of the highest quality, and that will never change. We guarantee complete satisfaction after our deep cleaners are done with your property in Edinburgh. Did you know you can book other services alongside deep cleaning as well, like moving home service? Send us a message today</p>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px', display:'block'}}>

                <div className={'container'}>
                  <h3 style={{textAlign:'start', color:'navy', marginBottom:'30px'}}>Frequently asked questions</h3>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight1} style={styleRight1} />
                    <FaArrowLeft onClick={handleLeft1} style={styleLeft1} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>How much does deep cleaning cost?</p>
                      <p style={{marginLeft:'10px'}}>{question1}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight2} style={styleRight2} />
                    <FaArrowLeft onClick={handleLeft2} style={styleLeft2} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>How do I book deep cleaners online?</p>
                      <p style={{marginLeft:'10px'}}>{question2}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight3} style={styleRight3} />
                    <FaArrowLeft onClick={handleLeft3} style={styleLeft3} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>What does your one-off deep cleaning include?</p>
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
                        What should I do to prepare for your deep cleaning visit?</p>
                      <p style={{marginLeft:'10px'}}>{question4}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight5} style={styleRight5} />
                    <FaArrowLeft onClick={handleLeft5} style={styleLeft5} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>What is deep cleaning?</p>
                      <p style={{marginLeft:'10px'}}>{question5}</p>
                    </div>
                  </div>
                </div>

              </section>

            </div>
        )
        break;

      case serviceList[2].name:
        setLayout(
            <div>
              <section className={'main-banner'} >
                <div className={'container'} style={{maxWidth:'800px'}}>
                  <div style={{display:'block', marginTop:'50px'}}>
                    <h2 style={{color:'navy', marginBottom:'30px'}}>What is the price of office cleaning?</h2>
                    <div className="price-container">
                      <p style={{textAlign:'end', color:'red'}}>Cashback up to £150</p>
                      <h3 style={{textAlign:'center'}}>Office cleaning</h3>
                      <p style={{color:'navy'}}>from £16</p>
                      <p>Professional cleaning and maintenance services for workplaces and other business settings are part of our office cleaning service. Vacuuming, dusting, sanitising toilets, and maintaining a neat space for staff and customers are among the duties carried out by eMop cleaners.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className={'main-banner'}>
                <div className={'container'}>
                  <div style={{display:'block' , marginTop:'50px'}}>
                    <h2 style={{color:'navy', textAlign:'center', marginBottom:'20px'}}>Types of office cleaning and their costs</h2>
                    <div className={'idea-container'}>
                      <img src={Cleaners} alt="" className={'cart-image'}/>
                      <div style={{display:'block'}}>
                        <p>Vacuuming and mopping the floors, washing the windows, cleaning the bathrooms (cleaning the sink, wiping the mirrors, cleaning the toilet and bath), organising the workstations and cleaning the pantry are all regular cleaning duties.
                          A routine cleaning package also takes care of difficult-to-reach areas including workstations, chairs, light switches, remote controls, panels, screens, doors, floors, stairs, walls, and other furniture in a busy office.
                          Deep cleaning these areas typically requires specialised tools and/or techniques, which lengthens the process and increases the cost.
                          Fly cleaners average office cleaning cost is <span style={{color:'red'}}>£17/h</span>. The frequencies are listed below:
                        </p>
                        {pricingOptions.map(option => (
                            <ul className={"dot-list"}>
                              <li key={option.id}>{option.name}</li>
                            </ul>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className={'main-banner'}>
                <div className={'container'}>
                  <div className="idea-container" style={{ marginTop:'50px'}}>
                    <div style={{display:'block'}}>
                      <h4>What's included in office cleaning?</h4>
                      <p>
                        The primary responsibility of an office cleaner is to perform general cleaning tasks close to the office. Frequently, you will mention to the person or business what cleaning duties you want the office cleaners to carry out.

                        These chores include sweeping, dusting, vacuuming, mopping, emptying trash cans, and more. If you have a bathroom and kitchen area, the toilets will be cleaned and bleached, and the floors will be mopped. The kitchen will be wiped down and the stove will be cleaned.

                        Along with offering a general clean, a deep clean will emphasise improving the level of hygiene. The cleaners will get rid of stubborn stains and/or grime, and enhance the general hygienic conditions in your office.

                        Regular office cleanings can be done in accordance with your needs; depending on the size of the workplace and the number of staff you recruit, you might need a cleaner to come in every day, every two days, or every three days.

                        Cleaners generally operate outside of regular business hours, such as early in the morning or late in the afternoon, to reduce disruption to daily office operations. However, the cleaning contract ought to mention the hours.

                        To be clear, everything listed below is included in our office cleaning service. This includes dusting every piece of furniture, washing every glass surface, vacuuming and mopping the floors, removing the trash, and doing tests for ATP and hygiene.
                      </p>
                    </div>
                    <img src={Sweeping} alt="" className={'cart-image'}/>
                  </div>
                </div>
              </section>

              <section className={'main-banner'}>
                <div className={'container'}>
                  <div className="idea-container" style={{ marginTop:'50px'}}>
                    <div style={{display:'block'}}>
                      <h3 style={{color:'navy'}}>What factors affect office cleaning costs?</h3>
                      {factors.map(cleaningFactor => (
                          <div>
                            <ul className={"dot-list"}>
                              <li key={cleaningFactor.id} style={{color:'red', marginTop:'18px'}}>{cleaningFactor.name}</li>
                            </ul>
                            <p>{cleaningFactor.detail}</p>
                          </div>
                      ))}
                      <button onClick={handleFactors} style={{width:'150px', background:'white', color:'black', marginTop:'10px'}}>{factors.length === minFactors.length ? 'See more' : 'See less'}</button>
                    </div>
                    <img src={Greasy} alt="" className={'cart-image'}/>
                  </div>
                </div>
              </section>

              <section>
                <div className={'container'}>
                  <div className="idea-container" style={{ marginTop:'50px'}}>
                    <div style={{display:'block'}}>
                      <h3 style={{color:'navy'}}>Why choose Fly Cleaners?</h3>
                      {serviceFeatures.map(feature => (
                          <div>
                            <ul className={"dot-list"}>
                              <li key={feature.id} style={{marginTop:'18px'}}>{feature.name}</li>
                            </ul>
                            <p>{feature.detail}</p>
                          </div>
                      ))}
                    </div>
                    <img src={Meeting} alt="" className={'cart-image'}/>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px', display:'block'}}>
                <div className={'container'}>
                  <h3 style={{textAlign:'start', color:'navy', marginBottom:'30px'}}>Frequently asked questions</h3>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight11} style={styleRight1} />
                    <FaArrowLeft onClick={handleLeft11} style={styleLeft1} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>How often does an office get cleaned?</p>
                      <p style={{marginLeft:'10px'}}>{question1}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight22} style={styleRight2} />
                    <FaArrowLeft onClick={handleLeft22} style={styleLeft2} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        How long should an office take to clean?</p>
                      <p style={{marginLeft:'10px'}}>{question2}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight33} style={styleRight3} />
                    <FaArrowLeft onClick={handleLeft33} style={styleLeft3} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>Do you do cleaning, before, during or after office hours?</p>
                      <p style={{marginLeft:'10px'}}>{question3}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight44} style={styleRight4} />
                    <FaArrowLeft onClick={handleLeft44} style={styleLeft4} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Is it safe to give cleaners keys to our office?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question4}</p>
                    </div>
                  </div>
                </div>


              </section>

            </div>
        )
        break;

      case serviceList[3].name:
        setLayout(
            <div>
              <section className={'main-banner'}>
                <div className={'container'} style={{maxWidth:'800px'}}>
                  <div style={{display:'block', marginTop:'50px'}}>
                    <h2 style={{color:'navy', marginBottom:'30px'}}>End of tenancy professional cleaning cost</h2>
                    <div className="price-container">
                      <p style={{textAlign:'end', color:'red'}}>Cashback up to £150</p>
                      <h3 style={{textAlign:'center'}}>End of Tenancy cleaning</h3>
                      <p style={{color:'navy'}}>from £16</p>
                      <p>An end of tenancy cleaning service is a professional cleaning and maintenance task carried out at the conclusion of a rental contract. In order to get the place ready for new renters, it attempts to bring it back to its pre-damage state while maintaining cleanliness and fixing any issues in the entire property.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className={'container'}>
                  <div style={{display:'block' , marginTop:'50px'}}>
                    <h2 style={{color:'navy', textAlign:'center', marginBottom:'20px'}}>Average price for end of tenancy cleaning</h2>
                    <div className={'idea-container'}>
                      <img src={Commercial} alt="" className={'cart-image'}/>
                      <div style={{display:'block'}}>
                        <p>On average, our end of tenancy cleaning cost starts from £17/h. All prices are given below:</p>
                        {pricingOptions.map(option => (
                            <ul className={"dot-list"}>
                              <li key={option.id}>{option.name}</li>
                            </ul>
                        ))}
                        <p>
                          End of tenancy cleaning prices for a one-bedroom apartment normally costs between £100 and £200 in the UK. The price might range from £150 to £300 or more for bigger homes like two- or three-bedroom apartments. Based on the number of bedrooms, bathrooms, and total square footage, the price might vary dramatically and be very competitive.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className={'main-banner'}>
                <div className={'container'}>
                  <div className="idea-container" style={{ marginTop:'50px'}}>
                    <div style={{display:'block'}}>
                      <h3 style={{color:'navy'}}>What Determines the Price of End of Tenancy Cleaning?</h3>
                      {tenancyList.map(tenancy => (
                          <div>
                            <ul className={"dot-list"}>
                              <li key={tenancy.id}>{tenancy.narration}</li>
                            </ul>
                          </div>
                      ))}
                      <button onClick={handleTenancy} style={{width:'150px', background:'white', color:'black', marginTop:'10px'}}>{tenancyList.length === miniTenancy.length ? 'See more' : 'See less'}</button>
                    </div>
                    <img src={Regular} alt="" className={'cart-image'}/>
                  </div>
                </div>
              </section>

              <section>
                <div className={'container'}>
                  <div className="idea-container" style={{ marginTop:'50px'}}>
                    <div style={{display:'block'}}>
                      <h3 style={{color:'navy'}}>What Determines the Price of End of Tenancy Cleaning?</h3>
                      <p>
                        Depending on the expert service you pick and what services they offer, the specifics of an end of tenancy clean will vary. Normally, your home will receive a deep clean, including dusting and cleaning any cabinets, cupboards, and drawers by a professional cleaner to remove any stains.
                        The sinks, bathtubs, and showers will be scrubbed clean, as well as any en suite bathrooms, and the tiles will be cleaned to get rid of any mold. In-depth limescale removal cleaning will be performed on the shower head.
                        Deep cleaning of all surfaces, including the floors, walls, skirting boards and ceilings, is typically part of the procedure. Ovens, refrigerators, washing machines, and other kitchen appliances all receive thorough interior and exterior cleaning.
                        The fixtures, tiles, and grout in bathrooms and kitchens go through a thorough cleaning and disinfection process. In addition to completely vacuuming or steam cleaning the carpets and furniture, windows, frames, and sills are cleaned. All areas are dusted, and cobwebs are also removed.
                        Hiring an end of tenancy cleaning team normally guarantees that the home is left in immaculate shape for the subsequent tenants and may encompass other particular activities as needed.
                      </p>
                    </div>
                    <img src={Greasy} alt="" className={'cart-image'}/>
                  </div>
                </div>
              </section>

              <section className={'main-banner'}>
                <div className={'container'}>
                  <div className="idea-container" style={{ marginTop:'50px'}}>
                    <div style={{display:'block'}}>
                      <h3 style={{color:'navy'}}>Why choose Fly cleaners?</h3>
                      {tenancyServiceFeatures.map(tenancy => (
                          <div key={tenancy.id}>
                            <ul className={"dot-list"}>
                              <li key={tenancy.id}>{tenancy.name}</li>
                            </ul>
                            <p style={{marginBottom:'8px'}}>{tenancy.story}</p>
                          </div>
                      ))}
                    </div>
                    <img src={Arranged} alt="" className={'cart-image'}/>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px', display:'block'}}>
                <div className={'container'}>
                  <h3 style={{textAlign:'start', color:'navy', marginBottom:'30px'}}>Frequently asked questions</h3>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight111} style={styleRight1} />
                    <FaArrowLeft onClick={handleLeft111} style={styleLeft1} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>Do I need to pay a deposit?</p>
                      <p style={{marginLeft:'10px'}}>{question1}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight222} style={styleRight2} />
                    <FaArrowLeft onClick={handleLeft222} style={styleLeft2} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Can you provide an accurate estimate for my clean?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question2}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight333} style={styleRight3} />
                    <FaArrowLeft onClick={handleLeft333} style={styleLeft3} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>Are there any supplementary costs?</p>
                      <p style={{marginLeft:'10px'}}>{question3}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight444} style={styleRight4} />
                    <FaArrowLeft onClick={handleLeft444} style={styleLeft4} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Do you charge VAT?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question4}</p>
                    </div>
                  </div>
                </div>


              </section>

            </div>
        )
        break

      case serviceList[4].name:
        setLayout(
            <div className={'main-banner'} >
              <section className={'main-banner'}>
                <div className={'container'} style={{maxWidth:'800px'}}>
                  <div style={{display:'block', marginTop:'50px'}}>
                    <h2 style={{color:'navy', marginBottom:'30px'}}>How Much Are Carpet Cleaning Prices?</h2>
                    <div className="price-container">
                      <p style={{textAlign:'end', color:'red'}}>Cashback up to £150</p>
                      <h3 style={{textAlign:'center'}}>Carpet cleaning</h3>
                      <p style={{color:'navy'}}>from £48</p>
                      <p>
                        Through a variety of cleaning techniques, filth, stains, and allergens are removed from carpets to enhance their appearance,
                        hygienic quality, and durability. They include vacuuming the carpet, scrubbing dirt and stains out of it, and using a
                        carpet washer to wash the carpet. In Edinburgh, carpet cleaning prices start at £48 per hour.
                      </p>
                      <section className="search-section">
                        <div className="search-container">
                          <input
                              type="text"
                              placeholder="Enter full post code"
                              value={postcode}
                              onChange={(e) => setPostcode(e.target.value)}
                          />
                          <button className="search-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                            </svg>
                            Ok
                          </button>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className={'container'}>
                  <div style={{display:'block' , marginTop:'50px'}}>
                    <h2 style={{color:'navy', textAlign:'center', marginBottom:'20px'}}>Average Carpet Cleaning Prices</h2>
                    <div className={'idea-container'}>
                      <img src={Commercial} alt="" className={'cart-image'}/>
                      <div style={{display:'block'}}>
                        <p>
                          For Fly cleaners, the average professional carpet cleaning cost may start from £48 per hour. However, between £60 to £160 is the typical price range in the UK for booking a carpet cleaner. In addition, we describe the carpet cleaning prices in the UK's minimum, maximum, and median ranges.
                          The size of the room, the state of the carpet, and the location all affect the typical carpet cleaning cost in the UK. Basic services cost between £30 and £50 for each room. It could cost more to use specialised cleaning methods like steam cleaning or spot treatment.
                          To obtain the best offers in a highly competitive industry, comparing quotations from different providers is crucial. Prices can differ between regions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className={'main-banner'}>
                <div className={'container'}>
                  <div className="idea-container" style={{ marginTop:'50px'}}>
                    <div style={{display:'block'}}>
                      <h3 style={{color:'navy'}}>Which Factors Form Carpet Cleaning Prices?</h3>
                      {carpetList.map(carpet => (
                          <div>
                            <ul className={"dot-list"}>
                              <li key={carpet.id} style={{marginBottom:'8px'}}>{carpet.name}</li>
                            </ul>
                            <p>{carpet.detail}</p>
                          </div>
                      ))}
                      <button onClick={handleCarpetList} style={{width:'150px', background:'white', color:'blue', marginTop:'10px'}}>{carpetList.length === miniCarpetList.length ? 'See more' : 'See less'}</button>
                    </div>
                    <img src={Greasy} alt="" className={'cart-image'}/>
                  </div>
                </div>
              </section>

              <section>
                <div className={'container'}>
                  <div className="idea-container" style={{ marginTop:'50px'}}>
                    <img src={Cleaners} alt="" className={'cart-image'}/>
                    <div style={{display:'block'}}>
                      <h3 style={{color:'navy'}}>Why choose Fly cleaners?</h3>
                      {benefits.map(benefit => (
                          <div key={benefit.id}>
                            <ul className={"dot-list"}>
                              <li key={benefit.id}>{benefit.name}</li>
                            </ul>
                            <p style={{marginBottom:'8px'}}>{benefit.reason}</p>
                          </div>
                      ))}
                      <button onClick={handleBenefitsList} style={{width:'150px', background:'white', color:'blue', marginTop:'10px'}}>{benefits.length === miniBenefits.length ? 'See more' : 'See less'}</button>
                    </div>
                  </div>
                </div>
              </section>

              <section className={'main-banner'} style={{marginTop:'50px', display:'block'}}>
                <div className={'container'}>
                  <h3 style={{textAlign:'start', color:'navy', marginBottom:'30px'}}>Frequently asked questions</h3>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight1111} style={styleRight1} />
                    <FaArrowLeft onClick={handleLeft1111} style={styleLeft1} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>Does a room have to be empty to clean the carpet?</p>
                      <p style={{marginLeft:'10px'}}>{question1}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight2222} style={styleRight2} />
                    <FaArrowLeft onClick={handleLeft2222} style={styleLeft2} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Can heavily soiled carpet be cleaned?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question2}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight3333} style={styleRight3} />
                    <FaArrowLeft onClick={handleLeft3333} style={styleLeft3} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        How often should I clean my carpets?</p>
                      <p style={{marginLeft:'10px'}}>{question3}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight4444} style={styleRight4} />
                    <FaArrowLeft onClick={handleLeft4444} style={styleLeft4} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Should I vacuum after carpet cleaning?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question4}</p>
                    </div>
                  </div>
                </div>
              </section>

            </div>
        )
        break;

      case serviceList[5].name:
        setLayout(
            <div>
              <section className={'main-banner'}>
                <div className={'container'} style={{maxWidth:'800px'}}>
                  <div style={{display:'block', marginTop:'50px'}}>
                    <h2 style={{color:'navy', marginBottom:'30px'}}>How much does professional sofa cleaning cost?</h2>
                    <div className="price-container">
                      <p style={{textAlign:'end', color:'red'}}>Cashback up to £150</p>
                      <h3 style={{textAlign:'center'}}>Upholstery cleaning</h3>
                      <p style={{color:'navy'}}>from £48</p>
                      <p>
                        A sofa cleaning service comprises maintaining and cleaning couches and sofas to get rid of stains, odours, and other impurities.
                        The life of your furniture can be renewed and extended, and it frequently involves vacuuming, spot removal, and upholstery cleaning.
                        Prices for sofa cleaning with Fly cleaners begin at £48/h.
                      </p>
                      <section className="search-section">
                        <div className="search-container">
                          <input
                              type="text"
                              placeholder="Enter full post code"
                              value={postcode}
                              onChange={(e) => setPostcode(e.target.value)}
                          />
                          <button className="search-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                              <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                            </svg>
                            Ok
                          </button>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className={'container'}>
                  <div style={{display:'block' , marginTop:'50px'}}>
                    <h2 style={{color:'navy', textAlign:'center', marginBottom:'20px'}}>Factors affecting sofa cleaning costs</h2>
                    <div className={'idea-container'}>
                      <img src={Sofa} alt="" className={'cart-image'}/>
                      <div style={{display:'block'}}>
                        <p>
                          The majority of sofa cleaning costs are calculated per item. Your sofa cleaning prices can be significantly reduced if there is only one item that needs to be cleaned.
                          The entire cost of washing your sofa will depend on its size, with 2-seater sofas naturally being less expensive to clean than 4-seaters or L-shaped sofas.
                          A professional cleaner may charge more if your sofa contains delicate or specialty materials since they may need specialised cleaning solutions or tools to
                          finish the task and especially to guarantee stain protection.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className={'main-banner'}>
                <div className={'container'}>
                  <div style={{display:'block' , marginTop:'50px'}}>
                    <h2 style={{color:'navy', textAlign:'center', marginBottom:'20px'}}>Why Is It Important For My Sofa?</h2>
                    <div className={'idea-container'}>
                      <div style={{display:'block'}}>
                        <p>
                          {sofaDetail[0]}
                        </p>
                        <button onClick={handleSofa} style={{width:'150px', background:'white', color:'blue', marginTop:'10px'}}>{sofaDetail[0].length === sofaText[0].length ? 'See more' : 'See less'}</button>
                      </div>
                      <img src={Sofa2} alt="" className={'cart-image'}/>
                    </div>
                  </div>
                </div>
              </section>

              <section className={'main-banner'}>
                <div className={'container'}>
                  <div className="idea-container" style={{ marginTop:'50px'}}>
                    <img src={Cleaners} alt="" className={'cart-image'}/>
                    <div style={{display:'block'}}>
                      <h3 style={{color:'navy'}}>Why choose Fly cleaners?</h3>
                      {upholsteryList.map(upholstery => (
                          <div key={upholstery.id}>
                            <ul className={"dot-list"}>
                              <li key={upholstery.id}>{upholstery.reason}</li>
                            </ul>
                          </div>
                      ))}
                      <button onClick={handleUpholsteryList} style={{width:'150px', background:'white', color:'blue', marginTop:'10px'}}>{upholsteryList.length === miniUpholsteryList.length ? 'See more' : 'See less'}</button>
                    </div>
                  </div>
                </div>
              </section>

              <section style={{marginTop:'50px', display:'block'}}>
                <div className={'container'}>
                  <h3 style={{textAlign:'start', color:'navy', marginBottom:'30px'}}>Frequently asked questions</h3>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight11111} style={styleRight1} />
                    <FaArrowLeft onClick={handleLeft11111} style={styleLeft1} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>How Often Should You Hire Upholstery Cleaning Services?</p>
                      <p style={{marginLeft:'10px'}}>{question1}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight22222} style={styleRight2} />
                    <FaArrowLeft onClick={handleLeft22222} style={styleLeft2} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Is it worth cleaning a sofa?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question2}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight33333} style={styleRight3} />
                    <FaArrowLeft onClick={handleLeft33333} style={styleLeft3} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        Can a fabric sofa be cleaned?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question3}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight44444} style={styleRight4} />
                    <FaArrowLeft onClick={handleLeft44444} style={styleLeft4} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        How long does it take to wash a sofa?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question4}</p>
                    </div>
                  </div>
                </div>

                <div className={'container'}>
                  <div className={'mini-container'}>
                    <FaArrowRight onClick={handleRight44445} style={styleRight5} />
                    <FaArrowLeft onClick={handleLeft44445} style={styleLeft5} />
                    <div className={'question-container'}>
                      <p style={{textAlign:'start', verticalAlign:'top', color:'navy'}}>
                        How do you clean an expensive fabric sofa?
                      </p>
                      <p style={{marginLeft:'10px'}}>{question5}</p>
                    </div>
                  </div>
                </div>
              </section>

            </div>
        )


    }
  }, [service, resultList, tasks, styleLeft1,styleLeft2,
    styleLeft3, styleLeft4, styleLeft5, styleRight1, styleRight2,
    styleRight3, styleRight4, styleRight5, factors, tenancyList,
    carpetList, benefits, sofaDetail, upholsteryList]);

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

  return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh' // Ensures it takes at least full viewport height
      }}>
        {error && <label style={clearText} className={['slide-in', 'error-label'].join(' ')} >{error}</label>}
        <section className={'price-banner'} style={{marginBottom:'30px'}} >
          <div className="container" style={{marginBottom:'30px',  display:'block'}}>
            <h2 style={{color:'navy', textAlign:'center'}}>Choose a Cleaning type!</h2>
            <div className="word-scroller-container" style={{marginTop:'20px'}}>
              <FaArrowLeft onClick={scrollLeft} style={{color:'navy'}} />
              <div className="words-container" ref={scrollContainerRef}>
                {serviceList.map( serviceItem => (
                    <div key={serviceItem.id} >
                      <h3 style={service === serviceItem.name ? active: notActive}
                              onClick={() => {setService(serviceItem.name)}}
                              className="word-item">{serviceItem.name}
                      </h3>
                    </div>
                ))}
              </div>
              <FaArrowRight onClick={scrollRight} style={{color:'navy'}} />
            </div>
          </div>
        </section>

        <section className={'main-banner'} style={{marginTop:'50px'}}>
          <div className={'container'}>
            {layout}
          </div>
        </section>

        <section className={'main-banner'} style={{marginTop:'50px'}}>
          <div className="container">
            <div>
              <h2 style={{textAlign:'center', marginBottom:'10px', marginTop:'10px'}}>How Fly cleaning services work</h2>
              <div>
                <div className="burden-container">
                  {stages.map(stage => (
                      <div key={stage.id} className="service-card">
                        <img src={stage.src} alt="" className={'cart-image'}/>
                        <h3>{stage.stage}</h3>
                        <p style={{fontWeight:'bold', textAlign:'start', color:'blue'}}>{stage.name}</p>
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

        <section className={'main-banner'} style={{marginTop:'50px', marginBottom:'30px'}}>
          <div className="container">
            <div className="burden-container">
              <img src={Sweeping} className={'cart-image4'} alt="" />
              <div className="search-container">
                <h1 className={'burden'}>Shift your cleaning burden to us</h1>
                <input
                    type="text" placeholder="Enter your full post code here"
                    style={{textAlign:'center'}}
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}/>
                <button className={'next-button'} onClick={handleSubmit} style={{textAlign:'center', margin:'10px'}}>Get a quote</button>
              </div>
              <img src={Arranged} className={'cart-image4'} alt="" />
            </div>
          </div>

        </section>

        <Footer />
      </div>
);

}
export default Pricing