import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import moment from "moment";

const Write = () => {
    const state = useLocation().state;

    const [value, setValue] = useState(state?.title ||"");
    const [title, setTitle] = useState( state?.description ||"");
    const [file, setFile] = useState("");
    const [cat, setCat] = useState(state?.cat || "");

    const navigate = useNavigate();

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();
        try {
            state
                ? await axios.put(`/posts/${state.id}`, {
                    title,
                    description: value,
                    cat,
                    image: file ? imgUrl : "",
                })
                : await axios.post(`/posts/`, {
                    title,
                    description: value,
                    cat,
                    image: file ? imgUrl : "",
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                });
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='add'>
            <div className="content">
                <input type="text" value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
                <div className="editorContainer">
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <input type="file" id='file' name='file' onChange={(e) => setFile(e.target.files[0])}/>
                    <label htmlFor="file">Upload Image</label>
                    <div className='buttons'>
                        <button>Save as a draft</button>
                        <button onClick={(e)=> handleSubmit(e)}>Publish</button>
                    </div>
                </div> 
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input type="radio" name='cat' value='art' id='art'
                               checked={cat === "art"}
                               onChange={(e) => setCat(e.target.value)}/>
                        <label htmlFor="art">ART</label>
                    </div>
                   <div className="cat">
                       <input type="radio" name='cat' value='science' id='science'
                              checked={cat === "science"}
                              onChange={(e) => setCat(e.target.value)}/>
                       <label htmlFor="science">SCIENCE</label>
                   </div>
                   <div className="cat">
                       <input type="radio" name='cat' value='technology' id='technology'
                              checked={cat === "technology"}
                              onChange={(e) => setCat(e.target.value)}/>
                       <label htmlFor="technology">TECHNOLOGY</label>
                   </div>
                   <div className="cat">
                       <input type="radio" name='cat' value='cinema' id='cinema'
                              checked={cat === "cinema"}
                              onChange={(e) => setCat(e.target.value)}/>
                       <label htmlFor="cinema">CINEMA</label>
                   </div>
                    <div className="cat">
                        <input type="radio" name='cat' value='design' id='design'
                               checked={cat === "design"}
                               onChange={(e) => setCat(e.target.value)}/>
                        <label htmlFor="design">DESIGN</label>
                    </div>
                   <div className="cat">
                       <input type="radio" name='cat' value='food' id='food'
                              checked={cat === "food"}
                              onChange={(e) => setCat(e.target.value)}/>
                       <label htmlFor="food">FOOD</label>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default Write;