import { Controller, Get } from '@nestjs/common';
import { BiodiversityService } from './biodiversity.service';

@Controller('biodiversity')
export class BiodiversityController {
  constructor(private readonly biodiversityService: BiodiversityService) { }

  @Get()
  async update() {
    return await this.biodiversityService.update(10);
  }
}
