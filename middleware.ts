import withAuth from "next-auth/middleware";

export default withAuth(async function middleware(req) {}, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = { matcher: ["/suggestions", "/communauty", "/account"] };
