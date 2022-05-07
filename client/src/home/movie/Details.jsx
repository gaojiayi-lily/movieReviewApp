import { ArrowBackOutlined } from "@material-ui/icons";
import "./details.scss";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../component/navBar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Details() {
  const location = useLocation();
  const movie = location.state?.movie;
  
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getAllComments = async () => {
      try {
        const res = await axios.get("reviews/"+ movie._id, {
          headers: {
            token: "lily " + JSON.parse(localStorage.getItem("user")).accessToken
          }
        });
        console.log(res);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllComments();
  },[]);


  return (
    <div>
    <Navbar />
        <div className="watch">
          <div className="back">
            <ArrowBackOutlined />
            <Link to="/" className = "link"><span>Homepage</span></Link>
          </div>
          {/* <video
            className="video"
            autoPlay
            progress
            controls
            src={movie.img}
          /> */}
          <div className="featured">
            <img
              src={movie.img}
              alt=""
            />
            <div className="info">
              <h1>{movie.title}</h1>
              <span className="desc">
                {movie.desc}
              </span>
              
            </div>
          </div>
          <div className="container">
            {comments.map((comment) => (
              <p>{comment.body + " comment made by: " + comment.username}</p>
            ))}
          </div>
          <Link to='/newComment' state={{movie: movie}} className = "link"> 
            <button className="button">Add new Comments</button>
          </Link> 
        </div>
    </div>

  );
}