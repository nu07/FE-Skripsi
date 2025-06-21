import authStore from "@/store/loginStore";
import { Fragment } from "react";
import { Link } from "react-router-dom";

function NavbarHome() {
  const { isLogin, reset } = authStore();
  const [isOpenNav, setIsOpenNav] = useState(false);

  const solutions = [
    ...(isLogin
      ? [
          {
            name: "Skripsi",
            description: "Skripsi",
            href: "/skripsi",
            icon: AcademicCapIcon,
          },
        ]
      : [
          {
            name: "Home",
            description: "Home",
            href: "/",
            icon: UsersIcon,
          },
          {
            name: "News",
            description: "News",
            href: "/news",
            icon: CashIcon,
          },
          {
            name: "About",
            description: "About",
            href: "/about",
            icon: UserGroupIcon,
          },
        ]),
  ];

  return (
    <div className="sticky top-0 z-50 bg-white shadow">
      <header>
        <Popover className="relative bg-white">
          <div className="flex items-center justify-between px-4 py-6 mx-auto max-w-7xl sm:px-6 md:justify-start md:space-x-10 lg:px-8">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to="/" className="flex items-center gap-3">
                <img className="w-auto h-8 sm:h-10" src="/images/logo.png" alt="" />
                <div className="flex flex-col text-sm font-semibold text-gray-900">
                  <span className="text-xl font-medium text-purple-500 uppercase">universitas pakuan</span>
                  <span className="text-xs font-medium text-green-500 capitalize">unggul, mandiri & berkarakter</span>
                </div>
              </Link>
            </div>
            <div className="hidden space-x-10 md:flex">
              {solutions.map(data => (
                <Link
                  key={data.href}
                  to={data.href}
                  className="text-base font-medium text-gray-500 transition-colors duration-300 hover:text-gray-900 active:text-purple-600">
                  {data.name}
                </Link>
              ))}
            </div>

            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button
                onClick={(): void => setIsOpenNav(true)}
                className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="w-6 h-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
              {isLogin ? (
                <div className="flex space-x-2">
                  <button
                    onClick={(): void => reset()}
                    className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white border border-transparent rounded-md shadow-sm whitespace-nowrap bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border transition-transform duration-300 hover:from-purple-700 hover:to-indigo-700 active:scale-95">
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white border border-transparent rounded-md shadow-sm whitespace-nowrap bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border transition-transform duration-300 hover:from-purple-700 hover:to-indigo-700 active:scale-95">
                  Login
                </Link>
              )}
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            show={isOpenNav}>
            <Popover.Panel focus className="absolute inset-x-0 top-0 z-30 p-2 transition origin-top-right transform md:hidden">
              <div className="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50">
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <img className="w-auto h-8" src="/images/logo.png" alt="Workflow" />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button
                        onClick={() => setIsOpenNav(false)}
                        className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="w-6 h-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid grid-cols-1 gap-7">
                      {solutions.map(item => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center p-3 -m-3 rounded-lg hover:bg-gray-50"
                          onClick={(): void => setIsOpenNav(false)}>
                          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-md bg-gradient-to-r from-purple-600 to-indigo-600">
                            <item.icon className="w-6 h-6" aria-hidden="true" />
                          </div>
                          <div className="ml-4 text-base font-medium text-gray-900">{item.name}</div>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className="px-5 py-6">
                  <div className="mt-6" onClick={() => setIsOpenNav(false)}>
                    {isLogin ? (
                      <Link
                        href="/"
                        onClick={(): void => reset()}
                        className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border hover:from-purple-700 hover:to-indigo-700">
                        Logout
                      </Link>
                    ) : (
                      <Link
                        to="/login"
                        className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border hover:from-purple-700 hover:to-indigo-700">
                        Sign in
                      </Link>
                    )}

                    {/* <p className="mt-6 text-base font-medium text-center text-gray-500">
                      Existing customer?
                      <a href="#" className="text-gray-900">
                        Sign in
                      </a>
                    </p> */}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </header>
    </div>
  );
}

export default NavbarHome;
