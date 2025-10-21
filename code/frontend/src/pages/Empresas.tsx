import { useEffect, useState } from "react";
import { Empresa, EmpresaApi } from "../services/api";
import EmpresaForm from "../components/EmpresaForm";

export default function Empresas() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [editing, setEditing] = useState<Empresa | null>(null);

  async function load() { setEmpresas(await EmpresaApi.list()); }
  useEffect(() => { load(); }, []);

  async function save(e: Empresa) {
    if (e.id) await EmpresaApi.update(e.id, e);
    else await EmpresaApi.create(e);
    setEditing(null); load();
  }

  async function remove(id: number) {
    await EmpresaApi.remove(id); load();
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h2>Empresas Parceiras</h2>
      <button onClick={() => setEditing({} as any)}>+ Nova</button>
      {editing && <EmpresaForm initial={editing} onSubmit={save} />}
      <table border={1} cellPadding={6}>
        <thead><tr><th>ID</th><th>Nome</th><th>Email</th><th>CNPJ</th><th>Ações</th></tr></thead>
        <tbody>
        {empresas.map(e=>(
          <tr key={e.id}>
            <td>{e.id}</td><td>{e.nome}</td><td>{e.email}</td><td>{e.cnpj}</td>
            <td>
              <button onClick={()=>setEditing(e)}>Editar</button>
              <button onClick={()=>remove(e.id!)}>Excluir</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
