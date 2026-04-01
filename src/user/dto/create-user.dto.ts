import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../common/types/types';

export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
