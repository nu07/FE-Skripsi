function About() {
  return (
    <div id="about" className="relative bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-rows-2  lg:items-center">
          {/* Gambar About */}
          <div className="relative h-32 md:h-48 lg:h-52 xl:h-72 2xl:h-96 lg:col-span-1 lg:row-span-2">
            <img
              className="w-full h-full object-cover rounded-lg shadow-lg"
              src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1080&auto=format&fit=crop"
              alt="About Universitas Pakuan"
            />
          </div>

          {/* Konten About */}
          <div className="mt-10 lg:mt-10">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Tentang Universitas Pakuan
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              <b>UNIVERSITAS PAKUAN (UNPAK)</b> merupakan kelanjutan dari
              Universitas Bogor (Unbo) yang berkiprah selama hampir dua dekade
              sampai dengan tahun 1980. Beberapa perguruan tinggi swasta pada
              tahun 1977 berfusi dengan universitas ini yaitu Akademi
              Pariwisata, IKIP PGRI, Akademi Bahasa Asing, Akademi Sekretaris
              Manajemen Internasional, dan Akademi Ilmu Agama Islam dengan badan
              penyelenggara Yayasan Perguruan Tinggi Bogor (YPTB).
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Tanggal 1 November 1980, Universitas Bogor secara resmi berganti
              nama menjadi Universitas Pakuan di bawah Yayasan Kartika Siliwangi
              Pembina Universitas Pakuan (YKS-PUP), yayasan baru yang dibentuk
              oleh Yayasan Kartika Siliwangi sebagai pengganti YPTB seperti
              tersurat dalam Surat Keputusan No. Skep/27/YKS/VIII-A/10/1980.
              Perubahan nama ini disahkan oleh Notaris Mohamad Adam, S.H.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Pada tahun 2007, Direktorat Jenderal Pendidikan Tinggi telah
              memperbarui izin operasional penyelenggaraan Program Studi di
              lingkungan Universitas Pakuan sebanyak 24 Program Studi, sehingga
              100% Program Studi di Universitas Pakuan telah memiliki izin
              operasional. Tahun yang sama, izin operasional penyelenggaraan
              Program Studi Baru juga dikeluarkan, termasuk program studi
              Manajemen (S2), Pendidikan Guru Sekolah Dasar (S1), Manajemen
              Keuangan dan Perbankan (D3), Teknik Komputer (D3), dan Manajemen
              Informatika (D3).
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Hingga saat ini, Universitas Pakuan memiliki Program Pascasarjana
              (S2) dengan 4 (empat) Program Studi, yaitu Manajemen Pendidikan,
              Pendidikan Kependudukan dan Lingkungan Hidup, Ilmu Hukum, dan
              Magister Manajemen. Program Sarjana (S1) dan Program Diploma III
              (D3) tergabung dalam 6 (enam) fakultas, yaitu: Hukum, Ekonomi,
              Keguruan dan Ilmu Pendidikan, Sastra, Teknik, serta Matematika dan
              Ilmu Pengetahuan Alam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
