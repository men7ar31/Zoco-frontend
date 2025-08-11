import type { ReactNode } from "react";
export default function PageHeader({ title, actions }: { title: ReactNode; actions?: ReactNode }){
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900">{title}</h2>
      {actions}
    </div>
  );
}
