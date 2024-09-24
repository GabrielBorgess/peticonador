import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

export default prisma;

async function main() {
    const hashedPassword = await bcrypt.hash('admin', 10)
  
    const admin = await prisma.user.upsert({
      where: { email: 'admin@gmail.com' },
      update: {},
      create: {
        name: 'Admin',
        email: 'admin@gmail.com',
        passwordHash: hashedPassword, 
        role: 'ADMIN',
      },
    })
    console.log({ admin })
  }
  
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })