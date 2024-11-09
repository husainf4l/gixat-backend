import { Test, TestingModule } from '@nestjs/testing';
import { JobCardService } from './job-card.service';

describe('JobCardService', () => {
  let service: JobCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobCardService],
    }).compile();

    service = module.get<JobCardService>(JobCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
