import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import LOGO from "../images/logo4.png";

const TenancyList = () => {

    const cleaningTasksByArea = [
        {
            id: 1,
            plan: "Bathrooms and toilets",
            taskList: [
                "Remove the cobweb and dust from the ceiling",
                "Clean bath and remove limescale",
                "Wash shower cabinet / screen from inside and out / de-scale",
                "Clean and disinfect toilet from inside and out",
                "Wash and de-scale sink / shine taps",
                "Wash down tiles, remove mould & wipe tiles",
                "Clean & polish mirrors",
                "Wipe cupboards/shelving/ surfaces and polish stainless steel",
                "Clean windows from inside, wipe down window sills/ window ledges",
                "Wipe down door/ frames/ skirting boards",
                "Wipe clean towel rail",
                "Wipe down extractor fan",
                "Clean plugs, light switches",
                "Hoover & mop floors"
            ]
        },
        {
            id: 3,
            plan: "Bedrooms, living room",
            taskList: [
                "Remove the cobweb and dust from the ceiling",
                "Wipe down doors and on top of doors",
                "Wipe down skirting boards all wooden furniture carefully of dust",
                "Wash windows internally including sills and ledges",
                "Clean inside & outside and on top of cupboards / wardrobes",
                "Remove cobwebs",
                "Clean coving, picture rail, cornice / curtain rails",
                "Clean & polish mirrors, pictures",
                "Clean plugs, sockets, light switches & fittings, lamp shades",
                "Clean fire surround and radiators",
                "Clean behind and under furniture",
                "Hoover upholstery",
                "Hoover and mop the floors"
            ]
        },
        {
            id: 4,
            plan: "Hallway and stairs",
            taskList: [
                "Remove Cobwebs and dust from the ceiling",
                "Clean cornice / curtain rails and picture rail",
                "Clean / polish mirrors",
                "Clean / polish windows internally, sills & ledges",
                "Upholstery is vacuumed, cushions are moved and cleaned below",
                "Wipe doors and on top of them",
                "Wipe all skirting boards and wood works of dust",
                "Wipe down banister, stairway, and railings",
                "Clean lights switches & lights fittings, plugs, lamp shades, sockets",
                "Clean behind, inside and on top of cupboards and furnishings",
                "Dust and polish all flat surfaces",
                "Hoover and mop the floors"
            ]
        },
        {
            id: 6,
            plan: "Dishwasher",
            taskList: [
                "Clean the dishwasher of food and soap deposits",
                "Remove all dirt, mildew and food deposits",
                "Inspect and clean filters",
                "Wipe the rubber seal",
                "Move it and clean underneath and behind",
                "Wipe the soap dispenser drawer and remove marks and stains",
                "Wipe down handles"
            ]
        },
        {
            id: 7,
            plan: "Washing Machine",
            taskList: [
                "Clean the drum from leftovers and stains",
                "Inspect and clean filters",
                "Inspect the rubber seal",
                "Move it and clean underneath and behind",
                "Wipe the soap dispenser drawer and remove marks and stains",
                "Clean handles"
            ]
        },
        {
            id: 9,
            plan: "Ovens and Microwaves",
            taskList: [
                "Clean and de-grease oven, extractor fan, hob and grill",
                "Clean and de-grease the microwave",
                "Scrub off food deposits and grime",
                "Clean grill pan and oven racks",
                "Clean the inner of both the oven and microwave",
                "Inspect and wipe the rubber seals",
                "Inspect and wipe all buttons",
                "Clean exterior and remove stains and marks"
            ]
        },
        {
            id: 10,
            plan: "Toaster",
            taskList: [
                "Clean, wipe and polish the exterior",
                "Remove any food deposits and bread crumb leftovers",
                "Clean within as much as possible",
                "De-grease handles",
                "Remove grime"
            ]
        },
        {id: 5,
            plan: "Appliances",
            taskList: ["Please pay extra attention to cleaning appliances"]
        },
        {
            id: 8,
            plan: "Tumble Dryer",
            taskList: [
                "Clean inside and out",
                "Inspect the rubber seal",
                "Clean the soap dispenser drawer",
                "Inspect and clean the filter"
            ]
        },
        {
            id: 2,
            plan: "Kitchen",
            taskList: [
                "Remove the cobweb and dust from the ceiling",
                "Clean both inside and outside refrigerator & freezer (defrosted in advance by customer)",
                "Clean and polish all kitchen cupboards and drawers both inside and out",
                "Microwave is wiped down inside & out",
                "Clean all sides of washing soap dispenser, machine, and filters",
                "Clean dishwasher and remove limescale",
                "Clean and degrease inside of oven, polish outside parts",
                "Clean and polish hob & grill",
                "Clean, degrease and polish extractor fan + filters",
                "Remove mould and grease from wall tiles, wash down and polish",
                "Clean exterior of all kitchen appliances such as kettle, toaster, etc.",
                "Wipe and wash down kitchen countertops",
                "Remove lime scale and polish sink / shine taps",
                "Clean windows from the inside; wipe down window sills / window ledges",
                "Wipe all woodwork (doors, door frames, skirting boards)",
                "Wipe down radiators",
                "Clean plugs, light switches",
                "Get rid of leftover rubbish",
                "Rinse out rubbish bins",
                "Hoover and mop the floor"
            ]
        },
    ];

    const links = [
        {id: 2,
            item: 'Booking Policy',
            path: '/booking',
        },
        {id: 3,
            item: 'Cancellation Policy',
            path: '/cancellation',
        },
        {id: 4,
            item: 'Cookies Policy',
            path: '/cookies',
        },
        {id: 5,
            item: 'Privacy Policy',
            path: '/privacy',
        },
    ]

    useEffect(() => {
        document.title = 'Tenancy Checklist';
    })

    return (
        <div style={{
            marginTop:'50px',
            display:'flex',
            flexDirection:'column',
            minHeight:'100vh',
        }}>
            <div className={['main-banner', 'container'].join(' ')}>
                <div className={['container', 'main-banner'].join(' ')}
                     style={{display:'flex', flexDirection: 'row', marginTop:'20px', marginBottom:'30px', maxWidth:'1200px'}}>
                    <img src={LOGO} className={'logo-icon2'}/>
                    <h2 className={'experience-text'} style={{textAlign:'start', color:'navy'}}>End of tenancy cleaning checklist</h2>
                </div>

                <p style={{marginTop:'30px'}}>
                    Fly clean professional end of tenancy cleaners follow strict company procedures and checklists to ensure you
                    receive the highest level of service. eMop cleaning list includes the areas/rooms our expert team cleans
                    while at your property. Our end of tenancy cleaning checklist is as follows:
                </p>
                <div className={'grid-container'}>
                    {cleaningTasksByArea.map(task => (
                        <div key={task.id}>
                            <h3 style={{color:'blue', marginTop:'30px', marginBottom:'10px'}}>
                                {task.plan}
                            </h3>
                            {task.taskList.map((item, index) => (<ul className={'dot-list'}><li>{item}</li></ul>))}
                        </div>
                    ))}
                </div>

                <h4 style={{marginTop:'20px'}}>Important notes</h4>
                <p style={{marginLeft:'20px', marginBottom:'30px'}}>
                    • End of tenancy cleaning requires your property to be completely empty before our Fly Cleaners arrive to clean it. The reason being it can prevent the professional cleaning.<br/>
                    • In case it is impossible your Flat/House to be emptied please ensure that you store your possessions together in room/corner<br/>
                    • The refrigerator will have to be defrosted before cleaners arrive.
                </p>
            </div>

            <section className={["footer-banner"].join(" ")}>
                <div className="container">
                    <div className="grid-container">
                        {links.map((link, index) => (
                            <div key={index.id}>
                                <Link to={link.path} target="_blank" rel="noopener noreferrer">{link.item}</Link>
                            </div>
                        ))}
                    </div>
                    <p style={{marginTop:'20px', color:"brown"}} >{new Date().getFullYear()} Flymax. All rights reserved.</p>
                </div>
            </section>
        </div>
    )
}
export default TenancyList