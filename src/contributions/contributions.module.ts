import { Module } from '@nestjs/common';
import { ContributionsService } from './contributions.service';
import { ContributionsController } from './contributions.controller';
import { PrismaService } from '../../src/prisma.service';
import { ValidShelterIdConstraint } from './custom-validators/valid-shelter-id';
import { SheltersService } from '../../src/shelters/shelters.service';

@Module({
  imports: [],
  controllers: [ContributionsController],
  providers: [
    ContributionsService,
    PrismaService,
    SheltersService,
    ValidShelterIdConstraint,
  ],
})
export class ContributionsModule {}
