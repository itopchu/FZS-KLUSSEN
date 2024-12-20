import { Controller, Get, Res, Param } from '@nestjs/common';
import { ServicesService } from './services.service';

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
}
