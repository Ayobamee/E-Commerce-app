import './globals.css'
import Nav from './components/Nav'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Hydrate from './components/Hydrate'
import { Roboto } from '@next/font/google'

//Define main font
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] })

export const metadata = {
  title: 'Quales Ecommerce App',
  description: 'E-commerce App',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //Fetch the user
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <html lang='en'>
      <body className={`mx-64 ${roboto.className}`}>
        <Hydrate>
          <Nav user={session?.user} expires={session?.expires as string} />
          {children}
        </Hydrate>
      </body>
    </html>
  )
}
