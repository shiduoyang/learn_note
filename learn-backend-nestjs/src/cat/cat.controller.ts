import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards, UsePipes } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, createCatSchema } from './dto/cat.dto';
import { CatService } from './cat.service';
import { Cat } from './interfaces/cat.interface';
import { JoiValidationPipe } from 'src/joi-validation/joi-validation.pipe';
import { TempGuardGuard } from 'src/temp-guard/temp-guard.guard';

@Controller('cat')
export class CatController {

    constructor(private catService: CatService) { }//依赖注入（基于构造函数的注入)

    @Post()
    // @UsePipes(new JoiValidationPipe(createCatSchema))
    create(@Body() createCatDto: CreateCatDto) {
        console.log(createCatDto)
        this.catService.create(createCatDto);
        return "this action adds a new cat";
    }

    @Get()
    @UseGuards(new TempGuardGuard())
    async findAll(): Promise<Cat[]> {
        return this.catService.findAll();
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: string) {//ID如果不是数字类型，将报错
        return `this action returns a ${id} cat`;
    }

    @Put(':id')
    update(@Param("id", new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: string, @Body() updateCatDto: UpdateCatDto) {
        return `this action updates a ${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `this action removes a ${id} cat`;
    }

}
