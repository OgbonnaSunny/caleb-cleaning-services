import React, { useState, useEffect } from "react";
import api from './api.js'
import {FaArrowRight, FaSearch} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {differenceInDays, format, isToday} from "date-fns";

const Blog = () => {
    const navigate = useNavigate();
    const categories = ['All','Checklists', 'Tips', 'Decluttering', 'Eco', 'Stories'];

    const [loading, setLoading] = useState(false);
    const [loadingLatest, setLoadingLatest] = useState(false);
    const [message, setMessage] = useState('');
    const [page, setPage] = useState(10);
    const [pageSize, setPageSize] = useState(0);
    const [blogs, setBlogs] = useState([]);
    const [latestBlog, setLatestBlog] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect( () => {
        if (window.innerWidth > 768) {
            setPage(20);
            return;
        }
        setPage(10)
    })

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                if (!loading) {
                    setPageSize(prev => prev + 1);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]);

    const handleCategorySearch = (search) => {
        setBlogs([]);
        setActiveCategory(search);
    }

    useEffect(() => {
        setLoading(true);
        let offset = 0;
        if (blogs?.length > 0) {
            offset = blogs[blogs?.length - 1].id;
        }
        console.log(offset);
        api.post('/api/blogs/record-by-category', {limit: page, offset: offset, category: activeCategory})
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
    }, [pageSize, activeCategory]);

    const viewDetails = (blog) => {
        navigate('/blog-details', {state: {blog: blog}});
    }

    const getTime = (date) => {
        if (!date) return ;
        return format(new Date(date), "EEE do MMM, yyyy h:mm a");
    }


    return (
        <div className={['support-page', 'main-banner'].join(' ')} style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        }}>
            <div className="recent-jobs">
                {blogs?.length > 1 &&  <div className="blog-search">
                    <div style={{width:'100%', paddingRight:'10px', paddingLeft:'10px'}}  className="form-group">
                        <select
                            id={'category'}
                            value={activeCategory}
                            name="category"
                            className={'button-bg'}
                            onChange={(e) => handleCategorySearch(e.target.value)}>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div> }
                <div className={'blog-container'}>
                    {blogs?.map(blog => (
                        <div  onClick={() => viewDetails(blog)}
                             className={'price-container'} key={blog.id}>
                            <img style={{width:'100%', height:'300px', borderRadius:'10px'}} src={blog.image} alt="" />
                            <label style={{color:'blue', marginBottom:'10px', textAlign:'center'}}>{getTime(blog?.create_at)}</label>
                            <h3>{blog.title}</h3>
                            <p className={'blog-content'}>{blog.content}</p>
                            <strong style={{display:'flex', alignItems: 'baseline'}}>Read more..</strong>
                        </div>
                    ))}
                </div>
                {(!loading && blogs?.length <= 0) && <p>No blog at this time</p>}
                {loading && <p>loading...</p>}
            </div>
        </div>
    )

}
export default Blog;