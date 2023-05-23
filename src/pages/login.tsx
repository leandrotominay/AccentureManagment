import React from 'react';

interface MensagemProps {
  mensagem: string;
}

const Mensagem: React.FC<MensagemProps> = (props: MensagemProps) => {
  return (
    <div>
      {props.mensagem}
    </div>
  );
};

const MeuComponente = () => {
  return (
    <body className="layout-default">
  <section className="hero is-fullheight is-medium is-primary is-bold">
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
              <p className="control has-icon">
                <input className="input" type="email" placeholder="Login" />
                <i className="fa fa-envelope" />
              </p>
              <p className="control has-icon">
                <input className="input" type="password" placeholder="Senha" />
                <i className="fa fa-lock" />
              </p>
              <p className="control">

              </p>
              <p className="control">
                <button className="button is-primary is-medium is-fullwidth">
                  <i className="fa fa-user" />
                  Login
                </button>
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
    </section>
</body>
  );
};

export default MeuComponente;
