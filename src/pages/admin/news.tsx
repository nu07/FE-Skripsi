import { Fragment, useState, useEffect } from "react";
import Axios from "@/API/axios";
import { NewsData } from "@/types/news";
import ModalDetail from "@/components/modal/News/modalDetail";
import ModalCreate from "@/components/modal/News/modalCreateNews";
import { Menu, Transition } from "@headlessui/react";
import DashboardPagination from "@/components/pagination/dashboardPagination";
import { Bounce, toast } from "react-toastify";
import ModalDelete from "@/components/modal/ModalDelete";
// import { Input } from "@/components/ui/input";
import {
  DocumentAddIcon,
  TrashIcon,
  SwitchHorizontalIcon,
  DotsVerticalIcon,
  DocumentIcon,
  DocumentTextIcon,
  DocumentRemoveIcon,
} from "@heroicons/react/outline";

// function classNames(...classes: any[]) {
//   return classes.filter(Boolean).join(" ");
// }

const defaultData = {
  id: "",
  id_admin: "",
  title: "",
  content: "",
  createdAt: "",
  updatedAt: "",
  admin: {
    id: "",
    email: "",
    password: "",
    nama: "",
    deletedAt: null,
  },
};

export const fetchNewsData = async (page = 1, limit = 12) => {
  try {
    const res = await Axios.get(`/news?page=${page}&limit=${limit}`);
    return res.data.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

function NewsAdmin() {
  const [allDataNews, setAllDataNews] = useState<NewsData[]>([]);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isDetailData, setisDetailData] = useState<NewsData | null>(defaultData);
  const [isOpenCreateNews, setIsOpenCreateNews] = useState(false);
  const [isOpenEditNews, setIsOpenEditNews] = useState(false);
  const [isOpenDeleteNews, setIsOpenDeleteNews] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [pagination, setPagination] = useState({
    currentPages: 1,
    perPage: 12,
    totalPages: 2,
    totalItems: 1,
    isLoading: true,
  });
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [selectedNews, setSelectedNews] = useState<string[]>([]);

  const getAllNews = async () => {
    setPagination(prev => ({
      ...prev,
      isLoading: true,
    }));
    try {
      const res = await Axios.get(
        `/news?page=${pagination.currentPages}&limit=${pagination.perPage}&search=${searchQuery}`
      );

      console.log(res.data)
      setPagination((prev) => ({
        ...prev,
        totalPages: res.data.pagination.totalPages,
        totalItems: res.data.pagination.total,
      }));
      setAllDataNews(res.data.data);
      setPagination(prev => ({
        ...prev,
        isLoading: false,
      }));
    } catch (e) {
      console.error(e);
      setPagination(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  const CreateDataNews = async () => {
    try {
      await Axios.post("/news", isDetailData);
      toast.success("Berita Di Tambahkan!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setIsOpenCreateNews(false);
      getAllNews();
    } catch (e) {
      console.error(e);
      toast.error("Berita gagal DiTambahkan!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const EditDataNews = async () => {
    try {
      await Axios.put(`/news/${isDetailData?.id}`, isDetailData);
      toast.success("Berita Berhasil Di Edit!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setIsOpenEditNews(false);
      getAllNews();
    } catch (e) {
      console.error(e);
      toast.error("Berita gagal DiTambahkan!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const DeleteDataNews = async () => {
    try {
      await Axios.delete(`/news/${isDetailData?.id}`);
      toast.success("Berita Berhasil Di Hapus!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setIsOpenDeleteNews(false);
      getAllNews();
    } catch (e) {
      console.error(e);
      toast.error("Berita gagal Di Hapus!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const handleDeleteAll = async () => {
    try {
      await Promise.all(selectedNews.map(id => Axios.delete(`/news/${id}`)));
      toast.success("Semua berita yang dipilih berhasil dihapus!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setSelectedNews([]);
      getAllNews();
    } catch (e) {
      console.error(e);
      toast.error("Gagal menghapus berita yang dipilih!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    getAllNews();
  }, [pagination.currentPages, debouncedSearch]);

  useEffect(() => {
    if (isOpenCreateNews) {
      setisDetailData(defaultData);
    }
  }, [isOpenCreateNews]);

  return (
    <>
      {pagination.isLoading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <ModalCreate
            isOpen={isOpenCreateNews}
            setIsOpen={setIsOpenCreateNews}
            data={isDetailData}
            setData={setisDetailData}
            submitData={CreateDataNews}
          />
          <ModalCreate
            isOpen={isOpenEditNews}
            setIsOpen={setIsOpenEditNews}
            data={isDetailData}
            setData={setisDetailData}
            submitData={EditDataNews}
          />
          <ModalDetail isOpen={isOpenDetail} setIsOpen={setIsOpenDetail} data={isDetailData} setData={setisDetailData} />
          <ModalDelete
            isOpen={isOpenDeleteNews}
            setIsOpen={setIsOpenDeleteNews}
            title="Hapus Data News"
            content={`Anda Akan Menghapus data ${isDetailData?.title}`}
            submitData={DeleteDataNews}
          />
          <div className="flex">
            <h2 className="text-3xl font-bold text-gray-900 text-center">Data Berita</h2>
          </div>
          {/* <div className="my-2 flex justify-between gap-x-4">
            <Input
              type="text"
              placeholder="Cari berita"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="py-3 pl-4 pr-4 text-lg text-gray-900 bg-white border-2 rounded-full"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  setDebouncedSearch(searchQuery);
                }
              }}
            />
            <button
              onClick={() => setIsOpenCreateNews(true)}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Tambah Berita
              <DocumentAddIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
            </button>
          </div> */}
          <div className="my-2 grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Cari berita..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="px-4 py-2 border w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpenCreateNews(true)}
                type="button"
                className="inline-flex items-center px-4 py-2 border w-auto 2xl:w-60 border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Tambah Berita
                <DocumentAddIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={handleDeleteAll}
                type="button"
                className="inline-flex items-center px-4 py-2 border w-auto 2xl:w-60 border-transparent shadow-sm text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Hapus Semua
                <TrashIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => setViewMode(viewMode === "card" ? "list" : "card")}
                type="button"
                className="inline-flex items-center px-4 py-2 w-auto 2xl:w-60 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                {viewMode === "card" ? "Tampilan List" : "Tampilan Card"}
                <SwitchHorizontalIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <ul role="list" className={`grid ${viewMode === "card" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6 p-4`}>
            {allDataNews
              ?.filter(person => person.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(person => (
                <div
                  className={`bg-white rounded-lg shadow-md overflow-visible border border-gray-300 ${
                    viewMode === "list" ? "flex items-center space-x-4 p-4" : "flex flex-col"
                  }`}
                  key={person.id}
                  style={{ minHeight: viewMode === "card" ? "200px" : "auto" }}>
                  {viewMode === "list" && (
                    <input
                      type="checkbox"
                      checked={selectedNews.includes(person.id)}
                      onChange={() =>
                        setSelectedNews(prev => (prev.includes(person.id) ? prev.filter(id => id !== person.id) : [...prev, person.id]))
                      }
                      className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  )}
                  <div className={viewMode === "list" ? "flex-1" : "px-6 py-4 flex-grow overflow-hidden"}>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{person.title || "Judul Tidak Tersedia"}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(person.updatedAt).toLocaleString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 mt-2 line-clamp-3">{person.content || "Konten berita tidak tersedia."}</p>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                    <p className="text-sm text-gray-600">Admin: {person.admin.nama || "Tidak diketahui"}</p>
                    <Menu as="div" className="relative">
                      <Menu.Button className="inline-flex items-center p-2 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none">
                        <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    setisDetailData(person);
                                    setIsOpenDetail(true);
                                  }}
                                  className={`${active ? "bg-gray-100 text-gray-900" : "text-gray-700"} flex items-center px-4 py-2 text-sm w-full`}>
                                  <DocumentIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                  Detail
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    setisDetailData(person);
                                    setIsOpenEditNews(true);
                                  }}
                                  className={`${active ? "bg-gray-100 text-gray-900" : "text-gray-700"} flex items-center px-4 py-2 text-sm w-full`}>
                                  <DocumentTextIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                  Edit
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    setisDetailData(person);
                                    setIsOpenDeleteNews(true);
                                  }}
                                  className={`${active ? "bg-gray-100 text-gray-900" : "text-gray-700"} flex items-center px-4 py-2 text-sm w-full`}>
                                  <DocumentRemoveIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                  Delete
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              ))}
          </ul>
          <DashboardPagination pagination={pagination} setPagination={setPagination} />
        </>
      )}
    </>
  );
}

export default NewsAdmin;
