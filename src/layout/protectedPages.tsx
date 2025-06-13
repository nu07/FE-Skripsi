import { Navigate, useNavigate } from "react-router-dom";
import authStore from "@/store/loginStore";
import Sidebar from "@/components/navbar/SidebarAuth";
import { jwtDecode } from "jwt-decode";
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLogin, token, reset, loadingHydration, data } = authStore();
  let navigate = useNavigate();
  if (!loadingHydration && token) {
    const currentTime = Date.now() / 1000;
    const decoded: any = jwtDecode(token);
    if (decoded.exp < currentTime) {
      reset();
      navigate("/login");
    }
  }
    if (data?.role === 'mahasiswa') {
    return <Navigate to="/" />;
  }
  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Sidebar customContent={children} />
    </>
  );
};

export default ProtectedRoute;
