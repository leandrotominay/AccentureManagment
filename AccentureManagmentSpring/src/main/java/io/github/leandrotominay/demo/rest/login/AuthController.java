package io.github.leandrotominay.demo.rest.login;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login")
@CrossOrigin("*")
public class AuthController {

  @PostMapping("/login")
  public ResponseEntity<?> autenticarUsuario(@RequestBody UsuarioCredentials credenciais) {
    // Verificar as credenciais no banco de dados ou serviço de autenticação
    // Implemente a lógica de autenticação adequada aqui
    if (credenciais.getLogin().equals("usuario") && credenciais.getSenha().equals("senha")) {
      // Credenciais válidas, retorna uma mensagem de sucesso
      String mensagem = "Autenticação bem-sucedida";
      return ResponseEntity.ok().body(mensagem);
    } else {
      // Credenciais inválidas, retorna uma mensagem de erro
      String mensagem = "Credenciais inválidas";
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(mensagem);
    }
  }

}

