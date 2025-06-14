import { useState } from "react";
import Axios from "@/API/axios";
import authStore from "@/store/loginStore";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { LockClosedIcon } from "@heroicons/react/solid";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { setIsLogin, setData, setToken } = authStore();
  const [formLogin, setFormLogin] = useState<LoginForm>({
    email: "wisnu@gmail.com",
    password: "admin123",
  });

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await Axios.post("/auth/login", formLogin);
      setData(res.data.data);
      setToken(res.data.token);
      setIsLogin(true);
      localStorage.setItem("jwttoken", res.data.token);
      toast.success("Login Berhasil!", { theme: "colored", transition: Bounce });
      navigate(res.data.data.role === "mahasiswa" ? "/" : "/dashboard");
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Login Gagal!", { theme: "colored", transition: Bounce });
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="./images/logo.png" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form onSubmit={handleSubmitLogin} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                value={formLogin.email}
                onChange={(e) => setFormLogin({ ...formLogin, email: e.target.value })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formLogin.password}
                onChange={(e) => setFormLogin({ ...formLogin, password: e.target.value })}
            <div>
              <label htmlFor="email" className="sr-only">
                email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                value={formLogin.email}
                onChange={(e) =>
                  setFormLogin({
                    ...formLogin,
                    email: e.target.value,
                  })
                }
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formLogin.password}
                onChange={(e) =>
                  setFormLogin({
                    ...formLogin,
                    password: e.target.value,
                  })
                }
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
