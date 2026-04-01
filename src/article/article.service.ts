import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { randomUUID } from 'crypto';
import { ArticleStatus } from 'src/common/types/types';

@Injectable()
export class ArticleService {
  private readonly articles: Article[] = [];

  private findIndexById(id: string) {
    const index = this.articles.findIndex((article) => article.id === id);
    if (index === -1) {
      throw new NotFoundException('Article with the given id not found');
    }
    return index;
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

  findAll() {
    return this.articles;
  }

  findOne(id: string) {
    const article = this.articles.find((article) => article.id === id);
    if (!article) {
      throw new NotFoundException('Article with the given id not found');
    }
    return article;
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    const article = this.findOne(id);
    const updatedArticle = new Article({
      id: article.id,
      title: updateArticleDto.title,
      content: updateArticleDto.content,
      status: updateArticleDto.status ?? ArticleStatus.DRAFT,
      authorId: updateArticleDto.authorId,
      categoryId: updateArticleDto.categoryId,
      tags: updateArticleDto.tags ?? [],
      createdAt: article.createdAt,
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
