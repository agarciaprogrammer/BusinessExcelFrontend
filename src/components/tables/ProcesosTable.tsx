import React from "react";
import type { Proceso } from "../../types/Proceso";

interface Props {
  procesos: Proceso[];
}

const ProcesosTable: React.FC<Props> = ({ procesos }) => {
  return (
    <div className="overflow-auto">
      <table className="w-full border-collapse border text-sm">
        <thead className="bg-gray-100">
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
              <td className="border px-2 py-1 text-right">{p.importe.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</td>
              <td className="border px-2 py-1">{p.estado}</td>
              <td className="border px-2 py-1">{p.mesIngreso}</td>
              <td className="border px-2 py-1">{p.cumpleGap ? "Sí" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcesosTable;
