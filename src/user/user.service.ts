import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from '../common/types/types';
import { randomUUID } from 'crypto';
import { User } from './entities/user.entity';
import { isUUID } from 'class-validator';
import { ArticleService } from 'src/article/article.service';
@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: 'aec40a79-983c-487a-be9b-6ffff661a8c0',
      login: 'Erwin Rudolf Josef Alexander Schrödinger',
      password: 'catIsAlive',
      role: UserRole.VIEWER,
      createdAt: 1775041279468,
      updatedAt: 1775041279468,
    },
    {
      id: 'aec40a79-983c-487a-be9b-6ffff661a8c1',
      login: 'Mark Zuckerberg',
      password: 'facebook',
      role: UserRole.ADMIN,
      createdAt: 1775041279469,
      updatedAt: 1775041279469,
    },
  ];

  constructor(private readonly articleService: ArticleService) {}

  private findIndexById(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('User with the given id not found');
    }
    return index;
  }
  create(createUserDto: CreateUserDto) {
    const newUser: User = new User({
      id: randomUUID(),
      login: createUserDto.login,
      password: createUserDto.password,
      role: createUserDto.role ?? UserRole.VIEWER,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format for id');
    }
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User with the given id not found');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format for id');
    }
    const user = this.findOne(id);
    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Old password does not match');
    }
    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();
    return this.findOne(id);
  }

  remove(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format for id');
    }
    const index = this.findIndexById(id);
    this.users.splice(index, 1);
    this.articleService.clearAuthor(id);
  }
}
