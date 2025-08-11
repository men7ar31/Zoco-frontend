import { useEffect, useState } from "react";
import { api } from "../api";
import type { UserList } from "../types";
import PageHeader from "../components/PageHeader";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Card, CardTitle } from "../components/ui/Card";

export default function AdminUsers(){
  const [list,setList]=useState<UserList[]>([]);
  const [email,setEmail]=useState(""); 
  const [password,setPassword]=useState(""); 
  const [role,setRole]=useState<"Admin"|"User">("User");

  async function load(){ const {data}=await api.get<UserList[]>("/users"); setList(data); }
  useEffect(()=>{ load(); },[]);

  async function add(){
    if(!email || !password) return;
    await api.post("/users",{ email, password, role });
    setEmail(""); setPassword(""); setRole("User");
    load();
  }
  async function del(id:number){
    if(!confirm("¿Eliminar usuario?")) return;
    await api.delete(`/users/${id}`); load();
  }

  return (
    <>
      <PageHeader title="Users" />
      <div className="grid gap-6">
        {/* Form */}
        <Card>
          <CardTitle>Crear usuario</CardTitle>
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_160px_140px]">
            <Input label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <Input label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            <label className="grid gap-1 text-sm">
              <span className="text-zinc-700">Role</span>
              <select
                value={role}
                onChange={e=>setRole(e.target.value as any)}
                className="glass-input"
              >
                <option>User</option>
                <option>Admin</option>
              </select>
            </label>
            <div className="flex items-end">
              <Button onClick={add} className="w-full">Agregar</Button>
            </div>
          </div>
        </Card>

        {/* Listados */}
        <Card>
          <CardTitle>Listado</CardTitle>

          {/* Mobile: cards */}
          <div className="md:hidden grid gap-3">
            {list.map(u=>(
              <div key={u.id} className="glass p-4 rounded-2xl">
                <div className="text-sm text-zinc-600">Email</div>
                <div className="font-medium truncate">{u.email}</div>

                <div className="mt-2 text-sm text-zinc-600">Role</div>
                <div className="font-medium">{u.role}</div>

                <div className="mt-3 flex justify-end">
                  <Button variant="danger" onClick={()=>del(u.id)}>Eliminar</Button>
                </div>
              </div>
            ))}
            {list.length===0 && <p className="text-sm text-zinc-600">No hay usuarios.</p>}
          </div>

          {/* Desktop: tabla */}
          <div className="hidden md:block">
            <div className="overflow-x-auto rounded-xl ring-1 ring-white/40">
              <table className="min-w-[640px] w-full border-collapse text-sm">
                <thead className="bg-white/50">
                  <tr>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/40">
                  {list.map(u=>(
                    <tr key={u.id}>
                      <td className="px-4 py-3 max-w-[420px]">
                        <span className="block truncate">{u.email}</span>
                      </td>
                      <td className="px-4 py-3">{u.role}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="danger" onClick={()=>del(u.id)}>Eliminar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {list.length===0 && <p className="mt-3 text-sm text-zinc-600">No hay usuarios.</p>}
          </div>
        </Card>
      </div>
    </>
  );
}
