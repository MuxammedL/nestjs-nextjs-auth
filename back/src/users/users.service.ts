import { NotFoundException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";

export class UsersService {
  private users: User[] = [];
  private idCounter = 0;
  findAll = () => {
    return this.users;
  };

  async create(
    fullName: string,
    email: string,
    password: string,
    role: "admin" | "user"
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(
      this.idCounter++,
      fullName,
      email,
      hashedPassword,
      role
    );
    this.users.push(user);
    return user;
  }

  findById = (id: number) => {
    const user = this.users.find((user) => user.id == id);
    if (!user) throw new NotFoundException(`User with ID ${id} can not found`);
    return user;
  };

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email == email);
    return user;
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}
