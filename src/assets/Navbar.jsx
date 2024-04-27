import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-primary">
        <div className="container">
          <a style={{ fontSize: "24px" }} className="fw-bold navbar-brand text-white" href="">
            Dashboard
          </a>
          <button
            className="navbar-toggler bg-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active text-white nav-text" aria-current="page" href="#">
                  Enroll
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/students" className="nav-link text-white nav-text " href="#">
                  Students
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin" className="nav-link text-white  nav-text" href="#">
                  Admin
                </Link>
              </li>
            </ul>
            <Link to="/login">
              <button className="navbar-text text-dark btn bg-white nav-text">Log in</button>
            </Link>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar