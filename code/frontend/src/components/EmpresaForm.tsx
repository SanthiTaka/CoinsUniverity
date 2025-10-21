import { FormEvent, useState } from "react";
import { Empresa } from "../services/api";

export default function EmpresaForm({ initial, onSubmit }: {
  initial?: Partial<Empresa>, onSubmit: (e: Empresa) => void
}) {
  const [e, setE] = useState<Empresa>({
    id: initial?.id,
    nome: initial?.nome || "",
    email: initial?.email || "",
    cnpj: initial?.cnpj || "",
    descricao: initial?.descricao || ""
  });

  function handle(ev: FormEvent) {
    ev.preventDefault();
    onSubmit(e);
  }

  return (
    <form onSubmit={handle} style={{ display: "grid", gap: 8 }}>
      <input placeholder="Nome" value={e.nome} onChange={ev=>setE({...e, nome:ev.target.value})}/>
      <input placeholder="Email" value={e.email} onChange={ev=>setE({...e, email:ev.target.value})}/>
      <input placeholder="CNPJ" value={e.cnpj} onChange={ev=>setE({...e, cnpj:ev.target.value})}/>
      <textarea placeholder="Descrição" value={e.descricao} onChange={ev=>setE({...e, descricao:ev.target.value})}/>
      <button>Salvar</button>
    </form>
  );
}
