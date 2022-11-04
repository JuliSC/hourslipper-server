import { Injectable } from "@nestjs/common";
import { User } from "src/schemas/user.schema";

@Injectable()
export class UsersService {
  getHello(): string {
    return "Hello World!";
  }

  registerUser(): User {
    return;
  }
}
