declare interface User {
  id: string;
  fullName: string;
  email: string;
  role: "admin" | "user";
}

declare interface LoginRequest {
  email: string;
  password: string;
}

declare interface RegisterRequest {
  email: string;
  fullName: string;
  password: string;
  password_confirmation: string;
  role: "user" | "admin";
}

declare interface LoginResponse {
  user: User;
  access_token: string;
}

declare interface RefreshTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

declare interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
