import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CryptService } from "src/crypt/crypt.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { User, UserDocument } from "./entities/user.schema";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private cryptService: CryptService
  ) {}

  async create(createUserDto: CreateUserDTO) {
    const hash = await this.cryptService.hash(createUserDto.password);

    const user = {
      username: createUserDto.username,
      isAdmin: createUserDto.isAdmin,
      email: createUserDto.email.toLowerCase().trim(),
      passwordHash: hash,
    };

    const createdUser = new this.userModel(user);
    createdUser.save();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userNoPassword } = createdUser;

    return userNoPassword;
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

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async findOneWithPasswordHash(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({
      email: email.toLowerCase().trim(),
    });
  }
}
