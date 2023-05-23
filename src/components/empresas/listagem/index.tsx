import { Layout, Loader } from 'components';
import Link from 'next/link';
import { TabelaEmpresas } from './tabela';
import { Empresa } from 'app/models/empresas';
import useSWR from 'swr';
import { httpClient } from 'app/http';
import { AxiosResponse } from 'axios';
import Router from 'next/router';
import { useEmpresaService } from 'app/services';
import { useState, useEffect } from 'react';
import { Alert } from 'components/common/message';


export const ListagemEmpresas: React.FC = () => {
  const PAGE_SIZE = 10; // Número de itens por página
  const service = useEmpresaService();
  const [messages, setMessages] = useState<Array<Alert>>([]);
  const { data: result, error } = useSWR<AxiosResponse<Empresa[]>>(
    '/api/empresas',
    (url) => httpClient.get(url)
  );

  const [lista, setLista] = useState<Empresa[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    setLista(result?.data || []);
  }, [result]);

  const editar = (empresa: Empresa) => {
    const url = `/cadastros/empresas?id=${empresa.id}`;
    Router.push(url);
  };

  const deletar = (empresa: Empresa) => {
    service.deletar(empresa.id).then((response) => {
      setMessages([{ tipo: 'success', texto: 'Empresa excluída com sucesso!' }]);
      const listaAlterada: Empresa[] = lista?.filter((e) => e.id !== empresa.id);
      setLista(listaAlterada);
    });
  };

  // Paginação
  const totalPaginas = Math.ceil(lista.length / PAGE_SIZE);
  const indiceInicio = (paginaAtual - 1) * PAGE_SIZE;
  const indiceFim = indiceInicio + PAGE_SIZE;
  const empresasPaginadas = lista.slice(indiceInicio, indiceFim);

  const trocarPagina = (pagina: number) => {
    setPaginaAtual(pagina);
  };

  return (
    <Layout titulo="Listagem de Empresas" mensagens={messages}>
      <Link href="/cadastros/empresas">
        <button className="button is-primary" style={{ backgroundColor: 'purple', color: 'white' }}>Novo</button>
      </Link>
      <br />
      <br />
      <Loader show={!result} />
      <TabelaEmpresas onEdit={editar} onDelete={deletar} empresas={empresasPaginadas} />

      <nav className="pagination is-rounded" role="navigation" aria-label="pagination">
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
        <ul className="pagination-list">
          {Array.from(Array(totalPaginas).keys()).map((pagina) => (
            <li key={pagina}>
              <button
                style={{ backgroundColor: 'purple', color: 'white' }}
                className={`pagination-link ${pagina + 1 === paginaAtual ? 'is-current' : ''}`}
                onClick={() => trocarPagina(pagina + 1)}
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
