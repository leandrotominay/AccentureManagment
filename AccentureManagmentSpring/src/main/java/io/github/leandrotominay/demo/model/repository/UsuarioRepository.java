package io.github.leandrotominay.demo.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.leandrotominay.demo.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByLoginAndSenha(String login, String senha);
}
