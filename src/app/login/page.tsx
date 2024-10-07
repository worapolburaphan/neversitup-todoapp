import { Metadata } from 'next'
import React from 'react'
import { AuthContainer } from '@/features/authentication/components'

export const metadata: Metadata = {
  title: 'Login',
  description: 'NeverSitUp Assignment TODO App',
}

const LoginPage = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center">
      <AuthContainer />
    </div>
  )
}

export default LoginPage
