// Default imports
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth';
import Provider from '@/components/provider/Provider';
// Component imports
import Navbar from '../components/content/header/navbar'
import Information from '../components/content/footer/information'

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
  return (
    <html lang="en">
      <head>
      <link rel="icon" type="image/png" href="/ecar/public/car-dealership-logo.png" />
      </head>
      <Provider>
        <body className={inter.className}>
          <header>
            <Navbar />
          </header>  
          {children}
          <footer>
            <Information />
          </footer>
        </body>
      </Provider>
    </html>
  )
}
