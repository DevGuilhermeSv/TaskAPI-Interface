import React, { Component } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from 'react';


import { Login } from "./components/login/login.component";
import { Home } from "./components/home/home.component";

import AddTask from "./components/add-task.component";
import Task from "./components/task.component";
import TaskList from "./components/task/tasklist.component";
import { Register } from "./components/register/register.component";

export const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"))
    if (!user || !user.token) {
      setLoggedIn(false)
      navigate('/login')
      return
    }
    else {
      setLoggedIn(true)
      navigate('/home')
    }


  }, [])

  return (
    
      <div className="container mt-3">
        <Routes>
          <Route path="/home/*" element={<Home />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          
          <Route path="/register" element={<Register setLoggedIn={setLoggedIn} />} />
          <Route path="/home/tasks" element={<TaskList />} />
        </Routes>
      </div>
  );
}


export default App;
