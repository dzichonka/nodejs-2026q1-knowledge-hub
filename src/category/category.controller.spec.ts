import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';
import { ArticleService } from '../article/article.service';

describe('CategoryController', () => {
  let controller: CategoryController;

  const mockCategoryService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockArticleService = {
    clearField: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
        {
          provide: ArticleService,
          useValue: mockArticleService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create category', () => {
    const dto = { name: 'test', description: 'some description' };
    const result = { id: '1', ...dto };

    mockCategoryService.create.mockReturnValue(result);

    const response = controller.create(dto);

    expect(mockCategoryService.create).toHaveBeenCalledWith(dto);
    expect(response).toBe(result);
  });

  it('should return all categories', () => {
    const result = [{ id: '1', name: 'test' }];

    mockCategoryService.findAll.mockReturnValue(result);

    const response = controller.findAll();

    expect(mockCategoryService.findAll).toHaveBeenCalled();
    expect(response).toBe(result);
  });

  it('should return category by id', () => {
    const id = 'category-id';
    const result = { id };

    mockCategoryService.findOne.mockReturnValue(result);

    const response = controller.findOne(id);

    expect(mockCategoryService.findOne).toHaveBeenCalledWith(id);
    expect(response).toBe(result);
  });

  it('should update category', () => {
    const id = 'category-id';
    const dto = { name: 'updated' };
    const result = { id, ...dto };

    mockCategoryService.update.mockReturnValue(result);

    const response = controller.update(id, dto);

    expect(mockCategoryService.update).toHaveBeenCalledWith(id, dto);
    expect(response).toBe(result);
  });

  it('should remove category and clear article field', () => {
    const id = 'category-id';

    mockCategoryService.remove.mockReturnValue(undefined);

    const response = controller.remove(id);

    expect(mockArticleService.clearField).toHaveBeenCalledWith(
      'categoryId',
      id,
    );
    expect(mockCategoryService.remove).toHaveBeenCalledWith(id);
    expect(response).toBeUndefined();
  });
});
