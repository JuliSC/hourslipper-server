import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Entry } from "src/@types/entry";
import { EntryDTO } from "./dto/entry.dto";
import { SheetsService } from "./sheets.service";

@ApiTags("Google Sheets")
@Controller("sheets")
export class SheetsController {
  constructor(private readonly sheetsService: SheetsService) {}

  @Post()
  async getEntries(@Body() body: EntryDTO): Promise<Entry[] | undefined> {
    return this.sheetsService.getEntries(body);
  }
}
