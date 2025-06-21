import type React from "react";
import { useState } from "react";
import { CheckCircleIcon, DocumentTextIcon, UploadIcon, UserIcon, EnvelopeIcon } from "@heroicons/react/outline";
import Button from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bounce, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Axios from "@/API/axios";
import { Badge } from "@/components/ui/badge";

import JadwalSidang from "./jadwalSidang2";
import IsEligbleSidang from "./isEligbleSidang";
import IsEligbleSkripsi from "./isEligbleSkripsi";

interface FormData {
  judulSkripsi: string;
  buktiPembayaran: File | null;
}

export default function MahasiswaSkripsi() {
  const [getMySkripsiData, setGetMySkripsiData] = useState({
    judul: "",
    status: "",
    catatanPembayaran: "",
    buktiPembayaran: "",
    catatan_penguji1:"",
    catatan_penguji2:"",
    pembimbing1: {
      nama: "",
      email: "",
    },
    pembimbing2: {
      nama: "",
      email: "",
    },
  });
  const [statusSidang, setStatusSidang] = useState<boolean>();
  const [formData, setFormData] = useState<FormData>({
    judulSkripsi: "",
    buktiPembayaran: null,
  });

  const navigate = useNavigate();

  const getMySkripsi = async () => {
    try {
      const res = await Axios.get("/skripsi-me");
      const resPembimbing = await Axios.get("/pembimbing");

      setGetMySkripsiData({
        ...res.data,
        pembimbing1: resPembimbing.data.pembimbing1,
        pembimbing2: resPembimbing.data.pembimbing2,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getMyStatusSidang = async () => {
    try {
      const response = await Axios.get("/status");
      const test = await Axios.get("/skripsi-me");
      // setStatusSidang(response.data);
      // console.log(test.data)
      // console.log("Response1: ", response.data.data.isEligibleForSidang);
      // console.log("Response2: ", response.data.data.isEligibleForSkripsi);
    } catch (error) {
      console.error("Error fetching status sidang:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.judulSkripsi || !formData.buktiPembayaran) {
      toast.error(`${!formData.judulSkripsi ? "Judul" : "File Pembayaran"} tidak boleh kosong!`, {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("judul", formData.judulSkripsi);
    formDataToSend.append("buktiPembayaran", formData.buktiPembayaran);

    try {
      const response = await Axios.post("/upload-pembayaran-skripsi", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status !== 200) {
        throw new Error("Gagal menyimpan data");
      }

      toast.success("Data berhasil disimpan!", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
        transition: Bounce,
      });
      getMySkripsi();
      setTimeout(() => navigate("/"), 10000);
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Gagal menyimpan data, silahkan coba lagi!", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const handleDeleteFile = () => {
    setFormData(prev => ({ ...prev, buktiPembayaran: null }));
  };

  const handlePreviewFile = () => {
    if (formData.buktiPembayaran) {
      const fileURL = URL.createObjectURL(formData.buktiPembayaran);
      window.open(fileURL, "_blank");
    }
  };

  useEffect(() => {
    getMySkripsi();
    getMyStatusSidang();
  }, []);

  // const { isEligbleSidang, isEligbleSkripsi } = statusSidang;
  // console.log(isEligbleSidang)
  // console.log(isEligbleSkripsi)
  // console.log("Skripsi : ", getMySkripsiData);

  if (getMySkripsiData?.status === "sukses") {
    return <JadwalSidang skripsi={getMySkripsiData} />;
  } else if (getMySkripsiData?.status === "pending") {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div>
            <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="text-lg font-medium text-gray-900">Berhasil Mengajukan, Menunggu Acc Admin!</h3>
            <Link to="/" className="underline text-blue-500 mt-2">
              Kembali ke menu utama
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="p-6">
              <h1 className="text-center">{getMySkripsiData.catatanPembayaran}</h1>
              <div className="mb-4">
                <label htmlFor="judul-skripsi" className="block text-sm font-medium text-gray-700">
                  Judul Skripsi
                </label>
                <input
                  id="judul-skripsi"
                  type="text"
                  value={formData.judulSkripsi}
                  onChange={e => setFormData(prev => ({ ...prev, judulSkripsi: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm bg-gray-50 p-2"
                  placeholder="Masukkan judul skripsi"
                />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Pembayaran Skripsi</h2>
              </div>
              {!formData.buktiPembayaran ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">Silahkan upload bukti pembayaran skripsi untuk melanjutkan proses.</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Bukti Pembayaran</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                              <span>Upload file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={e => {
                                  if (e.target.files && e.target.files[0]) {
                                    const selectedFile = e.target.files[0];
                                    setFormData(prev => ({ ...prev, buktiPembayaran: selectedFile }));
                                  }
                                }}
                                // accept="image/*,.pdf"
                              />
                            </label>
                            <p className="pl-1">atau drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, PDF hingga 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">{formData.buktiPembayaran.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button onClick={handlePreviewFile} type="button" className="text-sm text-blue-600 hover:text-blue-500 focus:outline-none">
                        Lihat Gambar
                      </button>
                      <button onClick={handleDeleteFile} type="button" className="text-sm text-red-600 hover:text-red-500 focus:outline-none">
                        Hapus File
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
            <div className="mt-4">
              <Button type="submit" className="w-full">
                Save
              </Button>
            </div>
          </form>
        </main>
      </div>
    );
  }
}
