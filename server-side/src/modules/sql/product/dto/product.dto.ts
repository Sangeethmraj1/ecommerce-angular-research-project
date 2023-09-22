import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Product } from '../entity/product.entity';


export class CreateProductDto extends OmitType(Product, [] as const){
@ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Avatar File',
  })
  avatar_file?: any;
}