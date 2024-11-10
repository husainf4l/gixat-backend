import { Test, TestingModule } from '@nestjs/testing';
import { AccountPayableController } from './account-payable.controller';

describe('AccountPayableController', () => {
  let controller: AccountPayableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountPayableController],
    }).compile();

    controller = module.get<AccountPayableController>(AccountPayableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
