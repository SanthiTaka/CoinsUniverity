const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export async function api(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> ?? {})
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || res.statusText);
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

export const AuthApi = {
  login: (email: string, senha: string) =>
    api("/auth/login", { method: "POST", body: JSON.stringify({ email, senha }) }),
};

export type Aluno = {
  id?: number;
  nome: string;
  email: string;
  cpf: string;
  rg: string;
  endereco: string;
  instituicaoId: number;
  curso: string;
};

export type Empresa = {
  id?: number;
  nome: string;
  email: string;
  cnpj: string;
  descricao?: string;
};

export const AlunoApi = {
  list: () => api("/api/alunos"),
  create: (a: Aluno) => api("/api/alunos", { method: "POST", body: JSON.stringify(a) }),
  update: (id: number, a: Aluno) => api(`/api/alunos/${id}`, { method: "PUT", body: JSON.stringify(a) }),
  remove: (id: number) => api(`/api/alunos/${id}`, { method: "DELETE" })
};

export const EmpresaApi = {
  list: () => api("/api/empresas"),
  create: (e: Empresa) => api("/api/empresas", { method: "POST", body: JSON.stringify(e) }),
  update: (id: number, e: Empresa) => api(`/api/empresas/${id}`, { method: "PUT", body: JSON.stringify(e) }),
  remove: (id: number) => api(`/api/empresas/${id}`, { method: "DELETE" })
};
