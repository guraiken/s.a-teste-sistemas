import { useState, useEffect } from "react"
import api from "../../../services/api"
import { IoCarSportSharp } from "react-icons/io5";
import { useAuth } from "../../../contexts/AuthContext";

export const CarCounter = () => {

    const [carCounter, setCarCounter] = useState(0)
    const {checkLogin} = useAuth()

    useEffect(()=> {

        const fetchCars = async () => {
            try {
                const response = await api.get("/carros")
                console.log(response)
                setCarCounter(response.data.data.length)
            } catch (error) {
                console.error("Erro ao obter dados das consultas", error)
                if(error.status === 401) {
                    checkLogin(error)
                }
            }
        }
        fetchCars()
    }, [])
  
    return (
    <div className="p-6 bg-white shadow rounded-lg flex flex-col items-center w-60 border border-gray-100">
        <IoCarSportSharp size={36} className="bg-cyan-700 text-white p-1 rounded-2xl mb-3"/>
        <h2 className="text-xl font-bold">
            {carCounter}
        </h2>
        <p className="text-gray-500 text-sm mt-1 font-medium">Carros</p>
    </div>
  )
}
