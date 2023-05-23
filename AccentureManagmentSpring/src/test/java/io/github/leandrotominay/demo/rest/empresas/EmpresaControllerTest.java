package io.github.leandrotominay.demo.rest.empresas;

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
public class EmpresaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetLista() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/empresas"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(Matchers.greaterThan(1)));
        // Verifique o resultado esperado para a lista de empresas vazia
    }

    @Test
    public void testGetById() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/empresas/{id}", 20))
        .andExpect(MockMvcResultMatchers.status().isOk());
        // Verifique o resultado esperado para o ID de empresa inexistente
    }

    @Test
    public void testSalvar() throws Exception {
        String empresaJson = "{ \"nomeFantasia\": \"Empresa JUnit\", \"cnpj\": \"12.230.933/0001-00\", \"cep\": \"02692-000\" }";
        mockMvc.perform(MockMvcRequestBuilders.post("/api/empresas")
                .contentType(MediaType.APPLICATION_JSON)
                .content(empresaJson))
                .andExpect(MockMvcResultMatchers.status().isOk());
                
        // Verifique o resultado esperado para salvar uma nova empresa
        // A cada teste mude o CNPJ, pois não é permitido duplicidade nos campos do banco
    }


    @Test
    public void testAtualizar() throws Exception {
        String empresaJson = "{ \"nomeFantasia\": \"Empresa Atualizada\", \"cnpj\": \"56.500.911/0001-00\", \"cep\": \"01692-000\" }";
        mockMvc.perform(MockMvcRequestBuilders.put("/api/empresas/{id}", 20) // <-- ID da Empresa
                .contentType(MediaType.APPLICATION_JSON)
                .content(empresaJson))
                .andExpect(MockMvcResultMatchers.status().isOk());
        // Verifique o resultado esperado para atualizar uma empresa existente
    }

    @Test
    public void testDeletar() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/empresas/{id}", 24)) // <-- ID da Empresa
                .andExpect(MockMvcResultMatchers.status().isNoContent());
        // Verifique o resultado esperado para deletar uma empresa existente
    }
}
