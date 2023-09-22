import { Body, Controller, Get, Post, Query, Req, Res } from "@nestjs/common";
import { ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CategoryService } from "./category.service";
import { Public } from "src/core/decorators/public.decorator";
import { ApiQueryGetAll, FileUploads, ResponseGetAll } from "src/core/core.decorators";
import { Owner, OwnerDto } from "src/core/decorators/sql/owner.decorator";
import { CreateCategoryDto } from "./dto/category.dto";
import { CDNStorage } from "src/config";
import { ValidationError } from "sequelize";
import { BadRequest, Created, ErrorResponse, Result } from "src/core/core.responses";
import { Request, Response } from "express";
import { Category } from "./entity/category.entity";

@ApiTags('category')
@Controller('category')

export class CategoryController{
    constructor(private categoryService:CategoryService){}

    @ApiOperation({ summary: 'Create a new category' })
    @ApiConsumes('application/json', 'multipart/form-data')
    @Public()
    @FileUploads([{ name: 'avatar_file', required: false, bodyField: 'avatar', cdn: CDNStorage.Aws }])
    @Post('create')
    async create(
      @Req() req: Request,
      @Res() res: Response,
      @Owner() owner: OwnerDto,
      @Body() body: CreateCategoryDto,
    ) {
  console.log('in categroy create route');
  
      const { error, data } = await this.categoryService.create({
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
      return Created(res, { data: { Category: data }, message: 'Created' });
  
    }

    @Get('/find')
    @ApiOperation({ summary: 'Get all courses' })
    @ApiQueryGetAll()
    @Public()
    @ResponseGetAll(Category)
    async findAll(
      @Req() req: Request,
      @Res() res: Response,
      @Owner() owner: OwnerDto,
      @Query() query: any,
    ) {
      const { error, data, offset, limit, count } = await this.categoryService.findAll({
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
        data: { Categories: data, offset, limit, count },
        message: 'Ok',
      });
    }
}