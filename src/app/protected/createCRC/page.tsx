import CreateCRCForm from '@/app/components/CreateCRCForm'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1>Create CRC</h1>
      <CreateCRCForm />
    </div>
  )
}

export default page