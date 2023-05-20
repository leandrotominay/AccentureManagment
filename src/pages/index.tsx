import Head from 'next/head'
import { Layout } from 'components'

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Accenture Managment</title>
        <meta name="description" content="Gerenciamento de Empresas e Clientes" />
        <link rel="icon" href="favicon.ico" />

      </Head>

      <Layout> </Layout>

    </div>
  )
}

export default Home;

