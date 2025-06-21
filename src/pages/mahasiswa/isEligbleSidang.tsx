"use client";

import { useEffect, useState } from "react";
import Axios from "@/API/axios";

import { Badge } from "@/components/ui/badge";
import {
  // CloudUploadIcon,
  UsersIcon,
  // BadgeCheckIcon,
  // MailIcon,
  DocumentTextIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/outline";
// import Button from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import Separator from "@/components/ui/separator";

export default function Page() {
  interface JadwalSidangData {
    jadwal_sidang?: string;
    tanggal_sidang?: string;
    catatan_penguji1?: string;
    catatan_penguji2?: string;
    penguji1?: { nama: string };
    penguji2?: { nama: string };
  }

  const [data, setData] = useState<JadwalSidangData>({});
  const [status, setStatus] = useState({});

  const getStatusSidang = async () => {
    try {
      const getData = await Axios.get("/jadwal-sidang");
      setData(getData.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getStatus = async () => {
    try {
      const response = await Axios.get("/status");
      setStatus(response.data);
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  useEffect(() => {
    getStatusSidang();
    getStatus();
  }, []);

  console.log(status);

  const { penguji1, penguji2 } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8 flex flex-col items-center justify-center">
          <CheckCircleIcon className="w-20 h-20 text-green-500" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Informasi Skripsi</h1>
          <p className="text-gray-600">Detail lengkap mengenai skripsi dan jadwal sidang</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                    Detail Skripsi
                  </CardTitle>
                  <Badge className="bg-green-400 text-green-900 border-green-200">Approved</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Judul Skripsi</h3>
                  <p className="text-gray-700 leading-relaxed">Implementasi Sistem Informasi Akademik</p>
                </div>
                <Separator orientation="horizontal" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Catatan Pembayaran</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Pembayaran telah diverifikasi oleh bagian keuangan.</p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <DocumentTextIcon className="h-5 w-5 text-green-600" />
                    Hasil Sidang
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-4">
                      {/* Catatan Penguji 1 */}
                      <div className="p-4 border border-orange-200 rounded-lg bg-orange-50/50">
                        <div className="flex items-start gap-3">
                          <CheckCircleIcon className="h-6 w-6 text-orange-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-orange-900 mb-2">Catatan Penguji 1</h5>
                            <p className="text-sm text-orange-800 leading-relaxed">{data.catatan_penguji1}</p>
                          </div>
                        </div>
                      </div>

                      {/* Catatan Penguji 2 */}
                      <div className="p-4 border border-purple-200 rounded-lg bg-purple-50/50">
                        <div className="flex items-start gap-3">
                          <CheckCircleIcon className="h-6 w-6 text-purple-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-purple-900 mb-2">Catatan Penguji 2</h5>
                            <p className="text-sm text-purple-800 leading-relaxed">{data.catatan_penguji2}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:row-span-1">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                  <CalendarIcon className="h-6 w-6 text-blue-600" />
                  Jadwal Sidang
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date and Time */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <CalendarIcon className="h-6 w-6 text-blue-600" />
                    <span className="font-medium text-blue-900">
                      {data.tanggal_sidang
                        ? new Intl.DateTimeFormat("id-ID", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }).format(new Date(data.tanggal_sidang))
                        : "Tanggal belum ditentukan"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ClockIcon className="h-6 w-6 text-blue-600" />
                    <span className="font-medium text-blue-900">
                      {data.tanggal_sidang
                        ? new Date(data.tanggal_sidang).toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          }) + " WIB"
                        : "Waktu belum ditentukan"}
                    </span>
                  </div>
                </div>
                {data.penguji1 && data.penguji2 ? (
                  <>
                    <Separator orientation="horizontal" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Dosen Penguji</h4>
                      <div className="grid gap-3 sm:grid-row-2">
                        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50/50">
                          <UsersIcon className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Penguji 1</p>
                            <p className="text-sm text-gray-600">{penguji1?.nama || "Dosen penguji"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50/50">
                          <UsersIcon className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Penguji 2</p>
                            <p className="text-sm text-gray-600">{penguji2?.nama || "Dosen penguji"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
