import { useState } from "react"
import { InputHandler } from "../LoginForm/InputHandler"
import { toast } from "react-toastify"
import api from "../../services/api"

const RegisterUser = () => {

    //usestates dos campos
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [cargo, setCargo] = useState('VENDAS')

    //validações e o loading
    const [isSaving, setIsSaving] = useState(false)
    const [isPasswordMatch, setIsPasswordMatch] = useState(true)

    //validação do match

    const isPasswordValid = () => password.length >= 8 && password === confirmPassword 

    const cleanForm = () => {
        setNome("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setCargo("VENDAS")
        setIsPasswordMatch(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!isPasswordValid()){
            setIsPasswordMatch(false)
            return
        }

        setIsSaving(true)

        try {
            await api.post("/usuarios",{
                nome, email, senha: password, cargo
            })
            setIsSaving(false)
            cleanForm()
            toast.success("Usuário Registrado com Sucesso!", {
                autoClose:2000,
                hideProgressBar: true  
            })
            
        } catch (error) {
            console.log("Erro ao criar usuário", error)
            const message = error.response?.data?.message || "Erro ao criar o usuário!"
            toast.error(message, {
                autoClose:2000,
                hideProgressBar: true
            })
            setIsSaving(false)
        }
    }

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Usuário</h2>
        <form onSubmit={handleSubmit}>
            <fieldset>
            <InputHandler
                labelClass="block text-sm font-medium mb-1"
                label={"Nome:"}
                type={"text"}
                id={"nome"}
                value={nome}
                setValue={setNome}
                required
                className={"w-full p-2 border rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500"}
                />
            </fieldset>
            <fieldset>
            <InputHandler
                labelClass="block text-sm font-medium mb-1"
                label={"E-mail:"}
                type={"email"}
                id={"email"}
                value={email}
                setValue={setEmail}
                required
                className={"w-full p-2 border rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500"}
                />
            </fieldset>
            <fieldset>
            <InputHandler
                labelClass="block text-sm font-medium mb-1"
                label={"Senha:"}
                type={"password"}
                id={"password"}
                value={password}
                setValue={setPassword}
                required
                min={8}
                className={"w-full p-2 border rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500"}
            />
            </fieldset>
            <fieldset>
            <InputHandler
                label={"Confirmar Senha:"}
                type={"password"}
                id={"confirmPassword"}
                value={confirmPassword}
                setValue={setConfirmPassword}
                required
                min={8}
                className={"w-full p-2 border rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500"}
            />

                {!isPasswordMatch && (
                    <p className="text-red-500 text-sm mt-1">As senhas não correspondem</p>
                )}
            </fieldset>
            <fieldset className="mt-4">
                <label className="block text-sm font-medium mb-1">Cargo:</label>
                <select 
                    value={cargo} 
                    onChange={(e) => setCargo(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="VENDAS">Vendas</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </fieldset>

            <div>
                <button
                type="submit"
                className={`w-full p-2 rounded-lg text-white mt-4 ${
                    isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                } transition-colors`}
                disabled={isSaving}
                >
                    {isSaving ? "Salvando..." : "Criar Usuário"}
                </button>
            </div>
        </form>
    </div>
  )
}

export default RegisterUser