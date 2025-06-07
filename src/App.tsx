import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import "@/App.css";
import DefaultTemplate from "@/layout/DefaultTemplate";
import Index from "@/pages/index";
import About from "@/pages/about";
import Login from "@/pages/login";
import News from "@/pages/news";
import NewsDetail from "./pages/newsDetail";
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
                      <DefaultTemplate>
                          <Login />
                      </DefaultTemplate>
                  }
              />
          </Routes>
      </Router>
  );
};

export default App;
