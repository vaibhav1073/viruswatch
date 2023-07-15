import axios from "axios"
import { useState } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";
export default function UpdatePassword() {
    const [updatedPw, setUPW] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false);
    let navigate = useNavigate();
    const handleChange = (e) => {

        setUPW(e.target.value)
    }
    const updatePassword = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/updatepassword",
            { "password": updatedPw },
            {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            }).then((res) => {
                if (res.data.status === 200) {
                    setMessage(res.data.msg)
                    setError(true);
                } else {
                    setMessage(res.data.msg)
                }
            })
            .catch((err) => console.log(err))
    }
    function Close() {
        setError(false);
        localStorage.setItem('token',"");
        navigate('/login')
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="bg-info text-light py-3 text-center rounded">
                            <h3>Update your Password</h3>
                        </div>
                        <div className="text-center">
                            <h5 className="text-center mt-4">Enter your new password:</h5>
                            <div className="col-md-6 offset-md-3">
                                <form action="">
                                <input name="password" type="password" onChange={handleChange} className="form-control form-control-lg mt-3" placeholder="Enter New Password" required/>
                                <button className="btn btn-primary mt-3 mb-4" onClick={(e) => updatePassword(e)}>Update</button>
                                </form>
                                {

                                    error ? <div className="alert alert-success mt-2" role="alert">
                                        {message}<i className="float-end fa-solid fa-xmark" onClick={Close}></i>
                                    </div> : null

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
