import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRole } from '../common/types/types';
import { randomUUID } from 'crypto';
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
  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: randomUUID(),
      login: createUserDto.login,
      password: createUserDto.password,
      role: createUserDto.role || UserRole.VIEWER,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return null;
    }
    if (user.password !== updateUserDto.oldPassword) {
      return null;
    }
    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();
    return this.findOne(id);
  }

  remove(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return null;
    }
    this.users.splice(index, 1)[0];
    return this.findOne(id);
  }
}
