import axios from "axios";

const USUARIO_API_URL = "https://forumhub-production.up.railway.app/usuarios";

export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
}

const token = localStorage.getItem("token");
const usuarioId = Number(localStorage.getItem("userId"));

class UsuarioService {
  static async buscarUsuarioPorId(): Promise<UsuarioResponse> {
    if (!usuarioId) {
      throw new Error("Usuário não autenticado. Redirecionando para login.");
    }
    const response = await axios.get<UsuarioResponse>(
      `${USUARIO_API_URL}/id/${usuarioId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    
    return response.data;
  }

  static async atualizarUsuario(editedName: string, email: string) {
    const updatedData = { 
      nome: editedName,
      email: email
    }
    const response = await axios.put(
      `${USUARIO_API_URL}/${usuarioId}`,
      updatedData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
}

export default UsuarioService;
