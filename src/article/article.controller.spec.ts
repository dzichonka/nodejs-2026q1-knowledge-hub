import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';
import { CommentService } from '../comment/comment.service';

describe('ArticleController', () => {
  let controller: ArticleController;

  const mockArticleService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockCommentService = {
    removeByArticleId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: ArticleService,
          useValue: mockArticleService,
        },
        {
          provide: CommentService,
          useValue: mockCommentService,
        },
      ],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create article', () => {
    const dto = { title: 'test', content: 'some content' } as any;
    const result = { id: '1', ...dto };

    mockArticleService.create.mockReturnValue(result);

    const response = controller.create(dto);

    expect(mockArticleService.create).toHaveBeenCalledWith(dto);
    expect(response).toBe(result);
  });

  it('should return all articles', () => {
    const query = { search: 'test', page: 1, limit: 10 };
    const result = [{ id: '1' }];

    mockArticleService.findAll.mockReturnValue(result);

    const response = controller.findAll(query);

    expect(mockArticleService.findAll).toHaveBeenCalledWith(query);
    expect(response).toBe(result);
  });

  it('should return article by id', () => {
    const id = 'article-id';
    const result = { id };

    mockArticleService.findOne.mockReturnValue(result);

    const response = controller.findOne(id);

    expect(mockArticleService.findOne).toHaveBeenCalledWith(id);
    expect(response).toBe(result);
  });

  it('should update article', () => {
    const id = 'article-id';
    const dto = { title: 'updated' } as any;
    const result = { id, ...dto };

    mockArticleService.update.mockReturnValue(result);

    const response = controller.update(id, dto);

    expect(mockArticleService.update).toHaveBeenCalledWith(id, dto);
    expect(response).toBe(result);
  });

  it('should remove article and its comments', () => {
    const id = 'article-id';

    mockArticleService.remove.mockReturnValue(undefined);

    const response = controller.remove(id);

    expect(mockCommentService.removeByArticleId).toHaveBeenCalledWith(id);
    expect(mockArticleService.remove).toHaveBeenCalledWith(id);
    expect(response).toBeUndefined();
  });
});
