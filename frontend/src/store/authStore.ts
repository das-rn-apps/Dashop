import { create } from "zustand";
import { request } from "../api/api";

type AuthState = {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  login: async (email, password) => {
    const data = await request("/auth/login", "POST", { email, password });
    set({ token: data.token });
  },
  register: async (name, email, password) => {
    await request("/auth/register", "POST", { name, email, password });
  },
  logout: () => set({ token: null }),
}));
