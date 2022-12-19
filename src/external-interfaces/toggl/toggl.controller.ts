import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Entry } from "src/@types/entry";
import { GetEntryDTO } from "./dto/get-entry.dto";
import { TogglService } from "./toggl.service";

@ApiTags("toggl")
@Controller("toggl")
export class TogglController {
  constructor(private readonly togglService: TogglService) {}

  @Post()
  async getEntries(@Body() body: GetEntryDTO): Promise<Entry[] | undefined> {
    return this.togglService.getEntries(body);
  }
}
