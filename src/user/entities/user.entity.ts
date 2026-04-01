import { Exclude } from 'class-transformer';
import { UserRole } from 'src/common/types/types';

export class User {
  id: string;
  login: string;
  @Exclude()
  password: string;
  role: UserRole;
  createdAt: number;
  updatedAt: number;
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
