import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { describe, beforeEach, it, expect, jest } from '@jest/globals';
import { ArticleService } from '../article/article.service';
import { CommentService } from '../comment/comment.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockArticleService = {
    clearField: jest.fn(),
  };

  const mockCommentService = {
    removeByUserId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ArticleService, useValue: mockArticleService },
        { provide: CommentService, useValue: mockCommentService },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create user', () => {
    const dto = { login: 'test', password: 'test' };
    const result = { id: '1', ...dto };

    mockUserService.create.mockReturnValue(result);

    const response = controller.create(dto);

    expect(mockUserService.create).toHaveBeenCalledWith(dto);
    expect(response).toBe(result);
  });

  it('should return all users', () => {
    const result = [{ id: '1' }];

    mockUserService.findAll.mockReturnValue(result);

    const response = controller.findAll();

    expect(response).toBe(result);
  });

  it('should return user by id', () => {
    const id = 'user-id';
    const result = { id };

    mockUserService.findOne.mockReturnValue(result);

    const response = controller.findOne(id);

    expect(mockUserService.findOne).toHaveBeenCalledWith(id);
    expect(response).toBe(result);
  });

  it('should return null if user not found', () => {
    const id = 'user-id';

    mockUserService.findOne.mockReturnValue(null);

    const response = controller.findOne(id);

    expect(response).toBeNull();
  });

  it('should update user', () => {
    const id = 'user-id';
    const dto = { oldPassword: 'test', newPassword: 'newtest' };
    const result = { id, ...dto };

    mockUserService.update.mockReturnValue(result);

    const response = controller.update(id, dto);

    expect(mockUserService.update).toHaveBeenCalledWith(id, dto);
    expect(response).toBe(result);
  });

  it('should remove user and cleanup relations', () => {
    const id = 'user-id';

    const response = controller.remove(id);

    expect(mockArticleService.clearField).toHaveBeenCalledWith('authorId', id);
    expect(mockCommentService.removeByUserId).toHaveBeenCalledWith(id);
    expect(mockUserService.remove).toHaveBeenCalledWith(id);
    expect(response).toBeUndefined();
  });
});
