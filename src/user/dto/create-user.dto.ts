import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../common/types/types';

export class CreateUserDto {
  @IsString({ message: 'Login must be a string' })
  @IsNotEmpty({ message: 'Login must not be empty' })
  login: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password must not be empty' })
  password: string;

  @IsEnum(UserRole, {
    message: 'Role must be one of the following: admin, editor, viewer',
  })
  @IsOptional()
  role?: UserRole;
}
