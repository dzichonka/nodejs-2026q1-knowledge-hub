import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';
import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export function AtLeastOneField(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'atLeastOneField',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(_: any, args: ValidationArguments) {
          const obj = args.object as Record<string, any>;
          return Object.values(obj).some((value) => value !== undefined);
        },
      },
    });
  };
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @AtLeastOneField({
    message: 'At least one field must be provided',
  })
  _atLeastOne: any;
}
