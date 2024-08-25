'use client'
import {ThemeProvider} from '@mui/material/styles'
import theme from '@/shared/styles/theme'
import {ReactNode} from 'react'
import {CssBaseline} from '@mui/material'

interface StyledRootProps {
  children?: ReactNode
}

export function StyledRoot({children}: StyledRootProps) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <CssBaseline />
        {children}
      </>
    </ThemeProvider>
  )
}
