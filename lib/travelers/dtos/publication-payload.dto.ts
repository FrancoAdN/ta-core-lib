import { IsNotEmpty, IsString } from 'class-validator';

export class PublicationPayloadDto {
  @IsNotEmpty()
  albumId: string;

  @IsString()
  @IsNotEmpty()
  caption: string;
}
