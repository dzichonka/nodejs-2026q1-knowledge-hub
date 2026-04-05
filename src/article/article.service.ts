import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { randomUUID } from 'crypto';
import { ArticleStatus } from '../common/types/types';
import { FindArticlesQueryDto } from './dto/find-article-query.dto';

@Injectable()
export class ArticleService {
  articles: Article[] = [
    {
      id: 'bec40a79-983c-487a-be9b-6ffff661a8c0',
      title: 'First Article of Schrödinger',
      content:
        'If you open the box, the cat is alive. If you do not open the box, the cat is dead.',
      status: ArticleStatus.PUBLISHED,
      authorId: 'aec40a79-983c-487a-be9b-6ffff661a8c0',
      categoryId: 'cec40a79-983c-487a-be9b-6ffff661a8c0',
      tags: ['cat', 'quantum mechanics', 'physics'],
      createdAt: 1775041279470,
      updatedAt: 1775041279470,
    },
    {
      id: 'bec40a79-983c-487a-be9b-6ffff661a8c1',
      title: 'Second Article by Zuckerberg',
      content: 'I hate tiktok',
      status: ArticleStatus.DRAFT,
      authorId: 'aec40a79-983c-487a-be9b-6ffff661a8c1',
      categoryId: 'cec40a79-983c-487a-be9b-6ffff661a8c1',
      tags: ['tiktok', 'facebook', 'social media'],
      createdAt: 1775041279472,
      updatedAt: 1775041279472,
    },
  ];

  private findIndexById(id: string) {
    const index = this.articles.findIndex((article) => article.id === id);
    if (index === -1) {
      throw new NotFoundException('Article with the given id not found');
    }
    return index;
  }

  clearField(field: 'authorId' | 'categoryId', id: string) {
    this.articles = this.articles.map((article) => {
      if (article[field] === id) {
        return { ...article, [field]: null };
      }
      return article;
    });
  }

  create(createArticleDto: CreateArticleDto) {
    const newArticle: Article = new Article({
      id: randomUUID(),
      title: createArticleDto.title,
      content: createArticleDto.content,
      status: createArticleDto.status ?? ArticleStatus.DRAFT,
      authorId: createArticleDto.authorId ?? null,
      categoryId: createArticleDto.categoryId ?? null,
      tags: createArticleDto.tags ?? [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    this.articles.push(newArticle);
    return newArticle;
  }
  findForComments(articleId: string) {
    const article = this.articles.find((article) => article.id === articleId);
    if (!article) {
      throw new UnprocessableEntityException('Article does not exist');
    }
    return article;
  }

  findAll(query: FindArticlesQueryDto) {
    let filtered = this.articles;

    if (query.status)
      filtered = filtered.filter((a) => a.status === query.status);
    if (query.categoryId)
      filtered = filtered.filter((a) => a.categoryId === query.categoryId);
    if (query.tag)
      filtered = filtered.filter((a) => a.tags?.includes(query.tag));

    if (query.sortBy) {
      const order = query.order === 'desc' ? -1 : 1;
      filtered = filtered.sort((a, b) => {
        if (a[query.sortBy] < b[query.sortBy]) return -1 * order;
        if (a[query.sortBy] > b[query.sortBy]) return 1 * order;
        return 0;
      });
    }

    if (query.page || query.limit) {
      const page = query.page || 1;
      const limit = query.limit || 10;
      const start = (page - 1) * limit;
      const end = start + limit;
      return {
        total: filtered.length,
        page,
        limit,
        data: filtered.slice(start, end),
      };
    }
    return filtered;
  }

  findOne(id: string) {
    const index = this.findIndexById(id);
    return this.articles[index];
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    const article = this.findOne(id);
    const updatedArticle = new Article({
      ...article,
      ...updateArticleDto,
      updatedAt: Date.now(),
    });
    this.articles[this.findIndexById(id)] = updatedArticle;
    return updatedArticle;
  }

  remove(id: string) {
    const index = this.findIndexById(id);
    this.articles.splice(index, 1);
  }
}
