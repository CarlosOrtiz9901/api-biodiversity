import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { CommonModule } from './@common/@common.module';
import ConfigService from './@common/config/config.service';
import { BiodiversityModule } from './biodiversity/biodiversity.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigService.orm_config),
    ScheduleModule.forRoot(),
    CommonModule,
    BiodiversityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
