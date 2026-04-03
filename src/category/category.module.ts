import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ArticleModule } from 'src/article/article.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [ArticleModule],
})
export class CategoryModule {}
