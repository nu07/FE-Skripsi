"use client";

import { useState, useEffect } from "react";
import { AcademicCapIcon, UserIcon, NewspaperIcon } from "@heroicons/react/outline";
import Axios from "@/API/axios";

export default function Dashboard() {
  const [user] = useState({
    name: "Wisnu User 123",
    role: "Admin",
  });

  const [stats, setStats] = useState([
    { name: "Total Mahasiswa Terdaftar", value: "0", icon: UserIcon, color: "bg-green-500" },
    { name: "Total Dosen", value: "0", icon: AcademicCapIcon, color: "bg-yellow-500" },
    { name: "Total Berita", value: "0", icon: NewspaperIcon, color: "bg-blue-500" },
  ]);

  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    // const fetchStats = async () => {
    //   try {
    //     const dosenRes = await Axios.get("/dosen/dosen");
    //     const newsRes = await Axios.get("/news");
    //     setStats(prevStats => [
    //       prevStats[0],
    //       { ...prevStats[1], value: dosenRes.data.totalItems.toString() },
    //       { ...prevStats[2], value: newsRes.data.totalItems.toString() },
    //     ]);
    //   } catch (e) {
    //     console.error(e);
    //   }
    // };

    const fetchActivityLog = async () => {
      const newsData = await Axios.get("/news?page=1&limit=5");
      const logData = newsData.data.data.map(news => ({
        id: news.id,
        user: news.admin.nama,
        action: `Menambahkan berita terbaru: ${news.title}`,
        timestamp: new Date(news.updatedAt).toLocaleString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
      }));
      setActivityLog(logData);
    };

    // fetchStats();
    fetchActivityLog();
  }, []);

  return (
    <div className="flex-1 overflow-auto">
      <main className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Selamat datang kembali, {user.name}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          {stats.map(stat => (
            <div key={stat.name} className="bg-white rounded-lg shadow p-5 border-l-4 border-purple-600">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.color} text-white mr-4`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Activity Log */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">Log Aktivitas Terbaru</h2>
          </div>
          <div className="divide-y">
            {activityLog.map(log => (
              <div key={log.id} className="p-4 hover:bg-gray-50">
                <p className="text-sm text-gray-900 font-medium">{log.user}</p>
                <p className="text-sm text-gray-600">{log.action}</p>
                <p className="text-xs text-gray-500">{log.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
