import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { GalleryDTO } from "./album.controller";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AlbumService {
    private categoryDirectory = path.join('/app', 'public', 'categories');

    getCategories(): string[] {
        const categories = fs
            .readdirSync(this.categoryDirectory, { withFileTypes: true })
            .filter((item) => item.isDirectory())
            .map((item) => item.name);

        return categories;
    }

    getAlbums(category: string): string[] {
        const resolvedPAth = path.resolve(path.join(this.categoryDirectory, category));
        if (!resolvedPAth.startsWith(this.categoryDirectory)) {
            throw new BadRequestException('Invalid folder path');
        }

        const albums = fs
            .readdirSync(resolvedPAth, { withFileTypes: true })
            .filter((item) => item.isDirectory())
            .map((item) => item.name);

        return albums;
    }

    getGallery(category: string, gallery: string): GalleryDTO {
        const categories: string[] = this.getCategories();
        if (!categories.includes(category)) {
            throw new BadRequestException('Category does not exist');
        }

        const albums: string[] = this.getAlbums(category);
        if (!albums.includes(gallery)) {
            throw new BadRequestException('Gallery does not exist in the specified category');
        }

        const resolvedPath: string = path.resolve(path.join(this.categoryDirectory, category, gallery));

        if (!resolvedPath.startsWith(this.categoryDirectory)) {
            throw new BadRequestException('Invalid folder path');
        }

        fs.stat(resolvedPath, (err, stats) => {
            if (err) {
                console.error('Folder does not exist:', err);
                throw new NotFoundException(`Folder does not exist: ${resolvedPath}`);
            } else if (!stats.isDirectory()) {
                console.error('Path exists but is not a folder:', resolvedPath);
                throw new NotFoundException(`Path exists but is not a folder: ${resolvedPath}`);
            }
        });

        const imageFilePaths: string[] = fs
            .readdirSync(resolvedPath, { withFileTypes: true })
            .filter((item) => item.isFile() && /\.(jpg|jpeg|png|gif)$/i.test(item.name))
            .map((item) => path.join('categories', category, gallery, item.name));

        return {
            title: gallery,
            images: imageFilePaths,
        };
    }
}