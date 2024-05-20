import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'
import { passwordContext } from '../App'
import { useNavigate } from 'react-router-dom'
import { api0 } from '../api.js'


const Enroll = () => {
  const [password , setPassword] = useContext(passwordContext)
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    studentId: "",
    Class: "",
    address: "",
    paid: "",
    totalAmount: "",
    joiningDate : ""

  })

  const [spinner, setSpinner] = useState(false)


  const formHandle = (event) => {

    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  // post method 
  const formFunc = async (e) => {
    setSpinner(true)
    e.preventDefault()
    try {
      await axios.post(`${api0}`, data)

      alert("Student Details Has Enrolled Successfully")
      setData({
        name: "",
        studentId: "",
        Class: "",
        address: "",
        paid: "",
        totalAmount: "",
        joiningDate : ""
      });
      setSpinner(false)
    } catch (error) {
      setSpinner(false)
      alert("Please Try again Later or This Enrollment No Already exists with other student details ")
    }
  }


useEffect(()=>{
if(!password){
  navigate("/login")
}
})

  return (
    <>
      <div className='container enroll-main-card'>
        <div className='form-card py-4 container'>
        <h4 className='text-center'>Enroll Student Details</h4><hr />
          <form id='form-response' onSubmit={formFunc}>
         
            <div className='form-sub-card'> 
            
            <label className='label'>Student Name</label><br />
            <input placeholder='Student Name' onChange={formHandle} required type='text' name='name'
              value={data.name} className='input-box' /><br />
            <label className='label'>Enrollment Number</label><br />
            <input onChange={formHandle} placeholder='Enrollment No' required name='studentId'
              value={data.studentId.trim()} type='text' className='input-box' /><br />
            <label className='label'>Class</label><br />
            <input onChange={formHandle} required name='Class'
              value={data.Class} type='text' placeholder='Enter Class' className='input-box' /><br />
            <label className='label'>Address</label><br />
            <input onChange={formHandle} name='address'
              value={data.address} required type='text' placeholder='Enter Address' className='input-box' /><br />
               </div>
            
            
            <div className=''> 
            <label className='label'>Advance Fee</label><br />
            <input style={{paddingLeft:"21px"}} onChange={formHandle} name='paid'
              value={data.paid} required type='number' placeholder='Enter Advance Fee' className='input-box' />
            <span id="rupi" className="material-symbols-outlined">
                currency_rupee
              </span><br/>
            <label className='label'>Total Fee</label><br />
            <input  style={{paddingLeft:"21px"}} onChange={formHandle} required name='totalAmount'
              value={data.totalAmount} type='number' placeholder='Enter Fee' className='input-box' />
               <span id="rupi1" className="material-symbols-outlined">
                currency_rupee
              </span><br/>
              <label className='label'>Joining Date</label><br />
            <input onChange={formHandle} required name='joiningDate'
              value={data.joiningDate} type='date' className='input-box' /><br />
           
              <hr />
            
            {spinner ? <button className="btn btn-primary" type="button" disabled="">
              <span style={{ marginRight: "0.4rem" }}
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
              Submitting...
            </button>
              : <button type='submit' className='text-white btn bg-primary'>Submit</button>}
              </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default Enroll