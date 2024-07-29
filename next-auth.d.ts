import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      admin: boolean;
      avatar: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    password?: string;
    admin: boolean;
    avatar: string | null;
  }
}
