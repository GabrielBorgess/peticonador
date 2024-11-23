import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

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