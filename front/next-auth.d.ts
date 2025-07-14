import { DefaultUser } from "next-auth";
// Extend the types without directly using the imports
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: string;
    user: DefaultUser & {
      id: string;
      fullName: string;
      email: string;
      role: string;
    };
  }

  interface User extends DefaultUser {
    id: string;
    fullName: string;
    email: string;
    role: string;
    accessToken: string;
    refreshToken?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    accessTokenExpires: number;
    error?: string;
    user: {
      id: string;
      fullName: string;
      email: string;
      role: string;
    };
  }
}
