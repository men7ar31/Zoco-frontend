import type { ReactNode } from "react";
export function Card({ children }: { children: ReactNode }) {
  return <div className="glass p-5">{children}</div>;
}
export function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="glass-card-title mb-3">{children}</h3>;
}
