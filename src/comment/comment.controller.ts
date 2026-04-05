import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpCode,
  ParseUUIDPipe,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentQueryDto } from './dto/get-comment-query.dto';
import { ArticleService } from '../article/article.service';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    @Inject(forwardRef(() => ArticleService))
    private readonly articleService: ArticleService,
  ) {}

  @Get()
  getComments(@Query() query: GetCommentQueryDto) {
    return this.commentService.getByArticleId(query.articleId);
  }

  @Get(':id')
  getCommentById(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ) {
    return this.commentService.findOne(id);
  }

  @Post()
  create(@Body() CreateCommentDto: CreateCommentDto) {
    this.articleService.findForComments(CreateCommentDto.articleId);
    return this.commentService.create(CreateCommentDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.commentService.remove(id);
  }
}
