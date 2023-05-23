package io.github.leandrotominay.demo.rest.login;

import io.github.leandrotominay.demo.model.Usuario;

public class UsuarioFormRequest {

	private Long id;
	private String login;
	private String senha;

	public UsuarioFormRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UsuarioFormRequest(Long id, String login, String senha) {
		super();
		this.id = id;
		this.login = login;
		this.senha = senha;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	@Override
	public String toString() {
		return "UsuarioFormRequest [id=" + id + ", login=" + login + ", senha=" + senha + "]";
	}

	public Usuario toModel() {
		return new Usuario(id, login, senha);
	}

	public static UsuarioFormRequest fromModel(Usuario usuario) {
		return new UsuarioFormRequest(usuario.getId(), usuario.getLogin(), usuario.getSenha());
	}

}
