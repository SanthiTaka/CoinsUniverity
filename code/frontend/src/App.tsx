import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import Router from "./router";

export default function App() {
  const { token, logout } = useAuth();
  const nav = useNavigate();

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24, fontFamily: "system-ui" }}>
      <header style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ marginRight: "auto" }}>Mérito Estudantil</h1>
        <Link to="/alunos">Alunos</Link>
        <Link to="/empresas">Empresas</Link>
        {!token ? (
          <button onClick={() => nav("/login")}>Login</button>
        ) : (
          <button onClick={logout}>Sair</button>
        )}
      </header>
      <Router />
      <Outlet />
    </div>
  );
}
