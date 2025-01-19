import axios from "axios";

const API_URL = "http://localhost:1234/auth";

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
  static async login(data: LoginRequest): Promise<LoginResponse> {
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

  static async register(data: RegisterRequest): Promise<RegisterResponse> {
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
