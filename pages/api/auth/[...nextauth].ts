import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import GoogleProvider from 'next-auth/providers/google'
import Stripe from 'stripe'

const prisma = new PrismaClient()

export const authOptions = {
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 10000, // Timeout in milliseconds (10 seconds)
      },

      authorization: {
        params: {
          scope: 'profile email',
        },
      },
    }),
  ],

  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15',
      })
      //Lets create a stripe customer

      const costumer = await stripe.customers.create({
        email: user.email,
        name: user.name,
      })
      //Also update our prisma user with the stripecustomerid
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: costumer.id },
      })
    },
  },
}

export default NextAuth(authOptions)
