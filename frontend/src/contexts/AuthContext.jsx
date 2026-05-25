import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const savedUser = localStorage.getItem("user")
        const token = localStorage.getItem("tokenAcesso")
        
        if(savedUser && token) {
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

    const login = (userData, tokens) => {
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("tokenAcesso", tokens.tokenAcesso)
        localStorage.setItem("tokenRefresh", tokens.tokenRefresh)
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("tokenAcesso")
        localStorage.removeItem("tokenRefresh")
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{user, logout, login, loading}}
        >   
          {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

