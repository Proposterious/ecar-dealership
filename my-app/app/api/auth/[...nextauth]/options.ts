import type { NextAuthOptions } from 'next-auth'
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';

import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials'

const prisma = new PrismaClient;

export const authOptions: NextAuthOptions = {
  // Check 'resources.md' for information about custom pages:
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  providers:[
    GitHubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        credentials: {
          email: { 
            label: "Email", 
            type: "email", 
            placeholder: "test@test.com" 
          },
          password: { 
            label: "Password", 
            type: "password", 
            placeholder:"********" 
          }
        },
        async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials?.email || !credentials.password) {
            // Missing information returns 'null' for user
            return null
        }
        // Find user 'email' in prisma db
        const user = await prisma.user.findUnique({
          where:{
            email: credentials.email
          }
        })
        // Incorrect information returns 'null'
        if (!user) { return null }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )
        if (!isPasswordValid) {
          return null
        }
        return {
          id: user.id + '',
          email: user.email,
          name: user.name,
        }
      }
    }),
  ],
  session: {
    strategy: 'jwt'
  },
}