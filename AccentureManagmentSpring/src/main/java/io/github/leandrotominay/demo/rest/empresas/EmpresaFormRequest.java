package io.github.leandrotominay.demo.rest.empresas;

import io.github.leandrotominay.demo.model.Empresa;

public class EmpresaFormRequest {

	private Long id;
	private String nomeFantasia;
	private String cnpj;
	private String cep;

	public EmpresaFormRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public EmpresaFormRequest(Long id, String nomeFantasia, String cnpj, String cep) {
		super();
		this.id = id;
		this.nomeFantasia = nomeFantasia;
		this.cnpj = cnpj;
		this.cep = cep;
	}

	public String getNomeFantasia() {
		return nomeFantasia;
	}

	public void setNomeFantasia(String nomeFantasia) {
		this.nomeFantasia = nomeFantasia;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "EmpresaFormRequest [id=" + id + ", nomeFantasia=" + nomeFantasia + ", cnpj=" + cnpj + ", cep=" + cep
				+ "]";
	}

	public Empresa toModel() {
		return new Empresa(id, nomeFantasia, cnpj, cep);
	}

	public static EmpresaFormRequest fromModel(Empresa empresa) {
		return new EmpresaFormRequest(empresa.getId(), empresa.getNomeFantasia(), empresa.getCep(), empresa.getCnpj());
	}

}
