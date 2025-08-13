// src/App.tsx / App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Studies from "./pages/Studies";
import Addresses from "./pages/Addresses";
import AdminUsers from "./pages/AdminUsers";
import Protected from "./components/Protected";
import Layout from "./components/Layout";
import Forbidden from "./pages/Forbidden";
import SessionLogs from "./pages/SessionLogs"; // <-- si vas a crearla

export default function App(){
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/forbidden" element={<Forbidden/>} />

        <Route path="/" element={<Protected><Dashboard/></Protected>} />
        <Route path="/studies" element={<Protected><Studies/></Protected>} />
        <Route path="/addresses" element={<Protected><Addresses/></Protected>} />

        <Route path="/admin/users" element={<Protected role="Admin"><AdminUsers/></Protected>} />
        <Route path="/admin/session-logs" element={<Protected role="Admin"><SessionLogs/></Protected>} />
      </Routes>
    </Layout>
  );
}
