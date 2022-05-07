import { useRef } from "react";
import { useState } from "react";
import "./register.scss";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Register() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfile] = useState("");

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const profileRef = useRef();

  const navigate = useNavigate();
  const handleStart = () => {
    setName(nameRef.current.value);
    setEmail(emailRef.current.value);
    setProfile(profileRef.current.value);
  };

  const handleFinish = async (e) =>  {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    try {
      await axios.post("auth/register", { email, username, password, profilePic });
      navigate('/login');
    } catch (err) {}
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <button className="loginButton">Sign In</button>
        </div>
      </div>
      
      <div className="container">
        <h1>Welcome to Jiayi's internal movie review website :)</h1>
        <h2>Register to share reviews with friends!</h2>
        {!email ? (
          <div className="input">
            <input type="name" placeholder="username" ref={nameRef} />
            <input type="email" placeholder="email address" ref={emailRef} />
            <input type="profile" placeholder="profile picture (link)" ref={profileRef} />
            <button className="registerButton" onClick={handleStart}>
              Enter
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="password" placeholder="password" ref={passwordRef} />
            <button className="registerButton" onClick={handleFinish}>
              Enter
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
