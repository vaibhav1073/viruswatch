import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate, useParams } from 'react-router';
export default function ResetPassword() {
    const [msg, setMsg] = React.useState('');
    const [error, setError] = React.useState(false);
    const { token } = useParams();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            password: ''
        },
        onSubmit: values => {
            fetch(`http://localhost:8000/api/resetpassword/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then(res => res.json())
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
            password: yup.string()
                .min(8, 'Password is too short')
                .max(15, 'Password is too long')
                .required('Password can not be left blank')
        })
    });
    function Close(){
        setError(false)
        navigate("/login")
    }
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <div className="bg-info text-light py-3 text-center rounded">
                        <h3>Enter new password</h3>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control form-control-sm" placeholder="Enter your password" />
                            {formik.errors.password && formik.touched.password ? <span className="text-danger">{formik.errors.password}</span> : null}
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
