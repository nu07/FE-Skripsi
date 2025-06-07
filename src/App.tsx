import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import "@/App.css";
import DefaultTemplate from "@/layout/DefaultTemplate";
import ProtectedRoute from "./layout/protectedPages";
import Index from "@/pages/index";
import About from "@/pages/about";
import Login from "@/pages/login";
// import authStore from "@/store/loginStore";

const App: React.FC = () => {
  // const { isLogin } = authStore();
  return (
    <Router>
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
          path="/login"
          element={
            <DefaultTemplate>
              <Login />
            </DefaultTemplate>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <h1>test</h1>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
