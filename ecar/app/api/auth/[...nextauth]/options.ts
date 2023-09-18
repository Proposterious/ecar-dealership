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
    signOut: '/auth/logout',
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
      // Check for missing credentials
        if (!credentials.email || !credentials.password ) {
          return null;
        }

      // Check if user exists in db
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

      // Return null if false
        if (!user) {return null;}
      // Check if password matches db 
        const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword)
        if (!passwordsMatch) { return null }

      // Return user if no errors
        return user;
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
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user) { // assigns 'token' info from 'user' in database
        token.id = user.id;
        token.fullName = user.fullName;
        token.bio = user.biography;
      }
      if (account) { // allows 'token' access to third party 'account'
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id; // gives session 'id' attribute
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  debug: process.env.NODE_ENV === 'development',
};