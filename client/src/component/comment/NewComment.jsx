import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function NewComment() {
    const location = useLocation();
    const movie = location.state?.movie;

    const [body, setBody] = useState("");
  
    const navigate = useNavigate();
    const submitReview = async (e) =>  {
        e.preventDefault();
        try {
            await axios.post("reviews/"+ movie._id, {body : body}, { 
                headers: {
                    token: "lily " + JSON.parse(localStorage.getItem("user")).accessToken
                },
            });
        navigate('/');  
        } catch (err) {}
    };
  
    return (
      <div className="login">
        <div className="container">
          <form>
            <h1>Add new reviews</h1>
            <input 
              type="text" 
              placeholder="Reviews"
              onChange= {(e) => setBody(e.target.value)}
            />
            <button 
              className="button"
              onClick = {submitReview}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
}
