import { Layout } from 'components'
import Link from 'next/link'
import { TabelaEmpresas } from './tabela'
import { Empresa } from 'app/models/empresas'

export const ListagemEmpresas: React.FC = () => {

    const empresas: Empresa[] = [{
        id: 1, nomeFantasia: "TOTVS", cnpj: "10340240233", cep: "03692000"
    },{
        id: 1, nomeFantasia: "Accenture", cnpj: "10340240233", cep: "03692000"
    },{
        id: 1, nomeFantasia: "Huawei", cnpj: "10340240233", cep: "03692000"
    }]

    return (
        <Layout titulo="Listagem de Empresas">
            <Link href="/cadastros/empresas">
            <button className="button is-warning">Novo</button>
            </Link>
            <br />
            <TabelaEmpresas empresas={empresas}/>

        </Layout>
    )
}