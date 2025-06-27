import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
// import Transactions from "./pages/Branch/Branch";
// import Transactions from "./pages/Transactions/Transactions";
import Inventories from "./pages/Inventories/Inventories";
import Branch from "./pages/Branch/Branch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Admin />} />
          {/* <Route path="transactions" element={<Transactions />} /> */}
          <Route path="admin" element={<Admin />} />
          <Route path="inventories" element={<Inventories />} />
          <Route path="branch" element={<Branch />} />
          {/* <Route path="service" element={<Service />} />
          <Route path="inventories" element={<Inventories />
          <Route path="settings" element={<Settings />} /> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
