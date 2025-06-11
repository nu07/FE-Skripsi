import { NewsData } from "@/types/news";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import QuillEditor from "@/components/quillEditor/newsEditor"

interface modalCreateNews {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    data?: NewsData | null;
    setData?: any;
    submitData: () => void | Promise<void>;
}

export default function ModalCreateNews({ isOpen, setIsOpen, data, setData, submitData }: modalCreateNews) {
   console.log(data)
    return (
        <>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 flex items-center justify-center p-0 bg-gray-900 bg-opacity-50 min-h-screen">
                    <DialogPanel className="w-full max-w-5xl space-y-4 border bg-white p-2 rounded-lg">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <DialogTitle className="font-bold text-lg">
                                <div className="px-4 py-5 sm:px-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                       {data?.id  ? 'Edit' : 'Tambah'  } Data Berita
                                    </h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        Detail Tentang Berita
                                    </p>
                                </div>
                            </DialogTitle>
                            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                <dl className="sm:divide-y sm:divide-gray-200">
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Judul Berita
                                        </dt>
                                        <dd className="mt-1 sm:mt-0 sm:col-span-2">
                                            <input
                                                type="text"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-400 rounded-md"
                                                placeholder="Isi Judul Berita"
                                                onChange={(e: any) => setData((prev: NewsData) => ({
                                                    ...prev,
                                                    title: e.target.value,
                                                }))}
                                               value={data?.title || ""}
                                            />
                                        </dd>
                                    </div>

                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 min-h-96">
                                        <p className="text-center w-full col-span-3">Isi Berita</p>
                                        <div className=" w-full col-span-3">
                                            <QuillEditor
                                            content={data?.content ?? ""}
                                                setContent={(val: string) => setData((prev: NewsData) => ({
                                                    ...prev,
                                                    content: val,
                                                }))}
                                                readOnly={false}
                                            />
                                        </div>
                                        <div>

                                        </div>
                                    </div>

                                </dl>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse mr-4">
                            {submitData ? ( <button
                                type="button"
                                className="mx-2 mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                onClick={() => submitData()}
                            >
                                Submit
                            </button>) : ('')}
                            
                           
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                onClick={() => setIsOpen(false)}
                            >
                                Batal
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
