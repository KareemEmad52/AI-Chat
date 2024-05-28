import { useState } from 'react'
import Styles from "./Login.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import Nabvar from '../Navbar/Nabvar'
import { useUser } from '../Context/UserContext'
import { toast } from "react-toastify"
import { Helmet } from "react-helmet";
import logo from '../../../public/Assets/ChatGPT_Logo_PNG1.png'




export default function Login() {


    const navigate = useNavigate();
    let [isLoading, setIsLoading] = useState(false)
    let [errors, setErrors] = useState(null)
    let { logedInUser, setUserToken } = useUser()


    let validationSchema = Yup.object({
        email: Yup.string().email('email is invaild').required('Email is required'),
        password: Yup.string().matches(/^[A-Za-z0-9]{7,}/, 'Password Must be at least 8 charcters').required('Password is required'),
    })


    const sendData = async (values) => {
        setIsLoading(true)
        let res = await logedInUser(values)
        if (res.response?.data.message) {
            toast.error(`${res.response.data.message}`)
        } else {
            localStorage.setItem("token", res.data.token);
            setUserToken(res.data.token)
            navigate("/");
        }
        setIsLoading(false)
    }


    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        validationSchema,
        onSubmit: sendData,
    })


    return <>

        <Helmet>
            <meta charSet="utf-8" />
            <title>Login</title>
            <link rel="canonical" href="http://mysite.com/example" />
            <link rel="icon" href={logo} />
        </Helmet>


        <div className='fixed-top'> <Nabvar /></div>
        <div className={` ${Styles.FormResponsive}  mx-auto p-5 shadow-lg rounded-2 `}>


            <h2>Login : </h2>

            <form onSubmit={formik.handleSubmit}>



                <label htmlFor="userEmail">email : </label>
                <input id='userEmail' type="email" className='form-control mb-2 mt-1' value={formik.values.emailmail} onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' />
                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.email}</div> : ''}



                <label htmlFor="userPassword">password : </label>
                <input id='userPassword' type="password" className='form-control mb-3 mt-1' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} name='password' />
                {formik.errors.password && formik.touched.password ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.password}</div> : ''}



                <div className="d-flex justify-content-between align-items-center w-100">
                    {isLoading ? <button type='submit' className='btn btn-success bg-main text-main  mb-2'> <ThreeDots className="mt-5" height="24" width="35" radius="5" color="#fff" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true} /> </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success text-white  bg-main text-main mb-2'>Login</button>}

                    <div><Link to={'/signup'} className='text-main'> Sign up</Link></div>

                </div>





            </form>


        </div>



    </>
}
