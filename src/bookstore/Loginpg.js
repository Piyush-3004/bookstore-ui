import React from 'react'
import { useState } from 'react'
import './Loginpg.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import App from '../App';

function Loginpg() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token,setToken] = useState()
    const navigate = useNavigate()
   

    const getToken = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:9090/bookstore/login/${email}/${password}`)
            .then((res) => {
                setToken(res.data);
                console.log(res.data);
                localStorage.setItem('token',res.data);
                navigate('/')

            })
    }

    return (
        < >
            <div className='mainContainer'>
                <div className='childContainer'>
                    <div className='formcontainer'>
                        <form class="login-form" onSubmit={(e)=>getToken(e)}>
                            <div><input type="text" className="login-username" placeholder="Email" onChange={(event) => setEmail(event.target.value)} /></div>
                            <div><input type="password" className="login-password" required="true" placeholder="Password" onChange={(event) => setPassword(event.target.value)} /></div>
                            <div><input type="submit" name="Login" value="Login" className="login-submit" /></div>
                        </form>
                    </div>

                    <div>
                        <a href="#" className="login-forgot-pass">forgot password?</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loginpg