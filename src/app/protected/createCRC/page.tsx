import CreateCRCForm from '@/app/components/CreateCRCForm'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>    
      <Link href={'/protected/dashboard'} className='absolute p-6 font-bold'> Go back</Link>
      <div className='flex flex-col justify-center items-center h-screen'>
        <CreateCRCForm />
      </div>
    </>
  )
}

export default page