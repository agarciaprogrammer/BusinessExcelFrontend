import { useEffect, useState } from "react";
import type { UploadResponse } from "../features/upload/uploadService";
import { useNavigate } from "react-router-dom";
import ProcesosPorMesChart from "../components/charts/ProcesosPorMesChart";
import CumplimientoGapChart from "../components/charts/CumplimientoGAPChart";
import type { Proceso } from "../types/Proceso";
import { paginate } from "../utils/pagination";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<UploadResponse | null>(null);

  // Filtros Adjudicados
  const [mesAdj, setMesAdj] = useState("");
  const [estadoAdj, setEstadoAdj] = useState("");
  const [gapAdj, setGapAdj] = useState("");

  // Filtros Sin Adjudicar
  const [mesSin, setMesSin] = useState("");
  const [estadoSin, setEstadoSin] = useState("");
  const [gapSin, setGapSin] = useState("");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const stored = sessionStorage.getItem("procesos-data");
    if (!stored) {
      navigate("/upload");
      return;
    }

    const parsed = JSON.parse(stored);
    setData(parsed);
  }, []);

  if (!data) return null;

  const filterProcesos = (
    procesos: Proceso[],
    mes: string,
    estado: string,
    gap: string
  ) => {
    return procesos.filter((p) => {
      const m = mes ? p.mesIngreso === mes : true;
      const e = estado ? p.estado === estado : true;
      const g = gap === "" ? true : p.cumpleGap === (gap === "true");
      return m && e && g;
    });
  };

  const procesosAdjFiltrados = filterProcesos(data.adjudicados, mesAdj, estadoAdj, gapAdj);
  const procesosSinFiltrados = filterProcesos(data.sinAdjudicar, mesSin, estadoSin, gapSin);

  const searchFiltered = (procesos: Proceso[]) =>
    procesos.filter(p =>
      p.nroProceso.toString().includes(search) ||
      p.descripcion.toLowerCase().includes(search.toLowerCase())
    );
    
  // Luego paginamos
  const paginatedAdj = paginate(searchFiltered(procesosAdjFiltrados), page, itemsPerPage);
  const paginatedSin = paginate(searchFiltered(procesosSinFiltrados), page, itemsPerPage);

  const renderFiltros = (
    mes: string,
    setMes: (v: string) => void,
    estado: string,
    setEstado: (v: string) => void,
    gap: string,
    setGap: (v: string) => void,
    procesos: Proceso[]
  ) => (
    <div className="flex flex-wrap gap-4 mb-4">
      <select className="border px-2 py-1 rounded" value={mes} onChange={(e) => setMes(e.target.value)}>
        <option value="">Todos los meses</option>
        {[...new Set(procesos.map((p) => p.mesIngreso))].map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <select className="border px-2 py-1 rounded" value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value="">Todos los estados</option>
        {[...new Set(procesos.map((p) => p.estado))].map((e) => (
          <option key={e} value={e}>{e}</option>
        ))}
      </select>
      <select className="border px-2 py-1 rounded" value={gap} onChange={(e) => setGap(e.target.value)}>
        <option value="">Cualquier GAP</option>
        <option value="true">Cumple GAP</option>
        <option value="false">No cumple</option>
      </select>
    </div>
  );

  const renderTabla = (procesos: Proceso[]) => (
    <div className="overflow-auto max-h-[500px]">
      <table className="w-full text-sm border-collapse border">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border px-2 py-1 text-left">Nro</th>
            <th className="border px-2 py-1">Descripción</th>
            <th className="border px-2 py-1">Importe</th>
            <th className="border px-2 py-1">Estado</th>
            <th className="border px-2 py-1">Mes</th>
            <th className="border px-2 py-1">Cumple GAP</th>
          </tr>
        </thead>
        <tbody>
          {procesos.map((p, i) => (
            <tr key={i} className="odd:bg-white even:bg-gray-50">
              <td className="border px-2 py-1">{p.nroProceso}</td>
              <td className="border px-2 py-1">{p.descripcion}</td>
              <td className="border px-2 py-1 text-right">
                {p.importe.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
              </td>
              <td className="border px-2 py-1">{p.estado}</td>
              <td className="border px-2 py-1">{p.mesIngreso}</td>
              <td className="border px-2 py-1">{p.cumpleGap ? "Sí" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPagination = (total: number) => {
    const totalPages = Math.ceil(total / itemsPerPage);
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${page === i + 1 ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  };

  const calcularCumplimientoGap = (procesos: Proceso[]) => {
    const cumple = procesos.filter(p => p.cumpleGap).length;
    const noCumple = procesos.length - cumple;
    return { "Cumple GAP": cumple, "No cumple GAP": noCumple };
  };


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard de Procesos</h1>
          <p className="text-gray-500">Visualización de indicadores de compras</p>
        </header>

        <section className="bg-white shadow rounded-xl p-10">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Procesos Adjudicados</h2>
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-white shadow rounded p-5">
              <ProcesosPorMesChart
                procesosPorMes={data.resumenAdjudicados.procesosPorMes}
                title="Procesos Adjudicados por Mes"
              />
            </div>
            <div className="bg-white shadow rounded p-5">
              <CumplimientoGapChart
                dataGAP={calcularCumplimientoGap(data.adjudicados)}
              /> 
            </div>
          </section>
            <div className="flex justify-between items-center gap-4">
              <input
                type="text"
                placeholder="Buscar por número o descripción"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1); // Reiniciar a la primera página al buscar
                }}
                className="w-full max-w-md px-4 py-2 border rounded shadow-sm mb-3"
              />
          </div>
          {renderFiltros(mesAdj, setMesAdj, estadoAdj, setEstadoAdj, gapAdj, setGapAdj, data.adjudicados)}
          {renderTabla(paginatedAdj)}  
          {renderPagination(searchFiltered(procesosAdjFiltrados).length)}
        </section>

        <section className="bg-white shadow rounded-xl p-10">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Procesos Sin Adjudicar</h2>
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-white shadow rounded p-4">
              <ProcesosPorMesChart
                procesosPorMes={data.resumenAdjudicados.procesosPorMes}
                title="Procesos Adjudicados por Mes"
              />
            </div>
            <div className="bg-white shadow rounded p-5">
              <CumplimientoGapChart
                dataGAP={calcularCumplimientoGap(data.sinAdjudicar)}
              /> 
            </div>
          </section>
            <div className="flex justify-between items-center gap-4">
              <input
                type="text"
                placeholder="Buscar por número o descripción"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full max-w-md px-4 py-2 border rounded shadow-sm mb-3"
              />
          </div>
          {renderFiltros(mesSin, setMesSin, estadoSin, setEstadoSin, gapSin, setGapSin, data.sinAdjudicar)}
          {renderTabla(paginatedSin)}
          {renderPagination(searchFiltered(procesosSinFiltrados).length)}
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
