import React from "react";

interface Props {
  selectedMes: string;
  setSelectedMes: (value: string) => void;
  selectedEstado: string;
  setSelectedEstado: (value: string) => void;
  selectedCumpleGap: string;
  setSelectedCumpleGap: (value: string) => void;
  meses: string[];
  estados: string[];
}

const FiltrosProcesos: React.FC<Props> = ({
  selectedMes,
  setSelectedMes,
  selectedEstado,
  setSelectedEstado,
  selectedCumpleGap,
  setSelectedCumpleGap,
  meses,
  estados,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select
        value={selectedMes}
        onChange={(e) => setSelectedMes(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="">Todos los meses</option>
        {meses.map((mes) => (
          <option key={mes} value={mes}>
            {mes}
          </option>
        ))}
      </select>

      <select
        value={selectedEstado}
        onChange={(e) => setSelectedEstado(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="">Todos los estados</option>
        {estados.map((estado) => (
          <option key={estado} value={estado}>
            {estado}
          </option>
        ))}
      </select>

      <select
        value={selectedCumpleGap}
        onChange={(e) => setSelectedCumpleGap(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="">Cualquier cumplimiento GAP</option>
        <option value="true">Cumple</option>
        <option value="false">No cumple</option>
      </select>
    </div>
  );
};

export default FiltrosProcesos;
