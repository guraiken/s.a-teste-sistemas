import { useState, useEffect } from "react"
import api from "../../../services/api"
import { IoCarSportSharp } from "react-icons/io5";

export const CarCounter = () => {

    const [carCounter, setCarCounter] = useState(0)

    useEffect(()=> {

        const fetchCars = async () => {
            try {
                const response = await api.get("/carros")
                console.log(response)
                setCarCounter(response.data.data.length)
            } catch (error) {
                console.error("Erro ao obter dados das consultas", error)
            }
        }
        fetchCars()
    }, [])
  
    return (
    <div className="p-6 bg-white shadow rounded-lg flex flex-col items-center w-60">
        <h2 className="text-xl font-bold flex items-center gap-2">
            <IoCarSportSharp size={20} className="text-blue-600 flex-row-reverse"/>{carCounter}
        </h2>
            {carCounter && <p className="text-gray-600 mt-2">Carros</p>}
    </div>
  )
}
