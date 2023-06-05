import { httpClient } from 'app/http'
import { Empresa } from 'app/models/empresas'
import { AxiosResponse } from 'axios'

const resourceURL: string = "/api/empresas"

export const useEmpresaService = () => {

    const salvar = async (empresa: Empresa) : Promise<Empresa> => {
        const response: AxiosResponse<Empresa> = await httpClient.post<Empresa>(resourceURL, empresa )
        return response.data;
     }
 
     const atualizar = async (empresa: Empresa) : Promise<void> => {
         const url: string = `${resourceURL}/${empresa.id}` 
         await httpClient.put<Empresa>(url, empresa)
     }

     const carregarEmpresa = async (id) : Promise<Empresa> => {
        const url: string = `${resourceURL}/${id}`
        const response: AxiosResponse<Empresa> = await httpClient.get(url);
        return response.data;
    }

    const deletar = async (id) : Promise<void> => {
        const url: string = `${resourceURL}/${id}`
        await httpClient.delete(url)
    }

    return {
        salvar,
        atualizar,
        carregarEmpresa,
        deletar
    }
}