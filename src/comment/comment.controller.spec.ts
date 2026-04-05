import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { ArticleService } from '../article/article.service';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';

describe('CommentController', () => {
  let controller: CommentController;

  const mockCommentService = {
    getByArticleId: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  };

  const mockArticleService = {
    findForComments: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        {
          provide: CommentService,
          useValue: mockCommentService,
        },
        {
          provide: ArticleService,
          useValue: mockArticleService,
        },
      ],
    }).compile();

    controller = module.get<CommentController>(CommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return comments by articleId', () => {
    const articleId = 'test-article-id';
    const result = [{ id: '1', articleId }];

    mockCommentService.getByArticleId.mockReturnValue(result);

    const response = controller.getComments({ articleId });

    expect(response).toBe(result);
    expect(mockCommentService.getByArticleId).toHaveBeenCalledWith(articleId);
  });

  it('should return comment by id', () => {
    const id = 'comment-id';
    const result = { id };

    mockCommentService.findOne.mockReturnValue(result);

    const response = controller.getCommentById(id);

    expect(response).toBe(result);
    expect(mockCommentService.findOne).toHaveBeenCalledWith(id);
  });

  it('should create comment', () => {
    const dto = {
      content: 'test',
      articleId: 'article-id',
      authorId: null,
    };

    const result = { id: '1', ...dto };

    mockArticleService.findForComments.mockReturnValue(true);
    mockCommentService.create.mockReturnValue(result);

    const response = controller.create(dto);

    expect(mockArticleService.findForComments).toHaveBeenCalledWith(
      dto.articleId,
    );
    expect(mockCommentService.create).toHaveBeenCalledWith(dto);
    expect(response).toBe(result);
  });

  it('should remove comment', () => {
    const id = 'comment-id';

    mockCommentService.remove.mockReturnValue(undefined);

    const response = controller.remove(id);

    expect(mockCommentService.remove).toHaveBeenCalledWith(id);
    expect(response).toBeUndefined();
  });
});
