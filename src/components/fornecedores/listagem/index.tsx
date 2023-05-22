import { Layout, Loader } from 'components'
import Link from 'next/link'
import { TabelaFornecedores } from './tabela'
import { Fornecedor } from 'app/models/fornecedores'
import useSWR from 'swr'
import { httpClient } from 'app/http'
import { AxiosResponse } from 'axios'
import Router from 'next/router'
import { useFornecedorService } from 'app/services'
import { useState, useEffect } from 'react'
import { Alert } from 'components/common/message'

export const ListagemFornecedores: React.FC = () => {
  const service = useFornecedorService();
  const [messages, setMessages] = useState<Array<Alert>>([]);
  const { data: result, error } = useSWR<AxiosResponse<Fornecedor[]>>(
    '/api/fornecedores',
    (url) => httpClient.get(url)
  );
  const [lista, setLista] = useState<Fornecedor[]>([]);

  useEffect(() => {
    if (result?.data) {
      setLista(result.data);
    }
  }, [result]);

  const editar = (fornecedor: Fornecedor) => {
    const url = `/cadastros/fornecedores?id=${fornecedor.id}`;
    Router.push(url);
  };

  const deletar = (fornecedor: Fornecedor) => {
    service.deletar(fornecedor.id).then((response) => {
      setMessages([{ tipo: 'success', texto: 'Fornecedor excluido com sucesso!' }]);
      const listaAlterada: Fornecedor[] = lista.filter((f) => f.id !== fornecedor.id);
      setLista(listaAlterada);
    });
  };

  return (
    <Layout titulo="Listagem de Fornecedores" mensagens={messages}>
      <Link href="/cadastros/fornecedores">
        <button className="button is-warning">Novo</button>
      </Link>
      <br />
      <br />
      <Loader show={!result} />
      <TabelaFornecedores onEdit={editar} onDelete={deletar} fornecedores={lista} />
    </Layout>
  );
};
