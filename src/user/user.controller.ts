import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ArticleService } from 'src/article/article.service';
import { CommentService } from 'src/comment/comment.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly articleService: ArticleService,
    private readonly commentService: CommentService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.userService.findOne(id);
    if (!user) {
      return null;
    }
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.articleService.clearField('authorId', id);
    this.commentService.removeByUserId(id);
    return this.userService.remove(id);
  }
}
