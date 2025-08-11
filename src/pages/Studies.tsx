import { useEffect, useState } from "react";
import { api } from "../api";
import type { Study } from "../types";
import PageHeader from "../components/PageHeader";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Card, CardTitle } from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";
import AdminUserPicker from "../components/AdminUserPicker";

export default function Studies(){
  const { me } = useAuth();
  const isAdmin = me?.role === "Admin";

  const [list,setList]=useState<Study[]>([]);
  const [title,setTitle]=useState(""); 
  const [institution,setInstitution]=useState(""); 
  const [completedAt,setCompletedAt]=useState<string>("");

  const [editingId, setEditingId] = useState<number|null>(null);
  const [eTitle,setETitle]=useState(""); 
  const [eInstitution,setEInstitution]=useState(""); 
  const [eCompletedAt,setECompletedAt]=useState<string>("");
  const [saving, setSaving] = useState(false);

  const [scopeUserId, setScopeUserId] = useState<number|null>(null);

  async function load(){
    const params = isAdmin ? { params: scopeUserId ? { userId: scopeUserId } : {} } : undefined;
    const {data}=await api.get<Study[]>("/studies", params);
    setList(data);
  }
  useEffect(()=>{ load(); /* eslint-disable-next-line */ },[scopeUserId]);

  async function add(){
    if(!title.trim()) return;
    const payload:any = { title, institution, completedAt: completedAt || null };
    const cfg = isAdmin && scopeUserId ? { params: { userId: scopeUserId } } : undefined;
    await api.post("/studies", payload, cfg);
    setTitle(""); setInstitution(""); setCompletedAt("");
    load();
  }

  function startEdit(s: Study){
    setEditingId(s.id);
    setETitle(s.title ?? ""); 
    setEInstitution(s.institution ?? ""); 
    setECompletedAt(s.completedAt ? s.completedAt.substring(0,10) : "");
  }
  function cancelEdit(){ setEditingId(null); setSaving(false); }
  async function saveEdit(){
    if(editingId==null || !eTitle.trim()) return;
    setSaving(true);
    try{
      const payload:any = { title: eTitle, institution: eInstitution, completedAt: eCompletedAt || null };
      await api.put(`/studies/${editingId}`, payload);
      setEditingId(null);
      load();
    } finally { setSaving(false); }
  }
  async function del(id:number){
    if(!confirm("¿Eliminar estudio?")) return;
    await api.delete(`/studies/${id}`); load();
  }

  return (
    <>
      <PageHeader title="Studies" />

      <div className="grid gap-6">
        {isAdmin && (
          <Card>
            <CardTitle>Alcance (Admin)</CardTitle>
            <div className="grid gap-4 md:grid-cols-[320px]">
              <AdminUserPicker value={scopeUserId} onChange={setScopeUserId} />
            </div>
          </Card>
        )}

        <Card>
          <CardTitle>Nuevo estudio</CardTitle>
          <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr_140px]">
            <Input label="Title" value={title} onChange={e=>setTitle(e.target.value)} />
            <Input label="Institution" value={institution} onChange={e=>setInstitution(e.target.value)} />
            <label className="grid gap-1 text-sm">
              <span className="text-zinc-700">Completed at</span>
              <input type="date" className="glass-input" value={completedAt} onChange={e=>setCompletedAt(e.target.value)} />
            </label>
            <div className="flex items-end"><Button className="w-full" onClick={add}>Agregar</Button></div>
          </div>
        </Card>

        <Card>
          <CardTitle>{isAdmin ? "Estudios (según alcance)" : "Mis estudios"}</CardTitle>
          {list.length===0 ? (
            <p className="text-sm text-zinc-600">No hay estudios.</p>
          ) : (
            <ul className="divide-y divide-white/40">
              {list.map(s=>(
                <li key={s.id} className="py-4">
                  {editingId === s.id ? (
                    <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr_auto_auto] md:items-end">
                      <Input label="Title" value={eTitle} onChange={e=>setETitle(e.target.value)} />
                      <Input label="Institution" value={eInstitution} onChange={e=>setEInstitution(e.target.value)} />
                      <label className="grid gap-1 text-sm">
                        <span className="text-zinc-700">Completed at</span>
                        <input type="date" className="glass-input" value={eCompletedAt} onChange={e=>setECompletedAt(e.target.value)} />
                      </label>
                      <Button onClick={saveEdit} disabled={saving}>{saving ? "Guardando..." : "Guardar"}</Button>
                      <Button variant="ghost" onClick={cancelEdit}>Cancelar</Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="font-medium text-zinc-900">{s.title}</div>
                        <div className="text-sm text-zinc-600">
                          {[s.institution, s.completedAt?.substring(0,10)].filter(Boolean).join(" · ") || "—"}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" onClick={()=>startEdit(s)}>Editar</Button>
                        <Button variant="danger" onClick={()=>del(s.id)}>Eliminar</Button>
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
