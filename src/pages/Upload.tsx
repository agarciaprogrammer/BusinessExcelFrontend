import UploadForm from "../components/UploadForm";
import { uploadExcelFile } from "../features/upload/uploadService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { UploadResponse } from "../features/upload/uploadService";

const UploadPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = async (file: File) => {
    setLoading(true);
    setError("");

    try {
      const data: UploadResponse = await uploadExcelFile(file);
      sessionStorage.setItem("procesos-data", JSON.stringify(data));
      navigate("/dashboard");
    } catch (e) {
      setError("Error al subir el archivo. Asegúrese de que sea un .xlsx válido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Cargar archivo de procesos
        </h1>

        <p className="text-gray-500 text-center">
          Seleccione un archivo Excel (.xlsx) para visualizar sus métricas de gestión.
        </p>

        <UploadForm onFileSelect={handleFile} />

        {loading && <p className="text-blue-600 text-sm text-center">Cargando...</p>}
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </div>
    </div>
  );
};

export default UploadPage;
