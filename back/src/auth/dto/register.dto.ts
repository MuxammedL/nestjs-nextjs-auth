import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { Transform } from "class-transformer";

enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export class RegisterDTO {
  @Transform(({ value }: { value: string | undefined }) =>
    value?.trim()?.toLowerCase()
  )
  @IsEmail({}, { message: "Email must be valid" })
  email: string;

  @IsNotEmpty({ message: "Full name is required" })
  @IsString({ message: "Full name must be a string" })
  @MinLength(3, { message: "Full name must be at least 3 characters" })
  @MaxLength(50, { message: "Full name must not exceed 50 characters" })
  fullName: string;

  @IsNotEmpty({ message: "Password is required" })
  @MinLength(8, { message: "Password must be at least 8 characters" })
  @MaxLength(32, { message: "Password must not exceed 32 characters" })
  @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      "Password too weak. Must include upper, lower, number and special char",
  })
  password: string;

  @IsEnum(UserRole, { message: "Role must be either user or admin" })
  role: UserRole;
}
