import React, { createContext, useContext, useState } from "react";
import { AuthApi } from "../services/api";

type AuthCtx = {
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  async function login(email: string, senha: string) {
    const data = await AuthApi.login(email, senha);
    localStorage.setItem("token", data.token);
    setToken(data.token);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return <Ctx.Provider value={{ token, login, logout }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
