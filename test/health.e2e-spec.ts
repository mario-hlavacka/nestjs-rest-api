import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { PrismaHealthIndicator } from '@nestjs/terminus';
import { HealthModule } from '../src/health/health.module';
import { PrismaService } from '../src/prisma.service';

describe('SheltersController (e2e)', () => {
  let app: INestApplication<App>;

  const mockPrismaHealthIndicator = {
    pingCheck: jest.fn(),
  };
  const mockPrismaService = {};

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthModule],
      providers: [PrismaHealthIndicator, PrismaService],
    })
      .overrideProvider(PrismaHealthIndicator)
      .useValue(mockPrismaHealthIndicator)
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/health (GET) - should return ok status', async () => {
    mockPrismaHealthIndicator.pingCheck.mockResolvedValue({
      prisma: { status: 'up' },
    });

    const response = await request(app.getHttpServer()).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status');
    expect(response.body.status).toBe('ok');
  });

  it('/health (GET) - should return error status', async () => {
    mockPrismaHealthIndicator.pingCheck.mockResolvedValue({
      prisma: { status: 'down' },
    });

    const response = await request(app.getHttpServer()).get('/health');

    expect(response.status).toBe(503);
    expect(response.body).toHaveProperty('status');
    expect(response.body.status).toBe('error');
  });
});
