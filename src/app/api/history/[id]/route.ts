import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const historico = await prisma.historicoSolicitacao.findMany({
      where: {
        solicitacaoId: Number(id),
      },
      include: {
        usuario: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(historico);
  } catch (error) {
    console.error('Erro ao buscar histórico de solicitação:', error);
    return NextResponse.json({ error: 'Erro ao buscar histórico de solicitação' }, { status: 500 });
  }
}
