import { Test, TestingModule } from '@nestjs/testing';
import { CatgoryService } from './catgory.service';

describe('CatgoryService', () => {
  let service: CatgoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatgoryService],
    }).compile();

    service = module.get<CatgoryService>(CatgoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
