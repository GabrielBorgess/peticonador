// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
      id: string;
      email: string | null | undefined; 
      role: string | null | undefined; 
    }
  
    interface Session {
      user: {
        id: string;
        email: string | null | undefined; 
        role: string | null | undefined;  
      };
    }
  
    interface JWT {
      id: string;
      email: string | null | undefined;  
      role: string | null | undefined;   
    }
  }
