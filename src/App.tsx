import "./index.css";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Articles from "./Pages/Articles";
import NewArticles from "./Pages/NewArticles";
import Queries from "./Pages/Queries";
import Appointments from "./Pages/Appointments";
import NoPage from "./Pages/NoPages";
import Account from "./Pages/Account";
import Settings from "./Pages/Settings";
import Help from "./Pages/Help";
import NewCard from "./Pages/NewCard";
import ExpertCard from "./Pages/ExpertCard";
import PrivateRoute from "./Pages/PrivateRoute";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      const token =
        localStorage.getItem("token") ||
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];
      if (!token) {
        window.location.href = "/login";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route
          index
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="articles"
          element={
            <PrivateRoute>
              <Articles />
            </PrivateRoute>
          }
        />
        <Route
          path="expertCard"
          element={
            <PrivateRoute>
              <ExpertCard />
            </PrivateRoute>
          }
        />
        <Route
          path="newArticles/:id?"
          element={
            <PrivateRoute>
              <NewArticles />
            </PrivateRoute>
          }
        />
        <Route
          path="newCard"
          element={
            <PrivateRoute>
              <NewCard />
            </PrivateRoute>
          }
        />
        <Route
          path="queries"
          element={
            <PrivateRoute>
              <Queries />
            </PrivateRoute>
          }
        />
        <Route
          path="appointments"
          element={
            <PrivateRoute>
              <Appointments />
            </PrivateRoute>
          }
        />
        <Route
          path="account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />
        <Route
          path="settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="help"
          element={
            <PrivateRoute>
              <Help />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
