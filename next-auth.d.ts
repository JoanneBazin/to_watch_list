import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      admin: boolean;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    password?: string;
    admin: boolean;
  }
}
