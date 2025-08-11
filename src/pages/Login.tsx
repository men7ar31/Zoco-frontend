import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [err,setErr]=useState("");
  const { login } = useAuth(); const nav = useNavigate();

  const onSubmit = async (e:React.FormEvent) => {
    e.preventDefault(); setErr("");
    const ok = await login(email,password);
    if (ok) nav("/");
    else setErr("Credenciales inválidas");
  };

  return (
    <div className="max-w-sm mx-auto mt-16 glass shadow p-6 rounded-2xl">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <button className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white px-4 py-2 text-m shadow hover:opacity-90 w-full">Ingresar</button>
      </form>
    </div>
  );
}
