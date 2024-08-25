'use client'
import {ThemeProvider} from '@mui/material/styles'
import theme from '@/fe/app/styles/theme'
import {ReactNode} from 'react'
import {CssBaseline} from '@mui/material'

interface StyledRootProviderProps {
  children?: ReactNode
}

export function StyledRootProvider({children}: StyledRootProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <CssBaseline />
        {children}
      </>
    </ThemeProvider>
  )
}
