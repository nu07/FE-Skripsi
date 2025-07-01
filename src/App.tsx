import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "@/App.css";
import DefaultTemplate from "@/layout/DefaultTemplate";
import Index from "@/pages/index";
import About from "@/pages/about";
import Login from "@/pages/login";
import News from "@/pages/news";
import NewsDetail from "@/pages/newsDetail";
import ProtectedRoute from "./layout/protectedPages";
import Dashboard from "@/pages/admin/dashboard";
import NewsAdmin from "@/pages/admin/news";
import DataDosen from "@/pages/admin/dataDosen";
import DataMahasiswa from "@/pages/admin/dataMahasiswa"
import DataAdmin from "@/pages/admin/dataAdmin"
import DataPembayaranSkripsi from "@/pages/admin/dataPembayaranSkripsi"
import DataSidang from "@/pages/admin/dataSidang"
import Skripsi from "@/pages/mahasiswa/skripsi";
import ListMahasiswaBimbingan from "@/pages/dosen/listBimbingan"
import ListMahasiswaSidang from "@/pages/dosen/listSidang"
// import authStore from "@/store/loginStore";
import { ToastContainer } from "react-toastify";
import authStore from "./store/loginStore";

const App: React.FC = () => {
  const { isLogin, data } = authStore();
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <DefaultTemplate>
              <Index />
            </DefaultTemplate>
          }
        />
        <Route
          path="/about"
          element={
            <DefaultTemplate>
              <About />
            </DefaultTemplate>
          }
        />
        <Route
          path="/news"
          element={
            <DefaultTemplate>
              <News />
            </DefaultTemplate>
          }
        />
        <Route
          path="/news/:slug"
          element={
            <DefaultTemplate>
              <NewsDetail />
            </DefaultTemplate>
          }
        />
        <Route
          path="/login"
          element={
            isLogin ? (
              data?.role === "mahasiswa" ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <DefaultTemplate>
                <Login />
              </DefaultTemplate>
            )
          }
        />
        <Route
          path="/skripsi"
          element={
            isLogin ? (
              <DefaultTemplate>
                <Skripsi />
              </DefaultTemplate>
            ) :
              (
                <Navigate to="/login" />
              )
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-news"
          element={
            <ProtectedRoute>
              <NewsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-dosen"
          element={
            <ProtectedRoute>
              <DataDosen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-mahasiswa"
          element={
            <ProtectedRoute>
              <DataMahasiswa />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-admin"
          element={
            <ProtectedRoute>
              <DataAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-pembayaran-skripsi"
          element={
            <ProtectedRoute>
              <DataPembayaranSkripsi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-sidang"
          element={
            <ProtectedRoute>
              <DataSidang />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dosen/mahasiswa-bimbingan"
          element={
            <ProtectedRoute>
              <ListMahasiswaBimbingan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dosen/mahasiswa-sidang"
          element={
            <ProtectedRoute>
              <ListMahasiswaSidang />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
