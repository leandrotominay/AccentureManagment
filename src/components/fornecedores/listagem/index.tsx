import { Layout } from 'components'
import Link from 'next/link'
import { TabelaFornecedores } from './tabela'
import { Fornecedor } from 'app/models/fornecedores'

export const ListagemFornecedores: React.FC = () => {

    const fornecedores: Fornecedor[] = [{
        id: 1, nomeFornecedor: "Leandro Ramos Francisco Oliveira Peixoto da Cruz", cnpj: "10340240233", cpf: "03692000", email: "ramosleandro53@gmail.com"
    },{
        id: 1, nomeFornecedor: "Leandro", cnpj: "10340240233", cpf: "03692000"
    },{
        id: 1, nomeFornecedor: "Leandro Ramos Francisco Oliveira Peixoto da Cruz", cnpj: "10340240233", cpf: "03692000", email: "ramosleandro53@gmail.com"
    }]

    return (
        <Layout titulo="Listagem de Fornecedores">
            <Link href="/cadastros/fornecedores">
            <button className="button is-warning">Novo</button>
            </Link>
            <br />
            <TabelaFornecedores fornecedores={fornecedores}/>
        </Layout>
    )
}