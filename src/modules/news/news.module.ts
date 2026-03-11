import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { NewsArticle, NewsArticleSchema } from './schemas/news-article.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: NewsArticle.name, schema: NewsArticleSchema }])],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
