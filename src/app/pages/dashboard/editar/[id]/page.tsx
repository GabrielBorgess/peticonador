'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Log {
  usuarioId: number;
  acao: string;
  description: string;
  status: string;
  createdAt: Date;
}

const EditarSolicitacao = () => {
  const params = useParams();
  const { id } = params;

  const [solicitacao, setSolicitacao] = useState(null);
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [history, setHistory] = useState<Log[]>([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/solicitacao/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setSolicitacao(data);
          setStatus(data.status);
          setDescription(data.description);
        })
        .catch((error) => console.error('Erro ao buscar solicitação:', error));

      fetch(`/api/history/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setHistory(data);
        })
        .catch((err) => console.error('Erro ao carregar histórico', err))
    }
  }, [id]);

  const handleSave = async () => {
    const updatedSolicitacao = { status, description, usuarioId: 1 };

    try {
      const response = await fetch(`/api/solicitacao/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSolicitacao),
      });

      if (response.ok) {
        alert('Solicitação atualizada com sucesso!');
      } else {
        alert('Erro ao atualizar solicitação.');
      }
    } catch (error) {
      console.error('Erro ao atualizar solicitação:', error);
    }
  };

  if (!solicitacao) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <Link href={'/pages/dashboard'} className='font-bold absolute p-6 top-0 left-0'>Voltar</Link>
      <div className="w-full max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Editar Solicitação</h1>

        {/* Formulário */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-10">
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Descrição:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="pendente">Pendente</option>
                <option value="aprovado">Aprovado</option>
                <option value="negado">Negado</option>
              </select>
            </div>
            <div>
              <button
                type="button"
                onClick={handleSave}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>

        {/* Histórico */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Histórico de Modificações</h2>
          {history.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="text-left bg-gray-200 text-gray-700">
                    <th className="py-3 px-4 border-b">Data</th>
                    <th className="py-3 px-4 border-b">Usuário</th>
                    <th className="py-3 px-4 border-b">Ação</th>
                    <th className="py-3 px-4 border-b">Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((log, index) => (
                    <tr key={index} className="text-gray-700 hover:bg-gray-100">
                      <td className="py-3 px-4 border-b">{new Date(log.createdAt).toLocaleString()}</td>
                      <td className="py-3 px-4 border-b">{log.usuarioId}</td>
                      <td className="py-3 px-4 border-b">{log.acao}</td>
                      <td className="py-3 px-4 border-b">{log.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">Nenhum histórico encontrado.</p>
          )}
        </div>
      </div>
    </div>

  );
};

export default EditarSolicitacao;
