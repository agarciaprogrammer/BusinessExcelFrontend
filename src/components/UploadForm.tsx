import React from "react";

interface Props {
  onFileSelect: (file: File) => void;
}

const UploadForm: React.FC<Props> = ({ onFileSelect }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className="p-4 border rounded shadow bg-white">
      <label className="block mb-2 font-semibold">Subir archivo Excel</label>
      <input
        type="file"
        accept=".xlsx"
        onChange={handleChange}
        className="file:border file:px-4 file:py-2 file:bg-blue-600 file:text-white"
      />
    </div>
  );
};

export default UploadForm;
