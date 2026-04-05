import { IsOptional, IsEnum, IsUUID, IsString } from 'class-validator';
import { ArticleStatus } from '../../common/types/types';

export class FindArticlesQueryDto {
  @IsOptional()
  @IsEnum(ArticleStatus, {
    message: 'status must be draft, published or archived',
  })
  status?: ArticleStatus;

  @IsOptional()
  @IsUUID('4', { message: 'categoryId must be a valid UUID' })
  categoryId?: string;

  @IsOptional()
  @IsString({ message: 'tag must be a string' })
  tag?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  sortBy?: string;

  @IsOptional()
  order?: 'asc' | 'desc';
}
