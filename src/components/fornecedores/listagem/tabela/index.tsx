import { Fornecedor } from 'app/models/fornecedores';
import { useState } from 'react';

interface TabelaFornecedorProps {
  fornecedores: Array<Fornecedor>;
  onEdit: (fornecedor: Fornecedor) => void;
  onDelete: (fornecedor: Fornecedor) => void;
}

export const TabelaFornecedores: React.FC<TabelaFornecedorProps> = ({ fornecedores, onDelete, onEdit }) => {
  return (
    <table className="table is-hoverable">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>CNPJ</th>
          <th>CPF</th>
          <th>Email</th>
          <th>RG</th>
          <th>Data de Nascimento</th>
        </tr>
      </thead>
      <tbody>
        {fornecedores.length > 0 ? (
          fornecedores.map((fornecedor) => (
            <FornecedorRow key={fornecedor.id} fornecedor={fornecedor} onDelete={onDelete} onEdit={onEdit} />
          ))
        ) : (
          <tr>
            <td colSpan={5}>Nenhum fornecedor encontrado ...</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

interface FornecedorRowProps {
  fornecedor: Fornecedor;
  onEdit: (fornecedor: Fornecedor) => void;
  onDelete: (fornecedor: Fornecedor) => void;
}

const FornecedorRow: React.FC<FornecedorRowProps> = ({ fornecedor, onEdit, onDelete }) => {
  const [deletando, setDeletando] = useState<boolean>(false);

  const onDeleteClick = (fornecedor: Fornecedor) => {
    if (deletando) {
      onDelete(fornecedor);
      setDeletando(false);
    } else {
      setDeletando(true);
    }
  };

  const cancelaDelete = () => setDeletando(false);

  return (
    <tr>
      <td>{fornecedor.id}</td>
      <td>{fornecedor.nomeFornecedor}</td>
      <td>{fornecedor.cnpj}</td>
      <td>{fornecedor.cpf}</td>
      <td>{fornecedor.email}</td>
      <td>
        {!deletando && (
          <button onClick={(e) => onEdit(fornecedor)} className="button is-success is-rounded is-small">
            Editar
          </button>
        )}

        <button onClick={(e) => onDeleteClick(fornecedor)} className="button is-danger is-rounded is-small">
          {deletando ? 'Confirma?' : 'Deletar'}
        </button>

        {deletando && (
          <button onClick={cancelaDelete} className="button is-rounded is-small">
            Cancelar
          </button>
        )}
      </td>
    </tr>
  );
};