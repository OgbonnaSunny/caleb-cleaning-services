// components/StatsCard.js
import React from 'react';
import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';

const StatsCard = ({ title, value, change, icon, trend }) => {

    /*
     <h2 style={{textAlign:'center', flexFlow:'1', paddingLeft:'10px'}}></h2>
    <div className={`stats-change ${trend}`}>
        {trend === 'up' && <FaArrowUp style={{ width: '10px'}} />}
        {trend === 'down' && <FaArrowDown style={{ width: '10px' }} />}
        {trend === 'neutral' && <FaMinus style={{ width: '10px' }} />}
        <span>{change}</span>
    </div>*/

    return (
        <div style={{padding:'10px', display:'flex', justifyContent:'center', flexDirection:'column', border:'dashed', alignItems:'center'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'baseline'}}>
                <h3 style={{textAlign:'center'}}>{title}<br/>
                    <label  style={{paddingRight:'10px'}}>{value}</label>
                    {trend === 'up' && <FaArrowUp className={'icon-small'} style={{ width: '10px', color:'blue'}} />}
                    {trend === 'down' && <FaArrowDown className={'icon-small'} style={{ width: '10px', color:'red'}} />}
                    {trend === 'neutral' && <FaMinus className={'icon-small'} style={{ width: '10px', color:'yellowgreen' }} />}
                    <span style={trend === 'up' ? {color:'blue'} : trend === 'down' ? {color:'red'} : {color:'yellowgreen'} }>{change}</span>
                </h3>

            </div>
        </div>
    );
};

export default StatsCard;