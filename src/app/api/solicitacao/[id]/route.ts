import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
        return NextResponse.json({ message: "ID não fornecido" }, { status: 400 });
    }

    try {
        const solicitacao = await prisma.solicitacao.findUnique({
            where: { id: Number(id) },
        });

        if (!solicitacao) {
            return NextResponse.json({ message: "Solicitação não encontrada" }, { status: 404 });
        }

        return NextResponse.json({ solicitacao }, { status: 200 });
    } catch (error) {
        console.error('Erro ao buscar solicitação:', error);
        return NextResponse.json({ message: "Erro ao buscar" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
        return NextResponse.json({ message: "ID não fornecido" }, { status: 400 });
    }

    const body = await request.json();
    const { status, description } = body;

    try {
      const updatedSolicitacao = await prisma.solicitacao.update({
        where: { id: Number(id) },
        data: {
          status,
          desciption : description,
        },
      });

      return NextResponse.json({ updatedSolicitacao }, { status: 200 });
    } catch (error) {
      console.error('Erro ao atualizar solicitação:', error);
      return NextResponse.json({ message: "Erro ao buscar" }, { status: 500 });
    }
}