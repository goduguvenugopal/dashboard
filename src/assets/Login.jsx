import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import { passwordContext } from '../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Login = () => {

    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useContext(passwordContext)
    const navigate = useNavigate();


    // password verification function  
    const formFunc = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("https://students-server-884c.onrender.com/students/login", {password : password })

            if (response.data.ok) {
                alert("Logged in Successfully")
                const pass = "hello"
                localStorage.setItem("password", pass)
                setPassword1(pass)
            }
        }
        catch (error) {
            console.log(error)
            alert("Try Again You Have Entered Wrong Password")
        }
    }

    useEffect(() => {
        if (password1) {

            navigate("/")
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