import Footer from '@/components/Footer';
import './globals.css';
import Header from '@/components/Header';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

{/*//import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] })

//export const metadata: Metadata = {
  //title: 'CapsulePost - Your Daily News and Stories',
  //description: 'Get the latest news, stories, and updates from around the world.',
//}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
*/}



