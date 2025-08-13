// src/components/Protected.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
  children: React.ReactNode;
  role?: "Admin" | "User";
};

export default function Protected({ children, role }: Props) {
  const { me, loading } = useAuth();

  if (loading) return null; // o un spinner

  const token = sessionStorage.getItem("token");
  if (!token || !me) return <Navigate to="/login" replace />;

  if (role && me.role !== role) return <Navigate to="/forbidden" replace />;

  return <>{children}</>;
}
