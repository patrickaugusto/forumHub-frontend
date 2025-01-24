import axios from "axios";

const USUARIO_API_URL = "http://localhost:1234/usuarios";

export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
}

const token = localStorage.getItem("token");
const usuarioId = localStorage.getItem("userId");


class UsuarioService {
  static async buscarUsuarioPorId(): Promise<UsuarioResponse> {
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
