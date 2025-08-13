// src/pages/Forbidden.tsx
export default function Forbidden() {
  return (
    <div className="max-w-lg mx-auto mt-16 text-center glass p-8 rounded-2xl">
      <h1 className="text-2xl font-semibold mb-2">403 • Acceso prohibido</h1>
      <p className="text-sm text-zinc-600">
        No tenés permisos para ver esta pantalla.
      </p>
    </div>
  );
}
