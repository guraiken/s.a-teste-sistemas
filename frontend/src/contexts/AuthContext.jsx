import { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const savedEmail = localStorage.getItem("email")
        if(savedEmail) return setUser({email: savedEmail})
    }, [])

    const login = (email) => {
        localStorage.setItem("email", email)
        setUser({ email })
    }

    const logout = () => {
        localStorage.removeItem("email")
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{user, logout, login}}
        >   
          {children}
        </AuthContext.Provider>
    )
}

//hook custom pra consumo do contexto

export const useAuth = () => useContext(AuthContext)

