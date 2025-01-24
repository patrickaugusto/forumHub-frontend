import axios from "axios";
import { Resposta } from "./RespostaService";

const TOPICO_API_URL = "https://forumhub-production.up.railway.app/topicos";


export interface TopicoResponse {
  id: number;
  titulo: string;
  mensagem: string;
  dataCriacao: string;
  status: string;
  autorId: number;
  respostas: Resposta[];
}

class TopicoService {
  static async adicionarTopico(data: { titulo: string; mensagem: string; autorId: number }) {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${TOPICO_API_URL}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async listarTopicos(page: number, size: number, sort: string) {
    const token = localStorage.getItem("token");
    const response = await axios.get<{
      content: TopicoResponse[];
      totalElements: number;
    }>(`${TOPICO_API_URL}`, {
      params: { page, size, sort },
      withCredentials: true,
    });
    return response.data;
  }
}

export default TopicoService;
