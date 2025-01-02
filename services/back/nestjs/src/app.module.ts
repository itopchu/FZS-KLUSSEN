import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ContactModule } from './contact/contact.module';
import { ConfigModule } from '@nestjs/config';
import { ServicesModule } from './services/services.module';
import { AlbumModule } from './album/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AlbumModule,
    ContactModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
