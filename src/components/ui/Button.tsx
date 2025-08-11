import type { ButtonHTMLAttributes, ReactNode } from "react";
type Variant = "primary" | "ghost" | "danger";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant; children: ReactNode;
};

export default function Button({ variant="primary", className="", children, ...rest }: Props){
  const base = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition shadow";
  const map: Record<Variant,string> = {
    primary: "bg-gradient-to-r from-indigo-500 to-cyan-400 text-white hover:opacity-90",
    ghost:   "glass hover:bg-white/50",
    danger:  "bg-red-500 text-white hover:bg-red-600"
  };
  return <button className={`${base} ${map[variant]} ${className}`} {...rest}>{children}</button>;
}
