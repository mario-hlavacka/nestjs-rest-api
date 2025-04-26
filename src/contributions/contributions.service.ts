import { Injectable } from '@nestjs/common';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ContributionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createContributionDto: CreateContributionDto) {
    return await this.prisma.contribution.create({ data: createContributionDto });
  }
}
