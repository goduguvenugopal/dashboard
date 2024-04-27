
import React, { createContext, useEffect, useState } from 'react'
import Navbar from './assets/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Enroll from './assets/Enroll'
import Students from './assets/Students'
import Admin from './assets/Admin'
import Login from './assets/Login'


export const passwordContext = createContext()


function App() {
  const [password, setPassword] = useState("")
  
  useEffect(() => {
    const pass = localStorage.getItem("password")
    if (pass) {
      setPassword(pass)
       
    }
  }, [password])

  return (
    <>

      <passwordContext.Provider value={[password, setPassword]}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Enroll />} />
            <Route path='/students' element={<Students />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>

      </passwordContext.Provider>
    </>
  )
}

export default App
