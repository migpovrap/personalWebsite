import { ReactNode } from 'react'
import Script from 'next/script';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { Metadata } from 'next'
import { ThemeProvider } from '@/context/ThemeContext';
import '@/styles/globals.css';

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
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="2529bf0c-6663-49e4-bae9-30a4f15de5f7"
          strategy="afterInteractive"
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
            <main>{children}</main>
          <Footer year={currentYear}/>
        </ThemeProvider>
      </body>
    </html>
  )
}
