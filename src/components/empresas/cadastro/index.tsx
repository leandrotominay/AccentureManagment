import { Layout, Input } from 'components';
import { useState } from 'react';
import { useEmpresaService  } from 'app/services';
import { Empresa } from 'app/models/empresas';


export const CadastroEmpresas: React.FC = () => {
    const service = useEmpresaService();
    const [cep, setCep] = useState<string>('');
    const [nomeFantasia, setNomeFantasia] = useState<string>('');
    const [cnpj, setCnpj] = useState<string>('');
    const [data, setData] = useState(null);

    const submit = () => {
        const empresa: Empresa = {
            nomeFantasia,
            cnpj,
            cep
        }

        service
        .salvar(empresa)
        .then(empresaResposta => console.log(empresaResposta))
    }

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setCep(value);

        try {
            const response = await fetch(`http://cep.la/${value}`, {
                headers: { 'Accept': 'application/json' }
            });
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout titulo="Cadastro de Empresa">
            
                <h1>Insira os dados da empresa</h1>
                <form>
                    <Input label="Nome Fantasia"
                        onChange={setNomeFantasia}
                        value={nomeFantasia}
                        id="inputNomeFantasia"
                        placeholder="Digite o seu Nome Fantasia"
                    />
                    <Input label="CNPJ"
                        onChange={setCnpj}
                        value={cnpj}
                        id="inputCnpj"
                        placeholder="Digite o CNPJ da Empresa"
                    />
                    <Input label="CEP"
                        onChange={setCep}
                        onInput={handleInputChange}
                        value={cep}
                        id="inputCep"
                        placeholder="Digite o CEP da Empresa"
                    />                      

                        {data && (
                            <div className="Dados CEP">
                                <label className="label">Endereço</label>
                                <input type="text" className="input" value={data.logradouro} readOnly />
                                <label className="label">Bairro</label>
                                <input type="text" className="input" value={data.bairro} readOnly />
                                <label className="label">Cidade</label>
                                <input type="text" className="input" value={data.cidade} readOnly />
                                <label className="label">Estado</label>
                                <input type="text" className="input" value={data.uf} readOnly />
                            </div>
                        )}
                    
                    <div className="field is-grouped">
                        <div className="control">
                            <button type="submit" onClick={submit} className="button is-dark">Salvar</button>
                        </div>
                        <div className="control">
                            <button type="submit" className="button">Voltar</button>
                        </div>
                    </div>
                </form>


        </Layout>
    );
};
