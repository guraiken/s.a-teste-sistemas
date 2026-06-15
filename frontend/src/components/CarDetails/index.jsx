import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../../services/api";
import { FaCarOn } from "react-icons/fa6";
import { toast } from "react-toastify";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buttonClick, setButtonClick] = useState(false)
  const navigate = useNavigate()

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
      const response = await api.delete(`/carros/${id}`);
      console.log("Carro deletado com sucesso");
      return response;
    } catch (error) {
      console.error("Erro ao deletar carro", error);
      throw error;
    }
  }

  const handleSellCar = async (e) => {
    e.preventDefault()
    try {
      await venderCarro();
      toast.success("O carro foi vendido com sucesso!", {
        autoClose: 3000,
        closeButton: false
      })
      navigate(-1)
    } catch (err) {
      toast.error("Erro ao vender o carro.");
    } finally {
      setButtonClick(false)
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
        <div className="w-full flex justify-center gap-6 mt-6">
          <button onClick={() => setButtonClick(true)} className={`bg-gray-700 font-bold py-2 px-4 w-80 rounded hover:bg-gray-600 cursor-pointer ${!!buttonClick && 'hidden'}`}> MARCAR COMO VENDIDO </button>
          {!!buttonClick && 
            <>
              <Link to={"/dashboard"} className="py-2 px-4 rounded bg-red-600 hover:bg-red-500">Cancelar</Link>
              <button onClick={handleSellCar} className="py-2 px-4 rounded bg-blue-400 hover:bg-blue-300 cursor-pointer">Confirmar</button>
            </>
          }
        </div>
      </div>
    </section>
  );
};

export default CarDetails;
