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

    return {
        salvar,
        atualizar
    }
}