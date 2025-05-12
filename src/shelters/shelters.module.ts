import { Module } from '@nestjs/common';
import { SheltersService } from './shelters.service';
import { SheltersController } from './shelters.controller';
import { PrismaService } from '../../src/prisma.service';

@Module({
  imports: [],
  controllers: [SheltersController],
  providers: [SheltersService, PrismaService],
})
export class SheltersModule {}
