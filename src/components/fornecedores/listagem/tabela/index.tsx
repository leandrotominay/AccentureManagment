import { Fornecedor } from 'app/models/fornecedores'
interface TabelaFornecedorProps {
    fornecedores: Array<Fornecedor>;
}

export const TabelaFornecedores: React.FC<TabelaFornecedorProps> = ({
    fornecedores
}) => {
    return (
        <table className="table is-hoverable">
            <thead>
                <th>Código</th>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>CEP</th>
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
    fornecedor: Fornecedor
}
const FornecedorRow: React.FC<FornecedorRowProps> = ({
    fornecedor
}) => {
    return (
        <tr>
            <td>{fornecedor.id}</td>
            <td>{fornecedor.nomeFornecedor}</td>
            <td>{fornecedor.cpf}</td>
            <td>{fornecedor.cnpj}</td>
            <td>
                <button className="button is-success">Editar</button>
                <button className="button is-danger">Editar</button>

            </td>
        </tr>
    )
}