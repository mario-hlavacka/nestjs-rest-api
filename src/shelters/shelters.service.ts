import { Injectable } from '@nestjs/common';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shelter } from './entities/shelter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SheltersService {
  constructor(
    @InjectRepository(Shelter)
    private sheltersRepository: Repository<Shelter>,
  ) {}

  create(createShelterDto: CreateShelterDto) {
    return 'This action adds a new shelter';
  }

  findAll() {
    return `This action returns all shelters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shelter`;
  }

  update(id: number, updateShelterDto: UpdateShelterDto) {
    return `This action updates a #${id} shelter`;
  }

  remove(id: number) {
    return `This action removes a #${id} shelter`;
  }
}
