import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'Content is required' })
  @IsString({ message: 'Content must be a string' })
  content: string;

  @IsNotEmpty({ message: 'Article ID is required' })
  @IsUUID('4', { message: 'Article ID must be a valid UUID' })
  articleId: string;

  @IsUUID('4', { message: 'Author ID must be a valid UUID' })
  @IsOptional()
  authorId: string | null;
}
