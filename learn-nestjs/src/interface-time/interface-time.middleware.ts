import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class InterfaceTimeMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    let t = Date.now();
    console.log(`call time:${t}`);
    next();
  }
}
// 创建middleware 之后，需要在module类的config方法来设置它们