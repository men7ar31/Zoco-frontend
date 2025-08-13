import { useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const nav = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-xl text-sm font-medium transition
   ${isActive ? "bg-white/60 text-zinc-900" : "text-zinc-700 hover:bg-white/50 hover:text-zinc-900"}`;

export default function Layout({ children }: { children: ReactNode }) {
  const { me, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const NavLinks = () => (
    <>
      <NavLink to="/studies" className={nav} onClick={close}>Studies</NavLink>
      <NavLink to="/addresses" className={nav} onClick={close}>Addresses</NavLink>
      {me?.role === "Admin" && (
        <>
    <NavLink to="/admin/users" className={nav} onClick={close}>Users</NavLink>
    <NavLink to="/admin/session-logs" className={nav} onClick={close}>Session Logs</NavLink>
  </>
      )}
    </>
  );

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10">
        <div className="mt-[10px] mx-auto max-w-6xl px-4 py-4 glass">
          <div className="flex items-center gap-2">
            <NavLink to="/" className="mr-2 text-xl font-bold tracking-tight text-zinc-900">
              Zoco
            </NavLink>
            {me && (
              <nav className="hidden md:flex items-center gap-2">
                <NavLinks />
            </nav>
            )}
            <div className="ml-auto flex items-center gap-2">
              {me && (
                <span className="hidden sm:inline max-w-[220px] truncate text-sm text-zinc-700">
                  {me.email}
                </span>
              )}

              {/* Mobile menu button */}
              {me && (
                <button
                  className="md:hidden glass px-3 py-2"
                  aria-label="Toggle menu"
                  onClick={() => setOpen(v => !v)}
                >
                  <div className="h-0.5 w-5 bg-zinc-800 mb-1" />
                  <div className="h-0.5 w-5 bg-zinc-800 mb-1" />
                  <div className="h-0.5 w-5 bg-zinc-800" />
                </button>
              )}
              {me && (
                <button
                  onClick={() => { setOpen(false); logout(); }}
                  className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white px-4 py-2 text-sm shadow hover:opacity-90"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile dropdown */}
          {me && (
            <div
              className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300
                         ${open ? "max-h-48 opacity-100 mt-3" : "max-h-0 opacity-0"}`}
            >
              <div className="glass p-3 flex flex-col gap-2">
                <NavLinks />
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
