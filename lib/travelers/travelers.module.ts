import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentModule } from './content/content.module';
import {
  AlbumRepository,
  ImageRepository,
  PublicationRepository,
} from './repositories';
import {
  Album,
  AlbumSchema,
  Image,
  ImageSchema,
  Publication,
  PublicationSchema,
} from './schemas';
import { AlbumService, ImageService, PublicationService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Album.name, schema: AlbumSchema },
      { name: Image.name, schema: ImageSchema },
      { name: Publication.name, schema: PublicationSchema },
    ]),
    ContentModule.forRoot(),
  ],
  providers: [
    AlbumRepository,
    AlbumService,
    ImageRepository,
    ImageService,
    PublicationRepository,
    PublicationService,
  ],
  exports: [
    AlbumRepository,
    AlbumService,
    ImageRepository,
    ImageService,
    PublicationRepository,
    PublicationService,
  ],
})
export class TravelersModule {}
