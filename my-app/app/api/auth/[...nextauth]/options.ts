import type { NextAuthOptions } from 'next-auth'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from '@/app/lib/promise'

import GitHubProvider from 'next-auth/providers/github'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  // Check 'resources.md' for information about custom pages:
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check verification email)
  //   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  adapter: MongoDBAdapter(clientPromise),
  providers:[
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID ?? "",
      clientSecret: process.env.APPLE_SECRET ?? ""
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID ?? "",
      clientSecret: process.env.FACEBOOK_SECRET ?? ""
    })
    // CredentialsProvider({
    //     // The name to display on the sign in form (e.g. "Sign in with...")
    //     name: "Credentials",
    //     credentials: {
    //       email: { 
    //         label: "Email", 
    //         type: "email", 
    //         placeholder: "test@test.com" 
    //       },
    //       password: { 
    //         label: "Password", 
    //         type: "password", 
    //         placeholder:"********" 
    //       }
    //     },
    //     async authorize(credentials, req) {
    //     // Add logic here to look up the user from the credentials supplied
    //     if (!credentials?.email || !credentials.password) {
    //         // Missing information returns 'null' for user
    //         return null
    //     } else {
    //       // Find user 'email' in MongoDB
    //       const user = await mongoose.find({
    //         credentials.email,
    //         credentials.password,
    //         }
    //       })
    //       // Incorrect information returns 'null'
    //       if (!user) { return null }

    //       const isPasswordValid = await compare(
    //         credentials.password,
    //         user.password
    //       )
    //       if (!isPasswordValid) {
    //         return null
    //       }
    //       return {
    //         id: user.id + '',
    //         email: user.email,
    //         name: user.name,
    //       }
    //     }
    //   },
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
     const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    }
  }
}