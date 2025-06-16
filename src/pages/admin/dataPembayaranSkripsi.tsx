import Axios from "@/API/axios";
import { Input } from "@/components/ui/input"
import { Button } from '@headlessui/react';
import BaseModal from "@/components/modal/BaseModal";
import DashboardPagination from '@/components/pagination/dashboardPagination';
import { Bounce, toast } from "react-toastify";
import { classNames } from "@/utils/classNames";

const defaultValue = {
    catatanPembayaran: "",
    status: "",
    idSkripsi: "",
    id_pembimbing1: "",
    id_pembimbing2: "",
    status_pembimbing1: "",
    status_pembimbing2: "",
}

export default function Example() {
    const [dataDosen, setDataDosen] = useState<any>([])
    const [isEditData, setIsEditData] = useState(false)
    const [pagination, setPagination] = useState({
        currentPages: 1,
        perPage: 10,
        totalPages: 1,
        totalItems: 1,
        isLoading: true,
        showDeleted: true,
        status: '',
    });
    const [detailData, setDatailData] = useState<any>(defaultValue)
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
    const [allDosen, setAllDosen] = useState([])

    const getAllDosen = async () => {
        try {
            const res = await Axios.get(`/skripsi?page=${pagination.currentPages}&limit=${pagination.perPage}&search=${searchQuery}&showDeleted=${pagination.showDeleted}&status=${pagination.status}`)
            setDataDosen(res.data.data)
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
            setAllDosen(res.data.data)
        } catch (e: any) {
            console.error(e)
        }
    }

    const SubmitEditData = async () => {
        try {
            await Axios.put(`/skripsi/${detailData?.id}`, { status: detailData.status, catatan: detailData.catatanPembayaran })
            await Axios.post('/set-pembimbing', {idSkripsi : detailData.id, idPembimbing1: detailData.id_pembimbing1,idPembimbing2: detailData.id_pembimbing2 })
            setIsEditData(false)
            toast.success("Data Pembayaran berhasil Di Edit!", {
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
            getAllDosen()
        } catch (e: any) {
            console.error(e)
            toast.error(e.response.data.message ?? "Data Pembayaran gagal Di Tambahkan!", {
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
        getAllDosen()
    }, [pagination.currentPages, debouncedSearch, pagination.showDeleted, pagination.status]);

    useEffect(() => {
        getAllDataDosen()
    }, [])


    return (
        <>
            <BaseModal
                isOpen={isEditData}
                setIsOpen={setIsEditData}
                title="Edit Data Pembayaran"
                mode="edit"
                submitData={SubmitEditData}
                content={<ModalEdit state={detailData} setState={setDatailData} allDosen={allDosen} />}
            />
            <div className="my-2 flex justify-between gap-x-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                    {/* Input Pencarian */}
                    <Input
                        type="text"
                        placeholder="Cari Mahasiswa"
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
                            <option value="sukses">Sukses</option>
                            <option value="pending">Pending</option>
                            <option value="gagal">Gagal</option>
                        </select>
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
                                            Nama Mahasiswa
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
                                            Judul
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Status Pembayaran
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Bukti Pembayaran
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Skripsi
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Pembimbing
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
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
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 w-24 truncate " title={person?.mahasiswa?.nama}>{person?.mahasiswa?.nama}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-36 truncate " title={person?.mahasiswa?.nim}>{person?.mahasiswa?.nim}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-24 truncate" title={person?.judul}>{person?.judul}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-14 truncate" title={person?.status}>
                                                <button
                                                    type="button"
                                                    className={classNames(person?.status === 'sukses' ? 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500' : person?.status === 'pending' ? 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' : 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500', 'inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 ')}
                                                >
                                                    {person?.status?.toUpperCase()}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-10 truncate" >
                                                <div className="flex-shrink-0">
                                                    <img className="h-12 w-12 rounded-full" src={import.meta.env.VITE_APP_URL + person.buktiPembayaran} alt="" />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-5 truncate" title={person.deletedAt}>
                                                <input
                                                    type="checkbox"
                                                    readOnly
                                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500 disabled:opacity-100 disabled:bg-white disabled:text-indigo-600 disabled:cursor-default"
                                                    checked={!!person.mahasiswa.isEligibleForSkripsi}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-40 truncate" title={person.deletedAt}>
                                                <div>Pembimbing 1: {person?.pembimbing1?.nama}</div>
                                                <div>Pembimbing 2: {person?.pembimbing2?.nama}</div>
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
                                                <Button className="text-indigo-600 hover:text-indigo-900" onClick={() => {
                                                    setDatailData(person)
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



const ModalEdit = ({ state, setState, allDosen }: any) => {
    return (
        <>
            <div className="space-y-3">

                <div>
                    <label className="block text-sm font-medium text-gray-700 text-center">
                        Bukti Pembayaran
                    </label>
                    <div className="flex-shrink-0 flex items-center justify-center">
                        <img className="max-h-36 max-w-40 rounded-full" src={import.meta.env.VITE_APP_URL + state.buktiPembayaran} alt="" />
                    </div>
                </div>
                <div>
                    <div className="mt-1">

                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Location
                            </label>
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
                                <option value="sukses">Sukses</option>
                                <option value="pending">Pending</option>
                                <option value="gagal">Gagal</option>
                            </select>
                        </div>

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
                            onChange={(e: any) => setState((prev: any) => ({
                                ...prev,
                                catatanPembayaran: e.target.value,
                            }))}
                            value={state.catatanPembayaran}
                        />
                    </div>
                </div>

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
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Nama Pembimbing 1
                    </label>
                    <div className="mt-1">
                        <select
                            id="id_pembimbing1"
                            name="id_pembimbing1"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border-2"
                            defaultValue=""
                            onChange={(e: any) => setState((prev: any) => ({
                                ...prev,
                                idPembimbing1: e.target.value,
                                id_pembimbing1: e.target.value,
                            }))}
                            value={state.id_pembimbing1}
                        >
                            {allDosen.map((data: any)=> (
                                <>
                                <option key={data.id} value={data.id}>{data.nama}</option>
                                </>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Nama Pembimbing 2
                    </label>
                    <div className="mt-1">
                        <select
                            id="id_pembimbing2"
                            name="id_pembimbing2"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border-2"
                            defaultValue=""
                            onChange={(e: any) => setState((prev: any) => ({
                                ...prev,
                                idPembimbing2: e.target.value,
                                id_pembimbing2: e.target.value,
                            }))}
                            value={state.id_pembimbing2}
                        >
                            {allDosen.map((data: any)=> (
                                <>
                                <option key={data.id} value={data.id}>{data.nama}</option>
                                </>
                            ))}
                        </select>
                    </div>
                </div>

            </div>
        </>

    )
}