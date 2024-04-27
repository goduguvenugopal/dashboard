import React, { useState } from 'react'
import '../App.css'
import axios from 'axios'


const Login = () => {
    const [password, setPassword] = useState("")

console.log(password)
    // post method 
    const formFunc = async (e) => {
        e.preventDefault()
        try {
            await axios.post("https://students-server-884c.onrender.com/students/login", { password : password })

            alert("Logged in Successfully")
        } catch (error) {
            console.log(error)
            alert("Please Try Again' Log in Failed")
        }
    }

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