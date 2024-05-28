import Styles from "./Navbar.module.css"
import logo from "/Assets/Logo.png"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useUser } from "../Context/UserContext"

export default function Nabvar() {

    let { userToken, setUserToken } = useUser()
    const navigate = useNavigate();
    async function logout() {
        localStorage.removeItem("token");
        setUserToken(null);
        navigate("/login");
    }

    return <>
        <div className=' px-3 mb-5 d-flex justify-content-between align-items-center'>
            <Link to='/'>
                <img className={`${Styles.logoImg}`} src={logo} />
            </Link>
            <div className="d-flex justify-content-center align-items-center gap-3">
                {userToken ? <span onClick={() => {
                    logout();
                }} className={`${Styles.cursorPointer} h6 text-decoration-none `} >Log out</span> : ""}

            </div>
        </div>


    </>
}
