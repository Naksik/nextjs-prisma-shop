import {ReactNode} from 'react'
import {getServerSession} from 'next-auth'
import {authOptions} from '@/be/constants/auth'
import {redirect} from 'next/navigation'

interface RootLayoutProps {
  children: ReactNode
}

export default async function AuthLayout({children}: RootLayoutProps) {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }

  return <main>{children}</main>
}
