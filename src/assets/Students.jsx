import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'
import { passwordContext } from '../App'
import { useNavigate } from 'react-router-dom'
import { api5 } from './api.js'

const Students = () => {
  const [data, setData] = useState([])
  const [password, setPassword] = useContext(passwordContext)
  const navigate = useNavigate();

  useEffect(() => {

    if (!password) {
      navigate("/login")
    }
  }, [password])

  
  //  get method of students 
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`${api5}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
        alert("Please Try Again: Server Is Not Responding");
      }
    };
     
      
  
    fetchData();
  }, [])




  return (
    <>
      <div className=' students-card d-flex justify-content-evenly  flex-wrap mt-2 pt-3 pb-1'>
        <h4 className='all-text'>All Students details</h4>
        <h4 className='all-text'>Total Students : <b style={{ textDecoration: "underline" }}>{data.length}</b>  </h4>
      </div>
      <div className='container mt-5 ' >

        {data.length ? <div className='table-card' style={{ paddingTop: "5rem" }}>
          <table className="table">
            <thead>
              <tr className='bg-primary text-white'>
                <th scope="col" >Sl.No</th>
                <th scope="col">JoiningDate</th>
                <th scope="col">Student</th>
                <th scope="col">Class</th>
                <th scope="col">EnrollNo</th>
                <th scope="col">Address</th>
                <th scope="col">Paid</th>
                <th scope="col">Due</th>
                <th scope="col">TotalFee</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item._id} >
                  <th scope="row">{index + 1}</th>
                  <td >{item.joiningDate}</td>
                  <td style={{ textTransform: "capitalize" }}>{item.name}</td>
                  <td>{item.Class}</td>
                  <td>{item.studentId}</td>
                  <td>{item.address}</td>
                  <td><div className='d-flex align-items-center'><span className="material-symbols-outlined rupee">
                    currency_rupee
                  </span>{item.paid}</div>

                  </td>
                  <td><div className='d-flex align-items-center'><span className="material-symbols-outlined rupee">
                    currency_rupee
                  </span>{item.totalAmount - item.paid}</div>
                  </td>
                  <td><div className='d-flex align-items-center'> <span className="material-symbols-outlined rupee">
                    currency_rupee
                  </span>{item.totalAmount}</div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div> : <div style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 style={{ marginLeft: "0.3rem", marginTop: "0.3rem" }}>Loading...</h5>
        </div>
        }

      </div>
    </>
  )
}

export default Students