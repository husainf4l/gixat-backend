import { Test, TestingModule } from '@nestjs/testing';
import { ChartOfAccountsController } from './chart-of-accounts.controller';

describe('ChartOfAccountsController', () => {
  let controller: ChartOfAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChartOfAccountsController],
    }).compile();

    controller = module.get<ChartOfAccountsController>(ChartOfAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
