'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const EditarSolicitacao = () => {
  const params = useParams();
  const { id } = params;

  const [solicitacao, setSolicitacao] = useState(null);
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`/api/solicitacao/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setSolicitacao(data);
          setStatus(data.status); // Preenche o status atual
          setDescription(data.description); // Preenche a descrição atual
        })
        .catch((error) => console.error('Erro ao buscar solicitação:', error));
    }
  }, [id]);

  const handleSave = async () => {
    const updatedSolicitacao = { status, description };

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
    <div>
      <h1>Editar Solicitação</h1>
      <form>
        <div>
          <label>Descrição:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            cols={50}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pendente">Pendente</option>
            <option value="aprovado">Aprovado</option>
            <option value="negado">Negado</option>
          </select>
        </div>
        <div>
          <button type="button" onClick={handleSave}>Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default EditarSolicitacao;
