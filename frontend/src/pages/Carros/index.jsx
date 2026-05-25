import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

const Carros = () => {
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarros = async () => {
      try {
        const response = await api.get("/carros");
        setCarros(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar carros", error);
        toast.error("Erro ao carregar os carros.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarros();
  }, []);

  if (loading) return <div className="p-6">Carregando...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-cyan-800">Listagem de Carros</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-cyan-700 text-white">
            <tr>
              <th className="p-4">Modelo</th>
              <th className="p-4">Cor</th>
              <th className="p-4">Valor</th>
              <th className="p-4">Ano</th>
            </tr>
          </thead>
          <tbody>
            {carros.length > 0 ? (
              carros.map((carro) => (
                <tr key={carro.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{carro.modelo}</td>
                  <td className="p-4">{carro.cor}</td>
                  <td className="p-4">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(carro.valor)}
                  </td>
                  <td className="p-4">{carro.ano}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  Nenhum carro encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Carros;
