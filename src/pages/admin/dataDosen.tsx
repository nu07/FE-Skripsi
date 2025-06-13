import Axios from "@/API/axios";
import { Input } from "@/components/ui/input"
import { Button } from '@headlessui/react';

export default function Example() {
    const [dataDosen, setDataDosen] = useState<any>([])
        const [pagination, setPagination] = useState({
        currentPages: 1,
        perPage: 4,
        totalPages: 1,
        totalItems: 1,
        isLoading: true,
    });
        const [searchQuery, setSearchQuery] = useState("");
        const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
    const getAllDosen = async () => {
        try {
            const res = await Axios.get(`/dosen/dosen?page=${pagination.currentPages}&limit=${pagination.perPage}&search=${searchQuery}`)
            console.log(res.data.data)
            setDataDosen(res.data.data)
        } catch (e) {
            console.error(e)
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
    }, [pagination.currentPages, debouncedSearch]);

    return (
        <>

            <div className="my-2 flex justify-between gap-x-4">
                <div className="">
                    {/* <SearchIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" /> */}
                    <Input
                        type="text"
                        placeholder="Cari Dosen"
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                        className="py-3 pl-4 pr-4 text-lg text-gray-900 bg-white border-2 rounded-full"
                        onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                setDebouncedSearch(searchQuery); 
                                }
                            }}
                    />
                </div>
                <button
                    // onClick={() => setIsOpenCreateNews(true)}
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Tambah Dosen
                    <DocumentAddIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                </button>
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
                                            Id
                                        </th>
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
                                            NIDN
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Email
                                        </th>
                                        <th scope="col" className="relative px-6 py-3 text-gray-500">
                                            <span className="">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {dataDosen.map((person : any) => (
                                        <tr key={person.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 w-24 truncate " title={person.id}>{person.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 w-56 truncate " title={person.nama}>{person.nama}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 w-56 truncate" title={person.nidn}>{person.nidn}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 w-56 truncate" title={person.email}>{person.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                                                <Button className="text-indigo-600 hover:text-indigo-900">
                                                    Edit
                                                </Button>
                                                <Button className="text-indigo-600 hover:text-indigo-900 pl-4">
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
