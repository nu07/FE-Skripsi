// import Axios from "@/API/axios";
import QuillEditor from "@/components/quillEditor/newsEditor";
import { NewsData } from "@/types/news";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface ModalEditProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data?: NewsData | null;
  setData?: any;
}

export default function ModalEdit({ isOpen, setIsOpen, data, setData }: ModalEditProps) {
  const [isLoading, _setIsLoading] = useState(false);
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex items-center justify-center p-0 bg-gray-900 bg-opacity-50">
          <DialogPanel className="w-full max-w-5xl space-y-4 border bg-white p-2 rounded-lg">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <DialogTitle className="font-bold text-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Detail Data Berita
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
                      Nama Pembuat
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data?.admin?.nama}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data?.admin?.email}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Admin Aktif?
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {!data?.admin?.deletedAt ? "Aktif" : "Tidak Aktif"}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Judul</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data?.title}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 min-h-96">
                                        <p className="text-center w-full col-span-3">Isi Berita</p>
                                        <div className=" w-full col-span-3">
                                         <QuillEditor
                                            content={data?.content || ""}
                                            setContent={(val: string) => setData((prev: NewsData) => ({
                                                ...prev,
                                                content: val,
                                            }))}
                                            />
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                </dl>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              {/* <button
                disabled={isLoading}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={deleteData}
              >
                {isLoading ? "Menghapus..." : "Hapus"}
              </button> */}
              <button
                disabled={isLoading}
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
