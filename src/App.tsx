import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Studies from "./pages/Studies";
import Addresses from "./pages/Addresses";
import AdminUsers from "./pages/AdminUsers";
import Protected from "./components/Protected";
import Layout from "./components/Layout";



export default function App(){
  return (
    
        <Layout>
        <Routes>
          <Route path="/" element={<Protected><Dashboard/></Protected>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/studies" element={<Protected><Studies/></Protected>} />
          <Route path="/addresses" element={<Protected><Addresses/></Protected>} />
          <Route path="/admin/users" element={<Protected role="Admin"><AdminUsers/></Protected>} />
        </Routes>
        </Layout>
    
  );
}
