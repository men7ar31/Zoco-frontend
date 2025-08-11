import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";
import type { Me } from "../types";

type AuthState = { me: Me | null; loading: boolean; login: (e:string,p:string)=>Promise<boolean>; logout:()=>void; };
const Ctx = createContext<AuthState>({me:null,loading:true,login:async()=>false,logout:()=>{}});
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [me, setMe] = useState<Me|null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchMe() {
    try { const {data} = await api.get<Me>("/me"); setMe(data); }
    catch { setMe(null); }
    finally { setLoading(false); }
  }
  useEffect(() => { const t=sessionStorage.getItem("token"); if(t) fetchMe(); else setLoading(false); }, []);

  const login = async (email:string, password:string) => {
    try {
      const { data } = await api.post<{token:string}>("/auth/login",{email,password});
      sessionStorage.setItem("token", data.token);
      await fetchMe();
      return true;
    } catch { return false; }
  };

  const logout = async () => {
    try { await api.post("/auth/logout"); } catch {}
    sessionStorage.removeItem("token");
    setMe(null);
  };

  return <Ctx.Provider value={{me,loading,login,logout}}>{children}</Ctx.Provider>;
}
