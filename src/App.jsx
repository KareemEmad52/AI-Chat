import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Layout from "./components/Layout/Layout"
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { UserContextProvider } from './components/Context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



let routers = createHashRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
    ]
  }
])




function App() {

  


  return (
    <>
      <UserContextProvider>
        <RouterProvider router={routers} ></RouterProvider>
        <ToastContainer />
      </UserContextProvider>
    </>
  )
}

export default App
