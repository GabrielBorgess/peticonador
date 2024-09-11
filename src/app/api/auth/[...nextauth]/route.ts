import prisma from "@/app/lib/prisma";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },

      authorize: async(credentials) => {
        if(!credentials){
            return null
        }

        const {email, password} = credentials;

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(!user){
          return null
        }

        const userPassword = user.passwordHash

        const isValidPassword = bcrypt.compareSync(password, userPassword)

        if(!isValidPassword){
          return null
        }

        return {
          ...user,
          id: user.id.toString(),
        };
      }
    })
  ]
}

export default NextAuth(authOptions)