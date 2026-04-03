import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { randomUUID } from 'crypto';
import { ArticleService } from 'src/article/article.service';

@Injectable()
export class CategoryService {
  categories: Category[] = [
    {
      id: 'cec40a79-983c-487a-be9b-6ffff661a8c0',
      name: 'Science',
      description: 'Categories related to science',
    },
    {
      id: 'cec40a79-983c-487a-be9b-6ffff661a8c1',
      name: 'Technology',
      description: 'Computers, gadgets, and all things tech',
    },
  ];

  constructor(private readonly articleService: ArticleService) {}

  private findIndexById(id: string) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) {
      throw new NotFoundException('Category with the given id not found');
    }
    return index;
  }
  create(createCategoryDto: CreateCategoryDto) {
    const newCategory: Category = new Category({
      id: randomUUID(),
      name: createCategoryDto.name,
      description: createCategoryDto.description,
    });
    this.categories.push(newCategory);
    return newCategory;
  }

  findAll() {
    return this.categories;
  }

  findOne(id: string) {
    const index = this.findIndexById(id);
    return this.categories[index];
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const index = this.findIndexById(id);
    this.categories[index] = {
      ...this.categories[index],
      ...updateCategoryDto,
    };
    return this.categories[index];
  }

  remove(id: string) {
    const index = this.findIndexById(id);
    this.categories.splice(index, 1);
    this.articleService.clearField('categoryId', id);
  }
}
