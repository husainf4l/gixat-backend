import { Test, TestingModule } from '@nestjs/testing';
import { AccountReceivableService } from './account-receivable.service';

describe('AccountReceivableService', () => {
  let service: AccountReceivableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountReceivableService],
    }).compile();

    service = module.get<AccountReceivableService>(AccountReceivableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
