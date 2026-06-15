import { Link, useNavigate } from "react-router";
import { MdDashboard, MdExitToApp, MdMenu, MdClose } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri"
import { FaListAlt } from "react-icons/fa";

import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

export const SideMenu = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // controle do menu lateral (aberto ou fechado)
  const [isCollapsed, setIsCollapsed] = useState(false);

  // função logout

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  //função toggle menu

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  const widthClass = isCollapsed ? 'w-20' : 'w-64';

  return (
    <>
      {/* spacer to avoid overlaying content */}
      <div className={`${widthClass} flex-shrink-0 h-screen`} />

      <aside className="fixed top-0 left-0 z-40 h-screen">
        <section
          className={`${widthClass} bg-cyan-800 h-screen text-white flex flex-col justify-between transition-all duration-300 ${isCollapsed ? "items-center" : ""}`}
        >
          <div className=" p-4 flex items-center justify-between border-b border-cyan-700">
            {!isCollapsed && <h1 className="text-lg font-bold">Carros +</h1>}
            <button onClick={toggleMenu}>
              {isCollapsed ? <MdMenu size={24} /> : <MdClose size={24} />}
            </button>
          </div>

          {/* MENU */}
          <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
            <ul className="space-y-3">
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 hover:text-cyan-300"
                >
                  <MdDashboard size={20} />
                  {!isCollapsed && <span>Início</span>}
                </Link>
              </li>
              <li>
                <Link
                  to="/carros"
                  className="flex items-center gap-3 hover:text-cyan-300"
                >
                  <FaListAlt size={20} />
                  {!isCollapsed && <span>Carros</span>}
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="flex items-center gap-3 hover:text-cyan-300"
                >
                  <RiAdminFill size={20} />
                  {!isCollapsed && <span>Painel de Admin</span>}
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
              <MdExitToApp size={20} />
              {!isCollapsed && <span>Sair</span>}
            </button>
          </div>
        </section>
      </aside>
    </>
  );
};
