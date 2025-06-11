import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
interface ModalEditProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    title?: string;
    content?: string;
    submitData: () => void | Promise<void>;
}

export default function ModalDelete({
isOpen, setIsOpen, title, content, submitData 
}: ModalEditProps) {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50">
          <DialogPanel className="w-full max-w-2xl space-y-4 border bg-white p-8 rounded-lg">
            <DialogTitle className="font-bold text-lg">{title ?? 'Hapus Data'}</DialogTitle>
            <p className="text-gray-600">
              {content ?? 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan'}
            </p>

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={submitData}
              >
                Hapus
              </button>
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
