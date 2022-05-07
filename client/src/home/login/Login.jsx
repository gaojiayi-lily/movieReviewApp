import { useState, useContext} from "react";
import { login } from "../../context/apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import "./login.scss";
import {Link} from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    login({email, password}, dispatch);
    navigate('/login');
  };

  return (
    <div className="login">
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input 
            type="text" 
            placeholder="Email or username"
            onChange= {(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password"
            onChange= {(e) => setPassword(e.target.value)}
          />
          <button 
            className="loginButton"
            onClick = {handleLogin}
          >
            Sign In
          </button>
          <span>
            New to Movie Review? 
            <Link to="/register" className = "link"><span><b>Sign up now.</b></span></Link>
          </span>
        </form>
      </div>
    </div>
  );
}