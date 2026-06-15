import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { InputHandler } from "./InputHandler";
import { toast } from "react-toastify";
import { Modal } from "../Modal";

import { Link, useNavigate } from "react-router";
import api from "../../services/api";
import RegisterUser from "../RegisterUser";

const LoginForm = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // auth do usuario (verifica se o usuario esta logado)
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        email: email.trim(),
        senha: password.trim()
      });

      const { tokenAcesso, tokenRefresh } = response.data.data;
      
      // Decodificando básico ou apenas passando os dados que o backend deveria retornar
      // Como o backend logar retorna apenas tokens, vamos assumir um perfil básico
      // Ou poderíamos ter uma rota /me no backend. Por enquanto, salvaremos o email.
      login({ email }, { tokenAcesso, tokenRefresh });

      toast.success("Login realizado com sucesso!", {
        autoClose: 2000,
      });

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error("Erro ao realizar login", error);
      const message = error.response?.data?.message || "Erro ao conectar com o servidor";
      toast.error(message, {
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <section
        className="w-full flex justify-center items-center"
      >
        <form 
          className="flex flex-col justify-center items-center bg-white px-12 h-[400px] rounded-md shadow-md"
          onSubmit={handleLogin}
        >
          <h2 className="font-bold text-2xl mb-4">Login</h2>
          <InputHandler
            label={"E-mail"}
            type={"email"}
            required
            id={"email"}
            value={email}
            setValue={setEmail}
          />
          <InputHandler
            label={"Senha"}
            type={"password"}
            required
            id={"senha"}
            value={password}
            setValue={setPassword}
            min={8}
          />
          <button
            className="text-lg text-white mt-2 py-2 w-full rounded-md bg-cyan-700 cursor-pointer hover:bg-cyan-800 transition-colors"
            type="submit"
          >
            Entrar
          </button>
          <p className="mt-4">
            Não possui login?{" "}
            <a
              className="text-blue-600 hover:cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              Cadastre-se
            </a>
          </p>
          <div className="flex justify-between mt-2 text-sm">
            <button
              onClick={() => toast.info("function WIP")}
              className="text-blue-600 hover:cursor-pointer"
            >
              Esqueceu sua senha?
            </button>
          </div>
        </form>
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RegisterUser onClose={() => setIsModalOpen(false)}/>
      </Modal>
    </div>
  );
};

export default LoginForm;
