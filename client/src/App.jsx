import Home from "./home/Home";
import './app.css';
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Details from "./home/movie/Details";
import NewMovie from "./home/movie/NewMovie";
import Login from "./home/login/Login";
import Register from "./home/register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import NewComment from "./component/comment/NewComment";

const App = () => {
  const user = useContext(AuthContext);
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/movies" element={user ? <Home /> : <Navigate to="../login" />}/>
          <Route path="/watch" element={user ? <Details /> : <Navigate to="../login" />}/>
          <Route path="/newMovie" element={user ? <NewMovie /> : <Navigate to="../login" />}/>
          <Route path="/newComment" element={user ? <NewComment /> : <Navigate to="../login" />}/>
        </Routes>
      </BrowserRouter>
  );
  
};

export default App;