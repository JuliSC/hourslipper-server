import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "src/users/users.service";
import { UserOmitPasswordHash } from "src/users/entities/user.schema";

export type JwtAuthenticatedRequest = Request & {
  user: UserOmitPasswordHash;
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private userService: UsersService) {
    console.log("whack");

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("TOKEN_SECRET"),
    });
  }

  async validate(payload: {
    sub: string;
    email: string;
  }): Promise<UserOmitPasswordHash | undefined> {
    console.log(payload);

    console.log(payload.sub);

    return await this.userService.findOne(payload.sub);
  }
}
