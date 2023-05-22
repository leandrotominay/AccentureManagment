import { Layout, Loader } from 'components'
import Link from 'next/link'
import { TabelaEmpresas } from './tabela'
import { Empresa } from 'app/models/empresas'
import useSWR from 'swr'
import { httpClient } from 'app/http'
import { AxiosResponse } from 'axios'

export const ListagemEmpresas: React.FC = () => {

    const { data: result, error } = useSWR<AxiosResponse<Empresa[]>>
        ('/api/empresas', url => httpClient.get(url))

    const editar = (empresa: Empresa) => {
        console.log(empresa)
    }

    const deletar = (empresa: Empresa) => {
        console.log(empresa)
    }

    return (
        <Layout titulo="Listagem de Empresas">
            <Link href="/cadastros/empresas">
                <button className="button is-warning">Novo</button>
            </Link>
            <br />
            <br />
            <Loader show={!result}/>
            <TabelaEmpresas onEdit={editar} onDelete={deletar} empresas={result?.data || []} />

        </Layout>
    )
}