import React, {useState, useRef, useEffect} from "react";
import LOGO from "../images/logo3.png";
import { MdAdd, MdRemove,  MdArrowDownward, MdArrowUpward, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import {FaCertificate, FaFileAlt, FaPoundSign, FaQuestionCircle, FaUserTie} from "react-icons/fa";


const Customer = () => {

    const topNavItems = ['Future Booking', 'History'];
    const bottomNavItems = [
        {id: 1, name: 'Account'},
        {id: 2, name: 'Finance'},
        {id: 3, name: 'Docs'},
        {id: 4, name: 'Support'},
        {id: 5, name: 'Profile'},
    ];

    const renderMenuIcon = (id) => {
        if (id === null || id === undefined) return;
        if (id === 1) {
            return <FaCertificate className={'bottom-icon'} />;
        }
        if (id === 2) {
            return <FaPoundSign className={'bottom-icon'} />;
        }
        if (id === 3) {
            return <FaFileAlt className={'bottom-icon'} />;
        }
        if (id === 4) {
            return <FaQuestionCircle className={'bottom-icon'} />;
        }
        if (id === 5) {
            return <FaUserTie className={'bottom-icon'} />;
        }
    }

    const [activeMenu, setActiveMenu] = useState(topNavItems[0]);

    useEffect(() => {
        /* const fetchCleanerData = () => {
             setIsLoading(true);
             const user1 = JSON.parse(localStorage.getItem('user'));
             api.post('/api/users/record', {email: user1.email})
                 .then(response => {
                     const { user } = response.data;
                     if (user) {
                         localStorage.setItem('user', JSON.stringify(user));
                         setValue('personal', {
                             ...getValues().personal,
                             firstName: user.firstName,
                             lastName: user.lastName,
                             phone: user.phone,
                             address: user.address,
                             email: user.email,
                             nationalInsurance: user.NIN,
                             bio: user.bio,
                             emergencyContact: user.emergency,
                         });
                         setValue('work', user.workExperience);
                         setValue('availability', user.available);
                         setValue('notifications', user.notification);
                     }
                     else {
                         setSuccessMessage('Error updating user');
                         setBgColor('red');
                     }
                 })
                 .catch(error => {
                     if (error.response.status === 401 && (user1.email === null || user1.email === undefined)) {
                         setSuccessMessage('User with the specified username not found');
                         return;
                     }
                     setSuccessMessage('Error fetching profile data')
                 })
                 .finally(() => {
                     setIsLoading(false);
                 })
         };
         fetchCleanerData();*/
    }, []);


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
                    <MdAdd />
                </div>
            </nav>

            <main className={["main-content", "main-banner"].join(" ")}>

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