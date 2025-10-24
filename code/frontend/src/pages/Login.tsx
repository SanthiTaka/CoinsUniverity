import { FormEvent, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@demo.com");
  const [senha, setSenha] = useState("admin");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await login(email, senha);
      nav("/alunos");
    } catch (e: any) {
      setErr(e.message);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 360 }}>
      <h2>Login</h2>
      <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
      <button type="submit">Entrar</button>
      {err && <small style={{ color: "crimson" }}>{err}</small>}
    </form>
  );
}
