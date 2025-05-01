import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../../src/prisma.service";
import { SheltersService } from "./shelters.service";

describe('SheltersService', () => {
  let service: SheltersService;

  const mockShelters = [
    { id: 1, name: 'Žilinský útulok o.z.' },
    { id: 2, name: 'Trenčiansky Útulok' },
    { id: 3, name: 'HAFKÁČI' }
  ];
  const mockPrismaService = {
    shelter: {
      findMany: jest.fn().mockResolvedValue(mockShelters),
      findUnique: jest.fn().mockImplementation((args) => Promise.resolve(
        mockShelters.find(shelter => shelter.id === args.where.id)
      ))
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SheltersService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<SheltersService>(SheltersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all shelters', async () => {
    const result = await service.findAll();

    expect(result).toEqual(mockShelters);
    expect(mockPrismaService.shelter.findMany).toHaveBeenCalled();
  });

  it('should return one specific shelter', async () => {
    const shelterId = 2;
    const result = await service.findOne(shelterId);
    
    expect(result).toEqual(mockShelters.find(shelter => shelter.id === shelterId));
    expect(mockPrismaService.shelter.findUnique).toHaveBeenCalledWith({ where: { id: shelterId } });
  });
});
