import { useEffect, useState, useMemo } from "react";
import api from "../../services/api";

export const CarModel = ({}) => {
  const [cars, setCars] = useState([]);
  const [groupBy, setGroupBy] = useState('modelo');
  const [order, setOrder] = useState('desc');
  const [groups, setGroups] = useState([]);

  // pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await api.get('/carros');
        const data = res.data.data || [];
        setCars(data);
      } catch (err) {
        console.error('Erro ao buscar carros', err);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const map = new Map();
    cars.forEach((c) => {
      const keyRaw = c[groupBy];
      const key = (keyRaw === undefined || keyRaw === null) ? '(sem valor)' : String(keyRaw);
      const prev = map.get(key) || { key, count: 0 };
      prev.count += 1;
      map.set(key, prev);
    });
    const arr = Array.from(map.values());
    arr.sort((a, b) => (order === 'desc' ? b.count - a.count : a.count - b.count));
    setGroups(arr);
    setPage(1);
  }, [cars, groupBy, order]);

  const total = groups.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return groups.slice(start, start + perPage);
  }, [groups, page, perPage]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 items-center mb-3">
        <label className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Agrupar por</span>
          <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)} className="border rounded px-2 py-1 text-sm">
            <option value="modelo">Modelo</option>
            <option value="cor">Cor</option>
            <option value="ano">Ano</option>
          </select>
        </label>

        <label className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Ordenar</span>
          <select value={order} onChange={(e) => setOrder(e.target.value)} className="border rounded px-2 py-1 text-sm">
            <option value="desc">Maior quantidade</option>
            <option value="asc">Menor quantidade</option>
          </select>
        </label>

        <label className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Por página</span>
          <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }} className="border rounded px-2 py-1 text-sm">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>

      <div className="max-h-60 overflow-auto p-2 border-t border-gray-200">
        <ul className="pl-4 m-0">
          {paginated.map((g) => (
            <li key={g.key} className="mb-2 flex justify-between">
              <span className="text-sm text-gray-800">{g.key}</span>
              <span className="font-semibold text-gray-900">{g.count}</span>
            </li>
          ))}
        </ul>

        {total === 0 && <div className="text-sm text-gray-500">Nenhum modelo encontrado.</div>}
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="text-sm text-gray-600">
          Mostrando {(total === 0) ? 0 : (page - 1) * perPage + 1} - {Math.min(page * perPage, total)} de {total}
        </div>

        <div className="flex gap-2 items-center">
          <button onClick={() => setPage(1)} disabled={page === 1} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">«</button>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">Anterior</button>
          <span className="text-sm"> {page} / {totalPages} </span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">Próxima</button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">»</button>
        </div>
      </div>
    </div>
  );
};

export default CarModel;
