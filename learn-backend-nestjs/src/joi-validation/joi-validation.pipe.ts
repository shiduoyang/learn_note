import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) { }
  transform(value: any, metadata: ArgumentMetadata) {
    const err = this.schema.validate(value);
    if (err) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}