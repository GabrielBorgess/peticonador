import AuthForm from '@/app/components/AuthForm'
import React from 'react'

const SignInPage = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
    <h1 className='text-3xl font-bold p-4'>PETICIONADOR</h1>
    <AuthForm />
    </div>
  )
}

export default SignInPage