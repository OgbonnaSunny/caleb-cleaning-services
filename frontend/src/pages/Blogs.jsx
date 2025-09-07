import React, {useEffect, useState, useRef} from "react";
import api from "./api.js";
import LOGO from "../images/logo4.png";
import {FaSearch, FaTimes} from "react-icons/fa";
import {format} from "date-fns";
import blog from "./Blog.jsx";


const Blogs = () => {

    const addRef = useRef(null);
    const deleteRef = useRef(null);
    const data = {
        title: '',
        category: 'Checklists',
        content: '',
        image: null,
        imagePreview: null,
        blogs: [],
        searchTerm: '',
        deletedIds: [],
        blog: null}
    const categories = ['Checklists', 'Tips', 'Decluttering', 'Eco', 'Stories']

    const searchCategories = ['All','Checklists', 'Tips', 'Decluttering', 'Eco', 'Stories']

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [page, setPage] = useState(10);
    const [pageSize, setPageSize] = useState(0);
    const [blogs, setBlogs] = useState([]);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false);
    const [deletedIds, setDeletedIds] = useState([]);
    const [formData, setFormData] = useState(data);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [loadingSearch, setLoadingSearch] = useState(false);

    useEffect( () => {
        document.title = "Blogs";
    })

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                if (!loading && !formData.searchTerm && !searchCategory) {
                    setPageSize(prev => prev + 1);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]);

    useEffect( () => {
        if (window.innerWidth > 768) {
            setPage(20);
            return;
        }
        setPage(10)
    })

    const isValidFileSize = (file) => {
        return  file.size <= 5 * 1024 * 1024;
    }

    useEffect(() => {
        setLoading(true);
        let offset = 0;
        if (blogs?.length > 0) {
            offset = blogs[blogs?.length - 1].id;
        }
        api.post('/api/blogs/record', {limit: page, offset: offset})
            .then((res) => {
                const { blogs } = res.data;
                setBlogs(prev => {
                    const map = new Map(prev.map(item => [item.id, item]));
                    blogs?.forEach(item => map.set(item.id, item));    // add/replace new
                    return Array.from(map.values()).sort((a, b) => a.id - b.id);
                })

            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [pageSize])

    const editBlogs = (e) => {
        e.preventDefault();
        if (loading) return;
        const data = new FormData();
        data.append("title", formData.title);
        data.append("category", formData.category);
        data.append("image", formData?.image);
        data.append('content', formData.content);
        data.append("oldPath", formData.blog.image);
        data.append("blodId", formData.blog.id);

        setLoading(true);
        api.post('/api/blogs/update', data)
            .then(response => {
                const {message, success, blog} = response.data;
                if (success) {
                    setBlogs(prev => {
                        const map = new Map(prev.map(item => [item.id, item]));
                        blog?.forEach(item => map.set(item.id, item));    // add/replace new
                        return Array.from(map.values()).sort((a, b) => b.id - a.id);
                    })
                    setFormData(data);
                    setAdd(false);
                    setRemove(false);
                    setEdit(false);
                }
                else {
                    setMessage(message);
                }
            })
            .catch(error => {
                console.log(error)
                setMessage("Error occurred");
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const sendBlogs = (e) => {
        e.preventDefault();
        if (loading) return;
        const data = new FormData();
        data.append("title", formData.title);
        data.append("category", formData.category);
        data.append("image", formData.image);
        data.append('content', formData.content);

        setLoading(true);
        api.post('/api/blogs', data)
            .then(response => {
                const {message, success, blog} = response.data;
                setMessage(message);
                if (success) {
                    setBlogs(prev => {
                        const map = new Map(prev.map(item => [item.id, item]));
                        blog?.forEach(item => map.set(item.id, item));    // add/replace new
                        return Array.from(map.values()).sort((a, b) => a.id - b.id);
                    })
                    setAdd(false);
                    setRemove(false);
                    setEdit(false);
                    setFormData(data);
                }
            })
            .catch(error => {
                console.log(error)
                setMessage("Error occurred");
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const deleteBlog = (e) => {
        e.preventDefault();
        if (loading) return;
        if (!formData.blog) {
            setMessage("Select blog to delete");
            return;
        }

        setLoading(true);
        api.post('/api/blogs/delete', {blogId: formData.blog.id, oldPath: formData.blog.image })
            .then(response => {
                const {message, success} = response.data;
                setMessage(message);
                if (success) {
                    setDeletedIds(prev => [...prev, formData.blog.id]);
                    setAdd(false);
                    setRemove(false);
                    setEdit(false);
                    setFormData(data);
                }
            })
            .catch(error => {
                console.log(error)
                setMessage("Error occurred");
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const searchBlogs = (e) => {}

    useEffect(() => {
        if (message) {
            setTimeout(() => setMessage(''), 5000);
        }
    }, [message]);

    useEffect(() => {
        if (add || edit) {
            addRef?.current?.scrollIntoView({behavior: "smooth"});
            if (add) {
                setFormData(data)
            }
        }
    }, [add, edit])

    useEffect(() => {
        if (remove) {
            deleteRef?.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [remove])

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!isValidFileSize(file)) {
            setError("Invalid file size");
            return;
        }
        setError(null);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setFormData({...formData, imagePreview: e.target.result, image: file});
        }

    }

    const handleEdit = (blog) => {
        if (deletedIds.includes(blog.id)) return;
        setFormData({...formData,
            blog: blog,
            image: null,
            imagePreview: blog.image,
            title: blog.title,
            category: blog.category,
            content: blog.content});
    }

    useEffect(() => {
        if (formData.searchTerm?.length <= 0) {
            setPageSize(page => page - 1);
        }
    }, [formData.searchTerm]);


    const handleCategorySearch = (search, selected = true) => {
        if (!search) return;
        if (selected) {
            setSearchCategory(search);
            if (search === 'All') {
                setPageSize(page => page + 1);
                return;
            }
        }
        setLoadingSearch(true);
        api.post('/api/blogs/search', {search: search})
            .then(response => {
                const { blogs } = response.data;
                setBlogs(blogs);
            })
            .catch(error => {
                console.log(error)
                setMessage("Error occurred");
            })
            .finally(() => {
                setLoadingSearch(false);
            })
    }

    return (
        <div className={["sticky-nav-container", "support-page"].join(" ")}>
            <div className='expense-top-order-nav'>
                <div className={'container'}>
                    <div style={{display: 'flex', justifyContent:'flex-start', alignItems: 'center'}}>
                        <img  src={LOGO} alt={''} className={'logo-icon'}/>
                        <h1 className="page-title" style={{marginLeft:'10px'}}>Send Blogs</h1>
                    </div>
                    {(!add && !edit && !remove) &&
                        <div className="blog-search">
                            <div style={{minWidth:'20%'}}  className="form-group">
                                <select
                                    id={'category'}
                                    value={searchCategory}
                                    name="category"
                                    className={'button-bg'}
                                    onChange={(e) => handleCategorySearch(e.target.value)}>
                                    {searchCategories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{display:'flex', alignItems:'baseline'}} className="search-bar">
                                <input
                                    type="text"
                                    placeholder=" search using title, content, or category..."
                                    value={formData.searchTerm}
                                    className={'button-bg'}
                                    style={{flexFlow:'1'}}
                                    onChange={(e) => setFormData({...formData, searchTerm: e.target.value})}
                                />
                                <FaSearch onClick={() => handleCategorySearch(formData.searchTerm, false)} style={{width:'10%'}}  />
                            </div>
                        </div>
                    }
                </div>
                {loadingSearch && <label>Searching...</label>}
            </div>

            <main className={["main-content", "main-banner"].join(" ")}>
                {(add || edit) && <div ref={addRef} className="main-banner">
                    <form onSubmit={edit ? editBlogs : sendBlogs}>
                        <div className="contact-form">
                            <div className="form-group">
                                <h4 className={'experience-text'}>Blog Title</h4>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    className="button-bg"
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    required
                                />
                            </div>
                            <div  className="form-group">
                                <h4 className={'experience-text'}>Category</h4>
                                <select
                                    id={'category'}
                                    value={formData.category}
                                    name="category"
                                    required={true}
                                    className={'button-bg'}
                                    onChange={(e)=> setFormData({...formData, category: e.target.value})}>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <h4 className={'experience-text'}>Upload blog image</h4>
                                <input
                                    type="file"
                                    accept="application/pdf, image/*"
                                    name="image"
                                    onChange={handleImage}
                                    required={add ? true : false}
                                    style={{background:'mintcream', color:'white', borderRadius:'10px', border:'brown'}}
                                    className={errors.photo ? 'error' : ''}
                                />
                                {error && <label className={'error-message'}>{error}</label>}
                                {formData.imagePreview && <img style={{with:'100%', height:'500px', borderRadius:'8px'}} src={formData.imagePreview} />}
                            </div>
                            <div style={{marginTop:'20px'}} className="form-group">
                                <h4 className={'experience-text'}>Content</h4>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.content}
                                    rows={20}
                                    className="button-bg"
                                    required={true}
                                    onChange={(e) => setFormData({...formData, content: e.target.value})}>
                                    </textarea>
                            </div>
                            {message && <p style={{margin:'10px'}}>{message}</p>}
                            {loading && <p style={{margin:'10px'}}>sending blod...</p>}
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className={loading ? "back-button" : "submit-button"}>
                            {edit ? "Update blog" : " Send Blog"}
                        </button>
                    </form>
                </div>}
                {remove && <div ref={deleteRef} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <p>Are you sure want to delete this blog record? This cannot be undone. Continue?</p>
                    {message && <p style={{margin:'10px'}}>{message}</p>}
                    {loading && <p style={{margin:'10px'}}>loading...</p>}
                    <div style={{display:'flex', justifyContent:'space-evenly', alignItems: 'center'}}>
                        <button onClick={deleteBlog} style={{color:'white', flexFlow:'1', backgroundColor:'darkred'}}>DELETE</button>
                        <FaTimes size={24} style={{width:'40px'}} onClick={() => {setRemove(false); setFormData({...formData, blog: null})}} />
                    </div>
                </div>}
                <div style={{marginTop:'20px'}}  className="recent-jobs">
                    <h3>Blogs</h3>
                    <div className={'blog-container'}>
                        {blogs?.map(blog => (
                            <div style={(blog.id === formData.blog?.id) ? {backgroundColor:'lightgray'} : deletedIds.includes(blog.id) ? {backgroundColor:'lightpink'} : {backgroundColor:''}  }
                                onClick={() => handleEdit(blog)}
                                className={'price-container'} key={blog.id}>
                                <img style={{width:'100%', height:'400px', borderRadius:'10px'}} src={blog.image} alt="" />
                                <h3>{blog.title}</h3>
                                <p className={'blog-content'}>{blog.content}</p>
                                {deletedIds.includes(blog.id) && <small style={{margin:'10px', color:'red'}}>Deleted</small>}
                            </div>
                        ))}
                    </div>
                    {(!loading && blogs?.length <= 0) && <p>No blog was found</p>}
                    {(loading && !add && !edit && !remove && !formData?.searchTerm) && <p>loading...</p>}
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
                        style={(formData.blog === undefined ||formData.blog === null) ? {color:'gray'} : {color:'blue'}}
                        className={'expense-label-edit'}>
                        <input
                            id={'edit'}
                            type={'checkbox'}
                            checked={edit}
                            name={'edit'}
                            onChange={() => (add || remove || formData.blog === undefined || formData.blog === null) ? null : setEdit(!edit)}
                        />
                        Edit
                    </label>

                    <label
                        style={(formData.blog === undefined || formData.blog === null) ? {color:'gray'} : {color:'red'}}
                        className={'expense-label-delete'}>
                        <input
                            id={'remove'}
                            type={'checkbox'}
                            checked={remove}
                            name={'remove'}
                            onChange={() => (add || edit || formData.blog === undefined || formData.blog === null) ? null : setRemove(!remove) }
                        />
                        Delete
                    </label>
                    {(formData.blog !== undefined && formData.blog !== null) && <FaTimes style={{width:'40px'}} onClick={() => {
                        setFormData({...formData, blog: null});
                        setEdit(false);
                        setRemove(false);
                        setAdd(false);
                    }} />}
                </div>
            </nav>
        </div>

    );

}
export default Blogs;