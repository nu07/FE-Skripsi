import Axios from "@/API/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@headlessui/react";
import BaseModal from "@/components/modal/BaseModal";
import DashboardPagination from "@/components/pagination/dashboardPagination";
import { Bounce, toast } from "react-toastify";
import ModalDelete from "@/components/modal/ModalDelete";
import * as XLSX from "xlsx";

const defaultValue = {
  id: "",
  nama: "",
  nidn: "",
  email: "",
  password: "",
  deletedAt: null,
};

export default function Example() {
  const [dataDosen, setDataDosen] = useState<any>([]);
  const [isEditData, setIsEditData] = useState(false);
  const [isCreateData, setIsCreateData] = useState(false);
  const [isDeleteData, setIsDeleteData] = useState(false);
  const [modalDataDosen, setModalDataDosen] = useState(false)
  const [uploadDosenMany, setUploadDosenMany] = useState([])
  const [pagination, setPagination] = useState({
    currentPages: 1,
    perPage: 10,
    totalPages: 1,
    totalItems: 1,
    isLoading: true,
    showDeleted: true,
  });
  const [detailDosen, setDetailDosen] = useState<any>(defaultValue);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const getAllDosen = async () => {
    try {
      const res = await Axios.get(
        `/dosen/dosen?page=${pagination.currentPages}&limit=${pagination.perPage}&search=${searchQuery}&showDeleted=${pagination.showDeleted}`
      );
      setDataDosen(res.data.data);
      setPagination(prev => ({
        ...prev,
        totalPages: res.data.pagination.totalPages,
        totalItems: res.data.pagination.total,
        isLoading: false,
      }));
    } catch (e) {
      console.error(e);
    }
  };

  const SubmitEditData = async () => {
    try {
      await Axios.put(`/dosen/dosen/${detailDosen?.id}`, detailDosen);
      setIsEditData(false);
      toast.success("Dosen berhasil Di Edit!", {
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
      getAllDosen();
    } catch (e: any) {
      console.error(e);
      toast.error(e.response.data.message ?? "Dosen gagal Di Tambahkan!", {
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

  const createDosenData = async () => {
    try {
      await Axios.post("/dosen/dosen", detailDosen);
      toast.success("Dosen berhasil Di Tambahkan!", {
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
      getAllDosen();
      setIsCreateData(false);

      
    } catch (e: any) {
      toast.error(e.response.data.message ?? "Dosen gagal Di Tambahkan!", {
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

  const createDosenDataMany = async () => {
  try {
    const res = await Axios.post("/dosen/dosen", uploadDosenMany);

    const inserted = res.data.inserted ?? [];
    const skipped = res.data.skipped ?? [];

    console.log("inserted", inserted);
    console.log("skipped", skipped);

    if (inserted.length > 0) {
      toast.success(`${inserted.length} Dosen berhasil ditambahkan!`, {
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

    if (skipped.length > 0) {
      toast.warning(`${skipped.length} dosen gagal ditambahkan.`, {
        position: "top-right",
      });
      setUploadDosenMany(skipped);
    } else {
      setUploadDosenMany([]);
      setIsCreateData(false);
    }

    getAllDosen();
  } catch (e: any) {
    toast.error(e.response?.data?.message ?? "Dosen gagal ditambahkan!", {
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

  
  const deleteDataDosen = async () => {
    try {
      await Axios.delete(`/dosen/dosen/${detailDosen.id}`);
      toast.success("Dosen berhasil Di Delete!", {
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
      getAllDosen();
      setIsDeleteData(false);
    } catch (e) {
      console.error(e);
      toast.error("Dosen gagal Di Delete!", {
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

    const downloadReportDosen = async () => {
    try {
      const res = await Axios.get("/report/alldosen", {
        responseType: "blob", // penting: agar bisa terima file
      });

      const blob = new Blob([res.data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "laporan-dosen.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      // opsional: notifikasi
      toast.success("File laporan berhasil diunduh!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (e: any) {
      console.error(e);
      toast.error("Gagal mengunduh laporan mahasiswa", {
        position: "top-right",
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
    getAllDosen();
  }, [pagination.currentPages, debouncedSearch, pagination.showDeleted]);

  return (
    <>
      <BaseModal
        isOpen={isEditData}
        setIsOpen={setIsEditData}
        title="Edit Data Dosen"
        mode="edit"
        submitData={SubmitEditData}
        content={<ModalEdit state={detailDosen} setState={setDetailDosen} />}
      />
      <BaseModal
        isOpen={isCreateData}
        setIsOpen={setIsCreateData}
        title="Tambah Dosen"
        mode="create"
        submitData={createDosenData}
        content={<ModalEdit state={detailDosen} setState={setDetailDosen} />}
      />

      <BaseModal
        isOpen={modalDataDosen}
        setIsOpen={setModalDataDosen}
        title="Upload XLSS Dosen"
        mode="create"
        submitData={createDosenDataMany}
        content={<ModalUploadDosen state={uploadDosenMany} setState={setUploadDosenMany} />}
        width="max-w-6xl"
      />

      <ModalDelete
        isOpen={isDeleteData}
        setIsOpen={setIsDeleteData}
        submitData={deleteDataDosen}
        content={`Anda Akan Menghapus Dosen ${detailDosen?.nama} ? `}
      />
      <div className="my-2 flex justify-between gap-x-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
          {/* Input Pencarian */}
          <Input
            type="text"
            placeholder="Cari Dosen"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                setDebouncedSearch(searchQuery);
              }
            }}
            className="py-3 px-4 text-base text-gray-900 bg-white border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex items-center space-x-2">
            <input
              id="showDeleted"
              name="showDeleted"
              type="checkbox"
              checked={pagination.showDeleted}
              onChange={e =>
                setPagination((prev: any) => ({
                  ...prev,
                  showDeleted: e.target.checked, // ✅ gunakan `checked` untuk checkbox
                }))
              }
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="showDeleted" className="text-sm text-gray-700">
              Tampilkan Dosen yang Sudah Dihapus
            </label>
          </div>
        </div>

        <div className="space-x-2">

            <button
            onClick={() => {
              downloadReportDosen()
            }}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Download Report
            <DocumentAddIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
          </button>

          <button
            onClick={() => {
              setModalDataDosen(true)
            }}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Tambah Banyak Dosen
            <DocumentAddIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
          </button>

          <button
            onClick={() => {
              setIsCreateData(true), setDetailDosen(defaultValue);
            }}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Tambah Dosen
            <DocumentAddIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
          </button>
        </div>


      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Id
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NIDN
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deleted
                    </th>
                    <th scope="col" className="relative px-6 py-3 text-gray-500">
                      <span className="">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dataDosen.map((person: any) => (
                    <tr key={person.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 w-24 truncate " title={person.id}>
                        {person.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-36 truncate " title={person.nama}>
                        {person.nama}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-24 truncate" title={person.nidn}>
                        {person.nidn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-36 truncate" title={person.email}>
                        {person.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-36 truncate" title={person.deletedAt}>
                        <input
                          type="checkbox"
                          readOnly
                          className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 disabled:opacity-100 disabled:bg-white disabled:text-indigo-600 disabled:cursor-default"
                          checked={!!person.deletedAt}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                        <Button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => {
                            setDetailDosen(person);
                            setIsEditData(true);
                          }}>
                          Edit
                        </Button>
                        <Button
                          className="text-indigo-600 hover:text-indigo-900 pl-4"
                          onClick={() => {
                            setDetailDosen(person);
                            setIsDeleteData(true);
                          }}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <DashboardPagination pagination={pagination} setPagination={setPagination} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const ModalEdit = ({ state, setState }: any) => {
  return (
    <>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">NIDN</label>
          <div className="mt-1">
            <input
              type="text"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e: any) =>
                setState((prev: any) => ({
                  ...prev,
                  nidn: e.target.value,
                }))
              }
              value={state.nidn}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
          <div className="mt-1">
            <input
              type="text"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e: any) =>
                setState((prev: any) => ({
                  ...prev,
                  nama: e.target.value,
                }))
              }
              value={state.nama}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="mt-1">
            <input
              type="email"
              id="emails"
              name="emails"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e: any) =>
                setState((prev: any) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              value={state.email}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1">
            <input
              type="text"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e: any) =>
                setState((prev: any) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              value={state.password}
              placeholder="Isi Password Baru. kosongkan jika tidak ingin di ganti"
            />
          </div>
        </div>
        {state.deletedAt && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Pulihkan Data yang Dihapus?</label>
            <div className="mt-1 flex items-center space-x-2">
              <input
                type="checkbox"
                checked={!!state.restore} // ✅ pastikan boolean
                onChange={e =>
                  setState((prev: any) => ({
                    ...prev,
                    restore: e.target.checked, // ✅ gunakan `checked`, bukan `value`
                  }))
                }
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-600">Aktifkan untuk menghapus status deleted</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};


const ModalUploadDosen = ({ state, setState }: any) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState([])
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryStr = evt.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setState(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  const handleChange = (index: number, field: string, value: string | boolean) => {
    const updated = [...state];
    updated[index][field] = value;
    setState(updated);
  };
  console.log(state)
  return (
    <>
      <a
        target="_blank"
        href="./template/template_dosen.xlsx"
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Download Template
        <DownloadIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
      </a>
      <div className="p-4">



        {state.length < 1 ? (<>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        </>) :
          (<div>
            <button
              onClick={() => {
                setState([])
              }}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Reset Data
              <BanIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
            </button>
          </div>)

        }


        <div className="overflow-y-auto max-h-[400px] mt-4 border rounded">

          <table className="table-auto w-full border mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2">NIDN</th>
                <th className="border px-2">Nama</th>
                <th className="border px-2">Email</th>
                <th className="border px-2">Password</th>
                <th className="border px-2">Alasan Gagal</th>
              </tr>
            </thead>
            <tbody>
              {state?.map((mhs: any, index: any) => (
                <tr key={index}>
                  <td className="border px-2">
                    <input
                      type="text"
                      value={mhs.nidn}
                      onChange={(e) => handleChange(index, "nim", e.target.value)}
                      className="w-full"
                    />
                  </td>
                  <td className="border px-2">
                    <input
                      type="text"
                      value={mhs.nama}
                      onChange={(e) => handleChange(index, "nama", e.target.value)}
                      className="w-full"
                    />
                  </td>
                  <td className="border px-2">
                    <input
                      type="email"
                      value={mhs.email}
                      onChange={(e) => handleChange(index, "email", e.target.value)}
                      className="w-full"
                    />
                  </td>
                  <td className="border px-2">
                    <input
                      type="text"
                      value={mhs.password}
                      onChange={(e) => handleChange(index, "password", e.target.value)}
                      className="w-full"
                    />
                  </td>
                  <td className="border px-2 text-red-500 text-sm italic">
                    {mhs.reason ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}