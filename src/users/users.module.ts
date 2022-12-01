import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CryptService } from "src/crypt/crypt.service";
import { User, UserSchema } from "./entities/user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, CryptService],
  exports: [UsersService],
})
export class UsersModule {}
