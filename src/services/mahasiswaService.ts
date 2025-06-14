import axios from "axios";

export const getSkripsiStatus = async () => {
  const response = await axios.get("/api/mahasiswa/skripsi-status");
  return response.data;
};
