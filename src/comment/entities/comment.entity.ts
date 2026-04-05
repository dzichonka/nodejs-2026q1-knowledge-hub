export class Comment {
  id: string; // uuid v4
  content: string;
  articleId: string; // refers to Article
  authorId: string | null; // refers to User
  createdAt: number; // timestamp of creation

  constructor(partial: Partial<Comment>) {
    Object.assign(this, partial);
  }
}
