import { Test, TestingModule } from '@nestjs/testing';
import { ChartOfAccountService } from './chart-of-account.service';

describe('ChartOfAccountService', () => {
  let service: ChartOfAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChartOfAccountService],
    }).compile();

    service = module.get<ChartOfAccountService>(ChartOfAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
