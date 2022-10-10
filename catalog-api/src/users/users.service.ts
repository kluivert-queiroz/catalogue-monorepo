import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.dto';
import { User, UserDocument } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async findById(id: string): Promise<User> {
    return (await this.userModel.findById(id)).toObject();
  }
  async findByUsername(username: string): Promise<User> {
    return (await this.userModel.findOne({ username })).toObject();
  }
  async create(userData: CreateUserInput) {
    const { username } = userData;
    const existingUser = await this.findByUsername(username);
    if (existingUser)
      throw new HttpException(
        'User with this username already exist.',
        HttpStatus.BAD_REQUEST,
      );
    const hashedPassword = await hash(userData.password, 10);
    const createdUser = new this.userModel({
      ...userData,
      password: hashedPassword,
    });
    return createdUser.save();
  }
}
