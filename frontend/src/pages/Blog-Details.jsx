import React, {useState, useEffect} from "react";
import LOGO from "../images/logo4.png";
import {useLocation} from "react-router-dom";

const BlogDetails = () => {
    const location = useLocation();
    const blogs = location.state?.blog;

    const [blog, setBlog] = useState(blogs);

    useEffect(() => {
        document.title = "Blog";
    })

    return (
        <div className={['support-page', 'main-banner'].join(' ')} style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        }}>
            <div style={{display: 'flex', justifyContent:'flex-start', alignItems: 'center'}}>
                <img  src={LOGO} alt={''} className={'logo-icon'}/>
                <h1 className="page-title" style={{marginLeft:'10px'}}>Blogs</h1>
            </div>
            <div className={'price-container'}>
                <img src={blog?.image} alt={''} style={{width:'100%', height:'500px'}} />
                <h3>{blog?.title}</h3>
                <p>{blog?.content}</p>
            </div>
        </div>
    )
}

export default BlogDetails;