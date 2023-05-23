package io.github.leandrotominay.demo.rest.fornecedores;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.leandrotominay.demo.model.Empresa;
import io.github.leandrotominay.demo.model.Fornecedor;
import io.github.leandrotominay.demo.model.repository.EmpresaRepository;
import io.github.leandrotominay.demo.model.repository.FornecedorRepository;
import io.github.leandrotominay.demo.rest.empresas.EmpresaFormRequest;

@RestController
@RequestMapping("/api/fornecedores")
@CrossOrigin("*")
public class FornecedorController {

	@Autowired
	private FornecedorRepository repository; 
	
	@GetMapping
	public List<FornecedorFormRequest> getLista(){
		return repository.findAll().stream()
				.map( FornecedorFormRequest::fromModel )
				.collect(Collectors.toList()); 			
	}
	
	@GetMapping("{id}")
	public ResponseEntity<FornecedorFormRequest> getById(@PathVariable Long id) {
		Optional<Fornecedor> fornecedorExistente = repository.findById(id);
		
		if(fornecedorExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		FornecedorFormRequest empresa = fornecedorExistente.map(FornecedorFormRequest::fromModel).get();
		return ResponseEntity.ok(empresa);
		}
	
	
	@PostMapping
	public FornecedorFormRequest salvar( @RequestBody FornecedorFormRequest fornecedor) {
		
			Fornecedor entidadeFornecedor = fornecedor.toModel();
			repository.save(entidadeFornecedor);
			return FornecedorFormRequest.fromModel(entidadeFornecedor);
	}
	
	//api/produtos/id 11:04 39
	@PutMapping("{id}")
	public ResponseEntity<Void> atualizar(@PathVariable Long id, @RequestBody FornecedorFormRequest fornecedor ) {
		Optional<Fornecedor> fornecedorExistente = repository.findById(id);
		if(fornecedorExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		Fornecedor entidade = fornecedor.toModel();
		fornecedor.setId(id);
		repository.save(entidade);
		
		return ResponseEntity.ok().build();
	}
	
	//api/fornecedores
	@DeleteMapping("{id}")
	public ResponseEntity<Void> deletar( @PathVariable Long id){
		Optional<Fornecedor> fornecedorExistente = repository.findById(id);
		
		if(fornecedorExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		repository.delete(fornecedorExistente.get());
		return ResponseEntity.noContent().build();
		
	}

	

}
