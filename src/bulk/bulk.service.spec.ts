import { Test, TestingModule } from '@nestjs/testing';
import { BulkService } from './bulk.service';

describe('BulkService', () => {
  let service: BulkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BulkService],
    }).compile();

    service = module.get<BulkService>(BulkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
