import { Link } from "react-router-dom";
import { NewspaperIcon } from "@heroicons/react/solid";
import Axios from "@/API/axios";
import createDOMPurify from "dompurify";
import { NewsData } from "../types/news";
import DashboardPagination from "@/components/pagination/dashboardPagination";

function Index() {
  const [datanews, setDatanews] = useState<NewsData | any>([]);
  const DOMPurify = createDOMPurify(window);
  const [pagination, setPagination] = useState({
    currentPages: 1,
    perPage: 4,
    totalPages: 1,
    totalItems: 1,
    isLoading: true,
  });
  const getAllNews = async () => {
    try {
      const res = await Axios.get(`/news?page=${pagination.currentPages}&limit=${pagination.perPage}`);
      setDatanews(res.data.data);
      setPagination(prev => ({
        ...prev,
        totalPages: res.data.totalPages,
        totalItems: res.data.totalItems,
        isLoading: false,
      }));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAllNews();
  }, [pagination.currentPages]);

  return (
    <main>
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 bg-gray-100 h-1/2" />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative mt-5 shadow-xl sm:rounded-2xl sm:overflow-hidden">
            <div className="absolute inset-0">
              <img className="object-cover w-full h-full" src="/images/bg-ilkom.png" alt="People working on laptops" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-4xl font-extrabold tracking-tight text-center sm:text-5xl lg:text-6xl">
                <span className="block text-white">Universitas Pakuan</span>
                <span className="block text-indigo-200">Kota Bogor</span>
              </h1>
              <p className="max-w-lg mx-auto mt-6 text-xl text-center text-indigo-200 sm:max-w-3xl">Fakultas Ilmu Sosial dan Ilmu Budaya</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alternating Feature Sections */}
      <div className="relative pt-16 pb-32 overflow-hidden">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center mb-10">
            <NewspaperIcon className="w-8 h-8 mr-3 text-blue-500" aria-hidden="true" />
            <h2 className="text-3xl font-bold text-gray-900">Rilis Berita</h2>
          </div>

          {/* Featured News */}
          <div className="grid grid-cols-1 gap-8 mb-16 overflow-hidden border shadow-lg lg:grid-cols-2 rounded-xl p-2">
            {datanews?.map((news: string, index: any) => (
              <div
                className="flex flex-col justify-center p-6 border-2 hover:cursor-pointer transition-shadow duration-300  hover:shadow-lg"
                key={index}>
                <p className="mb-2 text-sm font-medium text-gray-500">
                  {new Date(news?.updatedAt).toLocaleString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">{news.title}</h3>
                <p className="mb-6 text-gray-600" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(news?.content) }}></p>
                <Link to="#" className="inline-flex items-center px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 w-fit">
                  Baca Selengkapnya
                </Link>
              </div>
            ))}
          </div>

          <DashboardPagination pagination={pagination} setPagination={setPagination} />
        </div>
      </div>
    </main>
  );
}

export default Index;
