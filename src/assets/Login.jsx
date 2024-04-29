import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import { passwordContext } from '../App'
import { useNavigate } from 'react-router-dom'
import { Pass } from '../../pass' 

const Login = () => {
    const [pass, setPass] = useState(Pass)
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useContext(passwordContext)
    const navigate = useNavigate();
    

    // password verification function  
    const formFunc = (e) => {
        e.preventDefault()
         
        if (pass === password) {
            alert("Logged in Successfully")
            localStorage.setItem("password", pass)
            setPassword1(pass)
        } else {
            alert("Try Again You Have Entered Wrong Password")
        }
    }

    useEffect(() => {
        if (password1) {
            setTimeout(() => {
                navigate("/")
            }, 1500);

        }
    }, [password1])





    return (
        <div className='container d-flex justify-content-center align-items-center' style={{ width: "100vw", height: "100vh" }}>
            <div className=''>
                <form className='login-card' onSubmit={formFunc}>
                    <h4>Log in </h4>
                    <hr className='mb-1' />
                    <label className='label'>Enter Password</label><br />

                    <input value={password} name='password' onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter Password' className='input-box' /><br />
                    <button type='submit' className='mt-3 btn bg-primary text-white'>Log in</button>
                </form>
            </div>
        </div>
    )
}

export default Login