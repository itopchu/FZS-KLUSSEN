import { Injectable } from '@nestjs/common';
import { ServiceDTO } from './services.controller';
import * as fs from 'fs';
import * as path from 'path';
import { sectionDTO } from './services.controller';

@Injectable()
export class ServicesService {
  private servicesDirectory = path.join('/app', 'public', 'serviceCards');
  private infoDirectory = path.join("/app", "public", "info");

  getInfo(file: string): sectionDTO {
    file = file + ".txt";
    const resolvedPath = path.resolve(path.join(this.infoDirectory, file));
    if (resolvedPath !== path.join(this.infoDirectory, file)) {
      throw new Error("Invalid file path");
    }

    const fileContent = fs.readFileSync(resolvedPath, "utf-8");
    if (!fileContent.trim()) {
      throw new Error(`The ${file} file is empty.`);
    }
    const paragraphs = fileContent.split("\n").filter((line) => line.trim() !== "");
    const title = paragraphs.shift();
    return {
      title: title,
      description: paragraphs,
    };
  }

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
