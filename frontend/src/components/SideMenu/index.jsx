import { Link, useNavigate } from "react-router";
import {
    MdDashboard,
    MdExitToApp,
    MdMenu,
    MdClose
} from 'react-icons/md'

import { 
    FaUserPlus,
    FaListAlt,
    FaCalendarCheck
} from 'react-icons/fa'

import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

export const SideMenu = () => {
    const navigate = useNavigate()
    const { logout } = useAuth();

    // controle do menu lateral (aberto ou fechado)
    const [isCollapsed, setIsCollapsed] = useState(false)

    // função logout

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    //função toggle menu

    const toggleMenu = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <aside className={`h-screen bg-cyan-800 text-white flex flex-col justify-between transition-all duration-300 ${isCollapsed ? 'w-20 items-center' : 'w-64'}`}>
            <div className=" p-4 flex items-center justify-between border-b border-cyan-700">
                { !isCollapsed && (
                    <h1 className="text-lg font-bold">Clínica +</h1>
                ) 
            }
            <button onClick={toggleMenu}>
                {isCollapsed ? <MdMenu size={24}/> : <MdClose size={24}/>}
            </button>
            </div>

            {/* MENU */}
            <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
                <ul className="space-y-3">
                    <li>
                        <Link to="/dashboard" className="flex items-center gap-3 hover:text-cyan-30">
                            <MdDashboard size={20}/>
                            {!isCollapsed && <span>Início</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/pacientes" className="flex items-center gap-3 hover:text-cyan-30">
                            <FaUserPlus size={20}/>
                            {!isCollapsed && <span>Paciente</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/consultas" className="flex items-center gap-3 hover:text-cyan-30">
                            <FaCalendarCheck size={20}/>
                            {!isCollapsed && <span>Consultas</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/exames" className="flex items-center gap-3 hover:text-cyan-30">
                            <FaListAlt size={20}/>
                            {!isCollapsed && <span>Exames</span>}
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* botao de sair  */}

            <div className="p-4 border-t border-cyan-700">
                <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-red-300 hover:text-red-500 w-full cursor-pointer"
                >
                    <MdExitToApp size={20}/>
                    {!isCollapsed && <span>Sair</span>}
                </button>
            </div>

        </aside>
    )
}
