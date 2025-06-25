import type { Proceso, ResumenProcesos } from "../../types/Proceso";

export interface UploadResponse {
  adjudicados: Proceso[];
  resumenAdjudicados: ResumenProcesos;
  sinAdjudicar: Proceso[];
  resumenSinAdjudicar: ResumenProcesos;
}

export const uploadExcelFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("excel", file);

  const response = await fetch("http://localhost:3000/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error al subir el archivo");
  }

  return await response.json();
};
