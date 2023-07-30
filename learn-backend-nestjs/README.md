learn record of nest.js

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 组件

1. controller  控制器 负责处理传入的请求和客户端返回的响应，是处理请求的第一层
2. provider  提供者 它只是一个用@Injectable() 装饰的类, 许多基本的nest都可能被视为一个provider，用来承接各种复杂的任务
3. module    模块   模块是具有@Module()装饰的类, 视为对若干API的封装。
4. nestMiddleware 中间件，在路由处理请求之前 调用的一系列函数
5. 异常过滤器：发生某些异常时，处理并生成消息返回给客户端  nestjs有内置的异常过滤器
6. 管道：一个实现PipTransform借口的类，用@Injectable() 装饰。用来转换输入数据，或者对输入数据进行验证
7. 守卫： 确认给定的请求是否交由路由程序处理，它在所有中间件之后，任何拦截器或管道之前执行
8. 拦截器

controller处理http请求，将更复杂的任务委托给providers
拦截器的作用与controller，provider，guard一样，这意味着它们可以通过构造函数注入依赖项

## 装饰词

1. @Controller()
2. @Req() @Res() @Next() @Session() @Param() @Body() @Query() @Headers() @Ip() @HostParam()
3. @Get @Post @Put @Delete 

## CLI命令参考

* nest g controller {controllerName}  将创建控制器，相关文件:
    * cat/cat.controller.spec.ts controller的测试文件
    * cat/cat.controller.ts controller
* nest g service {serviceName} 将创建服务类
* nest g module {moduleName}  将创建model文件夹及描述文件
* nest g mi {middlewareName}  将创建一个中间件
* nest g f {errorFilterName}  将创建一个错误过滤器
* nest g pi {pipeName} 将创建一个管道
* nest g gu {guardName} 将创建一个守卫

## 详情

nestjs中的依赖注入：
1. 基于构造函数的注入: 如controller构造函数，加service类型的参数
2. 基于属性的注入

模块
1. 模块可以选择导出自己的service供  其他模块使用（其他模块先得导入该模块）
2. 全局模块：让该模块exports的内容无处不在，创建方法是在@Module上边再加个@Global()修饰
3. 动态模块：TODO

中间件
1. 中间件需要在module的configure中挂载到若干路由上
2. 中间件可以由nest生成，也可以直接写成函数（这样的叫函数中间件）
3. 中间件可以是全局的，这种情况下可以在main.ts中用app.use来做 （注意，全局中间件只能接受函数中间件）
4. nestjs的中间件，与express中间件相同

异常过滤器
1. 异常过滤器用来处理某些异常，并返回给客户端
2. 自定义异常过滤器，可以绑定在接口上，controller上或者全局上

管道（pipline）
1. Nest自带9个开箱即用的管道 如ValidationPipe ParseIntPipe
2. 可以自定义管道
3. 可以定义全局管道
4. nest.js自带的ValidationPipe功能强大，可用于验证参数及对象结构的正确性

守卫（guard）
拦截器 --
自定义装饰器 --