import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { taxonomy } from '../entities/taxonomy';
import { BiodiversityController } from './biodiversity.controller';
import { BiodiversityService } from './biodiversity.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([taxonomy,])
  ],
  controllers: [BiodiversityController],
  providers: [BiodiversityService]
})
export class BiodiversityModule { }
