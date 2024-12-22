import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { Img } from 'react-image';
import { Gallery } from '../../Providers/Image';
import { envVars } from '../../App';

interface GalleryCardProps {
  gallery: Gallery;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  gallery,
}) => {

  return (
    <Box
      sx={{
        aspectRatio: '1/1',
        overflow: 'hidden',
        borderRadius: '1em',
        boxShadow: 2,
        cursor: 'pointer',
      }}
    >
      <Img
        loading="lazy"
        src={gallery?.images ? `${envVars.URL_BACKEND}/${gallery.images[0]}` : ''}
        alt={gallery.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: "cover",
        }}
      />
      <Typography
        variant="body1"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          padding: '0.5em',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          borderBottomRightRadius: '1em',
          borderBottomLeftRadius: '1em',
          textOverflow: 'ellipsis',
        }}
      >
        {gallery.title}
      </Typography>
    </Box>

  );
};