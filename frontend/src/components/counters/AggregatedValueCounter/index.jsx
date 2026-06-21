import { useState, useEffect } from "react"
import api from "../../../services/api"
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { useAuth } from "../../../contexts/AuthContext";


export const AggregatedValue = () => {

    const [aggregatedValue, setAggregatedValue] = useState(0)
    const { checkLogin } = useAuth()

    useEffect(()=> {
        const fetchCars = async () => {
            try {
                const response = await api.get("/carros")
                console.log(response)

                const aggregatedValueCalc = response.data.data.reduce((acc, car) => {
                    return acc + (Number(car.valor) || 0)
                }, 0)

                const formatoMoeda = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
                });

                setAggregatedValue(formatoMoeda.format(aggregatedValueCalc))
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
        <FaMoneyBillTrendUp size={36} className="bg-cyan-700 text-white p-1 rounded-xl mb-3"/>
        <h2 className="text-xl font-bold">
            {aggregatedValue}
        </h2>
        <p className="text-gray-500 text-sm mt-1 font-medium">Valor Agregado</p>
    </div>
  )
}
