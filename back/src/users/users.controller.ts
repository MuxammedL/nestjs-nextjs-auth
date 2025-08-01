import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}
  @Get()
  getAll() {
    return this.usersServices.findAll();
  }
}
