import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetEntryDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  startDate!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  endDate!: string;
}
