import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextApiRequest, NextApiResponse } from "next";


export default async function  handler(req: NextApiRequest, res: NextApiResponse){
    const session = await getServerSession(req, res, authOptions);

    if(!session){
        return res.status(401).json({message: "Não autenticado"});
    }

    if(session.user?.role !== "ADMIN"){
        return res.status(403).json({message: "Acesso negado"})
    }

    if(req.method === "POST"){
        res.send({message: "CRC criado com sucesso"})
    }
}