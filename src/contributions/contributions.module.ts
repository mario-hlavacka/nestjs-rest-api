import { Module } from '@nestjs/common';
import { ContributionsService } from './contributions.service';
import { ContributionsController } from './contributions.controller';
import { Contribution } from './entities/contribution.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Contribution])],
  controllers: [ContributionsController],
  providers: [ContributionsService],
})
export class ContributionsModule {}
