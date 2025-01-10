import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;

    // Converte FormData para URLSearchParams
    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("username", formData.get("username") as string);
    params.append("password", formData.get("password") as string);

    const response = await axios.post(authUrl || "", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "Erro na autenticação:",
        error.response?.data || error.message
      );
      return NextResponse.json(
        { error: "Erro na autenticação" },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
