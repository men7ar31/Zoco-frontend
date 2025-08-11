export type Role = "Admin" | "User";

export interface Me { id: number; email: string; role: Role; }
export interface Study { id: number; title: string; institution?: string; completedAt?: string; userId: number; }
export interface Address { id: number; street: string; city?: string; country?: string; userId: number; }
export interface UserList { id: number; email: string; role: Role; }
