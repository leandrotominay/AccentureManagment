package io.github.leandrotominay.demo.rest.fornecedores;

import io.github.leandrotominay.demo.model.Fornecedor;


public class FornecedorFormRequest {

	private Long id;
	private String nomeFornecedor;
	private String cnpj;
	private String cpf;
	private String email;
	private String rg;
	private String data_Nascimento;
	
	public FornecedorFormRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public FornecedorFormRequest(Long id, String nomeFornecedor, String cnpj, String cpf, String email, String rg,
			String data_Nascimento) {
		super();
		this.id = id;
		this.nomeFornecedor = nomeFornecedor;
		this.cnpj = cnpj;
		this.cpf = cpf;
		this.email = email;
		this.rg = rg;
		this.data_Nascimento = data_Nascimento;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNomeFornecedor() {
		return nomeFornecedor;
	}
	public void setNomeFornecedor(String nomeFornecedor) {
		this.nomeFornecedor = nomeFornecedor;
	}
	public String getCnpj() {
		return cnpj;
	}
	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getData_Nascimento() {
		return data_Nascimento;
	}

	public void setData_Nascimento(String data_Nascimento) {
		this.data_Nascimento = data_Nascimento;
	}

	
	
	@Override
	public String toString() {
		return "FornecedorFormRequest [id=" + id + ", nomeFornecedor=" + nomeFornecedor + ", cnpj=" + cnpj + ", cpf="
				+ cpf + ", email=" + email + ", rg=" + rg + ", data_Nascimento=" + data_Nascimento + "]";
	}

	public Fornecedor toModel() {
	    if (rg != null && !rg.isEmpty()) {
	        return new Fornecedor(id, nomeFornecedor, null, cpf, email, rg, data_Nascimento);
	    } else if (cnpj != null && !cnpj.isEmpty()) {
	        return new Fornecedor(id, nomeFornecedor, cnpj, null, email, null, null);
	    }
	    

	    throw new IllegalArgumentException("Nenhum caso válido foi encontrado para criar o objeto Fornecedor.");
	}
	public static FornecedorFormRequest fromModel(Fornecedor fornecedor) {
		return new FornecedorFormRequest(fornecedor.getId(), fornecedor.getNomeFornecedor(), fornecedor.getCnpj(), fornecedor.getCpf(), fornecedor.getEmail(), fornecedor.getRg(),fornecedor.getData_Nascimento());
	}
	
	
}
