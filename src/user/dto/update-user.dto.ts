import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Old password must not be empty' })
  oldPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'New password must not be empty' })
  newPassword: string;
}
