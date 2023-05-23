import { FornecedorEmpresa } from "../fornecedor_empresa";

export interface Empresa {
    id?: number;
    nomeFantasia?: string;
    cnpj?: string;
    cep?: string;
    fornecedores: FornecedorEmpresa[];
}