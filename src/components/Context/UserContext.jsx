import axios from "axios";
import { createContext, useContext, useState } from "react";

export const userContext = createContext()



export function UserContextProvider({ children }) {

    let [userToken, setUserToken] = useState(null)

    
    


    async function sendUserData(data) {
        return axios.post('https://auth-app-10ub.onrender.com/user/signup', data)
            .then((response) => response)
            .catch((errors) => errors);
    }


    async function logedInUser(data) {
        return axios.post('https://auth-app-10ub.onrender.com/user/login', data)
            .then((response) => response)
            .catch((errors) => errors);
    }

    async function sendToChat(data) {
        return axios.post('https://auth-app-10ub.onrender.com/user/chat', data)
            .then((response) => response)
            .catch((errors) => errors);
    }

    return <userContext.Provider value={{ sendUserData ,logedInUser ,userToken, setUserToken ,sendToChat}}>
        {children}
    </userContext.Provider>
}


export const useUser = () => useContext(userContext);