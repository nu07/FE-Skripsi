import Axios from "@/API/axios";
import { Input } from "@/components/ui/input"
import { Button } from '@headlessui/react';
import BaseModal from "@/components/modal/BaseModal";
import DashboardPagination from '@/components/pagination/dashboardPagination';
import { Bounce, toast } from "react-toastify";
import { classNames } from "@/utils/classNames";
import authStore from "@/store/loginStore";

const defaultValue = {
    catatan: "",
    catatan_penguji1: "",
    catatan_penguji2: "",
}

export default function Example() {
    const { data } = authStore();
    const [dataSidang, setDataSidang] = useState<any>([])
    const [isEditData, setIsEditData] = useState(false)
    const [pagination, setPagination] = useState({
        currentPages: 1,
        perPage: 10,
        totalPages: 1,
        totalItems: 1,
        isLoading: true,
        showDeleted: true,
        status: ''
    });
    const [detailData, setDetailData] = useState<any>(defaultValue)
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

    const getAllDataSidang = async () => {
        try {
            const res = await Axios.get(`/dosen/sidang?page=${pagination.currentPages}&limit=${pagination.perPage}&search=${searchQuery}&status=${[pagination.status]}`)
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

    const SubmitEditData = async () => {
        try {
            await Axios.put('/dosen/sidang/catatan', { pendaftaranId: detailData.id, catatan: data?.id === detailData?.pembimbing1?.id ? detailData.catatan_penguji1 : detailData.catatan_penguji2 })
            setIsEditData(false)
            toast.success("Data Sidang berhasil Di Edit!", {
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

    const downloadListSidang = async () => {
        try {
            const res = await Axios.get("/dosen/report/listsidang", {
                responseType: "blob", // penting: agar bisa terima file
            });

            const blob = new Blob([res.data], {
                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "laporan-list-sidang.xlsx");
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

        return () => clearTimeout(handler)
    }, [searchQuery]);

    useEffect(() => {
        getAllDataSidang()
    }, [pagination.currentPages, debouncedSearch, pagination.status]);

    return (
        <>
            <BaseModal
                isOpen={isEditData}
                setIsOpen={setIsEditData}
                title="Edit Data Sidang"
                mode="edit"
                submitData={SubmitEditData}
                content={<ModalEdit state={detailData} setState={setDetailData} />}
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
                    <div className="flex">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 my-auto">
                            Status
                        </label>
                        <select
                            className="mt-1 block w-32 ml-4 pl-3 pr-0  py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border-2"
                            defaultValue="sukses"
                            onChange={(e: any) => setPagination((prev: any) => ({
                                ...prev,
                                status: e.target.value,
                            }))}
                            value={pagination.status}
                        >
                            <option value="">Semua Data</option>
                            <option value="coming">Akan Datang</option>
                            <option value="passed">Sudah Terlewat</option>
                        </select>
                    </div>

                </div>
                <div>
                    <button
                        onClick={() => {
                          downloadListSidang()
                        }}
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Download Report
                        <DocumentAddIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-2 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Nama
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            NIM
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Judul
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Penguji 1
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Penguji 2
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Catatan Penguji 1
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Catatan Penguji 2
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Tanggal Sidang
                                        </th>
                                        <th scope="col" className="relative px-2 py-3 text-gray-500">
                                            <span className="">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {dataSidang.map((person: any) => (
                                        <tr key={person.id}>
                                            <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-700 max-w-20 truncate " title={person.mahasiswa.nama}>{person.mahasiswa.nama}</td>
                                            <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-700 max-w-8 truncate" title={person.mahasiswa.nim}>{person.mahasiswa.nim}</td>
                                            <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-700 max-w-20 truncate" title={person.mahasiswa.email}>{person.mahasiswa.email}</td>
                                            <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-700 max-w-20 truncate" title={person?.skripsi?.judul}>{person?.skripsi?.judul}</td>
                                            <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-700 max-w-14 truncate" title={person.status}>
                                                <button
                                                    type="button"
                                                    className={classNames(person?.status === 'finished' ? 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500' : person?.status === 'ongoing' ? 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' : 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500', 'inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 ')}
                                                >
                                                    {person?.status?.toUpperCase()}
                                                </button>
                                            </td>
                                            <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-700 max-w-20 truncate" title={person?.penguji1?.nama}>{person?.penguji1?.nama}</td>
                                            <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-700 max-w-20 truncate" title={person?.penguji2?.nama}>{person?.penguji2?.nama}</td>
                                            <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-700 max-w-16 truncate" title={person.catatan_penguji1}>
                                                <div>
                                                    {person.catatan_penguji1}
                                                </div>
                                            </td>
                                            <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-700 max-w-16 truncate" title={person.catatan_penguji2}>{person.catatan_penguji2}</td>
                                            <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-700 max-w-16 truncate" title={person.tanggal_sidang}>  {new Date(person?.tanggal_sidang).toLocaleString('id-ID', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            })}</td>
                                            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-center">
                                                <Button className="text-indigo-600 hover:text-indigo-900" onClick={() => {
                                                    setDetailData(person)
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



const ModalEdit = ({ state, setState }: any) => {
    const { data } = authStore();
    return (
        <>
            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        ID Skripsi
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={(e: any) => setState((prev: any) => ({
                                ...prev,
                                idSkripsi: e.target.value,
                            }))}
                            value={state.id}
                            disabled
                            readOnly
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Catatan
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={(e: any) => {

                                if (data?.id === state?.pembimbing1?.id) {
                                    setState((prev: any) => ({
                                        ...prev,
                                        catatan_penguji1: e.target.value,
                                    }))
                                } else {
                                    setState((prev: any) => ({
                                        ...prev,
                                        catatan_penguji2: e.target.value,
                                    }))

                                }


                            }

                            }
                            value={data?.id === state?.pembimbing1?.id ? state.catatan_penguji1 : state.catatan_penguji2}
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
                                        restore: e.target.checked,
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