import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  // Navigate,
} from "react-router-dom";
import "@/App.css";
import DefaultTemplate from "@/layout/DefaultTemplate";
import Index from "@/pages/index";
import About from "@/pages/about";
import Login from "@/pages/login";
import News from "@/pages/news";
import NewsDetail from "@/pages/newsDetail";
import ProtectedRoute from "./layout/protectedPages";
import Dashboard from '@/pages/admin/dashboard';
import NewsAdmin from "@/pages/admin/news";
// import authStore from "@/store/loginStore";
import { ToastContainer } from "react-toastify";
import authStore from "./store/loginStore";

const App: React.FC = () => {
    const { isLogin } = authStore();
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
            isLogin  ? <Navigate to="/dashboard"/> : 
            (
            <DefaultTemplate>
              <Login />
            </DefaultTemplate>)
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard/>
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
      </Routes>
    </Router>
  );
};

export default App;
