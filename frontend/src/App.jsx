import { BrowserRouter, Routes, Route, Router, useLocation } from 'react-router-dom';
import Navigation from './pages/Navigation.jsx';
import Overview from './pages/Overview.jsx';
import Locations from './pages/Locations.jsx';
import Services from './pages/Services.jsx';
import Pricing from './pages/Pricing.jsx';
import Blog from './pages/Blog.jsx';
import Gift from './pages/Gift.jsx';
import Help from './pages/Help.jsx';
import Reclean from './pages/Reclean.jsx';
import Contact from './pages/Contact.jsx';
import BecomeCleaner from './pages/Become.jsx';
import Signup from './pages/Signup.jsx';
import NotFound from './pages/NotFound.jsx';
import City from "./pages/City.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from './pages/Privacy.jsx';
import Cancellation from './pages/Cancellation.jsx';
import Booking from './pages/Booking.jsx';
import Cookies from './pages/Cookies.jsx';
import Sitemap from './pages/Sitemap.jsx';
import Admin from './pages/Admin.jsx';
import Customers from './pages/Customers.jsx';
import Cleaners from './pages/Cleaners.jsx';
import Settings from './pages/Settings.jsx';
import Reports from './pages/Reports.jsx';
import Bookings from './pages/Bookings.jsx';
import Sidebar from './pages/Sidebar.jsx';
import Postcode from './pages/Postcode.jsx';
import Assign from './pages/Assign.jsx';
import Login from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';
import Checkout from './pages/Checkout.jsx';
import TenancyList from './pages/TenancyList.jsx';
import CashBack from './pages/CashBack.jsx'
import CheckoutHome from "./pages/CheckoutHome.jsx";
import CleanerProfile from './pages/CleanerProfile.jsx';

function App() {

    return (
        <div>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/frontend/" element={<Overview />} />
                    <Route path="/frontend/cleanerprofile" element={<CleanerProfile/>} />
                    <Route path="/frontend/checkouthome" element={<CheckoutHome />} />
                    <Route path="/frontend/cashback" element={<CashBack />} />
                    <Route path="/frontend/tenancylist" element={<TenancyList />} />
                    <Route path="/frontend/checkout" element={<Checkout />} />
                    <Route path="/frontend/logout" element={<Logout />} />
                    <Route path="/frontend/login" element={<Login />} />
                    <Route path="/frontend/assign" element={<Assign />} />
                    <Route path="/frontend/postcode" element={<Postcode />} />
                    <Route path="/frontend/sidebar" element={<Sidebar />} />
                    <Route path="/frontend/bookings" element={<Bookings />} />
                    <Route path="/frontend/customers" element={<Customers />} />
                    <Route path="/frontend/cleaners" element={<Cleaners />} />
                    <Route path="/frontend/settings" element={<Settings />} />
                    <Route path="/frontend/reports" element={<Reports />} />
                    <Route path="/frontend/overview" element={<Overview />} />
                    <Route path="/frontend/locations" element={<Locations />} />
                    <Route path="/frontend/services" element={<Services />} />
                    <Route path="/frontend/pricing" element={<Pricing />} />
                    <Route path="/frontend/about" element={<Blog />} />
                    <Route path="/frontend/gift" element={<Gift />} />
                    <Route path="/frontend/help" element={<Help />} />
                    <Route path="/frontend/reclean" element={<Reclean />} />
                    <Route path="/frontend/contact" element={<Contact />} />
                    <Route path="/frontend/become" element={<BecomeCleaner />} />
                    <Route path="/frontend/signup" element={<Signup />} />
                    <Route path="/frontend/city" element={<City />} />
                    <Route path="/frontend/privacy" element={<Privacy />} />
                    <Route path="/frontend/cancellation" element={<Cancellation />} />
                    <Route path="/frontend/frontend/terms" element={<Terms />} />
                    <Route path="/frontend/cookies" element={<Cookies />} />
                    <Route path="/frontend/booking" element={<Booking />} />
                    <Route path="/frontend/sitemap" element={<Sitemap />} />
                    <Route path="/frontend/admin" element={<Admin />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>

    );
}

window.open('/pricy/cancellation', '_blank');
export default App;
