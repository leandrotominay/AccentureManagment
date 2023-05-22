import { Empresa } from 'app/models/empresas'
import { useState } from 'react'
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
                <th>CEP</th>
                <th>CNPJ</th>
                </tr>
            </thead>
            <tbody>
            {empresas.length > 0 ? (
                    empresas.map(empresa => (
                        <EmpresaRow
                            key={empresa.id}
                            empresa={empresa}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan={5}>Nenhuma empresa encontrada ... </td>
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
    
    const [ deletando, setDeletando ] = useState<boolean>(false)

    const onDeleteClick = (empresa: Empresa) => {
        if(deletando){
            onDelete(empresa)
            setDeletando(false)
        }else{
            setDeletando(true)
        }
    }

    const cancelaDelete = () => setDeletando(false)


    return (
        <tr>
            <td>{empresa.id}</td>
            <td>{empresa.nomeFantasia}</td>
            <td>{empresa.cnpj}</td>
            <td>{empresa.cep}</td>
            <td>
            {!deletando &&
                <button onClick={e => onEdit(empresa)} 
                className="button is-success is-rounded is-small">
                    Editar
                    </button>
                
            }

            <button onClick={e => onDeleteClick(empresa)}
             className="button is-danger is-rounded is-small">
                { deletando ? "Confirma?" : "Deletar" }
                </button>
            
            { deletando &&
                    <button onClick={cancelaDelete} 
                        className="button is-rounded is-small">
                        Cancelar
                    </button>
                }

            </td>
        </tr>
    )
}