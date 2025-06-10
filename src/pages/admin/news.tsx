import { useState } from "react";
import Axios from "@/API/axios";
import { NewsData } from "@/types/news";
import { Link } from "react-router-dom";
import ModalDetail from "@/components/modal/modalDetail";
import { Button } from "@headlessui/react";
import DashboardPagination from "@/components/pagination/dashboardPagination";

function NewsAdmin() {
  const [allDataNews, setAllDataNews] = useState<NewsData[]>([]);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isDetailData, setisDetailData] = useState<NewsData | null>(null);
  const [pagination, setPagination] = useState({
    currentPages: 1,
    perPage: 15,
    totalPages: 2,
    totalItems: 1,
    isLoading: true,
  });

  const getAllNews = async () => {
    setPagination((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      const res = await Axios.get(
        `/news?page=${pagination.currentPages}&limit=${pagination.perPage}`
      );

      setPagination((prev) => ({
        ...prev,
        totalPages: res.data.totalPages,
        totalItems: res.data.totalItems,
        // perPage: prev.perPage + res.data.data.length,
      }));
      setAllDataNews(res.data.data);
      setPagination((prev) => ({
        ...prev,
        isLoading: false,
      }));
      console.log(pagination);
    } catch (e) {
      console.error(e);
      setPagination((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    getAllNews();
  }, [pagination.currentPages]);

  if (pagination.isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <ModalDetail
          isOpen={isOpenDetail}
          setIsOpen={setIsOpenDetail}
          data={isDetailData}
        />
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {allDataNews?.map((person) => (
            <li
              key={person.id}
              className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div className="w-full flex items-center justify-between p-6 space-x-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-gray-900 text-sm font-medium truncate">
                      {person.title}
                    </h3>
                    <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                      {person.admin.nama}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-500 text-sm truncate">
                    {person.content}
                  </p>
                </div>
                <img
                  className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                  src={person.admin.nama}
                  alt=""
                />
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="w-0 flex-1 flex">
                    <Button
                      onClick={() => {
                        setisDetailData(person);
                        setIsOpenDetail(true);
                      }}
                      className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                    >
                      <DocumentIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-3">Detail</span>
                    </Button>
                  </div>
                  <div className="w-0 flex-1 flex">
                    <Link
                      to={`mailto:${person.admin.nama}`}
                      className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                    >
                      <DocumentTextIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-3">Edit</span>
                    </Link>
                  </div>
                  <div className="-ml-px w-0 flex-1 flex">
                    <Link
                      to={`tel:${person.admin.nama}`}
                      className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                    >
                      <DocumentRemoveIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-3">Delete</span>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <DashboardPagination
          pagination={pagination}
          setPagination={setPagination}
        />
      </>
    );
  }
}

export default NewsAdmin;
