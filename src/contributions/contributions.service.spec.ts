import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../../src/prisma.service";
import { ContributionsService } from "./contributions.service";
import { CreateContributionDto } from "./dto/create-contribution.dto";

describe('ContributionsService', () => {
  let service: ContributionsService;

  const mockPrismaService = {
    contribution: {
      create: jest.fn().mockImplementation((args) => Promise.resolve({
        id: 2,
        ...args.data
      }))
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContributionsService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<ContributionsService>(ContributionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a contribution', async () => {  
      const contributionDto: CreateContributionDto = { 
        firstName: "Juraj",
        lastName: "Novák",
        email: "jnovak2@gmail.com",
        phone: "+421911851047",
        value: 9.25,
        shelterId: 11
      };
  
      const contribution = await service.create(contributionDto);

      expect(contribution).toEqual({
        id: expect.any(Number),
        ...contributionDto
      });
      expect(mockPrismaService.contribution.create).toHaveBeenCalledWith({ data: contributionDto });
    });
});
