import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { randomUUID } from 'crypto';
import { ArticleStatus } from 'src/common/types/types';

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
      categoryId: null,
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
      categoryId: null,
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

  clearAuthor(userId: string) {
    this.articles = this.articles.map((article) => {
      if (article.authorId === userId) {
        return { ...article, authorId: null };
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
