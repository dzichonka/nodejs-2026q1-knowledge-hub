import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { ArticleModule } from 'src/article/article.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
  imports: [forwardRef(() => ArticleModule)],
})
export class CommentModule {}
