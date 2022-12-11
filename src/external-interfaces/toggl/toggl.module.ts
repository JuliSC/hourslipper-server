import { Module } from "@nestjs/common";
import { CryptService } from "src/crypt/crypt.service";
import { TogglController } from "./toggl.controller";
import { TogglService } from "./toggl.service";

@Module({
  controllers: [TogglController],
  providers: [TogglService, CryptService],
  exports: [TogglService],
})
export class TogglModule {}
