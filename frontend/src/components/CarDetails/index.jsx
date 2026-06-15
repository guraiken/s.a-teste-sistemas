import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../services/api";
import { FaCarOn } from "react-icons/fa6";
import axios from "axios";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .get(`/carros/${id}`)
      .then((res) => {
        setCar(res.data?.data || null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const venderCarro = async () => {
    try {
      const response = await axios.delete(id)
      
      
    } catch (error) {
      
    }
  }

  if (loading) return <div className="p-4">Carregando...</div>;
  if (error) return <div className="p-4 text-red-600">Erro ao carregar carro.</div>;
  if (!car) return <div className="p-4">Carro não encontrado.</div>;

  return (
    <section className="py-8 mt-4 px-4  rounded-xl text-white">
      <div className="flex justify-center">
        <FaCarOn size={100} color="#FFF" />
      </div>

      <div className="mt-4 flex flex-col">
        <h2 className="text-2xl font-bold">{car.modelo}</h2>
        <p className="mt-2">Cor: {car.cor}</p>
        <p>Ano: {car.ano}</p>
        <p>Valor: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(car.valor)}</p>
        <p className="mt-4">Descrição: {car.descricao || '—'}</p>
        <div className="w-full flex justify-center">
          <button className="bg-gray-700 font-bold py-4 px-2 w-80 rounded mt-4 hover:bg-gray-600 cursor-pointer"> MARCAR COMO VENDIDO </button>
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
