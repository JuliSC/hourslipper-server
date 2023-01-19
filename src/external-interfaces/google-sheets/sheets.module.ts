import { Module } from "@nestjs/common";
import { CryptService } from "src/crypt/crypt.service";
import { SheetsController } from "./sheets.controller";
import { SheetsService } from "./sheets.service";

@Module({
  controllers: [SheetsController],
  providers: [SheetsService, CryptService],
  exports: [SheetsService],
})
export class SheetsModule {}
