import { httpClient } from 'app/http'
import { FornecedorEmpresa } from 'app/models/fornecedor_empresa'
import { AxiosResponse } from 'axios'

const resourceURL: string = "/api/FornecedorEmpresa"

export const useFornecedorEmpresaService = () => {

    const salvar = async (fornecedorEmpresa: FornecedorEmpresa) : Promise<FornecedorEmpresa> => {
        const response: AxiosResponse<FornecedorEmpresa> = await httpClient.post<FornecedorEmpresa>(resourceURL, fornecedorEmpresa )
        return response.data;
     }
 
     const atualizar = async (fornecedorEmpresa: FornecedorEmpresa) : Promise<void> => {
         const url: string = `${resourceURL}/${fornecedorEmpresa.id}` 
         await httpClient.put<FornecedorEmpresa>(url, fornecedorEmpresa)
     }

     const carregarFornecedorEmpresa = async (id) : Promise<FornecedorEmpresa> => {
        const url: string = `${resourceURL}/${id}`
        const response: AxiosResponse<FornecedorEmpresa> = await httpClient.get(url);
        return response.data;
    }

    const deletar = async (id) : Promise<void> => {
        const url: string = `${resourceURL}/${id}`
        await httpClient.delete(url)
    }

    return {
        salvar,
        atualizar,
        carregarFornecedorEmpresa,
        deletar
    }
}