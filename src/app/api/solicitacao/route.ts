import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { type, descricao, assistidoId } = body;

        if (!type || !descricao || !assistidoId) {
            return NextResponse.json({ message: "Os campos obrigatórios não foram preenchidos" }, { status: 400 });
        }

        const assistido = await prisma.assistido.findUnique({
            where: {
                id: Number(assistidoId)
            }
        })

        if (!assistido) {
            return NextResponse.json({ message: "Assistido nao encontrado" }, { status: 404 });
        }

        const novaSolicitacao = await prisma.solicitacao.create({
            data: {
                type,
                desciption: descricao,
                assistidoId: Number(assistidoId)
            }
        });

        return NextResponse.json({ novaSolicitacao }, { status: 201 });

    } catch (error) {
        console.error("Erro ao criar solicitação", error);
        NextResponse.json({ message: "Erro ao criar solicitação" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const solicitacoes = await prisma.solicitacao.findMany({
            include: {
                assistido: true
            }
        });

        return NextResponse.json({ solicitacoes }, { status: 200 });
    } catch (error) {
        console.error("Erro ao buscar solicitações", error);
        NextResponse.json({ message: "Erro ao buscar solicitações" }, { status: 500 });
    }
}