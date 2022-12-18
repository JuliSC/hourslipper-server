import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsBoolean()
  isAdmin!: boolean;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

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
