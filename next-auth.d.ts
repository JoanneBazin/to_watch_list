import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    password?: string;
    admin: boolean;
    avatar?: string | null;
  }

  interface JWT {
    sub?: string;
  }
}
