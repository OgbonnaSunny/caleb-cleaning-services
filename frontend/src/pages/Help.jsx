import React,  {useState, useEffect, useRef} from 'react'
import Footer from "./Footer.jsx";
import Representative from "../images/representative.png";
import { FaArrowLeft, FaArrowRight  } from 'react-icons/fa';
import Upholstery from "../images/upholstery2.png";
import Regular from "../images/regular.png";
import EndOfTenancy from "../images/endOfTenancy.png";
import LivingRoom from "../images/livingRoom.png";
import Deep from "../images/deep.png";
import Office from "../images/office.png";
import Day from "../images/day.png";
import Domestic from "../images/domestic.png";
import Rug from "../images/rug.png";
import Bathroom from "../images/bathroom.png";
import Kitchen from "../images/kitchen.png";
import Oven from "../images/oven.png";
import api from "./api.js";
import {useNavigate} from "react-router-dom";

const Help = () => {
  const navigate = useNavigate();

  const faqCategoriesClients = [
    {
      id: 1,
      category: "General",
      questions: [
        {
          id: 1,
          question: "How does the Fly cleaner platform work?",
          answer: "Fly cleaner is an agent that connects customers with professional cleaners (we call them Fly cleaners). Fly cleaner is a powerful platform that aims to match your cleaning requirements with a Fly cleaner by providing a quick, simple and secure 24/7 booking process which allows you to book a service either in advance or on the same day."
        },
        {
          id: 2,
          question: "What is the difference between Fly cleaner and a cleaning agency?",
          answer: "Fly cleaner is not a cleaning agency that assigns cleaners to specific orders. Fly cleaner is a powerful platform that matches your cleaning requirements with a Fly cleaner through a quick, simple and secure 24/7 booking process. At the same time, Fly cleaner also acts as a 3rd party provider that ensures the quality of services, peace of mind and safety for both customers and cleaners."
        },
        {
          id: 3,
          question: "What about safety?",
          answer: "Both Clients' and Fly cleaners' safety is Fly cleaner's top priority. Before joining the platform, cleaners must provide adequate criminal check certificates or apply for one if never done before. Fly cleaner only cooperates with individuals with no prior criminal records."
        },
        {id: 4,
          question: "What about the insurance?",
          answer: "Fly cleaner has public liability insurance however claims can only be submitted for damages that exceed £1500"
        },
        {id: 5,
          question: "What is the Cancellation Policy?",
          answer: "We believe that time is valuable for everyone, therefore our Cancellation Policy applies to both our clients and Fly cleaner. When you cancel a job a few hours before the start time or at the last minute, cleaners lose their income and it disrupts their schedule. Your cancellation fees provide compensation to the cleaners. Please read our Cancellation Policy before cancelling a booking."
        },
        {id: 6,
          question: "How can I contact the Fly cleaner platform?",
          answer: "We communicate with clients by email or Live Chat to handle the majority of cases. Please provide us with as many details as possible to get a quick response. We normally answer within 24 hours of the request. Should the enquiry be urgent, you will be contacted as soon as possible. We don’t provide phone support as we don’t have a specialized call canter. If you wish to talk by to us by phone, write us in the Chat or by email and we will contact you between 9 am and 5 pm. Our Support Desk will be happy to help you as soon as we receive your request."
        },
        {id: 7,
          question: "Who are the cleaners?",
          answer: "Cleaners are private individuals who have access to the Fly cleaner platform and accept cleaning work via the Fly cleaner app. Before joining the Fly cleaner platform, cleaners must provide Fly cleaner with adequate criminal check certificates or apply for one if never done before. Being a 3rd party agent, Fly cleaner only cooperates with individuals with no prior criminal records. Cleaners are also trained to follow Fly cleaner’s cleaning standards and general rules."
        },
        {id: 8,
          question: "How are clients matched with cleaners?",
          answer: "When you make a booking with Fly cleaner, your order becomes available for all cleaners who have access to the Fly cleaner platform. Cleaners decide themselves what jobs to accept. Sometimes cleaners may ask for a different times that the ones booked by the client. In this case we contact the client and reschedule the booking so it is suitable for both parties."
        },
        {id: 9,
          question: "Can I tip my cleaner?",
          answer: "Yes, you can tip your cleaner at the end of the job if you are happy with the service.",
        },
        {id: 10,
          question: "Working hours",
          answer: "We operate 24/7 to provide the most convenient cleaning service for you. Fly cleaner’s support team is available from 7am to 9 pm via the email and Live Chat features on the webiste.",
        },
        {id: 11,
          question: "Do I need to be at home during the cleaning?",
          answer: "When you make a booking, you’ll be able to leave comments if you are “not going to be at home”. However, someone should give the cleaner access to the property prior to the cleaning.Also, be aware that if you are not at home, it might be difficult to prove that the cleaning didn’t meet your expectations because you had no chance to check the job at the place before the cleaner left your home.\n" +
              "\n" +
              "Please bear in mind that if the cleaner is not able to get inside the property, you may be charged according to our Cancellation Policy. "
        },
        {id: 12,
          question: "Where can I provide feedback?",
          answer: "If you would like to give us feedback please email flycleaner@gmail.com or alternatively use our Facebook page."
        },
        {id: 13,
          question: "How can I rate a cleaner?",
          answer: "When a booking is completed, you can rate your cleaner on My Account – > History."
        },
        {id: 14,
          question: "What if I have a pet?",
          answer: "Some cleaners may be allergic to certain pets. That is why we kindly ask you to indicate it while making a booking. If a cleaner finds out about the presence of a pet upon arrival, please keep a pet in a different room to the one where the cleaner is working."
        },
        {id: 15,
          question: "Can a cleaner pick up the keys?",
          answer: "If you need a cleaner to pick up a key for your property somewhere, please tick the box about keys in your booking and leave detailed guidelines how to access them. We ask you to be accessible by phone before the cleaning in the case of a cleaner having issues getting into your property.\n" +
              "\n" +
              "Please be advised that if the cleaner needs to pick the keys, the timing of your cleaning service will be extended for the time required to pick up the keys if they are not stored in the same building."
        }
      ]
    },
    {
      id: 2,
      category: "Booking",
      questions: [
        {
          id: 1,
          question: "How do I make a booking?",
          answer: "Bookings can only be completed via our website and the payment is made via our secure payment provider. The booking process is very simple and only takes a few minutes to complete. To make a booking, we ask for some personal details (your name, phone number, your address) and your payment information (we accept payment by credit or debit card only)."
        },
        {
          id: 2,
          question: "Where can I find the booking ID?",
          answer: "The Booking/Order ID is a unique number that we use to track clients orders. You will receive your Booking ID in the confirmation email after completing the booking."
        },
        {id:3,
          question: "How can I reschedule a booking?",
          answer: "If you need to reschedule your booking for whatever reason, you can do it in My Account – and go to the Upcoming booking section, on our website.\n" +
              "\n" +
              "Please be aware that you may be required to pay a fee for late rescheduling. Please see our Cancellation policy."},
        {id:4,
          question: "I need to cancel a booking",
          answer: "If you need to cancel your booking for whatever reason, you can do it in My Account and go to the ‘Upcoming bookings’ section on our website. Please be aware that you may be required to pay a fee for late cancellation. Please see our Cancellation policy. When you cancel a job a few hours before the start time or at the last minute, our Fly cleaners lose their income and it disrupts their schedule. Your cancellation fees cover cleaners’ compensation."
        },
        {id:5,
          question: "What is the minimum duration of the cleaning?",
          answer: "The minimum duration for any cleaning order is 3 hours.",
        },
        {id:6,
          question: "Why was my booking cancelled?",
          answer: "Cleaners working with our platform accept bookings themselves. If nobody is available to do your job, the booking is cancelled automatically 3 hours before the start time. In this case, we offer you the chance to make a new booking at another date and time or contact Fly cleaner Support Team via email or live chat on our website."
        },
        {id:7,
          question: "Can I book via phone?",
          answer: "No. We only accept bookings via the Fly cleaner website. If you have any problems with our website, please refresh the page and proceed with the booking. If you’re still not successful, please contact the Fly cleaner Support Team."
        },
        {id:8,
          question: "I need a cleaner urgently for today",
          answer: "You can book a service 4 hours in advance. If you need a cleaner to arrive earlier, just indicate that in your ‘comments’ section when making your booking! As soon as you place the booking, your job will become available for all Fly cleaner cleaners. When someone accepts your booking, you will receive an email confirmation. Otherwise, the system will automatically cancel the booking 3 hours before the requested start time; you will be sent a notification email. We will not need to refund you as we only take payment after a job is completed. The blocked estimated amount on your card will be released straight away after the booking is cancelled."},
        {id:9,
          question: "Can I book the same cleaner again?",
          answer: "Our system doesn’t offer this option at the moment. However, if you prefer to book a previous cleaner please leave a comment as you book. If the Fly cleaner is available at the day and time requested in your booking, we will ask this person to accept your booking. Should you wish to have regular bookings with a preferred cleaner, please refer to the Cleaning Plans section on our website.\n" +
              "\n" +
              "The job I booked has not been completed\n" +
              "When you book the service, our system estimates the duration of the cleaning. However, each property is different. That is why cleaners are asked to work within the estimated time plus one hour. If the cleaner requires more time for the cleaning than the system has estimated plus the one hour, she/he will inform us and you about this. If you do not  want to go ahead with the extra time that the cleaner needs, then you can choose to ask the cleaner to stop, when the estimated time plus one hour ends. In this case, she/he may not be able to complete the cleaning of all of the rooms that you originally booked, which will explain the incomplete service.\n"
        },
        {id:10,
          question: "I would like to book a regular cleaning",
          answer: "If you wish to book a clean on a regular basis, we offer you More flexible options. Please follow Pricing.",},
        {id:11,
          question: "I want a female or male cleaner",
          answer: "Our platform doesn’t allow to choose a gender of the cleaner in order to avoid any discrimination. However, if there is any reason you prefer a female or male cleaner to work in your home, please make a comment about your requirements in the booking. Cleaners can see your comments and pick up your job according to your preferences."},
        {id:12,
          question: "Can I change something in the booking?",
          answer: "At the moment you can change the comments in your upcoming bookings and write everything you require: please add info about extra rooms or instructions about how to get to your property. Please be aware that the Fly cleaner system charges clients for the real duration of the cleaning which is likely to be more than the estimate in this case. However, if the cleaner has bookings after yours, then they may not be able to give you any additional time."},
        {id:13,
          question: "Can I book regular services with the same cleaner?",
          answer: "If you wish to have regular bookings with a preferred cleaner, please leave a comment on the last step of the booking process. In case the cleaner is sick or on holiday, we guarantee a replacement."},
        {id:14,
          question: "I would like to limit my booking within a certain time",
          answer: "If you wish to limit your booking by a certain time, please note that we cannot guarantee that we will be able to clean all spaces indicated in the booking. Please give the cleaner instructions about your requirements."}
      ]
    },
    {
      id: 3,
      category: "Cleaning Service",
      questions: [
        {
          id: 1,
          question: "What is included in the cleaning service?",
          answer: "Here you can review what the full Fly cleaner cleaning service is."
        },
        {
          id: 2,
          question: "Do cleaners bring their own cleaning products?",
          answer: "Yes, if you purchase it as an add-on. Cleaners have all the required cleaning products for all different types of surfaces. These products work well on most surface types."
        },
        {id: 3,
          question: "Can you clean the ceiling, blinds and other things with restricted access?",
          answer: "Unfortunately, we do not provide these services at the moment."},
        {id: 4,
          question: "Do you do post-renovation cleaning?",
          answer: "Unfortunately, we do not provide these services at the moment."},
        {id: 5,
          question: "Do you clean offices?",
          answer: "Fly cleaner does provide this service. If interested, please book here.",
        },
        {id: 6,
          question: "Do you clean outside of the house (front yard/garden)?",
          answer: "Unfortunately, we do not provide these services at the moment."},
        {id: 7,
          question: "Can you clean and rearrange items?",
          answer: "Yes, we can. Our standard cleaning includes rearranging items by room and putting them back to the correct place. If you need the cleaner to rearrange your things differently, please give them specific instructions upon their arrival. Leave a comment when booking if you need a specific rearranging of items and choose a higher level of dirtiness."},
        {id: 8,
          question: "Can you clean inside kitchen cabinets and microwave?",
          answer: "Yes, we can. When making your booking, just add these options to your request. Please note that the cleaner will need more time to complete additional tasks if they are not included in the initial request."},
        {id: 9,
          question: "Can you move furniture, clean there and put the furniture back?",
          answer: "Please keep in mind that moving heavy interior objects and cleaning in places with restricted access are not included in our service. If your furniture is not particularly heavy and one person can easily move it, we can make that happen for you. Leave a specific comment about this need while making a booking."},
        {id: 10,
          question: "Do you do professional cleaning of carpets, sofas and chairs?",
          answer: "Fly cleaner provides carpet and upholstery cleaning services which aim to increase the life of your carpets and help your carpet& upholstery to retain its fresh and beautiful appearance."},
        {id: 11,
          question: "Do you provide end of tenancy cleaning?",
          answer: "Fly cleaner professional end of tenancy cleaning follows strict company procedures and guidelines to ensure you receive the highest level of service. Please be aware that THE DEFAULT LEVEL OF DIRT FOR END OF TENANCY CLEANING IS medium as this will allow the cleaner the time needed to perform a deep clean. Please check Fly cleaner guidelines"},
        {id: 12,
          question: "Do cleaners bring their own equipment?",
          answer: "If you do not have your own equipment, please request a cleaner to provide a hoover and a mop while placing an order. You will be charged additionally for an order with the equipment."},
        {id: 13,
          question: "Can you clean the balcony?",
          answer: "When making your booking, just leave this request in comments if you need to clean a balcony. Be aware it can take additional time to your estimated booking time."}

      ]
    },
    {
      id: 4,
      category: "Payments",
      questions: [
        {
          id: 1,
          question: "How do I pay for cleaning?",
          answer: "We accept debit and credit cards only. Payment is made on our website via a secure 3rd party provider. Funds will only be taken from your card once the job has been completed."
        },
        {id:2,
          question: "Can I pay for cleaning by cash?",
          answer: "We accept debit and credit cards only. Cash is not accepted in order to make the process safe and transparent."},
        {id:3,
          question: "I would like a receipt",
          answer: "our receipt will be provided by email as soon as the job is complete. You can also download the VAT invoice from My Account."},
        {id:4,
          question: "Dispute ‘A Customer No-Show Up’ fee",
          answer: "A ‘No show up’ fee means that the Fly cleaner arrived at the booking location, waited for over 30 minutes, tried to contact the client a several times whilst waiting, and has informed Fly cleaner about the issue. Nobody has let the Fly cleaner in to the property and the client didn’t pick up the phone. In these cases we charge the client a cancellation fee according to our Cancellation Policy.\n" +
              "\n" +
              "If you believe there is any confusion, please get in touch with us"},
        {id:5,
          question: "Dispute a cancellation or rescheduling fee",
          answer: "We believe that your time is valuable, that is why there is the Cancellation Policy for both our clients and our Fly cleaner.\n" +
              "\n" +
              "When you cancel or reschedule a job a few hours before the start time or at the last minute, it becomes inconvenient for Fly cleaner as they may lose their earnings. Your cancellation fees cover Fly cleaners’ time and Fly cleaner platform costs.\n" +
              "\n" +
              "Please read our Cancellation Policy before cancelling the booking."},
        {id:6,
          question: "Can I change my card details once I have put it into the online system?",
          answer: "You can update your card details here as well as your other personal details. You have the option to add 3 cards, and make one them primary. The primary card will be used for all your upcoming bookings automatically.\n" +
              "\n" +
              "I received an email that Fly cleaner could not withdraw money from my card\n" +
              "We only process the payment when the cleaning has been completed and the Fly cleaner has finished and has checked out on their App. We will make up to 3 attempts during the 24-hour period to withdraw money from your card. If all three attempts have been unsuccessful, we will contact you and ask you to provide us with different card details. If we are not able to reach you by phone, we will send you an email with a request to top up your card or pay with another card.\n"},
        {id: 7,
          question: "I have been charged incorrectly",
          answer: "We’re very sorry for the confusion, please contact us  and we will get this problem sorted out ASAP\n"},
        {id:8,
          question: "How much does it cost to clean with Fly cleaner?",
          answer: "You can review the pricing here and choose a suitable rate for you."},
        {id:9,
          question: "I was charged a different amount then the original estimated amount",
          answer: "When you made a booking, our system estimated how much time we need to clean your property. Then, when the job was completed, we charged you according to the real time an Fly cleaner worked. Therefore, the final payment can be less or more than the estimated amount.  Fly cleaner are allowed to work estimated time plus one more hour. If they need more time, they must with the customer and ask Fly cleaner support update to the time of the booking. This information is provided in confirmation emails sent to the client."},
        {id:10,
          question: "I have a dispute with the time taken to clean the property",
          answer: "We send a text message to the client when the job begins and when the job ends. In a case where you don’t agree with these timings, please get in touch with us  and we will update the time spent according to your records. Incorrect timings can appear due to an Fly cleaner’s poor Internet reception when selecting to ‘Start’ or ‘Finish’ the job on our App, meaning the data was written incorrectly to our system.\n"},
        {id:11,
          question: "When I will receive the bonus which I see in the website?",
          answer: "The bonus for reaching KPIs is paid once a month at the first week of a new month. The bonus amount will be added to your account and included in your payment."}
      ]
    },
    {
      id: 5,
      category: "Solving issues with cleaners",
      questions: [
        {
          id: 1,
          question: "My cleaner never arrived",
          answer: "In this case, we will try to arrange a new booking at your convenience. In addition, a compensation will be added to your account automatically for the inconvenience."
        },
        {id: 2,
          question: "I am not satisfied with the cleaning service",
          answer: "We do our best to make our clients happy and keep working on improving the quality of our service. However, if you are not satisfied with how your home was cleaned, please, let us know as soon as possible and tell us what exactly went wrong. Please write to our Support Desk, and attach photos to show us exactly what was wrong. Be advised that we cannot accept complaints later than 48 hours after the cleaning took place. After the investigation of the case, we may send one of our supervisors to re-clean the missed areas for free. Fly cleaner doesn’t provide any refunds for our service, that is why we strongly recommend:\n" +
              "\n" +
              "If you are at home during the cleaning, always check how the job was done at the end of the cleaning. The cleaner will clean the places that you thought were not cleaned well enough again at your request.\n" +
              "If you are not home at the end of cleaning it might be more difficult to prove that the job was done incorrectly. Please be sure someone can check how the cleaning was done before the cleaner leaves your home."},
        {id:3,
          question: "The cleaner acted unprofessionally",
          answer: "Cleaners are required to maintain a high level of professionalism at all times. If the cleaner acted unprofessionally, that can have a negative effect on our clients’ trust. We apologize for this and encourage you to contact us ASAP by email and include a detailed description of what went wrong together with pictures etc."},
        {id:4,
          question: "The cleaner was late",
          answer: "We understand that your time is valuable.  If the cleaner is late, they are requested to inform the customer to avoid the inconvenience.\n" +
              "\n" +
              "When the cleaner delays the start time of the cleaning appointment by more than 30 minutes (but no more than 1 hour), a customer can request a discount which can be spent in their next order.\n" +
              "\n" +
              "If the cleaner is more than 1 hour late, we will cancel your booking and offer you to make a new booking. You will be provided a bonus to be used for your next cleaning to compensate the inconvenience caused."},
        {id:5,
          question: "The cleaner left something behind",
          answer: "We highly appreciate your cooperation. If you can still contact the cleaner over the phone, that would be the fastest way to return their things. If not, contact our Support Desk and we’ll sort it out for you."},
        {id:6,
          question: "I cannot contact the cleaner",
          answer: "Cleaners will only receive your contact details 3 hours prior to the booking. If you need to speak to them or discuss anything before, you can leave comments in your booking or contact our Support Desk and we will put you in touch with them directly."},
        {id:7,
          question: "Something was damaged or went missing",
          answer: "PLEASE BE ADVISED THAT OUR LIABILITY IS LIMITED TO THE COST OF YOUR CLEANING AND WE ASSUME NO LIABILITY FOR DAMAGE OR LOSS OF ITEMS THAT ARE NOT SECURED PROPERLY OR THAT WERE DAMAGED PRIOR TO OUR CLEANING. (Example: heavy pictures hanging from thumbtacks, any type of floating shelves, etc.) Items of value, (monetary or sentimental) should be stored away and dusted & cleaned by the owner.  In the unlikely event that something is damaged you will be required to contact our Support team immediately in order to submit a formal claim request through our insurers."},
        {id:8,
          question: "The cleaner lost my keys",
          answer: "Please note the Fly cleaner insurance does not cover the loss of the keys. The cleaner is solely responsible for the loss of the keys. If this inconvenience happens, please report it to Fly cleaner’s Support Team as soon as possible in no more than 24 hours after the cleaning.\n"}
      ]
    },
    {
      id: 6,
      category: "Complaint procedures",
      questions: [
        {
          id: 1,
          question: "Cleaning Quality",
          answer: "Our response time is 24 hours. Resolution time 2-5 days\n" +
              "\n" +
              "Our all Fly cleaners are experienced cleaners, if for some reason the cleaning quality is not up to standard then please follow our complaints process, and we will aim to resolve your issue asap.\n" +
              "\n" +
              "Send us an email within 48 hours  with a detailed description of the poor cleaning supported by picture evidence. Once we receive you email, we will investigate with the cleaner and get the cleaners feedback. When we receive this feedback, we will then look at all evidence and offer a proposed solution of the situation.\n" +
              "\n" +
              "Please be aware we do not provide refunds according our Booking Policy."
        },
        {id:2,
          question: "Item Missing",
          answer: "Our response time is 24 hours. Resolution time  2-5 days.\n" +
              "\n" +
              "Although our cleaners’ are background checked, we strongly advise all customers to securely store away any items of value that can be easily stolen including cash /credit cards. These items should be stored in a secure location.\n" +
              "\n" +
              "According to the Booking Terms and Conditions, Fly cleaner will not be liable for missing items unless you have credible evidence that the item was taken by the cleaner. Any liability on our part is limited to the cost of the cleaning.\n" +
              "\n" +
              "If you find that something was missed from your property after the cleaning took place, please report us within 48 hours:\n" +
              "\n" +
              "send us email with a clear description of the missing item including the value and location of the item including the evidence;\n" +
              "If the value of the item is more than the amount of the cleaning, we will need a completed police report with case number\n" +
              "Once we receive the relevant details we will first speak to the cleaner for feedback and after our customer support team will advise the next steps.\n" +
              "\n" +
              "NB! The cleaner was the last person in my home or nobody else but the cleaner was here is not considered as evidence.\n"
        },
        {id:3,
          question:"Damage",
          answer:"Our response time is 24 hours. Resolution time 2-5 days.\n" +
              "\n" +
              "Fly cleaner will take every care not to break or damage any of your items, however sometimes accidents can happen. We recommend that items of value, (monetary or sentimental) should be stored away and dusted & cleaned by the owner. In the unlikely event that something is accidentally damaged Fly cleaner will not be able to take any responsibility for this. Any form of damage is limited to the cost of the cleaning.\n" +
              "\n" +
              "If you find that something was damaged after the cleaning took place, please report this within 48 hours:\n" +
              "\n" +
              "please provide a clear description of the damaged item and as much detail as possible including pictures of the damaged items or areas;\n" +
              "Compensation is limited to the cost of the cleaning\n" +
              "Once we receive the relevant details we will need to get feedback from the cleaner and thereafter our customer support team will advise how to proceed.\n"
        },
        {id:4,
          question:"Cleaner’s behaviour",
          answer: "Our response time is 24 hours. Resolution time  2-5 days\n" +
              "\n" +
              " \n" +
              "\n" +
              "Fly cleaner expects cleaners to remain professional at all times. In the event of a complaint about a cleaner’s behaviour Fly cleaner will investigate this complaint and take the necessary internal action against the cleaner. This can depend on the seriousness of the complaint.\n" +
              "\n" +
              "If you faced any unprofessional behaviour behalf of the cleaner, please report us within 48 hours after the accident took place:\n" +
              "\n" +
              "Describe in detail the circumstances surrounding why you believe the cleaner was unprofessional.\n" +
              "Fly cleaner will investigate with the cleaner and allow the cleaner to provide feedback\n" +
              "\n" +
              "Fly cleaner will make a decision and email the customer the outcome."
        },
        {id:5,
          question:"Time dispute",
          answer: "Our response time is 24 hours. Resolution time is 48 hours.\n" +
              "\n" +
              " \n" +
              "\n" +
              "Fly cleaner charges clients according to the real time a cleaner worked at the client’s property. When the cleaner arrives to the client, he/she presses ‘Start’ on the App and ‘Finish’ at the end o of the job.\n" +
              "\n" +
              "The client receives a text message about the start and finish of the job. In the event of a complaint with timing.\n" +
              "\n" +
              "Please report your dispute within 48 hours. (we cannot make any adjustments after this time)\n" +
              "\n" +
              "Please let us know exactly what time the cleaner arrived and left.\n" +
              "\n" +
              "Fly cleaner will get feedback from the cleaner and update the time as necessary."
        }
      ]
    }
  ];
  const faqCategoriesCleaners = [
    {
      id: 1,
      category: "General",
      questions: [
        {
          id: 101,
          question: "Blog Fly cleaner platform",
          answer: "Fly cleaner is an online app that connects customers and professional cleaners. Fly cleaner acts as a powerful platform arranging fast and high-quality service for the customers, where safety is our priority. Cleaners work as independent cleaning partners. They access the Fly cleaner platform where they pick up customers' orders that have been booked via the Fly cleaner website."
        },
        {
          id: 102,
          question: "What's the difference between Fly cleaner and a cleaning agency?",
          answer: "Fly cleaner is an agent that connects customers and professional cleaners. We are a platform that allows customers to request cleaning services working alongside with you, our independent cleaners that can pick up these orders. At the same time, Fly cleaner acts as a third-party provider that promotes high standards of quality, safety and an accurate price list of the services we provide to our customers."
        },
        {id: 103,
          question: "How are Fly cleaners matched with customers?",
          answer: "When a customer books a cleaning service on the Fly cleaner Platform, their order becomes available for all cleaners who are ‘online’ on their Fly cleaner website. As soon as the cleaner accepts the job they are assigned to the booking, please note this is appointed on a first come first serve basis.",},
        {id: 104,
          question: "How can I contact Fly cleaner?",
          answer: "At Fly cleaner our best way of communication is via Text or an email. Before reaching out to us, please have a look at our FAQs for Fly cleaner on the website or in your Mobile App. It’s possible you may find your answer without having to wait for our response."},
        {id: 105,
          question: "Fly cleaner Service Agreement",
          answer: "Fly cleaner Service Agreement is the contract that governs the use of the platform for independent cleaners.  When you upload your documents on the website you must agree to the terms and conditions within that agreement.",},
        {id: 106,
          question: "Сancellation Policy",
          answer: "The Fly cleaner platform is designed to be as flexible as possible. We can understand that changes may occur. However, customers should not suffer because of last-minute cancellations by Fly cleaner. If you cancel a job less than 24 hours before the start time, you will be subject to late cancellation fees. You can find the Fly cleaner Cancellation Policy in your Service Agreement on the website"},
        {id: 107,
          question: "Why I am deactivated from Fly cleaner Platform?",
          answer: "Either you have chosen not to work for Fly cleaner anymore or we have deactivated you because of inactivity or a violation of Fly cleaner rules. If you feel this is an error, then please contact the Fly cleaner support team via Telegram."},
        {id: 108,
          question: "What’s the Insurance Policy?",
          answer: "The Fly cleaner insurance policy covers costs for death or bodily injury, or damage to third party property arising in the course of your business including the supply of products (Public & Products liability).\n" +
              "\n" +
              "The insurance policy excludes the first £250. Therefore, the cleaners, being independent contractors, are responsible for damages up to £250.\n" +
              "\n" +
              "In case a cleaner does not admit the fault, Fly cleaner makes a decision based on the evidence supplied by a customer and a cleaner.\n" +
              "\n" +
              "Fly cleaner doesn’t cover any damage even above £250 if you have used non-authorized cleaning products . In the case of damage less £250 the cleaner will compensate the client’s invoice themselves or the relevant amount can be deducted from the upcoming Fly cleaner payments."},
        {id: 109,
          question: "What should I clean if the customer books an end of tenancy cleaning?",
          answer: "Please make sure you read attentively the checklist below before the cleaning to avoid any complaints. Please remember to bring all necessary cleaning products and cloths with you for the cleaning. When you finish the cleaning, you must take a 1-2-minute video and pictures of most important areas to avoid any misunderstanding "},
        {id: 110,
          question: "What should be done if ironing service is in the booking?",
          answer: "First, get that ironing board straight Before getting started, make sure that your ironing board surface is flat, even and tightly wrapped with a good-quality cover 2. Start with a clean base plate of the iron The most common mistake is not checking the sole plate for stains before going to town "},
        {id: 111,
          question: "What should be done if laundry is in the booking?",
          answer: "Read care label sewn into most garments and separate items according to care instructions Remove items with “dry-clean only” labels. Set aside to take to a professional dry cleaner. Items labelled “hand-wash” should be washed by hand unless your washing machine includes a hand-wash cycle"},
        {id: 112,
          question: "What does carpet&upholstery washing service include?",
          answer: "Remove all loose dirt, debris and pet hair before cleaning the carpet. Hoovering the floor before a deep cleaning is an important first step to take, if you don’t properly hoover your carpet, all the dust, dirt, and hair caught in the carpet will end up in the cleaning machine that you use"},
      ]
    },
    {
      id: 2,
      category: "Prospective Cleaners",
      questions: [
        {
          id: 601,
          question: "What checks do I need to become a cleaner?",
          answer: "You'll need to provide documents and pass an interview. After a successful test job (paid if satisfactory), you'll get full platform access."
        },
        {
          id: 602,
          question: "How do I become a Fly cleaner?",
          answer: "Apply via website. Requirements: 1+ year domestic cleaning experience, fluent English. £20 deposit required after interview before getting app access."
        },
        {
          id: 603,
          question: "How long does application take?",
          answer: "Typically 1-4 days post-interview. Email for updates."
        },
        {
          id: 604,
          question: "What does Self-Employment mean?",
          answer: "You're responsible for taxes, time management, and work decisions. Must register with HMRC before starting work."
        },
        {
          id: 605,
          question: "What's the pay rate?",
          answer: ""
        },
        {
          id: 606,
          question: "What documents do I need to apply?",
          answer: "Passport/birth certificate, work permit (if needed), NI number, proof of address, recent DBS check, self-employment number. Upload documents beforehand to save time."
        },
        {
          id: 607,
          question: "How to reschedule an interview?",
          answer: "Use the calendar link from your email or contact us by email to change your appointment time."
        }
      ]
    },
    {
      id: 3,
      category: "Cleaning Products",
      questions: [
        {
          id: 608,
          question: "Are the cleaning products given for free or do I have to purchase them?",
          answer: "You need to buy the cleaning products yourselves."
        },
        {
          id: 609,
          questions: "What if the client wishes to use their own cleaning products?",
          answer: "When you arrive at the client, you always should inform them that you have your own cleaning products. Also, you should ask if the client wish you use their cleaning materials. If the client prefers to use own products, you’re the clients’ stuff."
        }
      ]
    },
    {
      id: 4,
      category: "Before the Job",
      questions: [
        {
          id: 610,
          question: "I am running late",
          answer: "If you are running late, for whatever reason, even if it is just a few minutes, please contact the customer immediately and apologise and inform them about your delay. Please be aware that if you are late by more than 30 mins, you will have a penalty fee for ‘late arrival’. So, plan your route in advance to ensure you arrive on time."
        },
        {
          id: 611,
          question: "The customer cancelled the order while I was on my way there or just arrived",
          answer: "This may happen sometimes. In this case, you will be paid anyway. We have a Cancellation Policy for customers as well as for cleaners. You will receive the compensation according to the Cancellation Policy. Review the section ‘Fees & Compensations’ to find out the amount of your compensation."
        },
        {
          id: 612,
          question: "What to do if I am allergic to pets?",
          answer: "When you review an order, you can see the comments if a customer has any pets. If you are allergic to pets, then it’s simple, do not accept the job."
        },
        {
          id: 613,
          question: "How can I see the job details?",
          answer: "You can find all the details about a job (eg. postcode, address, estimated duration and estimated payment, cleaning items, date and time) in the ‘New Orders’ section when you review a new job on the App. To ensure customers’ privacy, we disclose their details such as a name and contact phone 3 hours before the start time. That will allow you to plan your route in advance and to contact the customer if needed."
        },
        {
          id: 614,
          question: "Can I reschedule the accepted job?",
          answer: "Unfortunately, no. However, you can report to the Fly Cleaner in text to find out the customer’s availability to reschedule the job. If the time of the job cannot be changed and you need to cancel, please review the section ‘Fees & Compensations’ in your App before cancellation to avoid any unexpected penalty fees."
        },
        {
          id: 615,
          question: "How can I contact my customer?",
          answer: "Three hours before the booking, you will be able to see the customer’s contact details in your Mobile App. We recommend you send a message to the customer to introduce yourself and to confirm your expected arrival time."
        },
        {
          id: 616,
          question: "I need to cancel the job",
          answer: "If you need to cancel a job after you accepted it, you can cancel it in your Fly Cleaner App. Review the section ‘Fees & Compensations’ in your App before cancellation to avoid any unexpected penalty fees."
        },
        {
          id: 617,
          question: "The job time seems incorrect",
          answer: "If the time doesn’t match the time you have received via the push notification or if displayed incorrectly, then firstly please check the time zone setting on your smartphone. If you are still unsure, contact the Fly Cleaner via text to clarify the time or contact the customer to re-confirm the time."
        },
        {
          id: 618,
          question: "I am lost",
          answer: "Before starting your journey to the client’s home, check the area using an online map. If you are unsure about the location, please contact the client directly to verify the details. Pay attention to the comments on the actual order. Sometimes clients leave the correct address or additional information in the comments section. Again, if you are going to be late then please contact the customer directly to let them know the situation. It will reduce any negative ratings you may receive from the customer and avoid the late arrival fee."
        },
        {
          id: 619,
          question: "The client wants me to pick up the keys to access their property",
          answer: "Be aware that you are fully responsible for the client’s keys if you pick them up. In the case of loss of the keys, you will have to reimburse the customer for this loss on your own."
        }
      ]
    },
    {
      id: 5,
      category: "How to Clean",
      questions: [
        {
          id: 620,
          question: "General rules",
          answer: "If you don’t have any particular instructions from the client, start from the dirtiest room (often the kitchen). Always clean from top to bottom. Begin with surface cleaning and furniture dust wiping. Before wiping the dust, remove all items from the surface. Wipe dust with a slightly wet or dry, clean cloth, and use special cleaning equipment if required. Use different cloths for the bathroom, the kitchen, and other rooms. Clean all taps and other chromic equipment to make them shine and polish with a paper towel or dry cloth. Clean wooden furniture with an almost dry cloth only. Always clean under the bed and other reachable furniture. Be careful with laminated or parquet floors — squeeze the cloth dry and mop twice. When mopping, the cloth must be wet but not dripping to prevent water from seeping into floor cavities. Move all items, clean skirting boards, and always mop last. Even though we use eco-friendly products, we recommend using gloves."
        },
        {
          id: 621,
          question: "Kitchen",
          answer: "Recommended products: Amway Kitchen Cleaner L.O.C.™, Glass Cleaner L.O.C.™. Wipe all accessible surfaces including windowsills, switches, and tiles from top to bottom. Clean the sink. Wash up or load the dishwasher. Clean outside the stove, countertop, and fridge. Polish the taps and wipe the sink again. Take out the trash and replace the bin bag. Mop the floor. Wipe the door handles. If cleaning inside cabinets or the fridge is requested, do this first: remove everything, clean inside, and return items to their places."
        },
        {
          id: 622,
          question: "Bathroom and toilet",
          answer: "Recommended products: Amway Bathroom Cleaner L.O.C.™, Amway Glass Cleaner L.O.C.™, Amway Toilet BOWL Cleaner. Wipe all accessible surfaces including windowsills, switches, and tiles from top to bottom. Clean mirrors and glass surfaces. Wipe cabinets. Wash the bath. Sweep or hoover the floor and rug first, then mop. Clean the toilet. Wipe door handles. Clean the toilet floor last to avoid using dirty water from other rooms."
        },
        {
          id: 623,
          question: "Bedroom, living, dining rooms",
          answer: "Recommended products: Glass Cleaner L.O.C.™, Multi-Purpose Cleaner L.O.C.™. Wipe dust from all accessible surfaces including windowsills, switches, and lighting (not the ceiling). Clean mirrors and glass surfaces. Arrange clothes and items neatly. Make the bed and change sheets if needed. Hoover the floor and rugs if available. Take out trash. Mop the floor. Clean door handles before leaving."
        },
        {
          id: 624,
          question: "Hall",
          answer: "Recommended products: Glass Cleaner L.O.C.™, Multi-Purpose Cleaner L.O.C.™. Wipe dust from all accessible surfaces from top to bottom. Clean mirrors and glass surfaces. Hoover rugs and the floor. Clean switches and door handles. Mop the floor. Arrange client’s shoes."
        },
        {
          id: 625,
          question: "Stairs",
          answer: "Recommended products: Multi-Purpose Cleaner L.O.C.™. Wipe the railings first, then mop or hoover the stairs."
        },
        {
          id: 626,
          question: "Windows",
          answer: "Recommended products: Amway Glass Cleaner L.O.C.™, Multi-Purpose Cleaner L.O.C.™. Clean the window frame. Wash the glass with Amway Glass Cleaner L.O.C.™ using a wet cloth. Wipe glass with a dry cloth or paper towel."
        },
        {
          id: 627,
          question: "Fridge",
          answer: "Recommended products: Amway Kitchen Cleaner L.O.C.™. Remove all items from the fridge. Clean inside. Throw out expired food (ask the client first or return everything if unsure). Put all items back when finished."
        },
        {
          id: 628,
          question: "Microwave",
          answer: "Recommended products: Microwave – Kitchen Cleaner. Apply the product to surfaces and leave for 10–20 minutes. Clean with water and a cloth."
        },
        {
          id: 629,
          question: "Bookcases",
          answer: "Recommended products: Multi-Purpose Cleaner L.O.C.™. Remove books, wipe dust on shelves and books if needed, return books to the same place, and clean shelf by shelf."
        }
      ]
    },
    {
      id: 6,
      category: "On the Job",
      questions: [
        {
          id: 630,
          question: "Wearing the branded uniform",
          answer: "Wearing the branded uniform is mandatory. This is a rule described in your Service Agreement. Always put on Fly Cleaner uniform – t-shirt and an apron. At least one of these items should be on you when you work. When you wear the uniform, you look professional and it is instantly recognisable that you represent Fly Cleaner. Fly Cleaner may ask you to send pictures from the job of you in the uniform from time to time."
        },
        {
          id: 631,
          question: "Changing footwear",
          answer: "Always have slippers or extra shoes with you when going to a job. Every client is different — some of them may ask you to take off your shoes. It is more professional when you are prepared for this."
        },
        {
          id: 632,
          question: "I broke or damaged something. What do I do?",
          answer: "If you broke or damaged something during the cleaning, show the customer what has happened immediately and then inform the Fly Cleaner Support Desk as soon as possible by email or via Live Chat on your Fly Cleaner app. Take some pictures of the damages. If the client is not at home, text or call them to let them know about the issue, attach pictures and ask them to contact Fly Cleaner to report the case."
        },
        {
          id: 633,
          question: "If a client is not at home",
          answer: "If a client is not at home, you must call or text the client to clarify or confirm what you need to do. Take pictures before and after the job so that you have proof in case of any disputes."
        }
      ]
    },
    {
      id: 7,
      category: "After the Job",
      questions: [
        {
          id: 634,
          question: "How can I rate the customer?",
          answer: "When you are finishing a job, you should rate the client after you have clicked ‘Finish’."
        },
        {
          id: 635,
          question: "How to finish work?",
          answer: "When you have completed the work, please ask the client to review what you have done. Clarify with the customer that you have done everything they expected. Ask the client to check every room you have cleaned and re-clean if needed. Once all these steps are completed: rate the client on your Fly Cleaner App, press ‘Finish’ when you have completed the job, put your uniform and cleaning materials into your backpack, and say ‘goodbye’ to the client."
        },
        {
          id: 636,
          question: "How can I find out if the customer has rated me?",
          answer: "Yes. Customers can rate cleaners, but cleaners cannot see how they were rated for every individual job. If you receive a rating below 3, Fly Cleaner will contact you to discuss what went wrong with a particular client."
        }
      ]
    },
    {
      id: 8,
      category: "Communication with the Client",
      questions: [
        {
          id: 637,
          question: "Before you start working",
          answer: "When you arrive at the customer’s place, check if the requested service matches the reality. Discuss with the customer what you have to clean, tell them how much time the cleaning will take and what the cleaning process will be. Change your clothes, put on the uniform, prepare cleaning materials, and press ‘Start’ on the application on your smartphone."
        },
        {
          id: 638,
          question: "Be Professional",
          answer: "Communication is key to success and is essential to establish trusted relationships between a cleaner and a customer.\n\nTips to build trust and receive a high rating:\n- Be on time (arrive 10 minutes early if possible). If you are even 10 minutes late, call the customer and notify them when to expect you.\n- Be polite and calm in all situations.\n- Make eye contact when speaking to the client.\n- Don’t interrupt the client.\n- Use the client’s name when speaking to them.\n- Be sincere, friendly, and smile.\n- Ask qualifying questions when discussing cleaning details."
        },
        {
          id: 639,
          question: "After you have completed the job",
          answer: "When you have done your job, ask the client to check if everything is OK. Invite the customer to check every room, show what you have done, and ask if anything needs to be cleaned again. Press ‘Finish’ when you have completed the job. Put your uniform and cleaning materials into your backpack, say ‘goodbye’ to the client, and rate the client on your My App."
        }
      ]
    },
    {
      id: 9,
      category: "My App",
      questions: [
        {
          id: 640,
          question: "How can I see the job details?",
          answer: "You can find all the details about a job (e.g. postcode, address, estimated duration and estimated payment, cleaning items, date and time) in the ‘New Orders’ section when you review a new job on the My App. To ensure customers’ privacy, we disclose their details such as a name and contact phone 3 hours before the start time. That will allow you to plan your route in advance and to contact the customer if needed."
        },
        {
          id: 641,
          question: "Can I reschedule the accepted job?",
          answer: "Unfortunately, no. However, you can report to Fly Cleaner in Text to find out the customer’s availability to reschedule the job. If the time of the job cannot be changed and you need to cancel, please review the section ‘Fees & Compensations’ in your App before cancellation to avoid any unexpected penalty fees."
        },
        {
          id: 642,
          question: "How can I contact my customer?",
          answer: "Three hours before the booking, you will be able to see the customer’s contact details in your My App. We recommend you send a message to the customer to introduce yourself and to confirm your expected arrival time."
        },
        {
          id: 643,
          question: "How to login to the App?",
          answer: "To login to the My App, you need to be authorised with Fly Cleaner first. Once you have been authorised you will be asked to enter your mobile number after which we will send you a text message with a verification code which is only valid for 5 mins. After you enter this code, you will be able to login to the Fly Cleaner platform."
        },
        {
          id: 644,
          question: "I cannot view the customer’s contact details",
          answer: "You will only be able to view the customer’s contact details 3 hours before the job can start. Good Fly Cleaners should always text/call the customer to say “Hi” and confirm your arrival for later on."
        },
        {
          id: 645,
          question: "How to view and accept a job?",
          answer: "You will only be able to view the customer’s contact details 3 hours before the job can start. Good Fly Cleaners should always text/call the customer to say “Hi” and confirm your arrival for later on. Then check the section ‘Orders’ -> New Orders. If there is any new job on the platform you will see it on the list."
        },
        {
          id: 646,
          question: "I accepted a job accidentally",
          answer: "To accept the job you need to click ‘Accept’ on the job tab. If you don’t plan to do the job, please cancel it as soon as possible. Be aware that customers get a confirmation email every time you accept a job. When you cancel the job and nobody else accepts it again, Fly Cleaner loses a customer. Contact the support team if you get a penalty fee for the cancellation to find out if there is any option to remove it."
        },
        {
          id: 647,
          question: "I see a job in my calendar but I have not accepted it",
          answer: "It is possible that you may have accepted the job unknowingly. In this case, please cancel this job if it is 12 hours before the start. Otherwise, please contact the Fly Cleaner Support Team via Live Chat on your Fly Cleaner app."
        },
        {
          id: 648,
          question: "I do not receive notification email",
          answer: "If you do not receive notification email about new jobs, it can be for a few reasons:\n- You have no Internet reception. Be sure your signal is strong enough.\n- There aren’t any new jobs on the Fly Cleaner platform at this moment.\nAlso, a bad Internet connection may affect receiving an email notification, so we suggest you double check ‘New Orders’ manually in the ‘New Orders’ tab. You can also ‘Logout’ and ‘Login’ again. That should help."
        },
        {
          id: 649,
          question: "I see the time has changed for the job that I accepted in my calendar",
          answer: "The reason for this is because the client has made a request to change the time. You have 10 mins after the job time was changed to accept it. Otherwise, this job becomes available on the Platform for other Fly Cleaners. If you missed your 10 mins window, you can grab this order as usual in New Orders with no issue."
        },
        {
          id: 650,
          question: "I do not see my accepted job in my calendar anymore",
          answer: "There are several reasons for that:\n- Booking is cancelled by the Customer.\n- Booking is auto cancelled by the system.\n- Booking is cancelled by yourself.\n- Order has been moved to another date by reason of customer rescheduling.\n- If it was a double job, it could be cancelled because there wasn’t another Fly Cleaner that accepted this job.\nYou will receive PUSH notifications in all above cases. Also, you can check the lost order in the History tab. If you are unsure please contact the Support Desk by WhatsApp +44 7727 847547."
        },
        {
          id: 651,
          question: "When should I press ‘Start’?",
          answer: "You must only press ‘Start’ when you are at the customer’s property and ready to start cleaning. Don’t ‘Start’ earlier than when you arrive at the client’s place. Be aware that the client receives a text message when you press ‘Start’."
        },
        {
          id: 652,
          question: "I forgot to press ‘Start’",
          answer: "If you forgot to press start, inform the Fly Cleaner Support Team about the case by email. Write your Job ID and what time you really started. As soon as we confirm the time with the client, your job will be updated. Otherwise, if the client doesn’t confirm your ‘Start’ you will be paid only for the time according to the App. If you haven’t pressed ‘Start’ within 30 mins of the job starting, the system will give you a penalty fee equal to one hour of your payment. If you haven’t pressed start over one hour from the job start, the system will give you £40 because of ‘no show up’ and you will be deactivated from the Fly Cleaner Platform."
        },
        {
          id: 653,
          question: "I cannot press ‘Start’",
          answer: "This can happen because of bad Internet connection. In this case, inform the Fly Cleaner Support Team via Live Chat on your My app and they will press ‘Start’ instead of you."
        },
        {
          id: 654,
          question: "When should I Press ‘Finish’?",
          answer: "You must only press ‘Finish’ when you are at the customer’s property and ready to leave. Be aware that the client receives a text message with the time when you finished as soon as you press ‘Finish’ in your App."
        },
        {
          id: 655,
          question: "I forgot to press ‘Finish’",
          answer: "If you forget to press finish then you must contact the Fly Cleaner Support Team by email or via Live Chat on your My App and inform us what time you finished. Be aware that in this case your job may be limited by the estimated time only. You won’t be paid if you worked longer."
        },
        {
          id: 656,
          question: "I cannot press ‘Finish’",
          answer: "It may have happened because of a bad Internet connection. In this case, inform the Fly Cleaner Support Team via Live Chat on your My App and they will press ‘Finish’ instead of you."
        },
        {
          id: 657,
          question: "I see a job in New Orders which I want to do but for a different time",
          answer: "If you would like to re-schedule the time of a booking in new orders then please contact the Support Desk by email flyclean02@gmail.com or via Live Chat on your My App. Let us know the job ID and time you wish to reschedule. We will contact the customer to see if this is possible."
        },
        {
          id: 658,
          question: "Why am I blocked in the My App?",
          answer: "There could be a number of reasons why you could be blocked. It could be that you cancelled a job at the last minute or you didn’t show up for a job or you did something against our rules. If you are blocked you won’t be able to accept any new jobs until you are unblocked. However, you can complete all the jobs accepted earlier. If you are blocked for some reason then you must contact the Fly Cleaner Support Team by email flyclean02@gmail.com."
        },
        {
          id: 659,
          question: "Why do I see ‘Time restriction’?",
          answer: "If you see ‘Time restriction’ when you wish to accept the job, it means that you have another job which is estimated to be finished less than 3 hours before a new job you want to accept. Fly Cleaner applies this rule to prevent late arrival to clients. However, it may happen that a new job you wish to accept is not far away from your current job location and you can manage to be on time. In this case, contact the Fly Cleaner Support Desk via Live Chat on your Fly Cleaner app to check if you can be assigned to this new job."
        }
      ]
    },
    {
      id: 10,
      category: "Payment",
      questions: [
        {
          id: 660,
          question: "My payment for the job has been decreased",
          answer: "We charge clients and pay you according to the actual time you spend at the client’s home. A customer receives a text message when you pressed ‘Start’ and ‘Finish’. Please be aware that in some cases the client can state that the start and finish times are incorrect. At this point we always take the client’s word and we shall proceed to re-calculate the timings. Please understand that you always should ‘Start’ and ‘Finish’ accurately according to the actual time you stay at the client’s property."
        },
        {
          id: 661,
          question: "How are taxes handled?",
          answer: "Fly Cleaners are independent contractors who use the Fly Cleaner Cleaning Service Platform. You are responsible for paying your income taxes. We don’t withhold any taxes on your behalf. If you have any questions about paying taxes, we recommend you consult with a tax specialist."
        },
        {
          id: 662,
          question: "When do I get paid?",
          answer: "Fly Cleaner processes payment every Tuesday, 9 days after the reported week. Each week, Fly Cleaner calculates the jobs you have completed from Monday to Sunday of the week before. On the main screen of your ‘Finance’ section you can find the date of the upcoming payment, the amount and the period you will be paid for. By pressing ‘Next payout to the bank’ you can find transactions included in your upcoming payout."
        },
        {
          id: 663,
          question: "Can I get tips?",
          answer: "Currently, we don’t have an automatic option where clients can add tips via the online platform. However, if the client wishes to tip you whilst you are at their property, please feel free to accept this cash — they are rewarding your hard work."
        },
        {
          id: 664,
          question: "I was paid the wrong amount",
          answer: "If your payment amount doesn’t match the completed work you have done, please double check your transaction history to be sure you were not charged any fees. If you still believe your payment is incorrect, please send us an email to flycleaner@flycleaner.world with details about what exactly was wrong and we will reply within 3 business days."
        },
        {
          id: 665,
          question: "Will I be paid if the customer cancels or doesn’t show up?",
          answer: "It may happen that you have arrived on time, but the client is not at home, and you are unable to contact them. In this case, we recommend you wait up to 30 minutes and keep calling the customer. If you cannot reach the customer, report the issue. We will close the job and compensate you according to the compensation rates which you can find in Docs -> Fees & Compensations."
        },
        {
          id: 666,
          question: "Why did I stop receiving payments?",
          answer: "If you stopped receiving payments, it may mean that you haven’t completed any job during the reported week or you had a penalty fee which reduced your weekly payment to £0. Please check your transaction history before contacting the support team by email flycleaner@flycleaner.world. We will reply to you within 3 business days."
        },
        {
          id: 667,
          question: "I need a proof of contractor status",
          answer: "All Fly Cleaners are independent contractors. If you need an official letter that you are an independent contractor, please send us a request to flycleaner@flycleaner.world and we will send you a letter within 3 business days."
        },
        {
          id: 668,
          question: "What are the accepted payment methods?",
          answer: "We transfer your earnings directly to your bank account which you provided when you joined the platform."
        },
        {
          id: 669,
          question: "I need payslip",
          answer: "You work as a self-employed individual with Fly Cleaner. We don’t provide any payslip as it is available only for employees. But if you need proof of your earnings with Fly Cleaner, please send us a request to flycleaner@flycleaner.world and we will send it within 3 business days."
        },
        {
          id: 670,
          question: "How payment is calculated",
          answer: "The payment is calculated based on all transactions that took place within the reported week minus deductions of penalty fees and credits you could have within the current week. You can check what exactly is included in your upcoming payment by clicking ‘Next payout to the bank’."
        },
        {
          id: 671,
          question: "Why does the amount of ‘next payout’ differ from my balance?",
          answer: "Fly Cleaner pays you weekly for the completed week, 9 days after the week is closed. This weekly payment is shown on the main screen of the ‘Finance’ section in your App. The balance is all the money which are on your balance in Fly Cleaner’s App which haven’t been paid yet. As soon as Fly Cleaner transfers money to your bank account, this amount is removed from your App and your balance decreases for this paid amount."
        },
        {
          id: 672,
          question: "What does ‘calculating’ mean on the button ‘Next payout to the bank’?",
          answer: "From Wednesday to Friday Fly Cleaner calculates your payment which will be transferred to your account on the upcoming Tuesday. During this period, the payout amount is not available and you can see ‘calculating’ on the screen."
        },
        {
          id: 673,
          question: "What does ‘Correction’ mean in my transaction history?",
          answer: "This kind of transaction can mean, for example, your time at your job has been updated or a mistaken penalty fee has been removed from your balance."
        },
        {
          id: 674,
          question: "What does ‘Credit’ mean?",
          answer: "Your credit balance includes credits which Fly Cleaner gives you to cover the cost of cleaning products. Also we give you a credit to cover penalty fees if you don’t have enough money on your main balance to cover it."
        },
        {
          id: 675,
          question: "When will I receive the bonus which I see in My App?",
          answer: "The bonus for reaching KPIs is paid once a month in the first week of a new month. The bonus amount will be added to your account and included in your payment."
        }
      ]
    },
    {
      id: 11,
      category: "Fees",
      questions: [
        {
          id: 676,
          question: "What are fees?",
          answer: "There are some deductions and fees that Fly Cleaner makes for these reasons:\n\n- one-off fee for the welcome cleaning kit\n- one-off fee for criminal check (if not provided)\n- penalties fees for breaking the Fly Cleaner rules and regulations"
        },
        {
          id: 677,
          question: "What is the deposit for?",
          answer: "At the interview we provide you with the backpack of cleaning products and the uniform. To be sure that you are a reliable partner and intend to work with us, we ask you to provide us with a refundable deposit of £40. If you disappear after you join Fly Cleaner (that happens sometimes), the deposit will cover Fly Cleaner’s cost for the backpack, the uniform and the cleaning products. Also, if you accept a job and cancel it in the last minute, Fly Cleaner can use your deposit to cover the penalty fee if you don’t have enough money on your balance.\n\nThe balance of the deposit has always to be £40 to be eligible to accept jobs.\n\nIf you decide to leave Fly Cleaner Platform after authorization your deposit will be given back to you."
        },
        {
          id: 678,
          question: "How can I receive my deposit back?",
          answer: "If you decide to leave the platform, you can get your deposit back.\n\n- If Fly Cleaner has withdrawn money for your cleaning kit before you decide to leave, you receive your deposit back in full.\n- If you decide to leave Fly Cleaner only after one or two completed jobs, we will take some money for used cleaning products (£10-£30) in case you bring the backpack with the cleaning products back to Fly Cleaner’s office. Please return the backpack clean and with all bottles provided at the skills assessment.\n- If you completed over two jobs and decided to leave Fly Cleaner, you will be deducted the full amount of the cleaning kit (£30). In this case you don’t need to bring the backpack to the office. Your remaining £10 will be transferred to your bank account together with all the money you earned on the Fly Cleaner platform."
        },
        {
          id: 679,
          question: "What is the criminal check fee?",
          answer: "Fly Cleaner charges a fee for a criminal disclosure check. This fee will be withdrawn from your account when you have worked and earned a balance over £100.\n\nWhen you are uploading your documents on the website, we ask you about your background information, relying on your honesty. The criminal check status is checked later after you have been authorised. Please keep in mind that if you have not been honest about any criminal activities, we will not only withdraw the fee from your account but also deactivate you from the Fly Cleaner platform.\n\nIf you have a criminal check document, please send or bring us a copy of this document. In this case, we will not need to do a criminal check for you."
        },
        {
          id: 680,
          question: "What is the late cancellation penalty fee?",
          answer: "Every time a Fly Cleaner refuses to attend a confirmed job last minute before the job it causes us great inconvenience. It can prove difficult to find another Fly Cleaner to replace you and in these cases, we must cancel the cleaning and provide compensation to the client. All penalty fees including the late cancellation penalty fee are explained in the Fly Cleaner Service Agreement and in the Cancellation Policy, which each Fly Cleaner agrees to before starting work with the Fly Cleaner Cleaning Service Platform.\n\nIf you believe a mistake has been made, and you were incorrectly charged a penalty, please contact the Fly Cleaner Support Desk."
        },
        {
          id: 681,
          question: "What is the late arrival penalty fee?",
          answer: "To be on time is a key factor when providing professional service. It is very important that you arrive on time to meet the client’s expectations.\n\nIf you arrive 30 minutes late after the booking start time and don’t check-in at the start of work, you risk receiving a penalty of 1hr.\n\nIf you understand that you may be late for more than 1 hour, contact Fly Cleaner Support Desk immediately. We will reschedule or cancel the booking. In this case, you will receive a fine according to the Cancellation Policy but will be able to continue working with the Fly Cleaner platform. In a situation where you do not inform the client and the Support Desk about your delay, we apply the ‘No Show Up’ penalty fee.\n\nIf you believe a mistake has been made, and that you were incorrectly charged a penalty, please contact the Fly Cleaner Support Desk."
        },
        {
          id: 682,
          question: "What is the ‘No Show Up’ penalty fee?",
          answer: "Fly Cleaner has a strict policy concerning failure to arrive at a customer’s home. If you missed the job and never informed Fly Cleaner and the client that you were unable to do the job in advance, it does not make a good impression on yourself and the company. Therefore, we have no tolerance for “no show” cases.\n\nUnder such circumstances, you will be charged the full price of the estimated booking and you will be deactivated from the Fly Cleaner platform forever.\n\nIf you believe a mistake has been made, and that you were incorrectly charged a penalty, please contact the Fly Cleaner Support Desk."
        },
        {
          id: 683,
          question: "What happens if I miss ‘Finish’?",
          answer: "When you are on the job, you must check-in on the Fly Cleaner App by pressing the ‘Start’ button at the beginning of the job. When you finish the job, you must press ‘Finish’.\n\nIf you did not press ‘Finish’ three times within your time at Fly Cleaner you will be fined for 3 hours in accordance with the Cancellation Policy."
        },
        {
          id: 684,
          question: "What is the cleaning materials charge?",
          answer: "When we activate a new Fly Cleaner, we provide them with a cleaning kit that includes all the necessary cleaning products for work. The fee for this package will be withdrawn from your account when you earn at least £100 with the Fly Cleaner Cleaning Service Platform.\n\nThe cost of the cleaning kit is £30. According to the Fly Cleaner Service Agreement you can only use cleaning supplies given to you by Fly Cleaner. You may receive a fine if you break this rule."
        },
        {
          id: 685,
          question: "How do I dispute a fee?",
          answer: "Fly Cleaner charges fees whenever our service standards are broken. You can familiarise yourself with all of the fees that apply to Fly Cleaners in your Fly Cleaner Service Agreement.\n\nIf you believe a mistake has been made, and that you were incorrectly charged a penalty, please contact the Fly Cleaner Support Desk."
        }
      ]
    },
    {
      id: 12,
      category: "New Fly Cleaner",
      questions: [
        {
          id: 686,
          question: "What to expect at the first cleaning job?",
          answer: "You will first need to check the location of the customer’s home and plan your route so that you arrive on time for your job. For security reasons, you will only receive the customer’s details 3 hours before the start time of the job. Once you receive the client details, we recommend you contact them to introduce yourself and confirm the details of the location and how to get into the premises.\n\nSecondly, you must ensure your cleaning kit with your branded uniform and the cleaning materials are with you in the Fly Cleaner backpack.\n\nThen, when you have arrived at the location you must press ‘Start’ on your Fly Cleaner App. When you press Start, the customer will receive a text message. From this moment onwards the time of cleaning has started.\n\nNext, ask the client to show you around and explain their requirements. Change your clothes, put on the Fly Cleaner branded t-shirt or the apron, prepare the cleaning materials and start cleaning. If the customer insists on you using their own cleaning products, then you can use them.\n\nWhen you have completed the job, ask the customer to check that you have done everything as expected. Clean again if the customer requests it.\n\nAt the end and just before you leave, you must click ‘Finish’ on your My App. That will indicate that the job is complete and the customer will be charged for your time. When you click on ‘Finish’ the customer will receive a text message, so do not click on finish after you leave as the customer will be informed.\n\nLastly, rate your client.\n\nCongratulations! Your first job is done!"
        },
        {
          id: 687,
          question: "How often should I check for orders?",
          answer: "Once you have been activated on the Fly Cleaner platform, you can accept all new orders. You’ll receive an email notification whenever new orders turn up and will be able to view them on the app. You need to make a decision quickly when you see a new order in the app, as other cleaners can pick up the job while you’re still thinking about it. At the same time, keep in mind the Cancellation Policy and think carefully before accepting orders.\n\nIf you see no new requests from customers, it means there aren’t any available orders at the moment. Wait for a while; new orders will come soon.\n\nIf you don’t receive any push-notifications."
        },
        {
          id: 688,
          question: "When do I start picking up orders?",
          answer: "Once you have been activated on the Fly Cleaner platform, you will be able to pick up new orders."
        }
      ]
    },
    {
      id: 13,
      category: "My Account",
      questions: [
        {
          id: 689,
          question: "I received an email to top up the deposit on my account",
          answer: "That can happen because you received a penalty fee and you did not have enough money on your balance to cover this penalty fee. In this case, Fly Cleaner takes this fee from your deposit and you need to top it up again. Contact the Fly Cleaner Support Desk by email at flyclean02@gmail.com to find out how you can do that."
        },
        {
          id: 690,
          question: "I want to leave the Fly Cleaner platform",
          answer: "You have decided to stop working as a Fly Cleaner and switch to another job or to do something else more important in your life at this moment. We understand that this happens sometimes. In such a case, please contact the Fly Cleaner Support Desk to refund your deposit and deactivate your account.\n\nWe wish you all the best and we will welcome you back at any point in time if you change your mind."
        }
      ]
    },
    {
      id: 14,
      category: "Complaints procedures",
      questions: [
        {
          id: 691,
          question: "Cleaning Quality",
          answer: "Our reputation is what makes Fly Cleaner successful. When you a Fly Cleaner accept a job via the Fly Cleaner Platform you are expected to uphold the reputation for Fly Cleaner. You are responsible for the cleaning quality you provide. You must be sure that the customer is happy with the service you provide. To avoid any confusion or misunderstanding, you should clarify with the customer their expectations at the beginning of the work. You should ask the customer to review your cleaning carried out at the end of the job.\n\nIf we receive a complaint about poor cleaning standards, you should expect the following actions from Fly Cleaner:\n- We will send you an email from emopper@emop.world with details of the complaint.\n- You will be invited to provide your version of events by email.\n- If the complaint is upheld, and Fly Cleaner have to compensate a client, then the relevant amount of the compensation will be deducted from your earnings.\n- You will be informed by email about the resolution of the complaint and any deduction."
        },
        {
          id: 692,
          question: "Missed item",
          answer: "Remember that many clients have cameras installed at home, and therefore can watch you as you clean their property, even when they are not at the premises.\n\nIf Fly Cleaner receive a complaint from a client that items have gone missing during cleaning, the following procedure will take place:\n- We will collect evidence from the client about the missing items;\n- We will inform you officially about the situation by email;\n- We check your balance and put on hold any payments up to £250 until the dispute is resolved (in accordance with our Terms and Conditions);\n- If the complaint is upheld, then we will agree with the client the amount of compensation;\n- We deactivate you from the Fly Cleaner Platform and make the final payout except the amount up to £250 which will cover the cost of the missed item.\n- If the complaint is not upheld then we will release the £250 back to your Fly Cleaner account."
        },
        {
          id: 693,
          question: "Damage",
          answer: "Fly Cleaner treats every damage case with professionalism and meticulous attention.\n\nIn case of receiving a complaint about a damaged item/area in the client’s property done during the cleaning, Fly Cleaner does the following actions:\n- We collect evidence from the client about the damaged item(s).\n- We will inform you officially about the situation by email.\n- We place a hold on £250 on your Fly Cleaner account until the dispute is resolved.\n- If the dispute is upheld, then we will agree a compensation amount with the client.\n- We will refund the client and subtract the compensation amount from the £250 held from your account. Any remaining funds will be transferred back to your Fly Cleaner account. If the compensation claim is more than £250, then all of the £250 held from your account will be insurance excess, and the insurance company will pay the remainder."
        },
        {
          id: 694,
          question: "Damage policy rules",
          answer: "Fly Cleaner insurance policy covers costs for death or bodily injury, or damage to third party property arising in the course of your business including the supply of products (Public & Products liability).\n\nFly Cleaner has in place an insurance policy, which excludes the first £250 of any claim. You, the Cleaner, being an independent contractor, are responsible for damages up to the first £250.\n\nIn case of damage less than £250 the cleaner compensates the client’s invoice themselves or the relevant amount can be deducted from the upcoming Fly Cleaner payments.\n\nWhere a Cleaner does not admit the fault, Fly Cleaner will make a final decision based on the evidence supplied by the client and the Cleaner.\n\nFly Cleaner does not cover any damage claim even above £250 if a Cleaner uses non-authorised cleaning products from Fly Cleaner."
        },
        {
          id: 695,
          question: "Cleaner’s behaviour",
          answer: "Fly Cleaner expects cleaners to remain professional at all times. In the event of a complaint about a Cleaner’s behaviour, Fly Cleaner will investigate this complaint and take the necessary internal action against the Cleaner. This can result in deactivation from the Fly Cleaner platform.\n\n- We will send you an email from emopper@emop.world with details of the complaint.\n- You need to provide an explanation of the situation from your side by email.\n- Fly Cleaner will decide an outcome and inform you by email.\n- In case Fly Cleaner has to compensate a client, the relevant amount of the compensation will be deducted from your earnings.\n- Complaints about conduct can result in deactivation.\n- You will be informed by email about the resolution and deduction."
        },
        {
          id: 696,
          question: "Time dispute",
          answer: "Fly Cleaner sends a text message to the customer when a cleaner presses start/finish, however it is the cleaner’s responsibility to ensure the client is aware of what time you start and finish. In the event of any time dispute, unless you can prove otherwise, the time will be updated according to the customer’s request."
        }
      ]
    },
];
  const clientQuestionIds = []
  const updatedClientIds = []
  const updatedCleanerIds = []
  const clientCategoryList = ["All"]
  const cleanerCategoryList = ["All"]
  const cleanerQuestionIds = []

  for (let i = 0; i < faqCategoriesClients.length; i++) {
    const category = faqCategoriesClients[i].category
    clientCategoryList.push(category)
    for (let j = 0; j < faqCategoriesClients[i].questions?.length; j++) {
      const id = `${category}${faqCategoriesClients[i].questions.id}`
      clientQuestionIds.push(id)
      updatedClientIds.push('noId')
    }
  }

  for (let i = 0; i < faqCategoriesCleaners.length; i++) {
    const category = faqCategoriesCleaners[i].category
    cleanerCategoryList.push(category)
    for (let j = 0; j < faqCategoriesCleaners[i].questions?.length; j++) {
      const id = `${category}${faqCategoriesCleaners[i]?.questions?.id}`
      cleanerQuestionIds.push(id)
      updatedCleanerIds.push('noId')
    }
  }

  const [showA1, setShowA1] = useState(false);
  const [isClient, setIsClient] = useState(true);
  const [isCleaner, setIsCleaner] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [clientIds, setClientIds] = useState(updatedClientIds);
  const [cleanerIds, setCleanerIds] = useState(updatedCleanerIds);
  const [clientId, setClientId] = useState( [-1,-1. -1]);
  const [clientQuestions, setClientQuestions] = useState(faqCategoriesClients);
  const [cleanerQuestions, setCleanerQuestions] = useState(faqCategoriesCleaners);
  const [activeClientCategory, setActiveClientCategory] = useState('All');
  const [activeCleanerCategory, setActiveCleanerCategory] = useState('All');
  const [allClientCategories, setAllClientCategories] = useState(clientCategoryList);
  const [allCleanerCategories, setAllCleanerCategories] = useState(cleanerCategoryList);
  const [showContact, setShowContact] = useState(false);

  const showQs = {display:'', textAlign:'start'};
  const hideQs = {display:'none', textAlign:'start'};
  const showAll = {display:''};
  const hideAll = {display:'none'};


  const handleClientCategoryClick = (category) => {
    setActiveClientCategory(category);
    const filteredCategory = []
    filteredCategory.push(...faqCategoriesClients);
    if (category === clientCategoryList[0]) {
      setClientQuestions(filteredCategory);
    }
    else {
      const update = []
      for (let j = 0; j < faqCategoriesClients.length; j++) {
        if (faqCategoriesClients[j].category === category) {
          update.push(faqCategoriesClients[j]);
        }
      }
      setClientQuestions(update);
    }
  }

  const handleCleanertCategoryClick = (category) => {
    setActiveCleanerCategory(category);
    const filteredCategory = []
    filteredCategory.push(...faqCategoriesCleaners);
    if (category === cleanerCategoryList[0]) {
      setCleanerQuestions(filteredCategory);
    }
    else {
      const update = []
      for (let j = 0; j < faqCategoriesCleaners.length; j++) {
        if (faqCategoriesCleaners[j].category === category) {
          update.push(faqCategoriesCleaners[j]);
        }
      }
      setCleanerQuestions(update);
    }
  }

  const handleClientQuestion = (id) => {
    let ids = []
    ids.push(...clientIds);
    if (ids.includes(id)) {
      for (let j = 0; j < ids.length; j++) {
        if (ids[j] === id) {
          ids.splice(j, 1);
          break;
        }
      }
    }
    else {
      ids.push(id);
    }
    setClientIds(ids);

  }

  const handleCleanerQuestion = (id) => {
    let ids = []
    ids.push(...cleanerIds);
    if (ids.includes(id)) {
      for (let j = 0; j < ids.length; j++) {
        if (ids[j] === id) {
          ids.splice(j, 1);
          break;
        }
      }
    }
    else {
      ids.push(id);
    }
    setCleanerIds(ids);
  }

  const services1 = [
    { id: 'select', icon: 'fa-home', title: 'Select service', description: 'Upholstery cleaning for surfaces', src: Upholstery },
    { id: 'Upholstery ', icon: 'fa-home', title: 'Upholstery cleaning', description: 'Upholstery cleaning for surfaces', src: Upholstery },
    { id: 'Regulqr', icon: 'fa-home', title: 'Regular cleaning', description: 'Regular cleaning for your home', src: Regular },
    { id: 'End of tenancy', icon: 'fa-couch', title: 'End of tenancy', description: 'Thorough cleaning to get your deposit back', src: EndOfTenancy },
    { id: 'Carpet', icon: 'fa-rug', title: 'Carpet cleaning', description: 'Professional deep cleaning for carpets', src: LivingRoom },
    { id: 'Deep', icon: 'fa-broom', title: 'Deep cleaning', description: 'Intensive cleaning for neglected spaces', src: Deep },
    { id: 'Office', icon: 'fa-home', title: 'Office cleaning', description: 'Detailed cleaning for office space', src: Office },
    { id: 'Same day', icon: 'fa-home', title: 'Same day cleaning', description: 'Quickly get your home in order as quickly as possible', src: Day},
    { id: 'Move in', icon: 'fa-home', title: 'Move in  cleaning', description: 'We will get your new home ready for habitaion', src: Domestic},
    { id: 'Rug', icon: 'fa-home', title: 'Rug cleaning', description: 'Professional deep cleaning for rugs', src: Rug },
    { id: 'Bathroom', icon: 'fa-home', title: 'Bathroom cleaning', description: 'We provide deep cleaning for bathrooms', src: Bathroom },
    { id: 'Kitchen deep', icon: 'fa-home', title: 'Kitchen deep', description: 'Professional deep kitchen cleaning', src: Kitchen },
    { id: 'Oven', icon: 'fa-building', title: 'Oven', description: 'Oven cleaning services', src: Oven},
  ];

  const Contact = () => {

    const [name, setName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [service, setService] = useState('');
    const [contactMessage, setContactMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (response !== null) {
        setTimeout(() => {setResponse(null)}, 4000)
      }
    }, [response]);

    const handleServiceChange = (e) => {
      const value = e.target.value;
      const newErrors = {};
      if (value === 'Select service') {
        newErrors.service = "select service";
        setService('');
        setErrors(newErrors);
        alert(value)
        return;

      }
      setService(value);

    }

    const sendMessage  = async (e) => {
      e.preventDefault();
      const newErrors = {}
      if (!contactEmail) newErrors.contactemail = 'Email address required';
      if (!phone) newErrors.phone = 'Phone number required';
      if (!name) newErrors.name = 'Name required';
      if (!service || service === 'Select service') newErrors.service = 'Select service required';
      if (!contactMessage) newErrors.contactMessage = 'Write a message';
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setLoading(true);

      const data = { email: contactEmail, customer: name, service: service, phone: phone, message: contactMessage}
      try {
        const response = await api.post('/api/send-email-to-fly-cleaner', data);
        const message = response.data.message;
        const success = response.data.success;
        setResponse(message);
        if (success) {
          setContactEmail('');
          setPhone('');
          setService('');
          setContactMessage('');
          setName('');
          setErrors(null);
        }
      } catch (error) {
        setErrors(errors);
        setResponse('Error occured');
      }finally {
        setLoading(false);
      }
    }

    return (
        <section style={{margin:'15px'}} className="main-banner">
          <div className="container">
            <div className="burden-container">
              <div className="contact-form">
                <h3>Send Us a Message</h3>
                <form onSubmit={sendMessage}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                          type="text"
                          id="name"
                          name="name"
                          value={name}
                          className="button-bg"
                          onChange={(e) => setName(e.target.value)}
                          required
                      />
                      {name.errors && <label>{name.errors}</label>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                          type="email"
                          id="email"
                          name="contactEmail"
                          value={contactEmail}
                          className="button-bg"
                          onChange={(e) => setContactEmail(e.target.value)}
                          required
                      />
                      {contactEmail.errors && <label className="error-message">{contactEmail.errors}</label>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={phone}
                          className="button-bg"
                          onChange={(e) => setPhone(e.target.value)}
                          required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="service">Service Needed</label>
                      <select
                          id="service"
                          name="service"
                          value={service}
                          className="button-bg"
                          onChange={handleServiceChange}>
                        {services1.map(plan => (
                            <option key={plan.id} value={plan.title}>{plan.title}</option>
                        ))}
                      </select>
                      {service.errors && <label>{service.errors}</label>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={contactMessage}
                        className="button-bg"
                        onChange={(e) => setContactMessage(e.target.value)}
                    ></textarea>
                    {contactMessage.errors && <label className="error-message">{contactMessage.errors}</label>}
                  </div>
                  {response && <p style={{margin:'10px'}}>{response}</p>}
                  {loading && <p style={{margin:'10px'}}>sending email...</p>}
                  <button type="submit" className="submit-button">Send Email</button>
                </form>
              </div>
            </div>
          </div>
        </section>
    )
  }


  return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh' // Ensures it takes at least full viewport height
      }}>
        <div className="service-banner">
          <section className={'support-page'}>
            <h1 className={'experience-text'} style={{ color:'darkred', padding:'8px', textAlign:'start'}}>Frequently Asked Questions</h1>
            <p className={'header-text'} style={{textAlign:'start', color:'black', padding:'10px' }}>
              There are answers for everyone whether you’re a client and having trouble ordering a cleaning or a cleaner and want to be sure that you’re following the procedure.<br/>
              Need help? <strong style={{color:'blue'}} onClick={() => navigate('/contact')}> Contact us now</strong>
              . For urgent issues, we aim to respond within minutes. Apart from that please navigate yourself through our FAQ pages
            </p>
            {showContact && <Contact />}
            <div style={{marginTop:'20px'}} className={'burden-container'}>
              <label style={{color:'blue'}} className="custom-checkbox">
                <input
                    type="checkbox"
                    checked={isClient}
                    onChange={() => {setIsAll(false); setIsCleaner(false); setIsClient(!isClient)}}
                    className="hidden-checkbox"
                />
                <span className="checkbox-custom"></span>
                Client
              </label>
              <label className="custom-checkbox" style={{color:'blue'}}>
                <input
                    type="checkbox"
                    checked={isCleaner}
                    onChange={() => {setIsAll(false); setIsCleaner(!isCleaner); setIsClient(false)}}
                    className="hidden-checkbox"
                />
                <span className="checkbox-custom"></span>
                Cleaner
              </label>
              <label className="custom-checkbox" style={{color:'blue'}}>
                <input
                    type="checkbox"
                    checked={isAll}
                    onChange={() => {setIsAll(!isAll); setIsCleaner(false); setIsClient(false)}}
                    className="hidden-checkbox"
                />
                <span className="checkbox-custom"></span>
                All
              </label>
            </div>

          </section>

          <section className={'main-banner'}  style={isClient || isAll ? showAll: hideAll}>
            <h1 className={'help-text'}>For clients</h1>
            <div className={'container'}>
              <div className={'grid-container'}  style={{marginTop:'20px'}}>
                <div style={{display: 'block',  marginTop:'20px'}}>
                  {allClientCategories.map((categoryItem, index) => (
                      <div key={index}>
                        <button onClick={() => handleClientCategoryClick(categoryItem)}
                                className={activeClientCategory !== categoryItem ? 'trapezium-button': 'trapezium-button-active'}>
                          {categoryItem}</button>
                      </div>
                  ))}
                </div>
                <div className={'question-answer-container'}>
                  {clientQuestions.map((client, index) => (
                      <div key={client.id} style={{display:'block'}} >
                        <h3 style={{marginLeft:'20px',marginTop:'20px', textAlign:'start', color:'brown'}}>{client.category}</h3>
                        {client.questions.map((clientItem, index2) => (
                            <div key={clientItem.id} className={'main-banner'} >
                              <div style={{display:'flex', justifyContent:'center'}}>
                                < FaArrowLeft style={{color:'black', width:'30px', marginTop:'24px', marginBottom:'30px'}}
                                              className={clientIds.includes(`${client.category}${clientItem.id}`) ? 'rotate-down': 'rotate-up'}
                                              onClick={() => { handleClientQuestion(`${client.category}${clientItem.id}`) }}/>
                                <div style={{display:'block', paddingLeft:'10px', paddingRight:'10px', marginTop:'20px'}}>
                                  <h4 style={{textAlign:'start'}}>{clientItem.question}</h4>
                                  <p style={clientIds.includes(`${client.category}${clientItem.id}`) ? showQs: hideQs}>{clientItem.answer}</p>
                                </div>
                              </div>
                            </div>
                        ))}
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className={'main-banner'} style={isCleaner || isAll ? showAll: hideAll}>
            <h1 className={'help-text'}>For cleaners</h1>
            <div className={'container'}>
              <div className={'grid-container'}  style={{marginTop:'20px'}}>
                <div style={{display: 'block',  marginTop:'20px'}}>
                  {allCleanerCategories.map((categoryItem, index) => (
                      <div key={index}>
                        <button onClick={() => handleCleanertCategoryClick(categoryItem)} className={activeCleanerCategory !== categoryItem ? 'trapezium-button': 'trapezium-button-active'}>
                          {categoryItem}</button>
                      </div>
                  ))}
                </div>
                <div className={'question-answer-container'}>
                  {cleanerQuestions.map((cleaner, index) => (
                      <div key={cleaner.id} style={{display:'block'}}>
                        <h3 style={{marginLeft:'20px',marginTop:'20px', textAlign:'start', color:'brown'}}>{cleaner.category}</h3>
                        {cleaner.questions.map((cleanerItem, index2) => (
                            <div key={cleanerItem.id} className={'main-banner'} >
                              <div style={{display:'flex', justifyContent:'center'}}>
                                < FaArrowLeft style={{color:'black', width:'30px', marginTop:'24px', marginBottom:'30px'}}
                                              className={cleanerIds.includes(`${cleaner.category}${cleanerItem.id}`) ? 'rotate-down': 'rotate-up'}
                                              onClick={() => { handleCleanerQuestion(`${cleaner.category}${cleanerItem.id}`) }}/>
                                <div style={{display:'block', paddingLeft:'10px', paddingRight:'10px', marginTop:'20px'}}>
                                  <h4 style={{textAlign:'start'}}>{cleanerItem.question}</h4>
                                  <p style={cleanerIds.includes(`${cleaner.category}${cleanerItem.id}`) ? showQs: hideQs}>{cleanerItem.answer}</p>
                                </div>
                              </div>
                            </div>
                        ))}
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </div>
  );
}
export default Help;