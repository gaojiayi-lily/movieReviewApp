import "./listItem.scss";
import {
  PlayArrow,
  Add,
  RateReview,
} from "@material-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link to='/watch' state={{movie: item}}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={item.imgSm}
          alt=""
        />
        {isHovered && (
          <>
            <video src={item.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <RateReview className="icon" />
              </div>
              <div className="desc">
                {item.title}
              </div>
              <div className="genre">Click into details</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}