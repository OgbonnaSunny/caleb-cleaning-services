// components/ServiceAreas.js
import React, {useState, useEffect} from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import api from './api.js'

const ServiceAreas = () => {

    const edinburghPostcodes = [
        {
            id: 1,
            postcode: "EH1",
            category: ["Edinburgh Old Town", "Broughton", "St James Quarter", "Leith Street", "Canongate"]
        },
        {
            id: 2,
            postcode: "EH2",
            category: ["Edinburgh New Town", "Princes Street", "West End", "Financial District", "St Andrew Square"]
        },
        {
            id: 3,
            postcode: "EH3",
            category: ["Stockbridge", "Tollcross", "Fountainbridge", "West End", "Bruntsfield"]
        },
        {
            id: 4,
            postcode: "EH4",
            category: ["Cramond", "Barnton", "Davidson's Mains", "Dean Village", "Craigleith"]
        },
        {
            id: 5,
            postcode: "EH5",
            category: ["Granton", "Trinity", "Wardie", "Royston", "Pilton"]
        },
        {
            id: 6,
            postcode: "EH6",
            category: ["Leith", "Newhaven", "Bonnington", "Shore", "Restalrig"]
        },
        {
            id: 7,
            postcode: "EH7",
            category: ["Broughton", "Calton", "Easter Road", "Hillside", "Abbeyhill"]
        },
        {
            id: 8,
            postcode: "EH8",
            category: ["Newington", "Duddingston", "Southside", "Holyrood", "Willowbrae"]
        },
        {
            id: 9,
            postcode: "EH9",
            category: ["Marchmont", "Grange", "Blackford", "Sciennes", "Causewayside"]
        },
        {
            id: 10,
            postcode: "EH10",
            category: ["Morningside", "Fairmilehead", "Bruntsfield", "Greenbank", "Craiglockhart"]
        },
        {
            id: 11,
            postcode: "EH11",
            category: ["Gorgie", "Dalry", "Shandon", "Slateford", "Sighthill"]
        },
        {
            id: 12,
            postcode: "EH12",
            category: ["Murrayfield", "Corstorphine", "West Coates", "Gyle", "Saughtonhall"]
        },
        {
            id: 13,
            postcode: "EH13",
            category: ["Colinton", "Oxgangs", "Riccarton", "Currie", "Juniper Green"]
        },
        {
            id: 14,
            postcode: "EH14",
            category: ["Balerno", "Currie", "Juniper Green", "Wester Hailes", "Longstone"]
        },
        {
            id: 15,
            postcode: "EH15",
            category: ["Portobello", "Duddingston", "Joppa", "Craigmillar", "Niddrie"]
        },
        {
            id: 16,
            postcode: "EH16",
            category: ["Liberton", "Craigmillar", "Cameron Toll", "Niddrie", "Moredun"]
        },
        {
            id: 17,
            postcode: "EH17",
            category: ["Gilmerton", "Moredun", "Danderhall", "Newcraighall", "Edgefield"]
        },
        {
            id: 18,
            postcode: "EH18",
            category: ["Lasswade", "Polton", "Bonnyrigg", "Rosewell", "Eskbank"]
        },
        {
            id: 19,
            postcode: "EH19",
            category: ["Bonnyrigg", "Lasswade", "Polton", "Mayfield", "Dalkeith"]
        },
        {
            id: 20,
            postcode: "EH20",
            category: ["Loanhead", "Bilston", "Roslin", "Shawfair", "Eskbank"]
        },
        {
            id: 21,
            postcode: "EH21",
            category: ["Musselburgh", "Wallyford", "Whitecraig", "Newcraighall", "Pinkie"]
        },
        {
            id: 22,
            postcode: "EH22",
            category: ["Dalkeith", "Newtongrange", "Mayfield", "Danderhall", "Shawfair"]
        },
        {
            id: 23,
            postcode: "EH23",
            category: ["Gorebridge", "Eskbank", "Newtongrange", "Mayfield", "Arniston"]
        },
        {
            id: 24,
            postcode: "EH24",
            category: ["Rosewell", "Bilston", "Bonnyrigg", "Lasswade", "Polton"]
        },
        {
            id: 25,
            postcode: "EH25",
            category: ["Roslin", "Bilston", "Loanhead", "Eskbank", "Shawfair"]
        },
        {
            id: 26,
            postcode: "EH26",
            category: ["Penicuik", "Auchendinny", "Glencorse", "Bilston", "Roslin"]
        },
        {
            id: 27,
            postcode: "EH27",
            category: ["Kirknewton", "East Calder", "Livingston", "Mid Calder", "Pumpherston"]
        },
        {
            id: 28,
            postcode: "EH28",
            category: ["Newbridge", "Ratho", "Ratho Station", "Gogar", "Ingliston"]
        },
        {
            id: 29,
            postcode: "EH29",
            category: ["Kirkliston", "Winchburgh", "Newbridge", "Ratho", "Dalmeny"]
        },
        {
            id: 30,
            postcode: "EH30",
            category: ["South Queensferry", "Dalmeny", "Kirkliston", "Winchburgh", "Newbridge"]
        },
        {
            id: 31,
            postcode: "EH31",
            category: ["Gullane", "Dirleton", "North Berwick", "Aberlady", "Longniddry"]
        },
        {
            id: 32,
            postcode: "EH32",
            category: ["Prestonpans", "Longniddry", "Cockenzie", "Port Seton", "Tranent"]
        },
        {
            id: 33,
            postcode: "EH33",
            category: ["Tranent", "Macmerry", "Ormiston", "Pencaitland", "Elphinstone"]
        },
        {
            id: 34,
            postcode: "EH34",
            category: ["Tranent", "Ormiston", "Pencaitland", "Macmerry", "Elphinstone"]
        },
        {
            id: 35,
            postcode: "EH35",
            category: ["Tranent", "Ormiston", "Pencaitland", "Macmerry", "Elphinstone"]
        },
        {
            id: 36,
            postcode: "EH36",
            category: ["Humbie", "Saltoun", "Gifford", "Pencaitland", "Ormiston"]
        },
        {
            id: 37,
            postcode: "EH37",
            category: ["Pathhead", "Ford", "Fala", "Heriot", "North Middleton"]
        },
        {
            id: 38,
            postcode: "EH38",
            category: ["Heriot", "North Middleton", "Pathhead", "Fala", "Ford"]
        },
        {
            id: 39,
            postcode: "EH39",
            category: ["North Berwick", "Dirleton", "Gullane", "Aberlady", "East Linton"]
        },
        {
            id: 40,
            postcode: "EH40",
            category: ["East Linton", "Tyninghame", "Dunbar", "Haddington", "Whitekirk"]
        },
        {
            id: 41,
            postcode: "EH41",
            category: ["Haddington", "Athelstaneford", "East Linton", "Dunbar", "North Berwick"]
        },
        {
            id: 42,
            postcode: "EH42",
            category: ["Dunbar", "Innerwick", "Belhaven", "East Linton", "Whitekirk"]
        },
        {
            id: 43,
            postcode: "EH43",
            category: ["Walkerburn", "Innerleithen", "Traquair", "Peebles", "Clovenfords"]
        },
        {
            id: 44,
            postcode: "EH44",
            category: ["Innerleithen", "Traquair", "Walkerburn", "Peebles", "Clovenfords"]
        },
        {
            id: 45,
            postcode: "EH45",
            category: ["Peebles", "Walkerburn", "Innerleithen", "Traquair", "Clovenfords"]
        },
        {
            id: 46,
            postcode: "EH46",
            category: ["West Linton", "Dolphinton", "Carlops", "Penicuik", "Eddleston"]
        },
        {
            id: 47,
            postcode: "EH47",
            category: ["Bathgate", "Blackburn", "Whitburn", "Fauldhouse", "Stoneyburn"]
        },
        {
            id: 48,
            postcode: "EH48",
            category: ["Bathgate", "Armadale", "Blackridge", "Whitburn", "Fauldhouse"]
        },
        {
            id: 49,
            postcode: "EH49",
            category: ["Linlithgow", "Bo'ness", "Blackness", "Philpstoun", "Bridgend"]
        },
        {
            id: 50,
            postcode: "EH51",
            category: ["Bo'ness", "Grangepans", "Blackness", "Linlithgow", "Carriden"]
        },
        {
            id: 51,
            postcode: "EH52",
            category: ["Broxburn", "Winchburgh", "East Calder", "Livingston", "Pumpherston"]
        },
        {
            id: 52,
            postcode: "EH53",
            category: ["Livingston", "East Calder", "Mid Calder", "Pumpherston", "Broxburn"]
        },
        {
            id: 53,
            postcode: "EH54",
            category: ["Livingston", "Dechmont", "Broxburn", "East Calder", "Mid Calder"]
        },
        {
            id: 54,
            postcode: "EH55",
            category: ["West Calder", "Addiewell", "Polbeth", "Livingston", "Mid Calder"]
        }
    ];

    const [dataUpdate, setDataUpdate] = useState([]);
    const [postcode, setPostcode] = useState("EH1");
    const [areas, setAreaas] = useState([]);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([
        { category: "Edinburgh Old Town", value: 0.001 },
        { category: "Broughton", value: 0.001 },
        { category: "St James Quarter", value: 0.001 },
        { category: "Leith Street", value: 0.001 },
        { category: "St Andrew Square", value: 0.001 }
    ]);

    const COLORS = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800'];

    useEffect(() => {
        setLoading(true);
        api.post('/api/users/areas', {postcode: postcode})
            .then((res) => {
                const postcodes = res.data.postcodes;
                const data = [];
                if (postcodes.length <= 0) {
                    setMessage("No cleaner was found for this area.");
                    for (let i = 0; i < edinburghPostcodes.length; i++) {
                        if (edinburghPostcodes[i].postcode === postcode) {
                            const areas = edinburghPostcodes[i].category;
                            for (let j = 0; j < areas.length; j++) {
                                const area = {id: j, category: areas[j], value: 0.001};
                                data.push(area);
                            }
                        }
                    }
                }
                else {
                    for (let i = 0; i < edinburghPostcodes.length; i++) {
                        if (edinburghPostcodes[i].postcode === postcode) {
                            const areas = edinburghPostcodes[i].category;
                            for (let j = 0; j < areas.length; j++) {
                                const area = {id: j, category: areas[j], value: 20};
                                data.push(area);
                            }
                        }
                    }
                }
                setData(data);

            })
            .catch((err) => {
                console.log(err);
                setMessage("Error finding a cleaner");
            })
            .finally(() => {
                setLoading(false);
                setTimeout(() => setMessage(null), 5000);
            })
    }, [postcode]);

    return (
        <div className="service-areas card">
            <div className="card-header">
                <h2 style={{textAlign:"center"}} className={'experience-text'}>Service Areas</h2>
            </div>
            <div className="card-body">
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <label style={{width:'20%', marginRight:'10px'}}>Postcode</label>
                    <select
                        id="service"
                        name="service"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        required
                        style={{padding:'10px', backgroundColor: 'white', color:'black'}}>
                        {edinburghPostcodes.map(code => (
                            <option key={code.id} value={code.postcode}>{code.postcode}</option>
                        ))}
                    </select>
                </div>
                {loading && <p style={{margin:'15px', textAlign:'center'}}>Loading...</p>}
                {message && (<p style={{margin:'15px', textAlign:'center'}}>{message}</p>)}
                <div className="idea-container">
                    <div style={{width:'50%'}} className="areas-chart">
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div  className="areas-legend">
                        <div style={{marginBottom:'10px', display:'flex', alignItems:'center'}} >
                            <h3 style={{textAlign:'start'}}>Areas</h3>
                            <h3 style={{textAlign:'end'}}>Coverage</h3>
                        </div>
                        {data.map((item, index) => (
                            <div key={index} style={{display: 'flex', alignItems: 'center'}}>
                                <div className="area-color" style={{ backgroundColor: COLORS[index] }}></div>
                                <span>{item.category}</span>
                                <span className="legend-percent" style={{textAlign:'end'}}>{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceAreas;