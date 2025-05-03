import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { SheltersModule } from '../src/shelters/shelters.module';
import { PrismaService } from '../src/prisma.service';

describe('SheltersController (e2e)', () => {
  let app: INestApplication<App>;

  const mockShelters = [
    { id: 1, name: 'Žilinský útulok o.z.' },
    { id: 2, name: 'Trenčiansky Útulok' },
    { id: 3, name: 'HAFKÁČI' },
  ];
  const mockPrismaService = {
    shelter: {
      findMany: jest.fn().mockResolvedValue(mockShelters),
      findUnique: jest
        .fn()
        .mockImplementation((args) =>
          Promise.resolve(
            mockShelters.find((shelter) => shelter.id === args.where.id),
          ),
        ),
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SheltersModule],
      providers: [PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/shelters (GET) - should return all stored shelters', async () => {
    const response = await request(app.getHttpServer()).get('/shelters');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/shelters/:id (GET) - should return one specific shelter by id', async () => {
    const shelterId = '2';
    const response = await request(app.getHttpServer()).get(
      `/shelters/${shelterId}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toEqual(2);
  });

  it('/shelters/:id (GET) - should return exception when shelter with specific id does not exist', async () => {
    const shelterId = '5';
    const response = await request(app.getHttpServer()).get(
      `/shelters/${shelterId}`,
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Not Found');
  });
});
