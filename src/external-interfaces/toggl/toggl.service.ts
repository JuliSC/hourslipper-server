import { Injectable } from "@nestjs/common";
import axios from "axios";
import { Entry } from "src/@types/entry";
import { GetEntryPassUserDTO } from "./dto/get-entry-pass-user.dto";
import { GetEntryDTO } from "./dto/get-entry.dto";

@Injectable()
export class TogglService {
  async getEntries(body: GetEntryDTO): Promise<Entry[] | undefined> {
    console.log(body.startDate, body.endDate);

    const entries: Entry[] | undefined = await axios(
      "https://api.track.toggl.com/api/v8/time_entries",
      {
        method: "GET",
        params: {
          start_date: `${body.startDate}T00:00:00+00:00`,
          end_date: `${body.endDate}T23:59:59+00:00`,
        },
        auth: {
          username: body.username,
          password: "api_token",
        },
      }
    ).then(res => {
      return res.data;
    });

    return entries;
  }

  async getEntriesNameAndPass(
    body: GetEntryPassUserDTO
  ): Promise<Entry | undefined> {
    const entries: Entry | undefined = await axios(
      "https://api.track.toggl.com/api/v8/time_entries",
      {
        method: "GET",
        params: {
          start_date: `${body.startDate}T00:00:00+00:00`,
          end_date: `${body.endDate}T23:59:59+00:00`,
        },
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${body.username}:${body.password}`
          ).toString("base64")}`,
        },
      }
    ).then(res => {
      console.log(res.data);
      return res.data;
    });

    return entries;
  }
}
