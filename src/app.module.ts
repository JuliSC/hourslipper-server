import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { TogglModule } from "./external-interfaces/toggl/toggl.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    ),
    UsersModule,
    AuthModule,
    TogglModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
