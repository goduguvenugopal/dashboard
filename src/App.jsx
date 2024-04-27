 import React from 'react'
 import Navbar from './assets/Navbar'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Enroll from './assets/Enroll'
import Students from './assets/Students'
import Admin from './assets/Admin'
import Login from './assets/Login'
 

function App() {


  return (
    <>
        
       <BrowserRouter>
       <Navbar/>
       <Routes>
       <Route path='/' element={<Enroll/>}/>
        <Route path='/students' element={<Students/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/login' element={<Login/>}/>
       </Routes>
       </BrowserRouter>


    </>
  )
}

export default App
