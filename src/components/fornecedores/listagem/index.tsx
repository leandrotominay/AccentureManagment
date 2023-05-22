import { Layout, Loader } from 'components'
import Link from 'next/link'
import { TabelaFornecedores } from './tabela'
import { Fornecedor } from 'app/models/fornecedores'
import useSWR from 'swr'
import { httpClient } from 'app/http'
import { AxiosResponse } from 'axios'

export const ListagemFornecedores: React.FC = () => {

    const { data: result, error } = useSWR<AxiosResponse<Fornecedor[]>>
        ('/api/fornecedores', url => httpClient.get(url))

        const editar = (fornecedor: Fornecedor) => {
            console.log(fornecedor)
        }
    
        const deletar = (fornecedor: Fornecedor) => {
            console.log(fornecedor)
        }

    return (
        <Layout titulo="Listagem de Fornecedores">
            <Link href="/cadastros/fornecedores">
                <button className="button is-warning">Novo</button>
            </Link>
            <br />
            <Loader show={!result}/>
            <TabelaFornecedores onEdit={editar} onDelete={deletar} fornecedores={result?.data || []} />

        </Layout>
    )
}