import "express";

declare global {
  namespace Express {
    interface User {
      email: stirng;
      role: "admin" | "user";
    }
    interface Request {
      user?: {
        email: stirng;
        role: "admin" | "user";
      };
    }
  }
}
