import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SheltersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.shelter.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.shelter.findUnique({
       where: { id: id } 
    });
  }
}
