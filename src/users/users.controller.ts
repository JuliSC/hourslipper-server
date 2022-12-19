import {
  Controller,
  Get,
  Post,
  Headers,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { AuthService } from "src/auth/auth.service";
import { AdminGuard } from "src/auth/admin.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UpdateSettingsDTO } from "./dto/update.settings.dto";
import { Header } from "@nestjs/common/decorators/http/header.decorator";
import { ApiTags } from "@nestjs/swagger/dist";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Post()
  async create(
    @Body() createUserDTO: CreateUserDTO,
    @Headers("Authorization") auth: string
  ) {
    const isCreatingAdminUser = createUserDTO.isAdmin;

    if (isCreatingAdminUser) {
      if (auth) {
        const token = auth.split(" ")[1];
        const isAdmin = await this.authService.isAdminToken(token);

        if (!isAdmin) {
          throw new HttpException("Forbidden", 403);
        }
      } else {
        throw new HttpException("Forbidden", 403);
      }
    }
    const user = await this.usersService.create(createUserDTO);
    const loggedInUser = await this.authService.login(user);

    return loggedInUser;
  }

  @UseGuards(JwtAuthGuard)
  @Patch("settings")
  async updateSettings(
    @Headers("Authorization") auth: string,
    @Body() settings: UpdateSettingsDTO
  ) {
    return this.usersService.updateSettings(auth.split(" ")[1], settings);
  }

  @UseGuards(AdminGuard)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(
    @Headers("Authorization") auth: string,
    @Body() updateUserDTO: UpdateUserDTO
  ) {
    return this.usersService.update(auth.split(" ")[1], updateUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async remove(@Headers("Authorization") auth: string) {
    return this.usersService.remove(auth.split(" ")[1]);
  }
}
