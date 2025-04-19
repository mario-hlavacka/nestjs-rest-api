import { Module } from '@nestjs/common';
import { SheltersService } from './shelters.service';
import { SheltersController } from './shelters.controller';
import { Shelter } from './entities/shelter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Shelter])],
  controllers: [SheltersController],
  providers: [SheltersService],
})
export class SheltersModule {}
