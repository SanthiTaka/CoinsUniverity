import { FormEvent, useState } from "react";
import { Aluno } from "../services/api";

export default function AlunoForm({ initial, onSubmit }: {
  initial?: Partial<Aluno>, onSubmit: (a: Aluno) => void
}) {
  const [a, setA] = useState<Aluno>({
    id: initial?.id,
    nome: initial?.nome || "",
    email: initial?.email || "",
    cpf: initial?.cpf || "",
    rg: initial?.rg || "",
    endereco: initial?.endereco || "",
    instituicaoId: initial?.instituicaoId || 1,
    curso: initial?.curso || ""
  });

  function handle(e: FormEvent) {
    e.preventDefault();
    onSubmit(a);
  }

  return (
    <form onSubmit={handle} style={{ display: "grid", gap: 8 }}>
      <input placeholder="Nome" value={a.nome} onChange={e=>setA({...a, nome:e.target.value})}/>
      <input placeholder="Email" value={a.email} onChange={e=>setA({...a, email:e.target.value})}/>
      <input placeholder="CPF" value={a.cpf} onChange={e=>setA({...a, cpf:e.target.value})}/>
      <input placeholder="RG" value={a.rg} onChange={e=>setA({...a, rg:e.target.value})}/>
      <input placeholder="Endereço" value={a.endereco} onChange={e=>setA({...a, endereco:e.target.value})}/>
      <input placeholder="Curso" value={a.curso} onChange={e=>setA({...a, curso:e.target.value})}/>
      <input type="number" placeholder="Instituição ID" value={a.instituicaoId}
             onChange={e=>setA({...a, instituicaoId:Number(e.target.value)})}/>
      <button>Salvar</button>
    </form>
  );
}
