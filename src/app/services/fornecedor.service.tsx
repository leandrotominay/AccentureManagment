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

    return {
        salvar,
        atualizar
    }
}