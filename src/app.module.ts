import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SheltersModule } from './shelters/shelters.module';
import { ContributionsModule } from './contributions/contributions.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    SheltersModule,
    ContributionsModule,
    HealthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
