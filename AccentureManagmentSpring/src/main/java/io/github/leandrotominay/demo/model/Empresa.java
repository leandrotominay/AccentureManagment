package io.github.leandrotominay.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "empresa")
public class Empresa {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nomefantasia", length = 150)
	private String nomeFantasia;
	
	@Column(name = "cnpj", length = 150)
	private String cnpj;
	
	@Column(name= "cep", length = 150)
	private String cep;
	
	public Empresa() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Empresa(Long id, String nomeFantasia, String cnpj, String cep) {
		super();
		this.id = id;
		this.nomeFantasia = nomeFantasia;
		this.cnpj = cnpj;
		this.cep = cep;
	}

	public Empresa(String nomeFantasia, String cnpj, String cep) {
		super();
		this.nomeFantasia = nomeFantasia;
		this.cnpj = cnpj;
		this.cep = cep;
	}


	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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

	@Override
	public String toString() {
		return "Empresa [id=" + id + ", nomeFantasia=" + nomeFantasia + ", cnpj=" + cnpj + ", cep=" + cep + "]";
	}
	
	
	
	

}
