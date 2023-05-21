import { useState } from 'react'
import { Layout, Input } from 'components'
import { useFornecedorService } from 'app/services'
import { Fornecedor } from 'app/models/fornecedores'
import { Alert } from 'components/common/message'
import * as yup from 'yup'


const validationSchema = yup.object().shape({
    nomeFornecedor: yup.string().trim().required("Campo obrigatório"),
    cpf: yup.string().trim().required("Campo obrigatório"),
    cnpj: yup.string().trim().required("Campo obrigatório"),
    email: yup.string().trim().required("Campo obrigatório")
})

export const CadastroFornecedores: React.FC = () => {
    const service = useFornecedorService();
    const [nomeFornecedor, setNomeFornecedor] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [cnpj, setCnpj] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [id, setId] = useState<number>();
    const [messages, setMessages] = useState<Array<Alert>>([]);

    const submit = () => {
        const fornecedor: Fornecedor = {
            id,
            nomeFornecedor,
            cnpj,
            cpf,
            email

        }

        validationSchema.validate(fornecedor).then(obj => {
            if (id) {
                service
                    .atualizar(fornecedor)
                    .then(response => setMessages([{
                        tipo: "success", texto: "Fornecedor atualizado com sucesso!"
                    }]))
            } else {

                service
                    .salvar(fornecedor)
                    .then(fornecedorResposta => {
                        setId(fornecedorResposta.id)
                        setMessages([{
                            tipo: "success", texto: "Fornecedor salvo com sucesso!"
                        }])
                    })
            }

        }).catch(err => {
            const field = err.path;
            const message = err.message;
            setMessages([
                { tipo: "danger", field, texto: message }
            ])
        })

    }

    return (
        <Layout titulo="Fornecedores" mensagens={messages}>
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
            
            <Input label="CPF: "
                onChange={setCpf}
                value={cpf}
                id="inputCpf"
                placeholder="Digite o CPF do Fornecedor"
            />
            <Input label="Email: "
                onChange={setEmail}
                value={email}
                id="inputEmail"
                placeholder="Digite o E-mail do Fornecedor"
            />

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

