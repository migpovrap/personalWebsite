import { ReactNode } from 'react'
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { Metadata } from 'next'
import { ThemeProvider } from '@/provider/ThemeProvider';
import "../styles/globals.css";

export const metadata: Metadata = {
  title: 'Miguel Raposo',
  description: 'My Personal Portfolio!',
  icons: "/fox_icon.svg",
}

export default function Layout({ children }: { children: ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
            <main>{children}</main>
          <Footer year={currentYear}/>
        </ThemeProvider>
      </body>
    </html>
  )
}
