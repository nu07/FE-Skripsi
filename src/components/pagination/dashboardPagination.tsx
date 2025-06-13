function dashboardPagination({ pagination, setPagination }: any) {
  return (
    <div>
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            disabled={pagination.currentPages === 1}
            onClick={() => {
              setPagination((prev: any) => ({
                ...prev,
                currentPages: prev.currentPages - 1,
              }));
            }}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            disabled={pagination.currentPages === pagination.totalPages}
            onClick={() => {
              setPagination((prev: any) => ({
                ...prev,
                currentPages: prev.currentPages + 1,
              }));
            }}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              {/* Showing <span className="font-medium">{pagination.perPage}</span>{" "}
              to <span className="font-medium">{pagination.totalItems}</span> of{" "} */}
              <span className="font-medium">{pagination.totalItems}</span>{" "}
              Hasil
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                disabled={pagination.currentPages === 1}
                onClick={() => {
                  setPagination((prev: any) => ({
                    ...prev,
                    currentPages: prev.currentPages - 1,
                  }));
                }}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setPagination((prev: any) => ({
                      ...prev,
                      currentPages: page,
                    }));
                  }}
                  className={`${
                    page === pagination.currentPages
                      ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                  } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                >
                      {page} {" "}
                </button>
              ))}

              <button
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                disabled={pagination.currentPages === pagination.totalPages}
                onClick={() => {
                  setPagination((prev: any) => ({
                    ...prev,
                    currentPages: prev.currentPages + 1,
                  }));
                }}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default dashboardPagination;
