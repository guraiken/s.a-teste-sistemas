import { useState } from 'react'
import { AggregatedValue } from "../../components/counters/AggregatedValueCounter"
import { CarCounter } from "../../components/counters/CarCounter"
import CustomModal from "../../components/CustomModal"
import CarModel from "../../components/CarModel"
import { CarsList } from '../../components/CarsList'

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <h1 className="text-xl font-bold text-cyan-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <CarCounter/>
        <AggregatedValue/>
        <div className="p-6 bg-white shadow rounded-lg flex flex-col items-center w-60">
          <h2 className="text-xl font-bold mb-4">Modelos</h2>
          <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">Ver Modelos</button>
        </div>
      </div>

      <CustomModal isOpen={isOpen} setIsOpen={setIsOpen} title="Modelos em Estoque">
        <CarModel />
      </CustomModal>

      {/* Lista de Carros */}
      <CarsList/>
    </div>
  )
}

export default Dashboard
