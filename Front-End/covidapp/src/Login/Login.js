import { useFormik } from 'formik'
import * as yup from 'yup'
import React from 'react'
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [error, setError] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            fetch(`http://localhost:8000/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            .then((res)=>res.json())
                .then((data) => {
                    if (data.token && data.status===200) {
                        localStorage.setItem('token', data.token);
                        navigate(`/userprofilepage/${values.email}`);
                    } else if(data.status===404) {
                        setError(true);
                        setMsg(data.msg)
                    }
                    else{
                        setError(true);
                        setMsg(data.msg)
                    }
                })
        },
        validationSchema: yup.object().shape({
            email: yup.string()
                .email('Invalid Email Address')
                .required('Email cannot be left blank'),
            password: yup.string()
                .required('Password cannot be left blank')
        }),
    });
    function Close(){
        setError(false)
    }
    function Change(){
        navigate("/register");
    }
    return (
        <div>
            <div className="container mt-3">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <div className="bg-info text-light py-3 text-center rounded">
                        <h2>Sign In Here</h2>
                    </div>
                    <form onSubmit={formik.handleSubmit} className="mb-3">
                        <div className="mt-2">
                            <input id="email" name="email" type="text" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Email" />
                            {formik.errors.email && formik.touched.email ? <span className="text-danger">{formik.errors.email}</span> : null}
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Password" />
                            {formik.errors.password && formik.touched.password ? <span className="text-danger">{formik.errors.password}</span> : null}
                        </div>
                        <div className="mt-2 text-center">
                            <button id="btnLogin" type="submit" className="btn btn-success me-4 mt-3">Log In</button>
                            <Link to="/forgetpassword" className='mt-4'>Forget Password?</Link>
                        </div>
                    </form>
                    {
                        error ? <div className="alert alert-danger" role="alert">
                            {msg}<i className="float-end fa-solid fa-xmark" onClick={Close}></i>
                        </div> : null
                    }
                </div>
            </div>
            <div className='mt-5 text-center'>
                <h5>New User? <button onClick={Change} className='btn btn-primary'>Register</button></h5>
            </div>
        </div>
        </div>
    )
}