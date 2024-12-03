import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import React from 'react'

interface PagesLayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

const PagesLayout = async ({children}: PagesLayoutProps) => {

    const session = await getServerSession(authOptions);

    if(!session || !session.user?.email) {
        console.log("Usuario não autenticado")
        return (
            redirect('/auth/signIn')
        )
    }

  return (
    <>
        {children}
    </>
  );
}

export default PagesLayout