import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getNextAuthSecret, verifyAdminCredentials } from "@/lib/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  secret: getNextAuthSecret(),
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize(credentials) {
        const username =
          typeof credentials?.username === "string" ? credentials.username : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";

        if (!verifyAdminCredentials(username, password)) {
          return null;
        }

        return {
          id: "admin",
          name: "Admin",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
