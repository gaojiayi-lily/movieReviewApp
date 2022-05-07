import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useState } from "react";
import "./navbar.scss";
import {Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const {user} = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src= "https://cdn-icons-png.flaticon.com/512/4221/4221412.png"
          />
          <Link to="/" className = "link"><span>Homepage</span></Link>
          <Link to="/movies" className = "link"><span>All Movies</span></Link>
          <Link to="/newMovie" className = "link"><span>Create New Movie Record</span></Link>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>SEARCH</span>
          <Notifications className="icon" />
          <span>Welcome, {user ? user.username : "friend"} &nbsp; &nbsp;</span>
          <img
            src={user ? user.profilePic : "https://cutewallpaper.org/21/naruto-profile-pics/here-you-go-guys-a-new-Naruto-profile-picture-for-Face.jpeg"}
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;