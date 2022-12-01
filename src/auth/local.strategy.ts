import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User, UserOmitPasswordHash } from "src/users/entities/user.schema";
import { Request } from "express";

export type AuthenticatedRequest = Request & { user: User };

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "email" });
  }

  async validate(
    email: string,
    password: string
  ): Promise<UserOmitPasswordHash> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException("Wrong email or password");
    }
    return user;
  }
}
