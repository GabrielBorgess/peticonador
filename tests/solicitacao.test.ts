// import { GET } from '../src/app/api/solicitacoes/route';
// import { Request } from 'node-fetch'; 

// // Mock do NextResponse
// jest.mock('next/server', () => ({
//   NextResponse: {
//     json: jest.fn().mockReturnValue({
//       status: 200,
//       body: { solicitacao: null },  // Retorna um corpo fictício
//     }),
//   },
// }));

// // Mock do prisma
// jest.mock('../src/app/lib/prisma', () => ({
//     solicitacao: {
//       findUnique: jest.fn().mockResolvedValue({  // Mock do findUnique
//         id: 1,
//         type: 'Compra',
//         status: 'pendente',
//         assistido: { 
//           id: 1,
//           nome: 'Assistido 1',
//         },
//         assistidoId: 1,
//         crcId: 1,
//         createdAt: new Date(),
//       }),
//     },
//   }));

// // Teste para a API - Buscar Solicitação
// describe('API - Buscar Solicitação', () => {
//   it('Deve retornar a solicitação com status 200', async () => {
//     const request = new Request('https://example.com/solicitacoes/1');  // Simula uma URL com ID 1
//     const response = await GET();  // Chama a função GET

//     if (response) {
//       expect(response.status).toBe(200);
//       expect(response.body.solicitacao).toHaveProperty('id', 1);  // Verifica se a solicitação retornada tem o ID correto
//       expect(response.body.solicitacao).toHaveProperty('type', 'Compra');
//     }
//   });
// });

