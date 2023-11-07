import React, { useEffect } from "react"
import { Routes, Route, Link, useNavigate, } from "react-router-dom";
import AddTask from "../add-task.component";
import loginService from "../../services/login.service";
import TaskComponent from "../task.component";
import novatarefa from '../../assets/novatarefa.svg'
import './style.css'
import TaskList from "../task/tasklist.component";

export const Home = (props) => {

    const navegate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("user") == null) navegate('/login')
    })
    function logOut(e) {
        e.preventDefault();
        loginService.logout();
        navegate('/login');

    }

    return (
        <div id="home-page">
            <div id="navbar">
                <nav className="navbar navbar-expand ">
                    <div>
                        <div className="navtarefas">
                            <Link to={"/home"} className="navbar-brand">
                                <button> Tarefas</button>
                            </Link>
                        </div>
                        <div className="">
                            <li className="nav-item addtask">
                                <Link to={"/home/add"} className="nav-link">
                                    <img src={novatarefa} />
                                </Link>
                            </li>
                        </div>
                    </div>
                    <div className="logout-btn">
                        <li className="nav-item">
                            <button onClick={logOut}>Sair</button>
                        </li>
                    </div>
                </nav>

            </div>
            <div id="route-content" className="mt-3">
                <Routes>
                    <Route path="/" element={<TaskList />} />
                    <Route path="/add" element={<AddTask />} />
                    <Route path="/tasks/:id" element={<TaskComponent />} />
                </Routes>
            </div>
        </div>
    )
}