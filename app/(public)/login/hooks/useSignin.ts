import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { FormSchema } from "../types/form";
import type { FormData } from "../types/form";
import axios from "axios";
import { useUserStore } from "@/store/user-store";
import * as jose from "jose";

export const useSignin = () => {
  const setUser = useUserStore((state) => state.setUser);
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: FormData) {
    try {
      const params = new URLSearchParams();
      params.append("grant_type", "password");
      params.append("username", data.username.trim());
      params.append("password", data.password);

      const response = await axios.post(
        process.env.NEXT_PUBLIC_AUTH_URL || "",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data.access_token) {
        const token = response.data.access_token;
        Cookies.set("auth-token", token, { expires: 1 });

        const decodedToken = jose.decodeJwt(token);

        setUser({
          iss: decodedToken.iss,
          sub: decodedToken.sub,
          iat: decodedToken.iat,
          userid: decodedToken.userid as string,
          exp: decodedToken.exp,
          envId: decodedToken.envId as string,
        });

        window.location.href = "/";
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
