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
  nomeAutor: string;
  respostas: Resposta[];
}

const token = localStorage.getItem("token");

class TopicoService {
  static async adicionarTopico(data: { titulo: string; mensagem: string; autorId: number }) {
    const response = await axios.post(`${TOPICO_API_URL}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async listarTopicos(page: number, size: number, sort: string) {
    const response = await axios.get<{
      content: TopicoResponse[];
      totalElements: number;
    }>(`${TOPICO_API_URL}`, {
      params: { page, size, sort },
      withCredentials: true,
    });
    return response.data;
  }

  static async deletarTopico(topicoId: number) {
    await axios.delete(`${TOPICO_API_URL}/${topicoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  

}

export default TopicoService;
