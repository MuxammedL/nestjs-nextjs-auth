import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../../users/users.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET")!,
    });
  }

  validate(payload: JwtPayload) {
    const user = this.usersService.findById(payload.sub);
    return {
      id: payload.sub,
      email: payload.email,
      role: user.role || "user",
      fullName: user.fullName,
    };
  }
}

interface JwtPayload {
  sub: number;
  email: string;
}
