// Necessary import for AuthOptions
import type { NextAuthOptions } from 'next-auth';

// Database related imports
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from 'bcrypt'; // encrypt, decrypt passwords

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
    error: '/auth/error', // Error code passed in query string as ?error=
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
          throw new Error("Field is missing")
        }

      // Find user in db
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

      // Check if user exists in db
        if (!user) { 
          await prisma.$disconnect(); 
          throw new Error("Account does not exist");
          return null;
        }
      // Check if password matches db 
        const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword as string)
        if (!passwordsMatch) { 
          await prisma.$disconnect(); 
          throw new Error("Invalid email or password"); 
          return null;
        }

      // Return user if no errors
        await prisma.$disconnect();
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
    async jwt({ token, user, account }: any ) {
      // Redefine user.image for running check

      if (user) { // assigns 'token' info from 'user' in database
        token.id = user.id;
        token.fullName = user.fullName;
        token.bio = user.biography;
        token.image = 'yes';
        token.phoneNumber = user.phoneNumber;
        token.cars = user.cars;
        if (user.cars) { token.cars = [...user.cars]
        } else { token.cars = [''] }
      }
      if (account) { // allows 'token' access to third party 'account'
        token.accessToken = account.access_token;
      }
      await prisma.$disconnect();
      return token;
    },
    async session({ session, token }: any) {
    //session.user.id = token.id was purposefully omitted
      session.user.fullName = token.fullName;
      session.user.biography = token.bio;
      session.user.cars = [...token.cars];
      if (token.image != null && token.image != undefined) {
        session.user.image = 'true';
      }
      await prisma.$disconnect();
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  debug: process.env.NODE_ENV === 'development',
};