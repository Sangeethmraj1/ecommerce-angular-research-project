import { ModelService, SqlService } from '@core/sql';
import { Injectable } from '@nestjs/common';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService extends ModelService<Product> {
    /**
     * searchFields
     * @property array of fields to include in search
     */
    searchFields: string[] = ['name'];

    constructor(db: SqlService<Product>) {
        super(db);
    }
}