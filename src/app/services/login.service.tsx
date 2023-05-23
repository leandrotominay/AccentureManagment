import { httpClient } from 'app/http';
import { AxiosResponse } from 'axios';

const resourceURL: string = "/api/login";

export const useUsuarioService = () => {
  const autenticar = async (usuario: { login: string, senha: string }): Promise<boolean> => {
    try {
      const response: AxiosResponse = await httpClient.get(resourceURL);
      const usuarios = response.data; // Supondo que a resposta seja uma lista de usuários

      const autenticado = usuarios.some((u: any) => u.login === usuario.login && u.senha === usuario.senha);

      return autenticado;
    } catch (error) {
      console.error(error);
      return false; // Autenticação falhou
    }
  };

  return {
    autenticar,
  };
};
