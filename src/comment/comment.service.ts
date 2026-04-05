import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  comments: Comment[] = [
    {
      id: 'dec40a79-983c-487a-be9b-6ffff661a8c0',
      content: 'First comment for article 1 by Schrödinger',
      articleId: 'bec40a79-983c-487a-be9b-6ffff661a8c0',
      authorId: 'aec40a79-983c-487a-be9b-6ffff661a8c0',
      createdAt: 1775041279470,
    },
    {
      id: 'dec40a79-983c-487a-be9b-6ffff661a8c1',
      content: 'First comment for article 2 by Zuckerberg',
      articleId: 'bec40a79-983c-487a-be9b-6ffff661a8c1',
      authorId: 'aec40a79-983c-487a-be9b-6ffff661a8c1',
      createdAt: 1775041279472,
    },
    {
      id: 'dec40a79-983c-487a-be9b-6ffff661a8c2',
      content: 'Second comment for article 2 by Schrödinger',
      articleId: 'bec40a79-983c-487a-be9b-6ffff661a8c1',
      authorId: 'aec40a79-983c-487a-be9b-6ffff661a8c0',
      createdAt: 1775041279474,
    },
  ];

  private findIndexById(id: string) {
    const index = this.comments.findIndex((comment) => comment.id === id);
    if (index === -1) {
      throw new NotFoundException('Comment with the given id not found');
    }
    return index;
  }

  findOne(id: string) {
    const comment = this.comments.find((c) => c.id === id);
    if (!comment) {
      throw new NotFoundException('Comment with the given id not found');
    }
    return comment;
  }

  getByArticleId(articleId: string) {
    const comments = this.comments.filter(
      (comment) => comment.articleId === articleId,
    );
    return comments;
  }
  create(createCommentDto: CreateCommentDto) {
    const newComment: Comment = new Comment({
      id: crypto.randomUUID(),
      content: createCommentDto.content,
      articleId: createCommentDto.articleId,
      authorId: createCommentDto.authorId ?? null,
      createdAt: Date.now(),
    });
    this.comments.push(newComment);
    return newComment;
  }

  remove(id: string) {
    const index = this.findIndexById(id);
    this.comments.splice(index, 1);
  }

  removeByArticleId(articleId: string) {
    this.comments = this.comments.filter(
      (comment) => comment.articleId !== articleId,
    );
  }

  removeByUserId(userId: string) {
    this.comments = this.comments.filter(
      (comment) => comment.authorId !== userId,
    );
  }
}
