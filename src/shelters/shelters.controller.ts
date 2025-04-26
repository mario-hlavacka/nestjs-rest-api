import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { SheltersService } from './shelters.service';

@Controller('shelters')
export class SheltersController {
  constructor(private readonly sheltersService: SheltersService) {}

  @Get()
  async findAll() {
    return await this.sheltersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const shelter = await this.sheltersService.findOne(+id);

    if (!shelter) {
      throw new NotFoundException();
    }

    return shelter;
  }
}
