import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  PrismaClient,
  UserRole,
  ArticleStatus,
} from '../src/generated/prisma/client.js';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});
const prisma = new PrismaClient({ adapter });

async function seedUsers() {
  const admin = await prisma.user.upsert({
    where: { login: 'Erwin Rudolf Josef Alexander Schrödinger' },
    update: {},
    create: {
      login: 'Erwin Rudolf Josef Alexander Schrödinger',
      password: 'catIsAlive',
      role: UserRole.admin,
    },
  });
  const editor = await prisma.user.upsert({
    where: { login: 'Mark Zuckerberg' },
    update: {},
    create: {
      login: 'Mark Zuckerberg',
      password: 'facebook',
      role: UserRole.editor,
    },
  });

  return { adminId: admin.id, editorId: editor.id };
}

async function seedCategories() {
  const category1 = await prisma.category.upsert({
    where: { id: 'cec40a79-983c-487a-be9b-6ffff661a8c1' },
    update: {},
    create: {
      id: 'cec40a79-983c-487a-be9b-6ffff661a8c1',
      name: 'Technology',
      description: 'All about the latest in tech.',
    },
  });
  const category2 = await prisma.category.upsert({
    where: { id: 'cec40a79-983c-487a-be9b-6ffff661a8c2' },
    update: {},
    create: {
      id: 'cec40a79-983c-487a-be9b-6ffff661a8c2',
      name: 'Science',
      description: 'Exploring the wonders of science.',
    },
  });
  const category3 = await prisma.category.upsert({
    where: { id: 'cec40a79-983c-487a-be9b-6ffff661a8c3' },
    update: {},
    create: {
      id: 'cec40a79-983c-487a-be9b-6ffff661a8c3',
      name: 'Health',
      description: 'Tips and news on health and wellness.',
    },
  });

  return {
    category1Id: category1.id,
    category2Id: category2.id,
    category3Id: category3.id,
  };
}

async function seedTags() {
  const tag1 = await prisma.tag.create({
    data: {
      name: 'JavaScript',
    },
  });
  const tag2 = await prisma.tag.create({
    data: {
      name: 'Node.js',
    },
  });
  const tag3 = await prisma.tag.create({
    data: {
      name: 'Prisma',
    },
  });
  const tag4 = await prisma.tag.create({
    data: {
      name: 'TypeScript',
    },
  });
  const tag5 = await prisma.tag.create({
    data: {
      name: 'Programming',
    },
  });
  return {
    tag1Id: tag1.id,
    tag2Id: tag2.id,
    tag3Id: tag3.id,
    tag4Id: tag4.id,
    tag5Id: tag5.id,
  };
}

async function seedArticles({
  adminId,
  editorId,
  category1Id,
  category2Id,
  category3Id,
  tag1Id,
  tag2Id,
  tag3Id,
  tag4Id,
  tag5Id,
}) {
  const article1 = await prisma.article.create({
    data: {
      title: 'Prisma Basics',
      content: 'Learn Prisma step by step',
      status: ArticleStatus.published,
      authorId: adminId,
      categoryId: category1Id,
      tags: {
        connect: [{ id: tag1Id }, { id: tag3Id }],
      },
    },
  });

  const article2 = await prisma.article.create({
    data: {
      title: 'Advanced Node.js',
      content: 'Deep dive into Node',
      status: ArticleStatus.draft,
      authorId: editorId,
      categoryId: category2Id,
      tags: {
        connect: [{ id: tag2Id }],
      },
    },
  });

  const article3 = await prisma.article.create({
    data: {
      title: 'TypeScript in Action',
      content: 'Mastering TypeScript',
      status: ArticleStatus.archived,
      authorId: adminId,
      categoryId: category3Id,
      tags: {
        connect: [{ id: tag4Id }, { id: tag5Id }],
      },
    },
  });

  const article4 = await prisma.article.create({
    data: {
      title: 'Prisma Basics',
      content: 'Learn Prisma step by step',
      status: ArticleStatus.published,
      authorId: adminId,
      categoryId: category1Id,
      tags: {
        connect: [{ id: tag1Id }, { id: tag3Id }],
      },
    },
  });

  const article5 = await prisma.article.create({
    data: {
      title: 'Advanced Node.js',
      content: 'Deep dive into Node',
      status: ArticleStatus.draft,
      authorId: editorId,
      categoryId: category2Id,
      tags: {
        connect: [{ id: tag2Id }],
      },
    },
  });

  return {
    article1Id: article1.id,
    article2Id: article2.id,
    article3Id: article3.id,
    article4Id: article4.id,
    article5Id: article5.id,
  };
}

async function seedComments({
  adminId,
  editorId,
  article1Id,
  article2Id,
}: any) {
  await prisma.comment.createMany({
    data: [
      {
        content: 'Great article!',
        authorId: adminId,
        articleId: article1Id,
      },
      {
        content: 'Very helpful, thanks!',
        authorId: editorId,
        articleId: article1Id,
      },
      {
        content: 'Waiting for more details...',
        authorId: adminId,
        articleId: article2Id,
      },
    ],
  });
}
async function main() {
  const { adminId, editorId } = await seedUsers();
  const { category1Id, category2Id, category3Id } = await seedCategories();
  const { tag1Id, tag2Id, tag3Id, tag4Id, tag5Id } = await seedTags();

  const { article1Id, article2Id } = await seedArticles({
    adminId,
    editorId,
    category1Id,
    category2Id,
    category3Id,
    tag1Id,
    tag2Id,
    tag3Id,
    tag4Id,
    tag5Id,
  });

  await seedComments({
    adminId,
    editorId,
    article1Id,
    article2Id,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
