import { Test, TestingModule } from '@nestjs/testing';
import { AccountReceivableController } from './account-receivable.controller';

describe('AccountReceivableController', () => {
  let controller: AccountReceivableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountReceivableController],
    }).compile();

    controller = module.get<AccountReceivableController>(AccountReceivableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
