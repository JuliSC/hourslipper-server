import { IsNotEmpty, IsString } from "class-validator";

export class GetEntryDTO {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  startDate!: string;

  @IsNotEmpty()
  @IsString()
  endDate!: string;
}
