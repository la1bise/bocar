import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [inputs, setInputs] = useState({
        login:"",
        email: "",
        password: ""
    })
        const [err, setErr] = useState();
        const navigate = useNavigate();
        
        const handleChange = (e) => {
            const {name, value} = e.target
            setInputs({...inputs, [name]: value})
            setErr();
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            if(inputs.email.trim() === "" || inputs.password.trim() === "" || inputs.login.trim() === ""){
                return setErr("Un champ est incorrect")
            }
            axios.post("http://localhost:9000/register", inputs)
            .then((res)=>{               
                    navigate("/se-connecter")
                })
            .catch((res)=>{
                setErr(res.data);
            })
        }
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor="login">Pseudo</label>
                <input type="text" name="login" id="login" onChange={handleChange} value={inputs.login} placeholder="Pseudo"/>  
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={handleChange} value={inputs.email} placeholder="azerty@gmail.com" />
                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password" id="password" onChange={handleChange} value={inputs.password} placeholder="Mot de passe" />
                <button>S'inscrire</button>
                {
                    err && <span>{err}</span>
                }
            </form>     
        </main>
    );
};

export default Register;