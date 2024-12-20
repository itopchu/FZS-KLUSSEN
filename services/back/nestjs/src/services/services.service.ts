import { Injectable } from '@nestjs/common';
import { ServiceDTO } from './services.controller';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ServicesService {
  private servicesDirectory = path.join('/app', 'public', 'serviceCards');

  getServices(): ServiceDTO[] {
    const serviceFolders = fs
      .readdirSync(this.servicesDirectory, { withFileTypes: true })
      .filter((item) => item.isDirectory())
      .map((item) => item.name);

    const services: ServiceDTO[] = serviceFolders.map((folder) => {
      const folderPath = path.join(this.servicesDirectory, folder);

      // Read the content of 'info.txt'
      const infoFilePath = path.join(folderPath, 'info.txt');
      const fileContent = fs.readFileSync(infoFilePath, 'utf-8');

      // Split the content into paragraphs
      const paragraphs = fileContent
        .split('\n')
        .filter((line) => line.trim() !== '');

      // First paragraph is the description
      const description = paragraphs[0] || '';

      // Rest of the text is the explanation
      const explanation = paragraphs.slice(1).join('\n').trim() || '';

      // Get the image file (assuming there's only one image in each folder)
      const imageFilePath = fs
        .readdirSync(folderPath)
        .find(
          (file) => file !== 'info.txt' && /\.(jpg|jpeg|png|gif)$/i.test(file),
        );
      const image = imageFilePath ? path.join('serviceCards', folder, imageFilePath) : '';

      // Return the ServiceDTO object
      return {
        title: folder,
        description: description,
        image: image,
        explanation: explanation,
      };
    });

    return services;
  }
}
