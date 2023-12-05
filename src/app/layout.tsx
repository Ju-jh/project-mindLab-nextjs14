import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/header/page'
import { AuthProvider } from '@/app/context/isLogined'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

          <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                  <Header/>
                    {children}
                </AuthProvider>
            </body>
            </html>

  )
}
