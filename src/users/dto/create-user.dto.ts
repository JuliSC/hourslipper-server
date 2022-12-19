import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isAdmin!: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password!: string;

  accountSettings?: {
    apiKey: string;
    hoursAppend: string;
    dateHeader: string;
    hoursHeader: string;
    dateFormat: string;
    separator: string;
    weekdayFormat: string;
    language: string;
  };
}
