import { Layout, Loader } from 'components';
import Link from 'next/link';
import { TabelaFornecedores } from './tabela';
import { Fornecedor } from 'app/models/fornecedores';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { httpClient } from 'app/http';
import { AxiosResponse } from 'axios';
import Router from 'next/router';
import { useFornecedorService } from 'app/services';
import { Alert } from 'components/common/message';

export const ListagemFornecedores: React.FC = () => {
  const service = useFornecedorService();
  const [messages, setMessages] = useState<Array<Alert>>([]);
  const { data: result, error, mutate } = useSWR<AxiosResponse<Fornecedor[]>>(
    '/api/fornecedores',
    (url) => httpClient.get(url)
  );

  const [listaFornecedores, setListaFornecedores] = useState<Fornecedor[]>([]);

  const [filtroNome, setFiltroNome] = useState<string>('');
  const [filtroCpf, setFiltroCPF] = useState<string>('');

  useEffect(() => {
    setListaFornecedores(result?.data || []);
  }, [result]);

  useEffect(() => {
    if (messages.length > 0) {
      mutate(); // Atualiza a lista de fornecedores após uma exclusão bem-sucedida
    }
  }, [messages, mutate]);

  const editar = (fornecedor: Fornecedor) => {
    const url = `/cadastros/fornecedores?id=${fornecedor.id}`;
    Router.push(url);
  };

  const deletar = (fornecedor: Fornecedor) => {
    service.deletar(fornecedor.id).then((response) => {
      setMessages([{ tipo: 'success', texto: 'Fornecedor excluído com sucesso!' }]);
    });
  };

  const filtrarFornecedoresCpf = (fornecedores: Fornecedor[]) => {
    return fornecedores.filter((fornecedor) => {
      const nomeMatch = fornecedor.nomeFornecedor?.toLowerCase().includes(filtroNome.toLowerCase()) ?? false;
      const cpfMatch = filtroCpf ? fornecedor.cpf?.toLowerCase().includes(filtroCpf.toLowerCase()) : true;
      return nomeMatch && cpfMatch;
    });
  };
  
  
  
  
  const fornecedoresFiltrados = filtrarFornecedoresCpf(listaFornecedores);

  return (
    <Layout titulo="Listagem de Fornecedores" mensagens={messages}>
      <Link href="/cadastros/fornecedores">
        <button className="button is-warning">Novo</button>
      </Link>
      <br />
      <br />
      <div className="field is-grouped">
        <p className="control">
          <input
            className="input"
            type="text"
            placeholder="Buscar por nome"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
          />
        </p>
        <p className="control">
          <input
            className="input"
            type="text"
            placeholder="Buscar por CPF"
            value={filtroCpf}
            onChange={(e) => setFiltroCPF(e.target.value)}
          />
        </p>
      </div>

      <Loader show={!result} />
      <TabelaFornecedores onEdit={editar} onDelete={deletar} fornecedores={fornecedoresFiltrados} />
    </Layout>
  );
};
