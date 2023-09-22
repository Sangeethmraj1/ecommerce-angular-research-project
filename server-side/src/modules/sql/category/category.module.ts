import { Module } from "@nestjs/common";
import { MulterFileModule } from "../multer/multer.module";
import { SqlModule } from "@core/sql";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { Category } from "./entity/category.entity";

@Module({
    imports: [SqlModule.register(Category),
    MulterFileModule.register(Category)],
    controllers:[CategoryController],
    providers:[CategoryService]
})

export class CategoryModule{}