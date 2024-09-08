import {AuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {prisma} from '@/be/prisma/prisma-client'
import {compare} from 'bcrypt'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        const values = {
          email: credentials.email,
        }

        const user = await prisma.user.findUnique({
          where: values,
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password,
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET_KEY ?? '',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    // 24 hours
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    newUser: '/',
  },
  callbacks: {
    async signIn({account}) {
      return account?.provider === 'credentials'
    },
    async jwt({token}) {
      if (!token.email) {
        return token
      }

      const findUser = await prisma.user.findUnique({
        where: {
          email: token.email,
        },
      })

      if (findUser) {
        token.id = String(findUser.id)
        token.email = findUser.email
        token.name = findUser.name
      }

      return token
    },
  },
}
