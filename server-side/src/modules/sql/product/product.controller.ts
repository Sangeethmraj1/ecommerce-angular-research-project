import { Body, Controller, Get, Post, Query, Req, Res } from "@nestjs/common";
import { ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ProductService } from "./product.service";
import { Public } from "src/core/decorators/public.decorator";
import { ApiQueryGetAll, FileUploads, ResponseGetAll } from "src/core/core.decorators";
import { Request, Response } from "express";
import { Owner, OwnerDto } from "src/core/decorators/sql/owner.decorator";
import { CreateProductDto } from "./dto/product.dto";
import { ValidationError } from "sequelize";
import { BadRequest, Created, ErrorResponse, Result } from "src/core/core.responses";
import { CDNStorage } from "src/config";
import { Product } from "./entity/product.entity";

@ApiTags('product')
@Controller('product')

export class ProductController {
    constructor(private productService: ProductService) { }

    @ApiOperation({ summary: 'Create a new product' })
    @ApiConsumes('application/json', 'multipart/form-data')
    @Public()
    @FileUploads([{ name: 'avatar_file', required: false, bodyField: 'avatar', cdn: CDNStorage.Aws }])
    @Post('create')
    async create(
        @Req() req: Request,
        @Res() res: Response,
        @Owner() owner: OwnerDto,
        @Body() body: CreateProductDto,
    ) {
        console.log('in categroy create route');

        const { error, data } = await this.productService.create({
            owner,
            action: 'create',
            body
        });
        if (error) {
            if (error instanceof ValidationError) {
                return BadRequest(res, {
                    error,
                    message: error.message,
                });
            }
            return ErrorResponse(res, {
                error,
                message: `${error.message || error}`,
            });
        }
        return Created(res, { data: { Products: data }, message: 'Created' });

    }

    @Get('/find')
    @ApiOperation({ summary: 'Get all courses' })
    @ApiQueryGetAll()
    @Public()
    @ResponseGetAll(Product)
    async findAll(
      @Req() req: Request,
      @Res() res: Response,
      @Owner() owner: OwnerDto,
      @Query() query: any,
    ) {
      const { error, data, offset, limit, count } = await this.productService.findAll({
          owner,
          action: 'findAll',
          payload: {...query} 
        });
  
      if (error) {
        return ErrorResponse(res, {
          error,
          message: `${error.message || error}`,
        });
      }
      return Result(res, {
        data: { Products: data, offset, limit, count },
        message: 'Ok',
      });
    }
}