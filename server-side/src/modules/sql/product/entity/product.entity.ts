import { SqlModel } from '@core/sql/sql.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Column, Index, Table } from 'sequelize-typescript';
import config from 'src/config';

@Table
export class Product extends SqlModel {
  @Column
  @Index
  @ApiProperty({
    description: 'name',
    example: 'Node js',
  })
  @IsString()
  name: string;

  @Column
  @ApiProperty({
    description: 'Avatar',
    example: 'user/avatar.png',
  })
  @IsString()
  get avatar(): string {
    return this.getDataValue('avatar')
      ? config().cdnURL + this.getDataValue('avatar')
      : null;
  }

  set avatar(v: string) {
    this.setDataValue(
      'avatar',
      typeof v === 'string' ? v.replace(config().cdnURL, '') : null,
    );
  }

  @Column
  @Index
  @ApiProperty({
    description: 'description',
    example: 'Lorem',
  })
  @IsString()
  description: string;

  @Column
  @Index
  @ApiProperty({
    description: 'price',
    example: 'Lorem',
  })
  @IsString()
  price: string;

}
