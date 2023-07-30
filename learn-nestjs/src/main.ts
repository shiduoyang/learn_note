import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalMiddleware } from './globalmiddleware/globalMiddleware';
import { TempErrFilterFilter } from './temp-err-filter/temp-err-filter.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new TempErrFilterFilter());
  app.use(GlobalMiddleware)
  await app.listen(3000);
}
bootstrap();
