import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import authStore from "@/store/loginStore";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
interface NavbarProps {
  customContent: React.ReactNode;
}

export default function Navbar({ customContent }: NavbarProps) {
  const location = useLocation();
  let navigate = useNavigate();
  const { data } = authStore();
  const { reset } = authStore();

  const navigationAdmin = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon},
    { name: "News", href: "/admin-news", icon: NewspaperIcon },
    { name: "Data Dosen", href: "/data-dosen", icon: UserIcon },
    { name: "Data Mahasiswa", href: "/data-mahasiswa", icon: UserAddIcon },
    { name: "Data Admin", href: "/data-admin", icon: UserCircleIcon },
    { name: "Data Pembayaran Skripsi", href: "/data-pembayaran-skripsi", icon: CurrencyDollarIcon },
    { name: "Data Sidang", href: "/data-sidang", icon: BriefcaseIcon  },
  ];

  const navigationDosen =  [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon},
    // { name: "News", href: "/admin-news", icon: NewspaperIcon },
    { name: "List Mahasiswa Bimbingan", href: "/dosen/mahasiswa-bimbingan", icon: NewspaperIcon },
    { name: "List Sidang", href: "/dosen/mahasiswa-sidang", icon: NewspaperIcon },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation, _setNavigation] = useState<any>(data?.role === 'admin' ? navigationAdmin : navigationDosen)

  const handleLogout = () => {
    reset();
    navigate("/login");
  };



  // useEffect(() => {
  //   if (data?.role === 'admin') {
  //     setNavigation(navigationAdmin)
  //   }else if(data?.role === 'dosen'){
  //     setNavigation(navigationDosen)
  //   }
  // }, [data?.role])

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-purple-400 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gradient-to-b from-purple-800  to-purple-500">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="./images/logo.png"
                      alt="Univ Pakuan"
                    />
                    <h1 className="pl-2 text-white">Universitas Pakuan</h1>
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item :any) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={classNames(
                          item.href === location.pathname
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-100 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.href === location.pathname
                              ? "text-gray-500"
                              : "text-gray-100 group-hover:text-gray-500",
                            "mr-4 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                  <a href="#" className="flex-shrink-0 group block">
                    <div className="flex items-center">
                      <div>
                        <img
                          className="inline-block h-10 w-10 rounded-full"
                          src="./images/logo.png"
                          alt=""
                        />
                      </div>
                      <div className="ml-3" onClick={handleLogout}>
                        <p className="text-base font-medium text-gray-100 group-hover:text-gray-900">
                          {data?.nama}
                        </p>
                        <p className="text-sm font-medium text-gray-100 group-hover:text-gray-700">
                          Logout Sementara
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 text-white">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 border-r border-orange-200 bg-purple-500">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto bg-gradient-to-b from-purple-800  to-purple-500">
              <div className="flex items-center flex-shrink-0 px-4 ">
                <img
                  className="h-8 w-auto"
                  src="./images/logo.png"
                  alt="Univ Pakuan"
                />
                <h1 className="pl-2">Universitas Pakuan</h1>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1 bg-gradient-to-b from-purple-800  to-purple-500">
                {navigation.map((item : any) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.href === location.pathname
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-100 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.href === location.pathname
                          ? "text-gray-500"
                          : "text-gray-100 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <a href="#" className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src="./images/logo.png"
                      alt=""
                    />
                  </div>
                  <div className="ml-3" onClick={handleLogout}>
                    <p className="text-sm font-medium text-gray-100 group-hover:text-gray-900">
                      {data?.nama}
                    </p>
                    <p className="text-xs font-medium text-gray-100 group-hover:text-gray-700">
                      Logout Sementara
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="p-4">
              {/* <div className=""></div> */}
              {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8"> */}
              {/* Replace with your content */}
              {/* <div className="py-4">
                  <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
                </div> */}

              {customContent}
              {/* /End replace */}
              {/* </div> */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
