import axios from "axios";

export const uploadExcelFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post("/api/admin/upload-mahasiswa", formData);
  return response.data;
};
