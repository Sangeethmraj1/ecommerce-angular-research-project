import { Module } from "@nestjs/common";
import { MulterFileModule } from "../multer/multer.module";
import { SqlModule } from "@core/sql";
import { Product } from "./entity/product.entity";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";

@Module({
    imports: [SqlModule.register(Product),
    MulterFileModule.register(Product)],
    controllers:[ProductController],
    providers:[ProductService]
})

export class ProductModule{}