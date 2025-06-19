import React, { useEffect, useState } from "react";
import Axios from "@/API/axios";

import { Badge } from "@/components/ui/badge";
import { CheckCircleIcon, DocumentTextIcon, UploadIcon, UserIcon, EnvelopeIcon } from "@heroicons/react/outline";
import Button from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const JadwalSidang = () => {
  const [jadwalSidang, setJadwalSidang] = useState<any>(null);
  const [hasilSidang, setHasilSidang] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchJadwalSidang = async () => {
    try {
      const response = await Axios.get("/jadwal-sidang");
      if (response.data.message) {
        setErrorMessage(response.data.message);
      } else {
        setJadwalSidang(response.data);
      }
    } catch (error) {
      console.error("Error fetching jadwal-sidang:", error);
      setErrorMessage("Failed to fetch jadwal sidang.");
    }
  };

  const fetchHasilSidang = async () => {
    try {
      const response = await Axios.get("/hasil-sidang");
      if (Array.isArray(response.data)) {
        setHasilSidang(response.data);
      } else if (response.data.message) {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching hasil-sidang:", error);
      setErrorMessage("Failed to fetch hasil sidang.");
    }
  };

  useEffect(() => {
    fetchJadwalSidang();
    fetchHasilSidang();
  }, []);

  return (
    <div>
      <h1>Jadwal Sidang</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {jadwalSidang && (
        <div>
          <p>Tanggal Sidang: {new Date(jadwalSidang.tanggal_sidang).toLocaleString()}</p>
          <p>Penguji 1: {jadwalSidang.penguji1?.nama || "N/A"}</p>
          <p>Penguji 2: {jadwalSidang.penguji2?.nama || "N/A"}</p>
        </div>
      )}

      <h1>Hasil Sidang</h1>
      {hasilSidang && hasilSidang.length > 0 ? (
        hasilSidang.map((hasil: any) => (
          <div key={hasil.id}>
            <p>Catatan Penguji 1: {hasil.catatan_penguji1 || "Tidak ada catatan"}</p>
            <p>Catatan Penguji 2: {hasil.catatan_penguji2 || "Tidak ada catatan"}</p>
          </div>
        ))
      ) : (
        <p>{errorMessage || "Hasil sidang tidak ditemukan."}</p>
      )}
    </div>
  );
};

export default JadwalSidang;
