import { Test, TestingModule } from '@nestjs/testing';
import { SheltersController } from './shelters.controller';
import { SheltersService } from './shelters.service';

describe('SheltersController', () => {
  let controller: SheltersController;

  const mockShelters = [
    { id: 1, name: 'Žilinský útulok o.z.' },
    { id: 2, name: 'Trenčiansky Útulok' },
    { id: 3, name: 'HAFKÁČI' },
  ];
  const mockSheltersService = {
    findAll: jest.fn().mockResolvedValue(mockShelters),
    findOne: jest
      .fn()
      .mockImplementation((id) =>
        Promise.resolve(mockShelters.find((shelter) => shelter.id === id)),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SheltersController],
      providers: [SheltersService],
    })
      .overrideProvider(SheltersService)
      .useValue(mockSheltersService)
      .compile();

    controller = module.get<SheltersController>(SheltersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all shelters', async () => {
    const result = await controller.findAll();

    expect(result).toEqual(mockShelters);
    expect(mockSheltersService.findAll).toHaveBeenCalled();
  });

  it('should return one specific shelter', async () => {
    const shelterId = '2';
    const result = await controller.findOne(shelterId);

    expect(result).toEqual(
      mockShelters.find((shelter) => shelter.id === +shelterId),
    );
    expect(mockSheltersService.findOne).toHaveBeenCalledWith(+shelterId);
  });
});
