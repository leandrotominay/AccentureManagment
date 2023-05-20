import { Layout } from 'components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const CadastroProdutos: React.FC = () => {
    const [cep, setCep] = useState('');
    const [data, setData] = useState(null);

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
            <div>
                <h1>Insira os dados da empresa</h1>
                <form>
                    <div className="field">
                        <label className="label" htmlFor="inputFantasia">Nome Fantasia: *</label>
                        <div className="control">
                            <input className="input" id="inputFantasia" type="text" placeholder="Digite o Nome Fantasia"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">CNPJ</label>
                        <div className="control">
                            <input className="input" id="inputCNPJ" type="text" placeholder="Digite o CNPJ"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">CEP</label>
                        <div className="control">
                            <input className="input" ID="inputCEP" type="text" value={cep} onInput={handleInputChange} placeholder="Digite o CEP" />
                        </div>
                        {data && (
                            <div>
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
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                    <button type="submit" className="button is-dark">Salvar</button>
                        </div>
                        <div className="control">
                    <button type="submit" className="button">Voltar</button>
                        </div>
                    </div>
                </form>

            </div>
        </Layout>
    );
};
