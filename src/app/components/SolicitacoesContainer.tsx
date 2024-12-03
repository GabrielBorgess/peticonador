'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'


interface Solicitacao {
    id: number;
    type: string;
    desciption: string;
    status: string;
    createdAt: Date;
}

export default function SolicitacoesContainer() {
    const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);

    useEffect(() => {
        const fetchSolicitacoes = async () => {
            try {
                const response = await fetch('/api/solicitacoes');
                const data = await response.json();
                setSolicitacoes(data.solicitacoes);
            } catch (error) {
                console.log("Erro ao buscar solicitacoes")
            }
        }

        fetchSolicitacoes();
    }, [])

    if (!Array.isArray(solicitacoes)) {
        return <div>Erro ao carregar as solicitações</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Lista de Solicitações</h2>
            {solicitacoes.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 text-left">ID</th>
                            <th className="py-2 px-4 text-left">Tipo</th>
                            <th className="py-2 px-4 text-left">Descrição</th>
                            <th className="py-2 px-4 text-left">Status</th>
                            <th className="py-2 px-4 text-left">Data</th>
                            <th className="py-2 px-4 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitacoes.map((solicitacao) => (
                            <tr key={solicitacao.id} className="border-t border-gray-200">
                                <td className="py-2 px-4">{solicitacao.id}</td>
                                <td className="py-2 px-4">{solicitacao.type}</td>
                                <td className="py-2 px-4">{solicitacao.desciption}</td>
                                <td className="py-2 px-4">{solicitacao.status}</td>
                                <td className="py-2 px-4">{new Date(solicitacao.createdAt).toLocaleDateString()}</td>
                                <td className="py-2 px-4">
                                <Link href={`/pages/dashboard/editar/${solicitacao.id}`}>editar
                                </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>Não há solicitações</div>
            )}
        </div>
    )
}
