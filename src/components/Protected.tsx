import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react"; // 👈 Import de solo tipo

type Props = { children: ReactNode; role?: "Admin" | "User" };

export default function Protected({ children, role }: Props) {
  const { me, loading } = useAuth();
  
  if (loading) return <div className="p-6">Cargando…</div>;
  if (!me) return <Navigate to="/login" replace />;
  if (role && me.role !== role) return <Navigate to="/" replace />;
  
  return <>{children}</>;
}
