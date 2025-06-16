import React, { useState } from "react";
import { uploadExcelFile } from "../../services/adminService";

const UploadMahasiswa = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const response = await uploadExcelFile(file);
      alert(response.message);
    }
  };

  return (
    <div>
      <h1>Upload Mahasiswa Data</h1>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadMahasiswa;
