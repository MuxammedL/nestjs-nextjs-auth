export class User {
  constructor(
    public id: number,
    public fullName: string,
    public email: string,
    public password: string,
    public role: "user" | "admin"
  ) {}
}
