import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { describe, beforeEach, it, expect } from '@jest/globals';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleService],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
