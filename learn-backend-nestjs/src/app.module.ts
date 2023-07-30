import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { InterfaceTimeMiddleware } from './interface-time/interface-time.middleware';
import { ErrController } from './err/err.controller';

@Module({
  imports: [CatModule],
  controllers: [AppController, ErrController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(InterfaceTimeMiddleware)// 这里可以一次绑多个中间件
      .forRoutes({ path: 'cat', method: RequestMethod.GET })
  }
}
