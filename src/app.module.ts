import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SheltersModule } from './shelters/shelters.module';
import { ContributionsModule } from './contributions/contributions.module';

@Module({
  imports: [SheltersModule, ContributionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
