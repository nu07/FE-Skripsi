import { Fragment, useState } from "react";
import Axios from "@/API/axios";
import { NewsData } from "@/types/news";
import ModalDetail from "@/components/modal/News/modalDetail";
import ModalCreate from "@/components/modal/News/modalCreateNews";
import { Button } from "@headlessui/react";
import DashboardPagination from "@/components/pagination/dashboardPagination";
import { Bounce, toast } from "react-toastify";
import ModalDelete from "@/components/modal/ModalDelete";
import { Input } from "@/components/ui/input";


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

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
    deletedAt: null
  }
}


function NewsAdmin() {
  const [allDataNews, setAllDataNews] = useState<NewsData[]>([]);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isDetailData, setisDetailData] = useState<NewsData | null>(defaultData);
  const [isOpenCreateNews, setIsOpenCreateNews] = useState(false)
  const [isOpenEditNews, setIsOpenEditNews] = useState(false)
  const [isOpenDeleteNews, setIsOpenDeleteNews] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [pagination, setPagination] = useState({
    currentPages: 1,
    perPage: 12,
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
        `/news?page=${pagination.currentPages}&limit=${pagination.perPage}&search=${searchQuery}`
      );

      setPagination((prev) => ({
        ...prev,
        totalPages: res.data.totalPages,
        totalItems: res.data.totalItems,
      }));
      setAllDataNews(res.data.data);
      setPagination((prev) => ({
        ...prev,
        isLoading: false,
      }));
    } catch (e) {
      console.error(e);
      setPagination((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  const CreateDataNews = async () => {
    try {
      await Axios.post('/news', isDetailData)
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
      setIsOpenCreateNews(false)
      getAllNews()
    } catch (e) {
      console.error(e)
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
  }

  const EditDataNews = async () => {
    try {
      await Axios.put(`/news/${isDetailData?.id}`, isDetailData)
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
      setIsOpenEditNews(false)
      getAllNews()
    } catch (e) {
      console.error(e)
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

  }
  const DeleteDataNews = async () => {
    try {
      await Axios.delete(`/news/${isDetailData?.id}`)
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
      setIsOpenDeleteNews(false)
      getAllNews()
    } catch (e) {
      console.error(e)
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
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 1000);

    return () => clearTimeout(handler)
  }, [searchQuery]);


  useEffect(() => {
    getAllNews();
  }, [pagination.currentPages, debouncedSearch]);


  useEffect(() => {
    if (isOpenCreateNews) {
      setisDetailData(defaultData)
    }
  }, [isOpenCreateNews])

  return (
    <>
      {false ? (
        <div>

          <p>Loading...</p>
        </div>
      ) : <>
        <ModalCreate
          isOpen={isOpenCreateNews}
          setIsOpen={setIsOpenCreateNews}
          data={isDetailData}
          setData={setisDetailData}
          submitData={CreateDataNews}
        />
        {/* edit news */}
        <ModalCreate
          isOpen={isOpenEditNews}
          setIsOpen={setIsOpenEditNews}
          data={isDetailData}
          setData={setisDetailData}
          submitData={EditDataNews}
        />
        <ModalDetail
          isOpen={isOpenDetail}
          setIsOpen={setIsOpenDetail}
          data={isDetailData}
          setData={setisDetailData}
        />
        <ModalDelete
          isOpen={isOpenDeleteNews}
          setIsOpen={setIsOpenDeleteNews}
          title="Hapus Data News"
          content={`Anda Akan Menghapus data ${isDetailData?.title}`}
          submitData={DeleteDataNews}
        />
        <div className="flex">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Data Berita</h2></div>

        <div className="my-2 flex justify-between gap-x-4">
          <div className="">
            <SearchIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
            <Input
              type="text"
              placeholder="Cari berita"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="py-3 pl-4 pr-4 text-lg text-gray-900 bg-white border-2 rounded-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setDebouncedSearch(searchQuery); // trigger langsung saat Enter
                }
              }}
            />
          </div>
          <button
            onClick={() => setIsOpenCreateNews(true)}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Tambah Berita
            <DocumentAddIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-0"
        >
          {allDataNews?.map((person) => (
            <div className="bg-white px-4 py-5 sm:px-6 lg:border-2 border-yellow-500" key={person.id}>
              <div className="flex space-x-3">
                {/* <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-15setIsOpenCreateNews50525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div> */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    <a href="#" className="hover:underline">
                      {person.admin.nama}
                    </a>
                  </p>
                  <p className="text-sm text-gray-500">
                    <a href="#" className="hover:underline">
                      {new Date(person.updatedAt).toLocaleString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </a>
                  </p>

                  <p className="text-sm text-gray-900 text-center underline py-2 truncate">
                    <a href="#" className="hover:underline">
                      {person.title}
                    </a>
                  </p>
                  <p className="text-sm text-gray-900 line-clamp-3">
                    <a href="#" className="hover:underline">
                      {person.content}
                    </a>
                  </p>

                </div>

                <div className="flex-shrink-0 self-center flex">
                  <Menu as="div" className="relative z-30 inline-block text-left">
                    <div>
                      <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                        <span className="sr-only">Open options</span>
                        <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <Button
                                onClick={() => {
                                  setisDetailData(person);
                                  setIsOpenDetail(true);
                                }}
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'flex px-4 py-2 text-sm w-full'
                                )}
                              >
                                <DocumentIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span>Detail</span>
                              </Button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Button
                                onClick={() => {
                                  setisDetailData(person);
                                  setIsOpenEditNews(true);
                                }}
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'flex px-4 py-2 text-sm w-full'
                                )}
                              >
                                <DocumentTextIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span>Edit</span>
                              </Button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Button
                                onClick={() => {
                                  setisDetailData(person);
                                  setIsOpenDeleteNews(true);
                                }}
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'flex px-4 py-2 text-sm'
                                )}
                              >
                                <DocumentRemoveIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span>Delete</span>
                              </Button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          ))}
        </ul>
        <DashboardPagination
          pagination={pagination}
          setPagination={setPagination}
        />
      </>}
    </>
  )

}

export default NewsAdmin;
