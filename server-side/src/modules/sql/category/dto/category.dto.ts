import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Category } from '../entity/category.entity';


export class CreateCategoryDto extends OmitType(Category, [] as const){
@ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Avatar File',
  })
  avatar_file?: any;
}