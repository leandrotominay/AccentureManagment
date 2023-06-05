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
  const PAGE_SIZE = 5; // Número de itens por página
  const service = useFornecedorService();
  const [messages, setMessages] = useState<Array<Alert>>([]);
  const { data: result, error, mutate } = useSWR<AxiosResponse<Fornecedor[]>>(
    '/api/fornecedores',
    (url) => httpClient.get(url)
  );

  const [listaFornecedores, setListaFornecedores] = useState<Fornecedor[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);

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

  // Paginação
  const totalPaginas = Math.ceil(fornecedoresFiltrados.length / PAGE_SIZE);
  const indiceInicio = (paginaAtual - 1) * PAGE_SIZE;
  const indiceFim = indiceInicio + PAGE_SIZE;
  const fornecedoresPaginados = fornecedoresFiltrados.slice(indiceInicio, indiceFim);

  const trocarPagina = (pagina: number) => {
    setPaginaAtual(pagina);
  };

  return (
    <Layout titulo="Listagem de Fornecedores" mensagens={messages}>
      <Link href="/cadastros/fornecedores">
        <button className="button is-primary" style={{ backgroundColor: 'purple', color: 'white' }}>Novo</button>
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
      <TabelaFornecedores onEdit={editar} onDelete={deletar} fornecedores={fornecedoresPaginados} />

      <nav className="pagination is-rounded" role="navigation" aria-label="pagination" >
        <button
          className="pagination-previous"
          onClick={() => trocarPagina(paginaAtual - 1)}
          disabled={paginaAtual === 1}
        >
          Anterior
        </button>
        <button
          className="pagination-next"
          onClick={() => trocarPagina(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas}
        >
          Próxima
        </button>
        <ul className="pagination-list" >
          {Array.from(Array(totalPaginas).keys()).map((pagina) => (
            <li key={pagina}>
              <button
                className={`pagination-link ${pagina + 1 === paginaAtual ? 'is-current' : ''}`}
                onClick={() => trocarPagina(pagina + 1)}
                style={{ backgroundColor: 'purple', color: 'white' }}
              >
                {pagina + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </Layout>
  );
};
