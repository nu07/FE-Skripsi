const activityLog = [
  { id: 1, user: "Wisnu User 123", action: "Menambahkan berita terbaru: Kulit Buah Naga Jadi Camilan Sehat", timestamp: "21 April 2025, 10:45 AM" },
  { id: 2, user: "Admin 456", action: "Menghapus berita: Breakthrough Penelitian AI", timestamp: "20 April 2025, 3:15 PM" },
  { id: 3, user: "Wisnu User 123", action: "Mengedit berita: Universitas Pakuan Gelar Halal bi Halal", timestamp: "19 April 2025, 8:30 AM" },
];

export default function ActivityLog() {
  return (
    <div className="flex-1 overflow-auto">
      <main className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Log Aktivitas</h1>
          <p className="text-gray-600">Berikut adalah log aktivitas terbaru yang dilakukan oleh pengguna.</p>
        </div>

        {/* Activity Log */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium text-gray-900">Aktivitas Terbaru</h2>
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
