import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    console.log(request)
  
    if (!session) {
        console.log("Não autenticado");
      return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
    }
  
    if (session.user?.role !== "ADMIN") {
        console.log("Acesso negado");
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
    }
    
    console.log("CRC criado com sucesso");
    return NextResponse.json({ message: "CRC criado com sucesso" }, { status: 200 });
  }