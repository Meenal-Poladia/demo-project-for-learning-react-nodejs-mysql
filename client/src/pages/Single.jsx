import React, {useContext, useEffect, useState} from 'react';

import EditImage from "../images/edit.png";
import DeleteImage from "../images/delete.png";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import {AuthContext} from "../context/authContext";

const Single = () => {
    const [post, setPost] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const postId = location.pathname.split("/")[2];

    const {currentUser} = useContext(AuthContext);

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${postId}`);
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/${postId}`);
                setPost(res.data);
            } catch (err) {
                console.log(`Error`,err);
            }
        };
        fetchData();
    }, [postId]);

    return (
        <div className='single'>
            <div className="content">
                <img src="https://images.pexels.com/photos/14245014/pexels-photo-14245014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
                <div className="user">
                    <img src={post?.userImage} alt=""/>
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>
                    {
                        currentUser.username === post.username
                        &&
                        <div className="edit">
                            <Link to={`/write?edit=2`} state={post}>
                                <img src={ EditImage } alt=""/>
                            </Link>
                            <img  onClick={handleDelete} src={ DeleteImage } alt=""/>
                        </div>
                    }

                </div>
                <h1>{post.title}</h1>
                    {post.description}
            </div>
            <Menu cat={post.cat}/>
        </div>
    );
};

export default Single;