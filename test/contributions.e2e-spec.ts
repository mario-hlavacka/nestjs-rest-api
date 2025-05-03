import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { ContributionsModule } from '../src/contributions/contributions.module';
import { PrismaService } from '../src/prisma.service';
import { useContainer } from 'class-validator';

describe('ContributionsController (e2e)', () => {
  let app: INestApplication<App>;

  const mockShelters = [
    { id: 1, name: 'Žilinský útulok o.z.' },
    { id: 2, name: 'Trenčiansky Útulok' },
    { id: 3, name: 'HAFKÁČI' },
  ];
  const mockPrismaService = {
    shelter: {
      findUnique: jest
        .fn()
        .mockImplementation((args) =>
          Promise.resolve(
            mockShelters.find((shelter) => shelter.id === args.where.id),
          ),
        ),
    },
    contribution: {
      create: jest.fn().mockImplementation((args) =>
        Promise.resolve({
          id: 1,
          ...args.data,
        }),
      ),
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ContributionsModule],
      providers: [PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    useContainer(app, { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/contributions (POST) - should create a contribution', async () => {
    const contributionDto = {
      firstName: 'Pavol',
      lastName: 'Kováč',
      email: 'pavolkovac@email.sk',
      phone: '+421912359847',
      value: 29.3,
    };
    const response = await request(app.getHttpServer())
      .post('/contributions')
      .send(contributionDto);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toEqual({
      id: expect.any(Number),
      ...contributionDto,
    });
  });

  it('/contributions (POST) - should fail to create a contribution - missing firstName', async () => {
    const contributionDto = {
      firstName: '',
      lastName: 'Priezvisko',
      email: 'email@gmail.com',
      phone: '+421945104427',
      value: 13.33,
      shelterId: 2,
    };
    const response = await request(app.getHttpServer())
      .post('/contributions')
      .send(contributionDto);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual(['firstName should not be empty']);
  });

  it('/contributions (POST) - should fail to create a contribution - invalid value type', async () => {
    const contributionDto = {
      firstName: 'Meno',
      lastName: 'Priezvisko',
      email: 'email@gmail.com',
      phone: '+421945104427',
      value: '5.55',
      shelterId: 1,
    };
    const response = await request(app.getHttpServer())
      .post('/contributions')
      .send(contributionDto);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual([
      'value must be a positive number',
      'value must be a number conforming to the specified constraints',
    ]);
  });

  it('/contributions (POST) - should fail to create a contribution - non-existing shelter', async () => {
    const contributionDto = {
      firstName: 'Meno',
      lastName: 'Priezvisko',
      email: 'email@gmail.com',
      phone: '+421945104427',
      value: 1.23,
      shelterId: 11,
    };
    const response = await request(app.getHttpServer())
      .post('/contributions')
      .send(contributionDto);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual([
      `Shelter with ID ${contributionDto.shelterId} does not exist!`,
    ]);
  });
});
