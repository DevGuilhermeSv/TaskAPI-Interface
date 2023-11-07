import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import './styles.css'
import loginService from "../../services/login.service";


export const Login = (props) => {

    const [username, setusername] = useState('');

    const [password, setpassword] = useState('');
    const navigate = useNavigate();
    function sendForm(e) {
        e.preventDefault();
        const body = {
            username,
            password
        }
        loginService.login(body)
            .then(r => {
                console.log(r)
                localStorage.setItem("user", JSON.stringify({ username, token: r.data.access_token }))

                // props.setLoggedIn(true)

                navigate("/home")

            })
            .catch(e => {
                console.log(e);
            });
    }

    return (<div className="container">
        <div className="container-login">
            <div>
                <form className="login-form">
                    <span className="login-title">Login</span>
                    <div className="input-username">
                        <input placeholder="Nome de usuario" required onChange={event => setusername(event.target.value)} ></input>
                    </div>
                    <div className="input-pass">
                        
                        <input placeholder="Senha" required type="password" onChange={event => setpassword(event.target.value)}></input>
                    </div>
                    
                    <div className="register-link flex center">
                        <Link to={'/register'} className="register-link">Criar Conta</Link>
                    </div>
                    <div className="login-btn flex center">
                        <button onClick={sendForm}>Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>)
}