import { ApiProperty } from "@nestjs/swagger/dist";

export class UpdateSettingsDTO {
  @ApiProperty()
  apiKey: string;
  @ApiProperty()
  hoursAppend: string;
  @ApiProperty()
  dateHeader: string;
  @ApiProperty()
  hoursHeader: string;
  @ApiProperty()
  dateFormat: object;
  @ApiProperty()
  separator: string;
  @ApiProperty()
  weekdayFormat: object;
  @ApiProperty()
  language: object;
}
