import { useState } from 'react'
import { Layout, Input, Message } from 'components'
import { useEmpresaService } from 'app/services'
import { Empresa } from 'app/models/empresas'
import { Alert } from 'components/common/message'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
    nomeFantasia: yup.string().trim().required("Campo Obrigatório"),
    cep: yup.string().trim().required("Campo Obrigatório").min(8, "O CEP deve possuir pelo menos 8 digítos.").max(11, "O CEP não pode exceder 11 digítos"),
    cnpj: yup.string().trim().required("Campo Obrigatório").min(10, "O CNPJ deve possuir pelo menos 10 digítos.").max(18, "O CNPJ não pode exceder 18 digitos"),
})

export const CadastroEmpresas: React.FC = () => {
    const service = useEmpresaService();
    const [nomeFantasia, setNomeFantasia] = useState<string>('');
    const [cep, setCep] = useState('');
    const [cnpj, setCnpj] = useState<string>('');
    const [id, setId] = useState<number>();
    const [data, setData] = useState(null);
    const [messages, setMessages] = useState<Array<Alert>>([]);



    const handleInputChange = async (e) => {
        const value = e.target.value;
        setCep(value);

        try {
            const response = await fetch(`http://cep.la/${value}`, {
                headers: { 'Accept': 'application/json' }
            });
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.log(error);
        }
    };

    const submit = () => {
        const empresa: Empresa = {
            id,
            nomeFantasia,
            cnpj,
            cep

        }

        validationSchema.validate(empresa).then(obj => {
            if (id) {
                service
                    .atualizar(empresa)
                    .then(response => setMessages([{
                        tipo: "success", texto: "Produto atualizado com sucesso!"
                    }]))
            } else {

                service
                    .salvar(empresa)
                    .then(empresaResposta => {
                        setId(empresaResposta.id)
                        setMessages([{
                            tipo: "success", texto: "Produto salvo com sucesso!"
                        }])
                    })
            }

        }).catch(err => {
            const field = err.path;
            const message = err.message;
            setMessages([
                {tipo: "danger", field, texto: message}
            ])
        })

    }

    return (
        <Layout titulo="Empresas" mensagens={messages}>

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
            <div className="field">
                <label className="label">CEP</label>
                <div className="control">
                    <input className="input" id="inputCEP" type="text" value={cep} onChange={event => setCep(event.target.value)} onInput={handleInputChange} placeholder="Digite o CEP" />
                </div>
            </div>
            {data && (
                <div>
                    <label className="label">Endereço</label>
                    <input type="text" className="input" value={data.logradouro} readOnly />
                    <label className="label">Bairro</label>
                    <input type="text" className="input" value={data.bairro} readOnly />
                    <label className="label">Cidade</label>
                    <input type="text" className="input" value={data.cidade} readOnly />
                    <label className="label">Estado</label>
                    <input type="text" className="input" value={data.uf} readOnly />
                </div>
            )}
            <br />
            <div className="field is-grouped">
                <div className="control is-link">
                    <button onClick={submit} className="button">
                        {id ? "Atualizar" : "Salvar"}
                    </button>
                </div>
                <div className="control">
                    <button className="button">Voltar</button>
                </div>
            </div>

        </Layout>
    )
}

