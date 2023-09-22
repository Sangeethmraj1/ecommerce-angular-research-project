import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Category } from '../entity/category.entity';

export class UpdateCategoryrDto extends PartialType(
  OmitType(Category, ['name', 'description'] as const),
) {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Avatar File',
  })
  avatar_file?: any;
}