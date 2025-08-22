// components/Reports.js
import React, {useEffect, useState} from 'react';
import {
    FaCalendarAlt,
    FaDownload,
    FaFilter,
    FaChartBar,
    FaChartLine,
    FaChartPie,
    FaPoundSign,
    FaSearch
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import api from "./api.js";
import {date} from "yup";

const Reports = () => {
    const [activeReport, setActiveReport] = useState('revenue');
    const [dateRange, setDateRange] = useState('month');
    const thisYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const [revenueToday, setRevenueToday] = useState(0);
    const [revenueTodayChange, setRevenueTodayChange] = useState('+0%');

    const [revenueMonth, setRevenueMonth] = useState(0);
    const [revenueMonthChange, setRevenueMonthChange] = useState('+0%');

    const [expense, setExpense] = useState(0);
    const [expenseChange, setExpenseChange] = useState('+0%');

    const [monthExpense, setMonthExpense] = useState(0);
    const [monthExpenseChange, setMonthExpenseChange] = useState('+0%');

    const [bookingToday, setBookingToday] = useState(0);
    const [bookingChange, setBookingChange] = useState('+0%');

    const [monthBooking, setMonthBooking] = useState(0);
    const [monthBookingChange, setMonthBookingChange] = useState('neutral');

    const [averageRevenue, setAverageRevenue] = useState(0);
    const [averageRevenueChange, setAverageRevenueChange] = useState('+0%');

    const [loading, setLoading] = useState(false);

    const [year, setYear] = useState(thisYear);
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);
    const [thisMonth, setThisMonth] = useState(currentMonth);
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState(null);

    const [startDay, setStartDay] = useState(null);
    const [endDay, setEndDay] = useState(null);

    const [message, setMessage] = useState('');
    const [incomeData, setIncomeData] = useState([]);
    const [bookingData, setBookingData] = useState([]);
    const [label, setLabel] = useState('This Month\'s Revenue');
    const [labelHolder, setLabelHolder] = useState('');
    const [profitable, setProfitable] = useState('');
    const [profitableValue, setProfitableValue] = useState(0);
    const [yearSearch, setYearSearch] = useState(false);
    const [resetCount, setResetCount] = useState(0);
    const [dayLabel, setDayLabel] = useState('Today\'s Revenue');
    const [bookingLabel, setBookingLabel] = useState('This Month\'s Booking');
    const [dayBookLabel, setDayBookLabel] = useState('Today\'s Bookings');

    // Sample data for charts
    const revenueData = [
        { category: 'Jan', revenue: 12000 },
        { category: 'Feb', revenue: 19000 },
        { category: 'Mar', revenue: 15000 },
        { category: 'Apr', revenue: 18000 },
        { category: 'May', revenue: 21000 },
        { category: 'Jun', revenue: 25000 },
        { category: 'Jul', revenue: 22000 }
    ];

    const bookingsData = [
        { category: 'Jan', bookings: 85 },
        { category: 'Feb', bookings: 125 },
        { category: 'Mar', bookings: 110 },
        { category: 'Apr', bookings: 135 },
        { category: 'May', bookings: 155 },
        { category: 'Jun', bookings: 180 },
        { category: 'Jul', bookings: 165 }
    ];

    const serviceData = [
        { category: 'Regular Clean', value: 65 },
        { category: 'Deep Clean', value: 25 },
        { category: 'Move Out Clean', value: 10 }
    ];

    const COLORS = ['#4CAF50', '#2196F3', '#FFC107'];

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const changeLevel = (previous, current) => {
        const incomeSum = Number(current) + Number(previous);
        const incomeDiff = Number(current) - Number(previous);
        let change = (Number(incomeDiff / incomeSum) * 100) || 0;
        if (change < 0) {
            return `${Math.round(change)}%`;
        }
        return `+${Math.round(change)}%`;
    }

    const updatChartData = (income) => {
        if (!income || income.length <= 0) {
            setIncomeData([]);
            setBookingData([])
            return;
        }
        const monthlyIncomeData = Array(12).fill(0);
        const monthlyBookingData = Array(12).fill(0);

        income.forEach(item => {
            const month = new Date(item.created_at).getMonth();
            monthlyIncomeData[month] += Number(item.payment);
        });

        income.forEach(item => {
            const month = new Date(item.created_at).getMonth();
            monthlyBookingData[month] += 1;
        })

        const data = [];
        const booking = [];
        for (let i = 0; i < monthlyIncomeData.length; i++) {
            const item =  { category: labels[i], revenue: monthlyIncomeData[i].toFixed(2) };
            data.push(item)
        }
        setIncomeData(data);

        for (let i = 0; i < monthlyBookingData.length; i++) {
            const item =  { category: labels[i], bookings: monthlyBookingData[i] };
            booking.push(item)
        }
        setBookingData(booking);

    }

    const handleMonthChange = (e) => {
        e.preventDefault();
        setMonth(Number(e.target.value));
    }

    const search = () => {
        if (searching) {return;}

        if (yearSearch) {
            if (year === null || year === undefined) {
                setError('Select previous year to search record for');
                return;
            }
            setSearching(true);
            api.post('/api/revenue/month/search', {year, month})
                .then(res => {
                    const incomes = res.data.incomes[0];
                    const plans = res.data.plans;
                    const incomeMonth = incomes.selected_month_payment;
                    const lastMonth = incomes.prev_month_payment;

                    const this_month_booking = incomes.selected_month_booking;
                    const last_month_booking = incomes.prev_month_booking;

                    let av1 = (Number(incomeMonth) / Number(this_month_booking)).toFixed(2);
                    if (isNaN(av1)) {
                        av1 = 0;
                    }
                    let av2 = (Number(lastMonth) / Number(last_month_booking)).toFixed(2);
                    if (isNaN(av2)) {
                        av2 = 0;
                    }
                    setAverageRevenueChange(changeLevel(av2, av1))

                    setAverageRevenue(av1)

                    setRevenueMonth(incomeMonth);
                    setMonthBooking(this_month_booking);

                    setRevenueMonthChange(changeLevel(lastMonth, incomeMonth));

                    setMonthBookingChange(changeLevel(last_month_booking, this_month_booking));

                    if (activeReport === 'revenue') {
                        setLabel(labelHolder)
                    }
                    if (activeReport === 'bookings') {
                        if (year === null || year === undefined || year === new Date().getFullYear()) {
                            setBookingLabel('This Month\'s Bookings');
                        }
                        else {
                            setBookingLabel(`${labels[month -1]} ${year} Bookings`);
                        }
                    }

                    const mostFrequentPlan = Object.entries(plans.reduce((a, b) =>
                        (a[b.plan] = (a[b.plan] || 0) + 1, a), {})).sort((a, b) => b[1] - a[1])[0][0];

                    let freuentPlanValue = 0;
                    for (let i = 0; i < plans.length; i++) {
                        if (plans[i].plan === mostFrequentPlan) {
                            freuentPlanValue += Number(plans[i].payment);
                        }
                    }
                    const av = (freuentPlanValue / plans.length).toFixed(2);
                    setProfitable(mostFrequentPlan);
                    setProfitableValue(av)

                })
                .catch(err => console.log(err))
                .finally(() => {
                    setSearching(false);
                })
            return;
        }
        if (startDay === null || startDay === undefined) {
            setError('Select day to search record for');
            return;
        }
        setSearching(true);
        api.post('/api/revenue/month/search/day', {year, month, startDay, endDay})
            .then(res => {
                const incomes = res.data.incomes[0];
                const plans = res.data.plans;
                setRevenueToday(incomes.selected_day_income);
                let label;
                let name;
                if (activeReport === 'revenue') {
                    name = 'Revenue';
                }
                if (activeReport === 'bookings') {
                    name = 'Bookings';
                }
                if (startDay === endDay) {
                    if (year === new Date().getFullYear()) {
                        label = `${startDay} ${labels[month -1]} ${name}`;
                    }
                    else {
                        label = `${startDay} ${labels[month -1]}, ${year} ${name}`;
                    }

                }
                else {
                    if (year === new Date().getFullYear()) {
                        label = `From ${startDay} to ${endDay} ${labels[month -1]} ${name}`;
                    }
                    else {
                        label = `From ${startDay} to ${endDay} ${labels[month -1]}, ${year} ${name}`;
                    }

                }
                if (activeReport === 'revenue') {
                    setDayLabel(label);
                }
                if (activeReport === 'bookings') {
                    setDayBookLabel(label);
                }

                const mostFrequentPlan = Object.entries(plans.reduce((a, b) =>
                    (a[b.plan] = (a[b.plan] || 0) + 1, a), {})).sort((a, b) => b[1] - a[1])[0][0];

                let freuentPlanValue = 0;
                for (let i = 0; i < plans.length; i++) {
                    if (plans[i].plan === mostFrequentPlan) {
                        freuentPlanValue += Number(plans[i].payment);
                    }
                }
                const av = (freuentPlanValue / plans.length).toFixed(2);
                setProfitable(mostFrequentPlan);
                setProfitableValue(av)
            })
            .catch(err => console.log(err))
            .finally(() => {
                setSearching(false);
            })
    }

    const handleYearChange = (e) => {
        e.preventDefault();
        const year = Number(e.target.value);
        if (year === null || year === undefined || year === 0) {
            setYear(null);
            return;
        }
        setYear(year);
    }

    const handleStartChange = (e) => {
        const newStart = Number(e.target.value);
        if (newStart > endDay && endDay > 0) {
            setError('Start day cannot be after end day');
            return;
        }
        setStartDay(newStart);
    };

    const handleEndChange = (e) => {
        const newEnd = Number(e.target.value);
        if (newEnd < startDay) {
            setError('End day cannot be before start day');
            return;
        }
        setEndDay(newEnd);
    };

    useEffect(() => {
        if (startDay !== null || endDay !== null || month !== null) {
            return;
        }
        setLoading(true);
        api.post('/api/revenue/yearly', {year: year})
            .then((response) => {
                const revenueData = response.data.revenue;
                if (revenueData.length <= 0) {
                    setMessage(`No record found for ${year}`);
                }
                updatChartData(revenueData);
            })
            .catch((error) => {
                console.log(error);
                setMessage('Error while fetching yearly data');
            })
            .finally(() => {
                setLoading(false);
            })

    }, [year, resetCount])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await api.get('/api/revenue/today');
                const incomeToady = response.data.incomes[0].today_income;
                const booking = response.data.incomes[0].today_booking;
                const yesterday_booking = response.data.incomes[0].yesterday_booking;
                const yesterdayIcome = response.data.incomes[0].yesterday_income;

                setRevenueToday(incomeToady);
                setBookingToday(booking);
                setBookingChange(changeLevel(yesterday_booking, booking));

                setRevenueTodayChange(changeLevel(yesterdayIcome, incomeToady))

                response = await api.get('/api/revenue/month');
                const incomeMonth = response.data.incomes[0].this_month;
                const lastMonth = response.data.incomes[0].last_month;

                const this_month_booking = response.data.incomes[0].this_month_booking;
                const last_month_booking = response.data.incomes[0].last_month_booking;

                let av1 = (Number(incomeMonth) / Number(this_month_booking)).toFixed(2);
                if (isNaN(av1)) {
                    av1 = 0;
                }
                let av2 = (Number(lastMonth) / Number(last_month_booking)).toFixed(2);
                if (isNaN(av2)) {
                    av2 = 0;
                }
                setAverageRevenueChange(changeLevel(av2, av1))

                setAverageRevenue(av1)

                setRevenueMonth(incomeMonth);
                setMonthBooking(this_month_booking);

                setRevenueMonthChange(changeLevel(lastMonth, incomeMonth));

                setMonthBookingChange(changeLevel(last_month_booking, this_month_booking));

                response = await api.get('/api/expenses/today')
                const expenseToday = response.data.expenses[0].today_expenses;
                const expenseYesterday = response.data.expenses[0].yesterday_expenses;
                setExpense(expenseToday);

                setExpenseChange(changeLevel(expenseYesterday, expenseToday));

                response = await api.get('/api/expenses/month')
                const thisMonth = response.data.expenses[0].this_month;
                const lastMonthExp = response.data.expenses[0].last_month;
                setMonthExpense(thisMonth)
                setExpenseChange(changeLevel(lastMonthExp, thisMonth));

                response = await api.get('/api/revenue/month/profitable')
                const plans = response.data.plans;
                const mostFrequentPlan = Object.entries(plans.reduce((a, b) =>
                    (a[b.plan] = (a[b.plan] || 0) + 1, a), {})).sort((a, b) => b[1] - a[1])[0][0];

                let freuentPlanValue = 0;
                for (let i = 0; i < plans.length; i++) {
                    if (plans[i].plan === mostFrequentPlan) {
                        freuentPlanValue += Number(plans[i].payment);
                    }
                }
                const av = (freuentPlanValue / plans.length).toFixed(2);
                setProfitable(mostFrequentPlan);
                setProfitableValue(av)

            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [resetCount])

    useEffect(() => {
        document.title = 'Reports';
    })

    function CustomDatePicker() {
        const years = Array.from({length: 100}, (_, i) => new Date().getFullYear() - i);
        const days = Array.from({length: 31}, (_, i) => i + 1);
        const months = Array.from({length: 12}, (_, i) => i + 1);

        function CustomDayRangePicker() {

            return (
                <div style={{display: 'flex', flexDirection: 'row', flex:'2', gap:'5px', alignItems:'center'}}>
                    <label>From
                        <select value={startDay} onChange={handleStartChange}
                                style={{padding:'10px',backgroundColor:'#f2f2f2', color:'darkred', flex:'1'}}>
                            <option value=""></option>
                            {days.map(day => (
                                <option key={`start-${day}`} value={day}>
                                    {day}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>To
                        <select value={endDay} onChange={handleEndChange}
                                style={{padding:'10px',backgroundColor:'#f2f2f2', color:'darkred', flex:'1'}}>
                            <option value=""></option>
                            {days.map(day => (
                                <option key={`end-${day}`} value={day} disabled={day < startDay}>
                                    {day}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            );
        }

        return (
            <div style={{display: 'flex', flexDirection:'row', margin:'10px', gap:'5px', zIndex:'100', alignItems:'center'}}>
                <CustomDayRangePicker />
                <label style={{backgroundColor:'#f2f2f2', color:'darkred', flex:'1.1'}}>
                    Month
                    <select value={month}
                            onChange={handleMonthChange}
                            style={{padding:'10px',backgroundColor:'#f2f2f2', color:'darkred'}}>
                        <option value=""></option>
                        {months.map(m =>
                            <option
                                style={{backgroundColor:'#f2f2f2'}}
                                key={m} value={m}>{m}
                            </option>
                        )}
                    </select>
                </label>
                <label style={{backgroundColor:'#f2f2f2', color:'darkred', flex:'1.3'}}>
                    Year
                    <select value={year} onChange={handleYearChange}
                            style={{padding:'10px',backgroundColor:'#f2f2f2', color:'darkred'}}>
                        <option value=""></option>
                        {years.map(y => <option style={{backgroundColor:'#f2f2f2'}} key={y} value={y}>{y}</option>)}
                    </select>
                </label>
                <FaSearch onClick={search}  style={{width:'20px', marginLeft:'10px', marginTop:'10px'}}/>
            </div>
        );
    }

    const dateLabel = (year, month) => {
        if (year === new Date().getFullYear() || year === null || year === undefined) {
            return "This Month\'s Revenue";
        }
        return `${labels[month -1]}, ${year} Revenue`;
    };

    const bookLabel = (year, month) => {
        if (year === new Date().getFullYear() || year === null || year === undefined) {
            return "This Month\'s Bookings";
        }
        return `${labels[month -1]}, ${year} Bookings`;
    };

    useEffect(() => {
        setLabelHolder(dateLabel(year, month));
    }, [year, month]);

    useEffect(() => {
        if (error !== null) {
            setTimeout(() => setError(null), 5000);
        }
    }, [error])

    const handleYearSearch = (e) => {
        e.preventDefault()
        const check = e.currentTarget.checked
        /*if (check) {
            if (year === null || year === undefined) {
                setError("choose year to search record for")
            }
            if (year === new Date().getFullYear()) {
                setError("choose previous year to search record for")
            }
        }*/
        setYearSearch(check);
    }

    const reset = () => {
        setStartDay(null);
        setEndDay(null);
        setMonth(null);
        setYear(new Date().getFullYear());
        setYearSearch(false)
        setResetCount(prevState => prevState + 1);
        if (activeReport === 'revenue') {
            setLabel(dateLabel(null, null));
            setDayLabel('Today\'s Revenue');
        }
        if (activeReport === 'bookings') {
            setBookingLabel(bookLabel(null, null));
            setDayBookLabel('Today\'s Bookings');
        }

    }


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh' // Ensures it takes at least full viewport height
        }} className="reports-page">
            <h1 className="page-title">Reports & Analytics</h1>

            <div className="reports-header">
                <div className="report-tabs">
                    <div
                        style={{textAlign:'center', padding:'12px'}}
                        className={activeReport === 'revenue' ? 'next-button' : 'back-button'}
                        onClick={() => setActiveReport('revenue')}>
                        <FaPoundSign />
                        <span>Revenue</span>
                    </div>
                    <div
                        style={{textAlign:'center', padding:'12px'}}
                        className={activeReport === 'bookings' ? 'next-button' : 'back-button'}
                        onClick={() => setActiveReport('bookings')}
                    >
                        <FaChartBar />
                        <span>Bookings</span>
                    </div>
                    <div
                        style={{textAlign:'center', padding:'12px'}}
                        className={activeReport === 'services' ? 'next-button' : 'back-button'}
                        onClick={() => setActiveReport('services')}
                    >
                        <FaChartPie />
                        <span>Services</span>
                    </div>
                </div>
                <div className="report-controls">
                    <CustomDatePicker />
                    {error && <p className={'error-message'}>{error}</p>}
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                        <input
                            type="checkbox"
                            checked={yearSearch}
                            onChange={handleYearSearch}
                        />
                        <label style={{width:'90%'}} className={'experience-text'}>Get record in months</label>
                    </div>
                    <div onClick={reset} className={'experience-text'}
                         style={{background:'none', marginRight:'10px', color:'red', width:'80px', alignSelf:'end', textAlign:'end'}}>
                        Reset
                    </div>
                </div>

            </div>

            <div className="report-content">
                {activeReport === 'revenue' && (
                    <div className="revenue-report">
                        <div className="report-card">
                            <h2 style={{padding:'5px', textAlign:'center'}} className={'experience-text'}>Revenue Overview for {year}</h2>
                            <div className="card-body">
                                <div className="chart-container">
                                    {loading ? <p>Loading yearly income data..</p> :
                                        incomeData.length <= 0 ? <p>{message}</p> :
                                            <ResponsiveContainer width="100%" height={400}>
                                                <BarChart data={incomeData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="category" />
                                                    <YAxis />
                                                    <Tooltip formatter={(value) => [`£${value}`, 'Revenue']} />
                                                    <Legend />
                                                    <Bar dataKey="revenue" fill="#4CAF50" name="Revenue (£)" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                    }
                                </div>

                                <div className="stats-grid">
                                    <div className="stat-card">
                                        <h3 style={{marginTop:'10px'}}
                                            className={'experience-text'}>
                                            {dayLabel}
                                        </h3>
                                        <h2>£{revenueToday}</h2>
                                        <div className="change up">
                                            {revenueTodayChange} from previous day
                                        </div>
                                    </div>

                                    <div className="stat-card">
                                        <h3 style={{marginTop:'10px'}}
                                            className={'experience-text'}>
                                            {label}
                                        </h3>
                                        <h2>£{revenueMonth}</h2>
                                        {(month === null && year === null) && (<div className="change up">
                                                {revenueMonthChange} from last month
                                            </div>)}
                                    </div>
                                    <div className="stat-card">
                                        <h3 className={'experience-text'}>Avg. Revenue per Booking</h3>
                                        <h2>£{averageRevenue}</h2>
                                        {(month === null && year === null) && <div className="change up">
                                            {averageRevenueChange} from last month
                                        </div> }

                                    </div>
                                    <div className="stat-card">
                                        <h3 className={'experience-text'}>Most Profitable Service</h3>
                                        <h2 className={'experience-text'}>{profitable}</h2>
                                        <div className="change neutral">
                                            £{profitableValue} avg.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeReport === 'bookings' && (
                    <div className="bookings-report">
                        <div className="report-card">
                            <div className="card-header">
                                <h2 style={{textAlign:'center'}}
                                    className={'experience-text'}>
                                    Booking Overview for {year}
                                </h2>
                            </div>
                            <div className="card-body">
                                <div className="chart-container">
                                    {loading ? <p>Loading yearly booking data..</p> :
                                        bookingData.length <= 0 ? <p>{message}</p> :
                                            <ResponsiveContainer width="100%" height={400}>
                                                <LineChart data={bookingData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="category" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Line type="monotone" dataKey="bookings" stroke="#2196F3" name="Bookings" strokeWidth={2} />
                                                </LineChart>
                                            </ResponsiveContainer>
                                    }
                                </div>

                                <div className="stats-grid">
                                    <div className="stat-card">
                                        <h3 className={'experience-text'}>{bookingLabel}</h3>
                                        <h2>{monthBooking}</h2>
                                        <div className="change up">
                                            {monthBookingChange} from last month
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <h3 className={'experience-text'}>{dayBookLabel}</h3>
                                        <h2>{bookingToday}</h2>
                                        <div className="change up">
                                            {bookingChange} from previous day
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <h3 className={'experience-text'}>Most Popular Service</h3>
                                        <h2>{profitable}</h2>
                                        <div className="change neutral">
                                            £{profitableValue} av per booking
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeReport === 'services' && (
                    <div className="services-report">
                        <div className="report-card">
                            <div className="card-header">
                                <h2>Services Distribution</h2>
                                <button className="filter-btn">
                                    <FaFilter />
                                    <span>Filter</span>
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="chart-container">
                                    <div className="pie-chart">
                                        <ResponsiveContainer width="100%" height={300}>
                                            <PieChart>
                                                <Pie
                                                    data={serviceData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    outerRadius={120}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                >
                                                    {serviceData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value) => [`${value} bookings`, 'Count']} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="services-stats">
                                    <div className="service-stat">
                                        <div className="color-dot" style={{ backgroundColor: COLORS[0] }}></div>
                                        <div className="service-info">
                                            <h3>Regular Clean</h3>
                                            <p>65% of total bookings</p>
                                        </div>
                                        <div className="service-value">£89,250</div>
                                    </div>
                                    <div className="service-stat">
                                        <div className="color-dot" style={{ backgroundColor: COLORS[1] }}></div>
                                        <div className="service-info">
                                            <h3>Deep Clean</h3>
                                            <p>25% of total bookings</p>
                                        </div>
                                        <div className="service-value">£34,500</div>
                                    </div>
                                    <div className="service-stat">
                                        <div className="color-dot" style={{ backgroundColor: COLORS[2] }}></div>
                                        <div className="service-info">
                                            <h3>Move Out Clean</h3>
                                            <p>10% of total bookings</p>
                                        </div>
                                        <div className="service-value">£18,750</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;