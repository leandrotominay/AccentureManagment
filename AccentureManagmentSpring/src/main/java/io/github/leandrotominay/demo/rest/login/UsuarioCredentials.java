package io.github.leandrotominay.demo.rest.login;

public class UsuarioCredentials {
	private String login;
	private String senha;

	public UsuarioCredentials() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UsuarioCredentials(String login, String senha) {
		super();
		this.login = login;
		this.senha = senha;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

}