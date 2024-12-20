import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ContactModule } from './contact/contact.module';
import { ConfigModule } from '@nestjs/config';
import { ServicesModule } from './services/services.module';
import { AlbumModule } from './album/album.module';

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
})

export class AppModule {}
