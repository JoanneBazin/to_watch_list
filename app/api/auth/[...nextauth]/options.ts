import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import prisma from "@/utils/script";

export const AuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar ? user.avatar.toString("base64") : null,
            admin: user.admin,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.accessTokenExpires = Date.now() + 60 * 60 * 24 * 7;
      }

      if (Date.now() > (token.accessTokenExpires as number)) {
        return { error: "Token expired" };
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || "";
      }

      if (token.error === "Token expired") {
        return null as unknown as Session;
      }

      return session || {};
    },
  },

  pages: {
    signIn: "/auth",
    error: "/signinError",
  },

  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
