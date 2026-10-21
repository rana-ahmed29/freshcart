import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { signInUser } from "@/services/auth.services";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 }, // 7 days
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // signInUser throws the API message if the login fails
        const data = await signInUser({
          email: credentials.email,
          password: credentials.password,
        });

        return {
          id: data.user.email,
          user: data.user,
          token: data.token,
        };
      },
    }),
  ],

  callbacks: {
    // the token is saved here, inside the encrypted cookie (server side only)
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }

      // update({ name, email }) from the Settings page
      if (trigger === "update" && session && token.user) {
        const name =
          typeof session.name === "string" ? session.name.trim() : "";
        const email =
          typeof session.email === "string" ? session.email.trim() : "";

        token.user = {
          ...token.user,
          ...(name ? { name } : {}),
          ...(email ? { email } : {}),
        };
      }

      return token;
    },

    // the session gets ONLY the user, no token
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};
