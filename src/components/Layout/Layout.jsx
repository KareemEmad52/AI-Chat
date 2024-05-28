import { Outlet } from 'react-router-dom'
import style from './Layout.module.css'



export default function Layout() {




  return <>

    <div className='vh-100 d-flex justify-content-center align-items-center'>
    <Outlet/>
    </div>
  </>
}