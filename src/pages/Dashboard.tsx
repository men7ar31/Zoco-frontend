import { useAuth } from "../context/AuthContext";

export default function Dashboard(){
  const { me } = useAuth();
  return (
    <div className="glass p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
      <p>Bienvenido {me?.email} — Rol: {me?.role}</p>
    </div>
  );
}
