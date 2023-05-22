import { Layout, Loader } from 'components'
import Link from 'next/link'
import { TabelaEmpresas } from './tabela'
import { Empresa } from 'app/models/empresas'
import useSWR from 'swr'
import { httpClient } from 'app/http'
import { AxiosResponse } from 'axios'
import Router from 'next/router'
import { useEmpresaService } from 'app/services'
import { useState } from 'react'
import { Alert } from 'components/common/message'
import { useEffect } from 'react'

export const ListagemEmpresas: React.FC = () => {

    const service = useEmpresaService();
    const [messages, setMessages] = useState<Array<Alert>>([]);
    const { data: result, error } = useSWR<AxiosResponse<Empresa[]>>
        ('/api/empresas', url => httpClient.get(url))

        const [ lista, setLista ] = useState<Empresa[]>([])

        useEffect( () => {
            setLista(result?.data || [])
        },[result])


    const editar = (empresa: Empresa) => {
        const url = `/cadastros/empresas?id=${empresa.id}`
        Router.push(url)

    }


    const deletar = (empresa: Empresa) => {
        service.deletar(empresa.id).then(response => {
            setMessages([
                { tipo: "success", texto: "Empresa excluida com sucesso!"}
            ])
            const listaAlterada: Empresa[] = lista?.filter( e => e.id != empresa.id )
            setLista(listaAlterada)
        })
    }

    return (
        <Layout titulo="Listagem de Empresas" mensagens={messages}>
            <Link href="/cadastros/empresas">
                <button className="button is-warning">Novo</button>
            </Link>
            <br />
            <br />
            <Loader show={!result}/>
            <TabelaEmpresas onEdit={editar} onDelete={deletar} empresas={lista} />

        </Layout>
    )
}