import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { FormSchema, FormData } from "../types/form";

function createBasicAuthToken(username: string, password: string): string {
  const token = Buffer.from(`${username}:${password}`).toString("base64");
  return `Basic ${token}`;
}

export const useSignin = () => {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: FormData) {
    try {
      const formData = new URLSearchParams();
      formData.append("grant_type", "password");
      formData.append("username", data.username.trim());
      formData.append("password", data.password);

      const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;
      console.log("URL de autenticação:", authUrl);

      const response = await axios.post(authUrl || "", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.data.access_token) {
        // Salva o token de acesso
        Cookies.set("auth-token", response.data.access_token, { expires: 1 });

        // Cria e salva o token básico em base64
        const basicToken = createBasicAuthToken(
          data.username.trim(),
          data.password
        );
        Cookies.set("basic-auth", basicToken, { expires: 1 });

        router.push("/");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      form.setError("root", {
        message: "Usuário ou senha inválidos",
      });
    }
  }

  return { form, onSubmit };
};
