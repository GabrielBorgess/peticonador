import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import bcrypt from 'bcryptjs'


export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
  
    if (!session) {
        console.log("Não autenticado");
      return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
    }
  
    if (session.user?.role !== "ADMIN") {
        console.log("Acesso negado");
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
    }
    
    else {
      const body = await request.json()
      const {name, email, password} = body;
      const hashedPassword = await bcrypt.hash(password, 10)

      try {
        const newUser = await prisma.user.create({
          data: {
            name,
            email,
            passwordHash: hashedPassword,
            role: "CRC"
          }
        });

        console.log(newUser)
        return NextResponse.json({ newUser }, { status: 201 });
      } catch (error) {
        console.log(error)
      }
    }
  }