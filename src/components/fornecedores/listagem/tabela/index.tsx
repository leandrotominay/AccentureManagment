import { Fornecedor } from 'app/models/fornecedores'
interface TabelaFornecedorProps {
    fornecedores: Array<Fornecedor>;
    onEdit: (empresa) => void;
    onDelete: (empresa) => void;
}

export const TabelaFornecedores: React.FC<TabelaFornecedorProps> = ({
    fornecedores,
    onDelete,
    onEdit
}) => {
    return (
        <table className="table is-hoverable">
            <thead>
                <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>CEP</th>
                </tr>
            </thead>
            <tbody>
                {fornecedores ? (
                    fornecedores.map(fornecedor => <FornecedorRow key={fornecedor.id} fornecedor={fornecedor} />)
                ) : (
                    <tr>
                        <td colSpan="...">Nenhuma empresa encontrada</td>
                    </tr>
                )}
            </tbody>

        </table>
    )
}

interface FornecedorRowProps {
    fornecedor: Fornecedor;
    onEdit: (fornecedor) => void;
    onDelete: (fornecedor) => void;
}
const FornecedorRow: React.FC<FornecedorRowProps> = ({
    fornecedor,
    onDelete,
    onEdit
}) => {
    return (
        <tr>
            <td>{fornecedor.id}</td>
            <td>{fornecedor.nomeFornecedor}</td>
            <td>{fornecedor.cpf}</td>
            <td>{fornecedor.cnpj}</td>
            <td>
                <button onClick={e => onEdit(fornecedor)} className="button is-success is-rounded is-small">Editar</button>
                <button onClick={e => onDelete(fornecedor)} className="button is-danger is-rounded is-small">Excluir</button>

            </td>
        </tr>
    )
}