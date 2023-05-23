package io.github.leandrotominay.demo.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.leandrotominay.demo.model.Empresa;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

	
}
