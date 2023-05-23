import { useState, useEffect } from 'react';
import { Layout, Input } from 'components';
import { useFornecedorService } from 'app/services';
import { Fornecedor } from 'app/models/fornecedores';
import { Alert } from 'components/common/message';
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/router';

const validationSchema = yup.object().shape({
  nomeFornecedor: yup.string().trim().required('Campo obrigatório'),
  cpf: yup.string().trim().nullable(),
  cnpj: yup.string().trim().nullable(),
  email: yup.string().trim().nullable(),
  rg: yup.string().trim().nullable(),
  data_Nascimento: yup.string().trim().nullable(),
});

interface FormErros {
  nomeFornecedor?: string;
  cnpj?: string;
  cpf?: string;
  cep?: string;
  email?: string;
  rg?: string;
  data_Nascimento?: string;
}

export const CadastroFornecedores: React.FC = () => {
  const service = useFornecedorService();
  const [nomeFornecedor, setNomeFornecedor] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [cnpj, setCnpj] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [rg, setRg] = useState<string>('');
  const [data_Nascimento, setData_Nascimento] = useState<string>('');
  const [id, setId] = useState<number>();
  const [messages, setMessages] = useState<Array<Alert>>([]);
  const [errors, setErrors] = useState<FormErros>({});
  const [cnpjError, setCnpjError] = useState<string>('');
  const router = useRouter();
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
        if (fornecedorEncontrado.data_Nascimento !== undefined) {
          setData_Nascimento(fornecedorEncontrado.data_Nascimento);
        }
      });
    }
  }, [queryId]);

  const submit = () => {
    const fornecedor: Fornecedor = {
      id,
      nomeFornecedor,
      cnpj,
      cpf,
      email,
      rg,
      data_Nascimento
    };

    validationSchema
      .validate(fornecedor)
      .then(obj => {
        if (id) {
          service 
            .atualizar(fornecedor)
            .then(response =>
              setMessages([
                { tipo: 'success', texto: 'Fornecedor atualizado com sucesso!' },
              ])
            );
        } else {
          service
            .salvar(fornecedor)
            .then(fornecedorResposta => {
              setId(fornecedorResposta.id);
              setMessages([
                { tipo: 'success', texto: 'Fornecedor salvo com sucesso!' },
              ]);
            })
            .catch(error => {
              if (error.response && error.response.status === 500) {
                setCnpjError('Erro interno do servidor. Por favor, tente novamente mais tarde.');
                setMessages([
                    { tipo: 'danger', texto: 'Verifique os campos novamentes, campos nulos ou duplicados.' },
                  ])
              } else {
                console.log(error);
              }
            });
        }
      })
      .catch(err => {
        const field = err.path;
        const message = err.message;
        setErrors({
          [field]: message,
        });
      });
  };

  return (
    <Layout titulo="Fornecedores" mensagens={messages}>
      {id && (
        <div className="columns">
          <Input
            label="Código:"
            columnClasses="is-half"
            value={id}
            id="inputId"
            disabled={true}
          />
        </div>
      )}

      <div className="columns">
        <Input
          label="Nome do Fornecedor: *"
          columnClasses="is-half"
          onChange={setNomeFornecedor}
          value={nomeFornecedor}
          id="inputNomeFornecedor"
          placeholder="Digite o Nome do Fornecedor"
          error={errors.nomeFornecedor}
        />

        <Input
          mascara="cnpj"
          label="CNPJ: "
          columnClasses="is-half"
          onChange={setCnpj}
          value={cnpj}
          id="inputCnpj"
          placeholder="Digite o CNPJ da Empresa"
          error={errors.cnpj}
        />
      </div>

      <div className="columns">
        <Input
          mascara="cpf"
          label="CPF: "
          columnClasses="is-half"
          onChange={setCpf}
          value={cpf}
          id="inputCpf"
          placeholder="Digite o CPF do Fornecedor"
          error={errors.cpf }
        />

        <Input
          mascara="data"
          label="Data de Nascimento: "
          columnClasses="is-half"
          onChange={setData_Nascimento}
          value={data_Nascimento}
          id="inputDataNascimento"
          placeholder="xx/xx/xxxx"
          error={errors.data_Nascimento}
        />
      </div>

      <div className="columns">
        <Input
          mascara="rg"
          label="RG: "
          columnClasses="is-half"
          onChange={setRg}
          value={rg}
          id="inputRg"
          placeholder="Digite o RG do Fornecedor"
          error={errors.rg}
        />

        <Input
          label="Email: "
          onChange={setEmail}
          value={email}
          id="inputEmail"
          placeholder="Digite o E-mail do Fornecedor"
          error={errors.email}
        />
      </div>

      <div className="columns">
        <Input
          label="Empresa: "
          columnClasses="is-half"
          onChange={setRg}
          value={rg} // DROPDOWN id //
          id="inputRg"
          placeholder="Digite a empresa Relacionada"
          error={errors.rg}
        />
      </div>

      <br />
      <div className="field is-grouped">
        <div className="control is-link">
          <button onClick={submit} className="button">
            {id ? 'Atualizar' : 'Salvar'}
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
      };