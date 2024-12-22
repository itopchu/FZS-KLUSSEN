import { Controller, Get, Res, Param } from '@nestjs/common';
import { ServicesService } from './services.service';

export interface sectionDTO {
  title: string;
  description: string[];
}

export interface ServiceDTO {
  title: string;
  description: string;
  image: string;
  explanation: string;
}

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}
  @Get('')
  getServices(): ServiceDTO[] {
    const services: ServiceDTO[] = this.servicesService.getServices();
    return services ;
  }

  @Get(':info')
  getInfo(@Param('info') info: string): sectionDTO {
    const infoDTO: sectionDTO = this.servicesService.getInfo(info);
    return infoDTO;
  }
}
