import type { InputHTMLAttributes, ReactNode } from "react";
type Props = InputHTMLAttributes<HTMLInputElement> & { label?: ReactNode; hint?: ReactNode };

export default function Input({ label, hint, className="", ...rest }: Props){
  return (
    <label className="grid gap-1 text-sm">
      {label && <span className="text-zinc-700">{label}</span>}
      <input {...rest} className={`glass-input ${className}`} />
      {hint && <span className="text-xs text-zinc-600">{hint}</span>}
    </label>
  );
}
