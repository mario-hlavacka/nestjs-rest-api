import { Test, TestingModule } from '@nestjs/testing';
import { SheltersController } from './shelters.controller';
import { SheltersService } from './shelters.service';
import { PrismaService } from '../prisma.service';

describe('SheltersController', () => {
  let controller: SheltersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SheltersController],
      providers: [SheltersService, PrismaService],
    }).compile();

    controller = module.get<SheltersController>(SheltersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
