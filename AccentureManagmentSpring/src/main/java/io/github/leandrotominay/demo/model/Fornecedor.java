package io.github.leandrotominay.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "fornecedor")
public class Fornecedor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nomefornecedor", length = 150)
	private String nomeFornecedor;
	
	@Column(name = "cnpj", length = 25)
	private String cnpj;
	
	@Column(name= "cpf", length = 25)
	private String cpf;
	
	@Column(name= "email", length = 150)
	private String email;
	
	@Column(name= "rg", length = 25)
	private String rg;
	
	@Column(name= "data_nascimento", length = 25)
	private String data_Nascimento;
	
	
	
	public Fornecedor() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Fornecedor(String nomeFornecedor, String cnpj, String cpf, String email, String rg, String data_Nascimento) {
		super();
		this.nomeFornecedor = nomeFornecedor;
		this.cnpj = cnpj;
		this.cpf = cpf;
		this.email = email;
		this.rg = rg;
		this.data_Nascimento = data_Nascimento;
	}



	public Fornecedor(Long id, String nomeFornecedor, String cnpj, String cpf, String email, String rg,
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
		return "Fornecedor [id=" + id + ", nomeFornecedor=" + nomeFornecedor + ", cnpj=" + cnpj + ", cpf=" + cpf
				+ ", email=" + email + ", rg=" + rg + ", data_Nascimento=" + data_Nascimento + "]";
	}}



	

