import { ModelService, SqlService } from '@core/sql';
import { Injectable } from '@nestjs/common';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService extends ModelService<Category> {
    /**
     * searchFields
     * @property array of fields to include in search
     */
    searchFields: string[] = ['name'];

    constructor(db: SqlService<Category>) {
        super(db);
    }
}