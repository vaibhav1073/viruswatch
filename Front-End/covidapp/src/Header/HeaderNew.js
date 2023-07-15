import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";


const navBarBGcolor={
    backgroundColor: "#0f2741",
}
const imgStyle={
    
    height:"03rem",
    
    // backgroundColor:"pink"
    
     
     
}



export default function HeaderNew() {
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
        <>
            <nav className="navbar navbar-dark navbar-expand-lg" style={navBarBGcolor} >
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    {/* <ul className="navbar-nav d-flex bg-info">
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
                    </ul> */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page" >Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/aboutus" className="nav-link active" aria-current="page" >About Us</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/contactus" className="nav-link active" aria-current="page" >Contact Us</Link>
                            </li>

                        </ul>


                       <div className="container col-md-4 position-sticky">
                       <Link to="/" className=" mx-auto" href="#">
                        <img src="/logostat.png" className=" position-sticky logo"  style={imgStyle}alt="" />
                        </Link>
                       </div>

                       {/* {localStorage.getItem('token')?  <div class="nav-item dropdown">
              <Link class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dashboard
              </Link>
              <ul class="dropdown-menu">
                <li><Link to="#" class="dropdown-item" onClick={(e) => handleProfile(e)}>Edit profile</Link></li>
                <li><Link to="#" class="dropdown-item" onClick={(e) => handleUpdate(e)} >Update Password</Link></li>
                </ul></div>:<Link to='/register' className="btn btn-success" type="submit" role="button">Register</Link>}

                {localStorage.getItem('token') ? <Link to="/" onClick={handlelogout} className="btn btn-primary mx-2 " type="submit" role="button">Logout</Link>: <Link to="/login" className="btn btn-primary mx-2 ">Login</Link> } */}


<ul className="navbar-nav d-flex ">
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
                </div>
            </nav>
        </>
    )
}
