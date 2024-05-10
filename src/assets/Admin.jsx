import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'
import { passwordContext } from '../App'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useContext(passwordContext)
  const [studentId, setStudentId] = useState("")
  const [student, setStudent] = useState([])
  const [loader, setLoader] = useState(true)
  const [delSpinner, setDelSpinner] = useState(false)
  const [pay, setpay] = useState("")
  const [enrollNum, setEnrollNum] = useState("")
  const [paySpin, setPaySpin] = useState(false)
  const [updateSpin, setUpdateSpin] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [toggle1, setToggle1] = useState(false)
  const [data, setData] = useState({
    name: "",
    studentId: "",
    Class: "",
    address: "",
    paid: "",
    totalAmount: ""
  })


  const formHandle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  // updata all student details with put method

  const formFunc = async (id) => {
    setUpdateSpin(true)
    try {
      await axios.put(`https://students-server-884c.onrender.com/students/update-all/${id}`, data)
      alert("Student Details Has Updated Successfully ")
      setUpdateSpin(false)
      setData({
        name: "",
        studentId: "",
        Class: "",
        address: "",
        paid: "",
        totalAmount: ""
      });
      setToggle(false)

    } catch (error) {
      setUpdateSpin(false)
      setLoader(true)
      alert("Please Try Again Details Has Not Updated")
      console.log(error)
    }
  }

  //  getting single student by post method
  const postFunc = async (event) => {
    event.preventDefault()
    setLoader(false)
    try {
      const response = await axios.post("https://students-server-884c.onrender.com/students/find-student", { studentId: enrollNum })
      setStudent(response.data)
      setLoader(true)
      setToggle1(true)
      setToggle(false)
    } catch (error) {
      setLoader(true)
      alert("Please Try Again or Enter Correct student Enroll No' Student Does not Exist With This Enroll No. ")
      console.log(error)
    }
  }


  // delete method 

  const delFunc = async (itemId) => {

    if (confirm("Student Will be deleted Permanently, 'Are you Sure.' ")) {
      setDelSpinner(true)
      try {
        await axios.delete(`https://students-server-884c.onrender.com/students/del-students/${itemId}`)
        alert("Student Has Deletd successfully")
        setStudent([])
        setToggle1(false)
        setDelSpinner(false)
      } catch (error) {
        setDelSpinner(false)
        console.log(error)
        alert("Try Again' Student Has Not Deletd successfully")
      }
    }
  }




  // put method for upadting student due fee 
  const putFunc = async (e) => {
    e.preventDefault()
    setPaySpin(true)
    try {
      await axios.put("https://students-server-884c.onrender.com/students/update-one", { studentId, pay })
      alert("Payment Has Done Successfully")
      setStudentId("")
      setpay("")
      setPaySpin(false)
    } catch (error) {
      setPaySpin(false)
      console.log(error)
      alert("Please Try Again'Payment Has Not Done successfully")
    }

  }

  useEffect(() => {
    if (!password) {
      navigate("/login")
    }
  }, [password])

  return (
    <>
      <div className='container mt-5 pt-5'>
        <div className='text-center'>
          <form className='' onSubmit={postFunc}>
            <h4 className=''>Get Student Details</h4>
            <p className=''>Enter the Student Enroll No To get Student Details</p>
            <hr />

            <label className='label'>Student Enrollment Number</label><br />
            <input style={{ width: "200px", marginRight: "0.4rem", height: "37px" }} name='enrollNum' value={enrollNum.trim()} placeholder='Enrollment No' onChange={(e) => setEnrollNum(e.target.value)} required type='text' className='input-box' />

            <button style={{ marginBottom: "0.3rem" }} type='submit' className=' text-white btn bg-primary'>Submit</button>
          </form>
        </div>
        <div className='text-center mt-3'>
          <h5 className='mt-4 ' style={{ textDecoration: "underline" }}>Student Details</h5>
          <div className=''>
            {loader ? <div className='mt-3 table-card'>
              <table className="table">
                <thead>
                  <tr className='bg-primary text-white'>
                  <th scope="col">JoiningDate</th>
                    <th scope="col">Student</th>
                    <th scope="col">Class</th>
                    <th scope="col">EnrollNo</th>
                    <th scope="col">Address</th>
                    <th scope="col">LastPaidDate</th>
                    <th scope="col">Paid</th>
                    <th scope="col">Due</th>
                    <th scope="col">TotalFee</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>

                  <tr key={student._id} >
                  <td >{student.joiningDate}</td>
                    <td style={{ textTransform: "capitalize" }}>{student.name}</td>
                    
                    <td>{student.Class}</td>
                    <td>{student.studentId}</td>
                    <td>{student.address}</td>
                    
                    <td>{student.lastPaymentDate}</td>
                    <td><div className='d-flex align-items-center'><span className="material-symbols-outlined rupee">
                      currency_rupee
                    </span>{student.paid}</div>

                    </td>
                    <td><div className='d-flex align-items-center'><span className="material-symbols-outlined rupee">
                      currency_rupee
                    </span>{student.totalAmount - student.paid}</div>
                    </td>
                    <td>
                      <div className='d-flex align-items-center'> <span className="material-symbols-outlined rupee">
                        currency_rupee
                      </span>{student.totalAmount}
                      </div>
                    </td>
                    <td style={{ width: '300px' }}>
                      <div style={{ width: '300px', height: "50px" }} className='pt-1 d-flex  justify-content-around align-items-center '>
                        <a href='#update'> <button onClick={() => setToggle(true)} class={toggle1 ? "btn bg-success text-white" : "d-none"}>
                          Update
                        </button></a>
                        {delSpinner ? <button className="btn btn-danger" type="button" >
                          <span style={{ marginRight: "0.4rem" }}
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          />
                          Deleting...
                        </button> : <button onClick={() => delFunc(student._id)} class={toggle1 ? "  btn bg-danger text-white m-2" : "d-none"}>
                          Delete
                        </button>}

                      </div>
                    </td>
                  </tr>


                </tbody>
              </table>
            </div> : <div style={{ height: "24vh" }} className=" d-flex justify-content-center align-items-center">
              <div className=" spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <h5 style={{ marginLeft: "0.3rem", marginTop: "0.4rem" }}>Fetching Student Details...</h5>
            </div>
            }
          </div><hr />

          <div className='mt-4 pb-3 d-flex align-items-center justify-content-center'>
            <form className='text-start' onSubmit={putFunc}>
              <h4 className=''>Pay Student Fee</h4>
              <p>Enter the student Enroll No And Pay the Due Fee </p><hr className='mb-2' />
              <label className='label'>Student Enrollment Number</label><br />
              <input name='studentId' value={studentId.trim()} onChange={(e) => setStudentId(e.target.value)} placeholder='Enrollment No' required type='text' className='input-box' /><br />
              <label className='label'>Due Amount</label><br />
              <input style={{ paddingLeft: "21px" }} required type='number' value={pay} name='pay' onChange={(e) => setpay(e.target.value)} placeholder='Enter Due Amount' className='input-box' />
              <span id="rupi" className="material-symbols-outlined">
                currency_rupee
              </span>
              <hr className='mb-3' />
              {paySpin ? <button className="btn btn-primary" type="button" >
                <span style={{ marginRight: "0.4rem" }}
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
                Paying...
              </button> : <button type='submit' className='text-white btn bg-primary'>Pay Fee</button>
              }
            </form>

          </div><hr />
          <div id='update' className='mb-3 d-flex justify-content-center text-center'>
            {toggle && <div className='form-card py-4'>
            <h4 className=''>Update Student Details All</h4><hr />
              <form id='form-response' className='text-start' onSubmit={(e) => {
                formFunc(student._id)
                e.preventDefault()
              }}>
                
               <div  className='form-sub-card'> 
                <label className='label'>Student Name</label><br />
                <input placeholder='Student Name' onChange={formHandle} required type='text' name='name'
                  value={data.name} className='input-box' /><br />
                <label className='label'>Enrollment Number</label><br />
                <input onChange={formHandle} placeholder='Enrollment No' required name='studentId'
                  value={data.studentId.trim()} type='text' className='input-box' /><br />
                <label className='label'>Class</label><br />
                <input onChange={formHandle} required name='Class'
                  value={data.Class} type='text' placeholder='Enter Class' className='input-box' /><br />
                  </div>
                  <div className=''> 
                <label className='label'>Address</label><br />
                <input onChange={formHandle} name='address'
                  value={data.address} required type='text' placeholder='Enter Address' className='input-box' /><br />
                <label className='label'>Paid</label><br />
                <input style={{ paddingLeft: "21px" }} onChange={formHandle} name='paid'
                  value={data.paid} required type='number' placeholder='Enter Paid Fee' className='input-box' />
                <span id="rupi1" className="material-symbols-outlined">
                  currency_rupee
                </span><br />

                <label className='label'>Fee</label><br />
                <input style={{ paddingLeft: "21px" }} onChange={formHandle} required name='totalAmount'
                  value={data.totalAmount} type='number' placeholder='Enter Fee' className='input-box' />
                <span id="rupi2" className="material-symbols-outlined">
                  currency_rupee
                </span>
                <hr />



                {updateSpin ? <button className="btn btn-primary" type="button" disabled="">
                  <span style={{ marginRight: "0.4rem" }}
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Updating...
                </button>
                  : <button type='submit' className='text-white btn bg-primary'>Update</button>}
</div>
              </form>
            </div>}

          </div>
        </div>

      </div>

    </>
  )
}

export default Admin