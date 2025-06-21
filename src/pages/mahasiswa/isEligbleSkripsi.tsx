"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogDescription, AlertDialogContent } from "@/components/ui/alert";
import Button from "@/components/ui/button";
import { ExclamationCircleIcon, BookOpenIcon, CheckCircleIcon, XCircleIcon, ArrowRightIcon } from "@heroicons/react/outline";

export default function NotEligibleForSidang() {
  // const requirements = [
  //   { item: "Menyelesaikan minimal 120 SKS", completed: true },
  //   { item: "IPK minimal 2.75", completed: true },
  //   { item: "Lulus semua mata kuliah wajib", completed: true },
  //   { item: "Menyelesaikan KKN/Magang", completed: false },
  //   { item: "Tidak ada tunggakan pembayaran", completed: false },
  //   { item: "Proposal skripsi disetujui", completed: false },
  // ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <ExclamationCircleIcon className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Belum Memenuhi Syarat</h1>
        <p className="text-gray-600">Informasi kelengkapan persyaratan sidang skripsi</p>
      </div>

      <div className="space-y-6">
        {/* Main Alert */}
        <AlertDialog>
          <AlertDialogContent className="border-red-200 bg-red-50">
            <ExclamationCircleIcon className="h-5 w-5 text-red-600" />
            <AlertDialogDescription className="text-red-800 font-medium">
              Mohon maaf, Anda belum berhak mengikuti sidang skripsi. Silakan lengkapi persyaratan yang masih kurang.
            </AlertDialogDescription>
          </AlertDialogContent>
        </AlertDialog>

        {/* Requirements Checklist */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
              <BookOpenIcon className="h-5 w-5 text-blue-600" />
              Persyaratan Sidang Skripsi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-lg border bg-green-50 border-green-200">
                <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="font-medium text-green-800">Menyelesaikan minimal 120 SKS</span>
                <span className="ml-auto text-sm text-green-600 font-medium">Selesai</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg border bg-green-50 border-green-200">
                <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="font-medium text-green-800">IPK minimal 2.75</span>
                <span className="ml-auto text-sm text-green-600 font-medium">Selesai</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg border bg-green-50 border-green-200">
                <CheckCircleIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="font-medium text-green-800">Lulus semua mata kuliah wajib</span>
                <span className="ml-auto text-sm text-green-600 font-medium">Selesai</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg border bg-red-50 border-red-200">
                <XCircleIcon className="h-5 w-5 text-red-600 flex-shrink-0" />
                <span className="font-medium text-red-800">Menyelesaikan KKN/Magang</span>
                <span className="ml-auto text-sm text-red-600 font-medium">Belum Selesai</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg border bg-red-50 border-red-200">
                <XCircleIcon className="h-5 w-5 text-red-600 flex-shrink-0" />
                <span className="font-medium text-red-800">Tidak ada tunggakan pembayaran</span>
                <span className="ml-auto text-sm text-red-600 font-medium">Belum Selesai</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg border bg-red-50 border-red-200">
                <XCircleIcon className="h-5 w-5 text-red-600 flex-shrink-0" />
                <span className="font-medium text-red-800">Proposal skripsi disetujui</span>
                <span className="ml-auto text-sm text-red-600 font-medium">Belum Selesai</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Summary */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Progress Persyaratan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Persyaratan Terpenuhi</span>
                <span className="text-sm font-bold text-gray-900">3 dari 6</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: "50%" }}></div>
              </div>

              <p className="text-sm text-gray-600">
                Anda telah menyelesaikan <span className="font-semibold text-blue-600">50%</span> dari persyaratan yang diperlukan
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="shadow-sm border-blue-200 bg-blue-50/30">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900">Langkah Selanjutnya</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <ArrowRightIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-900">Lengkapi KKN/Magang</p>
                  <p className="text-sm text-blue-700">Hubungi bagian akademik untuk informasi jadwal KKN/Magang</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ArrowRightIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-900">Selesaikan Tunggakan Pembayaran</p>
                  <p className="text-sm text-blue-700">Kunjungi bagian keuangan untuk menyelesaikan pembayaran</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ArrowRightIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-900">Ajukan Proposal Skripsi</p>
                  <p className="text-sm text-blue-700">Konsultasi dengan dosen pembimbing untuk persetujuan proposal</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Butuh Bantuan?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Bagian Akademik</h4>
                <p className="text-sm text-gray-600 mb-1">Email: akademik@university.ac.id</p>
                <p className="text-sm text-gray-600">Telp: (021) 1234-5678</p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Bagian Keuangan</h4>
                <p className="text-sm text-gray-600 mb-1">Email: keuangan@university.ac.id</p>
                <p className="text-sm text-gray-600">Telp: (021) 1234-5679</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700">Hubungi Bagian Akademik</Button>
          <Button variant="outline">Lihat Panduan Lengkap</Button>
        </div>
      </div>
    </div>
  );
}
