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
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<Dashboard />} />
        <Route path="articles" element={<Articles />} />
        <Route path="expertCard" element={<ExpertCard />} />
        <Route path="newArticles/:id?" element={<NewArticles />} />
        <Route path="newCard" element={<NewCard />} />
        <Route path="queries" element={<Queries />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="account" element={<Account />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
