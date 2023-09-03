import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials'

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
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder:"********" }
        },

        async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com", password: "lolwho12" }

        if (credentials?.username === user.name && credentials?.password === user.password) {
            // Returns user only if credentials details are correct
            return user
        } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
        }
    }),
  ],
  session: {
    strategy: 'jwt'
  },
}