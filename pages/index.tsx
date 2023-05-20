import Head from 'next/head'

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Accenture Managment</title>
        <meta name="description" content="Gerenciamento de Empresas e Clientes" />
        <link rel="icon" href="favicon.ico" />

      </Head>

      <div className="columns">
        <div className="column">
          First column
        </div>
        <div className="column">
          Second column
        </div>
        <div className="column">
          Third column
        </div>
        <div className="column">
          Fourth column
        </div>
      </div>

    </div>
  )
}

export default Home;

