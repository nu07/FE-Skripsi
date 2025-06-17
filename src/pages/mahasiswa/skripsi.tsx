import type React from "react";
import { useState } from "react";
import { CheckCircleIcon, DocumentTextIcon, UploadIcon } from "@heroicons/react/outline";
import Button from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Bounce, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Axios from "@/API/axios";
import { capitalizeFirstLetter } from "@/utils/classNames";

interface FormData {
  judulSkripsi: string;
  buktiPembayaran: File | null;
}

export default function MahasiswaSkripsi() {
  // const [loading, setLoading] = useState<boolean>(false);
  const [getMySkripsiData, setGetMySkripsiData] = useState({
    judul: "",
    status: "",
    catatanPembayaran: "",
    buktiPembayaran: "",
    pembimbing1: {
      nama: "",
      email: ""
    },
    pembimbing2: {
      nama: "",
      email: ""
    },
  })
  const [formData, setFormData] = useState<FormData>({
    judulSkripsi: "",
    buktiPembayaran: null,
  });

  const navigate = useNavigate();

  const getMySkripsi = async () => {
    try {
      const res = await Axios.get('/skripsi-me');
      const resPembimbing = await Axios.get('/pembimbing');

      setGetMySkripsiData({
        ...res.data,
        pembimbing1: resPembimbing.data.pembimbing1,
        pembimbing2: resPembimbing.data.pembimbing2,
      });

      console.log(getMySkripsiData)
    } catch (e) {
      console.log(e);
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

    // setLoading(true);
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
      getMySkripsi()
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
    // finally {
    //   setLoading(false);
    // }
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
    getMySkripsi()
  }, [])



  if (getMySkripsiData?.status === 'sukses') {
    return (<>
      <section className="bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto pt-20 pb-12 px-4 sm:px-6 lg:px-8 lg:py-20">
          <svg
            className="absolute top-full left-0 transform translate-x-80 -translate-y-24 lg:hidden"
            width={784}
            height={404}
            fill="none"
            viewBox="0 0 784 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e56e3f81-d9c1-4b83-a3ba-0d0ac8c32f32"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={784} height={404} fill="url(#e56e3f81-d9c1-4b83-a3ba-0d0ac8c32f32)" />
          </svg>

          <svg
            className="hidden lg:block absolute right-full top-1/2 transform translate-x-1/2 -translate-y-1/2"
            width={404}
            height={784}
            fill="none"
            viewBox="0 0 404 784"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="56409614-3d62-4985-9a10-7ca758a8f4f0"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={784} fill="url(#56409614-3d62-4985-9a10-7ca758a8f4f0)" />
          </svg>

          <div className="relative lg:flex lg:items-center">
            <div className="hidden lg:block lg:flex-shrink-0">
              <img
                className="h-64 w-64 rounded-full xl:h-80 xl:w-80"
                src={import.meta.env.VITE_APP_URL + getMySkripsiData.buktiPembayaran}
                alt=""
              />
            </div>

            <div className="relative lg:ml-10">
              <svg
                className="absolute top-0 left-0 transform -translate-x-8 -translate-y-24 h-36 w-36 text-indigo-200 opacity-50"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 144 144"
                aria-hidden="true"
              >
                <path
                  strokeWidth={2}
                  d="M41.485 15C17.753 31.753 1 59.208 1 89.455c0 24.664 14.891 39.09 32.109 39.09 16.287 0 28.386-13.03 28.386-28.387 0-15.356-10.703-26.524-24.663-26.524-2.792 0-6.515.465-7.446.93 2.327-15.821 17.218-34.435 32.11-43.742L41.485 15zm80.04 0c-23.268 16.753-40.02 44.208-40.02 74.455 0 24.664 14.891 39.09 32.109 39.09 15.822 0 28.386-13.03 28.386-28.387 0-15.356-11.168-26.524-25.129-26.524-2.792 0-6.049.465-6.98.93 2.327-15.821 16.753-34.435 31.644-43.742L121.525 15z"
                />
              </svg>
              <blockquote className="relative">
                <div className="text-2xl leading-9 font-medium text-gray-900">
                  <p>
                    Judul : {getMySkripsiData.judul}
                  </p>
                  <p title={getMySkripsiData?.catatanPembayaran} className="line-clamp-5">
                    catatanPembayaran : {getMySkripsiData?.catatanPembayaran}
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
                      <div className="border-2 border-purple-200 pr-24 px-12">
                        <p>
                          Pembimbing 1 :
                        </p>
                        <p>
                          {getMySkripsiData?.pembimbing1?.nama}
                        </p>
                        <p>
                          {getMySkripsiData?.pembimbing1?.email}
                        </p>
                      </div>
                      <div className="pl-24 border-2 border-purple-200 px-12">
                         <p>
                          Pembimbing 2 :
                        </p>
                        <p>
                          {getMySkripsiData?.pembimbing2?.nama}
                        </p>
                        <p>
                          {getMySkripsiData?.pembimbing2?.email}
                        </p>
                      </div>

                    </div>
                  </p>

                </div>
                <footer className="mt-8">
                  <div className="flex">
                    <div className="flex-shrink-0 lg:hidden">
                      <img
                        className="h-12 w-12 rounded-full"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-4 lg:ml-0">
                      <div className="text-base font-medium text-gray-900">Status : <span className="text-base font-medium text-indigo-600">{capitalizeFirstLetter(getMySkripsiData.status)}</span></div>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </>)
  }
  else if (getMySkripsiData?.status === 'pending') {
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
