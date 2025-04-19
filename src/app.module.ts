import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SheltersModule } from './shelters/shelters.module';
import { ContributionsModule } from './contributions/contributions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contribution } from './contributions/entities/contribution.entity';
import { Shelter } from './shelters/entities/shelter.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'postgres',
      entities: [Shelter, Contribution],
      synchronize: true,
    }),
    SheltersModule,
    ContributionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
