import { BadRequestException, Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

@Controller('err')
export class ErrController {
    @Get('giveerr')
    async retOneError() {
        throw new HttpException("OneError", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Get('giveBadRequestErr')
    async retGiveBadRequestErr() {
        throw new BadRequestException({ a: 1 }, "params error");
    }
}
