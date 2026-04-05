# Knowledge Hub

This is a REST API for a **Knowledge Hub** platform built with **NestJS**.
It allows users to create, edit, and organize articles by categories and tags, and manage comments.

## Author

[Anna Vasilevich](https://www.linkedin.com/in/anna-vasilevich-frontend/)

---

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/dzichonka/nodejs-2026q1-knowledge-hub.git
```

## Installing NPM modules

```
git switch develop
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## API Endpoints

The API has 4 main entities:

1. Users (/user)

- Create, read, update, delete users
- Passwords are excluded from responses
- Role-based access: admin, editor, viewer

2. Articles (/article)

- Create, read, update, delete articles
- Can be filtered by status, categoryId, or tag
- Deleting a user sets the article's authorId to null
- Deleting a category sets categoryId in related articles to null

3. Categories (/category)

- Create, read, update, delete categories
- Automatically updates articles when deleted

4. Comments (/comment)

- Create and delete comments
- Linked to articles; deleted when the parent article is deleted

For detailed request/response examples, use the Postman collection:

[Postman collection](https://dzichonka-3696400.postman.co/workspace/Anna-Vasilevich's-Workspace~4752c36c-245c-492f-8d06-79b9e08f3075/collection/48079025-8a74a39c-186b-432d-a8f4-1c20a90b5aef?action=share&creator=48079025)

## Testing

After application running open new terminal and enter:

To run additional unit tests

```
npm run test:additional
```

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

To run refresh token tests

```
npm run test:refresh
```

To run RBAC (role-based access control) tests

```
npm run test:rbac
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
