'use client'
import {ThemeOptions} from '@mui/material/styles'
import {Roboto} from 'next/font/google'
import {createTheme} from '@mui/material/styles'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#da6a00',
    },
    success: {
      main: '#38b73e',
    },
  },
}

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  ...themeOptions,
})

export default theme
