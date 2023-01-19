import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class EntryDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  start!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  duration!: string;
}
