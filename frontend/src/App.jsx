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
import Customer from './pages/Customer.jsx';
import CleanerProfilePage from "./pages/CleanerProfilePage.jsx";
import Messages from './pages/Messages.jsx';
import { Navigate } from 'react-router-dom';
import MessageList from "./pages/MessageList.jsx";
import BookingList from "./pages/BookingList.jsx";
import NewsLetters from "./pages/NewsLettters.jsx";
import Expense from './pages/Expense.jsx';
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

function App() {

    return (
        <div>
            <Navigation />
            <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/expense" element={<Expense />} />
                <Route path="/newsletters" element={<NewsLetters />} />
                <Route path="/bookinglist" element={<BookingList />} />
                <Route path="/messagelist" element={<MessageList />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/cleanerprofilepage" element={<CleanerProfilePage />} />
                <Route path="/cleanerprofile" element={<CleanerProfile/>} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/checkouthome" element={<CheckoutHome />} />
                <Route path="/cashback" element={<CashBack />} />
                <Route path="/tenancylist" element={<TenancyList />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/assign" element={<Assign />} />
                <Route path="/postcode" element={<Postcode />} />
                <Route path="/sidebar" element={<Sidebar />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/cleaners" element={<Cleaners />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/services" element={<Services />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/about" element={<Blog />} />
                <Route path="/gift" element={<Gift />} />
                <Route path="/help" element={<Help />} />
                <Route path="/reclean" element={<Reclean />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/become" element={<BecomeCleaner />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/city" element={<City />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cancellation" element={<Cancellation />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>

    );
}

export default App;
