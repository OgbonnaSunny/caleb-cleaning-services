import React, {useState, useRef, useEffect, useForm} from "react";
import LOGO from "../images/logo3.png";


const Customer = () => {

    const topNavItems = ['New', 'Jobs', 'History'];
    const bottomNavItems = [
        {id: 1, name: 'Setting'},
        {id: 2, name: 'Finance'},
        {id: 3, name: 'Docs'},
        {id: 4, name: 'Support'},
        {id: 5, name: 'Profile'},
    ];


    return (
        <div className="sticky-nav-container">
            <nav  className='top-order-nav'>
                <div className="nav-order-content">
                    <img src={LOGO} className={'logo-icon'}/>
                    {topNavItems.map((item, index) => (
                        <div key={`top-${index}`} className="nav-order-item"
                             onClick={() => setActiveMenu(item)}>
                            <h3 style={activeMenu === item ? {color:'goldenrod', textDecoration:'underline'}: {color:'', textDecoration:'none'} } >{item}</h3>
                        </div>
                    ))}
                </div>
            </nav>

            <main className={["main-content", "main-banner"].join(" ")}>
                {activeMenu === topNavItems[0] && <NewOrders /> }
                {activeMenu === topNavItems[1] && <MyOrders /> }
                {activeMenu === topNavItems[2] && <History /> }
                {activeMenu === bottomNavItems[3].name && <SupportPage /> }
                {activeMenu === bottomNavItems[4].name && <ProfilePage /> }
                {activeMenu === bottomNavItems[1].name && <Finance /> }
                {activeMenu === bottomNavItems[2].name && <Docs /> }
                {activeMenu === bottomNavItems[0].name && <SettingsPage /> }

            </main>

            <nav  className='bottom-order-nav'>
                <div className="nav-order-content">
                    {bottomNavItems.map((item, index) => (
                        <div key={`bottom-${item.id}`} className="nav-order-item"
                             onClick={() => setActiveMenu(item.name)}>
                            <div style={activeMenu === item.name ? {color:'blue', textDecoration:'underline'}: {color:'', textDecoration:'none'}}>
                                {renderMenuIcon(item.id)}
                                <h3 style={activeMenu === item.name ? {color:'blue', textDecoration:'underline'}: {color:'', textDecoration:'none'}}>{item.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );

}
export default Customer;