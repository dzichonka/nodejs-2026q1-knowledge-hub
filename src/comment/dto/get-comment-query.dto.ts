import { IsUUID, IsNotEmpty } from 'class-validator';

export class GetCommentQueryDto {
  @IsUUID()
  @IsNotEmpty()
  articleId: string;
}
