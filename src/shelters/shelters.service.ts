import { Injectable } from '@nestjs/common';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SheltersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createShelterDto: CreateShelterDto) {
    return 'This action adds a new shelter';
  }

  findAll() {
    return this.prisma.shelter.findMany();
  }

  findOne(id: number) {
    return this.prisma.shelter.findUnique(({ where: { id: Number(id) } }));
  }

  update(id: number, updateShelterDto: UpdateShelterDto) {
    return `This action updates a #${id} shelter`;
  }

  remove(id: number) {
    return `This action removes a #${id} shelter`;
  }
}
