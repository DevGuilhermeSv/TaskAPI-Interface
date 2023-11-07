import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import './styles.css'
import registerService from "../../services/register.service";


export const Register = (props) => {

    const [name, setname] = useState('')
    const [userName, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [success, setsuccess] = useState(false);
    const navigate = useNavigate();
    function sendForm(e) {
        e.preventDefault();
        const body = {
            name,
            userName,
            password
        }
        registerService.Register(body)
            .then(r => {
                setsuccess(true)
                setTimeout(() => {
                    navigate("/login")

                }, 2500)

            })
            .catch(e => {
                console.log(e);
            });
    }

    return (<div className="container">
        <div className="container-login">
            <div>
                <form className="login-form">
                    <h2 className="login-title">Registrar</h2>
                    <div className="input-username">
                        <input placeholder="Nome " required onChange={event => setname(event.target.value)} ></input>
                    </div>
                    <div className="input-username">
                        <input placeholder="Nome de usuario" required onChange={event => setusername(event.target.value)} ></input>
                    </div>
                    <div className="input-pass">

                        <input placeholder="Senha" required type="password" onChange={event => setpassword(event.target.value)}></input>
                    </div>


                    <div className="login-btn flex center">
                        <button onClick={sendForm}>Cadastrar</button>
                    </div>
                </form>
            </div>
            <div id="sucess-message" className="wc-text">
                {success && <p>Cadastro realizado com sucesso!</p>}
            </div>
        </div>
    </div>)
}