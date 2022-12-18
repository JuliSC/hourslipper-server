import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { UserOmitPasswordHash } from "src/users/entities/user.schema";
import { LocalAuthGuard } from "./auth-local.guard";
import { AuthService } from "./auth.service";
import { CheckEmailDto } from "./dto/check-email.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { AuthenticatedRequest } from "./local.strategy";

export interface LoginResponse {
  accessToken: string;
  user: UserOmitPasswordHash;
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req: AuthenticatedRequest): Promise<LoginResponse> {
    return this.authService.login({
      ...req.user,
      email: req.body.email.toLowerCase(), // Case-insentitive compare.
    });
  }

  @Post("check-email")
  checkEmail(@Body() emailDto: CheckEmailDto): Promise<boolean> {
    return this.authService.validateEmail(emailDto.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get("verify")
  async verify(
    @Request() req: AuthenticatedRequest
  ): Promise<UserOmitPasswordHash> {
    return req.user;
  }
}
