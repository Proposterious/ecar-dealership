// Default imports
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/content/SessionProvider';
// Component imports
import Navbar from '../components/content/navbar'
import Information from '../components/content/information'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'eCar Dealership',
  description: 'Mock online car dealership created with Next.js by Vercel',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <head>
      <link rel="shortcut icon" type="image/x-icon" href="../public/ecar-logo.ico" />
      </head>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <header>
            <Navbar />
          </header>  
          {children}
          <footer>
            <Information />
          </footer>
        </SessionProvider>
      </body>
    </html>
  )
}
