import React from 'react';
import {
  Typography,
  useTheme,
  Divider,
  Stack,
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { Category, Gallery } from '../../Providers/Image';
import { ImageSlider } from './ImageSlider';
import { GalleryCard } from './GalleryCard';

interface CategoryGallerySwiperProps {
  even: boolean;
  category: Category;
  screenSize: 'mobile' | 'wide' | 'big';
}

export const CategoryGallerySwiper: React.FC<CategoryGallerySwiperProps> = ({
  even,
  category,
  screenSize
}) => {
  const [isSliderOpen, setIsSliderOpen] = React.useState<Gallery | null>(null);
  const theme = useTheme();

  const toggleSlider = (gallery: Gallery | null) => {
    setIsSliderOpen(gallery);
  }

  return (
    <>
      <Stack direction={"column"} spacing={1} paddingY={2}
        paddingX={screenSize === 'mobile' ? "1em" : screenSize === 'wide' ? "5em" : "10em"}
        sx={{
          backgroundColor: even ? theme.palette.customColors.color2 : theme.palette.customColors.color1
        }}
      >
        <Typography
          variant="h4"
          height={"2em"}
          justifySelf={"center"}
          alignSelf={"center"}
          sx={{
            textAlign: 'left',
            width: "100%",
            color: theme.palette.primary.main,
            borderBottom: `2px solid ${theme.palette.primary.main}`
          }}
        >
          {category.title}
        </Typography>
        <Divider />
        {category.galleries && category.galleries.length > 0 ? (
          <Swiper
            style={{ paddingBottom: '2em' }}
            modules={[A11y, FreeMode, Pagination]}
            slidesPerView={screenSize === 'mobile' ? 2 : screenSize === 'wide' ? 4 : 6}
            spaceBetween={screenSize === 'mobile' ? 5 : screenSize === 'wide' ? 10 : 20}
            pagination={{
              clickable: true,
              renderBullet: (_, className) => {
                return `
                  <span
                    class="${className}"
                    style="background-color: ${theme.palette.primary.light};"
                  ></span>
                `;
              },
            }}
            freeMode={true}
            autoHeight={true}
          >
            {category.galleries.map((gallery, index) => (
              <SwiperSlide key={`${index}`} onClick={() => toggleSlider(gallery)}>
                <GalleryCard gallery={gallery} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            No galleries in this category
          </Typography>
        )}
      </Stack>
      {isSliderOpen && (
        <ImageSlider gallery={isSliderOpen} onClose={() => toggleSlider(null)} />
      )}
    </>
  );
};
