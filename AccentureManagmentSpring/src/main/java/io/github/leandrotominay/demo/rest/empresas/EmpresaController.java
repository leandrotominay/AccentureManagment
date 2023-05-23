package io.github.leandrotominay.demo.rest.empresas;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import org.springframework.web.server.ResponseStatusException;

import io.github.leandrotominay.demo.model.Empresa;
import io.github.leandrotominay.demo.model.repository.EmpresaRepository;

@RestController
@RequestMapping("/api/empresas")
@CrossOrigin("*")
public class EmpresaController {

	@Autowired
	private EmpresaRepository repository; 
	
	@GetMapping
	public List<EmpresaFormRequest> getLista(){
		try {
			Thread.sleep(2300);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return repository.findAll().stream()
				.map( EmpresaFormRequest::fromModel )
				.collect(Collectors.toList()); 			
	}
	
	@GetMapping("{id}")
	public ResponseEntity<EmpresaFormRequest> getById(@PathVariable Long id) {
		Optional<Empresa> empresaExistente = repository.findById(id);
		
		if(empresaExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		EmpresaFormRequest empresa = empresaExistente.map(EmpresaFormRequest::fromModel).get();
		return ResponseEntity.ok(empresa);
		}
	
	@PostMapping
	public EmpresaFormRequest salvar( @RequestBody EmpresaFormRequest empresa) {
		
			Empresa entidadeEmpresa = empresa.toModel();
			repository.save(entidadeEmpresa);
			return EmpresaFormRequest.fromModel(entidadeEmpresa);
	}
	
	//api/produtos/id 11:04 39
	@PutMapping("{id}")
	public ResponseEntity<Void> atualizar(@PathVariable Long id, @RequestBody EmpresaFormRequest empresa ) {
		Optional<Empresa> empresaExistente = repository.findById(id);
		if(empresaExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		Empresa entidade = empresa.toModel();
		empresa.setId(id);
		repository.save(entidade);
		
		return ResponseEntity.ok().build();
	}
	
	//api/empresas
	@DeleteMapping("{id}")
	public ResponseEntity<Void> deletar( @PathVariable Long id){
		Optional<Empresa> empresaExistente = repository.findById(id);
		
		if(empresaExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		repository.delete(empresaExistente.get());
		return ResponseEntity.noContent().build();
		
	}

}
