import { Test, TestingModule } from '@nestjs/testing';
import { ErrController } from './err.controller';

describe('ErrController', () => {
  let controller: ErrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ErrController],
    }).compile();

    controller = module.get<ErrController>(ErrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
