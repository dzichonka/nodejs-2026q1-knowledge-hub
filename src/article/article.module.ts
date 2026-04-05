import { forwardRef, Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { CommentModule } from '../comment/comment.module';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
  imports: [forwardRef(() => CommentModule)],
})
export class ArticleModule {}
