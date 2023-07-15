import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
export default function Header() {
    let navigate = useNavigate();
    const handlelogout = () => {
        localStorage.setItem("token", "")
        navigate("/")
    }
    const handleProfile = (e) => {
        e.preventDefault()
        navigate("/updateprofile")
    }
    const handleUpdate = (e) => {
        e.preventDefault()
        navigate("/updatepassword")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-info">
                <div className="container-fluid">
                    <img src="https://s3.amazonaws.com/user-media.venngage.com/290105-e4c091a470adf39c5365ce9e28855862.png" className="logo" alt="" />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active fonttext" aria-current="page" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/aboutus" className="nav-link fonttext" >About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contactus" className="nav-link fonttext" >Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                    <ul className="navbar-nav d-flex bg-info">
                        {localStorage.getItem('token') ? <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle dash" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dashboard
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="#" onClick={(e) => handleProfile(e)}>Edit Profile</Link></li>
                                <li><Link className="dropdown-item" to="#" onClick={(e) => handleUpdate(e)}>Update Password</Link></li>
                            </ul>
                        </li> : <li className="nav-item">
                            <Link to="/register" className="nav-link fonttext">Register</Link>
                        </li>
                        }

                        <div>
                            {localStorage.getItem('token') ? <li className="nav-item">
                                <Link to="/" onClick={handlelogout} className="nav-link fonttext">Logout</Link>
                            </li> : <li className="nav-item">
                                <Link to="/login" className="nav-link fonttext">Login</Link>
                            </li>}
                        </div>
                    </ul>
                </div>
            </nav>

            {/* <div>
                <div className="alert alert-success title">
                    <h5>"Wear a mask & save lives!"</h5>
                </div>
            </div> */}
        </div>
    )
}
