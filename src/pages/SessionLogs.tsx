// src/pages/SessionLogs.tsx
import { useEffect, useState } from "react";
import { api } from "../api";

type Log = {
  id: number;
  userId: number;
  fechaInicio: string;
  fechaFin?: string;
  user?: { email: string };
};

export default function SessionLogs() {
  const [rows, setRows] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Log[]>("/sessionlogs")
      .then(r => setRows(r.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Session Logs</h1>
      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Usuario</th>
              <th className="p-3">Inicio</th>
              <th className="p-3">Fin</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-t border-white/40">
                <td className="p-3">{r.id}</td>
                <td className="p-3">{r.user?.email ?? r.userId}</td>
                <td className="p-3">{new Date(r.fechaInicio).toLocaleString()}</td>
                <td className="p-3">{r.fechaFin ? new Date(r.fechaFin).toLocaleString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
