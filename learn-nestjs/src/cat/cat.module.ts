import { Module } from "@nestjs/common";
import { CatController } from "./cat.controller";
import { CatService } from "./cat.service";

@Module({
    controllers: [CatController],
    providers: [CatService],
    exports: [CatService],// 通过这种方式，每个导入CatModule的模块都可以访问CatService
})
export class CatModule { }