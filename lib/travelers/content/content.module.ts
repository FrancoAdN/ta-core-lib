import { DynamicModule } from '@nestjs/common';
import { ContentService } from './services';

export class ContentModule {
  private static contentFactory = () => ({
    provide: ContentService,
    useFactory: () => new ContentService(),
    inject: [],
  });

  static forRoot(): DynamicModule {
    return {
      global: true,
      module: ContentModule,
      imports: [],
      providers: [this.contentFactory()],
      exports: [ContentService],
    };
  }
}
