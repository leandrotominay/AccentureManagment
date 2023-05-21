import { useState } from 'react'
import { Layout, Input } from 'components'
import { useFornecedorService } from 'app/services'
import { Fornecedor } from 'app/models/fornecedores'
import { Alert } from 'components/common/message'
import * as yup from 'yup'
import Link from 'next/link'


const validationSchema = yup.object().shape({
    nomeFornecedor: yup.string().trim().required("Campo obrigatório"),
    cpf: yup.string().trim().required("Campo obrigatório").min(11, "O CEP deve possuir pelo menos 11 digítos.").max(14, "O CPF não pode exceder 14 digítos"),
    cnpj: yup.string().trim().required("Campo obrigatório").min(10, "O CNPJ deve possuir pelo menos 10 digítos.").max(18, "O CNPJ não pode exceder 18 digitos"),
    email: yup.string().trim().required("Campo obrigatório")
})

interface FormErros {
    nomeFornecedor?: string;
    cnpj?: string;
    cpf?: string;
    cep?: string;
    email?: string;
}

export const CadastroFornecedores: React.FC = () => {
    const service = useFornecedorService();
    const [nomeFornecedor, setNomeFornecedor] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [cnpj, setCnpj] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [id, setId] = useState<number>();
    const [messages, setMessages] = useState<Array<Alert>>([]);
    const [errors, setErrors] = useState<FormErros>({});

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
            setErrors({
                [field]: message
            })
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
                    error={errors.nomeFornecedor}
                />

                <Input label="CNPJ: "
                    columnClasses="is-half"
                    onChange={setCnpj}
                    value={cnpj}
                    id="inputCnpj"
                    placeholder="Digite o CNPJ da Empresa"
                    error={errors.cnpj}
                />
            </div>
            
            <Input label="CPF: "
                onChange={setCpf}
                value={cpf}
                id="inputCpf"
                placeholder="Digite o CPF do Fornecedor"
                error={errors.cpf}
            />
            <Input label="Email: "
                onChange={setEmail}
                value={email}
                id="inputEmail"
                placeholder="Digite o E-mail do Fornecedor"
                error={errors.email}
            />

            <br />
            <div className="field is-grouped">
                <div className="control is-link">
                    <button onClick={submit} className="button">
                        {id ? "Atualizar" : "Salvar"}
                    </button>
                </div>
                <div className="control">
                <Link href="/consultas/fornecedores">
                    <button className="button">Voltar</button>
                    </Link>
                </div>
            </div>

        </Layout>
    )
}

