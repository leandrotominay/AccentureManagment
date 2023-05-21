import { useState } from 'react'
import { Layout, Input } from 'components'
import { useFornecedorService } from 'app/services'
import { Fornecedor } from 'app/models/fornecedores'

export const CadastroFornecedores: React.FC = () => {
    const service = useFornecedorService();
    const [nomeFornecedor, setNomeFornecedor] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [cnpj, setCnpj] = useState<string>('');
    const [id, setId] = useState<number>();

    const submit = () => {
        const fornecedor: Fornecedor = {
            id,
            nomeFornecedor,
            cnpj,
            cpf
            
        }

        if(id){
            service
                .atualizar(fornecedor)
                .then(response => console.log("atualizado!"))
        }else{
            
            service
                .salvar(fornecedor)
                .then(fornecedorResposta => {
                    setId(fornecedorResposta.id)
                })
        }

    }

    return (
        <Layout titulo="Fornecedores">
            {id &&
                <div className="columns">
                    <Input label="Código:" 
                        columnClasses="is-half" 
                        value={id}
                        id="inputId"
                        disabled={true}
                        />

                </div>
            }

            <div className="columns">
                <Input label="Nome do Fornecedor: *" 
                       columnClasses="is-half" 
                       onChange={setNomeFornecedor}
                       value={nomeFornecedor}
                       id="inputNomeFornecedor"
                       placeholder="Digite o Nome do Fornecedor" 
                       />

                <Input label="CNPJ: " 
                       columnClasses="is-half" 
                       onChange={setCnpj}
                       value={cnpj}
                       id="inputCnpj"
                       placeholder="Digite o CNPJ da Empresa" 
                       maxLength={18}
                       />
           </div>
           <hr></hr>
           <Input label="CPF: "
                    onChange={setCpf}
                    value={cpf}
                    id="inputCpf"
                    placeholder="Digite o CPF do Fornecedor"
                />
                
            <br/>
           <div className="field is-grouped">
                <div className="control is-link">
                    <button onClick={submit} className="button">
                        { id ? "Atualizar" : "Salvar" }                        
                    </button>
                </div>
                <div className="control">
                    <button className="button">Voltar</button>
                </div>
           </div>

        </Layout>
    )
}

