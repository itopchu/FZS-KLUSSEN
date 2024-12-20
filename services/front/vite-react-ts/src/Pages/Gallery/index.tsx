import React from 'react';
import { Typography } from '@mui/material';

import { GalleryHeader } from './GalleryHeader';
import { CategoryGallerySwiper } from './CategoryGallerySwiper';
import { useWindowContext } from '../../Providers/Windows';
import { useImageContext } from '../../Providers/Image';

const Gallery: React.FC = () => {
  const { screenSize } = useWindowContext();
  const { categories, isLoading, error } = useImageContext();

  if (error) return <Typography color="error">{error}</Typography>;
  if (!categories) return <Typography>No categories found</Typography>;

  return (
    <div style={{ paddingBottom: "1em" }}>
      <GalleryHeader
        title="Gallery Overview"
        description="Discover a carefully curated collection of projects showcasing various aspects of work across different categories."
      />

      {isLoading ? <Typography color="error">Loading...</Typography>
        : categories.map((category, index) => (
          <CategoryGallerySwiper
            key={index}
            even={index % 2 === 0}
            category={category}
            screenSize={screenSize}
          />
        ))}
    </div>
  );
};

export default Gallery;