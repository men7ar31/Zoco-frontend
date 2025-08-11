import { useEffect, useState } from "react";
import { api } from "../api";
import type { Address } from "../types";
import PageHeader from "../components/PageHeader";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Card, CardTitle } from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";
import AdminUserPicker from "../components/AdminUserPicker";

export default function Addresses(){
  const { me } = useAuth();
  const isAdmin = me?.role === "Admin";

  const [list,setList]=useState<Address[]>([]);
  const [street,setStreet]=useState(""); 
  const [city,setCity]=useState(""); 
  const [country,setCountry]=useState("");

  // edición inline
  const [editingId, setEditingId] = useState<number|null>(null);
  const [eStreet, setEStreet] = useState(""); 
  const [eCity, setECity] = useState(""); 
  const [eCountry, setECountry] = useState("");
  const [saving, setSaving] = useState(false);

  // user scope (solo admin)
  const [scopeUserId, setScopeUserId] = useState<number|null>(null);

  async function load(){ 
    const params = isAdmin ? { params: scopeUserId ? { userId: scopeUserId } : {} } : undefined;
    const {data}=await api.get<Address[]>("/addresses", params);
    setList(data); 
  }
  useEffect(()=>{ load(); /* eslint-disable-next-line */ },[scopeUserId]);

  async function add(){
    if(!street.trim()) return;
    const cfg = isAdmin && scopeUserId ? { params: { userId: scopeUserId } } : undefined;
    await api.post("/addresses",{ street, city, country }, cfg);
    setStreet(""); setCity(""); setCountry("");
    load();
  }
  async function del(id:number){
    if(!confirm("¿Eliminar dirección?")) return;
    await api.delete(`/addresses/${id}`); 
    load();
  }

  function startEdit(a: Address){
    setEditingId(a.id);
    setEStreet(a.street ?? ""); setECity(a.city ?? ""); setECountry(a.country ?? "");
  }
  function cancelEdit(){ setEditingId(null); setSaving(false); }
  async function saveEdit(){
    if(editingId == null || !eStreet.trim()) return;
    setSaving(true);
    try{
      await api.put(`/addresses/${editingId}`, { street: eStreet, city: eCity, country: eCountry });
      setEditingId(null);
      load();
    } finally { setSaving(false); }
  }

  return (
    <>
      <PageHeader title="Addresses" />

      <div className="grid gap-6">
        {/* Scope admin */}
        {isAdmin && (
          <Card>
            <CardTitle>Alcance (Admin)</CardTitle>
            <div className="grid gap-4 md:grid-cols-[320px]">
              <AdminUserPicker value={scopeUserId} onChange={setScopeUserId} />
            </div>
          </Card>
        )}

        {/* Alta */}
        <Card>
          <CardTitle>Nueva dirección</CardTitle>
          <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr_140px]">
            <Input label="Street"  value={street}  onChange={e=>setStreet(e.target.value)} />
            <Input label="City"    value={city}    onChange={e=>setCity(e.target.value)} />
            <Input label="Country" value={country} onChange={e=>setCountry(e.target.value)} />
            <div className="flex items-end"><Button className="w-full" onClick={add}>Agregar</Button></div>
          </div>
        </Card>

        {/* Listado / edición inline */}
        <Card>
          <CardTitle>{isAdmin ? "Direcciones (según alcance)" : "Mis direcciones"}</CardTitle>
          {list.length===0 ? (
            <p className="text-sm text-zinc-600">No hay direcciones.</p>
          ) : (
            <ul className="divide-y divide-white/40">
              {list.map(a=>(
                <li key={a.id} className="py-4">
                  {editingId === a.id ? (
                    <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr_auto_auto] md:items-end">
                      <Input label="Street" value={eStreet} onChange={e=>setEStreet(e.target.value)} />
                      <Input label="City" value={eCity} onChange={e=>setECity(e.target.value)} />
                      <Input label="Country" value={eCountry} onChange={e=>setECountry(e.target.value)} />
                      <Button onClick={saveEdit} disabled={saving}>{saving ? "Guardando..." : "Guardar"}</Button>
                      <Button variant="ghost" onClick={cancelEdit}>Cancelar</Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="font-medium text-zinc-900">{a.street}</div>
                        <div className="text-sm text-zinc-600">{[a.city,a.country].filter(Boolean).join(" · ") || "—"}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" onClick={()=>startEdit(a)}>Editar</Button>
                        <Button variant="danger" onClick={()=>del(a.id)}>Eliminar</Button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
