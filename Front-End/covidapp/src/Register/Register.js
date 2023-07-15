import { useFormik } from 'formik'
import * as yup from 'yup'
import React from 'react'
import { useNavigate} from 'react-router-dom';

export default function Register() {
    const [msg, setMsg] = React.useState('');
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            city: '',
            phone: '',
            password: ''
        },
        onSubmit: values => {
            fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
                .then(res => res.json())
                .then(data => {
                    if(data.status===409){
                        setMsg(data.message)
                        setError(true)
                        navigate("/register")
                    }
                    else{
                        navigate("/login")
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
            email: yup.string()
                .email('Invalid Email Address')
                .required('Email cannot be left blank'),
            city: yup.string()
                .required('City cannot be left blank'),
            phone: yup.string()
                .required('Phone cannot be left blank'),
            password: yup.string()
                .min(8, 'Password is too short')
                .max(15, 'Password is too long')
                .required('Password can not be left blank')
        }),

    });
    function Change() {
        navigate("/login");
    }
    function Close(){
        setError(false)
    }
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="bg-info text-light py-3 text-center rounded">
                        <h3>Register here to get updates</h3>
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
                            <input id="email" name="email" type="text" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Email" />
                            {formik.errors.email && formik.touched.email ? <span className="text-danger">{formik.errors.email}</span> : null}
                        </div>
                        <div className="mt-2">
                            <input id="city" name="city" type="text" value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="City" />
                            {formik.errors.city && formik.touched.city ? <span className="text-danger">{formik.errors.city}</span> : null}
                        </div>
                        <div className="mt-2">
                            <input id="phone" name="phone" type="text" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Phone" />
                            {formik.errors.phone && formik.touched.phone ? <span className="text-danger">{formik.errors.phone}</span> : null}
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Password" />
                            {formik.errors.password && formik.touched.password ? <span className="text-danger">{formik.errors.password}</span> : null}

                                                    </div>

                                                    <div className="mt-2">
                                                        <button className="btn btn-primary " type='submit'>
                                                            Register

                                                        </button>
                                                    </div>
                        
                    </form>


                    {
                        error ? <div className="alert alert-danger" role="alert">
                            {msg}<i className="float-end fa-solid fa-xmark" onClick={Close}></i>
                        </div> : null
                    }
                </div>
                <div className='mt-3 text-center'>
                    <h5>Do you have an account? <button onClick={Change} className='btn btn-primary'>Log In Here</button></h5>
                </div>
            </div>
        </div>
    )
}