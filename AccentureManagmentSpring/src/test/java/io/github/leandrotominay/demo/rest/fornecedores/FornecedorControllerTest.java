package io.github.leandrotominay.demo.rest.fornecedores;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
public class FornecedorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetLista() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/fornecedores"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(Matchers.greaterThan(0)));
        // Verifique o resultado esperado para as listas de fornecedores vazias
    }

    @Test
    public void testGetById() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/fornecedores/{id}", 1))
        .andExpect(MockMvcResultMatchers.status().isOk());
        // Verifique o resultado esperado para o ID do fornecedor inexistente
    }

    @Test
    public void testSalvar() throws Exception {
        String fornecedorJson = "{ \"nomeFornecedor\": \"Fornecedor 5\", \"cnpj\": \"74.424.444/4444-44\", \"cpf\": \"744.544.443-44\", \"email\": \"ramosleandro53@gmail.com\", \"rg\": \"84.444.434-4\", \"data_Nascimento\": \"01/09/2020\" }";
    mockMvc.perform(MockMvcRequestBuilders.post("/api/fornecedores")
                .contentType(MediaType.APPLICATION_JSON)
                .content(fornecedorJson))
                .andExpect(MockMvcResultMatchers.status().isOk());
                
        // Verifique o resultado esperado para salvar um novo fornecedor
        // A cada teste mude o CNPJ, RG e CPF, pois não é permitido duplicidade nos campos do banco
    }


    @Test
    public void testAtualizar() throws Exception {
        String fornecedorJson = "{ \"nomeFornecedor\": \"Fornecedor 4 Atualizado\", \"cnpj\": \"24.454.444/4444-44\", \"cpf\": \"144.544.444-44\", \"email\": \"ramosleandro53@gmail.com\", \"rg\": \"14.444.444-4\", \"data_Nascimento\": \"01/09/2002\" }";

        mockMvc.perform(MockMvcRequestBuilders.put("/api/fornecedores/{id}", 4)
                .contentType(MediaType.APPLICATION_JSON)
                .content(fornecedorJson))
                .andExpect(MockMvcResultMatchers.status().isOk());
        // Verifique o resultado esperado para atualizar um fornecedor existente
    }


    @Test
    public void testDeletar() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/fornecedores/{id}", 5)) // <-- ID do Fornecedor
                .andExpect(MockMvcResultMatchers.status().isNoContent());
        // Verifique o resultado esperado para deletar um fornecedor existente
    }
}
