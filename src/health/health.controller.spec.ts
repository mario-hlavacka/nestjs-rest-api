import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { PrismaHealthIndicator, TerminusModule } from '@nestjs/terminus';
import { PrismaService } from '../../src/prisma.service';
import { ServiceUnavailableException } from '@nestjs/common';

describe('HealthController', () => {
  let controller: HealthController;
  let prismaService: PrismaService;

  const mockPrismaHealthIndicator = {
    pingCheck: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
      providers: [PrismaHealthIndicator, PrismaService],
    })
      .overrideProvider(PrismaHealthIndicator)
      .useValue(mockPrismaHealthIndicator)
      .compile();

    controller = module.get<HealthController>(HealthController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return OK status when DB is accessible', async () => {
    mockPrismaHealthIndicator.pingCheck.mockResolvedValue({
      prisma: { status: 'up' },
    });

    expect((await controller.check()).status).toEqual('ok');
    expect(mockPrismaHealthIndicator.pingCheck).toHaveBeenCalledWith(
      'prisma',
      prismaService,
    );
  });

  it('should return ERROR status when DB connection fails', async () => {
    mockPrismaHealthIndicator.pingCheck.mockResolvedValue({
      prisma: { status: 'down' },
    });

    expect(controller.check()).rejects.toThrow(ServiceUnavailableException);
    expect(mockPrismaHealthIndicator.pingCheck).toHaveBeenCalledWith(
      'prisma',
      prismaService,
    );
  });
});
