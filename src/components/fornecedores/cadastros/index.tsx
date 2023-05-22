import { useState, useEffect } from 'react'
import { Layout, Input } from 'components'
import { useFornecedorService } from 'app/services'
import { Fornecedor } from 'app/models/fornecedores'
import { Alert } from 'components/common/message'
import * as yup from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/router'


const validationSchema = yup.object().shape({
    nomeFornecedor: yup.string().trim().required("Campo obrigatório"),
    cpf: yup.string().trim().nullable(),
    cnpj: yup.string().trim().nullable(),
    email: yup.string().trim().nullable(),
    rg: yup.string().trim().nullable(),
    dataNascimento: yup.string().trim().nullable()
})

interface FormErros {
    nomeFornecedor?: string;
    cnpj?: string;
    cpf?: string;
    cep?: string;
    email?: string;
    rg?: string;
    dataNascimento?: string;
}

export const CadastroFornecedores: React.FC = () => {
    const service = useFornecedorService();
    const [nomeFornecedor, setNomeFornecedor] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [cnpj, setCnpj] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [rg, setRg] = useState<string>('');
    const [dataNascimento, setDataNascimento] = useState<string>('');
    const [id, setId] = useState<number>();
    const [messages, setMessages] = useState<Array<Alert>>([]);
    const [errors, setErrors] = useState<FormErros>({});
    const router = useRouter()
    const { id: queryId } = router.query;

    useEffect(() => {
        if (queryId) {
            service.carregarFornecedor(queryId).then(fornecedorEncontrado => {
                if (fornecedorEncontrado.id !== undefined) {
                    setId(fornecedorEncontrado.id);
                }
                if (fornecedorEncontrado.nomeFornecedor !== undefined) {
                    setNomeFornecedor(fornecedorEncontrado.nomeFornecedor);
                }
                if (fornecedorEncontrado.cnpj !== undefined) {
                    setCnpj(fornecedorEncontrado.cnpj);
                }
                if (fornecedorEncontrado.cpf !== undefined) {
                    setCpf(fornecedorEncontrado.cpf);
                }
                if (fornecedorEncontrado.email !== undefined) {
                    setEmail(fornecedorEncontrado.email);
                }
                if (fornecedorEncontrado.rg !== undefined) {
                    setRg(fornecedorEncontrado.rg);
                }
                if (fornecedorEncontrado.dataNascimento !== undefined) {
                    setDataNascimento(fornecedorEncontrado.dataNascimento);
                }
            })
        }
    }, [queryId])

    const submit = () => {
        const fornecedor: Fornecedor = {
            id,
            nomeFornecedor,
            cnpj,
            cpf,
            email,
            rg,
            dataNascimento

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

            <div className="columns">
                <Input label="CPF: "
                    columnClasses="is-half"
                    onChange={setCpf}
                    value={cpf}
                    id="inputCpf"
                    placeholder="Digite o CPF do Fornecedor"
                    error={errors.cpf}
                />

                <Input label="Data de Nascimento: "
                    columnClasses="is-half"
                    onChange={setDataNascimento}
                    value={dataNascimento}
                    id="inputDataNascimento"
                    placeholder="xx/xx/xxxx"
                    error={errors.dataNascimento}
                />

            </div>

            <div className="columns">
                <Input label="RG: "
                    columnClasses="is-half"
                    onChange={setRg}
                    value={rg}
                    id="inputRg"
                    placeholder="Digite o RG do Fornecedor"
                    error={errors.rg}
                />

                <Input label="Email: "
                    onChange={setEmail}
                    value={email}
                    id="inputEmail"
                    placeholder="Digite o E-mail do Fornecedor"
                    error={errors.email}
                />
            </div>






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

