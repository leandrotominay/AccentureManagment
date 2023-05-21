import { useState } from 'react'
import { Layout, Input } from 'components'
import { useEmpresaService } from 'app/services'
import { Empresa } from 'app/models/empresas'

export const CadastroEmpresas: React.FC = () => {
    const service = useEmpresaService();
    const [nomeFantasia, setNomeFantasia] = useState<string>('');
    const [cep, setCep] = useState<string>('');
    const [cnpj, setCnpj] = useState<string>('');
    const [id, setId] = useState<number>();
    const [data, setData] = useState(null);

    const submit = () => {
        const empresa: Empresa = {
            id,
            nomeFantasia,
            cnpj,
            cep    
  
        }

        if(id){
            service
                .atualizar(empresa)
                .then(response => console.log("atualizado!"))
        }else{
            
            service
                .salvar(empresa)
                .then(empresaResposta => {
                    setId(empresaResposta.id)
                })
        }

    }

    return (
        <Layout titulo="Empresaes">
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
                <Input label="Nome da Empresa: *" 
                       columnClasses="is-half" 
                       onChange={setNomeFantasia}
                       value={nomeFantasia}
                       id="inputNomeEmpresa"
                       placeholder="Digite o Nome da Empresa" 
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
           <Input label="CEP: "
                    onChange={setCep}
                    value={cep}
                    id="inputCep"
                    placeholder="Digite o CEP da Empresa"
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

