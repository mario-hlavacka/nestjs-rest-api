import { Controller, Post, Body } from '@nestjs/common';
import { ContributionsService } from './contributions.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { ContributionEntity } from './entities/contribution.entity';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('contributions')
export class ContributionsController {
  constructor(private readonly contributionsService: ContributionsService) {}

  @Post()
  @ApiCreatedResponse({ type: ContributionEntity })
  async create(@Body() createContributionDto: CreateContributionDto) {
    return await this.contributionsService.create(createContributionDto);
  }
}
