import axios from "axios";

const RESPOSTA_API_URL = "https://forumhub-production.up.railway.app/respostas";

export interface Resposta {
    id: number;
    mensagem: string;
    topicoId: number;
    usuarioId: number;
    nomeUsuario: string;
    dataHora: string;
    curtida: number;
}

class RespostaService {

    static async adicionarResposta(data: { mensagem: string; topicoId: number; usuarioId: number }) {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${RESPOSTA_API_URL}`, data, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
    }

}

export default RespostaService;