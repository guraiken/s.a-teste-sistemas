import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../../services/api";
import { FaCar } from "react-icons/fa";
import { toast } from "react-toastify";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buttonClick, setButtonClick] = useState(false);
  const navigate = useNavigate();

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
      return response;
    } catch (error) {
      console.error("Erro ao deletar carro", error);
      throw error;
    }
  };

  const handleSellCar = async (e) => {
    e.preventDefault();
    try {
      await venderCarro();
      toast.success("O carro foi vendido com sucesso!", {
        autoClose: 3000,
        closeButton: false,
      });
      navigate(-1);
    } catch (err) {
      toast.error("Erro ao vender o carro.");
    } finally {
      setButtonClick(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-cyan-200 font-medium">Carregando detalhes...</div>;
  if (error) return <div className="p-8 text-center text-red-300 font-medium">Erro ao carregar os dados do carro.</div>;
  if (!car) return <div className="p-8 text-center text-gray-300 font-medium">Carro não encontrado.</div>;

  const formattedValor = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(car.valor);

  return (
    <section className="py-2 text-white flex flex-col h-full justify-between">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        
        <div className="flex items-center justify-center bg-cyan-700/30 rounded-xl p-6 border border-cyan-600/30 w-full md:w-32 h-32 flex-shrink-0">
          <FaCar size={48} className="text-cyan-100" />
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{car.modelo}</h2>
            <div className="h-[2px] w-12 bg-cyan-500 mt-2 rounded"></div>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-6 py-2 border-y border-cyan-700/40">
            <div>
              <span className="text-xs text-cyan-300 block">Ano</span>
              <span className="text-sm font-semibold">{car.ano}</span>
            </div>
            <div>
              <span className="text-xs text-cyan-300 block">Cor</span>
              <span className="text-sm font-semibold">{car.cor}</span>
            </div>
            <div>
              <span className="text-xs text-cyan-300 block">Valor</span>
              <span className="text-sm font-bold text-teal-300">{formattedValor}</span>
            </div>
          </div>


          <div className="space-y-1">
            <span className="text-xs text-cyan-300 block font-semibold">Descrição</span>
            <p className="text-sm text-cyan-100 font-light leading-relaxed">
              {car.descricao || "Veículo inspecionado e disponível para venda imediata. Garantia inclusa."}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-6 border-t border-cyan-700/40 pt-4">
        {!buttonClick ? (
          <button
            onClick={() => setButtonClick(true)}
            className="w-full sm:w-64 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer text-center text-sm shadow-sm"
          >
            MARCAR COMO VENDIDO
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs text-cyan-200">Deseja mesmo confirmar a venda deste veículo?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setButtonClick(false)}
                className="py-1.5 px-4 rounded bg-cyan-800 hover:bg-cyan-700 transition-colors text-white font-semibold text-xs cursor-pointer border border-cyan-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleSellCar}
                className="py-1.5 px-4 rounded bg-teal-600 hover:bg-teal-500 transition-colors text-white font-semibold text-xs cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CarDetails;
