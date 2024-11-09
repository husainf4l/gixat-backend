import { Test, TestingModule } from '@nestjs/testing';
import { JobCardController } from './job-card.controller';

describe('JobCardController', () => {
  let controller: JobCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobCardController],
    }).compile();

    controller = module.get<JobCardController>(JobCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
