import { InfoOutlined, RateReview, PlayCircleOutline } from "@material-ui/icons";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./featured.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Feature({ type }) {
  const [movie, setMovie] = useState([]);

  const {user} = useContext(AuthContext);
  console.log(user !== null);

  useEffect(() => {
    const getRandomMovie = async() => {
      try {
        const res = await axios.get(`movies/random`, {
          headers: {
            token: (user !== null) ? ("lily " + JSON.parse(localStorage.getItem("user")).accessToken) :
            "lily eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzU1ZGU0ZWYzNjYwN2I4N2RiMTA4YSIsImlhdCI6MTY1MTg2MjAxMiwiZXhwIjoxNjUyMjk0MDEyfQ.0UAeeJJKRCU0iA1Z_pl9E1gLdAlVMk8GJdlmfD7Gly8"
          }
        });
        console.log(res);
        setMovie(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomMovie();
  },[])

  return (
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
        <Link to='/watch' state={{movie: movie}} className = "link">
          <div className="buttons">
            <button className="more" >
              <PlayCircleOutline />
              <span>Play</span>
            </button>
            <button className="more">
              <InfoOutlined />
              <span>Info</span>
            </button>
            <button className="more">
              <RateReview />
              <span>Review</span>
            </button>
        </div>
        </Link>
        
      </div>
    </div>
  );
}