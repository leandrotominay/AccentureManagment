import { Empresa } from 'app/models/empresas'
interface TabelaEmpresaProps {
    empresas: Array<Empresa>;
}

export const TabelaEmpresas: React.FC<TabelaEmpresaProps> = ({
    empresas
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
                {empresas ? (
                    empresas.map(empresa => <EmpresaRow key={empresa.id} empresa={empresa} />)
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
    empresa: Empresa
}
const EmpresaRow: React.FC<EmpresaRowProps> = ({
    empresa
}) => {
    return (
        <tr>
            <td>{empresa.id}</td>
            <td>{empresa.nomeFantasia}</td>
            <td>{empresa.cnpj}</td>
            <td>{empresa.cep}</td>
            <td>
                <button className="button is-success">Editar</button>
                <button className="button is-danger">Editar</button>

            </td>
        </tr>
    )
}