import type {Metadata} from 'next'
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter'
import {ReactNode} from 'react'
import {StyledRootProvider} from '@/fe/app/providers/StyledRootProvider'
import StoreProvider from '@/fe/app/providers/StoreProvider'
import {SessionProvider} from '@/fe/app/providers/SessionProvider'

interface RootLayoutProps {
  children?: ReactNode
}

const DEFAULT_TITLE = 'Simple Food Shop'

export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: 'The most delicious food and fast delivery',
}

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{DEFAULT_TITLE}</title>
      </head>
      <body>
        <AppRouterCacheProvider>
          <StyledRootProvider>
            <StoreProvider>
              <SessionProvider>{children}</SessionProvider>
            </StoreProvider>
          </StyledRootProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
