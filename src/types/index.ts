import type { ReactNode } from 'react';

export interface TeamMember {
    name: string;
    role: string;
    description: string;
    image: string;
    roleColor: string;
    email: string;
}
export interface Mission {
    icon: string;
    title: string;
    description: string;
    color: string;
}

export interface StatsValue {
    label: string;
    value: string | number;
    icon: ReactNode;
}

export interface User {
    username: string;
    mail: string;
    password: string;
    bio: string;
}

export interface AuthContextType {
  user: User | null;
}