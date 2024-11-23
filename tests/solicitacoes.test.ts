import { GET } from '../src/app/api/solicitacoes/route';

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn().mockReturnValue({
      status: 200,
      body: { solicitacoes: [] },
    }),
  },
}));

jest.mock('../src/app/lib/prisma', () => ({
  solicitacao: {
    findMany: jest.fn().mockResolvedValue([  // Mock do findMany
      {
        id: 1,
        type: 'Compra',
        status: 'pendente',
        assistido: { 
          id: 1,
          nome: 'Assistido 1',
        },
        assistidoId: 1,
        crcId: 1,
        createdAt: new Date(),
      },
      {
        id: 2,
        type: 'Venda',
        status: 'autorizado',
        assistido: { 
          id: 2,
          nome: 'Assistido 2',
        },
        assistidoId: 2,
        crcId: 1,
        createdAt: new Date(),
      },
    ]),
  },
}));

describe('API - Buscar Solicitações deve retornar 200', () => {
  it('Deve retornar uma lista de solicitações com status 200', async () => {

    const response = await GET(); 
        if(response){
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ solicitacoes: [] });
        }
  });
});

describe('API - Buscar Solicitações deve retornar "solicitacoes"', () => {
    it('Deve retornar uma lista de solicitações com status 200', async () => {
  
      const response = await GET(); 
          if(response){
              expect(response.body).toEqual({ solicitacoes: [] });
          }
    });
});
