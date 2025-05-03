import { Test, TestingModule } from '@nestjs/testing';
import { ValidShelterIdConstraint } from './valid-shelter-id';
import { SheltersService } from '../../../src/shelters/shelters.service';

describe('ValidShelterId', () => {
  let validator: ValidShelterIdConstraint;
  let sheltersService: SheltersService;

  const mockShelters = [
    { id: 1, name: 'Žilinský útulok o.z.' },
    { id: 2, name: 'Trenčiansky Útulok' },
    { id: 3, name: 'HAFKÁČI' },
  ];
  const mockSheltersService = {
    findOne: jest
      .fn()
      .mockImplementation((id) =>
        Promise.resolve(mockShelters.find((shelter) => shelter.id === id)),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SheltersService],
    })
      .overrideProvider(SheltersService)
      .useValue(mockSheltersService)
      .compile();

    sheltersService = module.get<SheltersService>(SheltersService);
    validator = new ValidShelterIdConstraint(sheltersService);
  });

  it('should return true if shelter exists', async () => {
    const shelterId = 2;
    const result = await validator.validate(shelterId);
    expect(result).toBe(true);
  });

  it('should return false if shelter does not exist', async () => {
    const shelterId = 20;
    const result = await validator.validate(shelterId);
    expect(result).toBe(false);
  });
});
