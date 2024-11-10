import { Test, TestingModule } from '@nestjs/testing';
import { CatgoryController } from './catgory.controller';

describe('CatgoryController', () => {
  let controller: CatgoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatgoryController],
    }).compile();

    controller = module.get<CatgoryController>(CatgoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
