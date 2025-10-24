import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Alunos from "./pages/Alunos";
import Empresas from "./pages/Empresas";
import { useAuth } from "./auth/AuthContext";

function Private({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/alunos" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/alunos" element={<Private><Alunos /></Private>} />
      <Route path="/empresas" element={<Private><Empresas /></Private>} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}
