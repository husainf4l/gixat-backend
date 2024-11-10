import { Test, TestingModule } from '@nestjs/testing';
import { QuickbooksService } from './quickbooks.service';

describe('QuickbooksService', () => {
  let service: QuickbooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuickbooksService],
    }).compile();

    service = module.get<QuickbooksService>(QuickbooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
