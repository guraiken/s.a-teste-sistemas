import { useState, useEffect } from "react";
import axios from "axios";
import { RiCarFill } from "react-icons/ri";
import { Link } from "react-router";
import api from "../../services/api";

export const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get("http://localhost:3000/carros");
        if (!response) return;

        const carrosData = response.data.data;

        setCars(carrosData);
        console.log(cars);
      } catch (error) {
        console.error();
      }
    };
    fetchCars();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCars = cars.filter((car) =>
    [car.modelo, car.ano, car.cor]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const formatoMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="bg-white shadow rounded 2xl p-6 mt-8">
      <h2 className="text-xl font-semibold text-cyan-800 mb-4">
        Informações Rápidas de Veículos
      </h2>

      {/* Campo de busca */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <label htmlFor="search" className="text-gray-700 font-medium">
          Buscar Veículo:
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Digite o nome, email ou telefone"
          className="border rounded-lg px-3 py-2 w-full sm:w-80 focus:ring-2 focus:ring-cyan-600 outline-none"
        />
      </div>

      {filteredCars.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {filteredCars.map((car) => (
            <li
              key={car.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-4"
            >
              <div className="flex items-center gap-4">
                <div className="bg-cyan-100 text-cyan-700 p-3 rounded-full">
                  <RiCarFill size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800"> {car.modelo}</p>
                  <p className="text-sm text-gray-600">Cor: {car.cor}</p>
                  <p className="text-sm text-gray-600">{formatoMoeda.format(car.valor)}</p>
                  <p className="text-sm text-gray-600">Ano: {car.ano}</p>
                </div>
              </div>

              <div className="text-sm text-gray-600 mt-2 sm:mt-0 text-right">
                <Link
                  to={`/carros/${car.id}`}
                  className="text-cyan-700 font-semibold hover:underline"
                >
                  Ver detalhes
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-6">
          {" "}
          Nenhum paciente encontrado{" "}
        </p>
      )}
    </div>
  );
};
