import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

/**
 * MongoDB ObjectId validation pipe
 * Validates that a string is a valid MongoDB ObjectId
 * Example: @Param('id', ParseObjectIdPipe) id: string
 */
@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`Invalid ObjectId: ${value}`);
    }
    return value;
  }
}
