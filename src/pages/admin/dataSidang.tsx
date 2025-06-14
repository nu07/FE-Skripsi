import Axios from "@/API/axios";
import { Input } from "@/components/ui/input"
import { Button } from '@headlessui/react';
import BaseModal from "@/components/modal/BaseModal";
import DashboardPagination from '@/components/pagination/dashboardPagination';
import { Bounce, toast } from "react-toastify";
import { classNames } from "@/utils/classNames";

const defaultValue = {
    status: "",
    id_penguji1: "",
    id_penguji2: "",
    tanggal_sidang: "",
}

export default function Example() {
    const [dataSidang, setDataSidang] = useState<any>([])
    const [isEditData, setIsEditData] = useState(false)
    const [pagination, setPagination] = useState({
        currentPages: 1,
        perPage: 10,
        totalPages: 1,
        totalItems: 1,
        isLoading: true,
        showDeleted: true,
    });
    const [detailDosen, setDetailDosen] = useState<any>(defaultValue)
    const [dataDosen, setDataDosen] = useState<any>([])
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

    const getAllDataSidang = async () => {
        try {
            const res = await Axios.get(`/sidang?page=${pagination.currentPages}&limit=${pagination.perPage}&search=${searchQuery}&showDeleted=${pagination.showDeleted}`)
            setDataSidang(res.data.data)
            setPagination((prev) => ({
                ...prev,
                totalPages: res.data.pagination.totalPages,
                totalItems: res.data.pagination.total,
                isLoading: false,
            }));
        } catch (e) {
            console.error(e)
        }
    }


    const getAllDataDosen = async () => {
        try {
            const res = await Axios.get('/dosen/dosen?page=1&limit=1000&search=a&showDeleted=true')
            setDataDosen(res.data.data)
        } catch (e: any) {
            console.error(e)
        }
    }

    const SubmitEditData = async () => {
        try {
            await Axios.put(`/sidang/${detailDosen?.id}`, detailDosen)
            setIsEditData(false)
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
            getAllDataSidang()
        } catch (e: any) {
            console.error(e)
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
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 1000);

        return () => clearTimeout(handler)
    }, [searchQuery]);

    useEffect(() => {
        getAllDataSidang()
    }, [pagination.currentPages, debouncedSearch, pagination.showDeleted]);

    useEffect(() => {
    getAllDataDosen()
    }, [])
    

    return (
        <>
            <BaseModal
                isOpen={isEditData}
                setIsOpen={setIsEditData}
                title="Edit Data Sidang"
                mode="edit"
                submitData={SubmitEditData}
                content={<ModalEdit state={detailDosen} setState={setDetailDosen} dataDosen={dataDosen} />}
            />
            <div className="my-2 flex justify-between gap-x-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                    {/* Input Pencarian */}
                    <Input
                        type="text"
                        placeholder="Cari Data Sidang"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
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
                            onChange={(e) =>
                                setPagination((prev: any) => ({
                                    ...prev,
                                    showDeleted: e.target.checked, // ✅ gunakan `checked` untuk checkbox
                                }))
                            }
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="showDeleted" className="text-sm text-gray-700">
                            Tampilkan Sidang yang Sudah Dihapus
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Nama
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            NIM
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Deleted
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Tanggal Sidang
                                        </th>
                                        <th scope="col" className="relative px-6 py-3 text-gray-500">
                                            <span className="">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {dataSidang.map((person: any) => (
                                        <tr key={person.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-36 truncate " title={person.mahasiswa.nama}>{person.mahasiswa.nama}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-24 truncate" title={person.mahasiswa.nim}>{person.mahasiswa.nim}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-36 truncate" title={person.mahasiswa.email}>{person.mahasiswa.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-36 truncate" title={person.status}>
                                                <button
                                                    type="button"
                                                    className={classNames(person?.status === 'finished' ? 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500' : person?.status === 'ongoing' ? 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' : 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500', 'inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 ')}
                                                >
                                                    {person?.status?.toUpperCase()}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-36 truncate" title={person.deletedAt}>
                                                <input
                                                    type="checkbox"
                                                    readOnly
                                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 disabled:opacity-100 disabled:bg-white disabled:text-indigo-600 disabled:cursor-default"
                                                    checked={!!person.deletedAt}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-36 truncate" title={person.tanggal_sidang}>  {new Date(person?.tanggal_sidang).toLocaleString('id-ID', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            })}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                                                <Button className="text-indigo-600 hover:text-indigo-900" onClick={() => {
                                                    setDetailDosen(person)
                                                    setIsEditData(true)
                                                }
                                                }>
                                                    Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <DashboardPagination
                                pagination={pagination}
                                setPagination={setPagination}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



const ModalEdit = ({ state, setState, dataDosen }: any) => {
    return (
        <>
            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <div className="mt-1">

                        <select
                            id="location"
                            name="location"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border-2"
                            defaultValue="sukses"
                            onChange={(e: any) => setState((prev: any) => ({
                                ...prev,
                                status: e.target.value,
                            }))}
                            value={state.status}
                        >
                            <option value='unfinished'>Unfinished</option>
                            <option value='ongoing'>On Going</option>
                            <option value='finished'>Finished</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Nama Penguji 1
                    </label>
                    <div className="mt-1">
                        <select
                            id="id_pembimbing1"
                            name="id_pembimbing1"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border-2"
                            defaultValue=""
                            onChange={(e: any) => setState((prev: any) => ({
                                ...prev,
                                id_penguji1: e.target.value,
                            }))}
                            value={state.id_penguji1}
                        >
                            {dataDosen.map((data: any)=> (
                                <>
                                <option key={data.id} value={data.id}>{data.nama}</option>
                                </>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Nama Penguji 2
                    </label>
                    <div className="mt-1">
                        <select
                            id="id_pembimbing2"
                            name="id_pembimbing2"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border-2"
                            defaultValue=""
                            onChange={(e: any) => setState((prev: any) => ({
                                ...prev,
                                id_penguji2: e.target.value,
                            }))}
                            value={state.id_penguji2}
                        >
                            {dataDosen.map((data: any)=> (
                                <>
                                <option key={data.id} value={data.id}>{data.nama}</option>
                                </>
                            ))}
                        </select>
                    </div>
                </div>

     <div>
  <label className="block text-sm font-medium text-gray-700">
    Tanggal Sidang
  </label>
  <div className="mt-1">
    <input
      type="datetime-local"
      id="tanggal_sidang"
      name="tanggal_sidang"
      required
      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      onChange={(e: any) => {
        const localValue = e.target.value; // e.g., "2025-06-22T09:00"
        const isoString = new Date(localValue).toISOString(); // e.g., "2025-06-22T09:00:00.000Z"
        setState((prev: any) => ({
          ...prev,
          tanggal_sidang: isoString,
        }));
      }}
      value={
        state.tanggal_sidang
          ? new Date(state.tanggal_sidang).toISOString().slice(0, 16)
          : ''
      }
    />
  </div>
</div>

                {state.deletedAt && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Pulihkan Data yang Dihapus?
                        </label>
                        
                        <div className="mt-1 flex items-center space-x-2">
                            
                            <input
                                type="checkbox"
                                checked={!!state.restore} // ✅ pastikan boolean
                                onChange={(e) =>
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

    )
}