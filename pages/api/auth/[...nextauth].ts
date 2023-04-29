import {NextAuthOptions} from "next-auth";
import NextAuth from "next-auth"
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID || '',
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        })
    ],
    adapter: FirestoreAdapter(),
    pages: {
      signIn: '/auth/signin',
      signOut: '/',
    }
};

//export default NextAuth(authOptions);