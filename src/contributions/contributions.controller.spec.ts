import { Test, TestingModule } from "@nestjs/testing";
import { ContributionsController } from "./contributions.controller";
import { ContributionsService } from "./contributions.service";

describe('ContributionsController', () => {
  let controller: ContributionsController;

  const mockContributionsService = {
    create: jest.fn().mockImplementation((dto) => Promise.resolve({
        id: 1,
        ...dto
      })
    )
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContributionsController],
      providers: [ContributionsService]
    })
      .overrideProvider(ContributionsService)
      .useValue(mockContributionsService)
      .compile();

    controller = module.get<ContributionsController>(ContributionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a contribution', async () => {
    const contributionDto = {
      firstName: "Karol",
      lastName: "Novák",
      email: "knovak1@gmail.com",
      phone: "+421915851147",
      value: 100.55,
      shelterId: 11
    };

    const result = await controller.create(contributionDto);
    expect(result).toEqual({
      id: expect.any(Number),
      ...contributionDto
    });

    expect(mockContributionsService.create).toHaveBeenCalledWith(contributionDto);
  });
});
