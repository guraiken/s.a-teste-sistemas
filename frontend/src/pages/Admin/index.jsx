import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import api from "../../services/api";
import { AggregatedValue } from "../../components/counters/AggregatedValueCounter";
import { CarCounter } from "../../components/counters/CarCounter";
import CustomModal from "../../components/CustomModal";
import { MdEdit, MdDelete, MdAdd, MdSearch } from "react-icons/md";

const formatCurrencyInput = (value) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  const numberValue = parseFloat(digits) / 100;
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue);
};

const parseCurrencyToFloat = (formattedValue) => {
  if (!formattedValue) return 0;
  const cleanValue = formattedValue.replace(/\./g, "").replace(",", ".");
  return parseFloat(cleanValue) || 0;
};

function Admin() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redireciona caso o usuário não seja administrador
  useEffect(() => {
    if (!isAdmin) {
      toast.error("Acesso negado. Apenas administradores podem acessar esta página.");
      navigate("/dashboard");
    }
  }, [isAdmin, navigate]);

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Estados dos Modais
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Estados do Formulário
  const [modelo, setModelo] = useState("");
  const [cor, setCor] = useState("");
  const [ano, setAno] = useState("");
  const [valor, setValor] = useState("");
  const [editingCar, setEditingCar] = useState(null);
  const [deletingCar, setDeletingCar] = useState(null);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await api.get("/carros");
      setCars(response.data?.data || []);
    } catch (error) {
      console.error("Erro ao buscar carros", error);
      toast.error("Erro ao carregar lista de carros.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchCars();
    }
  }, [isAdmin, refreshTrigger]);

  if (!isAdmin) {
    return null;
  }

  const triggerRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (car) => {
    setEditingCar(car);
    setModelo(car.modelo);
    setCor(car.cor);
    setAno(car.ano);
    
    // Converte o valor numérico inicial para o formato mascarado
    const formattedValor = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(car.valor);
    
    setValor(formattedValor);
    setIsFormOpen(true);
  };

  const handleOpenDeleteModal = (car) => {
    setDeletingCar(car);
    setIsDeleteOpen(true);
  };

  const resetForm = () => {
    setModelo("");
    setCor("");
    setAno("");
    setValor("");
    setEditingCar(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!modelo.trim() || !cor.trim() || !ano || !valor) {
      toast.warning("Por favor, preencha todos os campos.");
      return;
    }

    const payload = {
      modelo: modelo.trim(),
      cor: cor.trim(),
      ano: parseInt(ano, 10),
      valor: parseCurrencyToFloat(valor),
    };

    try {
      if (editingCar) {
        await api.put(`/carros/${editingCar.id}`, payload);
        toast.success("Carro editado com sucesso!");
      } else {
        await api.post("/carros", payload);
        toast.success("Carro cadastrado com sucesso!");
      }
      setIsFormOpen(false);
      resetForm();
      triggerRefresh();
    } catch (error) {
      console.error("Erro ao salvar carro", error);
      const errMsg = error.response?.data?.message || "Erro ao salvar os dados do carro.";
      toast.error(errMsg);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingCar) return;

    try {
      await api.delete(`/carros/${deletingCar.id}`);
      toast.success("Carro excluído com sucesso!");
      setIsDeleteOpen(false);
      setDeletingCar(null);
      triggerRefresh();
    } catch (error) {
      console.error("Erro ao excluir carro", error);
      toast.error("Erro ao excluir o carro.");
    }
  };

  const filteredCars = cars.filter((car) =>
    [car.modelo, car.cor, car.ano]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-cyan-800">Painel do Administrador</h1>
          <p className="text-gray-600 mt-1">Gerencie o estoque de carros do sistema</p>
        </div>
      </div>

      {/* Mini Dashboard */}
      <div className="flex flex-wrap gap-6 mb-8 items-stretch">
        <CarCounter key={`counter-${refreshTrigger}`} />
        <AggregatedValue key={`value-${refreshTrigger}`} />
        <div className="p-6 bg-white shadow rounded-lg flex flex-col justify-between items-center w-60 border border-gray-100">
          <div className="text-center">
            <h2 className="text-lg font-bold text-gray-700">Ações Admin</h2>
            <p className="text-sm text-gray-500 mt-1">Gerencie os registros</p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="mt-4 flex items-center justify-center gap-2 px-4 py-2 w-full bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg font-semibold transition-colors duration-200 cursor-pointer shadow-sm"
          >
            <MdAdd size={20} /> Cadastrar Carro
          </button>
        </div>
      </div>

      {/* Tabela de Veículos */}
      <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-100 gap-4">
          <h2 className="text-xl font-bold text-cyan-800">Estoque de Veículos</h2>
          
          {/* Caixa de Busca */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <MdSearch size={20} />
            </span>
            <input
              type="text"
              placeholder="Buscar por modelo, cor ou ano..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none transition-all duration-200 text-sm text-gray-700 border-gray-300"
            />
          </div>
        </div>

        {/* Tabela de Listagem */}
        <div className="overflow-x-auto mt-4">
          {loading ? (
            <div className="text-center py-12 text-gray-500 font-medium">Carregando estoque de carros...</div>
          ) : filteredCars.length > 0 ? (
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100 text-cyan-800 font-semibold text-sm">
                  <th className="py-4 px-4 font-semibold text-gray-700">Modelo</th>
                  <th className="py-4 px-4 font-semibold text-gray-700">Cor</th>
                  <th className="py-4 px-4 font-semibold text-gray-700 text-center">Ano</th>
                  <th className="py-4 px-4 font-semibold text-gray-700 text-right">Valor</th>
                  <th className="py-4 px-4 font-semibold text-gray-700 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCars.map((car) => (
                  <tr key={car.id} className="hover:bg-cyan-50/20 transition-colors duration-150">
                    <td className="py-4 px-4 text-sm font-semibold text-gray-800">{car.modelo}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{car.cor}</td>
                    <td className="py-4 px-4 text-sm text-gray-600 text-center">{car.ano}</td>
                    <td className="py-4 px-4 text-sm text-gray-800 font-medium text-right">
                      {formatCurrency(car.valor)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(car)}
                          title="Editar"
                          className="p-2 text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <MdEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(car)}
                          title="Excluir"
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Nenhum carro encontrado no estoque.
            </div>
          )}
        </div>
      </div>

      {/* Modal de Formulário (Criar ou Editar) */}
      <CustomModal
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        title={editingCar ? "Editar Veículo" : "Cadastrar Novo Veículo"}
      >
        <form onSubmit={handleSubmit} className="space-y-4 mt-2 px-1">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modelo *</label>
            <input
              type="text"
              required
              placeholder="Ex: Toyota Corolla"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              className="w-full box-border border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-600 outline-none border-gray-300 text-sm text-gray-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cor *</label>
              <input
                type="text"
                required
                placeholder="Ex: Prata"
                value={cor}
                onChange={(e) => setCor(e.target.value)}
                className="w-full box-border border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-600 outline-none border-gray-300 text-sm text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ano *</label>
              <input
                type="number"
                required
                min="1900"
                max={new Date().getFullYear() + 2}
                placeholder="Ex: 2022"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                className="w-full box-border border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-600 outline-none border-gray-300 text-sm text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$) *</label>
            <input
              type="text"
              required
              placeholder="Ex: 110.000,00"
              value={valor}
              onChange={(e) => setValor(formatCurrencyInput(e.target.value))}
              className="w-full box-border border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-600 outline-none border-gray-300 text-sm text-gray-800"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg font-medium text-sm transition-colors cursor-pointer shadow-sm"
            >
              {editingCar ? "Salvar Alterações" : "Cadastrar Veículo"}
            </button>
          </div>
        </form>
      </CustomModal>

      {/* Modal de Confirmação de Exclusão */}
      <CustomModal
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Confirmar Exclusão"
      >
        <div className="mt-2 space-y-4">
          <p className="text-gray-700 text-sm">
            Tem certeza de que deseja excluir o veículo{" "}
            <span className="font-bold text-gray-900">{deletingCar?.modelo}</span> do estoque?
            Esta ação não poderá ser desfeita.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsDeleteOpen(false)}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleDeleteConfirm}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors cursor-pointer shadow-sm"
            >
              Excluir
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}

export default Admin;
