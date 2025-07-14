import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDTO } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}
  async login(loginDTO: LoginDto) {
    const user = this.usersService.findByEmail(loginDTO.email);
    if (!user) {
      throw new UnauthorizedException("Invalid email or password!");
    }
    const isPasswordValid = await this.usersService.validatePassword(
      user,
      loginDTO.password
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password!");
    }
    const payload = {
      email: loginDTO.email,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        fullName: user.fullName,
        role: user.role,
        email: user.email,
      },
    };
  }

  async register(registerDto: RegisterDTO) {
    const existingUser = this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new UnauthorizedException("This email is already used");
    }
    const user = await this.usersService.create(
      registerDto.fullName,
      registerDto.email,
      registerDto.password,
      registerDto.role
    );
    const payload = {
      email: registerDto.email,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
