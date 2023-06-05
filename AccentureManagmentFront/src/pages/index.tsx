import React, { useState } from 'react';
import { useUsuarioService } from 'app/services/login.service';
import 'components/common/loader/loader.css';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const usuarioService = useUsuarioService();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const usuario = {
      login: login,
      senha: senha
    };

    try {
      // Fazer a chamada de autenticação ao serviço
      const autenticado = await usuarioService.autenticar(usuario);

      if (autenticado) {
        // Login bem-sucedido
        console.log('Login bem-sucedido');
        window.location.href = '/consultas/empresas';
        // Redirecionar para a próxima página ou executar ações necessárias
      } else {
        // Login falhou
        setError('Credenciais inválidas');
      }
    } catch (error) {
      console.error(error);
      setError('Ocorreu um erro ao fazer o login');
    }
  };

  return (
    <div className="layout-default">
      <section className="hero is-fullheight is-medium custom-gradient-background is-bold">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <article className="card is-rounded">
                <div className="card-content">
                  <h1 className="title">
                    <p className="menu-label is-hidden-touch">
                      <img src="https://www.creativevirtual.com/wp-content/uploads/2021/03/accenture-logo.png" alt="Logo" />
                    </p>
                  </h1>
                  <form onSubmit={handleLogin}>
                    <div className="field">
                      <div className="control has-icons-left">
                        <input
                          className="input is-rounded"
                          type="text"
                          placeholder="Login"
                          value={login}
                          onChange={(e) => setLogin(e.target.value)}
                        />
                        <span className="icon is-small is-left">
                          <i className="fa fa-envelope" />
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control has-icons-left">
                        <input
                          className="input is-rounded"
                          type="password"
                          placeholder="Senha"
                          value={senha}
                          onChange={(e) => setSenha(e.target.value)}
                        />
                        <span className="icon is-small is-left">
                          <i className="fa fa-lock" />
                        </span>
                      </div>
                    </div>
                    {error && <p className="has-text-danger">{error}</p>}
                    <div className="field">
                      <div className="control">
                        <button className="button is-medium is-rounded is-fullwidth" type="submit">
                          <i className="fa fa-user" />
                          Entrar
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
