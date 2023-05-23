import { Fornecedor } from 'app/models/fornecedores';
import { useState } from 'react';
import './TabelaFornecedores.css';

interface TabelaFornecedorProps {
  fornecedores: Array<Fornecedor>;
  onEdit: (fornecedor: Fornecedor) => void;
  onDelete: (fornecedor: Fornecedor) => void;
}

export const TabelaFornecedores: React.FC<TabelaFornecedorProps> = ({
  fornecedores,
  onDelete,
  onEdit,
}) => {
  const [deletandoId, setDeletandoId] = useState<number | null>(null);
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState<Fornecedor | null>(null);

  const onDeleteClick = (fornecedor: Fornecedor) => {
    if (deletandoId === fornecedor.id) {
      onDelete(fornecedor);
      setDeletandoId(null);
    } else {
      setDeletandoId(fornecedor.id);
    }
  };

  const cancelaDelete = () => setDeletandoId(null);

  const abrirPopUp = (fornecedor: Fornecedor) => {
    setFornecedorSelecionado(fornecedor);
    setMostrarPopUp(true);
  };

  const fecharPopUp = () => {
    setMostrarPopUp(false);
    setFornecedorSelecionado(null);
  };

  return (
    <>
      <table className="table is-hoverable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>CPF</th>
            <th>Email</th>
            <th>RG</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.length > 0 ? (
            fornecedores.map((fornecedor) => {
              const nome = fornecedor.nomeFornecedor || ' ';
              const cpf = fornecedor.cpf || ' ';
              const rg = fornecedor.rg || ' ';
              const data_Nascimento = fornecedor.data_Nascimento || ' ';

              const isDeletando = deletandoId === fornecedor.id;

              return (
                <tr key={fornecedor.id}>
                  <td>{fornecedor.id}</td>
                  <td>{nome}</td>
                  <td>{fornecedor.cnpj}</td>
                  <td>{cpf}</td>
                  <td>{fornecedor.email}</td>
                  <td>{fornecedor.rg}</td>
                  <td>{fornecedor.data_Nascimento}</td>
                  <td>
                    {!isDeletando && (
                      <>
                        <button
                          style={{
                            padding: 5,
                            lineHeight: 0,
                          }}
                          id="popupEmp"
                          onClick={() => abrirPopUp(fornecedor)}
                          className="button is-rounded is-small"
                        >
                          Empresas
                        </button>
                        <br />
                      </>
                    )}
                    {!isDeletando && (
                      <button
                        style={{
                          display: 'block',
                          padding: 14,
                          lineHeight: 0,
                        }}
                        onClick={() => onEdit(fornecedor)}
                        className="button is-success is-rounded is-small"
                      >
                        Editar
                      </button>
                    )}
                    <button
                      style={{
                        display: 'block',
                        padding: 10,
                        lineHeight: 0,
                      }}
                      onClick={() => onDeleteClick(fornecedor)}
                      className="button is-danger is-rounded is-small"
                    >
                      {isDeletando ? 'Confirma?' : 'Deletar'}
                    </button>
                    {isDeletando && (
                      <button
                        style={{
                          display: 'block',
                          padding: 10,
                          lineHeight: 0,
                        }}
                        onClick={cancelaDelete}
                        className="button is-rounded is-small"
                      >
                        Cancelar
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8}>Nenhum fornecedor encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Caixa de diálogo */}
      {fornecedorSelecionado && (
        <div className={`modal ${mostrarPopUp ? 'is-active' : ''}`}>
          <div className="modal-background" onClick={fecharPopUp}></div>
          <div className="modal-card">
            <header className="modal-card-head">

              <button className="delete" onClick={fecharPopUp}></button>
            </header>
            <section className="modal-card-body">
              <table className="table is-fullwidth">
                <tbody>
                  <tr>
                    <td><strong>Nome:</strong></td>
                    <td>{fornecedorSelecionado.nomeFornecedor}</td>
                  </tr>
                  {/* Adicione mais linhas para outros campos */}
                </tbody>
              </table>
            </section>
            <footer className="modal-card-foot">
              <button className="button" onClick={fecharPopUp}>Fechar</button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};
