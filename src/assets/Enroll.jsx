import React, { useState } from 'react'
import '../App.css'
import axios from 'axios'


const Enroll = () => {
  const [data, setData] = useState({
    name: "",
    studentId: "",
    Class: "",
    address: "",
    paid: "",
    totalAmount: ""

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
      await axios.post("https://students-server-884c.onrender.com/students/enroll", data)

      alert("Student Details Has Enrolled Successfully")
      setData({
        name: "",
        studentId: "",
        Class: "",
        address: "",
        paid: "",
        totalAmount: ""
      });
      setSpinner(false)
    } catch (error) {
      setSpinner(false)
      alert("This Enrollment No Already exists with other student details ")
    }
  }




  return (
    <>
      <div className='container enroll-main-card'>
        <div className='form-card py-4'>
          <form className='' onSubmit={formFunc}>
            <h4 className=''>Enroll Student Details</h4><hr />
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
            <label className='label'>Paid</label><br />
            <input onChange={formHandle} name='paid'
              value={data.paid} required type='number' placeholder='Enter Paid Fee' className='input-box' /><br />
            <label className='label'>Fee</label><br />
            <input onChange={formHandle} required name='totalAmount'
              value={data.totalAmount} type='number' placeholder='Enter Fee' className='input-box' /><br /><hr />
            {spinner ? <button className="btn btn-primary" type="button" disabled="">
              <span style={{ marginRight: "0.4rem" }}
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
              Submitting...
            </button>
              : <button type='submit' className='text-white btn bg-primary'>Submit</button>}

          </form>
        </div>
      </div>
    </>
  )
}

export default Enroll