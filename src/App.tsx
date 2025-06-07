import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import "@/App.css";
import DefaultTemplate from "@/layout/DefaultTemplate";
import Index from "@/pages/index";
import About from "./pages/about";
// import authStore from "@/store/loginStore";

const App: React.FC = () => {
  // const { isLogin } = authStore();
  return (
    <Router>
      <Routes>
        {/* <Route
          path="/login"
          element={isLogin ? <Navigate to="/" /> : <Login />}
        /> */}
        {/* <Route path="/register" element={<Register />} /> */}
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

        {/* <Route
          path="/history-booking"
          element={
            <ProtectedRoute>
              <HistoryBooking />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
