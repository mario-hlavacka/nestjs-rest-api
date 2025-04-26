import { Test, TestingModule } from '@nestjs/testing';
import { SheltersService } from './shelters.service';
import { PrismaService } from '../prisma.service';

describe('SheltersService', () => {
  let service: SheltersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SheltersService, PrismaService],
    }).compile();

    service = module.get<SheltersService>(SheltersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
