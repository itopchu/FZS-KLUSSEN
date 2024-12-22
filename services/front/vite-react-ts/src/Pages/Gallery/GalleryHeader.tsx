import React from 'react';
import { 
  Stack, 
  Typography, 
  useTheme 
} from '@mui/material';
import { useWindowContext } from '../../Providers/Windows';
import { fetchInfo, sectionDTO } from '../../App';

export function getResponsiveValue(screenSize: string, values: Record<string, string>): string {
    switch(screenSize) {
      case 'mobile': return values.mobile;
      case 'wide': return values.tablet;
      case 'big': return values.big;
      default: return values.mobile;
    }
}

export const GalleryHeader: React.FC = () => {
  const theme = useTheme();
  const { screenSize } = useWindowContext();
  const header: sectionDTO | null = fetchInfo("gallery");

   if (!header) return null;

  const getVariant = () => {
    switch(screenSize) {
      case 'mobile':
      case 'wide': return 'h3';
      case 'big': return 'h2';
      default: return 'h1';
    }
  };

  return (
    <Stack
      paddingY="2em"
      paddingX={getResponsiveValue(screenSize, {
        mobile: '2em',
        wide: '5em',
        big: '15em'
      })}
      textAlign="center"
      spacing={4}
    >
      <Typography
        variant={getVariant()}
        fontWeight={700}
        color={theme.palette.primary.main}
      >
        {header?.title}
      </Typography>
      <Typography
        variant="body1"
        fontWeight={500}
      >
        {header?.description}
      </Typography>
    </Stack>
  );
};