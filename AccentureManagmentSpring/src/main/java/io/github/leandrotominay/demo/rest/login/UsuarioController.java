package io.github.leandrotominay.demo.rest.login;

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
import io.github.leandrotominay.demo.model.Usuario;
import io.github.leandrotominay.demo.model.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/login")
@CrossOrigin("*")
public class UsuarioController {

	@Autowired
	private UsuarioRepository repository;

	@GetMapping
	public List<UsuarioFormRequest> getLista() {
		return repository.findAll().stream().map(UsuarioFormRequest::fromModel).collect(Collectors.toList());
	}

	@GetMapping("{id}")
	public ResponseEntity<UsuarioFormRequest> getById(@PathVariable Long id) {
		Optional<Usuario> usuarioExistente = repository.findById(id);

		if (usuarioExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		UsuarioFormRequest usuario = usuarioExistente.map(UsuarioFormRequest::fromModel).get();
		return ResponseEntity.ok(usuario);
	}

	@PostMapping
	public UsuarioFormRequest salvar(@RequestBody UsuarioFormRequest usuario) {

		Usuario entidadeUsuario = usuario.toModel();
		repository.save(entidadeUsuario);
		return UsuarioFormRequest.fromModel(entidadeUsuario);
	}

	// api/login/id 
	@PutMapping("{id}")
	public ResponseEntity<Void> atualizar(@PathVariable Long id, @RequestBody UsuarioFormRequest usuario) {
		Optional<Usuario> usuarioExistente = repository.findById(id);
		if (usuarioExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		Usuario entidade = usuario.toModel();
		usuario.setId(id);
		repository.save(entidade);

		return ResponseEntity.ok().build();
	}

	// api/login
	@DeleteMapping("{id}")
	public ResponseEntity<Void> deletar(@PathVariable Long id) {
		Optional<Usuario> usuarioExistente = repository.findById(id);

		if (usuarioExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		repository.delete(usuarioExistente.get());
		return ResponseEntity.noContent().build();

	}

	public List<Usuario> buscarTodos() {
		return repository.findAll();
	}

}
