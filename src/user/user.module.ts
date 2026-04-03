import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ArticleModule } from 'src/article/article.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [ArticleModule],
})
export class UserModule {}
