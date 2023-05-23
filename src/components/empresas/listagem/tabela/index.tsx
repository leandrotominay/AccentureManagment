import { Empresa } from 'app/models/empresas'
import { useState } from 'react'

interface TabelaEmpresaProps {
  empresas: Array<Empresa>;
  onEdit: (empresa: Empresa) => void;
  onDelete: (empresa: Empresa) => void;
}

export const TabelaEmpresas: React.FC<TabelaEmpresaProps> = ({
  empresas,
  onDelete,
  onEdit
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState<Empresa | null>(null);

  const openDialog = (empresa: Empresa) => {
    setIsDialogOpen(true);
    setEmpresaSelecionada(empresa);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEmpresaSelecionada(null);
  };

  return (
    <div>
      <table className="table is-hoverable">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>CEP</th>
            <th>CNPJ</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {empresas.length > 0 ? (
            empresas.map((empresa) => (
              <EmpresaRow
                key={empresa.id}
                empresa={empresa}
                onDelete={onDelete}
                onEdit={onEdit}
                onDialogOpen={openDialog}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5}>Nenhuma empresa encontrada ...</td>
            </tr>
          )}
        </tbody>
      </table>

      {isDialogOpen && empresaSelecionada && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box">
            <header className="modal-card-head">
              <button className="delete" onClick={closeDialog}></button>
            </header>
              <table className="table is-bordered is-striped">
                <tbody>
                  <tr>
                    <td><strong></strong></td>
                    <td><strong>Empresa</strong></td>
                  </tr>
                  <tr>
                    <td>Nome:</td>
                    <td>{empresaSelecionada.nomeFantasia}</td>
                  </tr>
                  {/* Adicione mais linhas da tabela com outras informações */}
                </tbody>
              </table>
              <button className="button" onClick={closeDialog}>
                Fechar
              </button>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={closeDialog}
          ></button>
        </div>
      )}
    </div>
  );
};

interface EmpresaRowProps {
  empresa: Empresa;
  onEdit: (empresa: Empresa) => void;
  onDelete: (empresa: Empresa) => void;
  onDialogOpen: (empresa: Empresa) => void;
}

const EmpresaRow: React.FC<EmpresaRowProps> = ({
  empresa,
  onDelete,
  onEdit,
  onDialogOpen
}) => {
  const [deletando, setDeletando] = useState<boolean>(false);

  const onDeleteClick = (empresa: Empresa) => {
    if (deletando) {
      onDelete(empresa);
      setDeletando(false);
    } else {
      setDeletando(true);
    }
  };

  const cancelaDelete = () => setDeletando(false);

  return (
    <tr>
      <td>{empresa.id}</td>
      <td>{empresa.nomeFantasia}</td>
      <td>{empresa.cnpj}</td>
      <td>{empresa.cep}</td>
      <td>
        {!deletando && (
          <button
            onClick={() => onEdit(empresa)}
            className="button is-success is-rounded is-small"
          >
            Editar
          </button>
        )}

        <button
          onClick={() => onDeleteClick(empresa)}
          className="button is-danger is-rounded is-small"
        >
          {deletando ? "Confirma?" : "Deletar"}
        </button>

        {deletando && (
          <button
            onClick={cancelaDelete}
            className="button is-rounded is-small"
          >
            Cancelar
          </button>
        )}
        {!deletando && (
        <button
          onClick={() => onDialogOpen(empresa)}
          className="button is-rounded is-small"
        >
          Fornecedores
        </button>
        )}
      </td>
    </tr>
  );
};
