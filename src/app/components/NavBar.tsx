import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';

const Navbar = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className='w-full px-4 py-8 bg-gray-300 flex flex-row items-center gap-4 absolute'>
            <Link href='/'>Home</Link>
            <Link href='/pages/dashboard'>Dashboard</Link>

            {session && session.user?.email ? (
                <>
                    <Link href='/auth/signOut'>Sign out</Link>
                    <p>
                        <b>Signed in as {session.user?.email}</b>
                    </p>
                </>
            ) : (
                <>
                    <Link href='/auth/signIn'>Sign in</Link>
                </>
            )}
        </div>
    );
};

export default Navbar;