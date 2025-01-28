import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const authorization = request.headers.get("authorization");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

    if (!authorization) {
      return NextResponse.json(
        { error: "Token de autorização não fornecido" },
        { status: 401 }
      );
    }

    if (!apiUrl) {
      return NextResponse.json(
        { error: "URL da API não configurada" },
        { status: 500 }
      );
    }

    const response = await axios.get(`${apiUrl}/orderlist`, {
      params: {
        datefrom: searchParams.get("datefrom"),
        dateto: searchParams.get("dateto"),
        Page: searchParams.get("Page"),
        PageSize: searchParams.get("PageSize"),
        orderid: searchParams.get("orderid"),
        pagination: searchParams.get("pagination"),
      },
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "Erro ao buscar pedidos:",
        error.response?.data || error.message
      );

      console.error("URL completa:", error.config?.url);
      console.error("Parâmetros:", error.config?.params);
      console.error("Headers:", error.config?.headers);

      return NextResponse.json(
        { error: "Erro ao buscar pedidos", details: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
