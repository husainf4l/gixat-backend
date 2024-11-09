import { Test, TestingModule } from '@nestjs/testing';
import { ChartOfAccountController } from './chart-of-account.controller';

describe('ChartOfAccountController', () => {
  let controller: ChartOfAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChartOfAccountController],
    }).compile();

    controller = module.get<ChartOfAccountController>(ChartOfAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
