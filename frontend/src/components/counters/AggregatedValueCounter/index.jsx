import { useState, useEffect } from "react"
import api from "../../../services/api"
import { FaMoneyBillTrendUp } from "react-icons/fa6";


export const AggregatedValue = () => {

    const [aggregatedValue, setAggregatedValue] = useState(0)

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
            }
        }
        fetchCars()
    }, [])
  
    return (
    <div className="p-6 bg-white shadow rounded-lg flex flex-col items-center w-60">
        <h2 className="text-xl font-bold flex items-center gap-2">
            <FaMoneyBillTrendUp size={20} className="text-blue-600 flex-row-reverse"/>{aggregatedValue}
        </h2>
            {aggregatedValue && <p className="text-gray-600 mt-2">Valor Agregado</p>}
    </div>
  )
}
