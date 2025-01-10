import axios from "axios";
import Cookies from "js-cookie";
import https from "https";

// Criando uma instância personalizada do Axios
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10000,
  headers: {
    "Content-Type": "application/json",
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Permite certificados auto-assinados
  }),
});

// Interceptador para requisições
api.interceptors.request.use(
  (config) => {
    // Adiciona o token básico de autenticação
    const basicToken = Cookies.get("basic-auth");
    if (basicToken) {
      config.headers.Authorization = basicToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptador para respostas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Aqui você pode tratar erros comuns, como 401, 403, etc.
    if (error.response?.status === 401) {
      // Remove os tokens e redireciona para login
      Cookies.remove("auth-token");
      Cookies.remove("basic-auth");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Configuração global para permitir certificados auto-assinados
axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export default api;
