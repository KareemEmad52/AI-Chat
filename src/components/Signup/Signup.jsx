import { Link, useNavigate } from "react-router-dom"
import Styles from "./Signup.module.css"
import { useState } from "react"
import { useFormik } from "formik"
import { ThreeDots } from 'react-loader-spinner'
import * as Yup from 'yup'
import Nabvar from "../Navbar/Nabvar"
import { useUser } from "../Context/UserContext"
import { toast } from "react-toastify"
import { Helmet } from "react-helmet";
import logo from '../../../public/Assets/ChatGPT_Logo_PNG1.png'



export default function Signup() {

    const navigate = useNavigate();
    let [errors, setErrors] = useState(null);
    let [isLoading, setIsLoading] = useState(false)
    let { sendUserData } = useUser()

    let validateSchema = Yup.object({
        name: Yup.string().required('Email is required'),
        email: Yup.string().email('email is invaild').required('Email is required'),
        password: Yup.string().matches(/^[A-Za-z0-9]{7,}/, 'Password Must be at least 8 charcters').required('Password is required'),
        phone: Yup.string().matches(/^0?1\d{9}$/, 'Phone must be Valid Egyption Number').required("Phone is required"),
        age: Yup.number().min(18, 'Must be above 18').max(100).required('Age is required'),
    })


    const sendData = async (values) => {
        setIsLoading(true)
        let res = await sendUserData(values)
        if (res.response?.data.message) {
            toast.error(`${res.response.data.message}`)
        } else {
            navigate("/login");
        }
        setIsLoading(false)
    }


    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            phone: '',
            age: '',
        },

        validationSchema: validateSchema,
        onSubmit: sendData,
    })
    return <>

        <Helmet>
            <meta charSet="utf-8" />
            <title>Signup</title>
            <link rel="canonical" href="http://mysite.com/example" />
            <link rel="icon" href={logo} />
        </Helmet>

        <div className='fixed-top'> <Nabvar /></div>
        <div className={` ${Styles.FormResponsive}  mx-auto p-5 shadow-lg rounded-2 `}>

            {errors ? <div className='alert alert-danger'>{errors}</div> : ''}


            <h2 className="mb-2">Sign up : </h2>

            <form onSubmit={formik.handleSubmit}>


                <label htmlFor="userName">Name : </label>
                <input id='userName' type="name" className='form-control mb-2 mt-1' value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} name='name' />
                {formik.errors.name && formik.touched.name ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.name}</div> : ''}



                <label htmlFor="userEmail">Email : </label>
                <input id='userEmail' type="email" className='form-control mb-2 mt-1' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' />
                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.email}</div> : ''}



                <label htmlFor="userPassword">Password : </label>
                <input id='userPassword' type="password" className='form-control mb-3 mt-1' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} name='password' />
                {formik.errors.password && formik.touched.password ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.password}</div> : ''}

                <label htmlFor="userPhone">Phone : </label>
                <input id='userPhone' type="phone" className='form-control mb-3 mt-1' value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} name='phone' />
                {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.phone}</div> : ''}

                <label htmlFor="userAge">Age : </label>
                <input id='userAge' type="age" className='form-control mb-3 mt-1' value={formik.values.age} onBlur={formik.handleBlur} onChange={formik.handleChange} name='age' />
                {formik.errors.age && formik.touched.age ? <div className='alert alert-danger p-2 mt-2'>{formik.errors.age}</div> : ''}



                <div className="d-flex justify-content-between align-items-center w-100">
                    {isLoading ? <button type='submit' className='btn btn-success bg-main text-main  mb-2'> <ThreeDots className="mt-5" height="24" width="35" radius="5" color="#fff" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true} /> </button>
                        :
                        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success  mb-2'>Sign up</button>}

                    <div><Link to={'/login'} className='text-main'> Log in</Link></div>

                </div>





            </form>


        </div>


    </>
}
