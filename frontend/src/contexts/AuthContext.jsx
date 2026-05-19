import { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const savedUsername = localStorage.getItem("username")
        if(savedUsername) return setUser({username: savedUsername})
    }, [])

    const login = (username) => {
        localStorage.setItem("username", username)
        setUser({ username })
    }

    const logout = () => {
        localStorage.removeItem("username")
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

