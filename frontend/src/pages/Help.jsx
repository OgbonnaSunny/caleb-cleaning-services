import React,  {useState, useEffect, useRef} from 'react'
import Footer from "./Footer.jsx";
import Representative from "../images/representative.png";
import { FaArrowLeft, FaArrowRight  } from 'react-icons/fa';

const Help = () => {
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
    }
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
    for (let j = 0; j < faqCategoriesClients[i].questions.length; j++) {
      const id = `${category}${faqCategoriesClients[i].questions.id}`
      clientQuestionIds.push(id)
      updatedClientIds.push('noId')
    }
  }

  for (let i = 0; i < faqCategoriesCleaners.length; i++) {
    const category = faqCategoriesCleaners[i].category
    cleanerCategoryList.push(category)
    for (let j = 0; j < faqCategoriesCleaners[i].questions.length; j++) {
      const id = `${category}${faqCategoriesCleaners[i].questions.id}`
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


  return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh' // Ensures it takes at least full viewport height
      }}>
        <div className="service-banner">
          <section style={{padding:'10px'}}>
            <h1 className={'experience-text'} style={{ color:'darkred'}}>Frequently Asked Questions</h1>
            <h3 className={'header-text'} style={{textAlign:'start', color:'black'}}>
              There are answers for everyone whether you’re a client and having trouble ordering a cleaning or a cleaner and want to be sure that you’re following the procedure.<br/>
              Need help? <span style={{color:'navy'}}>Click here to email us</span> —
              For urgent issues, we aim to respond within minutes. Apart from that please navigate yourself through our FAQ pages
            </h3>
            <div>
              <label style={{color:'blue'}} className="custom-checkbox">
                <input
                    type="checkbox"
                    checked={isClient}
                    onChange={() => {setIsAll(false); setIsCleaner(false); setIsClient(!isClient)}}
                    className="hidden-checkbox"
                />
                <span className="checkbox-custom"></span>
                I'm a Client
              </label>
              <label className="custom-checkbox" style={{color:'blue'}}>
                <input
                    type="checkbox"
                    checked={isCleaner}
                    onChange={() => {setIsAll(false); setIsCleaner(!isCleaner); setIsClient(false)}}
                    className="hidden-checkbox"
                />
                <span className="checkbox-custom"></span>
                I'm a Cleaner
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