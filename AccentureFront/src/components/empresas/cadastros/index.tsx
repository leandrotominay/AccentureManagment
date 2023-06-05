import { useState, useEffect } from 'react'
import { Layout, Input, Message } from 'components'
import { useEmpresaService } from 'app/services'
import { Empresa } from 'app/models/empresas'
import { Alert } from 'components/common/message'
import * as yup from 'yup'
import Link from 'next/link'
import InputMask from 'react-input-mask' // Adicionado o import do react-input-mask
import { useRouter } from 'next/router'


const validationSchema = yup.object().shape({
    nomeFantasia: yup.string().trim().required("Campo Obrigatório"),
    cnpj: yup.string().trim().required("Campo Obrigatório").min(10, "O CNPJ deve possuir pelo menos 10 digítos.").max(18, "O CNPJ não pode exceder 18 digitos"),
    cep: yup.string().trim().required("Campo Obrigatório").min(8, "O CEP deve possuir pelo menos 8 digítos.").max(11, "O CEP não pode exceder 11 digítos")
})

interface FormErros {
    nomeFantasia?: string;
    cnpj?: string;
    cep?: string;
}

export const CadastroEmpresas: React.FC = () => {
    const service = useEmpresaService();
    const [nomeFantasia, setNomeFantasia] = useState<string>('');
    const [cep, setCep] = useState('');
    const [cnpj, setCnpj] = useState<string>('');
    const [id, setId] = useState<number>();
    const [data, setData] = useState(null);
    const [messages, setMessages] = useState<Array<Alert>>([]);
    const [errors, setErrors] = useState<FormErros>({});
    const router = useRouter()
    const { id: queryId } = router.query;


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

    useEffect(() => {
        if (queryId) {
          service.carregarEmpresa(queryId).then((empresaEncontrada) => {
            if (empresaEncontrada.id !== undefined) {
              setId(empresaEncontrada.id);
            }
            if (empresaEncontrada.nomeFantasia !== undefined) {
              setNomeFantasia(empresaEncontrada.nomeFantasia);
            }
            if (empresaEncontrada.cep !== undefined) {
              setCnpj(empresaEncontrada.cep); // Alteração nesta linha
            }
            if (empresaEncontrada.cnpj !== undefined) {
              setCep(empresaEncontrada.cnpj); // Alteração nesta linha
            }
          });
        }
      }, [queryId]);
      
      

      const submit = () => {
        const empresa: Empresa = {
          id,
          nomeFantasia,
          cnpj,
          cep
        }
      
        validationSchema
          .validate(empresa)
          .then(obj => {
            if (id) {
              service
                .atualizar(empresa)
                .then(response => setMessages([{ tipo: "success", texto: "empresa atualizado com sucesso!" }]))
                .catch(error => {

                  setMessages([{ tipo: "danger", texto: "Erro ao atualizar o fornecedor, campo CNPJ duplicado." }]);
                });
            } else {
              service
                .salvar(empresa)
                .then(empresaResposta => {
                  setId(empresaResposta.id);
                  setMessages([{ tipo: "success", texto: "Fornecedor salvo com sucesso!" }]);
                })
                .catch(error => {
                  if (error.response && error.response.status === 500) {
                    const responseData = error.response.data;

                  } else {
                    setErrors({ ...empresa }); // Limpar erros anteriores
                  }
                  setMessages([{ tipo: "danger", texto: "Erro ao salvar o fornecedor, campo CNPJ duplicado." }]);
                });
            }
          })
          .catch(err => {
            const field = err.path;
            const message = err.message;
            setErrors({
              ...empresa,
              [field]: message
            });
          });
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
                    error={errors.nomeFantasia}
                />
                
                <Input mascara="cnpj" label="CNPJ: "
                    columnClasses="is-half"
                    onChange={setCnpj}
                    value={cnpj}
                    id="inputCnpj"
                    placeholder="Digite o CNPJ da Empresa"
                    error={errors.cnpj}
                    
                />

            </div>
            <hr></hr>
            <div className="field">
                <label className="label">CEP</label>
                <div className="control">
                <InputMask
    className="input"
    id="inputCEP"
    mask="99999-999"
    value={cep}
    onChange={handleInputChange}
    placeholder="Digite o CEP"
/>
                    {errors.cep &&
                        <p className="help is-danger">{errors.cep}</p>
                    }
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
                </div> // criar no banco esses campos -------------==^
            )}
            <br />
            <div className="field is-grouped">
                <div className="control is-link">
                    <button onClick={submit} className="button">
                        {id ? "Atualizar" : "Salvar"}
                    </button>
                </div>
                <div className="control">
                    <Link href="/consultas/empresas">
                    <button className="button">Voltar</button>
                    </Link>
                </div>
            </div>

        </Layout>
    )
}