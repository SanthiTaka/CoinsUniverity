import { useEffect, useState } from "react";
import { AlunoApi, Aluno } from "../services/api";
import AlunoForm from "../components/AlunoForm";

export default function Alunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [editing, setEditing] = useState<Aluno | null>(null);

  async function load() { setAlunos(await AlunoApi.list()); }
  useEffect(() => { load(); }, []);

  async function save(a: Aluno) {
    if (a.id) await AlunoApi.update(a.id, a);
    else await AlunoApi.create(a);
    setEditing(null);
    load();
  }

  async function remove(id: number) {
    await AlunoApi.remove(id);
    load();
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h2>Alunos</h2>
      <button onClick={() => setEditing({} as any)}>+ Novo</button>
      {editing && <AlunoForm initial={editing} onSubmit={save} />}
      <table border={1} cellPadding={6}>
        <thead><tr><th>ID</th><th>Nome</th><th>Email</th><th>Curso</th><th>Ações</th></tr></thead>
        <tbody>
        {alunos.map(a=>(
          <tr key={a.id}>
            <td>{a.id}</td><td>{a.nome}</td><td>{a.email}</td><td>{a.curso}</td>
            <td>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={()=>setEditing(a)}>Editar</button>
                <button onClick={()=>remove(a.id!)}>Excluir</button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
