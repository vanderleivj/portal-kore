import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { FormSchema } from "../types/form";
import type { FormData } from "../types/form";
import { useUserStore } from "@/store/user-store";
import * as jose from "jose";
import api from "@/lib/axios";

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

      const response = await api.post(
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
        setCookie("auth-token", token, { maxAge: 60 * 60 * 24 }); // 24 horas

        const decodedToken = jose.decodeJwt(token);

        setUser({
          iss: decodedToken.iss as string,
          sub: decodedToken.sub as string,
          iat: decodedToken.iat as number,
          userid: decodedToken.userid as string,
          exp: decodedToken.exp as number,
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
