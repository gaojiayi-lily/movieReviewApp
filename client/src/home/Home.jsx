import { AcUnit } from '@material-ui/icons'
import React from 'react'
import { useState, useEffect } from 'react'
import Feature from '../component/feature/Feature'
import List from '../component/list/List'
import Navbar from '../component/navBar/Navbar'
import './home.css'
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext'

export default function Home() {
  const [list, setList] = useState([]);
  const {user} = useContext(AuthContext);
  console.log(user);

  useEffect(() => {
    const getRandomMovies = async () => {
      try {
        const res = await axios.get(`movies/random10`, {
          headers: {
            token: "lily " + JSON.parse(localStorage.getItem("user")).accessToken
          }
        });
        console.log(res);
        setList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomMovies();
  },[]);

  return (
    <div className = "home">
        <Navbar />
        <Feature type = "movie"/>
        <List list = {list}/>
    </div>
  )
}
