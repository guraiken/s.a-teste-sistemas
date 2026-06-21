import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("tokenAcesso");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const getCargo = () => {
    if (user && user.cargo) return user.cargo;
    const token = localStorage.getItem("tokenAcesso");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.cargo) return decoded.cargo;
      } catch (e) {
        console.error("Erro ao decodificar token", e);
      }
    }
    if (user && user.email && user.email.toLowerCase().includes("admin")) {
      return "ADMIN";
    }
    return "VENDAS";
  };

  const isAdmin = getCargo() === "ADMIN";

  const checkLogin = (error) => {
    if (error.status === 401) {
      logout();
      toast.error("Deslogado por token inválido", {
        autoClose: 3000,
        closeButton: false,
        draggable: false  
      })
    }else return
  };

  const login = (userData, tokens) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("tokenAcesso", tokens.tokenAcesso);
    localStorage.setItem("tokenRefresh", tokens.tokenRefresh);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("tokenAcesso");
    localStorage.removeItem("tokenRefresh");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, login, loading, checkLogin, isAdmin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
