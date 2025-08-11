import { useEffect, useState } from "react";
import { api } from "../api";
import type { UserList } from "../types";

type Props = {
  value: number | null;
  onChange: (id: number | null) => void;
};

export default function AdminUserPicker({ value, onChange }: Props) {
  const [users, setUsers] = useState<UserList[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get<UserList[]>("/users");
        if (alive) setUsers(data);
      } finally {
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <label className="grid gap-1 text-sm">
      <span className="text-zinc-700">Ver datos de</span>
      <select
        className="glass-input"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
        disabled={loading}
      >
        <option value="">(Todos / Yo)</option>
        {users.map(u => (
          <option key={u.id} value={u.id}>{u.email}</option>
        ))}
      </select>
    </label>
  );
}
