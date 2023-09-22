import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { Model, ModelStatic, SequelizeOptions } from 'sequelize-typescript';
import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';

const s3 = new S3Client({
  credentials:{
      accessKeyId:'AKIAY44UW65BAMCCUK2J',
      secretAccessKey:'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'
  },
  region:'us-east-1'
})
@Module({})
export class MulterFileModule{
  static register(entity:ModelStatic<Model>){
    return MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          storage: multerS3({
            s3: s3,
            bucket:'smbtrainings3',
            acl: 'public-read',
            key: function (req, file, cb) {
              const ext = extname(file.originalname);
              cb(null, `ecommerce-angular/${Date.now()}-${uuid()}${ext}`);
            },
            contentType: function (req, file, cb) {
              cb(null, file.mimetype);
            },
          }),
        };
      },
      inject: [ConfigService],
    })
  }
}
  