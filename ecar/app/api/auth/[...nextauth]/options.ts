import type { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import AppleProvider from 'next-auth/providers/apple';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  // Check 'resources.md' for information about custom pages:
  pages: {
    signIn: '/auth/signup',
  // signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check verification email)
 // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID ?? "" as string,
      clientSecret: process.env.APPLE_SECRET ?? "" as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID ?? "" as string,
      clientSecret: process.env.FACEBOOK_SECRET ?? "" as string
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Sign In",
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
        } else {
          // Find user 'email' in MongoDB
          const user: any = { email: 'lol', password: 'pass'};
          };
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
      })
  ],
  callbacks: {
    async jwt({ token, user, session}) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      console.log('jwt callback', { token, user, session })
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      console.log('session callback', { session, token, user})
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  debug: process.env.NODE_ENV === 'development',
};