package io.github.leandrotominay.demo.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.leandrotominay.demo.model.Fornecedor;

public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {

}
