import { Controller, Get, Post } from "@nestjs/common";
import { AppService } from "src/app.service";
import { User } from "src/schemas/user.schema";
import { UsersService } from "src/services/users.service";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  registerUser(): User {
    return this.usersService.registerUser();
  }
}
