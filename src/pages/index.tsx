import { Link } from "react-router-dom";
import { NewspaperIcon } from "@heroicons/react/solid";

const features = [
  {
    name: "Unlimited Inboxes",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: InboxIcon,
  },
  {
    name: "Manage Team Members",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: UsersIcon,
  },
  {
    name: "Spam Report",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: TrashIcon,
  },
  {
    name: "Compose in Markdown",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: PencilAltIcon,
  },
  {
    name: "Team Reporting",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: DocumentReportIcon,
  },
  {
    name: "Saved Replies",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ReplyIcon,
  },
  {
    name: "Email Commenting",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: ChatAltIcon,
  },
  {
    name: "Connect with Customers",
    description:
      "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
    icon: HeartIcon,
  },
];

const metrics = [
  {
    id: 1,
    stat: "8K+",
    emphasis: "Companies",
    rest: "use laoreet amet lacus nibh integer quis.",
  },
  {
    id: 2,
    stat: "25K+",
    emphasis: "Countries around the globe",
    rest: "lacus nibh integer quis.",
  },
  {
    id: 3,
    stat: "98%",
    emphasis: "Customer satisfaction",
    rest: "laoreet amet lacus nibh integer quis.",
  },
  {
    id: 4,
    stat: "12M+",
    emphasis: "Issues resolved",
    rest: "lacus nibh integer quis.",
  },
];

const featuredNews = {
  date: "21, April 2025",
  title:
    "Kulit Buah Naga Jadi Camilan Sehat, Kolaborasi Unpak dan Filipina di Kebun Merdesa",
  excerpt:
    "Dosen dan mahasiswa FMIPA Universitas Pakuan (Unpak) dalam program Pengabdian kepada Masyarakat (PKM) Internasional yang berlangsung di Kebun Merdesa, Bogor.",
  image:
    "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1080&auto=format&fit=crop",
};

const recentNews = [
  {
    id: 1,
    title:
      "Universitas Pakuan Gelar Halal bi Halal, Rektor: Satukan Hati, Kuatkan Ukhuwah",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1080&auto=format&fit=crop",
  },
  {
    id: 2,
    title:
      "Konferensi Kepemimpinan Mahasiswa Unpak: Membangun Gerakan Bersatu untuk Perubahan",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1080&auto=format&fit=crop",
  },
  {
    id: 3,
    title:
      "Transformasi Digital UMKM Desa: Tingkatkan Daya Saing dengan SEO dan Marketing",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1080&auto=format&fit=crop",
  },
  {
    id: 4,
    title:
      "Inovasi SAVERIS: Solusi QR Code untuk Distribusi Bantuan Sosial di Desa Sukamakmur",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1080&auto=format&fit=crop",
  },
];

function Index() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Ganti dengan jumlah halaman total yang sesuai

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <main>
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="/images/bg-ilkom.png"
                alt="People working on laptops"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">Universitas Pakuan</span>
                <span className="block text-indigo-200">Kota Bogor</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                Fakultas Ilmu Sosial dan Ilmu Budaya
              </p>
              {/* <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                  >
                    Get started
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                  >
                    Live demo
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Logo Cloud */}
      {/* <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
            Trusted by over 5 very average small businesses
          </p>
          <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img
                className="h-12"
                src="https://plus.unsplash.com/premium_photo-1700346339061-9755dcc26bd9?q=80&w=430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Tuple"
              />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img
                className="h-12"
                src="https://images.unsplash.com/photo-1736635929162-afc982d54a32?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Mirage"
              />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <img
                className="h-12"
                src="https://images.unsplash.com/photo-1736635929162-afc982d54a32?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="StaticKit"
              />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1">
              <img
                className="h-12"
                src="https://images.unsplash.com/photo-1736635929162-afc982d54a32?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Transistor"
              />
            </div>
            <div className="col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1">
              <img
                className="h-12"
                src="https://images.unsplash.com/photo-1736635929162-afc982d54a32?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Workcation"
              />
            </div>
          </div>
        </div>
      </div> */}

      {/* Alternating Feature Sections */}
      <div className="relative pt-16 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center mb-10">
            <NewspaperIcon
              className="h-8 w-8 text-blue-500 mr-3"
              aria-hidden="true"
            />
            <h2 className="text-3xl font-bold text-gray-900">Rilis Berita</h2>
          </div>

          {/* Featured News */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 border rounded-xl overflow-hidden shadow-lg">
            <div className="relative h-[400px] lg:h-auto">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src={featuredNews.image || "/placeholder.svg"}
                alt={featuredNews.title}
              />
            </div>
            <div className="p-6 flex flex-col justify-center">
              <p className="text-sm font-medium text-gray-500 mb-2">
                {featuredNews.date}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {featuredNews.title}
              </h3>
              <p className="text-gray-600 mb-6">{featuredNews.excerpt}</p>
              <Link
                to="#"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 w-fit"
              >
                Baca Selengkapnya
              </Link>
            </div>
          </div>

          {/* Recent News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {recentNews.map((news) => (
              <a
                key={news.id}
                className="border rounded-lg overflow-hidden hover:cursor-pointer hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 relative">
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={news.image || "/placeholder.svg"}
                    alt={news.title}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-3">
                    {news.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>

          {/* News Index Button */}
          <div className="mt-8 flex justify-center items-center space-x-2">
            <button
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &larr; Sebelumnya
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Selanjutnya &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Gradient Feature Section */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Inbox support built for efficiency
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-purple-200">
            Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et
            magna sit morbi lobortis. Blandit aliquam sit nisl euismod mattis
            in.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name}>
                <div>
                  <span className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-white">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base text-purple-200">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="relative bg-gray-900">
        <div className="h-80 absolute inset-x-0 bottom-0 xl:top-0 xl:h-full">
          <div className="h-full w-full xl:grid xl:grid-cols-2">
            <div className="h-full xl:relative xl:col-start-2">
              <img
                className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
                src="https://images.unsplash.com/photo-1737920406899-e1cabc43a6a7?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="People working on laptops"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
              />
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-cols-2 xl:grid-flow-col-dense xl:gap-x-8">
          <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
            <h2 className="text-sm font-semibold tracking-wide uppercase">
              <span className="bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                Valuable Metrics
              </span>
            </h2>
            <p className="mt-3 text-3xl font-extrabold text-white">
              Get actionable data that will help grow your business
            </p>
            <p className="mt-5 text-lg text-gray-300">
              Rhoncus sagittis risus arcu erat lectus bibendum. Ut in adipiscing
              quis in viverra tristique sem. Ornare feugiat viverra eleifend
              fusce orci in quis amet. Sit in et vitae tortor, massa. Dapibus
              laoreet amet lacus nibh integer quis. Eu vulputate diam sit tellus
              quis at.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
              {metrics.map((item) => (
                <p key={item.id}>
                  <span className="block text-2xl font-bold text-white">
                    {item.stat}
                  </span>
                  <span className="mt-1 block text-base text-gray-300">
                    <span className="font-medium text-white">
                      {item.emphasis}
                    </span>{" "}
                    {item.rest}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Get in touch or create an account.
            </span>
          </h2>
          <div className="mt-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-5">
            <a
              href="#"
              className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-purple-700 hover:to-indigo-700"
            >
              Learn more
            </a>
            <a
              href="#"
              className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-800 bg-indigo-50 hover:bg-indigo-100"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Index;
