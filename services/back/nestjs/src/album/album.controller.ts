import { Controller, Get, Param } from "@nestjs/common";
import { AlbumService } from "./album.service";

export interface GalleryDTO {
    title: string | null;
    images: string[] | null;
}

@Controller('categories')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Get('')
    getCategories(): string[] {
        const album: string[] = this.albumService.getCategories();
        return album;
    }

    @Get(':category')
    getAlbums(@Param('category') category: string): string[] {
        const albums: string[] = this.albumService.getAlbums(category);
        return albums;
    }

    @Get(':category/:gallery')
    getGallery(@Param('category') category: string, @Param('gallery') gallery: string): GalleryDTO {
        const galleryDTO: GalleryDTO = this.albumService.getGallery(category, gallery);
        return galleryDTO;
    }

}