import axios from "axios";

const API_URL = "https://forumhub-production.up.railway.app/auth";

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  id: number;
  token: string;
}

export interface RegisterRequest {
    nome: string;
    email: string;
    senha: string;
}

export interface RegisterResponse{
  text: string
}

class AuthService {
  static async login(data: LoginRequest) {
    try {
      const response = await axios.post<LoginResponse>(`${API_URL}/login`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }

  static async register(data: RegisterRequest) {
    try {
      const response = await axios.post<RegisterResponse>(`${API_URL}/register`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer o cadastro:", error);
      throw error;
    }
  }

}

export default AuthService;
