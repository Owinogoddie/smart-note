import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider,auth } from '@clerk/nextjs'
import {redirect} from 'next/navigation'
import { ThemeProvider } from '@/components/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })
import {Toaster} from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'AI-Scribe',
  description: 'The intelligent note-taking-app',
  icons:{
    icon:[
      {
        media:"(prefers-color-scheme: dark)",
        url:"/fav-white.png",
        href:"/fav-white.png",
      },
      {
        media:"(prefers-color-scheme: light)",
        url:"/fav-black.png",
        href:"/fav-black.png",
      },
    ]
  }
}

export default function RootLayout({

  children,
}: {
  children: React.ReactNode
}) {
  const {userId}=auth()
  // if(userId){
  //   redirect('notes')
  // }
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster/>
            {children}
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  )
}
