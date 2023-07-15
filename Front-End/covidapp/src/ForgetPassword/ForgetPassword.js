import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
export default function ForgetPassword() {
    const [msg, setMsg] = React.useState('');
    const [error, setError] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: values => {
            fetch('http://localhost:8000/api/forget', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            .then(res => res.json())
            .then(data => {
                if(data.status===200){
                    setMsg(data.msg)
                    setError(true)
                }
                else{
                   setMsg(data.msg)
                }
            })

        },
        validationSchema: yup.object().shape({
            email: yup.string()
                .email('Invalid Email Address')
                .required('Email cannot be left blank'),
        })
    });
    function Close(){
        setError(false)
    }
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="bg-info text-light py-3 text-center rounded">
                        <h3>Recover your password</h3>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mt-2">
                            <input id="email" name="email" type="text" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Enter your email" />
                            {formik.errors.email && formik.touched.email ? <span className="text-danger">{formik.errors.email}</span> : null}
                        </div>
                        <div className="mt-4 mb-5 text-center">
                            <button type="submit" className="btn btn-success me-4">Submit</button>
                        </div>
                    </form>
                    {
                        error ? <div className="alert alert-success" role="alert">
                            {msg}<i className="float-end fa-solid fa-xmark" onClick={Close}></i>
                        </div> : null
                    }
                </div>
            </div>
        </div>
    )
}
