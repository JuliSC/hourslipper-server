import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtToken } from "src/auth/auth.service";
import { CryptService } from "src/crypt/crypt.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UpdateSettingsDTO } from "./dto/update.settings.dto";
import {
  LeanUserDocument,
  User,
  UserDocument,
  UserOmitPasswordHash,
} from "./entities/user.schema";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private cryptService: CryptService,
    private jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDTO): Promise<UserOmitPasswordHash> {
    const hash = await this.cryptService.hash(createUserDto.password);

    const user = {
      username: createUserDto.username.trim(),
      isAdmin: createUserDto.isAdmin,
      email: createUserDto.email.toLowerCase().trim(),
      passwordHash: hash,
      settings: {
        apiKey: "",
        hoursAppend: "",
        dateHeader: "",
        hoursHeader: "",
        dateFormat: {
          name: "DD-MM-YYYY",
          value: "en-UK",
        },
        separator: "",
        weekdayFormat: {
          name: "Not included",
          value: "none",
        },
        language: {
          name: "English",
          value: "en-US",
        },
      },
    };

    const createdUser = await this.userModel.create(user);

    return createdUser;
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id);
  }

  async update(id: string, updateUserDTO: UpdateUserDTO) {
    return this.userModel.findByIdAndUpdate(id, updateUserDTO);
  }

  async updateSettings(token: string, settings: UpdateSettingsDTO) {
    const decodedToken = this.jwtService.decode(token) as JwtToken;
    const id = decodedToken.sub;
    return this.userModel.findByIdAndUpdate(id, { settings });
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async findOneWithPasswordHash(
    email: string
  ): Promise<LeanUserDocument | undefined> {
    const user = await this.userModel
      .findOne({
        email,
      })
      .exec();
    return user;
  }
}
