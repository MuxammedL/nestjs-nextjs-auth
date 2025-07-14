import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    console.log("Attempting to refresh access token...");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_BASE_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Token refresh failed:", response.status, errorData);
      throw new Error(`Refresh failed: ${response.status}`);
    }

    const refreshedTokens: RefreshTokenResponse = await response.json();

    // Decode the new token to get expiration
    const decoded = jwtDecode<{ exp: number }>(refreshedTokens.access_token);

    console.log(
      "Token refreshed successfully, expires at:",
      new Date(decoded.exp * 1000)
    );

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: decoded.exp * 1000,
      error: undefined, // Clear any previous errors
    };
  } catch (error) {
    console.error("Refresh token error:", error);

    // Return token with error flag - this will trigger re-authentication
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials &&
          typeof credentials.email === "string" &&
          typeof credentials.password === "string"
        ) {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_SERVER_BASE_URL}/auth/login`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: credentials.email,
                  password: credentials.password,
                }),
              }
            );

            if (!res.ok) {
              console.error("Login failed:", res.status);
              return null;
            }

            const parsed: LoginResponse = await res.json();

            return {
              ...parsed.user,
              accessToken: parsed.access_token,
            };
          } catch (error) {
            console.error("Login error:", error);
            return null;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      // Initial sign in
      if (user) {
        try {
          const decoded = jwtDecode<{ exp: number }>(user.accessToken);

          return {
            accessToken: user.accessToken,
            accessTokenExpires: decoded.exp * 1000,
            user: {
              id: user.id,
              fullName: user.fullName,
              email: user.email ?? "",
              role: user.role,
            },
          };
        } catch (error) {
          console.error("Error decoding initial token:", error);
          return token;
        }
      }

      // Return previous token if the access token has not expired yet
      // Add buffer time (e.g., 5 minutes) to refresh before actual expiration
      const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds
      const now = Date.now();
      const expiresAt = (token.accessTokenExpires as number) || 0;

      if (now < expiresAt - bufferTime) {
        return token;
      }

      // Access token has expired or is about to expire, try to refresh it
      console.log("Token expired or expiring soon, refreshing...");
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.accessToken = token.accessToken;
        session.user = token.user;
        session.error = token.error;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
    updateAge: 23 * 60 * 60,
  },
  jwt: {
    maxAge: 23 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});
