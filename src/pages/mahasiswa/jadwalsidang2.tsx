import React, { useEffect, useState } from "react";
import Axios from "@/API/axios";

import { Badge } from "@/components/ui/badge";
import {
  CloudUploadIcon,
  UsersIcon,
  BadgeCheckIcon,
  MailIcon,
  DocumentTextIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/outline";
import Button from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import Separator from "@/components/ui/separator";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
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

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                  <UsersIcon className="h-6 w-6 text-blue-600" />
                  Dosen Pembimbing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border border-gray-200 rounded-lg bg-gray-50/50">
                    <h4 className="font-medium text-gray-900 mb-3">Pembimbing 1</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <UsersIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">Dr. Ahmad Wijaya</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MailIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">ahmad.wijaya@university.ac.id</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg bg-gray-50/50">
                    <h4 className="font-medium text-gray-900 mb-3">Pembimbing 2</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <UsersIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">Prof. Siti Nurhaliza</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MailIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">siti.nurhaliza@university.ac.id</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
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
                      <span className="font-medium text-blue-900">{"Senin, 15 Mei 2025"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ClockIcon className="h-6 w-6 text-blue-600" />
                      <span className="font-medium text-blue-900">{"17:00"} WIB</span>
                    </div>
                  </div>

                  <Separator orientation="horizontal"/>

                  {/* Examiners */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Dosen Penguji</h4>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50/50">
                        <UsersIcon className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Penguji 1</p>
                          <p className="text-sm text-gray-600">{"Belum ditentukan"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50/50">
                        <UsersIcon className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Penguji 2</p>
                          <p className="text-sm text-gray-600">{"Belum ditentukan"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                                <p className="text-sm text-orange-800 leading-relaxed">{"Catatan dosen"}</p>
                              </div>
                            </div>
                          </div>

                        {/* Catatan Penguji 2 */}
                          <div className="p-4 border border-purple-200 rounded-lg bg-purple-50/50">
                            <div className="flex items-start gap-3">
                              <CheckCircleIcon className="h-6 w-6 text-purple-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h5 className="font-medium text-purple-900 mb-2">Catatan Penguji 2</h5>
                                <p className="text-sm text-purple-800 leading-relaxed">{"Catatan dosen"}</p>
                              </div>
                            </div>
                          </div>
                      </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-1">
            {/* <Card className="shadow-sm sticky top-38">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 flex items-center gap-2">Bukti Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600">Bukti pembayaran telah diverifikasi dan disetujui.</p>
              </CardContent>
            </Card> */}
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
                      <span className="font-medium text-blue-900">{"Senin, 15 Mei 2025"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ClockIcon className="h-6 w-6 text-blue-600" />
                      <span className="font-medium text-blue-900">{"17:00"} WIB</span>
                    </div>
                  </div>

                  <Separator orientation="horizontal"/>

                  {/* Examiners */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Dosen Penguji</h4>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50/50">
                        <UsersIcon className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Penguji 1</p>
                          <p className="text-sm text-gray-600">{"Belum ditentukan"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50/50">
                        <UsersIcon className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Penguji 2</p>
                          <p className="text-sm text-gray-600">{"Belum ditentukan"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
