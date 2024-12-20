import { Controller, Post, UploadedFiles, Body, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { CreateContactInfoDto } from './create-contact-info.dto';
import { ContactService } from './contact.service';
import sanitize from 'sanitize-filename';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('info')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 20 }], {
      storage: diskStorage({
        destination: './uploads', // Temporary storage, will be moved later
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const sanitizedFileName = sanitize(file.originalname);
          callback(null, uniqueSuffix + path.extname(sanitizedFileName));
        }
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB per file
      },
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type'), false);
        }
      },
    }),
  )
  async handleUpload(
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @Body() body: CreateContactInfoDto,
  ) {
    try {


    // Validate and process 'body'
    const { name, surname, phone, email, address, description } = body;
    const images = files?.images || [];
  

    if ([name, surname, phone, email, address].some(field => field && field.length > 100)) {
        throw new Error('One or more fields exceed the maximum length of 100 characters.');
    }
  
    if (description && description.length > 600) {
        throw new Error('Description exceeds the maximum length of 600 characters.');
    }

    const date = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
    const baseDir = path.join('/app/uploads', date, `${name}_${surname}`);
    if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });
  
    // Determine folder number (01, 02, etc.)
    const folders = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());
    const folderNumber = (folders.length + 1).toString().padStart(2, '0');
    const targetDir = path.join(baseDir, folderNumber);
    fs.mkdirSync(targetDir, { recursive: true });
  
    // Write user info to a text file
    const userInfo = `Name: ${name}\nSurname: ${surname}\nPhone: ${phone}\nEmail: ${email}\nAddress: ${address}\nDescription: ${description}`;
    fs.writeFileSync(path.join(targetDir, 'info.txt'), userInfo);
  
    // Rename and move images
    images.forEach((file, index) => {
      const newFilename = `${(index + 1).toString().padStart(2, '0')}${path.extname(file.originalname)}`;
      const newPath = path.join(targetDir, newFilename);
    
      // Copy the file to the new location
      fs.copyFileSync(file.path, newPath);
    
      // Delete the original file after copying
      fs.unlinkSync(file.path);
    });
  
    return { message: 'Files uploaded and processed successfully' };
  } catch (error) {
    throw new HttpException('An error occurred while processing your request', HttpStatus.BAD_REQUEST);
  }
  }
}
