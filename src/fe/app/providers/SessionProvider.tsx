'use client'
import {SessionProvider as SessionProviderContainer} from 'next-auth/react'
import {ReactNode} from 'react'

interface SessionProviderProps {
  children: ReactNode
}

export function SessionProvider({children}: SessionProviderProps) {
  return <SessionProviderContainer>{children}</SessionProviderContainer>
}
