import { Injectable } from "@nestjs/common";
import axios from "axios";
import { Entry } from "src/@types/entry";
import { EntryDTO } from "./dto/entry.dto";

@Injectable()
export class TogglService {
  async getEntries(body: EntryDTO): Promise<string | undefined> {
    return "OK 200";
  }
}
