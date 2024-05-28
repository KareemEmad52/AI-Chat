import React, { useEffect, useState } from 'react'
import Styles from "./Home.module.css"
import { useFormik } from 'formik';
import Nabvar from '../Navbar/Nabvar';
import { useUser } from '../Context/UserContext';
import { ThreeDots } from 'react-loader-spinner';
import { Helmet } from "react-helmet";
import logo from '../../../public/Assets/ChatGPT_Logo_PNG1.png'


export default function Home() {

    const [isLoading, setIsLoading] = useState(false);
    const { setUserToken, sendToChat } = useUser()
    const [messages, setMessages] = useState([]);
    const date = new Date();

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setUserToken(localStorage.getItem('token'))
        }
    }, [])


    const chatRes = async () => {

    }



    const handleSubmit = async (values, { setSubmitting, resetForm }) => {


        resetForm()
        const newMessage = (<>
            <div key={messages.index} className={`${Styles.chatMessage} received mt-4`}>
                <h5 className='fw-semibold'>Me : </h5>
                <p className='ps-3'>{values.message}</p>
                <span className={`${Styles.messageTimestamp}`}>{`${date.getHours()}:${date.getMinutes()} ${date.getHours() >= 12 ? 'PM' : 'AM'}`}</span>
            </div>
        </>
        );
        
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setIsLoading(true)

        
        let res = await sendToChat(values)
        let chatResponseMessage = res.data[0].generated_text


        const chatMessage = (<>

            <div key={messages.length} className={`${Styles.chatMessage} received mb-2 `}>
                <h5 className='fw-semibold'>ChatGPT : </h5>
                <p className='ps-3'>{chatResponseMessage}</p>
                <span className={`${Styles.messageTimestamp}`}>{`${date.getHours()}:${date.getMinutes()} ${date.getHours() >= 12 ? 'PM' : 'AM'}`}</span>
            </div>
        </>
        );
        

        setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, chatMessage]);
            setIsLoading(false)
        }, 700);

    }


    let formik = useFormik({
        initialValues: {
            message: '',
        },

        onSubmit: handleSubmit,
    })

    return <>


        <Helmet>
            <meta charSet="utf-8" />
            <title>ChatGPT</title>
            <link rel="canonical" href="http://mysite.com/example" />
            <link rel="icon" href={logo} />
        </Helmet>
        <div className='bg-danger vh-100 w-100'>
            <div className="container-fluid">
                <div className="row">
                    <div className={`bg-light vh-100 col-md-12 px-0`}>
                        <Nabvar />
                        <div className='h-75  text-white w-100 d-flex flex-column justify-content-center align-items-center'>
                            <div className={`${Styles.scrollableDiv} w-75 h-100 border border-1 border-success-subtle shadow bg-light text-dark overflow-y-auto rounded-2`}>
                                <div className={`${Styles.chatContainer}`}>

                                    <div id='MsgBox' className={`${Styles.chatMessage} received `}>
                                        <p className='fs-5 mt-2'>Hello! How can I assist you today?</p>
                                        <span className={`${Styles.messageTimestamp}`}>{`${date.getHours()}:${date.getMinutes()} ${date.getHours() >= 12 ? 'PM' : 'AM'}`}</span>
                                    </div>

                                    {messages.map((message, index) => (
                                        <div key={index}>{message}</div>
                                    ))}

                                    {isLoading ? <div id='MsgBox' className={`${Styles.chatMessage} received ${Styles.chatMessageLoader}`}>
                                        <ThreeDots
                                            visible={true}
                                            height="20"
                                            width="60"
                                            color="#4fa94d"
                                            radius="2"
                                            ariaLabel="three-dots-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                        />
                                    </div> : ""}

                                </div>
                            </div>
                            <div className='w-75   pt-3 py-1'>
                                <div >
                                    <form className="d-flex" onSubmit={formik.handleSubmit}>
                                        <input id='MessageInput' placeholder='Write your message here ...' type="text" className={`form-control ${Styles.formInput}`} value={formik.values.message} onBlur={formik.handleBlur} onChange={formik.handleChange} name='message' />
                                        {isLoading ? <button disabled={true} className="btn btn-success ms-3" type="submit">Send</button> : <button disabled={!(formik.isValid && formik.dirty)} className="btn btn-success ms-3" type="submit">Send</button>}
                                    </form>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </>




}
