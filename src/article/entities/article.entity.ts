import { ArticleStatus } from '../../common/types/types';

export class Article {
  id: string; // uuid v4
  title: string;
  content: string;
  status: ArticleStatus;
  authorId: string | null; // refers to User
  categoryId: string | null; // refers to Category
  tags: string[]; // array of tag names
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  constructor(partial: Partial<Article>) {
    Object.assign(this, partial);
  }
}
