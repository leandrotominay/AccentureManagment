import { Empresa } from 'app/models/empresas'
interface TabelaEmpresaProps {
    empresas: Array<Empresa>;
    onEdit: (empresa) => void;
    onDelete: (empresa) => void;
}

export const TabelaEmpresas: React.FC<TabelaEmpresaProps> = ({
    empresas,
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
                {empresas ? (
                    empresas.map(empresa => <EmpresaRow onDelete={onDelete}
                         onEdit={onEdit} key={empresa.id} empresa={empresa} />)
                ) : (
                    <tr>
                        <td colSpan="...">Nenhuma empresa encontrada</td>
                    </tr>
                )}
            </tbody>

        </table>
    )
}

interface EmpresaRowProps {
    empresa: Empresa;
    onEdit: (empresa) => void;
    onDelete: (empresa) => void;
}
const EmpresaRow: React.FC<EmpresaRowProps> = ({
    empresa,
    onDelete,
    onEdit
}) => {
    return (
        <tr>
            <td>{empresa.id}</td>
            <td>{empresa.nomeFantasia}</td>
            <td>{empresa.cnpj}</td>
            <td>{empresa.cep}</td>
            <td>
                <button onClick={e => onEdit(empresa)} className="button is-success is-rounded is-small">Editar</button>
                <button onClick={e => onDelete(empresa)}className="button is-danger is-rounded is-small">Excluir</button>

            </td>
        </tr>
    )
}