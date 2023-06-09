import React from 'react';

import EditImage from "../images/edit.png";
import DeleteImage from "../images/delete.png";
import {Link} from "react-router-dom";
import Menu from "../components/Menu";

const Single = () => {
    return (
        <div className='single'>
            <div className="content">
                <img src="https://images.pexels.com/photos/14245014/pexels-photo-14245014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
                <div className="user">
                    <img src="https://images.pexels.com/photos/2449543/pexels-photo-2449543.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""/>
                    <div className="info">
                        <span>John</span>
                        <p>Posted 2 days ago</p>
                    </div>
                    <div className="edit">
                        <Link to={`/write?edit=2`}>
                            <img src={ EditImage } alt=""/>
                        </Link>
                        <img src={ DeleteImage } alt=""/>
                    </div>
                </div>
                <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, velit!</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi delectus deleniti
                    dignissimos earum eligendi eos ex, fugit id modi natus neque nostrum porro quae, quo repellat
                    repellendus saepe sint soluta sunt tempore, temporibus veritatis vero. Accusantium eveniet
                    exercitationem explicabo fuga laudantium! Consectetur consequuntur corporis culpa laborum
                    laudantium provident, voluptates.
                </p>
            </div>
            <Menu/>
        </div>
    );
};

export default Single;