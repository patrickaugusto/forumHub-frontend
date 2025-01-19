import axios from "axios";

const TOPICO_API_URL = "http://localhost:1234/topicos";

export interface TopicoResponse {
  id: number;
  titulo: string;
  mensagem: string;
  dataCriacao: string;
  status: string;
  autorId: number;
}

class TopicoService {
  static async adicionarTopico(data: { titulo: string; mensagem: string; autorId: number }) {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${TOPICO_API_URL}/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async listarTopicos(page: number, size: number, sort: string) {
    const token = localStorage.getItem("token");
    const response = await axios.get<{ content: TopicoResponse[] }>(`${TOPICO_API_URL}/listar`, {
      params: { page, size, sort },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}

export default TopicoService;
