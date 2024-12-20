import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

const BACKEND_URL: string = import.meta.env.VITE_URL_BACKEND as string;

export interface Gallery {
    title: string;
    images: string[] | null;
}

export interface Category {
    title: string;
    galleries: Gallery[] | null;
}

export interface ImageContextProps {
    categories: Category[] | null;
    isLoading: boolean;
    error: string | null;
}

const sortImages = (images: string[] | null): string[] | null => {
    return images ? [...images].sort((a, b) => a.localeCompare(b)) : null;
};

const sortGalleries = (galleries: Gallery[] | null): Gallery[] | null => {
    return galleries
        ? [...galleries].sort((a, b) => (b.images?.length || 0) - (a.images?.length || 0))
        : null;
};

const sortCategories = (categories: Category[] | null): Category[] | null => {
    return categories
        ? [...categories].sort((a, b) => (b.galleries?.length || 0) - (a.galleries?.length || 0))
        : null;
};

const fetchGallery = async (category: string, gallery: string): Promise<Gallery> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/categories/${category}/${gallery}`);
        const galleryData = response.data;
        return {
            title: galleryData.title,
            images: sortImages(galleryData.images),
        };
    } catch (error) {
        console.error(`Failed to fetch gallery "${gallery}" for category "${category}":`, error);
        return {
            title: gallery,
            images: null,
        };
    }
};

const fetchCategory = async (category: string): Promise<Category> => {
    try {
        const galleryNames = await axios.get(`${BACKEND_URL}/categories/${category}`);
        const album: string[] = galleryNames.data;

        if (album.length === 0) {
            return { title: category, galleries: [] };
        }

        const galleries: Gallery[] = await Promise.all(
            album.map(galleryName => fetchGallery(category, galleryName))
        );

        return {
            title: category,
            galleries: sortGalleries(galleries),
        };
    } catch (error) {
        console.error(`Failed to fetch album for folder "${category}":`, error);
        return {
            title: category,
            galleries: null,
        };
    }
};

const fetchCategories = async (): Promise<Category[] | null> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/categories`);
        const categoryNames: string[] = response.data;
      
        if (!Array.isArray(categoryNames) || categoryNames.length === 0) {
          console.warn("Invalid or empty data received for category names");
          return null;
        }
      
        const categories: Category[] = await Promise.all(
          categoryNames.map(fetchCategory)
        );
      
        return sortCategories(categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        return null;
      }
};

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export const ImageWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
      const loadCategories = async () => {
        try {
          setIsLoading(true);
          const fetchedCategories = await fetchCategories();
    
          if (Array.isArray(fetchedCategories)) {
            setCategories(fetchedCategories);
            setError(null);
          } else {
            console.warn("Fetched data is not an array, setting categories to null");
            setCategories(null);
            setError("Invalid data format received");
          }
        } catch (err) {
          setCategories(null);
          setError("Failed to load categories");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
    
      loadCategories();
    }, []);
    

    const contextValue = {
        categories,
        isLoading,
        error
    };

    return (
        <ImageContext.Provider value={contextValue}>
            {children}
        </ImageContext.Provider>
    );
};

export const useImageContext = (): ImageContextProps => {
    const context = useContext(ImageContext);
    if (!context) {
        throw new Error('useImageContext must be used within an ImageWrapper');
    }
    return context;
};