import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ArticleStatus } from 'src/common/types/types';

export class CreateArticleDto {
  @IsNotEmpty({ message: 'Title must not be empty' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content must not be empty' })
  content: string;

  @IsEnum(ArticleStatus, {
    message: 'Status must be one of the following: draft, published, archived',
  })
  @IsOptional()
  status: ArticleStatus;

  @IsOptional()
  @IsUUID('4', { message: 'Author ID must be a valid UUID v4' })
  authorId: string | null;

  @IsOptional()
  @IsUUID('4', { message: 'Category ID must be a valid UUID v4' })
  categoryId: string | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: string[] | [];
}
