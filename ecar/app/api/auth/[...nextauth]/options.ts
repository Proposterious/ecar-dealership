// Necessary import for AuthOptions
import type { NextAuthOptions } from 'next-auth';

// Database related imports
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

// List of OAuth providers
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import DiscordProvider from 'next-auth/providers/discord';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

// NextAuthOptions configuration
export const authOptions: NextAuthOptions = {
  // Check 'resources.md' for information about custom pages:
  pages: {
    signIn: '/auth/login',
  // signOut: '/auth/register',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check verification email)
 // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Sign In",
      credentials: {
        username: {
          label: "Username",
          type: "name",
          placeholder: "Enter Your Username"
        },
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
      async authorize(credentials: any) {
        return credentials;
      }
      }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID ?? "" as string,
      clientSecret: process.env.FACEBOOK_SECRET ?? "" as string
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string
    })
    
  ],
  // callbacks: {
  //   async jwt({ token, user, session}) {
  //     // Persist the OAuth access_token and or the user id to the token right after signin
  //     console.log('jwt callback', { token, user, session })
  //     return token
  //   },
  //   async session({ session, token, user }) {
  //     // Send properties to the client, like an access_token and user id from a provider.
  //     console.log('session callback', { session, token, user})
  //     return session;
  //   }
  // },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  debug: process.env.NODE_ENV === 'development',
};