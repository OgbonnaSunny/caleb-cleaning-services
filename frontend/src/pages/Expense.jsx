import React, {useState, useEffect} from 'react';
import api from './api.js'
import LOGO from "../images/logo4.png";
import { format } from "date-fns";
import {FaSearch, FaTimes} from "react-icons/fa";


const Expense = () => {
    const expenseCategories = ['Wages', 'Solutions', 'Equipments', 'Recurrent', 'Custom']

    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState(null);
    const [category, setCategory] = useState('Wages');
    const [errors, setErrors] = useState({});
    const [custom, setCustom] = useState('');
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false);
    const [amount, setAmount] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [page, setPage] = useState(30);
    const [pageCount, setPageCount] = useState(0);
    const [expense, setExpense] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [deletedIds, setDeletedIds] = useState([]);

    useEffect(() => {
        if (window.innerWidth > 768) {
            setPage(50);
            return;
        }
        setPage(30)
    }, []);

    useEffect(() => {
        if (message) {
            setTimeout(() => setMessage(null), 5000);
        }
    }, [message]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                if (!loading) {
                    setPageCount(prev => prev + 1);
                  //  alert(pageCount)
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]);

    useEffect(() => {
        setLoading(true);
        let offset = 0;
        if (expenses.length > 0) {
            offset = expenses[0].id;
        }
        api.post('/api/expenses/records', {limit: page, offset: offset })
            .then(res => {
                const { expenses } = res.data;
                setExpenses(prev => {
                    const map = new Map(prev.map(item => [item.id, item])); // old items
                    expenses.forEach(item => map.set(item.id, item));    // add/replace new
                    return Array.from(map.values()).sort((a, b) => b.id - a.id); // convert back to array
                })
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [pageCount])

    useEffect(() => {
        if (!searchTerm || !searchTerm.length <= 0) {
            setPageCount(prev => prev + 1);
        }
    }, [searchTerm]);

    useEffect(() => {
        document.title = 'Expense';
    })

    const submitExpenses = async (e) => {
        e.preventDefault();
        if (loading) return;
        if (!category || !amount  || Number(amount) <= 0) {
            setMessage('Please fill all required fields');
            return;
        }
        setLoading(true);
        let expenseName = category;
        if (category === 'Custom') {
            expenseName = custom;
        }
        let data;
        data = {category: expenseName, amount: amount, comment: comment};
        if (edit && expense) {
            data = {category: expenseName, amount: amount, comment: comment, id: expense.id};
        }
        try {
            let response;
            if (add) {
                response = await api.post('/api/expenses', data);
                const {expenses, message} = response.data;
                setMessage(message)
                setExpenses(prev => {
                    const map = new Map(prev.map(item => [item.id, item])); // old items
                    expenses.forEach(item => map.set(item.id, item));    // add/replace new
                    return Array.from(map.values()).sort((a, b) => b.id - a.id); // convert back to array
                });
                if (expenses.length > 0) {
                    setCategory('Wages');
                    setAmount(0);
                    setComment('');
                    setCustom('');
                }
            }
            if (edit && expense) {
                response = await api.post('/api/expenses/update', data);
                const {success, message} = response.data;
                setMessage(message)
                if (success) {
                    setCategory('Wages');
                    setAmount(0);
                    setComment('');
                    setCustom('');
                    setExpense(null);
                }
            }

        } catch (error) {
            console.log(error)
            if (add) {
                setMessage("Error occured while creating expense");
            }
            if (edit) {
                setMessage("Error occured while updating expense");
            }

        }finally {
            setLoading(false);
        }
    }

    function isRealDate(str) {
        const regex = /^\d{4}[-/]\d{2}[-/]\d{2}$/;
        if (!regex.test(str)) return false;

        const normalized = str.replace(/\//g, "-"); // convert to YYYY-MM-DD
        const date = new Date(normalized);

        // check month/day validity
        return (
            !isNaN(date.getTime()) &&
            date.toISOString().slice(0, 10) === normalized
        );
    }

    const searchExpenses = async (e) => {
        e.preventDefault();
        if (expenses.length <= 0) return;
        setLoading(false);
        if (loading) return;
        setLoading(true);
        if (!searchTerm) {
            setMessage('Please enter a valid search term');
            return;
        }
        const isDate = isRealDate(searchTerm);
        let data;
        if (isDate) {
            data = {category: null, date: format(new Date(searchTerm), 'yyyy-MM-dd'), amount: null };
        }
        else {
            const price = Number(searchTerm);
            if (isNaN(price)) {
                data = {category: searchTerm, date: null, amount: null};
            }
            else {
                data = {category: null, date: null, amount: price};
            }
        }
        try {
            const response = await api.post('/api/expenses/search', data);
            const { expenses } = response.data;
            if (!expenses || expenses.length <= 0) {
                setExpenses([])
               return;
            }
            setExpenses(expenses);

        } catch (error) {
            console.error(error)
            setMessage("Error occured while searching expense");
        } finally {
            setLoading(false);
        }

    }

    const deleteExpense = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        try {
            const response = await api.post('/api/expenses/delete', {id: expense.id});
            const {success, message} = response.data;
            setMessage(message);
            if (success) {
                setExpense(null);
                setDeletedIds(prev => [...prev, expense.id]);
            }

        } catch (error) {
            console.error(error)
            setMessage("Error occured while deleting expense");
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (edit && expense) {
            setComment(expense.comment)
            setAmount(expense.amount)
            if (expenseCategories.includes(expense.category)) {
                setCategory(expense.category);
            }
            else {
                setCategory("Custom")
                setCustom(expense.category);
            }
        }
        else {
            setComment('');
            setAmount(0);
            setCategory('Wages');
            setCustom('');
        }
    }, [expense, edit])


    return (
        <div className={["sticky-nav-container", "support-page"].join(" ")}>
            <div className='expense-top-order-nav'>
                <div>
                    <div style={{display: 'flex', justifyContent:'flex-start', alignItems: 'center'}}>
                        <img  src={LOGO} className={'logo-icon'}/>
                        <h1 className="page-title" style={{marginLeft:'10px'}}>Expense</h1>
                    </div>
                    <div style={{display: 'flex', justifyContent:'space-evenly', flexDirection: 'column'}}>
                        <div style={{flexFlow:'1', maxWidth:'900px', display:'flex', alignItems:'center', marginTop:'15px'}}
                             className="search-bar" >
                            <input
                                type="text"
                                placeholder=" search using date, amount or category..."
                                value={searchTerm}
                                className={'button-bg'}
                                style={{width:'90%'}}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch onClick={searchExpenses} style={{width:'40px'}}  />

                        </div>
                        {message && <p style={{margin:'10px'}}>{message}</p>}
                    </div>
                    {(add || edit) && <form onSubmit={submitExpenses}>
                        <div className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Category</label>
                                <select
                                    id={'category'}
                                    value={category}
                                    name="category"
                                    required={true}
                                    className={'button-bg'}
                                    onChange={(e)=>setCategory(e.target.value)}>
                                    {expenseCategories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                                {category === 'Custom' &&
                                    <div>
                                        <input
                                            type="text"
                                            id="custom"
                                            name="custom"
                                            value={custom}
                                            placeholder={'name your expense'}
                                            className="button-bg"
                                            required={category === 'Custom'}
                                            maxLength={10}
                                            style={{marginTop: '20px', padding: '10px'}}
                                            onChange={(e) => setCustom(e.target.value)}
                                        />
                                        <small>{custom.length}/{10}</small>
                                    </div>
                                }

                            </div>
                            <div className="form-group">
                                <label htmlFor="amount">Amount</label>
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={amount}
                                    className="button-bg"
                                    required={true}
                                    style={{ padding: '10px'}}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="comment">Comment(optional)</label>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    value={comment}
                                    rows={3}
                                    className="button-bg"
                                    onChange={(e) => setComment(e.target.value)}>
                            </textarea>
                            </div>
                            {message && <p style={{margin:'10px'}}>{message}</p>}
                            {loading && <p style={{margin:'10px'}}>loading...</p>}
                            <div style={{display:'flex', justifyContent:'space-evenly', alignItems: 'center'}}>
                                <button
                                    style={{flexFlow:'1'}}
                                    disabled={loading} type="submit"
                                    className={loading ? "back-button" : "submit-button"}>
                                    {add ? 'Submit' : edit ? 'Update' : 'Submit'}
                                </button>

                                <FaTimes size={24} style={{width:'40px'}} onClick={() => {setEdit(false); setAdd(false); setExpense(null)}} />
                            </div>
                        </div>
                    </form>}
                    {remove &&
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <p>Are you sure want to delete this expense record? This cannot be undone. Continue?</p>
                            {message && <p style={{margin:'10px'}}>{message}</p>}
                            {loading && <p style={{margin:'10px'}}>loading...</p>}
                            <div style={{display:'flex', justifyContent:'space-evenly', alignItems: 'center'}}>
                                <button onClick={deleteExpense} style={{color:'white', flexFlow:'1', backgroundColor:'darkred'}}>DELETE</button>
                                <FaTimes size={24} style={{width:'40px'}} onClick={() => {setRemove(false); setExpense(null)}} />
                            </div>
                        </div>}
                </div>
            </div>

            <main className={["main-content", "main-banner"].join(" ")}>
                <div className="recent-jobs">
                    <h3>Expense details</h3>
                    <table>
                        <thead>
                        <tr>
                            <th style={{width:'40%'}}>Date</th>
                            <th style={{width:'40%'}}>Category</th>
                            <th style={{width:'20%'}}>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {expenses
                            .map(item => (
                                <tr style={(expense && expense.id === item.id) ? {backgroundColor:'lightskyblue'} : deletedIds.includes(item.id) ? {backgroundColor:'darkgray' } : {backgroundColor:'' }}
                                    key={item.id} onClick={() => !deletedIds.includes(item.id) ? setExpense(item) : null }>
                                    <td style={{width:'30%'}}>{format(new Date(item.created_at), 'yyyy-MM-dd')}</td>
                                    <td style={{width:'40%'}}>{item.category}</td>
                                    <td style={{width:'25%'}}>£{item.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {(!loading && expenses.length <= 0) && <p>No expense record was found</p>}
                    {(loading && !add && !edit && !remove && !searchTerm) && <p>loading...</p>}
                </div>
            </main>

            <nav  className='bottom-order-nav'>
                <div style={{display:'flex', justifyContent:'space-evenly'}}>
                    <label style={{display: 'flex', alignItems: 'center', gap:'10px',marginLeft:'10px'}}>
                        <input
                            id={'add'}
                            type={'checkbox'}
                            checked={add}
                            name={'add'}
                            onChange={() => (edit || remove) ? null : setAdd(!add) }
                        />
                        Add
                    </label>

                    <label
                        style={(expense === undefined || expense === null) ? {color:'gray'} : {color:'blue'}}
                        className={'expense-label-edit'}>
                        <input
                            id={'edit'}
                            type={'checkbox'}
                            checked={edit}
                            name={'edit'}
                            onChange={() => (add || remove || expense === undefined || expense === null) ? null : setEdit(!edit)}
                        />
                        Edit
                    </label>

                    <label
                        style={(expense === undefined || expense === null) ? {color:'gray'} : {color:'red'}}
                        className={'expense-label-delete'}>
                        <input
                            id={'remove'}
                            type={'checkbox'}
                            checked={remove}
                            name={'remove'}
                            onChange={() => (add || edit || expense === undefined || expense === null) ? null : setRemove(!remove) }
                        />
                        Delete
                    </label>
                </div>
            </nav>
        </div>

    );

}
export default Expense;