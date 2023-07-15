import { useFormik } from 'formik'
import * as yup from 'yup'
import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
export default function EditProfile() {
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            city: '',
            phone: '',
        },
        onSubmit: values => {
            axios.post("http://localhost:8000/api/updateprofile",
                { "firstname": values.firstname, "lastname": values.lastname, "city": values.city, "phone": values.phone },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }).then((res) => {
                    if (res.status === 200) {
                        setMessage("Profile Updated")
                        setError(true);
                    }
                    else {
                        setMessage(res.data.msg)
                    }
                })
        },
        validationSchema: yup.object().shape({
            firstname: yup.string()
                .min(3, 'FirstName is too short')
                .max(10, 'FirstName is too long')
                .required('FirstName cannot be left blank'),
            lastname: yup.string()
                .min(3, 'LastName is too short')
                .max(10, 'LastName is too long')
                .required('LastName cannot be left blank'),
            city: yup.string()
                .required('City cannot be left blank'),
            phone: yup.string()
                .required('Phone cannot be left blank'),
        }),

    });
    function handleback(){
        navigate(-1);
    }
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="bg-info text-light py-3 text-center rounded">
                        <h3>Update Your Profile Here</h3>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mt-2">
                            <input id="firstname" name="firstname" type="text" value={formik.values.firstname} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="First Name" />
                            {formik.errors.firstname && formik.touched.firstname ? <span className="text-danger">{formik.errors.firstname}</span> : null}
                        </div>
                        <div className="mt-2">
                            <input id="lastname" name="lastname" type="text" value={formik.values.lastname} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Last Name" />
                            {formik.errors.lastname && formik.touched.lastname ? <span className="text-danger">{formik.errors.lastname}</span> : null}
                        </div>
                        <div className="mt-2">
                            <input id="city" name="city" type="text" value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="City" />
                            {formik.errors.city && formik.touched.city ? <span className="text-danger">{formik.errors.city}</span> : null}
                        </div>
                        <div className="mt-2">
                            <input id="phone" name="phone" type="text" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Phone" />
                            {formik.errors.phone && formik.touched.phone ? <span className="text-danger">{formik.errors.phone}</span> : null}
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className="mt-4 mb-5 text-center">
                                    <button type="submit" className="btn btn-primary" onClick={handleback} >Back</button>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="mt-4 mb-5 text-center">
                                    <button type="submit" className="btn btn-success" >Update</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    {
                        error ? <div className="alert alert-success mt-2" role="alert">
                            {message}
                        </div> : null
                    }
                </div>
            </div>
        </div>
    )
}