import { httpClient } from 'app/http'
import { Fornecedor } from 'app/models/fornecedores'
import { AxiosResponse } from 'axios'

const resourceURL: string = "/api/fornecedores"

export const useFornecedorService = () => {

    const salvar = async (fornecedor: Fornecedor) : Promise<Fornecedor> => {
       const response: AxiosResponse<Fornecedor> = await httpClient.post<Fornecedor>(resourceURL, fornecedor )
       return response.data;
    }

    const atualizar = async (fornecedor: Fornecedor) : Promise<void> => {
        const url: string = `${resourceURL}/${fornecedor.id}` 
        await httpClient.put<Fornecedor>(url, fornecedor)
    }

    const carregarFornecedor = async (id) : Promise<Fornecedor> => {
        const url: string = `${resourceURL}/${id}`
        const response: AxiosResponse<Fornecedor> = await httpClient.get(url);
        return response.data;
     }

    const deletar = async (id) : Promise<void> => {
        const url: string = `${resourceURL}/${id}`
        await httpClient.delete(url)
    }

    return {
        salvar,
        atualizar,
        carregarFornecedor,
        deletar
    }
}