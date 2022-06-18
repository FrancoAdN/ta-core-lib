import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export class AlbumPayloadDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rate: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  @Type(/* istanbul ignore next */ () => ObjectId)
  images: ObjectId[];
}
