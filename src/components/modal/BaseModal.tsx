import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { classNames } from "@/utils/classNames";
interface ModalEditProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
  content: any;
  submitData: () => void | Promise<void>;
  mode: string
  width? : string
}

export default function EditData({
  isOpen = false, setIsOpen, title, content, submitData, mode, width
}: ModalEditProps) {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
        
      >
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50">
          {/* <DialogPanel   className=" w-full max-w-2xl space-y-4 border bg-white p-8 rounded-lg"> */}
          <DialogPanel
          
        className={classNames(width ? 
        width : 
        'max-w-2xl',
         'w-full space-y-4 border bg-white p-8 rounded-lg ')}
          >
            <DialogTitle className="font-bold text-lg">{title ?? 'Data'}</DialogTitle>
            {content}

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className={classNames(
                  mode === 'edit' ? "bg-green-500 hover:bg-green-700 text-gray-100 focus:ring-green-700 " :
                 mode === 'create' ? 'bg-blue-500 hover:bg-blue-700 text-white focus:ring-blue-700' :
                  "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500", 
                  "w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 border border-gray-300  text-base font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm")}
                onClick={submitData}
              >
                {mode === 'edit' ? "Edit" : mode === 'create' ? "Create" : 'Delete'}
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
