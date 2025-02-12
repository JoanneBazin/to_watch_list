import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import prisma from "@/utils/script";
import { generateAccessToken, generateRefreshToken } from "@/utils/auth";

async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: token.refreshToken }),
      }
    );

    if (!response.ok) throw new Error("Failed to refresh access token");

    const refreshedToken = await response.json();

    return {
      ...token,
      accessToken: refreshedToken.accessToken,
      refreshToken: refreshedToken.refreshToken ?? token.refreshToken,
      accessTokenExpires: Date.now() + 60 * 60 * 1000,
    };
  } catch (error) {
    console.error("Error refreshing access token: ", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

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
        console.log("Credentials received: ", credentials);
        if (!credentials?.email || !credentials?.password) return null;

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
      console.log("JWT callback: ", token, user);

      if (user) {
        return {
          sub: user.id,
          accessToken: generateAccessToken(user.id),
          refreshToken: generateRefreshToken(user.id),
          accessTokenExpires: Date.now() + 60 * 60 * 1000,
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      console.log("Session callback: ", session, token);

      if (token.error === "RefreshAccessTokenError") {
        return {
          ...session,
          error: "RefreshAccessTokenError",
        };
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub || "",
        },
        accessToken: token.accessToken,
      };
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
