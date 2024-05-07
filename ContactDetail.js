import React from "react";
import user from "../images/user.jpg";
 import { Link } from "react-router-dom";

const ContactDetail = (props) => {

    // if (!props.location.state) {
    //     return <div>Error: Contact information not found.</div>;
    // }



    return (
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src ={user} alt="user"/>
                </div>
                <div className="content">
                    <div className="header">name</div>
                    <div className="description">email</div>
                </div>
            </div>
            <div className="center-div">
                <Link to="/">
                <button className="ui button pink center">Back to Contact List</button>
                </Link>
            </div>
        </div>
            
    );
};

export default ContactDetail;